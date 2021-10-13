const express = require('express');
const db = require('../db')

const router = express.Router();
module.exports = router;


//  检测用户是否存在
router.get('/check', async (req, res) => {
    //  获取前端发送回来的  username
    const {
        username
    } = req.query;
    // 检测用户名是否存在：根据用户名查询数据库，看是否能查询到数据
    // 查询到：用户已存在
    // 查不到：可注册

    const sql = `select username from user where username='${username}'`

    const data = await db(sql);

    console.log('data', data);

    if (data.length > 0) {
        res.send({
            code: 400
        })
    } else {
        res.send({
            code: 200
        })
    }
})

//  注册用户
router.post('/', async (req, res) => {
    //  获取通过请求体发送回来的数据
    console.log(req,res);
    const {
        username,
        password
    } = req.body;
    console.log('req.body', req.body);

    const sql = `insert into user(username,password) value('${username}','${password}')`
    const data = await db(sql)
    if (data.insertId) {
        // 统一前后端数据格式
        res.send({
            code: 200,
            data: [],
            msg: 'success'
        })
    } else {
        res.send({
            code: 400,
            data: [],
            msg: 'fail'
        })

        // res.send(formatData({code:400})) {code:400,data:[],msg:'fail'}
    }

})