const express = require('express');
// 导入mysql模块
const mysql = require('mysql');
const {
    route
} = require('./reg');

// 连接方式一：创建连接对象，并配置参数
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '863987995',
    // port: 3306,      默认端口为3306 可以不写
    database: 'h52108'
})

// 连接方式二：创建连接池（默认创建10个连接对象放入连接池中）
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '863987995',
    // port: 3306,      默认端口为3306 可以不写
    database: 'h52108'
})


const router = express.Router();
module.exports = router;

//  获取商品列表
router.get('/list', (req, res) => {
    // sql 语句
    const sql = `select * from goods`

    // 方法一 写法
    // 先链接数据库
    // connection.connect();
    // connection.query(sql, (error, results, fields) => {
    //     if (error) throw error;
    //     console.log('results', results);
    //     res.send(results);

    //     // 关闭连接
    //     connection.end();
    // })

    // 方法 二 
    pool.query(sql, (err, rows) => {
        res.send(rows);
    })

})

//  获取单个商品
router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = `select * from goods where id=${id}`

    pool.query(sql, (err, rows) => {
        res.send(rows[0])
    })
})