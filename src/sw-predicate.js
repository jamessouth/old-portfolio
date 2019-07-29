
import { setCacheNameDetails } from 'workbox-core/setCacheNameDetails.mjs';
import { Plugin as ExpirationPlugin } from 'workbox-expiration/Plugin.mjs';
import { cleanupOutdatedCaches } from 'workbox-precaching/cleanupOutdatedCaches.mjs';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute.mjs';
import { registerRoute } from 'workbox-routing/registerRoute.mjs';
import { setCatchHandler } from 'workbox-routing/setCatchHandler.mjs';
import { setDefaultHandler } from 'workbox-routing/setDefaultHandler.mjs';
import { CacheFirst } from 'workbox-strategies/CacheFirst.mjs';
import { StaleWhileRevalidate } from 'workbox-strategies/StaleWhileRevalidate.mjs';

const prefix = 'james south portfolio';



setCacheNameDetails({ prefix });
self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__precacheManifest, {});
cleanupOutdatedCaches();

addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') skipWaiting();
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
  /\.(?:png|jpg|pdf|jpeg|svg|gif)$/,
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
