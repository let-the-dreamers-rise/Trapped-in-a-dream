#!/usr/bin/env node
// Removes one question from a transcribed paper, and from its recovered JSON so a
// re-merge cannot bring it back.
//
// Used sparingly, for questions that cannot be shipped honestly — a figure that
// contradicts the official answer, or a diagram that cannot be reproduced. Every
// removal must also be recorded in data/pyq/README.md with the reason, or the next
// person will "fix" it back in.
//
// Usage:  node tools/drop-pyq.js gate2024-s1 gate2024s1-ga-10

var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var ROOT = path.join(__dirname, '..');
var OUT = path.join(ROOT, 'data', 'pyq');

var base = process.argv[2], qid = process.argv[3];
if (!base || !qid) { console.log('usage: node tools/drop-pyq.js <paper-base> <question-id>'); process.exit(1); }

var target = path.join(OUT, base + '.js');
if (!fs.existsSync(target)) { console.log('no such paper: ' + target); process.exit(1); }

var src = fs.readFileSync(target, 'utf8');
// The id may be single- or double-quoted depending on whether the file has been
// through a merge rewrite.
var at = src.indexOf('id: "' + qid + '"');
if (at < 0) at = src.indexOf("id: '" + qid + "'");
if (at < 0) { console.log(qid + ' is not in ' + base); process.exit(1); }

var start = src.lastIndexOf('    {', at);
var depth = 0, end = -1;
for (var i = start; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end < 0) { console.log('could not find the end of that question object'); process.exit(1); }

var tail = src.slice(end).replace(/^,\n/, '\n').replace(/^\n/, '');
var out = src.slice(0, start) + tail;
var backup = target + '.bak';
fs.copyFileSync(target, backup);
fs.writeFileSync(target, out);

var check = cp.spawnSync(process.execPath, [path.join(__dirname, 'validate-pyq.js'), base], { encoding: 'utf8' });
if (check.status !== 0) {
  fs.copyFileSync(backup, target); fs.unlinkSync(backup);
  console.log('REJECTED, rolled back — the file did not validate after removal:');
  console.log(check.stdout);
  process.exit(1);
}
fs.unlinkSync(backup);

// Keep the recovered JSON in step, so re-running the merge does not restore it.
var rec = path.join(OUT, 'recovered', base + '.json');
if (fs.existsSync(rec)) {
  var arr = JSON.parse(fs.readFileSync(rec, 'utf8'));
  var kept = arr.filter(function (q) { return q.id !== qid; });
  if (kept.length !== arr.length) {
    fs.writeFileSync(rec, JSON.stringify(kept, null, 1));
    console.log('also removed from recovered/' + base + '.json (' + arr.length + ' → ' + kept.length + ')');
  }
}
console.log('removed ' + qid + ' from ' + base);
console.log(check.stdout.trim().split('\n').slice(0, 3).join('\n'));
console.log('\nNow record why in data/pyq/README.md.');
