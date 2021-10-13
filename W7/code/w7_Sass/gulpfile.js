const gulp = require('gulp')
// 引入gulp-sass并指定sass编译器（sass或node-sass）
const sass = require('gulp-sass')(require('sass'))

//创建任务：编译sass
exports.compileSass = function(done){
    // 匹配文件
    gulp.src('./src/sass/*.scss')

    // 编译
    .pipe(sass({
        // outputStyle:'compressed'//expanded(默认),compressed
    }).on('error', sass.logError))

    // 输出
    .pipe(gulp.dest('./dist/css'))

    done();
}