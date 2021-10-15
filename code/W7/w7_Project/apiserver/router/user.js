const express = require('express')
const router = express.Router();
module.exports = router;

const db = require('../db')
const {formatData} = require('../utils')




// get /api/user/list
router.get('/list',async (req,res)=>{
    const sql = `select * from user`
    const data = await db(sql)
    // res.send(formatData({data}))

    // 允许跨域: 设置Access-Control-Allow-Origin:'*' 响应头
    // res.header('Access-Control-Allow-Origin','*')
    
    res.send(formatData.success(data))
})

// post /api/user
router.post('/',(req,res)=>{

    res.send()
})

// delete /api/user/3
router.delete('/:id',(req,res)=>{

    res.send()
})

// put /api/user/3
router.put('/:id',(req,res)=>{

    res.send()
})
// get /api/user/3
router.get('/:id',(req,res)=>{

    res.send()
})