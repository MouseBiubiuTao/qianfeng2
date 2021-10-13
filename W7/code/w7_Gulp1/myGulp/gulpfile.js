const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// //  老版本创建任务
// gulp.task('es625', function () {
//     console.log('老版本');
// })

// //  新版本创建任务1
// exports.es6Toes5 = function (done) {
//     // done: 回调函数，用于表示完成任务
//     console.log(666);
//     // 模拟异步任务
//     setTimeout(() => {
//         done();
//     }, 3000);
// }
// //  新版本创建任务2
// exports.compress = function (done) {
//     // done: 回调函数，用于表示完成任务
//     console.log(888);
//     // 模拟同步任务
//     done();
// }
// //  新版本创建任务3
// module.exports = {
//     es625(done){
//         console.log(000);
//         done();
//     }
// }

function es6t5(done) {
    //  输入：查找目标文件（返回文件流：文件的液体状态，可以随意分割和传输）
    gulp.src('./js/reg.js')
        //  处理
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        // 输出：把处理过的文件保存到硬盘
        .pipe(gulp.dest('./dist'))

    done();
}

//  合并文件
function mergeJS(done) {
    console.log('mergeJS')
    done();
}
//  压缩文件
function compressJS(done) {
    console.log('compressJS')
    done();
}

// 编译JS：ES6+转ES5，合并，压缩
function compileJS(done) {
    gulp.src('./js/*.js')
        // ES6+ -> ES5：gulp-babel+@babel/core+@babel/preset-env
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        //  合并后的名字
        .pipe(concat('all.js'))

        //  输出编译合并    未压缩版本
        .pipe(gulp.dest('./dist'))

        //  压缩版本
        .pipe(uglify())
        //  修改文件名
        .pipe(rename({
            // dirname: "main/text/ciao",
            // basename: "aloha",
            // prefix: "page-", // page-all.js  在文件名前加名字
            suffix: ".min", // all.min.js   在文件名后加名字
            // extname: ".md"   修改文件后缀名
        }))
        //  输出压缩版本
        .pipe(gulp.dest('./dist'))
    //  完成
    done();
}

//  ES6 -> ES5
exports.es6t5 = es6t5;
//  合并文件
exports.mergeJS = mergeJS;
//  压缩文件
exports.compressJS = compressJS;
// 编译JS：ES6+转ES5，合并，压缩
exports.compileJS = compileJS;

// 监听修改文件自动编译
exports.listen = function () {
    //  * 任意文件  **任意目录      修改时执行  es6t5方法
    gulp.watch('./js/*.js', es6t5)
    // 监听文件修改，执行多个任务
    gulp.watch(
        './js/*.js',
        // 顺序执行
        gulp.series(mergeJS, es6t5, compressJS)
        // 同时执行
        // gulp.parallel(mergeJS, es6t5, compressJS)
    )
}