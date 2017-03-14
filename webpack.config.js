let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    inline: true
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [['env', {"modules": false}], 'stage-0'],
          plugins: [
            ['transform-react-jsx', {"pragma": "h"}],
            ["transform-runtime"]
          ]
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Simple PUG ( Previously known as JADE ) REPL',
    hash: true
  })]
}