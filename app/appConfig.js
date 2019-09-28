var path = require('path');
var fs = require('fs');

//路径相对于_devConfig文件夹目录计算
var relativePath = 'app/web';
var hashFile = path.resolve(__dirname, '../app/web/hash.py');
//开发目录
var appDir = path.resolve(__dirname, '../' + relativePath);
var htmlDir = path.resolve(__dirname, '../frontend');
var assetsRoot = path.resolve(__dirname, './static/dist');

console.log(hashFile, appDir, assetsRoot)

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

module.exports = {
  mode: 'development',
  //mode: 'production',
  appDir: appDir,
  htmlDir: htmlDir,
  hashFile: hashFile,
  assetsRoot: assetsRoot,
  generateVendor: false,
  generateManifest: false,
  compressJsCss: false,
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
  },
  pages:[
  ],
  buildEnd: function(){
    //复制新生成文件到目标文件夹
    travel(assetsRoot, function(file){
      fs.chmodSync(file, '777');
    })
  }
}