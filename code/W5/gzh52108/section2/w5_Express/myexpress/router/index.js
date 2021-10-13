const express = require('express');

//新建一个路由并引出
const router = express.Router();
module.exports = router;

//将之前新建的路由引入
const goodsRouter = require('./goods');

const userRouter = require('./user');


//  express.urlencoded({extended:true})  
//  extended:true  用来解决一个警告 true false  都可以
//  use下可以写多个中间件  express.json() 是处理    JSON数据   
//  express.urlencoded()是用来 处理 表单数据    `key=value&key=value`
//  请求必须经过这里 才能进入 goods user    数据类型的写法 写在这里 
router.use(
    express.urlencoded({extended:true}),
    express.json()    
)

//输入网址后缀为goods 时进入 goodsRouter
router.use('/goods',goodsRouter)

//输入网址后缀为user 时进入 userRouter
router.use('/user',userRouter)
