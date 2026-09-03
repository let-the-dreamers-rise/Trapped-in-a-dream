/* GATE Rank 1 — app engine
   Views: home / subjects / topic / quiz / mock / progress / plan
   Persistence: localStorage. Spaced repetition: Leitner boxes (0 = relearn now … 4 = mastered).
*/
(function () {
  'use strict';
  var $view = document.getElementById('view');
  var DATA = window.GATE_DATA || {};
  var BANK = DATA.questions || {};
  var SUBJECT_ORDER = ['engmath', 'digital', 'coa', 'pds', 'algo', 'toc', 'compiler', 'os', 'dbms', 'cn', 'apti'];

  // ---------- state ----------
  var S = load();
  function load() {
    try { return JSON.parse(localStorage.getItem('gate_r1') || '{}'); } catch (e) { return {}; }
  }
  function save() { try { localStorage.setItem('gate_r1', JSON.stringify(S)); } catch (e) {} }
  S.leitner = S.leitner || {};       // qid -> {box, seen, wrong, last}
  S.topicStats = S.topicStats || {}; // topicId -> {attempts, correct}
  S.daily = S.daily || {};           // 'YYYY-MM-DD' -> answered count
  S.planChecks = S.planChecks || {}; // day -> {taskIdx: true}
  S.mocks = S.mocks || [];           // {dateISO, day, score, max, correct, wrong, skipped}
  S.streak = S.streak || { last: null, count: 0 };
  S.xp = S.xp || 0;                  // every answered question earns XP; never decreases
  S.best60 = S.best60 || 0;          // personal best in the 60-second sprint
  S.combo = 0;                       // in-session correct streak (not persisted)
  S.badges = S.badges || {};         // unlocked achievement ids
  S.challenge = S.challenge || {};   // { dateKey: true } once the daily challenge is done
  S.lastLevel = S.lastLevel || 1;    // to detect a level-up moment

  function localKey(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function todayKey() { return localKey(new Date()); }
  function missionDay() {
    if (!S.startDate) return null;
    var ms = new Date(todayKey()) - new Date(S.startDate);
    var d = Math.floor(ms / 86400000) + 1;
    return Math.max(1, Math.min(90, d));
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // ---------- question lookup ----------
  function allTopics() {
    var out = [];
    SUBJECT_ORDER.forEach(function (k) {
      var s = BANK[k]; if (!s || !s.topics) return;
      s.topics.forEach(function (t) { out.push({ subject: k, subjectName: s.subject, topic: t }); });
    });
    return out;
  }
  function topicById(tid) {
    var found = null;
    allTopics().forEach(function (e) { if (e.topic.id === tid) found = e; });
    return found;
  }
  function recordAnswer(qq, correct, topicId) {
    var isGen = qq.type === 'generated';
    if (!isGen) {
      var L = S.leitner[qq.id] || { box: 2, seen: 0, wrong: 0 };
      L.seen++; L.last = Date.now();
      if (correct) L.box = Math.min(4, L.box + 1);
      else { L.box = 0; L.wrong++; }
      S.leitner[qq.id] = L;
    }
    // XP only ever goes up — a bad session must never feel like losing ground.
    // ~8% of correct answers pay double: variable reward beats a fixed rate.
    var bonus = (correct && Math.random() < 0.08);
    S.xp += correct ? (bonus ? 20 : 10) : 3;
    if (bonus) setTimeout(function () { celebrate('<b>Double XP</b><span>+20 on that one</span>'); }, 260);
    S.combo = correct ? S.combo + 1 : 0;
    try { if (navigator.vibrate) navigator.vibrate(correct ? 18 : [12, 40, 12]); } catch (e) {}
    var st = S.topicStats[topicId] || { attempts: 0, correct: 0 };
    st.attempts++; if (correct) st.correct++;
    S.topicStats[topicId] = st;
    var k = todayKey();
    S.daily[k] = (S.daily[k] || 0) + 1;
    // streak
    if (S.streak.last !== k) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      S.streak.count = (S.streak.last === localKey(y)) ? S.streak.count + 1 : 1;
      S.streak.last = k;
    }
    var lvl = levelFor(S.xp);
    if (lvl > (S.lastLevel || 1)) {
      S.lastLevel = lvl;
      setTimeout(function () { celebrate('<b>Level ' + lvl + '</b><span>' + S.xp + ' XP total</span>'); }, 300);
    }
    var fresh = checkBadges();
    if (fresh.length) setTimeout(function () { celebrate('<b>' + esc(fresh[0].name) + '</b><span>Achievement unlocked</span>'); }, 700);
    save(); renderChips();
  }

  // Infinite queue for a topic: due-wrong first → unseen → recycle (weakest first) with generated interleave.
  function nextQuestion(topicId, sessionSeen, diffFilter) {
    var entry = topicById(topicId);
    var qs = entry ? entry.topic.questions : [];
    if (diffFilter === 'pattern') qs = qs.filter(function (qq) { return !!qq.pyqStyle; });
    else if (diffFilter && diffFilter !== 'all') qs = qs.filter(function (qq) { return qq.difficulty === diffFilter; });
    var due = [], unseen = [], rest = [];
    qs.forEach(function (qq) {
      if (sessionSeen[qq.id]) { rest.push(qq); return; }
      var L = S.leitner[qq.id];
      if (!L) unseen.push(qq);
      else if (L.box === 0) due.push(qq);
      else rest.push(qq);
    });
    if (due.length) return due[Math.floor(Math.random() * due.length)];
    if (unseen.length) return unseen[0];
    // exhausted this session: alternate generated (if available) and weakest-box recycling
    if (window.GATE_GEN && GATE_GEN.has(topicId) && Math.random() < 0.5) {
      var g = GATE_GEN.make(topicId); if (g) return g;
    }
    if (!qs.length) { var g2 = window.GATE_GEN && GATE_GEN.make(topicId); return g2 || null; }
    var pool = qs.slice().sort(function (a, b) {
      var la = S.leitner[a.id] || { box: 2, last: 0 }, lb = S.leitner[b.id] || { box: 2, last: 0 };
      return (la.box - lb.box) || (la.last - lb.last);
    });
    // clear session marker so recycling can continue forever
    var pickq = pool[Math.floor(Math.random() * Math.min(5, pool.length))];
    delete sessionSeen[pickq.id];
    return pickq;
  }

  // ---------- chrome ----------
  function renderChips() {
    var d = missionDay();
    document.getElementById('day-chip').textContent = d ? ('Day ' + d + '/90') : 'Set start';
    document.getElementById('streak-chip').textContent = (S.streak.count || 0) + ' day streak';
  }
  document.querySelectorAll('#tabbar .tab').forEach(function (b) {
    b.addEventListener('click', function () { nav(b.getAttribute('data-nav')); });
  });
  function setTab(name) {
    document.querySelectorAll('#tabbar .tab').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-nav') === name);
    });
  }
  var mockTimer = null;
  function nav(name, arg, arg2) {
    if (mockTimer && name !== 'mock-run') { clearInterval(mockTimer); mockTimer = null; }
    window.scrollTo(0, 0);
    setTab(name === 'topic' || name === 'quiz' || name === 'lesson' ? 'subjects' : (name === 'one' || name === 'sprint' || name === 'challenge' ? 'home' : (name === 'badges' ? 'progress' : (name.indexOf('mock') === 0 || name.indexOf('pyq') === 0 ? 'test' : name))));
    if (name === 'home') return viewHome();
    if (name === 'subjects') return viewSubjects();
    if (name === 'subject') return viewSubject(arg);
    if (name === 'topic') return viewTopic(arg);
    if (name === 'quiz') return viewQuiz(arg, arg2);
    if (name === 'lesson') return viewLesson(arg);
    if (name === 'one') return viewOneQuestion();
    if (name === 'sprint') return viewSprint();
    if (name === 'challenge') return viewChallenge();
    if (name === 'badges') return viewBadges();
    if (name === 'pyq') return viewPyqList();
    if (name === 'pyqpaper') return viewPyqPaper(arg);
    if (name === 'test') return viewMockLanding();
    if (name === 'progress') return viewProgress();
    if (name === 'plan') return viewPlan();
    viewHome();
  }

  // ---------- HOME ----------
  function viewHome() {
    var d = missionDay();
    if (!S.startDate) {
      $view.innerHTML =
        '<div class="card"><div class="eyebrow">Mission</div><h2>GATE Rank 1 in 90 days</h2>' +
        '<p class="muted">Every subject. Every topic. Theory + unlimited questions with full explanations. Score targets: 50/100 by Day 30 → 90+/100 by Day 90.</p>' +
        '<hr class="sep"><h3>When is Day 1?</h3>' +
        '<input type="date" id="start-date" value="' + todayKey() + '">' +
        '<div class="btn-row"><button class="btn good" id="start-btn">Start the mission</button></div></div>' +
        '<div class="card"><h3>How this app gets you there</h3><p class="muted small">' +
        '• Study tab: every GATE CS topic → Intro, Core theory, Exam strategy, then an infinite quiz.\n' +
        '• Every answer has a full explanation under it — you learn by solving.\n' +
        '• Wrong answers come back automatically until you crush them (spaced repetition).\n' +
        '• Mock tab: full 65-question, 100-mark, 3-hour tests with real GATE negative marking.\n' +
        '• Plan tab: your exact objectives for each of the 90 days.</p></div>';
      document.getElementById('start-btn').addEventListener('click', function () {
        S.startDate = document.getElementById('start-date').value || todayKey();
        save(); renderChips(); viewHome();
      });
      return;
    }
    var plan = (DATA.plan || [])[d - 1];
    var astro = DATA.astroFor ? DATA.astroFor(new Date()) : null;
    var answered = S.daily[todayKey()] || 0;
    var quota = plan ? plan.quota : 60;
    var pct = Math.min(100, Math.round(answered / quota * 100));
    var html = '';
    if (d > 60) {
      html += '<div class="card" style="border-color:var(--warn)"><b style="color:var(--warn)">Content freeze &mdash; Day 60+.</b> <span class="small muted">Toppers stop new topics in the last 30 days. Revision, mocks and mistake-book only — the syllabus you know beats the syllabus you skimmed.</span></div>';
    }
    var grid = '';
    for (var gi = 1; gi <= 90; gi++) grid += '<i class="' + (gi < d ? 'done' : (gi === d ? 'now' : '')) + '"></i>';
    html += '<div class="card">' +
      '<div class="eyebrow">Day of mission</div>' +
      '<div class="hero-day"><span class="hero-num">' + String(d).padStart(2, '0') + '</span>' +
      '<span class="hero-of">/90</span>' +
      '<span class="hero-right"><span class="n">' + (90 - d) + '</span><div class="eyebrow" style="margin:2px 0 0">Days left</div></span></div>' +
      '<div class="day-grid">' + grid + '</div></div>' +
      '<div class="card"><h3>' + esc(plan ? plan.title : 'Grind') +
      (plan && plan.mock ? ' · <span style="color:var(--accent)">Mock day — target ' + plan.target + '/100</span>' : '') + '</h3>' +
      '<div class="hero-day"><span class="hero-num" style="font-size:52px">' + answered + '</span>' +
      '<span class="hero-of">solved today</span>' +
      '<span class="hero-right"><span class="n" style="color:var(--accent2)">L' + levelFor(S.xp) + '</span>' +
      '<div class="eyebrow" style="margin:2px 0 0">' + S.xp + ' XP</div></span></div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="small muted">' + (answered === 0
        ? 'Nothing yet today. One question is a win — start there.'
        : (answered >= quota ? 'Full target hit. Anything more is bonus.'
           : 'Target ' + quota + '. You are moving — keep going.')) + '</div></div>' +

      // The two lowest-friction entry points, placed above everything that asks for effort.
      (S.challenge[todayKey()]
        ? '<div class="card"><h3>Daily challenge</h3><div class="small" style="color:var(--accent2)">Done today. Come back tomorrow for a new one.</div></div>'
        : '<div class="card" style="border-left:4px solid var(--accent)"><h3>Daily challenge &middot; triple XP</h3>' +
          '<div class="small muted" style="margin-bottom:10px">One hard question. New one every day. Takes two minutes.</div>' +
          '<button class="btn block" id="go-challenge">Take today\'s challenge</button></div>') +
      '<div class="card"><h3>Low fuel? Start here</h3>' +
      '<div class="btn-row"><button class="btn good" id="go-one">One question</button>' +
      '<button class="btn" id="go-sprint">60-second sprint</button></div>' +
      '<div class="small muted" style="margin-top:8px">No setup, no subject to pick, no way to fail. Best sprint: ' + S.best60 + '.</div></div>';

    if (plan) {
      html += '<div class="card"><h3>Today\'s objectives</h3>';
      var checks = S.planChecks[d] || {};
      plan.tasks.forEach(function (t, i) {
        html += '<label class="task-line"><input type="checkbox" data-task="' + i + '" ' + (checks[i] ? 'checked' : '') + '><span>' + esc(t.text) + '</span></label>';
      });
      html += '<div class="btn-row">';
      (plan.focus || []).forEach(function (f) {
        if (BANK[f]) html += '<button class="btn" data-go-subject="' + f + '">' + esc(BANK[f].subject.split(' ')[0]) + '</button>';
      });
      if (plan.mock) html += '<button class="btn good" data-go-mock="1">Take today\'s mock</button>';
      html += '</div></div>';
    }
    if (astro) {
      html += '<div class="card astro-card"><h3>Pisces daily &mdash; Meena rashi</h3>' +
        '<p class="small">' + esc(astro.focus) + '</p><hr class="sep">' +
        '<p class="small muted">🎨 Lucky colour: <b>' + astro.color + '</b> · 🔢 Lucky number: <b>' + astro.number + '</b> · ⏰ Best study window: <b>' + astro.time + '</b></p>' +
        '<p class="small muted">🕉️ ' + esc(astro.mantra) + '</p>' +
        '<p class="small muted">✨ Today\'s ritual: ' + esc(astro.ritual) + '</p></div>';
    }
    html += '<div class="card"><h3>Focus timer</h3><div class="btn-row">' +
      '<button class="btn" id="pomo-25">25 min sprint</button><button class="btn ghost" id="pomo-45">45 min deep</button></div>' +
      '<div id="pomo-display" class="small muted" style="margin-top:8px">Focus blocks completed: ' + (S.pomo || 0) + '. Phone in another room, then press start.</div></div>';
    html += '<div class="card"><h3>The 15-hour day &mdash; tap to expand</h3><div id="tmpl" class="small muted" style="display:none;white-space:pre-wrap">' + (DATA.dayTemplate || []).join('\n') + '</div></div>';
    $view.innerHTML = html;
    var pomoTimer = null;
    function startPomo(mins) {
      if (pomoTimer) clearInterval(pomoTimer);
      var left = mins * 60;
      var disp = document.getElementById('pomo-display');
      pomoTimer = setInterval(function () {
        left--;
        if (!document.getElementById('pomo-display')) { clearInterval(pomoTimer); return; }
        if (left <= 0) {
          clearInterval(pomoTimer); pomoTimer = null;
          S.pomo = (S.pomo || 0) + 1; save();
          disp.innerHTML = 'Block done. Total: ' + S.pomo + '. Take a 5–10 min REAL break (move, water, no phone).';
        } else {
          disp.textContent = '⏳ ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0') + ' — single task, nothing else exists.';
        }
      }, 1000);
    }
    document.getElementById('pomo-25').addEventListener('click', function () { startPomo(25); });
    document.getElementById('pomo-45').addEventListener('click', function () { startPomo(45); });
    $view.querySelectorAll('input[data-task]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var c = S.planChecks[d] || {}; c[cb.getAttribute('data-task')] = cb.checked; S.planChecks[d] = c; save();
      });
    });
    var gc = document.getElementById('go-challenge');
    if (gc) gc.addEventListener('click', function () { nav('challenge'); });
    var g1 = document.getElementById('go-one');
    if (g1) g1.addEventListener('click', function () { nav('one'); });
    var g2 = document.getElementById('go-sprint');
    if (g2) g2.addEventListener('click', function () { nav('sprint'); });
    $view.querySelectorAll('[data-go-subject]').forEach(function (b) {
      b.addEventListener('click', function () { nav('subject', b.getAttribute('data-go-subject')); });
    });
    var mb = $view.querySelector('[data-go-mock]'); if (mb) mb.addEventListener('click', function () { nav('test'); });
    var th = $view.querySelector('.card:last-child h3');
    th.addEventListener('click', function () { var t = document.getElementById('tmpl'); t.style.display = t.style.display === 'none' ? 'block' : 'none'; });
  }

  // ---------- SUBJECTS ----------
  function topicAccuracy(tid) {
    var st = S.topicStats[tid];
    if (!st || !st.attempts) return null;
    return Math.round(st.correct / st.attempts * 100);
  }
  function viewSubjects() {
    var html = '<div class="card"><h3>Full GATE CS&amp;IT syllabus</h3></div>';
    SUBJECT_ORDER.forEach(function (k) {
      var s = BANK[k]; if (!s) return;
      var nQ = 0, att = 0, cor = 0;
      (s.topics || []).forEach(function (t) {
        nQ += (t.questions || []).length;
        var st = S.topicStats[t.id]; if (st) { att += st.attempts; cor += st.correct; }
      });
      var acc = att ? Math.round(cor / att * 100) : null;
      html += '<div class="list-item" data-sub="' + k + '"><div class="grow"><div class="title">' + esc(s.subject) + '</div>' +
        '<div class="muted small">' + (s.topics || []).length + ' topics · ' + nQ + '+ questions (∞ with generator)' + (acc !== null ? ' · ' + acc + '% accuracy' : '') + '</div></div><span class="arrow">›</span></div>';
    });
    $view.innerHTML = html;
    $view.querySelectorAll('[data-sub]').forEach(function (el) {
      el.addEventListener('click', function () { nav('subject', el.getAttribute('data-sub')); });
    });
  }
  function viewSubject(key) {
    var s = BANK[key]; if (!s) return viewSubjects();
    var html = '<button class="back-link" id="back">‹ All subjects</button><h2 style="margin-bottom:12px">' + esc(s.subject) + '</h2>';
    (s.topics || []).forEach(function (t) {
      var acc = topicAccuracy(t.id);
      html += '<div class="list-item" data-topic="' + t.id + '"><div class="grow"><div class="title">' + esc(t.name) + '</div>' +
        '<div class="muted small">' + (t.questions || []).length + ' authored Qs' + (window.GATE_GEN && GATE_GEN.has(t.id) ? ' + ∞ generated' : '') + (acc !== null ? ' · ' + acc + '%' : ' · not started') + '</div></div><span class="arrow">›</span></div>';
    });
    $view.innerHTML = html;
    document.getElementById('back').addEventListener('click', function () { nav('subjects'); });
    $view.querySelectorAll('[data-topic]').forEach(function (el) {
      el.addEventListener('click', function () { nav('topic', el.getAttribute('data-topic')); });
    });
  }

  function pyqCount(t) {
    return (t.questions || []).filter(function (q) { return !!q.pyqStyle; }).length;
  }

  // Theory is authored as plain text with conventions: ALL-CAPS section heads,
  // "• " bullets, "Term. explanation" lead-ins, and [[FIG:id]] markers that pull in
  // a diagram from the topic's theory.figs. Render it with real hierarchy so it
  // reads like a textbook page instead of a wall of grey text.
  // Detects a paragraph that runs a numbered list inline — "(1) x, (2) y, (3) z" —
  // and returns the lead-in, the steps, and any trailing prose. Returns null unless
  // the markers really are a list: at least three of them, numbered 1,2,3… in order,
  // in a paragraph long enough that reading it as one block is the problem.
  // References like "as shown in (2) and (3)" never match, because they don't start at 1.
  function splitInlineSteps(line) {
    if (line.length < 200) return null;
    var marks = [], re = /\((\d{1,2})\)\s+/g, m;
    while ((m = re.exec(line))) marks.push({ n: +m[1], at: m.index, end: re.lastIndex });
    if (marks.length < 3) return null;
    for (var i = 0; i < marks.length; i++) if (marks[i].n !== i + 1) return null;

    var lead = line.slice(0, marks[0].at).replace(/[\s,;]+$/, '');
    if (lead && !/[:.!?]$/.test(lead)) lead += ':';
    var steps = [];
    for (var j = 0; j < marks.length; j++) {
      var stop = (j + 1 < marks.length) ? marks[j + 1].at : line.length;
      steps.push(line.slice(marks[j].end, stop).replace(/[\s,;]+$/, ''));
    }
    // Prose hung off the end of the last step with a dash belongs in its own paragraph.
    var tail = '';
    var last = steps[steps.length - 1];
    var dash = last.search(/\s+(?:--|—|–)\s+/);
    if (dash > 0 && last.length - dash > 60) {
      tail = last.slice(dash).replace(/^\s*(?:--|—|–)\s*/, '');
      // It was a mid-sentence continuation; as its own paragraph it needs a capital.
      tail = tail.charAt(0).toUpperCase() + tail.slice(1);
      steps[steps.length - 1] = last.slice(0, dash).replace(/[\s,;]+$/, '');
    }
    return { lead: lead, steps: steps, tail: tail };
  }

  // Breaks a very long paragraph into readable chunks at sentence boundaries.
  // A 700-character block on a phone is where an ADHD reader loses the thread, so
  // anything past the threshold is regrouped into paragraphs of roughly 300 chars.
  // Splits only where a full stop is followed by a capital, and never after a known
  // abbreviation ("e.g.", "i.e.", "Fig.") or a single initial, so sentences stay whole.
  var ABBREV = /(?:^|\s)(?:e\.g|i\.e|etc|vs|approx|Fig|Eq|No|cf|w\.r\.t|[A-Z])\.$/;
  function splitLongParagraph(line, limit) {
    if (line.length <= limit) return null;
    var parts = [], buf = '';
    var pieces = line.split(/(?<=[.!?])\s+(?=[A-Z(])/);
    // Re-join any split that landed straight after an abbreviation.
    var merged = [];
    pieces.forEach(function (p) {
      if (merged.length && ABBREV.test(merged[merged.length - 1])) merged[merged.length - 1] += ' ' + p;
      else merged.push(p);
    });
    if (merged.length < 2) return null;
    merged.forEach(function (sentence) {
      if (buf && (buf.length + sentence.length) > limit * 0.75) { parts.push(buf); buf = sentence; }
      else buf = buf ? buf + ' ' + sentence : sentence;
    });
    if (buf) parts.push(buf);
    // A trailing scrap reads worse than one long paragraph — fold it back in.
    if (parts.length > 1 && parts[parts.length - 1].length < 80) {
      parts[parts.length - 2] += ' ' + parts.pop();
    }
    return parts.length > 1 ? parts : null;
  }

  function renderTheory(text, figs) {
    if (!text) return '<p class="muted">Theory coming soon.</p>';
    var figMap = {};
    (figs || []).forEach(function (f) { figMap[f.id] = f; });
    var used = {};
    var lines = String(text).split('\n');
    var out = [], inList = false;
    function closeList() { if (inList) { out.push('</ul>'); inList = false; } }
    lines.forEach(function (raw) {
      var line = raw.trim();
      if (!line) { closeList(); return; }

      var figM = line.match(/^\[\[FIG:([a-zA-Z0-9_-]+)\]\]$/);
      if (figM) {
        closeList();
        var f = figMap[figM[1]];
        if (f) {
          used[f.id] = true;
          out.push('<figure class="th-fig">' + f.svg +
            (f.caption ? '<figcaption>' + esc(f.caption) + '</figcaption>' : '') + '</figure>');
        }
        return;
      }

      // A short all-caps line is a section heading.
      var letters = line.replace(/[^A-Za-z]/g, '');
      if (letters.length > 2 && line === line.toUpperCase() && line.length < 70) {
        closeList();
        out.push('<h4 class="th-head">' + esc(line) + '</h4>');
        return;
      }

      if (line.indexOf('•') === 0) {
        if (!inList) { out.push('<ul class="th-list">'); inList = true; }
        out.push('<li>' + inlineTheory(line.replace(/^•\s*/, '')) + '</li>');
        return;
      }

      closeList();

      // Traps / gotchas get a red warning card — these are the marks people lose.
      if (/^(GATE TRAP|TRAP|WARNING|CAUTION|COMMON MISTAKE|PITFALL)S?\b[:.\-]/i.test(line)) {
        out.push('<div class="th-trap">' + inlineTheory(line.replace(/^[^:.\-]*[:.\-]\s*/, '')) + '</div>');
        return;
      }
      // Remember-this lines get a teal key card.
      if (/^(KEY|REMEMBER|NOTE|SHORTCUT|EXAM TIP|RULE OF THUMB|FAST ROUTE)\b[:.\-]/i.test(line)) {
        out.push('<div class="th-key">' + inlineTheory(line.replace(/^[^:.\-]*[:.\-]\s*/, '')) + '</div>');
        return;
      }
      // A line that is essentially one formula becomes a display block.
      if (line.length < 90 && /=/.test(line) && !/[.!?]\s/.test(line) && /[0-9()^*\/+\-]/.test(line)) {
        out.push('<div class="th-formula">' + esc(line) + '</div>');
        return;
      }
      // Numbered steps get a step chip.
      var step = line.match(/^(\d{1,2})[.)]\s+(.*)$/);
      if (step) {
        out.push('<div class="th-step"><span class="th-num">' + step[1] + '</span><span>' + inlineTheory(step[2]) + '</span></div>');
        return;
      }
      // A long paragraph that enumerates inline — "... the OS: (1) traps, (2) checks, (3) ..."
      // — is a wall of text on a phone. Break it into the same step chips a
      // line-per-step paragraph would have produced.
      var inlineSteps = splitInlineSteps(line);
      if (inlineSteps) {
        if (inlineSteps.lead) out.push('<p>' + inlineTheory(inlineSteps.lead) + '</p>');
        inlineSteps.steps.forEach(function (s, i) {
          out.push('<div class="th-step"><span class="th-num">' + (i + 1) + '</span><span>' + inlineTheory(s) + '</span></div>');
        });
        if (inlineSteps.tail) out.push('<p>' + inlineTheory(inlineSteps.tail) + '</p>');
        return;
      }

      // "Lead-in term. Rest of the paragraph" — bold the lead-in.
      var lead = line.match(/^([A-Z][^.]{2,48})\.\s+(.*)$/);
      var body = line, termHtml = '';
      if (lead && lead[2].length > 20) {
        termHtml = '<b class="th-term">' + esc(lead[1]) + '.</b> ';
        body = lead[2];
      }
      var chunks = splitLongParagraph(body, 420);
      if (chunks) {
        chunks.forEach(function (c, i) {
          out.push('<p>' + (i === 0 ? termHtml : '') + inlineTheory(c) + '</p>');
        });
      } else {
        out.push('<p>' + termHtml + inlineTheory(body) + '</p>');
      }
    });
    closeList();

    // Any figures never placed by a marker go at the end so they are never lost.
    (figs || []).forEach(function (f) {
      if (!used[f.id]) {
        out.push('<figure class="th-fig">' + f.svg +
          (f.caption ? '<figcaption>' + esc(f.caption) + '</figcaption>' : '') + '</figure>');
      }
    });
    return out.join('');
  }

  // Formula-ish fragments get monospace so they stand out mid-sentence.
  function inlineTheory(s) {
    var e = esc(s);
    e = e.replace(/(^|[\s(])([A-Za-z0-9_]+\s*=\s*[^,.;:]{1,40})(?=[,.;:)]|$)/g,
      function (m, pre, expr) { return pre + '<code>' + expr + '</code>'; });
    return e;
  }

  // Pull one question from the whole bank. Used by the low-friction modes where
  // choosing a subject is itself the barrier that stops a session starting.
  function anyQuestion(maxDifficulty) {
    var pool = [];
    allTopics().forEach(function (e) {
      (e.topic.questions || []).forEach(function (q) {
        if (maxDifficulty === 'easy' && q.difficulty === 'hard') return;
        pool.push({ q: q, topic: e.topic.id });
      });
    });
    if (!pool.length) return null;
    // bias toward questions previously answered wrong, then unseen
    var due = pool.filter(function (r) { var L = S.leitner[r.q.id]; return L && L.box === 0; });
    var unseen = pool.filter(function (r) { return !S.leitner[r.q.id]; });
    var bag = (due.length && Math.random() < 0.4) ? due : (unseen.length ? unseen : pool);
    return bag[Math.floor(Math.random() * bag.length)];
  }

  function levelFor(xp) { return Math.floor(Math.sqrt(xp / 40)) + 1; }

  // ---------- TOPIC (theory) ----------
  function viewTopic(tid) {
    var e = topicById(tid); if (!e) return viewSubjects();
    var t = e.topic;
    var html = '<button class="back-link" id="back">‹ ' + esc(e.subjectName) + '</button>' +
      '<h2 style="margin-bottom:10px">' + esc(t.name) + '</h2>' +
      '<div class="theory-tabs">' +
      '<button data-tt="intro" class="active">Intro</button>' +
      '<button data-tt="core">Core theory</button>' +
      (t.theory && t.theory.deep ? '<button data-tt="deep">Deep dive</button>' : '') +
      '<button data-tt="strategy">Exam strategy</button></div>' +
      '<div class="card"><div class="theory-body" id="tbody"></div></div>' +
      lessonCta(tid) +
      '<button class="btn block ghost" id="practice" style="margin-top:8px">Practice &mdash; infinite quiz</button>' +
      (pyqCount(t) ? '<button class="btn block ghost" id="pyq-set" style="margin-top:8px">Exam-pattern set &mdash; ' + pyqCount(t) + ' questions</button>' : '');
    $view.innerHTML = html;
    var body = document.getElementById('tbody');
    function show(k) {
      body.innerHTML = renderTheory(t.theory && t.theory[k], t.theory && t.theory.figs);
      $view.querySelectorAll('[data-tt]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tt') === k); });
    }
    show('intro');
    $view.querySelectorAll('[data-tt]').forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-tt')); });
    });
    document.getElementById('back').addEventListener('click', function () { nav('subject', e.subject); });
    var lb = document.getElementById('learn');
    if (lb) lb.addEventListener('click', function () { nav('lesson', tid); });
    document.getElementById('practice').addEventListener('click', function () { nav('quiz', tid); });
    var pb = document.getElementById('pyq-set');
    if (pb) pb.addEventListener('click', function () { nav('quiz', tid, 'pattern'); });
  }


  // ---------- GUIDED LESSON ----------
  // Reading a whole theory tab and then doing a whole quiz is two long stretches
  // with no payoff in between, which is exactly the shape an ADHD brain bounces
  // off. This mode cuts the same material into one idea at a time and puts a
  // question on that idea immediately after it, so effort and reward stay a few
  // seconds apart the whole way through the topic.
  //
  // Nothing new is authored here — beats are cut from the existing theory and
  // paired with the topic's own questions by term overlap.

  var LESSON_STOP = ('the a an and or of to in is are be for on with that this it as by from at ' +
    'which one two can will may not no if then than when where each other any all both some ' +
    'you your we they has have had was were been its into out over under also such more most ' +
    'only very much many while about after before between during because so but however thus ' +
    'gate exam question questions answer answers option options following consider let given ' +
    'example note here there them their what how why does do done use used using ' +
    'topic through conceptual concept idea point above below next same different every ' +
    'first second third last case cases often always never usually simply just even still ' +
    'means meaning called known common general specific important remember note notice ' +
    'above below left right side part parts whole must should would could might make makes ' +
    'take takes give gives find finds show shows says said tells look looks think thinks ' +
    'need needs want wants like likes well good best worse worst large small long short ' +
    'number numbers value values result results total amount level levels type types kind ' +
    'form forms word words line lines term terms thing things way ways time times step steps ' +
    'compute computes computed calculate calculates determine determines obtain obtains ' +
    'apply applies applied assume assumes assumed suppose contains contain include includes ' +
    'called define defines defined denote denotes denoted written write writes above below').split(' ');
  var LESSON_STOPSET = {};
  LESSON_STOP.forEach(function (w) { LESSON_STOPSET[w] = true; });

  // Questions written as a follow-up to the previous one. Fine inside a quiz run
  // where their sibling just appeared; incoherent as the single question after a
  // teaching card, so the lesson leaves them to the quiz.
  var LESSON_BACKREF = /(\bagain using\b|\bthe original (system|setup|configuration|scenario|state|table|array|graph|matrix)\b|\b(from|in) the previous question\b|\bas in the previous\b|\bsame (system|setup|scenario|configuration|state) as (above|before|the previous)\b|\bcontinuing from\b|\brefer(ring)? back to\b|\bthe above question\b)/i;

  function lessonWords(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/)
      .filter(function (w) { return w.length >= 4 && !LESSON_STOPSET[w]; });
  }

  // Cut a theory string into beats at its ALL-CAPS headings, splitting any beat
  // that is still too long to read in one sitting.
  function cutBeats(text, tab) {
    if (!text) return [];
    var out = [], cur = null;
    String(text).split('\n').forEach(function (raw) {
      var line = raw.trim();
      if (!line) { if (cur) cur.lines.push(''); return; }
      var letters = line.replace(/[^A-Za-z]/g, '');
      if (letters.length > 2 && line === line.toUpperCase() && line.length < 70) {
        cur = { heading: line, lines: [], tab: tab };
        out.push(cur);
      } else {
        if (!cur) { cur = { heading: '', lines: [], tab: tab }; out.push(cur); }
        cur.lines.push(line);
      }
    });
    var beats = [];
    out.forEach(function (sec) {
      var body = sec.lines.join('\n').trim();
      if (!body) return;
      // Long sections become several beats under the same heading, split only at
      // blank lines so a paragraph is never cut in half.
      var LIMIT = 750;
      if (body.length <= LIMIT) { beats.push({ heading: sec.heading, body: body, tab: sec.tab }); return; }
      var chunk = '', part = 0;
      body.split(/\n\s*\n/).forEach(function (para) {
        if (chunk && (chunk.length + para.length) > LIMIT) {
          beats.push({ heading: sec.heading, body: chunk.trim(), tab: sec.tab, part: ++part });
          chunk = para;
        } else chunk = chunk ? chunk + '\n\n' + para : para;
      });
      if (chunk.trim()) beats.push({ heading: sec.heading, body: chunk.trim(), tab: sec.tab, part: part ? ++part : 0 });
    });
    return beats;
  }

  // Build the whole lesson for a topic: beats in teaching order, each paired with
  // the question from this topic that best matches what the beat just explained.
  function buildLesson(e) {
    var t = e.topic, th = t.theory || {};
    var beats = [];
    if (th.intro) beats.push({ heading: 'THE IDEA', body: th.intro, tab: 'intro' });
    beats = beats.concat(cutBeats(th.core, 'core'), cutBeats(th.deep, 'deep'));

    // Term frequencies across beats: a word in every beat says nothing about which
    // question belongs where, a word in one or two beats says a lot.
    var df = {};
    beats.forEach(function (b) {
      var seen = {};
      lessonWords(b.heading + ' ' + b.body).forEach(function (w) {
        if (!seen[w]) { seen[w] = true; df[w] = (df[w] || 0) + 1; }
      });
    });
    beats.forEach(function (b) {
      b.words = {};
      lessonWords(b.heading + ' ' + b.body).forEach(function (w) { b.words[w] = true; });
      var counts = {};
      lessonWords(b.heading + ' ' + b.heading + ' ' + b.body).forEach(function (w) { counts[w] = (counts[w] || 0) + 1; });
      b.terms = Object.keys(counts)
        .filter(function (w) { return df[w] <= Math.max(2, beats.length * 0.4); })
        .sort(function (x, y) { return (counts[y] / df[y]) - (counts[x] / df[x]); })
        .slice(0, 14);
    });

    // Domain vocabulary for this topic: words that recur across its questions.
    // A word that appears in the theory but almost never in a question is prose,
    // not a concept, so highlighting it would point the eye at nothing.
    var qVocab = {};
    (t.questions || []).forEach(function (q) {
      var seen = {};
      lessonWords(q.q + ' ' + (q.options || []).join(' ')).forEach(function (w) {
        if (!seen[w]) { seen[w] = true; qVocab[w] = (qVocab[w] || 0) + 1; }
      });
    });

    // Score every (beat, question) pair, then hand each beat its best free question.
    var pool = (t.questions || []).filter(function (q) { return !LESSON_BACKREF.test(q.q); });
    var pairs = [];
    beats.forEach(function (b, bi) {
      var termSet = {};
      b.terms.forEach(function (w) { termSet[w] = true; });
      pool.forEach(function (q, qi) {
        var hit = {}, score = 0, qWords = {};
        lessonWords(q.q + ' ' + (q.explanation || '')).forEach(function (w) {
          qWords[w] = true;
          if (termSet[w] && !hit[w]) { hit[w] = true; score += 1 / (df[w] || 1); }
        });
        // What to highlight: words this beat and this question actually share,
        // limited to the topic's own question vocabulary so prose is never marked.
        var marks = [];
        Object.keys(qWords).forEach(function (w) {
          if (b.words[w] && qVocab[w]) marks.push(w);
        });
        marks.sort(function (a, b3) { return b3.length - a.length; });
        if (score > 0) pairs.push({ bi: bi, qi: qi, score: score, hits: marks });
      });
    });
    pairs.sort(function (a, b2) { return b2.score - a.score; });
    var takenQ = {}, filled = {};
    pairs.forEach(function (p) {
      if (filled[p.bi] || takenQ[p.qi]) return;
      filled[p.bi] = true; takenQ[p.qi] = true;
      beats[p.bi].q = pool[p.qi];
      beats[p.bi].hits = p.hits.slice(0, 5);
    });
    // Any beat the matcher could not serve still gets a question — easiest first,
    // so a beat never ends without something to do.
    var spare = pool.map(function (q, i) { return i; })
      .filter(function (i) { return !takenQ[i]; })
      .sort(function (a, b2) {
        var rank = { easy: 0, medium: 1, hard: 2 };
        return (rank[pool[a].difficulty] || 1) - (rank[pool[b2].difficulty] || 1);
      });
    beats.forEach(function (b, bi) {
      if (b.q) return;
      var i = spare.shift();
      if (i !== undefined) { b.q = pool[i]; b.hits = []; takenQ[i] = true; }
    });
    // A beat with no matched highlight still gets one: its own most distinctive
    // words, filtered to the same domain vocabulary.
    beats.forEach(function (b) {
      if (b.hits && b.hits.length) return;
      b.hits = Object.keys(b.words || {}).filter(function (w) { return qVocab[w]; })
        .sort(function (a, b3) { return b3.length - a.length; }).slice(0, 5);
    });
    var lesson = beats.filter(function (b) { return b.q; });
    // Questions the matcher never used are still the topic's own — keep them for
    // the "one more on this" button so the pool does not run dry mid-lesson.
    lesson.spare = spare.map(function (i) { return pool[i]; });
    lesson.strategy = th.strategy || '';
    return lesson;
  }

  var lessonCache = {};
  function lessonFor(tid) {
    if (!lessonCache[tid]) {
      var e = topicById(tid);
      lessonCache[tid] = e ? buildLesson(e) : [];
    }
    return lessonCache[tid];
  }

  // Highlight, inside the teaching text, the exact words the question is about to
  // test. Walks text nodes rather than the HTML string so no markup can be broken.
  function markTerms(root, terms, cap) {
    if (!terms || !terms.length) return;
    var uniq = terms.filter(function (w, i) { return terms.indexOf(w) === i && w.length >= 4; });
    if (!uniq.length) return;
    var re = new RegExp('\\b(' + uniq.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\  // Figures: questions may carry an inline SVG diagram'); }).join('|') + ')\\b', 'gi');
    var nodes = [], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n; while ((n = walker.nextNode())) nodes.push(n);
    var left = cap || 8;
    nodes.forEach(function (node) {
      if (left <= 0) return;
      if (node.parentNode && /^(MARK|CODE|SCRIPT|STYLE)$/.test(node.parentNode.nodeName)) return;
      var txt = node.nodeValue;
      re.lastIndex = 0;
      if (!re.test(txt)) return;
      re.lastIndex = 0;
      var frag = document.createDocumentFragment(), last = 0, m;
      while ((m = re.exec(txt)) && left > 0) {
        if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        var mk = document.createElement('mark');
        mk.className = 'hl';
        mk.textContent = m[0];
        frag.appendChild(mk);
        last = m.index + m[0].length;
        left--;
      }
      if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

// The guided walk is the headline action on a topic. It says how far in you
  // already are, because resuming something half-done is a far easier decision
  // than starting something whole.
  function lessonCta(tid) {
    var lesson = lessonFor(tid);
    if (!lesson.length) return '';
    var st = (S.lesson || {})[tid] || { beat: 0, done: 0 };
    var resuming = st.beat > 0;
    return '<button class="btn block good" id="learn">' +
      (resuming ? 'Resume the walk &mdash; step ' + (st.beat + 1) + ' of ' + lesson.length
                : 'Learn it step by step &mdash; ' + lesson.length + ' concepts') + '</button>' +
      '<div class="small muted" style="text-align:center;margin:6px 0 2px">' +
      (st.done ? 'Walked ' + st.done + (st.done === 1 ? ' time' : ' times') + '. '
               : 'One idea, then a question on it, all the way through. ') +
      'Nothing skipped.</div>';
  }

  function viewLesson(tid) {
    var e = topicById(tid); if (!e) return viewSubjects();
    var lesson = lessonFor(tid);
    if (!lesson.length) return viewTopic(tid);
    S.lesson = S.lesson || {};
    var st = S.lesson[tid] || { beat: 0, done: 0 };
    if (st.beat >= lesson.length) st.beat = 0;
    var i = st.beat, phase = 'teach', extra = null, qStart = 0;

    function head() {
      var pct = Math.round(i / lesson.length * 100);
      return '<button class="back-link" id="back">‹ ' + esc(e.topic.name) + '</button>' +
        '<div class="quiz-meta"><span>Step ' + (i + 1) + ' of ' + lesson.length + '</span>' +
        '<span class="pill">' + esc(e.subjectName) + '</span></div>' +
        '<div class="progress-track" style="margin-bottom:14px"><div class="progress-fill" style="width:' + pct + '%"></div></div>';
    }
    function wireBack() {
      var b = document.getElementById('back');
      if (b) b.addEventListener('click', function () { nav('topic', tid); });
    }

    function teach() {
      phase = 'teach';
      var b = lesson[i];
      $view.innerHTML = head() +
        '<div class="card lesson-card">' +
        (b.heading ? '<div class="eyebrow">' + esc(b.heading) + (b.part ? ' &middot; ' + b.part : '') + '</div>' : '') +
        '<div class="theory-body" id="lbody"></div></div>' +
        '<button class="btn block good" id="go-q">Got it &mdash; question me</button>' +
        '<div class="small muted" style="text-align:center;margin-top:8px">Highlighted words are what the question is about.</div>';
      var body = document.getElementById('lbody');
      body.innerHTML = renderTheory(b.body, (e.topic.theory || {}).figs);
      markTerms(body, b.hits || []);
      wireBack();
      document.getElementById('go-q').addEventListener('click', function () { ask(lesson[i].q); });
    }

    function ask(qq) {
      phase = 'ask';
      qStart = Date.now();
      var kind = qKind(qq);
      var html = head() +
        '<div class="card"><div class="eyebrow" style="color:var(--accent)">Your turn</div>' +
        '<div class="q-text">' + esc(qq.q) + '</div>' + figureHtml(qq) + '<div id="opts">';
      if (kind === 'nat') {
        html += '<input type="number" step="any" id="nat-in" placeholder="Type your numerical answer" inputmode="decimal">' +
          '<div class="btn-row"><button class="btn" id="nat-go">Check answer</button></div>';
      } else {
        (qq.options || []).forEach(function (o, oi) {
          html += '<button class="opt" data-i="' + oi + '">' + String.fromCharCode(65 + oi) + '.  ' + esc(o) + '</button>';
        });
        if (kind === 'msq') html += '<div class="btn-row"><button class="btn" id="msq-go">Submit selection</button></div>';
      }
      html += '</div><div id="after"></div></div>';
      $view.innerHTML = html;
      wireBack();

      function settle(ok, chosen) {
        recordAnswer(qq, ok, tid);
        var secs = Math.round((Date.now() - qStart) / 1000);
        S.speed = S.speed || { n: 0, total: 0 };
        S.speed.n++; S.speed.total += secs;
        $view.querySelectorAll('.opt').forEach(function (bb, j) {
          bb.disabled = true;
          var isRight = kind === 'msq' ? qq.answers.indexOf(j) >= 0 : j === qq.answer;
          var picked = kind === 'msq' ? (chosen || []).indexOf(j) >= 0 : j === chosen;
          if (isRight) bb.classList.add('correct');
          else if (picked) bb.classList.add('wrong');
        });
        var g = document.getElementById('msq-go') || document.getElementById('nat-go');
        if (g) g.disabled = true;
        var ni = document.getElementById('nat-in'); if (ni) ni.disabled = true;
        var last = (i >= lesson.length - 1);
        document.getElementById('after').innerHTML =
          '<div class="feedback-banner ' + (ok ? 'ok' : 'no') + '">' +
          (ok ? 'Correct &mdash; that concept is yours' : 'Not yet &mdash; read why, then carry on') + '</div>' +
          '<div class="explain"><b>' + answerLabel(qq) + '</b>\n' + esc(qq.explanation || '') + '</div>' +
          '<div class="btn-row">' +
          '<button class="btn good" id="nextb">' + (last ? 'Finish topic →' : 'Next concept →') + '</button>' +
          (lesson.spare && lesson.spare.length ? '<button class="btn ghost" id="more">One more on this</button>' : '') +
          '</div>' +
          (ok ? '' : '<div class="small muted" style="margin-top:8px">It goes back in the deck — you will see it again.</div>');
        document.getElementById('nextb').addEventListener('click', function () {
          if (last) return done();
          i++; st.beat = i; S.lesson[tid] = st; save();
          teach();
        });
        var mb = document.getElementById('more');
        if (mb) mb.addEventListener('click', function () {
          extra = lesson.spare.shift();
          if (extra) ask(extra); else mb.disabled = true;
        });
        window.scrollTo(0, 0);
      }

      if (kind === 'mcq') {
        $view.querySelectorAll('.opt').forEach(function (b) {
          b.addEventListener('click', function () {
            var oi = Number(b.getAttribute('data-i'));
            settle(oi === qq.answer, oi);
          });
        });
      } else if (kind === 'msq') {
        var sel = {};
        $view.querySelectorAll('.opt').forEach(function (b) {
          b.addEventListener('click', function () {
            var oi = Number(b.getAttribute('data-i'));
            sel[oi] = !sel[oi];
            b.style.borderColor = sel[oi] ? 'var(--accent)' : '';
          });
        });
        document.getElementById('msq-go').addEventListener('click', function () {
          var chosen = Object.keys(sel).filter(function (k) { return sel[k]; }).map(Number);
          settle(msqMatches(qq, chosen), chosen);
        });
      } else {
        document.getElementById('nat-go').addEventListener('click', function () {
          settle(natMatches(qq, document.getElementById('nat-in').value), null);
        });
      }
    }

    function done() {
      st.beat = 0; st.done = (st.done || 0) + 1; S.lesson[tid] = st; save();
      celebrate('<b>Topic walked</b><span>' + lesson.length + ' concepts, ' + lesson.length + ' questions</span>');
      $view.innerHTML = '<button class="back-link" id="back">‹ ' + esc(e.topic.name) + '</button>' +
        '<div class="card"><div class="eyebrow">Done</div><h2>' + esc(e.topic.name) + ' &mdash; walked end to end</h2>' +
        '<p class="muted small">' + lesson.length + ' concepts, each one tested the moment you read it. ' +
        'That is the whole topic, not a sample of it.</p>' +
        (lesson.strategy ? '<hr class="sep"><div class="eyebrow">Before you leave &mdash; exam strategy</div>' +
          '<div class="theory-body" id="strat"></div>' : '') +
        '<div class="btn-row"><button class="btn good" id="drill">Now drill it &mdash; infinite quiz</button></div>' +
        '<div class="btn-row"><button class="btn ghost" id="again">Walk it again</button></div></div>';
      var sEl = document.getElementById('strat');
      if (sEl) sEl.innerHTML = renderTheory(lesson.strategy, null);
      wireBack();
      document.getElementById('drill').addEventListener('click', function () { nav('quiz', tid); });
      document.getElementById('again').addEventListener('click', function () { i = 0; st.beat = 0; save(); teach(); });
    }

    teach();
  }

  // Figures: questions may carry an inline SVG diagram (automata, circuits, graphs, Gantt...).
  // Content is authored in this repo's own data files, so it is rendered as-is.
  function figureHtml(qq) {
    if (!qq.figure) return '';
    return '<div class="q-fig">' + qq.figure + '</div>';
  }

  // ---------- question kinds (GATE 2026 pattern: MCQ / MSQ / NAT) ----------
  function qKind(qq) {
    if (qq.kind) return qq.kind;
    if (Array.isArray(qq.answers)) return 'msq';
    if (!qq.options || !qq.options.length) return 'nat';
    return 'mcq';
  }
  function natMatches(qq, val) {
    var v = parseFloat(val);
    if (isNaN(v)) return false;
    var tol = (qq.tolerance !== undefined) ? qq.tolerance : Math.max(0.01, Math.abs(qq.answer) * 0.001);
    return Math.abs(v - qq.answer) <= tol;
  }
  function msqMatches(qq, selArr) {
    var want = qq.answers.slice().sort().join(',');
    var got = (selArr || []).slice().sort().join(',');
    return want === got && got !== '';
  }
  // Exam-pattern practice questions. These are written to match GATE question
  // patterns; they are not transcriptions of any specific year's paper, so the
  // label never claims a year.
  function pyqPill(qq) {
    return qq.pyqStyle ? '<span class="pill pyq">Exam pattern</span>' : '';
  }
  function kindPill(qq) {
    var k = qKind(qq);
    if (k === 'msq') return '<span class="pill">MSQ · pick all</span>';
    if (k === 'nat') return '<span class="pill">NAT · type answer</span>';
    return '';
  }
  function answerLabel(qq) {
    var k = qKind(qq);
    if (k === 'nat') return 'Answer: ' + qq.answer;
    if (k === 'msq') return 'Answer: ' + qq.answers.map(function (i) { return String.fromCharCode(65 + i); }).join(', ');
    return 'Answer: ' + String.fromCharCode(65 + qq.answer);
  }

  // ---------- QUIZ (infinite topic practice) ----------
  function viewQuiz(tid, startFilter) {
    var e = topicById(tid); if (!e) return viewSubjects();
    var sessionSeen = {}; var num = 0; var right = 0; var diffFilter = startFilter || 'all'; var qStart = 0;
    function filterBar() {
      return '<div class="theory-tabs" style="margin-top:8px">' + ['all', 'pattern', 'easy', 'medium', 'hard'].map(function (d) {
        return '<button data-df="' + d + '" class="' + (diffFilter === d ? 'active' : '') + '">' + d + '</button>';
      }).join('') + '</div>';
    }
    function ask() {
      num++;
      var qq = nextQuestion(tid, sessionSeen, diffFilter);
      if (!qq) { $view.innerHTML = '<button class="back-link" id="back">‹ ' + esc(e.topic.name) + '</button>' + filterBar() + '<div class="card"><h2>No ' + (diffFilter !== 'all' ? diffFilter + ' ' : '') + 'questions here yet</h2><p class="muted">Try another difficulty filter.</p></div>'; wireCommon(); return; }
      qStart = Date.now();
      sessionSeen[qq.id] = true;
      var L = S.leitner[qq.id];
      var repeatTag = (L && L.seen > 0 && qq.type !== 'generated') ? '<span class="pill">repeat</span>' : '';
      var genTag = qq.type === 'generated' ? '<span class="pill gen">∞ generated</span>' : '';
      var html = '<button class="back-link" id="back">‹ ' + esc(e.topic.name) + '</button>' + filterBar() +
        '<div class="quiz-meta"><span>Q' + num + ' · ' + right + ' correct</span><span><span class="pill ' + qq.difficulty + '">' + qq.difficulty + '</span><span class="pill">' + qq.marks + ' mark' + (qq.marks > 1 ? 's' : '') + '</span>' + pyqPill(qq) + kindPill(qq) + repeatTag + genTag + '</span></div>' +
        '<div class="card"><div class="q-text">' + esc(qq.q) + '</div>' + figureHtml(qq) + '<div id="opts">';
      var kind = qKind(qq);
      if (kind === 'nat') {
        html += '<input type="number" step="any" id="nat-in" placeholder="Type your numerical answer" inputmode="decimal">' +
          '<div class="btn-row"><button class="btn" id="nat-go">Check answer</button></div>';
      } else {
        (qq.options || []).forEach(function (o, i) {
          html += '<button class="opt" data-i="' + i + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
        });
        if (kind === 'msq') html += '<div class="btn-row"><button class="btn" id="msq-go">Submit selection</button></div>';
      }
      html += '</div><div id="after"></div></div>';
      $view.innerHTML = html;
      wireCommon();
      function settle(ok, chosen) {
        if (ok) right++;
        var secs = Math.round((Date.now() - qStart) / 1000);
        S.speed = S.speed || { n: 0, total: 0 };
        S.speed.n++; S.speed.total += secs;
        var budget = qq.marks * 108; // GATE avg ≈ 1.8 min per mark
        recordAnswer(qq, ok, tid);
        $view.querySelectorAll('.opt').forEach(function (bb, j) {
          bb.disabled = true;
          var isRight = kind === 'msq' ? qq.answers.indexOf(j) >= 0 : j === qq.answer;
          var wasPicked = kind === 'msq' ? (chosen || []).indexOf(j) >= 0 : j === chosen;
          if (isRight) bb.classList.add('correct');
          else if (wasPicked) bb.classList.add('wrong');
        });
        var goBtn = document.getElementById('msq-go') || document.getElementById('nat-go');
        if (goBtn) goBtn.disabled = true;
        var natIn = document.getElementById('nat-in');
        if (natIn) natIn.disabled = true;
        var speedNote = secs > budget ? ' &middot; ' + secs + 's (over the ~' + budget + 's exam budget — speed this pattern up)' : ' &middot; ' + secs + 's on pace';
        document.getElementById('after').innerHTML =
          '<div class="feedback-banner ' + (ok ? 'ok' : 'no') + '">' + (ok ? 'Correct' : 'Wrong &mdash; read why, this one comes back') + speedNote + '</div>' +
          '<div class="explain"><b>' + answerLabel(qq) + '</b>\n' + esc(qq.explanation || '') + '</div>' +
          '<div class="btn-row"><button class="btn" id="next">Next question →</button>' +
          (qq.type !== 'generated' ? '<button class="btn ghost" id="flag-q">Flag as doubtful</button>' : '') + '</div>';
        document.getElementById('next').addEventListener('click', ask);
        var fb = document.getElementById('flag-q');
        if (fb) fb.addEventListener('click', function () {
          S.flags = S.flags || {};
          S.flags[qq.id] = { topic: tid, when: Date.now() };
          save();
          fb.textContent = 'Flagged'; fb.disabled = true;
        });
        window.scrollTo(0, 0);
      }
      function wireCommon() {
        var bk = document.getElementById('back');
        if (bk) bk.addEventListener('click', function () { nav('topic', tid); });
        $view.querySelectorAll('[data-df]').forEach(function (b) {
          b.addEventListener('click', function () { diffFilter = b.getAttribute('data-df'); num--; ask(); });
        });
      }
      if (kind === 'mcq') {
        $view.querySelectorAll('.opt').forEach(function (b) {
          b.addEventListener('click', function () {
            var i = Number(b.getAttribute('data-i'));
            settle(i === qq.answer, i);
          });
        });
      } else if (kind === 'msq') {
        var sel = {};
        $view.querySelectorAll('.opt').forEach(function (b) {
          b.addEventListener('click', function () {
            var i = Number(b.getAttribute('data-i'));
            sel[i] = !sel[i];
            b.style.borderColor = sel[i] ? 'var(--accent)' : 'transparent';
          });
        });
        document.getElementById('msq-go').addEventListener('click', function () {
          var chosen = Object.keys(sel).filter(function (k) { return sel[k]; }).map(Number);
          settle(msqMatches(qq, chosen), chosen);
        });
      } else {
        document.getElementById('nat-go').addEventListener('click', function () {
          settle(natMatches(qq, document.getElementById('nat-in').value), null);
        });
      }
    }
    ask();
  }

  var BADGES = [
    { id: 'first',    name: 'First blood',      test: function (st) { return st.answered >= 1; },    hint: 'Answer your first question' },
    { id: 'ton',      name: 'Century',          test: function (st) { return st.answered >= 100; },  hint: 'Answer 100 questions' },
    { id: 'fivehund', name: 'Five hundred',     test: function (st) { return st.answered >= 500; },  hint: 'Answer 500 questions' },
    { id: 'grand',    name: 'Thousand club',    test: function (st) { return st.answered >= 1000; }, hint: 'Answer 1000 questions' },
    { id: 'hard10',   name: 'Iron stomach',     test: function (st) { return st.hardRight >= 10; },  hint: 'Get 10 hard questions right' },
    { id: 'hard50',   name: 'Hard mode',        test: function (st) { return st.hardRight >= 50; },  hint: 'Get 50 hard questions right' },
    { id: 'streak3',  name: 'Three in a row',   test: function (st) { return st.streak >= 3; },      hint: '3-day streak' },
    { id: 'streak7',  name: 'Full week',        test: function (st) { return st.streak >= 7; },      hint: '7-day streak' },
    { id: 'streak30', name: 'Month of fire',    test: function (st) { return st.streak >= 30; },     hint: '30-day streak' },
    { id: 'sprint10', name: 'Quick draw',       test: function (st) { return st.best60 >= 10; },     hint: '10 correct in one sprint' },
    { id: 'sprint20', name: 'Lightning',        test: function (st) { return st.best60 >= 20; },     hint: '20 correct in one sprint' },
    { id: 'mock1',    name: 'Battle tested',    test: function (st) { return st.mocks >= 1; },       hint: 'Finish a full mock' },
    { id: 'mock60',   name: 'Sixty club',       test: function (st) { return st.bestMock >= 60; },   hint: 'Score 60+ in a mock' },
    { id: 'mock80',   name: 'Elite',            test: function (st) { return st.bestMock >= 80; },   hint: 'Score 80+ in a mock' },
    { id: 'level5',   name: 'Level five',       test: function (st) { return st.level >= 5; },       hint: 'Reach level 5' },
    { id: 'level10',  name: 'Level ten',        test: function (st) { return st.level >= 10; },      hint: 'Reach level 10' }
  ];

  function badgeStats() {
    var answered = 0, hardRight = 0;
    Object.keys(S.leitner).forEach(function (id) { answered += S.leitner[id].seen || 0; });
    allTopics().forEach(function (e) {
      (e.topic.questions || []).forEach(function (q) {
        var L = S.leitner[q.id];
        if (q.difficulty === 'hard' && L && L.box >= 3) hardRight++;
      });
    });
    var bestMock = 0;
    S.mocks.forEach(function (m) { if (m.score > bestMock) bestMock = m.score; });
    return { answered: answered, hardRight: hardRight, streak: S.streak.count || 0,
             best60: S.best60 || 0, mocks: S.mocks.length, bestMock: bestMock, level: levelFor(S.xp) };
  }

  // Returns any badges newly unlocked by the last action, so they can be celebrated.
  function checkBadges() {
    var st = badgeStats(), fresh = [];
    BADGES.forEach(function (b) {
      if (!S.badges[b.id] && b.test(st)) { S.badges[b.id] = Date.now(); fresh.push(b); }
    });
    if (fresh.length) save();
    return fresh;
  }

  // A short celebration banner. Deliberately brief: it should reward, not interrupt.
  function celebrate(html) {
    var el = document.createElement('div');
    el.className = 'celebrate';
    el.innerHTML = html;
    document.body.appendChild(el);
    try { if (navigator.vibrate) navigator.vibrate([20, 60, 20, 60, 40]); } catch (e) {}
    setTimeout(function () { el.classList.add('out'); }, 2200);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 2700);
  }

  // ---------- LOW-FRICTION MODES ----------
  // The plan screen is a demand. On a low-dopamine day a demand gets avoided, the
  // streak breaks, and guilt keeps the app closed. These two modes ask for almost
  // nothing: one tap, no subject choice, no quota, no way to fail.

  // ONE QUESTION: single question, from anywhere, then a genuine exit.
  function viewOneQuestion() {
    var rec = anyQuestion();
    if (!rec) return viewHome();
    var qq = rec.q;
    var html = '<button class="back-link" id="back">‹ Today</button>' +
      '<div class="quiz-meta"><span>One question</span><span>' + esc(qq.difficulty) + '</span></div>' +
      '<div class="card"><div class="q-text">' + esc(qq.q) + '</div>' + figureHtml(qq) + '<div id="opts">';
    (qq.options || []).forEach(function (o, i) {
      html += '<button class="opt" data-i="' + i + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
    });
    if (!qq.options || !qq.options.length) {
      html += '<input type="number" step="any" id="one-nat" placeholder="Type your answer" inputmode="decimal">' +
        '<div class="btn-row"><button class="btn" id="one-go">Check</button></div>';
    }
    html += '</div><div id="after"></div></div>';
    $view.innerHTML = html;
    document.getElementById('back').addEventListener('click', function () { nav('home'); });
    function done(ok, chosen) {
      recordAnswer(qq, ok, rec.topic);
      $view.querySelectorAll('.opt').forEach(function (bb, j) {
        bb.disabled = true;
        if (j === qq.answer) bb.classList.add('correct');
        else if (j === chosen && !ok) bb.classList.add('wrong');
      });
      document.getElementById('after').innerHTML =
        '<div class="feedback-banner ' + (ok ? 'ok' : 'no') + '">' + (ok ? 'Correct &middot; +10 XP' : 'Wrong &middot; +3 XP for showing up') + '</div>' +
        '<div class="explain"><b>' + answerLabel(qq) + '</b>\n' + esc(qq.explanation || '') + '</div>' +
        '<div class="btn-row"><button class="btn" id="one-more">One more</button>' +
        '<button class="btn ghost" id="one-stop">Done for now</button></div>' +
        '<p class="muted small" style="margin-top:10px">Stopping here still counts. One question beats zero.</p>';
      document.getElementById('one-more').addEventListener('click', viewOneQuestion);
      document.getElementById('one-stop').addEventListener('click', function () { nav('home'); });
      window.scrollTo(0, 0);
    }
    $view.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () { var i = +b.getAttribute('data-i'); done(i === qq.answer, i); });
    });
    var go = document.getElementById('one-go');
    if (go) go.addEventListener('click', function () { done(natMatches(qq, document.getElementById('one-nat').value), null); });
  }

  // SPRINT: 60 seconds, easy-to-medium only, chase a personal best. Pure game loop.
  function viewSprint() {
    var left = 60, score = 0, answered = 0, timer = null, streak = 0;
    function finish() {
      clearInterval(timer); timer = null;
      var best = score > S.best60;
      if (best) { S.best60 = score; save(); }
      $view.innerHTML = '<div class="card"><div class="eyebrow">60-second sprint</div>' +
        '<div class="hero-day"><span class="hero-num">' + score + '</span><span class="hero-of">correct</span>' +
        '<span class="hero-right"><span class="n">' + S.best60 + '</span><div class="eyebrow" style="margin:2px 0 0">Best</div></span></div>' +
        (best ? '<div class="feedback-banner ok">New personal best</div>' : '') +
        '<p class="muted small">' + answered + ' attempted &middot; +' + (score * 10 + (answered - score) * 3) + ' XP</p>' +
        '<div class="btn-row"><button class="btn" id="again">Go again</button>' +
        '<button class="btn ghost" id="stop">Done</button></div></div>';
      document.getElementById('again').addEventListener('click', viewSprint);
      document.getElementById('stop').addEventListener('click', function () { nav('home'); });
    }
    function ask() {
      var rec = anyQuestion('easy');
      if (!rec) return finish();
      var qq = rec.q;
      var mm = Math.floor(left / 60), ss = left % 60;
      var html = '<div class="quiz-meta"><span>Sprint &middot; ' + score + ' correct' +
        (streak > 2 ? ' &middot; ' + streak + ' in a row' : '') + '</span>' +
        '<span class="timer">0' + mm + ':' + String(ss).padStart(2, '0') + '</span></div>' +
        '<div class="card"><div class="q-text">' + esc(qq.q) + '</div>' + figureHtml(qq) + '<div>';
      (qq.options || []).forEach(function (o, i) {
        html += '<button class="opt" data-i="' + i + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
      });
      html += '</div><div class="btn-row"><button class="btn ghost small-btn" id="skip">Skip</button>' +
        '<button class="btn ghost small-btn" id="quit">End sprint</button></div></div>';
      $view.innerHTML = html;
      $view.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var ok = +b.getAttribute('data-i') === qq.answer;
          answered++; if (ok) { score++; streak++; } else { streak = 0; }
          recordAnswer(qq, ok, rec.topic);
          b.classList.add(ok ? 'correct' : 'wrong');
          setTimeout(function () { if (timer) ask(); }, ok ? 160 : 700);
        });
      });
      document.getElementById('skip').addEventListener('click', ask);
      document.getElementById('quit').addEventListener('click', finish);
    }
    timer = setInterval(function () {
      left--;
      if (left <= 0) return finish();
      var t = document.querySelector('.timer');
      if (t) t.textContent = '00:' + String(left).padStart(2, '0');
    }, 1000);
    ask();
  }

  // DAILY CHALLENGE: one hard question, same for the whole day, triple XP, once only.
  // A single fresh thing each day is a stronger habit anchor than an open-ended quota.
  function dailyChallengeQuestion() {
    var pool = [];
    allTopics().forEach(function (e) {
      (e.topic.questions || []).forEach(function (q) {
        if (q.difficulty === 'hard' && q.options && q.options.length) pool.push({ q: q, topic: e.topic.id });
      });
    });
    if (!pool.length) return null;
    var key = todayKey(), seed = 0;
    for (var i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) % 100000;
    return pool[seed % pool.length];
  }

  function viewChallenge() {
    var rec = dailyChallengeQuestion();
    if (!rec) return viewHome();
    var qq = rec.q, doneToday = !!S.challenge[todayKey()];
    var html = '<button class="back-link" id="back">‹ Today</button>' +
      '<div class="card"><div class="eyebrow">Daily challenge &middot; triple XP</div>' +
      '<div class="q-text">' + esc(qq.q) + '</div>' + figureHtml(qq) + '<div id="opts">';
    qq.options.forEach(function (o, i) {
      html += '<button class="opt" data-i="' + i + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
    });
    html += '</div><div id="after"></div></div>';
    $view.innerHTML = html;
    document.getElementById('back').addEventListener('click', function () { nav('home'); });
    $view.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-i'), ok = i === qq.answer;
        if (!doneToday) { S.challenge[todayKey()] = ok ? 'win' : 'try'; if (ok) S.xp += 20; save(); }
        recordAnswer(qq, ok, rec.topic);
        $view.querySelectorAll('.opt').forEach(function (bb, j) {
          bb.disabled = true;
          if (j === qq.answer) bb.classList.add('correct');
          else if (j === i && !ok) bb.classList.add('wrong');
        });
        document.getElementById('after').innerHTML =
          '<div class="feedback-banner ' + (ok ? 'ok' : 'no') + '">' +
          (ok ? 'Challenge cleared &middot; +30 XP' : 'Missed it &mdash; but you showed up, +3 XP') + '</div>' +
          '<div class="explain"><b>' + answerLabel(qq) + '</b>\n' + esc(qq.explanation || '') + '</div>' +
          '<div class="btn-row"><button class="btn" id="ch-done">Back to today</button></div>';
        document.getElementById('ch-done').addEventListener('click', function () { nav('home'); });
        window.scrollTo(0, 0);
      });
    });
  }

  function viewBadges() {
    var st = badgeStats();
    var got = BADGES.filter(function (b) { return S.badges[b.id]; });
    var left = BADGES.filter(function (b) { return !S.badges[b.id]; });
    var html = '<button class="back-link" id="back">‹ Stats</button>' +
      '<div class="card"><div class="eyebrow">Achievements</div>' +
      '<div class="hero-day"><span class="hero-num" style="font-size:52px">' + got.length + '</span>' +
      '<span class="hero-of">/' + BADGES.length + '</span>' +
      '<span class="hero-right"><span class="n" style="color:var(--accent2)">L' + st.level + '</span>' +
      '<div class="eyebrow" style="margin:2px 0 0">' + S.xp + ' XP</div></span></div></div>';
    if (got.length) {
      html += '<div class="card"><h3>Unlocked</h3>';
      got.forEach(function (b) { html += '<div class="task-line"><span class="pill gen">✓</span><span>' + esc(b.name) + '</span></div>'; });
      html += '</div>';
    }
    html += '<div class="card"><h3>Next up</h3>';
    left.slice(0, 6).forEach(function (b) {
      html += '<div class="task-line"><span class="pill">•</span><span class="muted">' + esc(b.name) + ' &mdash; ' + esc(b.hint) + '</span></div>';
    });
    html += '</div>';
    $view.innerHTML = html;
    document.getElementById('back').addEventListener('click', function () { nav('progress'); });
  }

  // ---------- MOCK TEST ----------
  // Typical GATE CSE weightage (marks share) used to bias core sampling toward what the paper actually asks.
  var WEIGHT = { engmath: 14, pds: 10, algo: 8, os: 9, dbms: 7, cn: 7, coa: 8, toc: 7, digital: 4, compiler: 5 };
  function buildMock() {
    // GATE pattern: 10 GA questions (5×1M + 5×2M = 15 marks) + 55 core (25×1M + 30×2M = 85 marks)
    function sample(pool, n) {
      var p = pool.slice(); var out = [];
      while (out.length < n && p.length) out.push(p.splice(Math.floor(Math.random() * p.length), 1)[0]);
      return out;
    }
    function weightedSample(pool, n) {
      var p = pool.slice(); var out = [];
      while (out.length < n && p.length) {
        var total = 0;
        p.forEach(function (r) { total += (WEIGHT[r.subject] || 5); });
        var roll = Math.random() * total, acc = 0, idx = 0;
        for (var i = 0; i < p.length; i++) { acc += (WEIGHT[p[i].subject] || 5); if (roll <= acc) { idx = i; break; } }
        out.push(p.splice(idx, 1)[0]);
      }
      return out;
    }
    var ga1 = [], ga2 = [], core1 = [], core2 = [];
    allTopics().forEach(function (e2) {
      (e2.topic.questions || []).forEach(function (qq) {
        var rec = { q: qq, topic: e2.topic.id, subject: e2.subject };
        if (e2.subject === 'apti') (qq.marks === 2 ? ga2 : ga1).push(rec);
        else (qq.marks === 2 ? core2 : core1).push(rec);
      });
    });
    return sample(ga1, 5).concat(sample(ga2, 5), weightedSample(core1, 25), weightedSample(core2, 30));
  }
  function viewMockLanding() {
    var last = S.mocks[S.mocks.length - 1];
    var blocked = last && last.wrong > 0 && (last.tagged || 0) < last.wrong;
    var papers = (DATA.pyq || []).length;
    var html = '';

    // Real papers come first. A generated mock is unlimited but approximate; these
    // are the actual exam, and doing them is the single highest-value practice
    // there is. The generated mock is what you fall back on once they run out.
    if (papers) {
      var attempted = Object.keys(S.pyqLog || {}).length;
      html += '<div class="card" style="border-left:4px solid var(--accent2)">' +
        '<div class="eyebrow">The real thing</div><h2>Past-year papers</h2>' +
        '<p class="muted small">' + papers + ' actual GATE papers with the official answer key. ' +
        'Nothing here is written to look like GATE — it is GATE. ' +
        (attempted ? 'You have attempted ' + attempted + '.' : 'Start with the most recent one.') + '</p>' +
        '<div class="btn-row"><button class="btn good block" id="open-pyq">Open past papers</button></div></div>';
    }

    html += '<div class="card"><h2>Full mock test</h2><p class="muted small">' +
      (papers ? 'Generated from the practice bank — unlimited, for when you have used up the real papers. ' : '') +
      '65 questions · 100 marks · 3 hours · real GATE negative marking (−1/3 on 1-mark, −2/3 on 2-mark MCQs). No pausing — treat it like the real hall.</p>';
    if (blocked) {
      html += '<div class="feedback-banner no small">Locked &mdash; your last mock has ' + (last.wrong - (last.tagged || 0)) + ' untagged mistakes. Toppers never take a new mock before dissecting the last one — analyse every wrong answer first.</div>' +
        '<div class="btn-row"><button class="btn ghost" id="unlock-mock">I analysed every mistake on paper — unlock</button></div>';
    } else {
      html += '<div class="btn-row"><button class="btn good" id="start-mock">Start mock now</button></div>';
    }
    html += '</div>';
    if (S.mocks.length) {
      html += '<div class="card"><h3>Your mock history</h3>';
      S.mocks.slice().reverse().forEach(function (m) {
        html += '<div class="task-line"><span class="muted small">' + m.dateISO.slice(0, 10) + (m.day ? ' · Day ' + m.day : '') + '</span><span style="margin-left:auto;font-weight:800;color:' + (m.score >= 70 ? 'var(--good)' : m.score >= 50 ? 'var(--warn)' : 'var(--bad)') + '">' + m.score + '/100</span></div>';
      });
      html += '<p class="muted small">Curve to beat: 50 by Day 30 · 70 by Day 60 · 90 by Day 85.</p></div>';
    }
    $view.innerHTML = html;
    var op = document.getElementById('open-pyq');
    if (op) op.addEventListener('click', function () { nav('pyq'); });
    var sm = document.getElementById('start-mock');
    if (sm) sm.addEventListener('click', runMock);
    var um = document.getElementById('unlock-mock');
    if (um) um.addEventListener('click', function () { last.tagged = last.wrong; save(); viewMockLanding(); });
  }
  function runMock() {
    var paper = buildMock();
    if (paper.length < 20) { $view.innerHTML = '<div class="card"><h2>Question bank still loading</h2></div>'; return; }
    var idx = 0; var answers = {}; var seconds = 3 * 3600;
    function header() {
      var h = Math.floor(seconds / 3600), m = Math.floor(seconds % 3600 / 60), s = seconds % 60;
      return '<div class="quiz-meta"><span>Q' + (idx + 1) + '/' + paper.length + ' · ' + paper[idx].q.marks + ' mark' + (paper[idx].q.marks > 1 ? 's' : '') + '</span><span class="timer">' + [h, m, s].map(function (x) { return String(x).padStart(2, '0'); }).join(':') + '</span></div>';
    }
    function draw() {
      var it = paper[idx]; var qq = it.q;
      var kind = qKind(qq);
      var html = header() + '<div class="card">' + kindPill(qq) + (kind === 'mcq' ? '<span class="pill">MCQ · −ve marking</span>' : '<span class="pill gen">no −ve marking</span>') +
        '<div class="q-text" style="margin-top:8px">' + esc(qq.q) + '</div>' + figureHtml(qq) + '<div>';
      if (kind === 'nat') {
        html += '<input type="number" step="any" id="mock-nat" inputmode="decimal" placeholder="Type numerical answer" value="' + (answers[idx] !== undefined ? esc(answers[idx]) : '') + '">';
      } else {
        (qq.options || []).forEach(function (o, i) {
          var sel = kind === 'msq' ? (Array.isArray(answers[idx]) && answers[idx].indexOf(i) >= 0) : answers[idx] === i;
          html += '<button class="opt" data-i="' + i + '" style="' + (sel ? 'border-color:var(--accent)' : '') + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
        });
      }
      html += '</div></div><div class="btn-row">' +
        '<button class="btn ghost" id="prev" ' + (idx === 0 ? 'disabled' : '') + '>‹ Prev</button>' +
        '<button class="btn ghost" id="skip">Clear</button>' +
        (idx < paper.length - 1 ? '<button class="btn" id="nxt">Next ›</button>' : '<button class="btn good" id="submit">Submit</button>') +
        '</div><div class="btn-row"><button class="btn ghost small-btn" id="quit">Abandon test</button></div>';
      $view.innerHTML = html;
      $view.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var i = Number(b.getAttribute('data-i'));
          if (kind === 'msq') {
            var cur = Array.isArray(answers[idx]) ? answers[idx].slice() : [];
            var at = cur.indexOf(i);
            if (at >= 0) cur.splice(at, 1); else cur.push(i);
            if (cur.length) answers[idx] = cur; else delete answers[idx];
          } else {
            answers[idx] = i;
          }
          draw();
        });
      });
      var natEl = document.getElementById('mock-nat');
      if (natEl) natEl.addEventListener('input', function () {
        if (natEl.value === '') delete answers[idx]; else answers[idx] = natEl.value;
      });
      var el;
      if ((el = document.getElementById('prev'))) el.addEventListener('click', function () { idx--; draw(); });
      if ((el = document.getElementById('nxt'))) el.addEventListener('click', function () { idx++; draw(); });
      if ((el = document.getElementById('skip'))) el.addEventListener('click', function () { delete answers[idx]; draw(); });
      if ((el = document.getElementById('submit'))) el.addEventListener('click', finish);
      if ((el = document.getElementById('quit'))) el.addEventListener('click', function () { if (confirm('Abandon this mock? It will not be scored.')) { clearInterval(mockTimer); mockTimer = null; viewMockLanding(); } });
    }
    function finish() {
      clearInterval(mockTimer); mockTimer = null;
      var score = 0, correct = 0, wrong = 0, skipped = 0;
      paper.forEach(function (it, i) {
        var a = answers[i];
        if (a === undefined) { skipped++; return; }
        var kind = qKind(it.q);
        var ok = kind === 'nat' ? natMatches(it.q, a) : kind === 'msq' ? msqMatches(it.q, a) : a === it.q.answer;
        if (ok) { score += it.q.marks; correct++; }
        else { wrong++; if (kind === 'mcq') score -= it.q.marks / 3; } // MSQ & NAT: no negative marking
        recordAnswer(it.q, ok, it.topic);
      });
      score = Math.round(score * 100) / 100;
      S.mocks.push({ dateISO: new Date().toISOString(), day: missionDay(), score: score, max: 100, correct: correct, wrong: wrong, skipped: skipped });
      save();
      var verdict = score >= 90 ? 'Rank-1 territory. Hold the line.' : score >= 70 ? 'Strong &mdash; now hunt down every mark you dropped.' : score >= 50 ? 'On curve for month 1. Analyse every mistake for 2 hours.' : 'Below curve. Do not panic &mdash; list every wrong topic and drill them THIS week.';
      var html = '<div class="card"><h2>Mock result: ' + score + ' / 100</h2>' +
        '<div class="stat-grid"><div class="stat"><div class="num">' + correct + '</div><div class="lbl">correct</div></div>' +
        '<div class="stat"><div class="num">' + wrong + '</div><div class="lbl">wrong (−ve marked)</div></div>' +
        '<div class="stat"><div class="num">' + skipped + '</div><div class="lbl">skipped</div></div>' +
        '<div class="stat"><div class="num">' + (S.mocks.length) + '</div><div class="lbl">mocks taken</div></div></div>' +
        '<p class="small" style="margin-top:10px">' + verdict + '</p>' +
        '<div class="btn-row"><button class="btn" id="review">Review all answers</button><button class="btn ghost" id="done">Done</button></div></div>';
      $view.innerHTML = html;
      document.getElementById('done').addEventListener('click', viewMockLanding);
      document.getElementById('review').addEventListener('click', function () {
        var h = '<button class="back-link" id="back">‹ Result</button>' +
          '<div class="card"><p class="small muted">Topper habit: label every miss. <b>Concept</b> = didn\'t know it, <b>Silly</b> = knew it but slipped, <b>Time</b> = rushed/panicked. Your Progress tab tallies these so you know exactly what to fix.</p></div>';
        paper.forEach(function (it, i) {
          var a = answers[i]; var qq = it.q; var kind = qKind(qq);
          var ok = a === undefined ? false : (kind === 'nat' ? natMatches(qq, a) : kind === 'msq' ? msqMatches(qq, a) : a === qq.answer);
          h += '<div class="card"><div class="q-text">Q' + (i + 1) + '. ' + esc(qq.q) + '</div>' + figureHtml(qq);
          (qq.options || []).forEach(function (o, j) {
            var isRight = kind === 'msq' ? qq.answers.indexOf(j) >= 0 : j === qq.answer;
            var wasPicked = kind === 'msq' ? (Array.isArray(a) && a.indexOf(j) >= 0) : j === a;
            var cls = isRight ? 'correct' : (wasPicked ? 'wrong' : '');
            h += '<div class="opt ' + cls + '" style="cursor:default">' + String.fromCharCode(65 + j) + '.  ' + esc(o) + '</div>';
          });
          if (kind === 'nat') h += '<div class="small muted">Your answer: ' + (a === undefined ? '—' : esc(a)) + '</div>';
          h += '<div class="explain"><b>' + (a === undefined ? 'Skipped' : ok ? 'Correct' : 'Wrong') + ' · ' + answerLabel(qq) + '</b>\n' + esc(qq.explanation || '') + '</div>';
          if (!ok) {
            h += '<div class="btn-row" data-tag-row="' + i + '">' +
              '<button class="btn ghost small-btn" data-tag="concept" data-qi="' + i + '">Concept gap</button>' +
              '<button class="btn ghost small-btn" data-tag="silly" data-qi="' + i + '">Silly mistake</button>' +
              '<button class="btn ghost small-btn" data-tag="time" data-qi="' + i + '">Time trap</button></div>';
          }
          h += '</div>';
        });
        $view.innerHTML = h;
        S.mistakes = S.mistakes || { concept: 0, silly: 0, time: 0 };
        $view.querySelectorAll('[data-tag]').forEach(function (b) {
          b.addEventListener('click', function () {
            S.mistakes[b.getAttribute('data-tag')]++;
            var lm = S.mocks[S.mocks.length - 1];
            if (lm) lm.tagged = (lm.tagged || 0) + 1;
            save();
            var row = $view.querySelector('[data-tag-row="' + b.getAttribute('data-qi') + '"]');
            if (row) row.innerHTML = '<span class="pill">tagged: ' + b.getAttribute('data-tag') + '</span>';
          });
        });
        document.getElementById('back').addEventListener('click', function () { viewMockLanding(); });
        window.scrollTo(0, 0);
      });
    }
    mockTimer = setInterval(function () {
      seconds--;
      if (seconds <= 0) { finish(); return; }
      var t = document.querySelector('.timer');
      if (t) { var h = Math.floor(seconds / 3600), m = Math.floor(seconds % 3600 / 60), s = seconds % 60; t.textContent = [h, m, s].map(function (x) { return String(x).padStart(2, '0'); }).join(':'); }
    }, 1000);
    draw();
  }

  // ---------- REAL PAST-YEAR PAPERS ----------
  // Kept separate from the practice bank: these are transcribed from actual papers,
  // so the app can honestly label them by year. Empty until papers are imported.
  function pyqPapers() { return (DATA.pyq || []).slice().sort(function (a, b) { return b.year - a.year; }); }

  function viewPyqList() {
    var papers = pyqPapers();
    var html = '<button class="back-link" id="back">‹ Mock</button>' +
      '<div class="card"><div class="eyebrow">Real past-year papers</div>' +
      '<h2>' + papers.length + ' paper' + (papers.length === 1 ? '' : 's') + ' loaded</h2>';
    if (!papers.length) {
      html += '<p class="muted small">No real papers imported yet. Everything in the Study tab is ' +
        'practice material written to match GATE patterns &mdash; good training, but not actual exam questions.\n\n' +
        'To add real ones: download the official GATE CS papers (free), send the PDFs to Claude, ' +
        'and they get transcribed into this section with their true year and the official answer key.</p></div>';
    } else {
      html += '</div>';
      papers.forEach(function (p) {
        var log = (S.pyqLog || {})[p.year + '-' + p.paper] || {};
        html += '<div class="list-item" data-pyq="' + p.year + '-' + p.paper + '"><div class="grow">' +
          '<div class="title">GATE ' + p.year + ' &middot; ' + esc(p.paper) + '</div>' +
          '<div class="muted small">' + p.questions.length + ' questions' +
          (log.score !== undefined ? ' &middot; your score ' + log.score : ' &middot; not attempted') + '</div></div>' +
          '<span class="arrow">›</span></div>';
      });
    }
    $view.innerHTML = html;
    document.getElementById('back').addEventListener('click', function () { nav('test'); });
    $view.querySelectorAll('[data-pyq]').forEach(function (el) {
      el.addEventListener('click', function () { nav('pyqpaper', el.getAttribute('data-pyq')); });
    });
  }

  function viewPyqPaper(key) {
    var papers = pyqPapers();
    var paper = null;
    papers.forEach(function (p) { if (p.year + '-' + p.paper === key) paper = p; });
    if (!paper) return viewPyqList();
    var idx = 0, answers = {};
    function draw() {
      var it = paper.questions[idx];
      var kind = qKind(it);
      var html = '<div class="quiz-meta"><span>GATE ' + paper.year + ' &middot; Q' + (it.n || idx + 1) +
        '/' + paper.questions.length + '</span><span class="pill">' + it.marks + ' mark' + (it.marks > 1 ? 's' : '') + '</span></div>' +
        '<div class="card"><div class="q-text">' + esc(it.q) + '</div>' + figureHtml(it) + '<div>';
      if (kind === 'nat') {
        html += '<input type="number" step="any" id="pyq-nat" inputmode="decimal" placeholder="Numerical answer" value="' + (answers[idx] !== undefined ? esc(answers[idx]) : '') + '">';
      } else {
        (it.options || []).forEach(function (o, i) {
          var sel = kind === 'msq' ? (Array.isArray(answers[idx]) && answers[idx].indexOf(i) >= 0) : answers[idx] === i;
          html += '<button class="opt" data-i="' + i + '" style="' + (sel ? 'border-color:var(--accent)' : '') + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
        });
      }
      html += '</div></div><div class="btn-row">' +
        '<button class="btn ghost" id="prev" ' + (idx === 0 ? 'disabled' : '') + '>‹ Prev</button>' +
        (idx < paper.questions.length - 1 ? '<button class="btn" id="next">Next ›</button>'
          : '<button class="btn good" id="submit">Submit paper</button>') + '</div>' +
        '<div class="btn-row"><button class="btn ghost small-btn" id="exit">Leave</button></div>';
      $view.innerHTML = html;
      $view.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var i = +b.getAttribute('data-i');
          if (kind === 'msq') {
            var cur = Array.isArray(answers[idx]) ? answers[idx].slice() : [];
            var at = cur.indexOf(i); if (at >= 0) cur.splice(at, 1); else cur.push(i);
            if (cur.length) answers[idx] = cur; else delete answers[idx];
          } else answers[idx] = i;
          draw();
        });
      });
      var nat = document.getElementById('pyq-nat');
      if (nat) nat.addEventListener('input', function () { if (nat.value === '') delete answers[idx]; else answers[idx] = nat.value; });
      var el;
      if ((el = document.getElementById('prev'))) el.addEventListener('click', function () { idx--; draw(); });
      if ((el = document.getElementById('next'))) el.addEventListener('click', function () { idx++; draw(); });
      if ((el = document.getElementById('exit'))) el.addEventListener('click', viewPyqList);
      if ((el = document.getElementById('submit'))) el.addEventListener('click', finish);
    }
    // Was this question answered correctly? Unanswered counts as wrong for review
    // purposes but is scored as a skip (no negative marking), like the real exam.
    function graded(it, a) {
      if (a === undefined) return { attempted: false, ok: false };
      var kind = qKind(it);
      return { attempted: true, ok: kind === 'nat' ? natMatches(it, a) : kind === 'msq' ? msqMatches(it, a) : a === it.answer };
    }

    function finish() {
      var score = 0, correct = 0, wrong = 0, skipped = 0;
      paper.questions.forEach(function (it, i) {
        var g = graded(it, answers[i]);
        if (!g.attempted) { skipped++; return; }
        if (g.ok) { score += it.marks; correct++; }
        else { wrong++; if (qKind(it) === 'mcq') score -= it.marks / 3; }
      });
      score = Math.round(score * 100) / 100;
      S.pyqLog = S.pyqLog || {};
      S.pyqLog[paper.year + '-' + paper.paper] = { score: score, correct: correct, when: Date.now() };
      save();
      $view.innerHTML = '<div class="card"><div class="eyebrow">GATE ' + paper.year + ' &middot; real paper</div>' +
        '<div class="hero-day"><span class="hero-num">' + score + '</span><span class="hero-of">marks</span></div>' +
        '<p class="muted small">' + correct + ' right &middot; ' + wrong + ' wrong &middot; ' + skipped + ' left blank, ' +
        'out of ' + paper.questions.length + '</p>' +
        '<div class="btn-row">' +
        (wrong + skipped ? '<button class="btn good" id="rev-bad">Review what you missed</button>' : '') +
        '<button class="btn" id="rev-all">Review every question</button></div>' +
        '<div class="btn-row"><button class="btn ghost small-btn" id="back2">Back to papers</button></div></div>';
      var el;
      if ((el = document.getElementById('rev-bad'))) el.addEventListener('click', function () { review(true); });
      if ((el = document.getElementById('rev-all'))) el.addEventListener('click', function () { review(false); });
      document.getElementById('back2').addEventListener('click', viewPyqList);
    }

    // The whole point of doing a past paper is the walk back through it. Show the
    // question, what you put, what the official key says, and why.
    function review(missedOnly) {
      var html = '<button class="back-link" id="back3">‹ Score</button>' +
        '<div class="card"><div class="eyebrow">GATE ' + paper.year + ' &middot; ' + esc(paper.paper) + '</div>' +
        '<h2>' + (missedOnly ? 'What you missed' : 'Every question') + '</h2>' +
        '<p class="muted small">Official answers, from the published answer key.</p></div>';
      var shown = 0;
      paper.questions.forEach(function (it, i) {
        var g = graded(it, answers[i]);
        if (missedOnly && g.ok) return;
        shown++;
        var kind = qKind(it);
        var tag = !g.attempted ? '<span class="pill">Left blank</span>'
          : g.ok ? '<span class="pill" style="color:var(--accent2);border-color:var(--accent2)">Correct</span>'
                 : '<span class="pill" style="color:var(--accent);border-color:var(--accent)">Wrong</span>';
        html += '<div class="card q-review"><div class="quiz-meta"><span>Q' + (it.n || i + 1) + ' &middot; ' +
          it.marks + ' mark' + (it.marks > 1 ? 's' : '') + '</span>' + tag + '</div>' +
          '<div class="q-text">' + esc(it.q) + '</div>' + figureHtml(it);
        if (kind === 'nat') {
          html += '<div class="opt-nat">' + esc(String(it.answer)) +
            (it.tolerance ? ' <span class="muted small">(accepted &plusmn; ' + it.tolerance + ')</span>' : '') + '</div>';
          if (g.attempted) html += '<p class="small muted">You answered ' + esc(String(answers[i])) + '.</p>';
        } else {
          var right = Array.isArray(it.answers) ? it.answers : [it.answer];
          var mine = Array.isArray(answers[i]) ? answers[i] : (answers[i] === undefined ? [] : [answers[i]]);
          (it.options || []).forEach(function (o, oi) {
            var isRight = right.indexOf(oi) >= 0, isMine = mine.indexOf(oi) >= 0;
            var style = isRight ? 'border-color:var(--accent2);color:var(--accent2)'
              : (isMine ? 'border-color:var(--accent);color:var(--accent)' : 'opacity:.6');
            html += '<div class="opt" style="' + style + '">' + String.fromCharCode(65 + oi) + '.  ' + esc(o) +
              (isRight ? '  &check;' : (isMine ? '  &times; your answer' : '')) + '</div>';
          });
        }
        if (it.explanation) html += '<div class="q-why">' + inlineTheory(it.explanation) + '</div>';
        html += '</div>';
      });
      if (!shown) html += '<div class="card"><p class="muted">Nothing to review — you got every question right.</p></div>';
      $view.innerHTML = html;
      document.getElementById('back3').addEventListener('click', finish);
      window.scrollTo(0, 0);
    }
    draw();
  }

  // ---------- PROGRESS ----------
  function viewProgress() {
    var totalAtt = 0, totalCor = 0;
    Object.keys(S.topicStats).forEach(function (k) { totalAtt += S.topicStats[k].attempts; totalCor += S.topicStats[k].correct; });
    var mastered = 0, totalQ = 0;
    allTopics().forEach(function (e2) {
      (e2.topic.questions || []).forEach(function (qq) {
        totalQ++;
        var L = S.leitner[qq.id]; if (L && L.box >= 3) mastered++;
      });
    });
    var html = '<div class="card"><h3>Progress</h3></div>' +
      '<div class="card"><div class="stat-grid">' +
      '<div class="stat"><div class="num">' + totalAtt + '</div><div class="lbl">questions answered</div></div>' +
      '<div class="stat"><div class="num">' + (totalAtt ? Math.round(totalCor / totalAtt * 100) : 0) + '%</div><div class="lbl">overall accuracy</div></div>' +
      '<div class="stat"><div class="num">' + mastered + '/' + totalQ + '</div><div class="lbl">questions mastered</div></div>' +
      '<div class="stat"><div class="num">' + (S.mocks.length ? S.mocks[S.mocks.length - 1].score : '—') + '</div><div class="lbl">latest mock /100</div></div>' +
      '<div class="stat"><div class="num">' + (S.speed && S.speed.n ? Math.round(S.speed.total / S.speed.n) + 's' : '—') + '</div><div class="lbl">avg time / question</div></div>' +
      '<div class="stat"><div class="num">' + Object.keys(S.flags || {}).length + '</div><div class="lbl">flagged doubtful</div></div>' +
      '</div></div>';
    var mk = S.mistakes;
    if (mk && (mk.concept + mk.silly + mk.time) > 0) {
      html += '<div class="card"><h3>Mock mistake anatomy</h3><div class="stat-grid" style="grid-template-columns:1fr 1fr 1fr">' +
        '<div class="stat"><div class="num">' + mk.concept + '</div><div class="lbl">concept gaps</div></div>' +
        '<div class="stat"><div class="num">' + mk.silly + '</div><div class="lbl">silly slips</div></div>' +
        '<div class="stat"><div class="num">' + mk.time + '</div><div class="lbl">time traps</div></div></div>' +
        '<p class="muted small" style="margin-top:8px">Concept gaps → reread that topic\'s Deep dive. Silly slips → slow down on 1-markers. Time traps → practice with a timer.</p></div>';
    }
    // weakest topics
    var weak = [];
    Object.keys(S.topicStats).forEach(function (tid) {
      var st = S.topicStats[tid];
      if (st.attempts >= 5) weak.push({ tid: tid, acc: st.correct / st.attempts, n: st.attempts });
    });
    weak.sort(function (a, b) { return a.acc - b.acc; });
    if (weak.length) {
      html += '<div class="card"><h3>Weakest topics &mdash; drill these first</h3>';
      weak.slice(0, 5).forEach(function (w) {
        var e2 = topicById(w.tid);
        html += '<div class="list-item" data-topic="' + w.tid + '" style="margin-bottom:8px"><div class="grow"><div class="title small">' + esc(e2 ? e2.topic.name : w.tid) + '</div>' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + Math.round(w.acc * 100) + '%"></div></div>' +
          '<div class="muted small">' + Math.round(w.acc * 100) + '% over ' + w.n + ' attempts</div></div><span class="arrow">›</span></div>';
      });
      html += '</div>';
    }
    // subject bars
    html += '<div class="card"><h3>Subject accuracy</h3>';
    SUBJECT_ORDER.forEach(function (k) {
      var s = BANK[k]; if (!s) return;
      var att = 0, cor = 0;
      (s.topics || []).forEach(function (t) { var st = S.topicStats[t.id]; if (st) { att += st.attempts; cor += st.correct; } });
      var pct = att ? Math.round(cor / att * 100) : 0;
      html += '<div class="small" style="margin-top:8px">' + esc(s.subject) + ' — ' + (att ? pct + '%' : 'not started') + '</div>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>';
    });
    html += '</div>';
    // mock curve
    if (S.mocks.length) {
      html += '<div class="card"><h3>Mock scores vs the rank-1 curve</h3>';
      S.mocks.forEach(function (m, i) {
        var pct = Math.max(0, Math.min(100, m.score));
        html += '<div class="small muted">Mock ' + (i + 1) + (m.day ? ' (Day ' + m.day + ')' : '') + ' — ' + m.score + '/100</div>' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>';
      });
      html += '<p class="muted small">Targets: Day 30 → 50 · Day 60 → 70 · Day 85+ → 90.</p></div>';
    }
    html += '<div class="list-item" id="open-badges"><div class="grow"><div class="title">Achievements</div>' +
      '<div class="muted small">' + Object.keys(S.badges).length + ' of ' + BADGES.length + ' unlocked &middot; level ' + levelFor(S.xp) + '</div></div><span class="arrow">›</span></div>';

    // backup & restore — localStorage is fragile; never lose 90 days of grind
    html += '<div class="card"><h3>Backup &amp; restore</h3>' +
      '<p class="muted small">Your progress lives only on this device. Export it weekly — paste the code somewhere safe (notes app, email to yourself).</p>' +
      '<div class="btn-row"><button class="btn ghost" id="exp-btn">Export progress</button><button class="btn ghost" id="imp-btn">Import</button></div>' +
      '<textarea id="backup-box" style="display:none;width:100%;margin-top:10px;background:var(--card2);color:var(--text);border:1px solid #33396b;border-radius:10px;padding:10px;min-height:90px;font-size:12px"></textarea>' +
      '<div class="btn-row" id="imp-row" style="display:none"><button class="btn good" id="imp-go">Restore from pasted code</button></div></div>';
    $view.innerHTML = html;
    var ob = document.getElementById('open-badges');
    if (ob) ob.addEventListener('click', function () { nav('badges'); });
    var box = document.getElementById('backup-box');
    document.getElementById('exp-btn').addEventListener('click', function () {
      box.style.display = 'block';
      document.getElementById('imp-row').style.display = 'none';
      box.value = JSON.stringify(S);
      box.select();
      try { document.execCommand('copy'); } catch (e) {}
      if (navigator.clipboard) navigator.clipboard.writeText(box.value).catch(function () {});
      alert('Progress code copied to clipboard (also shown below). Save it somewhere safe.');
    });
    document.getElementById('imp-btn').addEventListener('click', function () {
      box.style.display = 'block'; box.value = ''; box.placeholder = 'Paste your backup code here';
      document.getElementById('imp-row').style.display = 'flex';
    });
    document.getElementById('imp-go').addEventListener('click', function () {
      try {
        var data = JSON.parse(box.value);
        if (!data || typeof data !== 'object' || (!data.leitner && !data.startDate)) throw new Error('bad');
        if (!confirm('Replace current progress with this backup?')) return;
        localStorage.setItem('gate_r1', JSON.stringify(data));
        location.reload();
      } catch (e) { alert('That does not look like a valid backup code.'); }
    });
    $view.querySelectorAll('[data-topic]').forEach(function (el) {
      el.addEventListener('click', function () { nav('quiz', el.getAttribute('data-topic')); });
    });
  }

  // ---------- PLAN ----------
  function viewPlan() {
    var d = missionDay() || 0;
    var html = '<div class="card"><h3>The 90-day battle plan</h3>' +
      '<p class="muted small">Phase 1 (D1–30): learn fast, mock to 50. Phase 2 (D31–60): finish syllabus, mock to 70. Phase 3 (D61–90): revise + mock to 90+. Tap a day to see its objectives.</p></div>';
    (DATA.plan || []).forEach(function (p) {
      var checks = S.planChecks[p.day] || {};
      var doneCt = Object.keys(checks).filter(function (k) { return checks[k]; }).length;
      var allDone = doneCt >= p.tasks.length;
      html += '<div class="day-row' + (p.day === d ? ' today' : '') + (allDone ? ' done' : '') + '" data-day="' + p.day + '">' +
        '<div class="day-num">D' + p.day + (p.mock ? '' : '') + '</div>' +
        '<div class="grow"><div class="small" style="font-weight:700">' + esc(p.title) + '</div>' +
        '<div class="muted small">' + doneCt + '/' + p.tasks.length + ' done · quota ' + p.quota + ' Qs' + (p.target ? ' · target ' + p.target + '/100' : '') + '</div>' +
        '<div class="day-detail" style="display:none" data-detail="' + p.day + '"></div></div></div>';
    });
    $view.innerHTML = html;
    $view.querySelectorAll('.day-row').forEach(function (row) {
      row.addEventListener('click', function () {
        var day = Number(row.getAttribute('data-day'));
        var det = row.querySelector('[data-detail]');
        if (det.style.display === 'none') {
          var p = DATA.plan[day - 1];
          var checks = S.planChecks[day] || {};
          var h = '';
          p.tasks.forEach(function (t, i) {
            h += '<label class="task-line" onclick="event.stopPropagation()"><input type="checkbox" data-d="' + day + '" data-t="' + i + '" ' + (checks[i] ? 'checked' : '') + '><span class="small">' + esc(t.text) + '</span></label>';
          });
          det.innerHTML = h;
          det.style.display = 'block';
          det.querySelectorAll('input').forEach(function (cb) {
            cb.addEventListener('change', function (ev) {
              ev.stopPropagation();
              var c = S.planChecks[day] || {}; c[cb.getAttribute('data-t')] = cb.checked; S.planChecks[day] = c; save();
            });
          });
        } else det.style.display = 'none';
      });
    });
    var todayRow = $view.querySelector('.day-row.today');
    if (todayRow) todayRow.scrollIntoView({ block: 'center' });
  }

  // ---------- boot ----------
  renderChips();
  nav('home');
})();
