import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, setDefaultHandler } from 'workbox-routing';
import { setCacheNameDetails, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';

const pref = 'portfolio';

setCacheNameDetails({
  prefix: pref,
  suffix: '',
  precache: pref + '-precache',
  runtime: '',
  googleAnalytics: 'gan'
});

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

registerRoute(
  /\.(?:js)$/,
  new CacheFirst({
    cacheName: `${pref}-js`,
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
    cacheName: `${pref}-images`,
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
    cacheName: `${pref}-google-fonts-css`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 3,
        maxAgeSeconds: 60 * 60 * 24 * 30,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: `${pref}-google-fonts`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 3,
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

setDefaultHandler(
  new StaleWhileRevalidate({
    cacheName: `${pref}-default`,
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
