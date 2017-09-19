require('shelljs/global');
const path = require("path");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
compiler.run(() => {
  cp('-rf', path.join(__dirname, './dist/*'), './publish/');
  cp('-rf', path.join(__dirname, './assets'), './publish/');
})
