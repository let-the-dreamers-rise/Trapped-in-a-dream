// Exercise the validator's own key parsers against every official key file.
const fs = require('fs');
const V = require('./validate-pyq.js');
let bad = 0;
Object.keys(V.LAYOUT).forEach(base => {
  const k = V.parseKey(base);
  if (!k) { console.log(base.padEnd(13), 'NO KEY FILE'); bad++; return; }
  const keys = Object.keys(k.map);
  const ga = keys.filter(x => x.startsWith('GA:')).map(x => +x.split(':')[1]).sort((a, b) => a - b);
  const cs = keys.filter(x => x.startsWith('CS:')).map(x => +x.split(':')[1]).sort((a, b) => a - b);
  const kinds = { mcq: 0, msq: 0, nat: 0, dropped: 0, ambiguous: 0, unparsed: 0 };
  keys.forEach(x => { const v = k.map[x].value;
    if (v.dropped) kinds.dropped++; else if (v.ambiguous) kinds.ambiguous++; else if (v.unparsed) kinds.unparsed++;
    else if (v.nat) kinds.nat++; else if (v.letters.length > 1) kinds.msq++; else kinds.mcq++; });
  const contiguous = (a, lo, hi) => a.length === hi - lo + 1 && a[0] === lo && a[a.length - 1] === hi;
  const ok = k.layout === 'C'
    ? contiguous(ga, 1, 10) && contiguous(cs, 11, 65)
    : contiguous(ga, 1, 10) && contiguous(cs, 1, 55);
  if (!ok || kinds.unparsed) bad++;
  console.log(base.padEnd(13), k.layout, String(keys.length).padStart(3),
    ok && !kinds.unparsed ? 'OK ' : 'BAD', 'GA' + ga.length + '/CS' + cs.length, JSON.stringify(kinds));
});
console.log(bad ? '\n' + bad + ' key file(s) failed to parse cleanly' : '\nall 13 official keys parse cleanly');
process.exitCode = bad ? 1 : 0;
