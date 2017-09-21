process.env.production = process.argv[2].slice(4);
require('shelljs/global');
const path = require("path");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
delete webpackConfig.devServer;
const compiler = webpack(webpackConfig);

compiler.run(() => {
  rm('-rf', path.join(__dirname, './build/*'));
  cp('-rf', path.join(__dirname, './dist/*'), './build/');
  cp('-rf', path.join(__dirname, './assets'), './build/');
  cp('-rf', path.join(__dirname, './assets/images/favicon.ico'), './build/');
})
