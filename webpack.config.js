const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ScriptExtHTMLWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const swVol = 'v7';

module.exports = {
  mode: 'production', // development
  devtool: 'source-map', // inline-
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
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
                  'modules': false,
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
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: 'images/',
              name(file) {
                return /((7|9|10|11|explosion)\.(gif|jpg))$/.test(file) ? '[name].[hash].[ext]' : '[hash].[ext]';
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
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['docs'], { exclude: ['burst.min.js', 'worker.min.js'] }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HTMLWebpackPlugin({
      template: './src/html/index.html',
      title: 'James South - Portfolio',
    }),
    new ScriptExtHTMLWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
      importWorkboxFrom: 'disabled',
      precacheManifestFilename: `precache-manifest-${swVol}.[manifestHash].js`,
      exclude: [/\.(?:png|jpg|jpeg|svg|gif)$/, /\.map$/, /(animPaint|contact|destroyOpt|gifOpt|sizeOpt|useCubes|anim_polyfill)/],
    }),
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'docs'),
    index: 'index.html',
  },
};
