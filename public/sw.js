const CACHE_NAME = 'v1';

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll([
				'/', // Cache the index page
				'/settings',
				'/stats',
				'/signin',
				'/signup',
				'/ranking',
				// Add other routes here
			]);
		}),
	);
});

self.addEventListener('activate', event => {
	console.log('Service worker activated');
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.open(CACHE_NAME).then(async cache => {
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) {
				return cachedResponse;
			}

			// If request is not cached, fetch it from network
			return fetch(event.request)
				.then(networkResponse => {
					// Clone the response as it can be consumed only once
					const responseToCache = networkResponse.clone();

					// Cache the fetched resource
					caches.open(CACHE_NAME).then(cache => {
						cache.put(event.request, responseToCache);
					});

					// Return the network response
					return networkResponse;
				})
				.catch(() => {
					// If fetch fails and there's no cached response, return an error response
					return new Response('Offline', {
						status: 503,
						statusText: 'Service Unavailable',
					});
				});
		}),
	);
});
