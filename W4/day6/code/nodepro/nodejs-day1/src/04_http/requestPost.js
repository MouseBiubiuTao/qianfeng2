const http = require("http");
// const querystring = require("querystring");
// var postData = querystring.stringify({
//     "username": "admin",
//     "password": "123456",
// });

const postData = new URLSearchParams({
    username: "abc",
    password: "123456",
}).toString();
console.log("postData=", postData);

var options = {
    hostname: "www.httpbin.org",
    // port: 80,
    method: "POST",
    path: "/post",
    headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
        Connection: "keep-alive",
        "Content-Length": postData.length,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36",
    },
};

var request = http.request(options, (res) => {
    console.log("Status:" + res.statusCode);
    // console.log("headers:" + JSON.stringify(res.headers));

    res.setEncoding("utf8");
    res.on("data", (chunk) => {
        console.log("data=", chunk);
    });
    res.on("end", () => {
        console.log("end", "响应完毕！");
    });
});

request.on("error", (error) => {
    console.log(error);
});

request.write(postData);
console.log("数据已写出");

request.end();
console.log("主程序结束");
