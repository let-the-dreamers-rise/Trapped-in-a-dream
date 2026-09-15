#!/usr/bin/env node
// Checks that a textbook chapter is actually a textbook chapter.
//
// The failure mode this guards against is the one the original theory had: a
// reference card wearing headings, padded with commentary about the exam. So it
// measures depth (words, derivations, worked problems), the reading devices the
// app depends on (headings, key/trap cards, steps, figures), and how much of the
// text is about GATE instead of about the subject.
//
// Usage:  node tools/validate-chapters.js            (all)
//         node tools/validate-chapters.js os-sched   (prefix)

var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var DIR = path.join(ROOT, 'data', 'chapters');

var MIN_WORDS = 7500;
var META = /\b(GATE|exam|examiner|paper|marks?|asked|asks|tests this|PYQ|scoring|negative marking|drill)\b/i;

var only = process.argv[2];
var files = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter(function (f) { return f.endsWith('.js') && (!only || f.indexOf(only) === 0); }).sort()
  : [];
if (!files.length) { console.log('No chapters yet.'); process.exit(0); }

// Topics that exist, so a chapter cannot be attached to a typo.
global.window = {};
fs.readdirSync(path.join(ROOT, 'data', 'questions')).forEach(function (f) { require(path.join(ROOT, 'data', 'questions', f)); });
var topicIds = {};
Object.keys(global.window.GATE_DATA.questions).forEach(function (k) {
  global.window.GATE_DATA.questions[k].topics.forEach(function (t) { topicIds[t.id] = true; });
});

var bad = 0;
files.forEach(function (f) {
  var problems = [], notes = [];
  var id = f.replace(/\.js$/, '');
  global.window.GATE_DATA.chapters = {};
  try { delete require.cache[require.resolve(path.join(DIR, f))]; require(path.join(DIR, f)); }
  catch (e) { console.log('\n' + f + '\n  LOAD FAILED: ' + e.message); bad++; return; }
  var c = global.window.GATE_DATA.chapters[id];
  if (!c) { console.log('\n' + f + '\n  does not define chapters["' + id + '"] — filename and key must match'); bad++; return; }
  if (!topicIds[id]) problems.push('no topic with id "' + id + '" exists in data/questions');

  var t = String(c.text || '');
  var words = t.split(/\s+/).filter(Boolean).length;
  var lines = t.split('\n');
  var heads = lines.filter(function (l) { var s = l.trim(), letters = s.replace(/[^A-Za-z]/g, ''); return letters.length > 2 && s === s.toUpperCase() && s.length < 70 && s.length > 3; });
  var keys = (t.match(/^(KEY|REMEMBER):/gm) || []).length;
  var traps = (t.match(/^GATE TRAP:/gm) || []).length;
  var steps = (t.match(/^\d{1,2}\. /gm) || []).length;
  var figRefs = (t.match(/\[\[FIG:([a-zA-Z0-9_-]+)\]\]/g) || []).map(function (m) { return m.slice(6, -2); });
  var figDefs = {}; (c.figs || []).forEach(function (fg) { figDefs[fg.id] = fg; });
  var worked = /^WORKED (PROBLEMS|EXAMPLES)/m.test(t);

  // Exam-commentary share: paragraphs that mention the exam, by word count.
  var paras = t.split(/\n+/).filter(function (p) { return p.trim(); });
  // GATE TRAP cards are a teaching device, not commentary — they do not count.
  var metaW = 0; paras.forEach(function (p) { if (!/^GATE TRAP:/.test(p.trim()) && META.test(p)) metaW += p.split(/\s+/).length; });
  var metaPct = Math.round(metaW / Math.max(1, words) * 100);

  if (words < MIN_WORDS) problems.push('only ' + words + ' words — a chapter needs at least ' + MIN_WORDS);
  if (heads.length < 12) problems.push('only ' + heads.length + ' section headings — a chapter needs at least 12');
  if (keys < 5) problems.push('only ' + keys + ' KEY/REMEMBER cards — need at least 5');
  if (traps < 5) problems.push('only ' + traps + ' GATE TRAP cards — need at least 5');
  if (steps < 15) problems.push('only ' + steps + ' numbered derivation steps — need at least 15');
  if (!worked) problems.push('no WORKED PROBLEMS section');
  if (metaPct > 15) problems.push(metaPct + '% of the text is about the exam rather than the subject — cap is 15%');
  if (figRefs.length < 2) problems.push('only ' + figRefs.length + ' figures placed — need at least 2');
  figRefs.forEach(function (r) { if (!figDefs[r] && !isTopicFig(id, r)) problems.push('[[FIG:' + r + ']] has no definition in this chapter or its topic'); });
  (c.figs || []).forEach(function (fg) {
    if (!/viewBox=/.test(fg.svg)) problems.push('figure ' + fg.id + ' has no viewBox');
    if (/(fill|stroke)="(?!none|currentColor|url\()[^"]+"/.test(fg.svg)) problems.push('figure ' + fg.id + ' uses a hard-coded colour');
    if (figRefs.indexOf(fg.id) < 0) notes.push('figure ' + fg.id + ' is defined but never placed');
  });
  // Hedging phrases that mean the writer did not know and wrote around it.
  var hedges = t.match(/in some framings|is sometimes said|roughly speaking, depending|the safest memorized fact|some sources say/gi) || [];
  if (hedges.length) problems.push(hedges.length + ' hedging phrase(s): ' + hedges.slice(0, 3).join(' / '));

  console.log('\n' + f + (problems.length ? '' : '  ✓'));
  console.log('  ' + words + ' words · ' + heads.length + ' sections · ' + steps + ' steps · ' + keys + ' key · ' +
    traps + ' trap · ' + figRefs.length + ' figs · exam-talk ' + metaPct + '%' + (worked ? ' · worked problems' : ''));
  problems.forEach(function (p) { console.log('    ✗ ' + p); });
  notes.forEach(function (n) { console.log('    · ' + n); });
  if (problems.length) bad++;
});

function isTopicFig(topicId, figId) {
  var found = false;
  Object.keys(global.window.GATE_DATA.questions).forEach(function (k) {
    global.window.GATE_DATA.questions[k].topics.forEach(function (t) {
      if (t.id === topicId) (t.theory && t.theory.figs || []).forEach(function (fg) { if (fg.id === figId) found = true; });
    });
  });
  return found;
}

console.log('\n' + '='.repeat(60));
console.log(files.length + ' chapter(s), ' + bad + ' failing');
process.exitCode = bad ? 1 : 0;
