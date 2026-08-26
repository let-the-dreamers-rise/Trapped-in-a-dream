// Offline cache — the whole app works with zero network after first load.
var CACHE = 'gate-r1-v1';
var ASSETS = [
  './', './index.html', './css/style.css', './js/app.js', './js/generators.js',
  './data/plan90.js', './data/astro.js', './icon.svg', './manifest.webmanifest',
  './data/questions/engmath.js', './data/questions/digital.js', './data/questions/coa.js',
  './data/questions/pds.js', './data/questions/algo.js', './data/questions/toc.js',
  './data/questions/compiler.js', './data/questions/os.js', './data/questions/dbms.js',
  './data/questions/cn.js', './data/questions/apti.js'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () { return caches.match(e.request); })
  );
});
