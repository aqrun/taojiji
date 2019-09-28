var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var appDir = config.appDir

var defaultPlgins = [
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': env
  }),
  // extract css into its own file
  new ExtractTextPlugin(utils.assetsPath(config.cssDir + '[name].[hash].css')),
];

if(config.compressJsCss){
  defaultPlgins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
}

// page entry
if(typeof config.pages != undefined){
  for(var i=0, j=config.pages.length; i<j; i++){
    var item = config.pages[i];
    var htmlentry = new HtmlWebpackPlugin({
      tplImagePath:config.tplImagePath.prod,
      tplHtmlPath: config.tplHtmlPath.prod,
      dataUrl: config.serverAPI.data.prodUrl,

      filename: item.filename,
      template: item.template,
      inject: true,
      minify: {
        removeComments: config.htmlRemoveComments,
        collapseWhitespace: config.htmlCollapseWhitespace,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'auto'
    });
    defaultPlgins.push(htmlentry);
  }
}



if(config.generateVendor){
  defaultPlgins.push(
    //split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../../node_modules')
          ) === 0
        )
      }
    })
  )
}
if(config.generateManifest){
  defaultPlgins.push(
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  )
}

var webpackConfig = merge(baseWebpackConfig, {
  // module: {
  //   loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  // },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(config.jsDir + '[name].[hash].js'),
    chunkFilename: utils.assetsPath(config.jsDir + '[id].[hash].js')
  },
  plugins: defaultPlgins
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
