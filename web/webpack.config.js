'use strict'
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bootstrap.js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'static',
      }],
    }),
    new WriteFilePlugin(),
  ],
};
