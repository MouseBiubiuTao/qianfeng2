const express = require('express')


// 创建一个服务器
const app = express();

// 把当前目录下的public目录下创建静态资源服务器
app.use(express.static('./public'))

app.get('/goodslist',function(req,res){
    // send() = req.write()+req.end()  send()可以写数组，对象  而end() 之能写字符串
    res.send([
        {name:'goods1',price:998},
        {name:'goods2',price:3998},
        {name:'goods3',price:1998},
        
    ])
})

app.get('/goods',function(req,res){
    // send() = req.write()+req.end()
    res.send({name:'goods1',price:998})
})

// 监听端口
app.listen(2108,function(){
    console.log('server is runing')
})