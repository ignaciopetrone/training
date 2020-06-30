const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, `src`, `client`, 'index.tsx'),
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  performance: {
    hints: false,
  },
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
    hot: true, // hot module replacement.
    historyApiFallback: true // true for index.html upon 404, object for multiple paths
  },
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
  }
}