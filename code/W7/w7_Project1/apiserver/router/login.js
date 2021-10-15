const express = require('express')
const router = express.Router();
module.exports = router;

const db = require('../db')
const {formatData} = require('../utils')

router.get('/',async (req,res)=>{
    const {username,password,mdl} = req.query;
    
    const sql = `select id,username,age,gender,regtime from users where username='${username}' and password='${password}'`

    const data = await db(sql)

    if(data.length>0){
        // 查询到数据，说明用户名和密码正确
        res.send(formatData({
            data:data[0]
        }))
    }else{
        res.send(formatData.fail())
    }
})