const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './source/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    static: "./build",
    port: 3000,
    open: true,
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'js-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader",
            ],
          },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/html/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
        template: './source/html/login.html',
        filename: 'login.html',
        inject: 'body',
      }),
      new HtmlWebpackPlugin({
        template: './source/html/reg.html',
        filename: 'reg.html',
        inject: 'body',
      }),
  ],
};