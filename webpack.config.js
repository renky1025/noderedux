var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval-source-map',
  entry: ['react-hot-loader/patch','./public/src/index'],
  output: {
    path: path.join(__dirname, '/public/dist'),
    filename: 'bundle.js',
    publicPath: '/public/dist'
  },
  resolve: {
    extensions: ['', '.js', '.jsx',".css",".less"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, 'public/src')],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
          test: /\.less$/,
          loader: 'style!css!postcss!less'
      },
      {
          test: /\.css/,
          loader:'style!css!postcss'                
      },
      {
          test: /\.(png|jpg|svg|gif)$/,
          loader: 'url?limit=25000&name=img/[hash:8].[name].[ext]'
      },
      {
          test: /\.json?$/,
          loader: 'json'
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};