const webpackDev = require('./webpack.config');

module.exports = () => {
  const generalSettings = webpackDev;
  const currentSettings = {
    mode: 'development',
    watch: true,
    watchOptions: {
      ignored: '/node_modules/',
    },
  };

  return Object.assign({}, generalSettings, currentSettings);
};