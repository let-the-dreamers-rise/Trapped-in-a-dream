#!/bin/bash
# Regenerates the <script> tags and the service-worker cache list for the real
# past-year papers, from whatever is actually present in data/pyq/.
# There is no build step in this app, so the tags have to be real and static —
# this keeps them honest as papers are added.
set -e
cd "$(dirname "$0")"

# Only papers that pass tools/validate-pyq.js get wired in. A transcription whose
# answers do not match the official key must never reach the app — it would be
# drilled into memory by spaced repetition as if it were true.
files=""
for f in $(ls data/pyq/*.js 2>/dev/null | sort); do
  base=$(basename "$f" .js)
  if node tools/validate-pyq.js "$base" >/dev/null 2>&1; then
    files="$files$f\n"
  else
    echo "SKIPPING $f — fails validation (run: node tools/validate-pyq.js $base)" >&2
  fi
done
files=$(printf '%b' "$files")

# index.html — between the two markers
tags=""
for f in $files; do tags="$tags  <script src=\"$f\"></script>\n"; done
/opt/node22/bin/node - "$tags" <<'JS'
const fs = require('fs');
const tags = process.argv[2].replace(/\\n/g, '\n').replace(/\n$/, '');
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
const a = '<!-- PYQ:START -->', b = '<!-- PYQ:END -->';
const body = a + '\n' + (tags || '  <!-- none transcribed yet -->') + '\n  ' + b;
if (s.includes(a)) s = s.replace(new RegExp(a + '[\\s\\S]*?' + b), body);
else s = s.replace('<script src="js/generators.js"></script>', body + '\n<script src="js/generators.js"></script>');
fs.writeFileSync(p, s);
JS

# sw.js — the offline cache list. Kept as a separate concat block so adding a
# paper never has to splice a comma into the base array.
list=""
for f in $files; do list="$list  './$f',\n"; done
/opt/node22/bin/node - "$list" <<'JS'
const fs = require('fs');
const list = process.argv[2].replace(/\\n/g, '\n').replace(/,\n$/, '\n');
const p = 'sw.js';
let s = fs.readFileSync(p, 'utf8');
const a = '// PYQ:START', b = '// PYQ:END';
const body = a + '\n' + (list ? 'ASSETS = ASSETS.concat([\n' + list + ']);\n' : '') + b;
const before = s;
if (s.includes(a)) s = s.replace(new RegExp(a + '[\\s\\S]*?' + b), body);
else s = s.replace(/(\n\];\n)/, '$1' + body + '\n');
// Bump the cache name only when the file list actually changed, so an already
// installed copy re-fetches — but a no-op run does not churn the version.
if (s !== before) {
  const m = s.match(/var CACHE = 'gate-r1-v(\d+)'/);
  if (m) s = s.replace(m[0], "var CACHE = 'gate-r1-v" + (+m[1] + 1) + "'");
  fs.writeFileSync(p, s);
}
JS

n=$(echo "$files" | grep -c . || true)
echo "wired $n paper file(s)"

# ---- textbook chapters: data/chapters/*.js, same idea, no validation gate ----
chap=$(ls data/chapters/*.js 2>/dev/null | sort || true)
ctags=""
for f in $chap; do ctags="$ctags  <script src=\"$f\"></script>\n"; done
/opt/node22/bin/node - "$ctags" <<'JS'
const fs = require('fs');
const tags = process.argv[2].replace(/\\n/g, '\n').replace(/\n$/, '');
const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');
const a = '<!-- CHAPTERS:START -->', b = '<!-- CHAPTERS:END -->';
const body = a + '\n' + (tags || '  <!-- none yet -->') + '\n  ' + b;
if (s.includes(a)) s = s.replace(new RegExp(a + '[\\s\\S]*?' + b), body);
// Chapters must load AFTER the question files they attach to, and BEFORE app.js.
else s = s.replace('<!-- PYQ:START -->', body + '\n<!-- PYQ:START -->');
fs.writeFileSync(p, s);
JS
clist=""
for f in $chap; do clist="$clist  './$f',\n"; done
/opt/node22/bin/node - "$clist" <<'JS'
const fs = require('fs');
const list = process.argv[2].replace(/\\n/g, '\n').replace(/,\n$/, '\n');
const p = 'sw.js';
let s = fs.readFileSync(p, 'utf8');
const a = '// CHAPTERS:START', b = '// CHAPTERS:END';
const body = a + '\n' + (list ? 'ASSETS = ASSETS.concat([\n' + list + ']);\n' : '') + b;
const before = s;
if (s.includes(a)) s = s.replace(new RegExp(a + '[\\s\\S]*?' + b), body);
else s = s.replace('// PYQ:START', body + '\n// PYQ:START');
if (s !== before) {
  const m = s.match(/var CACHE = 'gate-r1-v(\d+)'/);
  if (m) s = s.replace(m[0], "var CACHE = 'gate-r1-v" + (+m[1] + 1) + "'");
  fs.writeFileSync(p, s);
}
JS
echo "wired $(echo "$chap" | grep -c . || true) chapter file(s)"
