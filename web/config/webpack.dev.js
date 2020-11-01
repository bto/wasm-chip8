"use strict";
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

const distDir = path.resolve(__dirname, "..", "dist");

module.exports = merge(common, {
  devServer: {
    contentBase: distDir,
    host: "0.0.0.0",
    open: true,
  },
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "[name].js",
    path: distDir,
  },
});
