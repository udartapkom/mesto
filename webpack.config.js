const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 
          {loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ],
      },
     
      {
        test: /\.(png|jpe?g|gif|woff|woff2|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
         {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin()
  ]
};
