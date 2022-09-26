# gulp-admin

基于 gulp 的简单页面打包工具

支持 html 压缩，css 压缩，自动加前缀，less 转化，js 转化以及垫片处理，图片资源的压缩

## 1 使用方式

## 1.1 局部安装使用

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

4. 执行 npm run start 启动服务进行开发， 执行 npm run build 打包编译，最终产物在 dist 文件夹下面

## 1.2 全局安装使用

全局安装模式目前暂不可用，这种模式也是我写这个包的初衷，但是目前遇到 gulp-babel 全局使用报错，正在想办法解决中。。。

```
npm install gulp-admin -g
```

cd 到目标文件夹执行（目标文件夹下面必须要有 src 文件夹，业务代码都放 src 文件夹）

```js
gulp-admin start // 启动服务开发
gulp-admin build // 打包编译

```
