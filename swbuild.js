const { copyWorkboxLibraries, injectManifest } = require('workbox-build');

const opts = {
  globDirectory: './docs',
  swSrc: './sw.js',
  swDest: './service-worker.js',
  globPatterns: ['**/*.css', '*.html', '**/*.?(js|mjs)', 'manifest.webmanifest'],
  dontCacheBustURLsMatching: /\.[0-9a-f]{32}\./,
};

copyWorkboxLibraries('')
  .then(s => console.log(`Workbox libraries available in ${s}.`));

injectManifest({...opts})
  .then(({count, size}) => {
    console.log(`SW saved, which will precache ${count} files, totaling ${size} bytes.`);
  });
