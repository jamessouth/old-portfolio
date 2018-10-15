const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const ScriptExtHTMLWebpackPlugin = require('script-ext-html-webpack-plugin');



// main 68.5 33.4 31.3 ''   30.6
// cont 4.35 ''     '' 3.5  4.52
// poly 8.56 ''     '' 0    8.63
// html 7.63 7.71 7.79 7.78 7.79
// vend ''   35.5   '' 44.8 37.1
// runt ''   ''   2.24 2.19 2.33
// cube ''   ''   ''   ''   1.49
// tot  89   89.5 89.7 89.6 92.46

// no preload, img in html, full throttling
// 7.35,20
// 7.44,17
// 7.33,17
// 7.33,20

// no preload, NO img in html, full throttling
// 6.26,19.6
// 6.24,19.6
// 6.26,18.64
// 6.28,18.68









module.exports = {
  // mode: 'development',
  // devtool: 'inline-source-map',
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
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
                }
              ]
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
      })
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { exclude: ['images', 'burst.min.js', 'worker.js'] }),
    new LodashWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HTMLWebpackPlugin({
      template: './src/html/index.html',
      title: 'Portfolio',
    }),
    new ScriptExtHTMLWebpackPlugin({
      // defaultAttribute: 'async',
      // preload: {
      //   test: /\.js$/,
      //   chunks: 'async',
      // },
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  devServer: {
    port: 3000
  }
};
