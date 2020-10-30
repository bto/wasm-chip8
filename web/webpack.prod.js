const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "source-map",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "..", "docs"),
  },
});
