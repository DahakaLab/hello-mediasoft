const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    autoload: './source/autoload.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin([{
      from: './source/server/',
    },{
      from: './source/pages/',
    }]),
  ],
  watch: true,
  watchOptions: {
    ignored: '/node_modules/',
  }
};