const path = require("path");
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": "defaults"
                }],
                '@babel/preset-react'
              ]
            }
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `src/auth-sdk`,
          to:  path.resolve(__dirname, 'public/js/auth-sdk'),
        },
      ],
    })
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     router: () => "http://localhost:5000",
    //     logLevel: "debug" /*optional*/,
    //   },
    // },
  },
};
