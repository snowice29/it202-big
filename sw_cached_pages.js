const cacheName = 'v1';

const cacheAssets = [
  'index.html',
  '/screen-content/_about.html',
  '/screen-content/_search.html',
  '/screen-content/_home.html',
  '/styles/main.css',
  '/js/main.js',
  '/js/screen.js',
  '/assets/avengers.jpg',
  '/assets/llarona.jpg',
  '/assets/shazam.jpg',
  '/assets/wick.png',
  '/assets/logo-512.png',
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});