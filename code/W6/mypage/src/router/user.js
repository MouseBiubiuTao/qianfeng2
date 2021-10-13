const express = require('express');
const db = require('../db')

//      公共内容封装 然后再引入即可

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '863987995',
//     database: 'h52108'
// })

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '863987995',
//     database: 'h52108'
// })

const router = express.Router();
module.exports = router;

// 获取用户列表
router.get('/list', async (req, res) => {
    const sql = `select * from user`;

    //  方法 1
    // connection.connect();
    // connection.query(sql, (err, rows, fields) => {
    //     if (err) throw err;
    //     res.send(rows)

    //     connection.end();
    // })

    //  回调函数
    //  方法 2
    // db(sql, (results) => {
    //     res.send(results)
    // })

    //  方法 3 Promise
    const data = await db(sql);

    res.send({
        code: 200,
        data: data,
        msg: 'success'
    })
})

//  获取单个用户
router.get('/:id',async (req, res) => {
    const {
        id
    } = req.params;

    const sql = `select * from user where id=${id}`

    //  回调函数方法
    // db(sql, (rows) => {
    //     res.send(rows[0])
    // })

    // Promise 方法
    const data = await db(sql);

    res.send({
        code: 200,
        data: data,
        msg: 'success'
    })

})