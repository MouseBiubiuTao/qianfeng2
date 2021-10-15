const express = require('express')
const router = require('./router')
const proxyRouter = require('./router/proxy')
const app = express();

// 静态资源服务器
app.use(express.static('../src'))

// 数据接口
app.use('/api',router)

// 代理服务器
app.use('/proxy',proxyRouter)

app.listen(2108,()=>{
    console.log('server is running at port 2108')
})