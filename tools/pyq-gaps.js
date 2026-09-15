#!/usr/bin/env node
// Lists the questions still missing from each transcribed paper, with the official
// key's answer for each and the page of the paper it is printed on.
//
// Everything skipped so far was skipped because the transcriber only ever saw the
// PDF's extracted TEXT, which drops figures and mangles maths. The pages
// themselves are fine — this says which ones to go back and look at.
//
// Usage:  node tools/pyq-gaps.js [gate2019] [--pages <dir>]

var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var SRC = path.join(ROOT, '.pyq-source');
var OUT = path.join(ROOT, 'data', 'pyq');
var V = require('./validate-pyq.js');

var args = process.argv.slice(2);
var only = args.filter(function (a) { return a.indexOf('--') !== 0; })[0];
var pagesArg = args.indexOf('--pages');
var PAGES = pagesArg >= 0 ? args[pagesArg + 1] : null;

// Which page of the paper each question number is printed on, read from the
// per-page text extraction. GA and CS are tracked separately because some years
// restart the CS section's numbering at 1.
function pageIndex(base) {
  var f = path.join(SRC, base + '.txt');
  if (!fs.existsSync(f)) return {};
  var parts = fs.readFileSync(f, 'utf8').split(/=== PAGE (\d+) ===/);

  // Collect every "Q.N" marker in document order, then decide its section from the
  // sequence rather than from headers. General Aptitude always comes first and is
  // ten questions; the paper either carries on to 65 or restarts the Computer
  // Science section at 1. Both look the same to a header search, but a number that
  // goes backwards, or past 10 while still in GA, marks the boundary either way.
  var marks = [];
  for (var i = 1; i < parts.length; i += 2) {
    var pg = +parts[i], body = parts[i + 1] || '', m;
    // "Q.1 – Q.5 carry ONE mark each" is a section header, not two questions, and
    // its numbers run backwards against the real ones — which would put the section
    // boundary in the wrong place. Drop those spans before scanning.
    body = body.replace(/Q\.\s?\d{1,2}\s*(?:[–—-]|to)\s*Q\.\s?\d{1,2}/g, ' ');
    var re = /Q\.\s?(\d{1,2})\b/g;
    while ((m = re.exec(body))) marks.push({ pg: pg, n: +m[1] });
  }
  var map = {}, section = 'GA', prev = 0;
  marks.forEach(function (x) {
    if (section === 'GA' && (x.n < prev || x.n > 10)) section = 'CS';
    var key = section + ':' + x.n;
    if (map[key] === undefined) map[key] = x.pg;
    prev = x.n;
  });
  return map;
}

var files = fs.readdirSync(OUT).filter(function (f) {
  return f.endsWith('.js') && (!only || f.indexOf(only) === 0);
}).sort();

var grand = 0;
files.forEach(function (f) {
  var base = f.replace(/\.js$/, '');
  global.window = {};
  delete require.cache[require.resolve(path.join(OUT, f))];
  require(path.join(OUT, f));
  var paper = global.window.GATE_DATA.pyq[0];
  var key = V.parseKey(base);
  if (!key) return;

  var have = {};
  paper.questions.forEach(function (q) { have[q.section + ':' + q.n] = true; });
  var csNums = paper.questions.filter(function (q) { return q.section === 'CS'; }).map(function (q) { return q.n; });
  var off = (key.layout === 'C' && csNums.length && Math.max.apply(null, csNums) <= 55) ? 10 : 0;
  var pages = pageIndex(base);

  var missing = [];
  Object.keys(key.map).forEach(function (k) {
    var entry = key.map[k], v = entry.value;
    var bits = k.split(':'), sec = bits[0], row = +bits[1];
    if (v.dropped || v.ambiguous) return;              // no single correct answer
    var printed = (sec === 'CS') ? row - off : row;
    if (have[sec + ':' + printed]) return;
    var ans = v.nat
      ? (v.lo === v.hi ? String(v.lo) : v.lo + ' to ' + v.hi)
      : v.letters.map(function (i) { return String.fromCharCode(65 + i); }).join(',');
    missing.push({
      section: sec, n: printed, keyRow: row, type: entry.type || (v.nat ? 'NAT' : 'MCQ'),
      answer: ans, marks: entry.marks, page: pages[sec + ':' + printed]
    });
  });
  missing.sort(function (a, b) { return (a.section === b.section) ? a.n - b.n : (a.section === 'GA' ? -1 : 1); });

  // A question printed on a page whose text did not extract has no marker to find,
  // which is exactly the case for the figure-heavy pages this tool exists to point
  // at. Bracket it between the nearest questions that did extract instead.
  missing.forEach(function (m) {
    if (m.page) return;
    var lo = null, hi = null;
    for (var d = 1; d <= 12; d++) {
      if (lo === null && pages[m.section + ':' + (m.n - d)]) lo = pages[m.section + ':' + (m.n - d)];
      if (hi === null && pages[m.section + ':' + (m.n + d)]) hi = pages[m.section + ':' + (m.n + d)];
    }
    if (lo && hi) m.range = (lo === hi) ? String(lo) : lo + '-' + hi;
    else if (lo) m.range = lo + '+';
    else if (hi) m.range = 'up to ' + hi;
  });
  grand += missing.length;

  console.log('\n' + paper.year + ' ' + paper.paper + '  (' + base + ')');
  console.log('  have ' + paper.questions.length + ', missing ' + missing.length +
    (off ? '  [CS section numbering restarts at 1; key row = printed + 10]' : ''));
  if (PAGES) console.log('  page images: ' + path.join(PAGES, base));
  missing.forEach(function (m) {
    console.log('    ' + (m.section + ' Q.' + m.n).padEnd(9) +
      m.type.padEnd(4) + ' ' + m.marks + ' mark' + (m.marks > 1 ? 's' : '') +
      '  key ' + String(m.answer).padEnd(12) +
      (m.page ? 'page ' + String(m.page).padStart(2, '0') + '.png'
            : (m.range ? 'pages ' + m.range + ' (marker did not extract — look in that range)' : 'page unknown')));
  });
});
console.log('\n' + '='.repeat(60));
console.log(grand + ' question(s) still missing across ' + files.length + ' paper(s)');
