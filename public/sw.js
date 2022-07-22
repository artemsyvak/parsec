// const CACHE_NAME = 'video-pre-cache';

// function shouldCache(url) {
//   return url.endsWith('.mp4') || url.endsWith('.m4s') || url.endsWith('.mov');
// }

// function loadFromCacheOrFetch(request) {
//   return caches.open(CACHE_NAME).then(function(cache) {
//     return cache.match(request).then(function(response) {
//       if (response) {
//         // The custom header was added before putting it in the cache.
//         console.log('Handling cached request', request.url);
//         return response;
//       }

//       // Request not cached, make a real request for the file.
//       return fetch(request).then(function(response) {
//         // Cache any successfully request for an MP4 segment.  Service
//         // workers cannot cache 206 (Partial Content).  This means that
//         // content that uses range requests (e.g. SegmentBase) will require
//         // more work.
//         if (response.ok && response.status != 206 && shouldCache(request.url)) {
//           console.log('Caching MP4 segment', request.url);
//           cacheResponse(cache, request, response);
//         }

//         return response;
//       });
//     });
//   })
// }

// function cacheResponse(cache, request, response) {
//   // Response objects are read-only, so to add our custom header, we need to
//   // recreate the object.
//   const init = {
//     status: response.status,
//     statusText: response.statusText,
//     headers: {'X-Shaka-From-Cache': true}
//   };

//   response.headers.forEach(function(value, key) {
//     init.headers[key] = value;
//   });

//   // Response objects are single use.  This means we need to call clone() so
//   // we can both store the ArrayBuffer and give the response to the page.
//   return response.clone().arrayBuffer().then(function(ab) {
//     cache.put(request, new Response(ab, init));
//   });
// }


// // function loadFromCacheOrFetch(request) {
// //     // Search through all available caches for this request.
// //     return caches.match(request)
// //     .then(response => {

// //       // Fetch from network if it's not already in the cache.
// //       if (!response) {
// //         return fetch(request);
// //         // Note that we may want to add the response to the cache and return
// //         // network response in parallel as well.
// //       }

// //       // Browser sends a HTTP Range request. Let's provide one reconstructed
// //       // manually from the cache.
// //       if (request.headers.has('range')) {
// //         return response.blob()
// //         .then(data => {

// //           // Get start position from Range request header.
// //           const pos = Number(/^bytes\=(\d+)\-/g.exec(request.headers.get('range'))[1]);
// //           const options = {
// //             status: 206,
// //             statusText: 'Partial Content',
// //             headers: response.headers
// //           }
// //           const slicedResponse = new Response(data.slice(pos), options);
// //           slicedResponse.setHeaders('Content-Range', 'bytes ' + pos + '-' +
// //               (data.size - 1) + '/' + data.size);
// //           slicedResponse.setHeaders('X-From-Cache', 'true');

// //           return slicedResponse;
// //         });
// //       }

// //       return response;
// //     })
// //   }



// self.addEventListener('fetch', function(event) {
//   event.respondWith(loadFromCacheOrFetch(event.request));
// });

//////////////////////////////=SERVICE WORKER=//=https://googlechrome.github.io/samples/service-worker/prefetch-video/=////////////////////////////
const CACHE_VERSION = 2
const CURRENT_CACHES = {
    prefetch: 'prefetch-cache-v' + CACHE_VERSION
}

self.addEventListener('install', function (event) {
    const urlsToPrefetch = [
        'https://s3.eu-central-1.amazonaws.com/parsec-studio/2022-07-20T16-39-01.781Z-showreel_preview.mov',
    ];

    // All of these logging statements should be visible via the "Inspect" interface
    // for the relevant SW accessed via chrome://serviceworker-internals
    console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

    self.skipWaiting();

    event.waitUntil(
        caches.open(CURRENT_CACHES.prefetch).then(function (cache) {
            return cache.addAll(urlsToPrefetch);
        })
    );
});

self.addEventListener('activate', function (event) {
    // Delete all caches that aren't named in CURRENT_CACHES.
    // While there is only one cache in this example, the same logic will handle the case where
    // there are multiple versioned caches.
    const expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
        return CURRENT_CACHES[key];
    });

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (expectedCacheNames.indexOf(cacheName) === -1) {
                        // If this cache name isn't present in the array of "expected" cache names, then delete it.
                        console.log('Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('Handling fetch event for', event.request.url);

    if (event.request.headers.get('range')) {
        const pos =
            Number(/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]);
        console.log('Range request for', event.request.url,
            ', starting position:', pos);
        event.respondWith(
            caches.open(CURRENT_CACHES.prefetch)
                .then(function (cache) {
                    return cache.match(event.request.url);
                }).then(function (res) {
                    if (!res) {
                        return fetch(event.request)
                            .then(res => {
                                return res.arrayBuffer();
                            });
                    }
                    return res.arrayBuffer();
                }).then(function (ab) {
                    return new Response(
                        ab.slice(pos),
                        {
                            status: 206,
                            statusText: 'Partial Content',
                            headers: [
                                // ['Content-Type', 'video/webm'],
                                ['Content-Range', 'bytes ' + pos + '-' +
                                    (ab.byteLength - 1) + '/' + ab.byteLength]]
                        });
                }));
    } else {
        console.log('Non-range request for', event.request.url);
        event.respondWith(
            // caches.match() will look for a cache entry in all of the caches available to the service worker.
            // It's an alternative to first opening a specific named cache and then matching on that.
            caches.match(event.request).then(function (response) {
                if (response) {
                    console.log('Found response in cache:', response);
                    return response;
                }
                console.log('No response found in cache. About to fetch from network...');
                // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
                // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
                return fetch(event.request).then(function (response) {
                    console.log('Response from network is:', response);

                    return response;
                }).catch(function (error) {
                    // This catch() will handle exceptions thrown from the fetch() operation.
                    // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
                    // It will return a normal response object that has the appropriate error code set.
                    console.error('Fetching failed:', error);

                    throw error;
                });
            })
        );
    }
})