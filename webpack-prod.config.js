const webpackDev = require('./webpack.config');

module.exports = () => {
  const generalSettings = webpackDev;
  const currentSettings = {
    mode: 'production',
  };
  
  return Object.assign({}, generalSettings, currentSettings);
};