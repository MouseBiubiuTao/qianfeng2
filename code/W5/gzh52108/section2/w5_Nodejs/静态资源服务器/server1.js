/* 获取协议 */
const http = require('http')
const fs = require('fs');
const path = require('path');
const mime = require('./mime');
const {
    type
} = require('os');

//构建服务器
const server = http.createServer((req, res) => {

    const {
        pathname
    } = new URL('http://heihei.com' + req.url)

    const realPath = path.join(__dirname, pathname)

    const type = path.extname(pathname).slice(1)

    fs.readFile(realPath, (err, content) => {

        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/plain;charset=utf8'
            })
            res.end('该文件不存在')
        }

        res.writeHead(200, {
            'Content-Tyep': `${mime[type]}/charset=utf8`
        })

        res.end(content)
    })

})

//给服务器绑定端口
server.listen(8888, function () {
    //服务器启动时运行下面代码
    console.log("服务器启动")
})