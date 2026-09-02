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
    setTab(name === 'topic' || name === 'quiz' ? 'subjects' : (name.indexOf('mock') === 0 ? 'test' : name));
    if (name === 'home') return viewHome();
    if (name === 'subjects') return viewSubjects();
    if (name === 'subject') return viewSubject(arg);
    if (name === 'topic') return viewTopic(arg);
    if (name === 'quiz') return viewQuiz(arg, arg2);
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
      '<span class="hero-of">/' + quota + ' Q</span>' +
      '<span class="hero-right"><div class="eyebrow" style="margin:0">Phase ' + (plan ? plan.phase : '-') + '</div></span></div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div></div>';

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
      '<button class="btn block good" id="practice">Practice &mdash; infinite quiz</button>' +
      (pyqCount(t) ? '<button class="btn block ghost" id="pyq-set" style="margin-top:8px">Exam-pattern set &mdash; ' + pyqCount(t) + ' questions</button>' : '');
    $view.innerHTML = html;
    var body = document.getElementById('tbody');
    function show(k) {
      body.textContent = (t.theory && t.theory[k]) || 'Theory coming soon.';
      $view.querySelectorAll('[data-tt]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tt') === k); });
    }
    show('intro');
    $view.querySelectorAll('[data-tt]').forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-tt')); });
    });
    document.getElementById('back').addEventListener('click', function () { nav('subject', e.subject); });
    document.getElementById('practice').addEventListener('click', function () { nav('quiz', tid); });
    var pb = document.getElementById('pyq-set');
    if (pb) pb.addEventListener('click', function () { nav('quiz', tid, 'pattern'); });
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
    var html = '<div class="card"><h2>Full mock test</h2><p class="muted small">65 questions · 100 marks · 3 hours · real GATE negative marking (−1/3 on 1-mark, −2/3 on 2-mark MCQs). No pausing — treat it like the real hall.</p>';
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
    // backup & restore — localStorage is fragile; never lose 90 days of grind
    html += '<div class="card"><h3>Backup &amp; restore</h3>' +
      '<p class="muted small">Your progress lives only on this device. Export it weekly — paste the code somewhere safe (notes app, email to yourself).</p>' +
      '<div class="btn-row"><button class="btn ghost" id="exp-btn">Export progress</button><button class="btn ghost" id="imp-btn">Import</button></div>' +
      '<textarea id="backup-box" style="display:none;width:100%;margin-top:10px;background:var(--card2);color:var(--text);border:1px solid #33396b;border-radius:10px;padding:10px;min-height:90px;font-size:12px"></textarea>' +
      '<div class="btn-row" id="imp-row" style="display:none"><button class="btn good" id="imp-go">Restore from pasted code</button></div></div>';
    $view.innerHTML = html;
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
