const express = require('express')
const db = require('../db')
const {formatData} = require('../utils')

const router = express.Router();
module.exports = router;

// 注册用户
router.post('/',async (req,res)=>{
    const {username,password} = req.body;
    console.log('req.body',req.body)
    const sql = `insert into users(username,password) values('${username}','${password}')`

    const data = await db(sql)
    if(data.insertId){
        res.send(formatData())
    }else{
        res.send(formatData.fail())
    }
})

// get /api/reg/check?username=xxx
router.get('/check',async (req,res)=>{
    const {username} = req.query;

    // 检测用户名是否存在：根据用户名查询数据库，看是否能查询到数据
    // 查询到：用户已存在
    // 查不到：可注册

    const sql = `select username from users where username='${username}'`
    const data =  await db(sql)
    if(data.length>0){
        res.send(formatData.fail())
    }else{
        res.send(formatData())
    }
})
