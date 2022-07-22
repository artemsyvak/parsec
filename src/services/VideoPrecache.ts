

export const cacheVideoUrls = (videoFileUrls: string[]) => {
    window.caches.open('video-pre-cache')
        .then(cache =>
            Promise.all(videoFileUrls.map(videoFileUrl =>
                fetchAndCache(videoFileUrl, cache))
            )
        );
}

export const fetchAndCache = (videoFileUrl: string, cache: Cache) => {
    return cache.match(videoFileUrl)
        .then(cacheResponse => {
            if (cacheResponse) {
                return cacheResponse;
            }
            return fetch(videoFileUrl, { mode: 'no-cors', headers: { range: 'bytes=0-567139' } })
                .then(networkResponse => networkResponse.arrayBuffer())
                .then(data => {
                    const response = new Response(data);
                    cache.put(videoFileUrl, response.clone());
                    return response;
                });
        });
}