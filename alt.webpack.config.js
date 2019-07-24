const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ScriptExtHTMLWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

const swVol = 'v5';

module.exports = {
  mode: 'development', // production
  devtool: 'inline-source-map', //
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].farrrrt.js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-dynamic-import'],
            presets: [
              [
                '@babel/preset-env',
                {
                  'useBuiltIns': 'usage',
                  'corejs': '3.1.3',
                },
              ],
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(pdf|png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: 'images/',
              name(file) {
                return /((4|7|9|10|11|explosion)\.(gif|jpg))$/.test(file) ? '[name].[hash].[ext]' : '[hash].[ext]';
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        main_css: {
          test: m => m.identifier().includes('main.scss'),
          name: 'main_css',
          chunks: 'all',
          enforce: true,
        },
        fallback_css: {
          test: m => m.identifier().includes('fallback.scss'),
          name: 'fallback_css',
          chunks: 'all',
          enforce: true,
        },
      },
      chunks: 'all',

    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*', '!burst.min.js', '!service-worker.js', '!BorderPaint.js'] }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      template: './src/html/index.html',
      title: 'James South - Portfolio',
      excludeChunks: ['fallback_css.farrrrt.js'],
    }),
    new ScriptExtHTMLWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new WorkerPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    // new InjectManifest({
    //   swSrc: './src/sw.js',
    //   swDest: 'service-worker.js',
    //   importWorkboxFrom: 'disabled',
    //   precacheManifestFilename: `precache-manifest-${swVol}.[manifestHash].js`,
    //   exclude: [/\.(?:png|jpg|jpeg|svg|gif)$/, /\.map$/, /(animPaint|contact|destroyOpt|gifOpt|sizeOpt|useCubes|anim_polyfill)/],
    // }),
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'docs'),
    index: 'index.html',
  },
};
