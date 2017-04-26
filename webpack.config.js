let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    inline: true
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['env', { modules: false }], 'stage-0'],
          plugins: [
            ['transform-react-jsx', { pragma: 'h' }],
            ['transform-runtime']
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      { test: /\.png$/, use: 'url-loader?limit=100000' },
      { test: /\.jpg$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Try PUG ( Previously known as JADE ) to HTML Online',
      template: 'index.ejs',
      hash: true
    }),
    new FaviconsWebpackPlugin('./pug.png'),
    new ExtractTextPlugin('main.css')
  ]
};
