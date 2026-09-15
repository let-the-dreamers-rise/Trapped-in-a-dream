#!/usr/bin/env node
// Consistency guard for numeric (NAT) answers.
//
// For every numeric-answer question in data/pyq/*.js and data/questions/*.js,
// checks that the explanation actually states the stored answer somewhere.
// Catches the failure mode where an answer is edited but its worked
// explanation is not (or vice versa), which silently marks correct work wrong.
//
// NOTE: this verifies INTERNAL CONSISTENCY, not correctness. An explanation
// that derives the wrong number consistently still passes. Genuine correctness
// needs independent recomputation.
//
// Usage: node tools/verify-answers.js
const fs = require('fs');
const path = require('path');

const WORDS = { zero:0, one:1, two:2, three:3, four:4, five:5, six:6,
                seven:7, eight:8, nine:9, ten:10, eleven:11, twelve:12 };

function numbersIn(text) {
  const t = String(text || '')
    .replace(/−/g, '-')        // unicode minus
    .replace(/,(?=\d{3}\b)/g, '');  // thousands separators
  const out = [...t.matchAll(/-?\d+(?:\.\d+)?/g)].map(m => parseFloat(m[0]));
  for (const w in WORDS) {
    if (new RegExp('\\b' + w + '\\b', 'i').test(t)) out.push(WORDS[w]);
  }
  return out;
}

function check(questions, label, bad) {
  let n = 0;
  for (const q of questions) {
    // numeric-answer questions only (MCQ answers are option indices)
    if (typeof q.answer !== 'number') continue;
    if (q.options && q.options.length) continue;
    n++;
    const tol = q.tolerance !== undefined
      ? Math.max(q.tolerance, Math.abs(q.answer) * 0.02)
      : Math.abs(q.answer) * 0.02 + 1e-9;
    const hit = numbersIn(q.explanation).some(v => Math.abs(v - q.answer) <= tol);
    if (!hit) bad.push({ label, id: q.id, answer: q.answer });
  }
  return n;
}

function loadInto(file) {
  global.window = { GATE_DATA: {} };
  eval(fs.readFileSync(file, 'utf8'));
  return global.window.GATE_DATA;
}

let total = 0;
const bad = [];

for (const f of fs.readdirSync('data/pyq').filter(f => f.endsWith('.js'))) {
  const paper = Object.values(loadInto(path.join('data/pyq', f)).pyq)[0];
  total += check(paper.questions, f, bad);
}

for (const f of fs.readdirSync('data/questions').filter(f => f.endsWith('.js'))) {
  const data = loadInto(path.join('data/questions', f)).questions;
  const subject = Object.keys(data)[0];
  for (const topic of data[subject].topics) {
    total += check(topic.questions, topic.id, bad);
  }
}

console.log(`Numeric answers checked: ${total}`);
if (bad.length === 0) {
  console.log('All explanations state their stored answer. 0 failing.');
  process.exit(0);
}
console.log(`\n${bad.length} explanation(s) never state the stored answer:`);
for (const b of bad) console.log(`  ${b.label}  ${b.id}  stored=${b.answer}`);
process.exit(1);
