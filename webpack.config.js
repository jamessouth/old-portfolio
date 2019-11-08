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

const swVol = 'v25';

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  // mode: 'development',
  // devtool: 'inline-source-map',
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
                  'corejs': '3.3.5',
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
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [
      '**/*',
      '!BorderPaint.min.js',
      '!ButtonBG.min.js',
    ] }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      template: './src/html/index.html',
      title: 'James South - Portfolio',
    }),
    new ScriptExtHTMLWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new WorkerPlugin({
      globalObject: false,//not using HMR so disable warning
    }),
    new webpack.HashedModuleIdsPlugin(),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
      importWorkboxFrom: 'disabled',
      precacheManifestFilename: `precache-manifest-${swVol}.[manifestHash].js`,
      exclude: [ //  from precache
        /\.(?:png|pdf|jpe?g|svg|gif)$/,
        /\.map$/,
        /^fallback|linkFactory|edgeStyles|linkLoader|panelFactory|projectLoader/,
        /\.worker\.js$/
      ],
    }),
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'docs'),
    index: 'index.html',
  },
};
