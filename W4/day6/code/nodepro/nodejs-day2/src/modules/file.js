var fs = require("fs");
var queryString = require("querystring");

module.exports = {
    readFile: function (filePath, res, req) {
        fs.readFile(
          filePath, 
          "utf-8", 
          function (err, data) {
            if (err) throw err;

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(data);
            res.end();
          }
        );
    },

    postReadFile: function (filePath, res, req, postData) {
        // email=nimei@163.com&password=123456
        var dataObj = queryString.parse(postData);//{email:"admin@163.com","password":"123456"}

        // 如果请求携带了数据 处理POST请求
        if(postData){
            res.end(JSON.stringify(dataObj))
        }
        
        // 请求没有携带数据 处理GET请求
        else{
            fs.readFile(
                filePath,
                "utf-8",
                (err,data)=>{
                    if(err){
                        res.end(err.toString())
                    }else{
                        res.end(data)
                    }
                }
            )
        }
    },

    readImg: function (filePath, res) {
        fs.readFile(
          filePath, //文件路径
          "binary", //文件编码 此处为二进制文件（非文档）

          // 读取结果回调：err为错误（读取失败的原因） data为读取到的数据
          // 这两个入参只有一个有数据 另一个是null
          function (err, data) {

            // 如果读取出错 则抛出异常（由调用者自行try-catch）
            if (err) {
                throw err;
            }

            // 向客户端写出响应头
            // 响应状态码：200请求成功 404页面找不到 500服务器错误
            res.writeHead(200, { "Content-Type": "image/jpeg" });

            res.write(data, "binary");
            res.end();
        });
    },
};
