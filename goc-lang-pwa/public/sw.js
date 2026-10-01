/* Góc Lặng — service worker: chạy ngoại tuyến, cập nhật khi có bản mới */
const VERSION = 'goclang-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.webmanifest',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Không can thiệp đăng nhập, Firestore, Drive, thời tiết — luôn đi thẳng ra mạng.
  if (/googleapis\.com|firebaseapp\.com|accounts\.google\.com|open-meteo\.com|bigdatacloud\.net/.test(url.host) || url.pathname.startsWith('/__/')) return;
  // Trang chính + file cấu hình: lấy bản mới khi có mạng, mất mạng thì dùng bản đã lưu.
  if (req.mode === 'navigate' || url.pathname.endsWith('firebase-config.js')) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req.mode === 'navigate' ? './index.html' : req, copy)); return r; })
      .catch(() => caches.match(req.mode === 'navigate' ? './index.html' : req)));
    return;
  }
  // Còn lại (icon, font, thư viện Firebase): dùng bản đã lưu, đồng thời làm mới ngầm.
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
