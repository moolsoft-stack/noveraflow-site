// Only public app code/assets. Auth callbacks, API responses and user records
// never enter Cache Storage; owner records use the transactional IndexedDB store.
const CACHE = 'noveraflow-web-shell-v1';
const CORE = ['/app/', '/app/index.html', '/app/flutter_bootstrap.js', '/app/main.dart.js'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin ||
      url.search || url.hash || !url.pathname.startsWith('/app/') ||
      url.pathname.startsWith('/app/auth/')) return;
  const asset = CORE.includes(url.pathname) ||
      /^\/app\/(assets|canvaskit|icons)\//.test(url.pathname) ||
      ['/app/flutter.js', '/app/manifest.json', '/app/version.json'].includes(url.pathname);
  if (!asset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      if (response.ok && !response.redirected) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      throw error;
    }
  })());
});
