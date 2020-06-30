const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, `src`, `client`, 'index.tsx'),
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    historyApiFallback: true
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