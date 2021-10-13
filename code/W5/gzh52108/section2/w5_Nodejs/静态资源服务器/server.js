//获取http模块
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('./mime')

//构建服务器
const server = http.createServer(function (request, response) {
    // 每一次请求，都会进入这里，执行这里的代码
    // 根据用户访问的地址，读取相应的文件内容，并响应给前端

    // 如果后面还会有参数/img/gxt.png&a=10&b=100
    // pathname只获取后缀的 /img/gxt.png  这一段 后面还有的参数不要
    const {pathname} = URL('http://heiheibaobei.com'+request.url)
    console.log(pathname);

    //  __dirname 获取的是当前文件夹的绝对路径\  
    //  url 获取的是文件夹下的文件的路径 例如 /index.html
    const realPath = path.join(__dirname, pathname)

    //获取网页后缀 给mime使用
    const type = path.extname(pathname).slice(1)
    console.log(type);

    fs.readFile(realPath, function (err, content) {
        if (err) {
            response.writeHead(404, {
                'Content-Type': 'text/plain;charset=utf8'
            })
            response.end('文件不存在')
            return
        }

        response.writeHead(200, {
            //根据mime 的类型获取参数
            'Content-Type': `${mime[type]};charset=utf8`
        })

        response.end(content);
    })
})


//绑定端口
server.listen(3000, () => {
    console.log('服务器已在运行');
})