#!/usr/bin/env node
// Independently re-derives every past-year answer from the official key file and
// checks the transcription against it.
//
// This exists because a transcription that quietly gets an answer wrong is worse
// than no transcription at all — the app drills wrong answers into memory with
// spaced repetition. So nothing here trusts what the transcriber reported: the
// key is parsed again from scratch and compared entry by entry.
//
// Usage:  node tools/validate-pyq.js            (all papers)
//         node tools/validate-pyq.js gate2019   (one)

var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var SRC = path.join(ROOT, '.pyq-source');
var OUT = path.join(ROOT, 'data', 'pyq');

// Which key layout each paper uses. See .pyq-source/SOURCES.md.
var LAYOUT = {
  'gate2014-s1': 'A', 'gate2014-s2': 'A', 'gate2014-s3': 'A',
  'gate2016-s1': 'B', 'gate2016-s2': 'B', 'gate2018': 'B', 'gate2019': 'B',
  'gate2022': 'C', 'gate2023': 'C',
  'gate2024-s1': 'C', 'gate2024-s2': 'C', 'gate2025-s1': 'C', 'gate2025-s2': 'C'
};

function clean(s) {
  // The 2014 keys use a Unicode non-hyphen minus; other papers use en/em dashes
  // inside ranges. Normalise every dash-like character to ASCII '-'.
  return s.replace(/[‐‑‒–—−]/g, '-').replace(/\s+/g, ' ');
}

// A key value is a letter answer, a set of letters (MSQ), a numeric range (NAT),
// a marker saying the question was dropped, or two alternatives joined by "OR" —
// which the exam board publishes when a question turned out to admit two answers.
// Both of the last two mean the question has no single correct answer and must be
// skipped, so they are reported rather than silently resolved to one side.
function parseValue(raw) {
  // Extraction puts a space after a minus sign ("‐ 2 to ‐ 2" means -2 to -2).
  var v = raw.trim().replace(/-\s+(?=[\d.])/g, '-');
  if (/^(MTA|marks?\s*to\s*all|dropped)$/i.test(v)) return { dropped: true };
  if (/\bor\b/i.test(v)) return { ambiguous: true, text: v };
  var range = v.match(/^(-?[\d.]+)\s*(?::|to)\s*(-?[\d.]+)$/i);
  if (range) {
    var lo = parseFloat(range[1]), hi = parseFloat(range[2]);
    return { nat: true, lo: Math.min(lo, hi), hi: Math.max(lo, hi) };
  }
  if (/^-?[\d.]+$/.test(v)) return { nat: true, lo: parseFloat(v), hi: parseFloat(v) };
  var letters = v.toUpperCase().match(/[A-D]/g);
  if (letters && letters.length) {
    var idx = letters.map(function (c) { return c.charCodeAt(0) - 65; }).sort(function (a, b) { return a - b; });
    // De-duplicate, so "A;A" cannot masquerade as a two-answer MSQ.
    idx = idx.filter(function (x, i) { return idx.indexOf(x) === i; });
    return { letters: idx };
  }
  return { unparsed: v };
}

// The key's value column: a letter or letter set, a numeric range, a bare number,
// or a dropped marker — optionally two of those joined by "OR" when the board
// accepted two answers. Kept in one place so all three layouts stay in step.
var ONE = '(?:[A-D](?:\\s*[;,]\\s*[A-D])*)|(?:-?\\s?[\\d.]+\\s*(?::|to)\\s*-?\\s?[\\d.]+)|(?:-?\\s?[\\d.]+)|MTA|(?:Marks to All)';
var VAL = '(?:' + ONE + ')(?:\\s+or\\s+(?:' + ONE + '))*';

// Layout A — 2014. Records are SECTION NUMBER KEY MARKS, but the printed table
// has two columns, so records alternate between them and are NOT in order.
function parseA(text) {
  var t = clean(text);
  var re = new RegExp('\\b(GA|CS)\\s+(\\d{1,2})\\s+(' + VAL + ')\\s+(1|2)\\b', 'gi');
  var map = {}, m;
  while ((m = re.exec(t))) {
    map[m[1].toUpperCase() + ':' + (+m[2])] = { value: parseValue(m[3].replace(/\s+/g, ' ')), marks: +m[4] };
  }
  return map;
}

// Layout B — 2016 / 2018 / 2019. NUMBER TYPE SECTION KEY MARKS, with GA numbered
// 1-10 and CS numbered 1-55 as two separate sequences.
function parseB(text) {
  var t = clean(text);
  var re = new RegExp('\\b(\\d{1,2})\\s+(MCQ|MSQ|NAT)\\s+(GA|CS(?:-\\d)?)\\s+(' + VAL + ')\\s+(1|2)\\b', 'gi');
  var map = {}, m;
  while ((m = re.exec(t))) {
    var sec = /^GA/i.test(m[3]) ? 'GA' : 'CS';
    map[sec + ':' + (+m[1])] = { value: parseValue(m[4]), marks: +m[5], type: m[2].toUpperCase() };
  }
  return map;
}

// Layout C — 2022 onwards. NUMBER SESSION TYPE SECTION KEY MARKS, numbers running
// 1-65 continuously (1-10 General Aptitude, 11-65 Computer Science).
function parseC(text) {
  var t = clean(text);
  var re = new RegExp('\\b(\\d{1,2})\\s+(\\d{1,2})\\s+(MCQ|MSQ|NAT)\\s+(GA|CS(?:-\\d)?)\\s+(' + VAL + ')\\s+(1|2)\\b', 'gi');
  var map = {}, m;
  while ((m = re.exec(t))) {
    var sec = /^GA/i.test(m[4]) ? 'GA' : 'CS';
    map[sec + ':' + (+m[1])] = { value: parseValue(m[5]), marks: +m[6], type: m[3].toUpperCase() };
  }
  return map;
}

function parseKey(base) {
  var file = path.join(SRC, 'key' + base.replace(/^gate/, '') + '.txt');
  if (!fs.existsSync(file)) return null;
  var text = fs.readFileSync(file, 'utf8');
  var layout = LAYOUT[base];
  return { map: (layout === 'A' ? parseA : layout === 'B' ? parseB : parseC)(text), layout: layout };
}

function loadPaper(file) {
  global.window = {};
  delete require.cache[require.resolve(file)];
  require(file);
  var list = (global.window.GATE_DATA && global.window.GATE_DATA.pyq) || [];
  return list[list.length - 1];
}

module.exports = { LAYOUT: LAYOUT, parseValue: parseValue, parseA: parseA, parseB: parseB, parseC: parseC, parseKey: parseKey };

// Run the check only when invoked directly, so the parsers can be unit-tested.
if (require.main === module) (function () {
  var only = process.argv[2];
  var files = fs.existsSync(OUT)
    ? fs.readdirSync(OUT).filter(function (f) { return f.endsWith('.js') && (!only || f.indexOf(only) === 0); })
    : [];

  if (!files.length) { console.log("No transcribed papers in data/pyq yet."); return; }

  var grandFail = 0, grandQ = 0;

  files.forEach(function (f) {
    var base = f.replace(/\.js$/, '');
    var problems = [];
    var paper;
    try { paper = loadPaper(path.join(OUT, f)); }
    catch (e) { console.log('\n' + f + '\n  LOAD FAILED: ' + e.message); grandFail++; return; }
    if (!paper || !paper.questions) { console.log('\n' + f + '\n  no questions array'); grandFail++; return; }

    var key = parseKey(base);
    if (!key) problems.push('no key file found for ' + base + ' — answers cannot be verified');

    var seen = {};
    var counts = { mcq: 0, msq: 0, nat: 0 };

    paper.questions.forEach(function (q) {
      var where = q.id || ('n=' + q.n);
      function bad(msg) { problems.push(where + ': ' + msg); }

      if (seen[q.id]) bad('duplicate id');
      seen[q.id] = true;
      if (q.marks !== 1 && q.marks !== 2) bad('marks is ' + q.marks);
      if (q.section !== 'GA' && q.section !== 'CS') bad('section is ' + q.section);
      if (typeof q.q !== 'string' || q.q.length < 10) bad('question text too short');
      if (/�/.test(q.q)) bad('question text contains a replacement character');

      var kind = q.kind || (Array.isArray(q.answers) ? 'msq' : (q.options && q.options.length ? 'mcq' : 'nat'));
      counts[kind] = (counts[kind] || 0) + 1;

      if (kind === 'nat') {
        if (typeof q.answer !== 'number' || isNaN(q.answer)) bad('nat answer not a number');
        if (!(q.tolerance > 0)) bad('nat tolerance not positive');
        if (q.options && q.options.length) bad('nat has options');
      } else if (kind === 'msq') {
        if (!Array.isArray(q.answers) || !q.answers.length) bad('msq answers empty');
        else q.answers.forEach(function (i) {
          if (!(Number.isInteger(i) && i >= 0 && i < (q.options || []).length)) bad('msq index ' + i + ' out of range');
        });
      } else {
        if (!q.options || q.options.length !== 4) bad('has ' + ((q.options || []).length) + ' options, expected 4');
        if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < (q.options || []).length)) bad('answer index ' + q.answer + ' out of range');
        var opts = (q.options || []).map(function (o) { return String(o).trim().toLowerCase(); });
        if (new Set(opts).size !== opts.length) bad('duplicate options');
        if (opts.some(function (o) { return !o; })) bad('empty option');
      }

      // The real check: does this answer match the official key, re-parsed here?
      if (!key) return;
      var entry = key.map[q.section + ':' + q.n];
      if (!entry) { bad('no key entry for ' + q.section + ' ' + q.n); return; }
      if (entry.marks !== q.marks) bad('marks ' + q.marks + ' but key says ' + entry.marks);
      var v = entry.value;
      if (v.dropped) { bad('key marks this dropped/marks-to-all — it should have been skipped'); return; }
      if (v.ambiguous) { bad('key accepts two answers ("' + v.text + '") — it should have been skipped'); return; }
      if (v.unparsed) { bad('key value could not be parsed: "' + v.unparsed + '"'); return; }

      if (kind === 'nat') {
        if (!v.nat) { bad('transcribed as NAT but key is a letter answer'); return; }
        var mid = (v.lo + v.hi) / 2, half = Math.max(0.01, (v.hi - v.lo) / 2);
        if (Math.abs(q.answer - mid) > 1e-6) bad('nat answer ' + q.answer + ' but key midpoint is ' + mid);
        if (Math.abs(q.tolerance - half) > 1e-6) bad('nat tolerance ' + q.tolerance + ' but key half-width is ' + half);
      } else {
        if (!v.letters) { bad('transcribed as ' + kind + ' but key is numeric (' + v.lo + ')'); return; }
        var got = (kind === 'msq' ? q.answers.slice() : [q.answer]).sort(function (a, b) { return a - b; });
        if (got.join(',') !== v.letters.join(',')) {
          bad('answer ' + got.map(function (i) { return String.fromCharCode(65 + i); }).join('') +
              ' but key says ' + v.letters.map(function (i) { return String.fromCharCode(65 + i); }).join(''));
        }
        if (kind === 'msq' && v.letters.length < 2 && q.answers.length < 2) {
          // A single-answer MSQ is legal in GATE, so this is a note, not a failure.
        }
      }
    });

    grandQ += paper.questions.length;
    grandFail += problems.length;
    var keyTotal = key ? Object.keys(key.map).length : 0;
    console.log('\n' + f + '  —  ' + paper.year + ' ' + paper.paper);
    console.log('  ' + paper.questions.length + ' questions (' + counts.mcq + ' MCQ, ' +
      counts.msq + ' MSQ, ' + counts.nat + ' NAT)' +
      (key ? ', key layout ' + key.layout + ' parsed ' + keyTotal + ' entries' : ''));
    if (key && keyTotal !== 65) console.log('  ! key parsed ' + keyTotal + ' entries, expected 65 — parser may be missing rows');
    if (!problems.length) console.log('  all answers match the official key');
    else {
      console.log('  ' + problems.length + ' PROBLEM(S):');
      problems.slice(0, 25).forEach(function (p) { console.log('    - ' + p); });
      if (problems.length > 25) console.log('    ... and ' + (problems.length - 25) + ' more');
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(files.length + ' paper(s), ' + grandQ + ' questions, ' + grandFail + ' problem(s)');
  process.exitCode = grandFail ? 1 : 0;
})();
