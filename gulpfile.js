const path = require("path")
const { resolve } = require('path')
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const minifyCss = require("gulp-clean-css");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const postcss = require("gulp-postcss");
const px2rem = require("postcss-px2rem");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const RevAll = require("gulp-rev-all");
const gulpIf = require("gulp-if");
const del = require("del");
const connect = require("gulp-connect");
const revdel = require("gulp-rev-delete-original");
const browserify = require("gulp-browserify");

const resolvePath = (path) => resolve(process.cwd(), path)
const dist = resolvePath('dist')

const overrideBrowserslist = [
  "Android 4.1",
  "iOS 7.1",
  "Chrome > 31",
  "ff > 31",
  "ie >= 8",
];
const processors = [px2rem({ remUnit: 100 })];

// 静态服务器
gulp.task("server", (done) => {
  connect.server({
    root: dist, //根目录
    livereload: true, //自动更新
    port: 8888, //端口
  });
  done();
});

// 清空dist目录
gulp.task("clean", function () {
  return del([dist]);
});

// 处理html
gulp.task("html", function () {
  return gulp
    .src(resolvePath("src/**/*.html"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist))
    .pipe(connect.reload());
});

// 处理css
gulp.task("css", (done) => {
  return gulp
    .src(resolvePath("src/**/*.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist,
      })
    )
    // .pipe(postcss(processors))
    .pipe(minifyCss())
    .pipe(gulp.dest(dist))
    .pipe(connect.reload());
});

// 处理less
gulp.task("less", (done) => {
  gulp
    .src(resolvePath("src/**/*.less"))
    .pipe(less())
    .pipe(
      autoprefixer({
        overrideBrowserslist,
      })
    )
    // .pipe(postcss(processors))
    .pipe(minifyCss())
    .pipe(gulp.dest(dist))
    .pipe(connect.reload());

  done();
});

// 处理js
gulp.task("js", function () {
  return (
    gulp
      .src(resolvePath("src/**/*.js"))
      .pipe(
        babel({
          presets: ["@babel/env"],
          plugins: ["@babel/transform-runtime"],
        })
      )
      .pipe(browserify())
      .pipe(gulp.dest(dist))
      .pipe(connect.reload())
  );
});

// 处理图片
gulp.task("images", function () {
  return gulp
    .src(resolvePath("src/**/*.+(png|jpg|jpeg|gif|svg)"))
    .pipe(gulp.dest(dist));
});

// 判断图片资源
let isImage = function (file) {
  if (file.history[0].match(/\.jpg|\.jpeg|\.png/i)) {
    return true;
  } else {
    return false;
  }
};

// 生产环境添加hash
gulp.task("hash", (done) => {
  gulp
    .src(resolvePath("dist/**"))
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf(isImage, imagemin()))
    .pipe(
      RevAll.revision({
        dontRenameFile: [/\.html$/],
      })
    )
    .pipe(
      revdel({
        exclude: function (file) {
          if (/\.html$/.test(file.name)) {
            return true;
          }
        },
      })
    )
    .pipe(gulp.dest(dist));

  done();
});

// 监听变化
gulp.task("watcher", (done) => {
  gulp.watch(resolvePath("src/**/*.html"), gulp.series("html"));
  gulp.watch(resolvePath("src/**/*.less"), gulp.series("less"));
  gulp.watch(resolvePath("src/**/*.js"), gulp.series("js"));
  gulp.watch(resolvePath("src/**/*"), gulp.series("images"));
  done();
});

// 公共
gulp.task(
  "common",
  gulp.series("clean", gulp.parallel("html", "css", "less", "js", "images"))
);

// 开发
gulp.task("start", gulp.series("common", "server", "watcher"));

// 打包
gulp.task("build", gulp.series("common", "hash"));
