'use strict'
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bootstrap.js',
  },
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin({
      patterns: ['index.html'],
    }),
  ],
};
