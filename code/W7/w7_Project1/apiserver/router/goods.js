const express = require('express')
const router = express.Router();
module.exports = router;

const db = require('../db')
const {formatData} = require('../utils')


// get /api/user/list
router.get('/list',async (req,res)=>{
    const sql = `select * from goods`
    const data = await db(sql)
    // res.send(formatData({data}))
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