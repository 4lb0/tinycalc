self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v2').then(function (cache) {
      return cache.addAll([
        './',
        './index.html'
      ])
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response !== undefined) {
      return response
    } else {
      return fetch(event.request).then(function (response) {
        const responseClone = response.clone()
        caches.open('v2').then(function (cache) {
          cache.put(event.request, responseClone)
        })
        return response
      }).catch(function () {
      })
    }
  }))
})
