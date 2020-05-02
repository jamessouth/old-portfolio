importScripts('./workbox-v5.1.3/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: './workbox-v5.1.3/'
});

const pref = 'portfolio';

workbox.core.setCacheNameDetails({
  prefix: pref,
  suffix: '',
  precache: 'precache',
  runtime: pref + '-rt',
  googleAnalytics: 'ga'
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.precaching.cleanupOutdatedCaches();

addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

workbox.routing.registerRoute(
  /\.(?:js)$/,
  new workbox.strategies.CacheFirst({
    cacheName: `${pref}-js`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/(www\.)?(codewars|projecteuler)/,
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  /\.(?:png|pdf|jpe?g|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: `${pref}-images`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 180,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `${pref}-google-fonts-css`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 3,
        maxAgeSeconds: 60 * 60 * 24 * 30,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: `${pref}-google-fonts`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 3,
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `${pref}-default`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
