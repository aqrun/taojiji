
前端开发资源打包配置
---

### 操作步骤

* 复制 .eslintrc.js  package.json到父目录
* 复制 _devConfig/appConfig.js.bak  到 _devConfig/appConfig.js 并根据项目需求修改相关配置
* 运行 

```
    npm install
```

* 修改 _devConfig/appConfig.js 配置文件的开发目录参数

### 运行开发服务器
    
    npm run dev
    
### 打包发布

    npm run build
    12