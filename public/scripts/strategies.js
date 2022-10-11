const networkFirst = (event, cacheName) => {
    event.respondWith(async function() {
        const cache = await caches.open(cacheName);

        let networkResponse;
        try {
            networkResponse = await fetch(event.request);
        } catch (e) {
            return await cache.match(event.request);
        }

        event.waitUntil(
            cache.put(event.request, networkResponse.clone())
        );

        return networkResponse;
    }());
};

const cacheFirst = (event, cacheName) => {
    event.respondWith(async function() {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(event.request);
        event.waitUntil(
            cache.put(event.request, networkResponse.clone())
        );

        return networkResponse;
    }());
};

const cacheOnly = event => {
    event.respondWith(caches.match(event.request));
};

const networkOnly = event => {
    event.respondWith(fetch(event.request));
};

const composeStrategies = (strategies = [{ strategy: networkOnly, pattern: '.*', method: 'GET' }]) => {
    return (event) => {
        for (let { strategy, path, url, method, cacheName } of strategies) {
            const regExp = new RegExp(url || path);
            const requestUrl = new URL(event.request.url);
            const source = path ? requestUrl.pathname : event.request.url;

            if (!Array.isArray(method)) {
                method = [method];
            }
            method = method.map(m => m.toUpperCase());

            if (method.includes(event.request.method.toUpperCase()) && source.match(regExp)) {
                return strategy(event, cacheName);
            }
        }

        return networkOnly(event);
    };
};
