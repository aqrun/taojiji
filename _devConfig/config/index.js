// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var merge = require('webpack-merge');
var configPathes = require('../configPathes');

var configFile = '../appConfig';
if(typeof process.argv[2] != 'undefined'){
  if(typeof configPathes[process.argv[2]]=='undefined'){
    throw "Module name : > " + process.argv[2] + ' < not exist in configPathes!';
  }
  configFile = configPathes[process.argv[2]];
}

var appConfig = require(configFile);

var appDir = appConfig.appDir;

var defaultConfig = {
  build: {
    env: require('./prod.env'),
    index: 'index.html',
    assetsRoot: appConfig.assetsRoot,
    assetsSubDirectory: '',
    //插入模板 资源路径
    assetsPublicPath: appConfig.injectAssetsPublicPath,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: '',
    assetsPublicPath: appConfig.injectAssetsPublicPath,
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  }
}

module.exports = merge(defaultConfig, appConfig)
