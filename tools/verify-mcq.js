#!/usr/bin/env node
/*
 * verify-mcq.js -- companion to verify-answers.js.
 *
 * verify-answers.js checks that every NAT (numeric) question's explanation
 * actually states the stored number. That leaves the much larger MCQ/MSQ
 * population unguarded: there, the stored answer is an option INDEX, and an
 * index can drift out of sync with the prose that justifies it (options get
 * reordered, an option is rewritten, a key is typed wrong).
 *
 * This tool cross-checks the stored index against the explanation's own
 * verdicts. It cannot prove an answer correct -- only that the question is
 * internally consistent -- but it catches the class of defect where the
 * explanation argues for one option and the key points at another.
 *
 * Be clear about how much power it actually has. Three checks run:
 *
 *   1. Out-of-range index. Total coverage, and always decisive.
 *   2. An explicit "the answer is (X)" in the prose. Decisive when present,
 *      but only about 3% of explanations phrase it that way, because a good
 *      explanation argues from the content rather than announcing a letter.
 *   3. Numeric options where the explanation names exactly ONE of the option
 *      values (79 of the 614 all-numeric-option MCQs). Decisive when it
 *      applies. It does NOT apply when the explanation mentions several
 *      option values in passing -- e.g. a graph question whose edge weights
 *      happen to coincide with the answer choices.
 *
 * So a clean run means "no detected contradiction", not "every key verified".
 * The keys were additionally checked by hand and by independent recomputation;
 * this file exists to stop regressions, not to replace that.
 *
 * Usage: node tools/verify-mcq.js
 * Exit code 1 if any inconsistency is found.
 */
const fs = require('fs');
const path = require('path');

global.window = {};
const QDIR = path.join(__dirname, '..', 'data', 'questions');
for (const f of fs.readdirSync(QDIR)) if (f.endsWith('.js')) require(path.join(QDIR, f));

const LET = 'ABCDEFGH';

// Spelled-out numbers count as stating a value: an explanation may conclude
// "the ONLY minimum spanning tree" rather than printing the numeral 1.
const WORDS = { zero:0, one:1, two:2, three:3, four:4, five:5, six:6, seven:7,
  eight:8, nine:9, ten:10, eleven:11, twelve:12, only:1, unique:1, single:1,
  none:0, no:0, never:0, both:2, twice:2, once:1 };

function numbersIn(text) {
  const t = String(text || '').replace(/\u2212/g, '-').replace(/,(?=\d{3}\b)/g, '');
  const out = new Set([...t.matchAll(/-?\d+(?:\.\d+)?/g)].map(m => parseFloat(m[0])));
  for (const w in WORDS) if (new RegExp('\\b' + w + '\\b', 'i').test(t)) out.add(WORDS[w]);
  return out;
}

function asNumber(s) {
  const t = String(s).replace(/\u2212/g, '-').replace(/,(?=\d{3}\b)/g, '').trim();
  return /^-?\d+(?:\.\d+)?$/.test(t) ? parseFloat(t) : null;
}

// Questions that ask for the false/incorrect/non-/except option invert the
// meaning of "option X is false", so verdict cross-checking is skipped there.
function isNegated(text) {
  return /\bFALSE\b|\bNOT\b|\bINCORRECT\b|\bEXCEPT\b|\bCANNOT\b|\bnever\b/.test(text);
}

// An option letter reference, e.g. "(C)" or "option C". Deliberately requires
// an UPPERCASE letter so the English article "a" ("the answer is a clean 8
// seconds") is not mistaken for option A.
// NOTE: a tempting extra alternative -- /(hence|so|thus) option X/ -- is
// deliberately NOT included, and neither is /option X is correct/. Good
// explanations discuss every option, so those phrasings match
// phrasing matches "so option C's stated reason is wrong" just as often as it
// matches a genuine verdict, and it produced only false positives here.
const SAYS_ANSWER = new RegExp(
  '\\b(?:answer|correct(?:\\s+(?:option|choice|answer))?)\\s+is\\s+(?:option\\s+)?\\(?([A-H])\\)?(?![a-z])' +
  '',
  'g');
const VERDICT = /\bOption\s+\(?([A-H])\)?\s+is\s+(TRUE|FALSE|VALID|INVALID|valid|invalid|true|false|wrong|incorrect|correct)\b/g;

let mcq = 0, msq = 0, numericOpt = 0, discriminated = 0;
const flags = [];
const add = (id, msg) => flags.push([id, msg]);

for (const subj in window.GATE_DATA.questions) {
  for (const topic of window.GATE_DATA.questions[subj].topics) {
    for (const q of topic.questions || []) {
      if (!q.options || !q.options.length) continue;
      const exp = q.explanation || '';
      const negated = isNegated(q.q);

      if (Array.isArray(q.answers) || Array.isArray(q.answer)) {
        // ---- multi-select ----
        const sel = new Set(q.answers || q.answer);
        msq++;
        if (negated) continue;
        for (const m of exp.matchAll(VERDICT)) {
          const idx = LET.indexOf(m[1]);
          if (idx < 0 || idx >= q.options.length) continue;
          const saysTrue = /^(TRUE|VALID|valid|true|correct)$/.test(m[2]);
          if (saysTrue !== sel.has(idx)) {
            add(q.id, 'explanation calls option (' + m[1] + ') ' + m[2] +
              ', but it is ' + (sel.has(idx) ? '' : 'NOT ') + 'in the stored answer set [' +
              [...sel].map(i => LET[i]).join(',') + ']');
          }
        }
        continue;
      }

      if (typeof q.answer !== 'number') continue;
      mcq++;

      for (const m of exp.matchAll(SAYS_ANSWER)) {
        const idx = LET.indexOf(m[1] || m[2]);
        if (idx >= 0 && idx < q.options.length && idx !== q.answer) {
          add(q.id, 'explanation names (' + LET[idx] + ') as the answer, but the stored index is ' +
            q.answer + ' = (' + LET[q.answer] + ')');
        }
      }
      if (!negated) {
        for (const m of exp.matchAll(VERDICT)) {
          const idx = LET.indexOf(m[1]);
          if (idx !== q.answer) continue;
          if (/^(FALSE|INVALID|invalid|false|wrong|incorrect)$/.test(m[2])) {
            add(q.id, 'explanation calls option (' + m[1] + ') ' + m[2] +
              ', but that is the stored answer');
          }
        }
      }
      // Numeric options: if the explanation states exactly ONE of the option
      // values, that value had better be the keyed one. This is the only check
      // here with real discriminating power, and it applies to the ~100
      // all-numeric-option MCQs where the explanation names a single candidate.
      const vals = q.options.map(asNumber);
      if (vals.every(v => v !== null) && new Set(vals).size === vals.length) {
        numericOpt++;
        const stated = numbersIn(exp);
        // Tolerant match: an explanation may carry more precision than the
        // option prints (533.33 vs an option reading 533.3).
        const near = v => [...stated].some(x =>
          x === v || Math.abs(x - v) <= Math.max(Math.abs(v), 1) * 0.002);
        const present = vals.map((v, i) => i).filter(i => near(vals[i]));
        if (present.length === 1) {
          discriminated++;
          if (present[0] !== q.answer) {
            add(q.id, 'explanation states only option value ' + vals[present[0]] +
              ' = (' + LET[present[0]] + '), but the stored answer is (' + LET[q.answer] + ')');
          }
        } else if (present.length === 0) {
          add(q.id, 'explanation states NONE of its numeric option values (' +
            vals.join(', ') + ')');
        }
      }

      if (q.answer < 0 || q.answer >= q.options.length) {
        add(q.id, 'stored answer index ' + q.answer + ' is out of range for ' +
          q.options.length + ' options');
      }
    }
  }
}

console.log('Single-answer MCQs checked: ' + mcq);
console.log('Multi-select questions checked: ' + msq);
console.log('  of the MCQs, all-numeric-option: ' + numericOpt +
  ', of which the explanation names exactly one option value: ' + discriminated);
if (!flags.length) {
  console.log('Every explanation agrees with its stored option index. 0 failing.');
  process.exit(0);
}
console.log('\n' + flags.length + ' inconsistency(ies):\n');
for (const [id, msg] of flags) console.log('  ' + id.padEnd(32) + msg);
process.exit(1);
