'use strict'
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/bootstrap.js'),
  mode: process.env.NODE_ENV || "development",
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      title: 'WASM CHIP-8 written in Rust',
    }),
  ],
};
