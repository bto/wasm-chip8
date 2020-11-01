"use strict";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "..", "src"),
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
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
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new ESLintWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "src/index.ejs"),
      title: "WASM CHIP-8 written in Rust",
    }),
  ],
  resolve: {
    extensions: [".wasm", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};
