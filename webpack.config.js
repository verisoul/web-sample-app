const path = require("path");
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  watch: true,
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
          from: path.resolve(__dirname, 'src/verisoul/auth-sdk'),
          to:  path.resolve(__dirname, 'public/js/auth-sdk'),
        },
      ],
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'node_modules/@verisoul/ui/auth-sdk'),
    //       to:  path.resolve(__dirname, 'public/js/auth-sdk'),
    //     },
    //   ],
    // }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    proxy: {
      "/api": {
        target: "http://localhost:4001",
        router: () => "http://localhost:5001",
        logLevel: "debug",
      },
    },
    historyApiFallback: true,
    port: 4001,
    open: true
  },
};
