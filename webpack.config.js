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
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
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
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
