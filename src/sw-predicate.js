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


const version = 'v2';

const prefix = 'james south portfolio';
// const FALLBACK_IMAGE_URL = '/Vue-Project-9/img/face.69232788.jpg';


setCacheNameDetails({ prefix });

self.__precacheManifest = [].concat(self.__precacheManifest || []);

precacheAndRoute(self.__precacheManifest, {});

cleanupOutdatedCaches();

self.addEventListener('message', (e) => {
  if (!e.data) return;
  if (e.data === 'skipWaiting') self.skipWaiting();
});


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
  console.log(event);
  // if (event.request.destination === 'image') {
  //   switch (event.request.url) {
  //     case
  //   }
  //   // return caches.match(FALLBACK_IMAGE_URL);
  // }
  return Response.error();
});
