const path = require('path');

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
    contentBase: './src/client',
    hot: true, // hot module replacement.
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
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  
}