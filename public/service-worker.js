const FILES_TO_CACHE = [
  "/",
  "assets/css/style.css",
  "assets/js/script.js",
  "assets/img/hamburger.png",
  "https://use.fontawesome.com/releases/v5.8.2/css/all.css",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
  "https://code.jquery.com/jquery.js",
  "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
  "views/index.handlebars",
  "views/layouts/main.handlebars"

];
const CACHE_NAME = 'static-cache-v4';

const DATA_CACHE_NAME = 'data-cache-v4';

self.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    return self.skipWaiting();
});


self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log('Removing old cache data", key');
                        return caches.delete(key);
                    }
                })

            )
        })
    )
    self.clients.claim();
})

self.addEventListener("fetch", function (evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);

          });
      }).catch(err => {
        console.log(err)
      })
    );

    return;
  }

  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});

  self.addEventListener('error', function(e) {
    console.log(e.filename, e.lineno, e.colno, e.message);
  });

  self.onerror = function(message) {
    console.log(message);
  };
  
  