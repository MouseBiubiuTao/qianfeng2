var file = require('./file')
var url = require('url')

module.exports = {

  home: function(req, res) {
    file.readFile('./views/home.html', res, req)
  },

  login: function(req, res) {
    // var urlObject = url.parse(req.url, true).query;
    // console.log(urlObject.email)
    // console.log(urlObject.password)
    
    /* 读取请求携带的数据 */
    var postData = ''

    // 监听【请求对象】的数据事件
    req.on(
      'data', //事件类型

      // 事件响应函数：chunk为读入的一小块数据
      function(chunk){
        console.log("从请求中读入一小块数据：chunk=",chunk);
        postData += chunk
      }
    )
    
    // // 监听【请求对象】的数据发送完毕事件
    req.on('end', function() {
      console.log("请求数据读取完毕：postData=",postData);
      file.postReadFile('./views/login.html', res, req, postData)
    })
    
  },

  register: function (req, res) {
    res.setHeader(
      "Content-Type",
      "text/html; charset=utf-8"
    )

    res.write('<h3>注册页面</h3>')
    res.end()
  },
  
  img: function (req, res) {
    file.readImg('./images/pet.jpg', res)
  }
  
}