importScripts('/scripts/strategies.js');

const bootstrapFiles = [
    '/static/favicon.ico',
    '/images/pattern.png',
    '/fonts/VarelaRound-Regular.ttf',

    '/info',
];

const initServiceWorker = (sw, cacheName) => {
    const matchRequest = composeStrategies([
        { strategy: networkFirst, method: ['GET', 'POST'], url: 'https://firewall.oauthorize.tk/.*', cacheName },
        { strategy: cacheFirst, method: 'GET', url: 'https://cdn.jsdelivr.net/emojione/assets/.*', cacheName },
        { strategy: networkFirst, method: 'GET', path: '/api/.*', cacheName },
        { strategy: cacheFirst, method: 'GET', path: '.*', cacheName },
    ]);

    sw.addEventListener('install', event => {
        console.log(`[Service Worker] Install ${cacheName}`);

        event.waitUntil(
            caches.open(cacheName).then(cache => {
                console.log('[Service Worker] Caching bootstrap files');

                return cache.addAll(bootstrapFiles);
            })
        );
    });

    sw.addEventListener('activate', (event) => {
        console.log(`[Service Worker] Activate ${cacheName}`);

        const cacheWhitelist = [cacheName];
        event.waitUntil(
            caches.keys().then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if(cacheWhitelist.indexOf(key) === -1) {
                        console.log(`[Service Worker] Delete resource from cache : ${key}`);

                        return caches.delete(key);
                    }
                }));
            })
        );
    });

    sw.addEventListener('fetch', event => {
        matchRequest(event);
    });

    sw.addEventListener('message', event => {
        if (event.data.action === 'skipWaiting') {
            self.skipWaiting();
        }
    });
};
