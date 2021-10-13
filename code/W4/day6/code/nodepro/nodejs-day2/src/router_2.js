var http = require('http')
var url = require('url')
var router = require('./modules/router')

http.createServer(function(req, res){

  if(req.url !== '/favicon.ico') {
    console.log("req.url=",req.url);
    var pathName = url.parse(req.url).pathname.replace(/\//, '')

    try {
      router[pathName](req, res)
    } catch(err) {
      router['home'](req, res)
    }
  }

}).listen(8000)

console.log('Server running at http://localhost:8000')