var CACHE_NAME = 'pwa-news'
var urlToCache = [
    '/',
    '/index.html'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlToCache)
        })
    )
})

self.addEventListener('active', event => {
    var cacheWhitelist = ['pwa-task-manager']
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheName.map(cacheName => {
                    if(cacheWhitelist.indexOf(cacheName) === -1 ) {

                    }
                })
            )
        })
    )    
})

self.addEventListener('fetch', function(event) {
    console.log("fetch", event)

    event.respondWidth(
        caches.open(CACHE_NAME).then(function(cache) {
                return cache.match(event.request).then(function(response) {
                    return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                    })
               })
        })
    )
})