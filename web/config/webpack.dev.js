"use strict";
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const path = require("path");
const common = require("./webpack.common.js");

const topDir = path.resolve(__dirname, "..", "..");
const distDir = path.resolve(topDir, "web", "dist");

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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(topDir, "roms"),
          to: path.resolve(distDir, "roms"),
        },
      ],
    }),
    new WriteFilePlugin(),
  ],
});
