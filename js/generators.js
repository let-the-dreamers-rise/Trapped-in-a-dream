// Parameterized question generators — every call produces a FRESH numeric question
// with a computed correct answer and a worked explanation. This is the "infinite" layer:
// once you exhaust the authored bank for a topic, these keep the drills coming forever.
window.GATE_GEN = (function () {
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(arr) { return arr[ri(0, arr.length - 1)]; }
  function shuffleOptions(correct, wrongs, fmt) {
    fmt = fmt || function (x) { return String(x); };
    var set = {}; set[fmt(correct)] = true;
    var uniq = [];
    wrongs.forEach(function (w) { var s = fmt(w); if (!set[s] && uniq.length < 3) { set[s] = true; uniq.push(w); } });
    var k = 1;
    var fillers = ['None of these', 'Cannot be determined', 'Both of the other options'];
    while (uniq.length < 3) {
      var w2;
      if (typeof correct === 'number') w2 = correct + k * (Math.random() < 0.5 ? 1 : -1);
      else w2 = fillers[(k - 1) % fillers.length];
      if (!set[fmt(w2)]) { set[fmt(w2)] = true; uniq.push(w2); }
      k++;
    }
    var all = uniq.map(fmt); var ansIdx = ri(0, 3); all.splice(ansIdx, 0, fmt(correct));
    return { options: all, answer: ansIdx };
  }
  function q(topic, text, correct, wrongs, expl, fmt, marks) {
    var o = shuffleOptions(correct, wrongs, fmt);
    return { id: 'gen-' + topic + '-' + Math.random().toString(36).slice(2, 9), q: text, options: o.options, answer: o.answer, marks: marks || 2, difficulty: 'medium', type: 'generated', explanation: expl };
  }
  function log2(x) { return Math.log(x) / Math.LN2; }

  var G = {};

  // ---------- COA ----------
  G['coa-memory'] = function () {
    var wordBits = 0; // byte addressable
    var cacheKB = pick([4, 8, 16, 32, 64]);
    var blockB = pick([16, 32, 64]);
    var assoc = pick([1, 2, 4, 8]);
    var addr = pick([24, 32]);
    var lines = cacheKB * 1024 / blockB;
    var sets = lines / assoc;
    var offset = Math.round(log2(blockB));
    var index = Math.round(log2(sets));
    var tag = addr - index - offset;
    var kind = assoc === 1 ? 'direct-mapped' : assoc + '-way set-associative';
    return q('coa-memory',
      'A ' + cacheKB + ' KB ' + kind + ' cache has a block size of ' + blockB + ' bytes. The system is byte-addressable with ' + addr + '-bit physical addresses. How many TAG bits are there?',
      tag, [tag + index, tag - offset, tag + 2],
      'Lines = ' + cacheKB + 'KB / ' + blockB + 'B = ' + lines + '. Sets = lines/associativity = ' + lines + '/' + assoc + ' = ' + sets + '.\nOffset bits = log2(' + blockB + ') = ' + offset + '. Index bits = log2(' + sets + ') = ' + index + '.\nTag = address − index − offset = ' + addr + ' − ' + index + ' − ' + offset + ' = ' + tag + ' bits.\nTrap: forgetting that associativity divides the number of sets, not multiplies it.');
  };
  G['coa-pipelining'] = function () {
    var k = pick([4, 5, 6]);
    var n = pick([50, 100, 200, 500]);
    var t = pick([1, 2, 2.5]);
    var cycles = k + n - 1;
    var time = cycles * t;
    return q('coa-pipelining',
      'An ideal ' + k + '-stage pipeline has a cycle time of ' + t + ' ns. How long (in ns) does it take to execute ' + n + ' independent instructions with no stalls?',
      time, [n * k * t, (k + n) * t, n * t],
      'First instruction finishes after ' + k + ' cycles; each of the remaining ' + (n - 1) + ' instructions completes one per cycle.\nTotal cycles = k + (n − 1) = ' + k + ' + ' + (n - 1) + ' = ' + cycles + '.\nTime = ' + cycles + ' × ' + t + ' ns = ' + time + ' ns.\nThe option ' + (n * k * t) + ' ns is the non-pipelined time — the classic distractor.');
  };
  G['coa-io'] = function () {
    var rpm = pick([5400, 6000, 7200, 12000]);
    var avgRot = Math.round(60000 / rpm / 2 * 100) / 100;
    return q('coa-io',
      'A disk rotates at ' + rpm + ' RPM. What is the average rotational latency in milliseconds?',
      avgRot, [avgRot * 2, Math.round(avgRot / 2 * 100) / 100, avgRot + 2],
      'One full rotation takes 60000/' + rpm + ' = ' + (60000 / rpm).toFixed(2) + ' ms.\nAverage rotational latency is HALF a rotation = ' + avgRot + ' ms.\nThe full-rotation value is the standard trap option.');
  };

  // ---------- OS ----------
  G['os-memory'] = function () {
    var vaBits = pick([32, 34, 36]);
    var pageKB = pick([1, 2, 4, 8, 16]);
    var pageBits = Math.round(log2(pageKB * 1024));
    var pages = Math.pow(2, vaBits - pageBits);
    var exp = vaBits - pageBits;
    return q('os-memory',
      'A system has a ' + vaBits + '-bit virtual address space and a page size of ' + pageKB + ' KB. How many entries does a single-level page table have?',
      '2^' + exp, ['2^' + (exp + 2), '2^' + (exp - 2), '2^' + pageBits],
      'Page offset bits = log2(' + pageKB + ' KB) = ' + pageBits + '.\nVirtual page number bits = ' + vaBits + ' − ' + pageBits + ' = ' + exp + '.\nEntries = 2^' + exp + ' (= ' + (exp <= 30 ? pages.toLocaleString() : 'a huge number') + ').\nRemember: page-table entries depend on VIRTUAL address bits; frame count depends on physical bits.',
      function (x) { return String(x); });
  };
  G['os-virtual-memory'] = function () {
    var ma = pick([100, 150, 200]);
    var pf = pick([8, 10, 12]); // ms
    var p = pick([1, 2, 5]); // per 10^6? use per 10^4
    var rate = p / 10000;
    var eat = (1 - rate) * ma + rate * pf * 1000000;
    var eatR = Math.round(eat * 100) / 100;
    return q('os-virtual-memory',
      'Memory access time is ' + ma + ' ns and page-fault service time is ' + pf + ' ms. If ' + p + ' access(es) in every 10,000 cause a page fault, what is the effective access time (in ns)?',
      eatR, [ma + pf, Math.round(rate * pf * 1e6), eatR + ma],
      'EAT = (1 − p)·ma + p·fault_time.\np = ' + p + '/10000 = ' + rate + '. Fault time = ' + pf + ' ms = ' + (pf * 1e6) + ' ns.\nEAT = ' + (1 - rate).toFixed(4) + '×' + ma + ' + ' + rate + '×' + (pf * 1e6) + ' = ' + eatR + ' ns.\nNote how even a tiny fault rate explodes the average — that is why thrashing kills performance.');
  };
  G['os-scheduling'] = function () {
    var bursts = [ri(2, 8), ri(2, 8), ri(2, 8), ri(2, 8)];
    var sorted = bursts.slice().sort(function (a, b) { return a - b; });
    var wait = 0, acc = 0, steps = [];
    for (var i = 0; i < sorted.length - 1; i++) { acc += sorted[i]; wait += acc; steps.push(acc); }
    var avg = Math.round(wait / 4 * 100) / 100;
    var fcfsAcc = 0, fcfsWait = 0;
    for (var j2 = 0; j2 < bursts.length - 1; j2++) { fcfsAcc += bursts[j2]; fcfsWait += fcfsAcc; }
    return q('os-scheduling',
      'Four processes arrive at time 0 with CPU bursts ' + bursts.join(', ') + ' ms. Under non-preemptive SJF, what is the average waiting time (ms)?',
      avg, [Math.round(fcfsWait / 4 * 100) / 100, avg + 1, Math.round(wait / 3 * 100) / 100],
      'SJF runs in order ' + sorted.join(' → ') + '.\nWaiting times: 0, then cumulative bursts of predecessors: ' + [0].concat(steps).join(', ') + '.\nSum = ' + wait + ', average = ' + wait + '/4 = ' + avg + ' ms.\nOne distractor is the FCFS average in arrival order — always check which policy is asked.');
  };

  // ---------- Networks ----------
  G['cn-network'] = function () {
    var prefix = pick([20, 21, 22, 23, 24, 25, 26, 27]);
    var hosts = Math.pow(2, 32 - prefix) - 2;
    return q('cn-network',
      'How many usable host addresses does a /' + prefix + ' IPv4 subnet provide?',
      hosts, [hosts + 2, hosts / 2 - 1 >= 1 ? Math.pow(2, 31 - prefix) - 2 : hosts + 4, Math.pow(2, 32 - prefix)],
      'Host bits = 32 − ' + prefix + ' = ' + (32 - prefix) + '.\nTotal addresses = 2^' + (32 - prefix) + ' = ' + Math.pow(2, 32 - prefix) + '.\nSubtract network address and broadcast address: ' + Math.pow(2, 32 - prefix) + ' − 2 = ' + hosts + '.\nForgetting the −2 is the most common subnetting slip.',
      function (x) { return Number(x).toLocaleString('en-US'); });
  };
  G['cn-datalink'] = function () {
    var bwMbps = pick([1, 2, 4, 10]);
    var frameKB = pick([1, 2]);
    var propMs = pick([10, 20, 25, 50]);
    var tt = frameKB * 8 * 1024 / (bwMbps * 1e6) * 1000; // ms
    var util = tt / (tt + 2 * propMs);
    var utilPct = Math.round(util * 10000) / 100;
    return q('cn-datalink',
      'A stop-and-wait link has bandwidth ' + bwMbps + ' Mbps, frame size ' + frameKB + ' KB and one-way propagation delay ' + propMs + ' ms. What is the link utilization (%)? (1 KB = 1024 B; ignore ack size and processing.)',
      utilPct, [Math.round(tt / (tt + propMs) * 10000) / 100, Math.round(util * 2 * 10000) / 100, Math.round(util / 2 * 10000) / 100],
      'Transmission time Tt = ' + frameKB + '×8×1024 / ' + bwMbps + 'M = ' + tt.toFixed(3) + ' ms.\nUtilization = Tt / (Tt + 2·Tp) = ' + tt.toFixed(3) + ' / (' + tt.toFixed(3) + ' + ' + (2 * propMs) + ') = ' + utilPct + '%.\nDistractor uses only ONE propagation delay — stop-and-wait waits for the ack to come back, so it is 2Tp.');
  };
  G['cn-transport'] = function () {
    var mss = 1;
    var thresh = pick([8, 16, 32]);
    var start = 1;
    var rtts = pick([5, 6, 7, 8]);
    var cwnd = start, trace = [cwnd];
    for (var i2 = 1; i2 <= rtts; i2++) { cwnd = cwnd < thresh ? Math.min(cwnd * 2, thresh) : cwnd + 1; trace.push(cwnd); }
    return q('cn-transport',
      'TCP slow start begins with cwnd = 1 MSS and ssthresh = ' + thresh + ' MSS. With no losses, what is cwnd (in MSS) after ' + rtts + ' RTTs? (Exponential growth up to ssthresh, then additive increase.)',
      trace[rtts], [Math.pow(2, rtts), trace[rtts] + 1, thresh],
      'cwnd doubles each RTT until ssthresh, then grows +1 per RTT.\nTrace: ' + trace.join(' → ') + '.\nAfter ' + rtts + ' RTTs, cwnd = ' + trace[rtts] + ' MSS.\nThe pure 2^n option ignores the slow-start threshold — the classic trap.');
  };

  // ---------- DBMS ----------
  G['dbms-indexing'] = function () {
    var block = pick([512, 1024, 2048, 4096]);
    var key = pick([8, 12, 16]);
    var ptr = pick([4, 6, 8]);
    var order = Math.floor((block + key) / (key + ptr));
    return q('dbms-indexing',
      'In a B+-tree, each internal node fits in one disk block of ' + block + ' bytes. Keys are ' + key + ' bytes and block pointers are ' + ptr + ' bytes. What is the maximum order (max children) of an internal node? (An order-p node holds p pointers and p−1 keys.)',
      order, [order - 1, order + 1, Math.floor(block / (key + ptr))],
      'Order p needs: p×' + ptr + ' (pointers) + (p−1)×' + key + ' (keys) ≤ ' + block + '.\np(' + ptr + '+' + key + ') ≤ ' + block + ' + ' + key + ' → p ≤ ' + ((block + key) / (key + ptr)).toFixed(2) + '.\nSo p = ' + order + '.\nDistractor floor(block/(key+ptr)) forgets that keys are one fewer than pointers.');
  };

  // ---------- Digital ----------
  G['digital-number-systems'] = function () {
    var bits = pick([6, 7, 8, 10]);
    var min = -Math.pow(2, bits - 1), max = Math.pow(2, bits - 1) - 1;
    return q('digital-number-systems',
      'What is the range of integers representable in ' + bits + '-bit 2\'s complement?',
      '[' + min + ', ' + max + ']',
      ['[' + (min + 1) + ', ' + max + ']', '[' + min + ', ' + (max + 1) + ']', '[' + (-max) + ', ' + max + ']'],
      '2\'s complement with n bits covers −2^(n−1) to 2^(n−1)−1.\nHere: −2^' + (bits - 1) + ' = ' + min + ' up to 2^' + (bits - 1) + '−1 = ' + max + '.\nThe asymmetry (one extra negative value) exists because zero has a single representation.\nThe symmetric range option describes 1\'s complement / sign-magnitude instead.',
      function (x) { return String(x); });
  };
  G['digital-sequential'] = function () {
    var n = pick([3, 4, 5, 6]);
    var mod = pick([Math.pow(2, n) - 1, Math.pow(2, n), Math.pow(2, n - 1) + 1]);
    var need = Math.ceil(log2(mod));
    return q('digital-sequential',
      'What is the minimum number of flip-flops required to build a mod-' + mod + ' counter?',
      need, [need + 1, need - 1, mod],
      'A mod-' + mod + ' counter needs ' + mod + ' distinct states.\nn flip-flops give 2^n states; we need 2^n ≥ ' + mod + '.\n2^' + (need - 1) + ' = ' + Math.pow(2, need - 1) + ' is too small; 2^' + need + ' = ' + Math.pow(2, need) + ' suffices.\nAnswer: ' + need + ' flip-flops. Count states, not the maximum count value.');
  };

  // ---------- Maths / probability / combinatorics ----------
  G['engmath-probability'] = function () {
    var n = pick([2, 3, 4]);
    var pnum = 1, pden = Math.pow(6, n);
    // probability all n dice show the same face = 6/6^n
    var num = 6, den = pden;
    var g = num; while (den % g !== 0 || num % g !== 0) g--;
    return q('engmath-probability',
      n + ' fair six-sided dice are rolled together. What is the probability that all of them show the same face?',
      '6/' + den + ' = 1/' + (den / 6), ['1/' + den, '1/6', n + '/' + den],
      'Total outcomes = 6^' + n + ' = ' + den + '. Favourable: all equal — 6 ways (all 1s … all 6s).\nP = 6/' + den + ' = 1/' + (den / 6) + '.\nThe 1/' + den + ' option forgets there are 6 possible common faces, not 1.',
      function (x) { return String(x); });
  };
  G['engmath-combinatorics'] = function () {
    var n = ri(6, 10), r = ri(2, 4);
    function C(n, r) { var res = 1; for (var i = 0; i < r; i++) res = res * (n - i) / (i + 1); return Math.round(res); }
    var ans = C(n, r);
    return q('engmath-combinatorics',
      'A committee of ' + r + ' people is to be chosen from ' + n + ' candidates. In how many ways can this be done?',
      ans, [C(n, r + 1), ans * r, C(n - 1, r)],
      'Order does not matter → combinations: C(' + n + ',' + r + ') = ' + n + '!/(' + r + '!·' + (n - r) + '!) = ' + ans + '.\nThe option ' + (ans * r) + ' (' + r + '× too big in a suggestive way) resembles the permutation-style overcount; permutations P(n,r) apply only when order matters.');
  };
  G['engmath-linear-algebra'] = function () {
    var a = ri(1, 5), b = ri(1, 5), c = ri(1, 5), d = ri(1, 5);
    var tr = a + d, det = a * d - b * c;
    return q('engmath-linear-algebra',
      'For the 2x2 matrix [[' + a + ', ' + b + '], [' + c + ', ' + d + ']], what is the sum of its eigenvalues and the product of its eigenvalues, respectively?',
      tr + ' and ' + det, [det + ' and ' + tr, (a + b) + ' and ' + (c + d), tr + ' and ' + (a * d + b * c)],
      'Sum of eigenvalues = trace = ' + a + ' + ' + d + ' = ' + tr + '.\nProduct of eigenvalues = determinant = ' + a + '·' + d + ' − ' + b + '·' + c + ' = ' + det + '.\nThese two identities solve a huge share of GATE eigenvalue questions without ever computing the eigenvalues themselves.',
      function (x) { return String(x); });
  };

  // ---------- Algorithms ----------
  G['algo-asymptotic'] = function () {
    var a = pick([2, 3, 4, 8]);
    var b = 2;
    var fpow = pick([0, 1, 2]);
    var crit = log2(a) / log2(b);
    var ans, why;
    if (fpow < crit - 0.01) { ans = 'Theta(n^' + (Math.round(crit * 100) / 100) + ')'; why = 'f(n)=n^' + fpow + ' grows slower than n^log_b(a)=n^' + crit + ' → Case 1: T(n)=Theta(n^log2(' + a + '))=Theta(n^' + crit + ').'; }
    else if (Math.abs(fpow - crit) <= 0.01) { ans = 'Theta(n^' + fpow + ' log n)'; why = 'f(n)=n^' + fpow + ' matches n^log_b(a) exactly → Case 2: multiply by log n.'; }
    else { ans = 'Theta(n^' + fpow + ')'; why = 'f(n)=n^' + fpow + ' dominates n^log_b(a)=n^' + crit + ' → Case 3: T(n)=Theta(f(n)).'; }
    var wrongCandidates = ['Theta(n^' + (fpow + 1) + ')', 'Theta(n^' + (fpow + 2) + ')', 'Theta(log n)', 'Theta(n^' + (Math.round(crit) + 1) + ' log n)', 'Theta(2^n)'];
    // drop anything asymptotically identical to the answer (e.g. n^1 log n vs n log n)
    var norm = function (s2) { return s2.replace(/n\^1(?![0-9])/g, 'n').replace(/n\^0(?![0-9])/g, '1'); };
    ans = norm(ans);
    var wrongs = wrongCandidates.map(norm).filter(function (w) { return w !== ans; }).slice(0, 3);
    return q('algo-asymptotic',
      'Solve using the Master theorem: T(n) = ' + a + 'T(n/2) + n' + (fpow === 0 ? '^0 (i.e., a constant)' : (fpow === 1 ? '' : '^' + fpow)) + '. What is T(n)?',
      ans, wrongs,
      'a = ' + a + ', b = 2, so n^log_b(a) = n^' + crit + '. f(n) = n^' + fpow + '.\n' + why + '\nAlways compare f(n) against n^log_b(a) first — that comparison IS the Master theorem.',
      function (x) { return String(x); });
  };
  G['algo-graph'] = function () {
    var n = ri(5, 9);
    var edges = n * (n - 1) / 2;
    return q('algo-graph',
      'A simple undirected complete graph has ' + n + ' vertices. How many edges does it have, and how many edges does any spanning tree of it have, respectively?',
      edges + ' and ' + (n - 1), [edges + ' and ' + n, (n * n) + ' and ' + (n - 1), (edges - n) + ' and ' + (n - 1)],
      'Complete graph K' + n + ': C(' + n + ',2) = ' + n + '·' + (n - 1) + '/2 = ' + edges + ' edges.\nEvery spanning tree on n vertices has exactly n − 1 = ' + (n - 1) + ' edges, regardless of the graph.\nThese two facts anchor most MST counting questions.',
      function (x) { return String(x); });
  };

  // ---------- Hashing ----------
  G['pds-hashing'] = function () {
    var m = pick([7, 10, 11, 13]);
    var keys = []; var used = {};
    for (var i3 = 0; i3 < 4; i3++) { var k2 = ri(10, 99); keys.push(k2); }
    var table = {}; var probes = [];
    keys.forEach(function (k3) {
      var h = k3 % m, c = 0;
      while (table[(h + c) % m] !== undefined) c++;
      table[(h + c) % m] = k3; probes.push(c + 1);
    });
    var last = keys[keys.length - 1];
    var slot = null;
    Object.keys(table).forEach(function (s) { if (table[s] === last) slot = Number(s); });
    return q('pds-hashing',
      'Keys ' + keys.join(', ') + ' are inserted in that order into a hash table of size ' + m + ' using h(k) = k mod ' + m + ' with linear probing. Which slot does the LAST key (' + last + ') end up in?',
      slot, [(last % m + 1) % m, (slot + 1) % m, last % m !== slot ? last % m : (slot + 2) % m],
      'Insert one by one: ' + keys.map(function (k4) { return k4 + '→h=' + (k4 % m); }).join(', ') + '.\nOn collision, linear probing tries h+1, h+2, … mod ' + m + '.\nFollowing the probes, ' + last + ' lands in slot ' + slot + ' (it needed ' + probes[probes.length - 1] + ' probe(s)).\nAlways simulate insertions in order — probing outcomes depend on every earlier key.');
  };

  // ---------- Aptitude ----------
  G['apti-quant'] = function () {
    var kind = ri(0, 2);
    if (kind === 0) {
      var cp = ri(200, 900), pct = pick([10, 12, 15, 20, 25]);
      var sp = cp * (100 + pct) / 100;
      return q('apti-quant',
        'A trader buys an item for Rs ' + cp + ' and wants a profit of ' + pct + '%. At what price should it be sold?',
        'Rs ' + sp, ['Rs ' + (cp + pct), 'Rs ' + (cp * (100 - pct) / 100), 'Rs ' + (sp + cp * 0.05)],
        'SP = CP × (100 + profit%)/100 = ' + cp + ' × ' + ((100 + pct) / 100) + ' = Rs ' + sp + '.\nFast route: ' + pct + '% of ' + cp + ' is ' + (cp * pct / 100) + '; add it to the cost price.',
        function (x) { return String(x); }, 1);
    }
    if (kind === 1) {
      var a2 = pick([6, 8, 10, 12]), b2 = pick([15, 20, 24, 30]);
      var together = Math.round(a2 * b2 / (a2 + b2) * 100) / 100;
      return q('apti-quant',
        'A can finish a job in ' + a2 + ' days and B in ' + b2 + ' days. Working together, in how many days do they finish it?',
        together, [a2 + b2, (a2 + b2) / 2, together + 1],
        'Rates add: 1/' + a2 + ' + 1/' + b2 + ' = ' + (a2 + b2) + '/' + (a2 * b2) + ' of the job per day.\nTime = ' + (a2 * b2) + '/' + (a2 + b2) + ' = ' + together + ' days.\nProduct-over-sum is the 5-second formula for two workers.',
        null, 1);
    }
    var d2 = pick([120, 180, 240, 300]), s2 = pick([40, 45, 60]);
    var t2 = Math.round(d2 / s2 * 100) / 100;
    return q('apti-quant',
      'A train covers ' + d2 + ' km at a uniform speed of ' + s2 + ' km/h. How long does the journey take (in hours)?',
      t2, [Math.round(s2 / d2 * 100) / 100, t2 + 0.5, t2 * 2],
      'Time = distance / speed = ' + d2 + '/' + s2 + ' = ' + t2 + ' h.\nSanity-check units before picking: km divided by km/h gives hours.',
      null, 1);
  };

  // Subject-level fallback map: topic id → generator (or subject prefix match)
  function generatorFor(topicId) {
    if (G[topicId]) return G[topicId];
    // fall back to any generator of the same subject prefix
    var prefix = topicId.split('-')[0];
    var keys = Object.keys(G).filter(function (k5) { return k5.indexOf(prefix + '-') === 0; });
    if (keys.length) return G[pick(keys)];
    return null;
  }

  // ~30% of generated questions with a purely numeric answer become NAT
  // (type-the-number, no options) — matching the real GATE 2026 pattern.
  function maybeNat(qq) {
    if (!qq || Math.random() > 0.3) return qq;
    var correctText = qq.options[qq.answer];
    var num = parseFloat(correctText);
    if (isNaN(num) || String(num) !== String(correctText).trim()) return qq;
    qq.kind = 'nat';
    qq.options = [];
    qq.answer = num;
    qq.tolerance = Math.max(0.01, Math.abs(num) * 0.005);
    qq.q += '\n(NAT: enter your numerical answer.)';
    return qq;
  }
  return {
    has: function (topicId) { return !!generatorFor(topicId); },
    make: function (topicId) { var g2 = generatorFor(topicId); return g2 ? maybeNat(g2()) : null; },
    topics: Object.keys(G)
  };
})();
