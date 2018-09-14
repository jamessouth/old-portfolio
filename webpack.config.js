const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      },
      // {
      //   test: /\.scss$/,
      //   use: extractPlugin.extract({
      //     use: ['css-loader', 'sass-loader']
      //   })
      // },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: '/dist'
          //   }
          // },
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
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HTMLWebpackPlugin({
      template: './src/html/index.html'
    }),
  ],
  devServer: {
    port: 3000
  }
};
