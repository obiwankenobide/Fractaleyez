const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.join( __dirname, 'public' );
const APP_DIR = path.join( __dirname, 'src' );

//prepends all instances of $ with var $ = require('jquery')
const jQuery = new webpack.ProvidePlugin({
     $: 'jquery',
     jQuery: 'jquery'
 })

module.exports = {
  //with webpack 4 entry and output configuration is optional
  entry: APP_DIR + '/main.js',
  output:
  {
    path: BUILD_DIR,
    filename: 'app.js',
    publicPath: '/'
  },
  //must include modules for webpack to integrate with babel for es6 syntax
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader?name=[name].[ext]'
        }]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'url-loader?limit=100000'
        }]
      }
    ]
  },
  //resolves directory to look for modules
  resolve: {
    modules: ['node_modules']
  },
  //manages plugins specified above configuration
  plugins: [jQuery]
};
