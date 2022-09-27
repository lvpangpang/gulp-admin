# gulp-admin

基于 gulp 的简单页面打包工具  
支持 html 压缩，css 压缩加前缀，less 转化，js 转化以及垫片处理，图片资源的压缩，所有資源打包加 hash

注意事项：
**需要编译的css，js必须放在对应的文件里面。不能直接写在html里面，否则不会被处理**
## 使用方式

1. 新建 test 文件夹，在 test 下面新建 src 文件夹，所有业务代码都在 src 文件夹下面
2. 在 test 文件下安装 gulp-admin

```js
yarn add gulp-admin -D
```

3. 在 test 文件夹下新建 package.json 中加入执行命令

   ```js
   {
   "scripts": {
    "start": "gulp-admin start",
    "build": "gulp-admin build"
    },
    "devDependencies": {
      "gulp-admin": "^1.0.14"
    }
   }
   ```

4. 执行 npm run start 启动服务进行开发， 执行 npm run build 打包编译，最终产物在 dist 文件夹下
