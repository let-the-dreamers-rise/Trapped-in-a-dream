#!/usr/bin/env node
// Merges recovered questions into an existing paper file.
//
// Recovery agents write plain JSON arrays into data/pyq/recovered/<base>.json
// rather than editing the paper files directly, so a bad write cannot corrupt a
// file that already validates. This folds them in, in question-number order, and
// refuses to touch anything that does not pass validation afterwards.
//
// Usage:  node tools/merge-pyq.js            (all)
//         node tools/merge-pyq.js gate2019   (one)

var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var ROOT = path.join(__dirname, '..');
var OUT = path.join(ROOT, 'data', 'pyq');
var REC = path.join(OUT, 'recovered');

function loadPaper(file) {
  global.window = {};
  delete require.cache[require.resolve(file)];
  require(file);
  var list = global.window.GATE_DATA.pyq;
  return list[list.length - 1];
}

// Emit a question object as source. Long string fields (figures especially) stay
// on one line; the file is data, not something anyone reads top to bottom.
function emit(q) {
  var order = ['id', 'n', 'section', 'q', 'figure', 'options', 'answer', 'answers',
    'tolerance', 'kind', 'marks', 'explanation'];
  var parts = [];
  order.forEach(function (k) {
    if (q[k] === undefined) return;
    parts.push('      ' + k + ': ' + JSON.stringify(q[k]));
  });
  Object.keys(q).forEach(function (k) {
    if (order.indexOf(k) < 0) parts.push('      ' + k + ': ' + JSON.stringify(q[k]));
  });
  return '    {\n' + parts.join(',\n') + '\n    }';
}

var only = process.argv[2];
if (!fs.existsSync(REC)) { console.log('No data/pyq/recovered directory — nothing to merge.'); process.exit(0); }

var jobs = fs.readdirSync(REC).filter(function (f) {
  return f.endsWith('.json') && (!only || f.indexOf(only) === 0);
}).sort();
if (!jobs.length) { console.log('Nothing to merge.'); process.exit(0); }

var totalAdded = 0, failed = 0;

jobs.forEach(function (j) {
  var base = j.replace(/\.json$/, '');
  var target = path.join(OUT, base + '.js');
  if (!fs.existsSync(target)) { console.log(base + ': no paper file to merge into'); failed++; return; }

  var incoming;
  try { incoming = JSON.parse(fs.readFileSync(path.join(REC, j), 'utf8')); }
  catch (e) { console.log(base + ': recovered JSON is invalid — ' + e.message); failed++; return; }
  if (!Array.isArray(incoming)) { console.log(base + ': recovered file is not an array'); failed++; return; }
  if (!incoming.length) { console.log(base + ': nothing recovered'); return; }

  var paper = loadPaper(target);
  var have = {};
  paper.questions.forEach(function (q) { have[q.section + ':' + q.n] = true; });

  var added = [], skipped = [];
  incoming.forEach(function (q) {
    var slot = q.section + ':' + q.n;
    if (have[slot]) { skipped.push(slot + ' already present'); return; }
    have[slot] = true;
    added.push(q);
  });
  if (!added.length) { console.log(base + ': all ' + incoming.length + ' already present'); return; }

  var all = paper.questions.concat(added).sort(function (a, b) {
    if (a.section !== b.section) return a.section === 'GA' ? -1 : 1;
    return a.n - b.n;
  });

  var header = 'window.GATE_DATA = window.GATE_DATA || {};\n' +
    'window.GATE_DATA.pyq = window.GATE_DATA.pyq || [];\n' +
    'window.GATE_DATA.pyq.push({\n' +
    '  year: ' + JSON.stringify(paper.year) + ',\n' +
    '  paper: ' + JSON.stringify(paper.paper) + ',\n' +
    '  source: ' + JSON.stringify(paper.source) + ',\n' +
    '  questions: [\n';
  var body = all.map(emit).join(',\n');
  var src = header + body + '\n  ]\n});\n';

  var backup = target + '.bak';
  fs.copyFileSync(target, backup);
  fs.writeFileSync(target, src);

  var check = cp.spawnSync(process.execPath, [path.join(__dirname, 'validate-pyq.js'), base], { encoding: 'utf8' });
  if (check.status !== 0) {
    fs.copyFileSync(backup, target);
    fs.unlinkSync(backup);
    console.log(base + ': REJECTED, rolled back — validation failed after merge:');
    console.log(check.stdout.split('\n').filter(function (l) { return /PROBLEM|  - /.test(l); }).slice(0, 12).join('\n'));
    failed++;
    return;
  }
  fs.unlinkSync(backup);
  totalAdded += added.length;
  console.log(base + ': +' + added.length + ' → ' + all.length + ' questions' +
    (skipped.length ? '  (' + skipped.length + ' already present)' : ''));
});

console.log('\n' + totalAdded + ' question(s) merged' + (failed ? ', ' + failed + ' paper(s) rejected' : ''));
process.exitCode = failed ? 1 : 0;
