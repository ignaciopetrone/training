const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TypeCheckerPlugin = require('fork-ts-checker-webpack-plugin');

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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),
    new TypeCheckerPlugin({
      eslint: { files: 'src/**/*.{ts,tsx}', enabled: true },
      formatter: 'codeframe',
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
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
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  
}