const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 模板
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"); // ts类型检查
const svgToMiniDataURI = require("mini-svg-data-uri");
const ESLintPlugin = require("eslint-webpack-plugin");
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath); // 根据相对路径获取绝对路径
const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 代码打包分离

const baseConfig = {
  entry: resolvePath("../src/index.tsx"),
  output: {
    path: resolvePath("../dist"),
    filename: devMode ? "js/[name].bundle.js" : "js/[name].[contenthash].bundle.js",
    assetModuleFilename: "images/[hash][ext][query]"
  },
  cache: {
    type: "filesystem" // 使用文件缓存
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      assets: path.resolve(__dirname, "src/assets"),
      api: path.resolve(__dirname, "src/api"),
      components: path.resolve(__dirname, "src/components"),
      common: path.resolve(__dirname, "src/common")
    },
    mainFields: ["main"],
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/inline"
      },
      {
        test: /\.svg/,
        type: "asset/inline",
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack5.x-create-react-ts-start",
      template: resolvePath("../public/index.html"),
      filename: "index.html",
      favicon: resolvePath("../public/favicon.ico")
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "css/[name].css" : "css/[name]-[contenthash].css",
      chunkFilename: devMode ? "css/[id].css" : "css/[id].[contenthash].css"
    })
  ]
};

module.exports = {
  resolvePath: resolvePath,
  baseConfig: baseConfig
};
