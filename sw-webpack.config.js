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
    path: path.resolve(__dirname, 'src'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin(['src/sw.js', 'src/sw.js.map']),
  ],
};
