'use strict'
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/main.ts'),
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
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
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    }),
  ],
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx',
      '.wasm',
    ],
  },
};
