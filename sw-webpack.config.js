const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const TerserWebpackPlugin = require('terser-webpack-plugin');




module.exports = {
  mode: 'production', // development
  devtool: 'source-map', // inline-
  entry: {
    main: './src/sw-predicate.js',
  },
  output: {
    filename: 'sw.js',
    // chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'src'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // include: [
        //   path.resolve(__dirname, 'src/js'),
        // ],
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     plugins: ['@babel/plugin-syntax-dynamic-import'],
        //     presets: [
        //       [
        //         '@babel/preset-env',
        //         {
        //           'useBuiltIns': 'usage',
        //           'modules': false,
        //         },
        //       ],
        //     ],
        //     cacheDirectory: true,
        //   },
        // },
      },



    ],
  },
  optimization: {
    // minimize: false,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: true,
      }),
    ],
    // runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin(['src/sw.js', 'src/sw.js.map']),

  ],

};
