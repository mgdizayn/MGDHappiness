// v1.2 — Cache güncellendi, eski oturum sorunu giderildi
const CACHE = 'mgd-happiness-v1.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  // Eski cache'leri temizle — yeni HTML garantili yüklenir
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => {
        console.log('[SW] Eski cache silindi:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('broker.emqx.io') ||
      e.request.url.includes('fonts.googleapis.com') ||
      e.request.url.includes('unpkg.com') ||
      e.request.url.includes('jsdelivr.net') ||
      e.request.url.includes('fingerprintjs')) return;
  // Network-first: önce güncel sürümü almaya çalış, olmazsa cache
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
