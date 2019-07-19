const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const pugIncludeGlob = require('pug-include-glob');

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
  watchOptions: {
    ignored: '/node_modules/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              data: '@import "./source/autoload.scss";',
              includePaths:[__dirname, './source']
            }
          }
        ]
      },{
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          plugins:[pugIncludeGlob()]
        }
      },
    ],
  },
};