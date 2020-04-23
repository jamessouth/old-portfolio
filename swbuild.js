const fs = require('fs').promises;
const path = require('path');
const { copyWorkboxLibraries, injectManifest } = require('workbox-build');

const opts = {
  globDirectory: './docs',
  swSrc: './sw.js',
  swDest: './docs/service-worker.js',
  globIgnores: ['**/workbox*/*'],
  globPatterns: ['**/*.css', '*.html', '**/*.?(js|mjs)', 'manifest.webmanifest'],
  dontCacheBustURLsMatching: /\.[0-9a-f]{32}\./,
};

const pkgs = [
  'workbox-core',
  'workbox-expiration',
  'workbox-precaching',
  'workbox-routing',
  'workbox-strategies',
  'workbox-sw',
];

copyWorkboxLibraries('./docs')
  .then(s => {
    console.log(`Workbox libraries available in ${s}.`);
    return s;
  })
  .then(async d => {
    const dir = await fs.opendir(path.resolve('./docs/' + d));
    for await (const dirent of dir) {
      if (!pkgs.some(pk => /(dev|map)/.test(dirent.name) || dirent.name.includes(pk))) {
        fs.unlink(path.resolve('./docs/' + d + '/' + dirent.name));
      }
    }
  });

injectManifest({...opts})
  .then(({count, size}) => {
    console.log(`SW saved, which will precache ${count} files, totaling ${size} bytes.`);
  });
