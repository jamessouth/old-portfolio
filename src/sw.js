/* eslint-disable no-undef, no-restricted-globals, no-underscore-dangle */
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute.mjs';
import { registerRoute } from 'workbox-routing/registerRoute.mjs';
import { CacheFirst } from 'workbox-strategies/CacheFirst.mjs';
import { Plugin } as ExpirationPlugin from 'workbox-expiration/Plugin.mjs';








// version = 'v2';

const prefix = 'james south portfolio';
// const FALLBACK_IMAGE_URL = '/Vue-Project-9/img/face.69232788.jpg';


workbox.core.setCacheNameDetails({ prefix });
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.precaching.cleanupOutdatedCaches();
self.addEventListener('message', (e) => {
  if (!e.data) return;
  if (e.data === 'skipWaiting') self.skipWaiting();
});


workbox.routing.registerRoute(
  /\.(?:js)$/,
  new workbox.strategies.CacheFirst({
    cacheName: `${prefix}-lazy-js`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);


workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: `${prefix}-images`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 180,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
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

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
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

workbox.routing.setDefaultHandler(workbox.strategies.staleWhileRevalidate({
  cacheName: `${prefix}-default-handler`,
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 365,
      purgeOnQuotaError: true,
    }),
  ],
}));
workbox.routing.setCatchHandler(({ event }) => {
  if (event.request.destination === 'image' && /^https:\/\/randomuser\.me\/api\/portraits/.test(event.request.url)) {
    // return caches.match(FALLBACK_IMAGE_URL);
  }
  return Response.error();
});
