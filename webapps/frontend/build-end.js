'use strict';

const path = require('path');
const fs = require('fs');
const endWith = require('lodash/endsWith');
const startsWith = require('lodash/startsWith');

const isWindows = process.platform === 'win32';

const appDir = path.resolve(__dirname, '.');
const distDir = path.resolve(__dirname, '../../app/static/dist');
const templateJs = path.resolve(__dirname, '../../app/templates/layouts/js.html');
const templateCss = path.resolve(__dirname, '../../app/templates/layouts/css.html');
const srcCss = path.resolve(appDir, 'build/css')
const distCss = path.resolve(distDir, 'css');
const srcJs = path.resolve(appDir, 'build/js')
const distJs = path.resolve(distDir, 'js');
const srcImg = path.resolve(appDir, 'build/static/dist/media')
const distImg = path.resolve(distDir, 'media');
//console.log('=====================\n', appDir, distDir);
let hash = {
    css: {},
    js: {}
};

function isCss(fileName){
    return endWith(fileName, '.css');
}
function isJs(fileName){
    return endWith(fileName, '.js');
}

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    let pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

function handleDirectory(src, dist, type=''){
    let cssArr = [];
    let jsRunntime = '';
    let jsMain = '';
    let jsArr = [];
    // //删除历史文件
    travel(dist, function(file){
      fs.unlinkSync(file)
    });
    //复制新生成文件到目标文件夹
    travel(src, function(file){
        if(!endWith(file, '.map')){
            const fileArr = path.parse(file);
            // main.dfca195d.chunk.css
            let fileName = fileArr.base;
            let distFile = path.resolve(dist, fileName);
            let fileUri = 'dist/' + fileName;
            // main.dfca195d.chunk
            let fileRealName = fileArr.name;
            let fileContent =  fs.readFileSync(file);
            fs.writeFileSync(distFile,fileContent);
            fs.chmodSync(distFile, '777');

            //generate hash
            let key = fileRealName.split('.').shift();
            if(type === 'css'){
                fileUri = 'dist/css/' + fileName;
                hash.css[key] = fileUri;
                cssArr.push(`<link href="{{ url_for('static', filename='`+ fileUri +`') }}" rel="stylesheet">`);
            }
            if(type === 'js'){
                fileUri = 'dist/js/' + fileName;
                hash.js[key] = fileUri;
                if(key === 'main'){
                    jsMain = `<script src="{{ url_for('static', filename='`+ fileUri +`') }}"></script>`;
                }else if(key === 'runtime-main'){
                    jsRunntime = `<script>`+ fileContent +`</script>`;
                }else{
                    jsArr.push(`<script src="{{ url_for('static', filename='`+ fileUri +`') }}"></script>`);
                }
            }
        }
    })
    // write hash
    if(type === 'css'){
        fs.writeFileSync(templateCss, cssArr.join('\n'));
    }
    if(type === 'js'){
        let allJsContent = jsRunntime + '\n' + jsArr.join('\n') + '\n'+ jsMain;
        fs.writeFileSync(templateJs, allJsContent);
    }
}

function main(){
    console.log('=========moving files');
    //css
    if(fs.existsSync(srcCss)){
        handleDirectory(srcCss, distCss, 'css');
        console.log('css')
    }
    //js
    if(fs.existsSync(srcJs)){
        handleDirectory(srcJs, distJs, 'js');
        console.log('js')
    }
    if(fs.existsSync(srcImg)){
        handleDirectory(srcImg, distImg, 'image');
        console.log('img')
    }
    console.log('=========Files copy completed')
}
main();