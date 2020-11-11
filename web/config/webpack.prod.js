"use strict";
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const CopyPlugin = require("copy-webpack-plugin");

const topDir = path.resolve(__dirname, "..", "..");
const distDir = path.resolve(topDir, "docs");

module.exports = merge(common, {
  devtool: "source-map",
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
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
  ],
});
