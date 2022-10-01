const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js'
      
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new MiniCssExtractPlugin(),
      new WorkboxPlugin.GenerateSW(),
      new WebpackPwaManifest({
        name: 'Text Editor Application',
        short_name: 'Text Editor',
        description: 'Take notes!',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024',
            destination: path.join('assets', 'icons'),
            purpose: 'maskable'
          }
        ],
      })
    ],

    module: {
      rules: [
        {
          //rule allows us to handle images
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
  };
};
