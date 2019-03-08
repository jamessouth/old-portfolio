/* eslint-disable no-undef, no-restricted-globals, no-underscore-dangle */
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute.mjs';
import { cleanupOutdatedCaches } from 'workbox-precaching/cleanupOutdatedCaches.mjs';
import { registerRoute } from 'workbox-routing/registerRoute.mjs';
import { setCatchHandler } from 'workbox-routing/setCatchHandler.mjs';
import { setDefaultHandler } from 'workbox-routing/setDefaultHandler.mjs';
import { CacheFirst } from 'workbox-strategies/CacheFirst.mjs';
import { StaleWhileRevalidate } from 'workbox-strategies/StaleWhileRevalidate.mjs';
import { Plugin as ExpirationPlugin } from 'workbox-expiration/Plugin.mjs';
import { setCacheNameDetails } from 'workbox-core/setCacheNameDetails.mjs';
import { clientsClaim } from 'workbox-core/clientsClaim.mjs';
import { skipWaiting } from 'workbox-core/skipWaiting.mjs';


skipWaiting();
clientsClaim();


const prefix = 'james south portfolio';
const FALLBACK_IMAGE_7_URL = '/images/project7.0d460c6cd15e9ed3f683a05d1a282fbb.jpg';
const FALLBACK_IMAGE_9_URL = '/images/project9.fef701d08faf6c81fe7b50e9c45f79ad.jpg';
const FALLBACK_IMAGE_10_URL = '/images/project10.38128e3e605efa9c9dc9aecec6ffe3f7.jpg';
const FALLBACK_IMAGE_11_URL = '/images/project11.f50561f0701ba64315826deee4556c17.jpg';


setCacheNameDetails({ prefix });

self.__precacheManifest = [].concat(self.__precacheManifest || []);

precacheAndRoute(self.__precacheManifest, {});

cleanupOutdatedCaches();


registerRoute(
  /\.(?:js)$/,
  new CacheFirst({
    cacheName: `${prefix}-lazy-js`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);


registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: `${prefix}-images`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 180,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: `${prefix}-google-fonts-css`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 60 * 60 * 24 * 30,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: `${prefix}-google-fonts`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

setDefaultHandler(
  new StaleWhileRevalidate({
    cacheName: `${prefix}-default-handler`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);


setCatchHandler(({ event }) => {
  console.log(event.request);
  if (event.request.destination === 'image' && /\.gif$/.test(event.request.url) && !event.request.url.includes('explosion')) {
    switch (event.request.url.match(/\d{1,2}(?=\.\w{32})/)[0]) {
      case '7':
        return caches.match(FALLBACK_IMAGE_7_URL);
      case '9':
        return caches.match(FALLBACK_IMAGE_9_URL);
      case '10':
        return caches.match(FALLBACK_IMAGE_10_URL);
      case '11':
        return caches.match(FALLBACK_IMAGE_11_URL);
    }
  }
  return Response.error();
});
