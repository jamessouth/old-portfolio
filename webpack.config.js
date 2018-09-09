const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
        use: [
            {
            loader: 'html-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    extractPlugin,
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devServer: {
    port: 3000
  }
};
