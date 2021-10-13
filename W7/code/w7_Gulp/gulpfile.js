const gulp = require('gulp');
const babel = require('gulp-babel');

// 老版本创建任务
// gulp.task('es625',function(){
//     console.log(123)
// })

// 新版本创建任务
// exports.es625 = function(done){
//     // done: 回调函数，用于表示完成任务
//     console.log('es625')
//     // 模拟异步任务
//     setTimeout(()=>{
//         done();
//     },5000)
// }
// exports.compress = function(done){
//     console.log('compress')

//     done();
// }

// module.exports = {
//     es625(){
//         console.log(777)
//     }
// }

function es625(done) {
    console.log('es625')
    // 输入：查找目标文件（返回文件流：文件的液体状态，可以随意分割和传输）
    gulp.src('./src/js/common.js')

        // 处理
        .pipe(babel({
            presets: ["@babel/preset-env"],
        }))

        // 输出：把处理过的文件保存到硬盘
        .pipe(gulp.dest('./dist'))

    done();
}

function mergeJS(done) {
    console.log('mergeJS')
    done();
}

function compressJS(done) {
    console.log('compressJS')
    done();
}


// ES6->ES5
exports.es625 = es625
exports.mergeJS = mergeJS
exports.compressJS = compressJS

exports.listen = function () {
    // 监听文件，执行单个任务
    gulp.watch('./src/**/*.js', es625)

    // 监听文件修改，执行多个任务
    gulp.watch(
        './src/**/*.js',

        // 顺序执行
        gulp.series(mergeJS, es625, compressJS),

        // 同时执行
        // gulp.parallel(mergeJS,es625,compressJS)
    )
}