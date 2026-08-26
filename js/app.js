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

  function todayKey() { var d = new Date(); return d.toISOString().slice(0, 10); }
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
      S.streak.count = (S.streak.last === y.toISOString().slice(0, 10)) ? S.streak.count + 1 : 1;
      S.streak.last = k;
    }
    save(); renderChips();
  }

  // Infinite queue for a topic: due-wrong first → unseen → recycle (weakest first) with generated interleave.
  function nextQuestion(topicId, sessionSeen) {
    var entry = topicById(topicId);
    var qs = entry ? entry.topic.questions : [];
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
    document.getElementById('streak-chip').textContent = '🔥 ' + (S.streak.count || 0);
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
  function nav(name, arg) {
    if (mockTimer && name !== 'mock-run') { clearInterval(mockTimer); mockTimer = null; }
    window.scrollTo(0, 0);
    setTab(name === 'topic' || name === 'quiz' ? 'subjects' : (name.indexOf('mock') === 0 ? 'test' : name));
    if (name === 'home') return viewHome();
    if (name === 'subjects') return viewSubjects();
    if (name === 'subject') return viewSubject(arg);
    if (name === 'topic') return viewTopic(arg);
    if (name === 'quiz') return viewQuiz(arg);
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
        '<div class="card"><h2>🎯 Mission: GATE Rank 1 in 90 days</h2>' +
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
    html += '<div class="card"><h2>Day ' + d + ' of 90 — ' + esc(plan ? plan.title : 'Grind') + '</h2>' +
      '<div class="muted small">Phase ' + (plan ? plan.phase : '-') + (plan && plan.mock ? ' · <b style="color:var(--warn)">MOCK DAY — target ' + plan.target + '/100</b>' : '') + '</div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="small muted">' + answered + ' / ' + quota + ' questions solved today</div></div>';

    if (plan) {
      html += '<div class="card"><h3>✅ Today\'s objectives</h3>';
      var checks = S.planChecks[d] || {};
      plan.tasks.forEach(function (t, i) {
        html += '<label class="task-line"><input type="checkbox" data-task="' + i + '" ' + (checks[i] ? 'checked' : '') + '><span>' + esc(t.text) + '</span></label>';
      });
      html += '<div class="btn-row">';
      (plan.focus || []).forEach(function (f) {
        if (BANK[f]) html += '<button class="btn" data-go-subject="' + f + '">Open ' + esc(BANK[f].subject) + '</button>';
      });
      if (plan.mock) html += '<button class="btn good" data-go-mock="1">Take today\'s mock</button>';
      html += '</div></div>';
    }
    if (astro) {
      html += '<div class="card astro-card"><h3>♓ Pisces daily — Meena rashi</h3>' +
        '<p class="small">' + esc(astro.focus) + '</p><hr class="sep">' +
        '<p class="small muted">🎨 Lucky colour: <b>' + astro.color + '</b> · 🔢 Lucky number: <b>' + astro.number + '</b> · ⏰ Best study window: <b>' + astro.time + '</b></p>' +
        '<p class="small muted">🕉️ ' + esc(astro.mantra) + '</p>' +
        '<p class="small muted">✨ Today\'s ritual: ' + esc(astro.ritual) + '</p></div>';
    }
    html += '<div class="card"><h3>🕐 The 12-hour day (tap to expand)</h3><div id="tmpl" class="small muted" style="display:none;white-space:pre-wrap">' + (DATA.dayTemplate || []).join('\n') + '</div></div>';
    $view.innerHTML = html;
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
    var html = '<h2 style="margin-bottom:12px">📚 Full GATE CS&IT syllabus</h2>';
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

  // ---------- TOPIC (theory) ----------
  function viewTopic(tid) {
    var e = topicById(tid); if (!e) return viewSubjects();
    var t = e.topic;
    var html = '<button class="back-link" id="back">‹ ' + esc(e.subjectName) + '</button>' +
      '<h2 style="margin-bottom:10px">' + esc(t.name) + '</h2>' +
      '<div class="theory-tabs">' +
      '<button data-tt="intro" class="active">Intro</button>' +
      '<button data-tt="core">Core theory</button>' +
      '<button data-tt="strategy">Exam strategy</button></div>' +
      '<div class="card"><div class="theory-body" id="tbody"></div></div>' +
      '<button class="btn block good" id="practice">🚀 Practice this topic (infinite quiz)</button>';
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
  }

  // ---------- QUIZ (infinite topic practice) ----------
  function viewQuiz(tid) {
    var e = topicById(tid); if (!e) return viewSubjects();
    var sessionSeen = {}; var num = 0; var right = 0;
    function ask() {
      num++;
      var qq = nextQuestion(tid, sessionSeen);
      if (!qq) { $view.innerHTML = '<div class="card"><h2>No questions here yet</h2><p class="muted">This topic\'s bank is still loading in a future update.</p></div>'; return; }
      sessionSeen[qq.id] = true;
      var L = S.leitner[qq.id];
      var repeatTag = (L && L.seen > 0 && qq.type !== 'generated') ? '<span class="pill">repeat</span>' : '';
      var genTag = qq.type === 'generated' ? '<span class="pill gen">∞ generated</span>' : '';
      var html = '<button class="back-link" id="back">‹ ' + esc(e.topic.name) + '</button>' +
        '<div class="quiz-meta"><span>Q' + num + ' · ' + right + ' correct</span><span><span class="pill ' + qq.difficulty + '">' + qq.difficulty + '</span><span class="pill">' + qq.marks + ' mark' + (qq.marks > 1 ? 's' : '') + '</span>' + repeatTag + genTag + '</span></div>' +
        '<div class="card"><div class="q-text">' + esc(qq.q) + '</div><div id="opts">';
      qq.options.forEach(function (o, i) {
        html += '<button class="opt" data-i="' + i + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
      });
      html += '</div><div id="after"></div></div>';
      $view.innerHTML = html;
      document.getElementById('back').addEventListener('click', function () { nav('topic', tid); });
      $view.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var i = Number(b.getAttribute('data-i'));
          var ok = i === qq.answer;
          if (ok) right++;
          recordAnswer(qq, ok, tid);
          $view.querySelectorAll('.opt').forEach(function (bb, j) {
            bb.disabled = true;
            if (j === qq.answer) bb.classList.add('correct');
            else if (j === i && !ok) bb.classList.add('wrong');
          });
          document.getElementById('after').innerHTML =
            '<div class="feedback-banner ' + (ok ? 'ok' : 'no') + '">' + (ok ? '✅ Correct!' : '❌ Not quite — read why, this one WILL come back') + '</div>' +
            '<div class="explain"><b>Answer: ' + String.fromCharCode(65 + qq.answer) + '</b>\n' + esc(qq.explanation || '') + '</div>' +
            '<div class="btn-row"><button class="btn" id="next">Next question →</button></div>';
          document.getElementById('next').addEventListener('click', ask);
          window.scrollTo(0, 0);
        });
      });
    }
    ask();
  }

  // ---------- MOCK TEST ----------
  function buildMock() {
    // GATE pattern: 10 GA questions (5×1M + 5×2M = 15 marks) + 55 core (25×1M + 30×2M = 85 marks)
    function sample(pool, n) {
      var p = pool.slice(); var out = [];
      while (out.length < n && p.length) out.push(p.splice(Math.floor(Math.random() * p.length), 1)[0]);
      return out;
    }
    var ga1 = [], ga2 = [], core1 = [], core2 = [];
    allTopics().forEach(function (e2) {
      (e2.topic.questions || []).forEach(function (qq) {
        var rec = { q: qq, topic: e2.topic.id };
        if (e2.subject === 'apti') (qq.marks === 2 ? ga2 : ga1).push(rec);
        else (qq.marks === 2 ? core2 : core1).push(rec);
      });
    });
    return sample(ga1, 5).concat(sample(ga2, 5), sample(core1, 25), sample(core2, 30));
  }
  function viewMockLanding() {
    var html = '<div class="card"><h2>📝 Full mock test</h2><p class="muted small">65 questions · 100 marks · 3 hours · real GATE negative marking (−1/3 on 1-mark, −2/3 on 2-mark MCQs). No pausing — treat it like the real hall.</p>' +
      '<div class="btn-row"><button class="btn good" id="start-mock">Start mock now</button></div></div>';
    if (S.mocks.length) {
      html += '<div class="card"><h3>Your mock history</h3>';
      S.mocks.slice().reverse().forEach(function (m) {
        html += '<div class="task-line"><span class="muted small">' + m.dateISO.slice(0, 10) + (m.day ? ' · Day ' + m.day : '') + '</span><span style="margin-left:auto;font-weight:800;color:' + (m.score >= 70 ? 'var(--good)' : m.score >= 50 ? 'var(--warn)' : 'var(--bad)') + '">' + m.score + '/100</span></div>';
      });
      html += '<p class="muted small">Curve to beat: 50 by Day 30 · 70 by Day 60 · 90 by Day 85.</p></div>';
    }
    $view.innerHTML = html;
    document.getElementById('start-mock').addEventListener('click', runMock);
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
      var html = header() + '<div class="card"><div class="q-text">' + esc(qq.q) + '</div><div>';
      qq.options.forEach(function (o, i) {
        var sel = answers[idx] === i;
        html += '<button class="opt" data-i="' + i + '" style="' + (sel ? 'border-color:var(--accent)' : '') + '">' + String.fromCharCode(65 + i) + '.  ' + esc(o) + '</button>';
      });
      html += '</div></div><div class="btn-row">' +
        '<button class="btn ghost" id="prev" ' + (idx === 0 ? 'disabled' : '') + '>‹ Prev</button>' +
        '<button class="btn ghost" id="skip">Clear</button>' +
        (idx < paper.length - 1 ? '<button class="btn" id="nxt">Next ›</button>' : '<button class="btn good" id="submit">Submit</button>') +
        '</div><div class="btn-row"><button class="btn ghost small-btn" id="quit">Abandon test</button></div>';
      $view.innerHTML = html;
      $view.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () { answers[idx] = Number(b.getAttribute('data-i')); draw(); });
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
        if (a === it.q.answer) { score += it.q.marks; correct++; }
        else { score -= it.q.marks / 3; wrong++; }
        recordAnswer(it.q, a === it.q.answer, it.topic);
      });
      score = Math.round(score * 100) / 100;
      S.mocks.push({ dateISO: new Date().toISOString(), day: missionDay(), score: score, max: 100, correct: correct, wrong: wrong, skipped: skipped });
      save();
      var verdict = score >= 90 ? '🏆 Rank-1 territory. Hold the line.' : score >= 70 ? '💪 Strong — now hunt down every mark you dropped.' : score >= 50 ? '📈 On curve for month 1. Analyse every mistake for 2 hours.' : '🔥 Below curve. Do not panic — list every wrong topic and drill them THIS week.';
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
        var h = '<button class="back-link" id="back">‹ Result</button>';
        paper.forEach(function (it, i) {
          var a = answers[i]; var qq = it.q;
          h += '<div class="card"><div class="q-text">Q' + (i + 1) + '. ' + esc(qq.q) + '</div>';
          qq.options.forEach(function (o, j) {
            var cls = j === qq.answer ? 'correct' : (j === a ? 'wrong' : '');
            h += '<div class="opt ' + cls + '" style="cursor:default">' + String.fromCharCode(65 + j) + '.  ' + esc(o) + '</div>';
          });
          h += '<div class="explain"><b>' + (a === undefined ? 'Skipped' : a === qq.answer ? 'Correct' : 'Wrong') + ' · Answer: ' + String.fromCharCode(65 + qq.answer) + '</b>\n' + esc(qq.explanation || '') + '</div></div>';
        });
        $view.innerHTML = h;
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
    var html = '<h2 style="margin-bottom:12px">📈 Progress</h2>' +
      '<div class="card"><div class="stat-grid">' +
      '<div class="stat"><div class="num">' + totalAtt + '</div><div class="lbl">questions answered</div></div>' +
      '<div class="stat"><div class="num">' + (totalAtt ? Math.round(totalCor / totalAtt * 100) : 0) + '%</div><div class="lbl">overall accuracy</div></div>' +
      '<div class="stat"><div class="num">' + mastered + '/' + totalQ + '</div><div class="lbl">questions mastered</div></div>' +
      '<div class="stat"><div class="num">' + (S.mocks.length ? S.mocks[S.mocks.length - 1].score : '—') + '</div><div class="lbl">latest mock /100</div></div>' +
      '</div></div>';
    // weakest topics
    var weak = [];
    Object.keys(S.topicStats).forEach(function (tid) {
      var st = S.topicStats[tid];
      if (st.attempts >= 5) weak.push({ tid: tid, acc: st.correct / st.attempts, n: st.attempts });
    });
    weak.sort(function (a, b) { return a.acc - b.acc; });
    if (weak.length) {
      html += '<div class="card"><h3>🎯 Your weakest topics — drill these first</h3>';
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
    $view.innerHTML = html;
    $view.querySelectorAll('[data-topic]').forEach(function (el) {
      el.addEventListener('click', function () { nav('quiz', el.getAttribute('data-topic')); });
    });
  }

  // ---------- PLAN ----------
  function viewPlan() {
    var d = missionDay() || 0;
    var html = '<h2 style="margin-bottom:6px">🗓️ The 90-day battle plan</h2>' +
      '<p class="muted small" style="margin-bottom:12px">Phase 1 (D1–30): learn fast, mock to 50. Phase 2 (D31–60): finish syllabus, mock to 70. Phase 3 (D61–90): revise + mock to 90+. Tap a day to see its objectives.</p>';
    (DATA.plan || []).forEach(function (p) {
      var checks = S.planChecks[p.day] || {};
      var doneCt = Object.keys(checks).filter(function (k) { return checks[k]; }).length;
      var allDone = doneCt >= p.tasks.length;
      html += '<div class="day-row' + (p.day === d ? ' today' : '') + (allDone ? ' done' : '') + '" data-day="' + p.day + '">' +
        '<div class="day-num">D' + p.day + (p.mock ? ' 📝' : '') + '</div>' +
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
