const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, `src`, `client`, 'index.tsx'),
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: true,
    assets: false,
    modules: false,
    warnings: true,
  },
  devServer: {
    contentBase: './dist',
    hot: true, // hot module replacement.
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.tsx?/,
      exclude: /node_modules/,
      use: [{
        loader: "ts-loader"
      }]
    },
    {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader",
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  
}