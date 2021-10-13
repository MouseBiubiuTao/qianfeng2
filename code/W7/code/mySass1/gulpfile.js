const gulp = require('gulp');
// 引入gulp-sass并指定sass编译器（sass或node-sass）
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const filePath = {
    sass:'./src/scss/*.scss',
    js:'./src/js/*.js',
    html:'./src/html/*.html',
}
exports.compileSass = function (done) {
    //  获取要转换的文件
    gulp.src(filePath.sass)
        //  编译 sass -> css
        .pipe(sass({
            //  当sass出现错误时不会抛出错误 只会打印错误的地方
        }).on('error', sass.logError))

        //  合并文件
        .pipe(concat('biubiu.css'))
        //  输出编译后文件
        .pipe(gulp.dest('./dist'))
        //  压缩文件
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        //  修改文件名
        .pipe(rename({
            suffix: ".min"
        }))
        //  输出压缩并改名的文件    目录不存在时  自动创建
        .pipe(gulp.dest('./dist'))

    // 完成
    done();
}