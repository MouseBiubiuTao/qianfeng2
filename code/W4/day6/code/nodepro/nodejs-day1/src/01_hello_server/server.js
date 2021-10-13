const http = require("http");

const server = http.createServer(

    // request封装了用户的请求信息
    // response用来给用户写出响应内容
    (request, response) => {
        // response.statusCode = 200;
        // response.setHeader("Content-Type", "text/plain");
        // response.end("Hello World!");

        const data = {
            date:"2021-09-18",
            weather:"sunny"
        }

        const dataJson = JSON.stringify(data)
        response.write(dataJson)
        response.end()
    }

);

// 服务器监听在3000端口
// 端口=应用程序的一个逻辑编号【0-65535】
// 其中【0-1024】为系统保留端口（我们不要去用） 其中http协议默认走80端口 https协议默认走443端口
server.listen(
    3000,
    
    // 成功部署以后的回调函数
    () => {console.log(`Server running at http://127.0.0.1:3000/`);
});
