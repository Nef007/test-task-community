const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, { mode }) => ({
  entry: "./src/index.js",

  devtool: mode === "development" ? "source-map" : undefined,
  //devtool: "source-map",
  optimization: {
    minimize: true,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    // maxInitialRequests: Infinity,
    // minSize: 0,
    // cacheGroups: {
    //   vendor: {
    //     test: /[\\/]node_modules[\\/]/,
    //     name(module) {
    //       console.log(11111);
    //       console.log(module.context);
    //       // получает имя, то есть node_modules/packageName/not/this/part.js
    //       // или node_modules/packageName
    //       const packageName = module.context.match(
    //         /[\\/]node_modules[\\/](.*?)([\\/]|$)/
    //       )[1];
    //
    //       // имена npm-пакетов можно, не опасаясь проблем, использовать
    //       // в URL, но некоторые серверы не любят символы наподобие @
    //       return `npm.${packageName.replace("@", "")}`;
    //     },
    //   },
    // },
    // },
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].[contenthash].js",
    clean: true,
  },

  devServer: {
    proxy: {
      "/api": "http://localhost:5000",
    },
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) =>
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
        htmlWebpackPlugin.options.title +
        '</title></head><body><div id="root"></div></body></html>',
      filename: "index.html",
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[id].css",
      ignoreOrder: false,
    }),
    // new BundleAnalyzerPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]___[hash:base64:5]",
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /\.module\.css$/,
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "./image/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[hash][ext][query]",
        },
      },
    ],
  },
});
