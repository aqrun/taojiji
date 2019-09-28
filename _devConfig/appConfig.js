var path = require('path')

var relativePath = 'html/2016/7/message_react';
//开发目录
var appDir = path.resolve(__dirname, '../' + relativePath);
var htmlDir = path.resolve(__dirname, '../html');

module.exports = {
  appDir: appDir,
  htmlDir: htmlDir,
  generateVendor: false,
  generateManifest: false,
  //静态资源地址  要以 / 结尾
  cssDir:'',
  jsDir:'',

  //模板处理参数
  htmlRemoveComments: false,
  htmlCollapseWhitespace: false,
  //静态资源路径
  injectAssetsPublicPath:'',
  //静态资源目录 url可为空
  staticAssetsPath:{
    html:{url:'/html', dir:htmlDir},
    images:{url:'/images', dir: appDir + '/images'}
  },
  //模板图片路径替换
  tplImagePath:{
    dev:'/images',
    prod:'../images'
  },
  //模板html文件夹路径
  tplHtmlPath:{
    dev:'/html',
    prod:'../../../..'
  },
  //测试数据接口
  serverAPI:{
    //第一个接口
    data:{
      method:'post',
      //nodeJS要访问的PHP接口 hostname
      hostname: 'localhost',
      //测试服务器express绑定地址
      devUrl:'/getData',
      //nodeJS要访问的PHP接口地址
      devRequestUrl:'/pailifan_wx/'+ relativePath +'/data.php',
      //打包发布后访问的接口路径
      prodUrl:'../data.php'
    }
  }
}