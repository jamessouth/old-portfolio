const { injectManifest } = require('workbox-build');

const opts = {
  globDirectory: './docs',
  swSrc: './sw.js',
  swDest: './service-worker.js',
  globPatterns: [],
  dontCacheBustURLsMatching: /\.[0-9a-f]{32}\./,
};




injectManifest(...opts).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
