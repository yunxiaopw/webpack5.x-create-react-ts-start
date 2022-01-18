const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理原来的打包文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const path = require("path");
const { baseConfig } = require("./webpack.base.conf");

const PATHS = {
  src: path.join(__dirname, "../src")
};

module.exports = merge(baseConfig, {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CssMinimizerWebpackPlugin(),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    })
  ]
});
