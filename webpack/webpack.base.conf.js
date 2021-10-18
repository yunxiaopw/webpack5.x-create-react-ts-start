const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 模板
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"); // ts类型检查
const svgToMiniDataURI = require("mini-svg-data-uri");
const ESLintPlugin = require("eslint-webpack-plugin");
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath); // 根据相对路径获取绝对路径

const devMode = process.env.NODE_ENV !== "production";

const baseConfig = {
  entry: resolvePath("../src/index.tsx"),
  output: {
    path: resolvePath("../dist"),
    filename: devMode ? "js/[name].bundle.js" : "js/[name].[fullhash].bundle.js",
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
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
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
    })
  ]
};

module.exports = {
  resolvePath: resolvePath,
  baseConfig: baseConfig
};
