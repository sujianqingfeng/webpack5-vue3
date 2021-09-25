import path from "path";
import { CleanPlugin, Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";

const pathResolve = (name: string) => path.resolve(__dirname, name);

const config: Configuration = {
  mode: "development",
  entry: pathResolve("src/main.ts"),
  output: { path: pathResolve("dist"), filename: "[name].bundle.js" },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
    new CleanPlugin(),
    new HtmlPlugin({
      template: pathResolve("public/index.html"),
    }),
  ],
  devServer: {
    port: 9000,
    open: true,
    hot: true,
    static: {
      directory: pathResolve("dist"),
    },
  },
};

export default config;
