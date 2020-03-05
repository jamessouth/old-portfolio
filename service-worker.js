import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {cleanupOutdatedCaches, matchPrecache, precacheAndRoute} from 'workbox-precaching';
import {ExpirationPlugin} from 'workbox-expiration';
import {registerRoute, setCatchHandler, setDefaultHandler} from 'workbox-routing';
import {clientsClaim, setCacheNameDetails, skipWaiting} from 'workbox-core';

const prefix = 'james south portfolio';

setCacheNameDetails({ prefix });
self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

addEventListener('message', e => {
  if (e.data && e.data.type === 'v333') skipWaiting();
  if (e.data && e.data.type === 'SKIP_WAITING') skipWaiting();
});

registerRoute(
  /\.(?:js)$/,
  new CacheFirst({
    cacheName: `${prefix}-js`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

registerRoute(
  /\.(?:png|pdf|jpe?g|svg|gif)$/,
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

// setCatchHandler(({ event }) => {
//   if (event.request.destination === 'image' && /\.gif$/.test(event.request.url) && !event.request.url.includes('explosion')) {
//
//
//   }
//   return Response.error();
// });
