"use strict";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: "0.0.0.0",
    open: true,
  },
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "src/main.tsx"),
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new ESLintWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.ejs"),
      title: "WASM CHIP-8 written in Rust",
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx", ".wasm"],
  },
};
