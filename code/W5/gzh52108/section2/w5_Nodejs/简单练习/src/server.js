//引入http模块
const http = require('http');

//创建http服务器
const server = http.createServer(function (request, response) {
    //告诉服务器使用的编码
    response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    })
    //write响应内容到客户端
    response.write('<p>hello</p>')
    //告诉服务器响应结束
    response.end('服务结束')
})

//绑定端口：端口范围0-65535，建议端口不要小于1000
server.listen(20000, function () {
    // 这里的代码在服务器启动后执行
    console.log("服务器启动")
})

// 连接服务器
// * 协议：http
// * 地址：ip地址/localhost/127.0.0.1
// * 端口：
