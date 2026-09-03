#!/usr/bin/env node
// Checks that every transcribed question really came out of the official paper.
//
// validate-pyq.js proves the ANSWERS match the official key. It cannot tell
// whether the question text was transcribed or invented — a plausible-looking
// question with a key-correct answer would sail straight through it. This does
// the other half: it takes runs of characters from each stored question and looks
// for them in the extracted paper text. Wording that is not in the paper did not
// come from the paper.
//
// A low score is a flag to go and look, not a verdict. The transcriber is meant to
// repair extraction damage, and some legitimate repairs move a lot of text — a
// two-column matching table that the PDF flattened into one interleaved run has to
// be pulled back apart, and comes out scoring badly against the source. Papers
// here run 84-98% mean match; the ones that fall below are almost all heavily
// notated maths. Check them by hand rather than trusting the number either way.
//
// A 0% score is usually font substitution rather than anything wrong: some of these
// PDFs render italic variables from unrelated Unicode blocks (GATE 2014 Set 3 uses
// Syriac letters for G and L) or double every letter (𝑥𝑥 for x). NFKD cannot fold
// those back, so a faithful transcription scores zero against them. Verified by
// hand for the 2014 papers; both were genuine.
//
// Questions RECOVERED from the page images score low here by construction: they
// were read off the rendered page precisely because the extracted text for them
// was garbage, so there is nothing in the haystack for them to match. A paper
// mean that drops after a recovery pass is expected, not a regression.
//
// Usage:  node tools/check-pyq-fidelity.js [gate2019]

var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var SRC = path.join(ROOT, '.pyq-source');
var OUT = path.join(ROOT, 'data', 'pyq');

// Strip everything the extraction mangles so only the letters remain.
//
// Whitespace has to go entirely: the PDFs render maths as separate text runs, so
// "d1(u,v)" comes out as "d 1 ( u , v )" and any word-based comparison collapses.
// NFKD folds the mathematical alphanumeric block (GATE papers set variables in
// 𝑈+1D400-style italics) back to plain ASCII letters, so 𝐺 and G compare equal.
function norm(s) {
  return String(s)
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

// Fraction of this question's character runs that appear in the paper text.
// Character runs rather than words, because the words are not reliably separated
// in the source; 24 characters is long enough that a coincidental match is
// vanishingly unlikely.
var RUN = 24;
function coverage(question, haystack) {
  var c = norm(question);
  if (c.length < RUN * 2) return null;      // too short to judge
  var hits = 0, tries = 0;
  for (var i = 0; i + RUN <= c.length; i += 12) {
    tries++;
    if (haystack.indexOf(c.substr(i, RUN)) >= 0) hits++;
  }
  return tries ? hits / tries : null;
}

var only = process.argv[2];
var files = fs.existsSync(OUT)
  ? fs.readdirSync(OUT).filter(function (f) { return f.endsWith('.js') && (!only || f.indexOf(only) === 0); })
  : [];
if (!files.length) { console.log('No transcribed papers in data/pyq yet.'); process.exit(0); }

var worstOverall = [], totalQ = 0, totalLow = 0;

files.forEach(function (f) {
  var base = f.replace(/\.js$/, '');
  var srcFile = path.join(SRC, base + '.txt');
  if (!fs.existsSync(srcFile)) { console.log('\n' + f + '\n  no source text to compare against'); return; }
  var hay = norm(fs.readFileSync(srcFile, 'utf8'));

  global.window = {};
  delete require.cache[require.resolve(path.join(OUT, f))];
  require(path.join(OUT, f));
  var list = global.window.GATE_DATA.pyq;
  var paper = list[list.length - 1];

  var scores = [], low = [];
  paper.questions.forEach(function (q) {
    var c = coverage(q.q, hay);
    if (c === null) return;
    scores.push(c);
    if (c < 0.6) low.push({ id: q.id, c: c, q: q.q.slice(0, 90) });
  });
  scores.sort(function (a, b) { return a - b; });
  var mean = scores.reduce(function (a, b) { return a + b; }, 0) / (scores.length || 1);
  totalQ += scores.length; totalLow += low.length;

  console.log('\n' + f);
  console.log('  ' + scores.length + ' questions checked · mean text match ' + (mean * 100).toFixed(1) + '%' +
    ' · lowest ' + ((scores[0] || 0) * 100).toFixed(0) + '%');
  if (!low.length) console.log('  every question traces back to the paper text');
  else {
    console.log('  ' + low.length + ' below 60% — inspect these:');
    low.slice(0, 8).forEach(function (x) {
      console.log('    - ' + x.id + ' (' + (x.c * 100).toFixed(0) + '%): ' + x.q.replace(/\s+/g, ' '));
    });
    if (low.length > 8) console.log('    ... and ' + (low.length - 8) + ' more');
    worstOverall.push(f + ': ' + low.length);
  }
});

console.log('\n' + '='.repeat(60));
console.log(totalQ + ' questions checked, ' + totalLow + ' with weak text match' +
  (worstOverall.length ? ' (' + worstOverall.join(', ') + ')' : ''));
