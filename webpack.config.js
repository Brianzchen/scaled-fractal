const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    filename: '[contenthash].index.js',
    chunkFilename: '[contenthash].[name].chunk.js',
    publicPath: '/dist/',
  },
  resolve: {
    alias: {
      aphrodite: 'aphrodite/no-important',
    },
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public/index.html'),
      template: path.resolve(__dirname, 'public/index.min.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve('./src'),
          path.resolve('./packages'),
          path.resolve('./modules'),
        ],
      },
    ],
  },
};
