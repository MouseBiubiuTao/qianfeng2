const fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");

var fileReadStream = fs.createReadStream("data.json");
var fileWriteStream = fs.createWriteStream("data.json.gz");

/* IO流写法1 */
// fileReadStream
//   .pipe(zlib.createGzip())
//   .pipe(fileWriteStream)

/* IO流写法2 */
// const gzip = zlib.createGzip();
// pipeline(fileReadStream, gzip, fileWriteStream, (err) => {
//     if (err) {
//         console.error("An error occurred:", err);
//         process.exitCode = 1;
//     }
// });

/* 文件流IO事件监听 */
// fileReadStream.once('data', (chunk) => {
//   console.log(chunk.toString())
// })

var count = 0;
fileReadStream.on("data", (chunk) => {
    console.log(`${++count} 接收到：${chunk.length}`);
});

fileReadStream.on("end", () => {
    console.log("--- 读取结束 ---");
});

fileReadStream.on("error", (error) => {
    console.log(error);
});

fileWriteStream.on("pipe", (source) => {
    // console.log("fileWriteStream on pipe", source);
    console.log("fileWriteStream on pipe")
});
