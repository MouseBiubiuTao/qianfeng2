const express = require('express');
//创建一个服务器
const app = express();

//引入首页的Router
const router = require('./router') //./router/index.js可以简写

//在当前目录下的public下创建 静态资源服务器
const static = express.static('./public')
app.use(static)

app.use('/api', router)

app.get('/home', (req, res) => {
    const userAgent = req.get('User-Agent')
    if (/window/i.test(userAgent)) {
        res.send('PC端')
    } else if (/Android|Iphone/i.test(userAgent)) {
        res.send('移动端')
    }
})


app.listen(9999, () => {
    console.log('server is runing');
})
//supervisor 在全局目录下安装 动态修改代码时 无需重启服务器