var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../../')
const configPathes = require('../configPathes')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var appDir = config.appDir;

module.exports = {
  mode: config.mode,
  entry: {
    app: appDir + '/src/app.ts',
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js'
  },
  resolve:{
    modules: ['node_modules', configPathes.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      //process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.ts','.tsx','.js', '.jsx', '.scss', '.css'],
    alias: {
      'app' : appDir + '/src'
    }
  },
  resolveLoader: {
    //fallback: [path.join(__dirname, '../../node_modules')]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'antd': 'antd'
  },
  module: {
    rules: [
        { test: /\.hbs$/, loader: require.resolve('handlebars-loader'), },
      {
        test: /\.json$/,
        loader: require.resolve('json-loader'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(css|scss)$/,
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: [
            {loader: 'css-loader', options: {minimize: true, sourceMap:true,
              modules: true, importLoaders: 1,
              localIdentName: '[local]'
            }},
//            { loader: 'resolve-url-loader', options:{minimize:false,sourceMap:false}},
            { loader: 'sass-loader', options: {minimize:false, sourceMap:false}},
            { loader: 'postcss-loader',  options: {minimize:false, sourceMap:false}},
            ]
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: require.resolve('babel-loader') },
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  }
}
