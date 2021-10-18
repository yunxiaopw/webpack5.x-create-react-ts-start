const { merge } = require("webpack-merge");
const { baseConfig, resolvePath } = require("./webpack.base.conf");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"); // 错误提示

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  stats: "errors-only",
  optimization: {
    runtimeChunk: true,
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    hot: true,
    open: true,
  },
  cache: {
    type: "memory",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
          {
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2,
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      // 成功的时候输出
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:9000`],
      },
      // 是否每次都清空控制台
      clearConsole: true,
    }),
  ],
});
