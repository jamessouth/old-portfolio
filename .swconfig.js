module.exports = {
    swSrc: './service-worker.js',
    exclude: [//from precache
      /\.(?:png|pdf|jpe?g|svg|gif)$/,
      /\.map$/,
      /linkFactory|panelFactory/,
      /\.worker\.js$/
    ],
  };