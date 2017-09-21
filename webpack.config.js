require('shelljs/global');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const production = process.env.production === 'true' ? true : false;
const extractCss = {
  fallback: 'style-loader',
  use: [{loader: 'css-loader',
    options: {
      minimize: production,
    }
  }],
}
const extractLess = {
  fallback: 'style-loader',
  use: [{loader: 'css-loader',
    options: {
      minimize: production,
    }
  }, 'less-loader', {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('autoprefixer')(),
      ]
    }
  }],
};

const pages = ls('./src/');
const entry = {};
const plugins = [];
pages.map(item => {
  if (item == 'common') {
    entry[item] = [`./src/${item}/${item}.less`];
  } else {
    entry[item] = [`./src/${item}/${item}.js`, `./src/${item}/${item}.less`];
  }
})
if (production) {
  plugins.push(
    new CleanWebpackPlugin(path.join(__dirname, 'dist/')),
    new UglifyjsWebpackPlugin(),
  );
}

module.exports = {
  entry,
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist/'),
    filename: '[name]/[name].js',
  },
  resolve: {
    extensions: ['.js', '.css', '.less', '.json'],
    modules: ['node_modules'],
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract(extractCss),
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract(extractLess),
    }, {
      test: /\.ejs$/,
      loader: 'ejs-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }, ],
    }, {
      test: /\.(png|jpg|gif|jpeg)$/,
      loader: 'file-loader',
    }, {
      test: /\.(otf|woff|woff2)$/,
      loader: 'file-loader',
    }, ],
  },
  plugins: [
    ...plugins,
    ...pages.filter(page => {
      if (page !== 'common') {
        return true;
      }
    }).map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/${page}/${page}.ejs`,
        filename: `${page}.html`,
        chunks: [page],
      })
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['/at.alicdn.com/t/font_418040_t58rbuyglftakyb9.css', 'common/common.css'],
      append: false,
    }),
    new ExtractTextPlugin({
      filename: '[name]/[name].css',
    }),
  ],
  devServer: {
    contentBase: './'
  },
};
