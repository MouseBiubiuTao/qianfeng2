const express = require('express')
const router = express.Router();
module.exports = router;

const userRouter = require('./user')
const goodsRouter = require('./goods')
const regRouter = require('./reg')
const loginRouter = require('./login')

// 允许跨域
router.use(function(req,res,next){
    // res.header('Access-Control-Allow-Origin','*');
    res.set({
        'Access-Control-Allow-Origin':'http://localhost:8080'
    })

    next();
})

// /api/user
router.use('/user',userRouter)
router.use('/goods',goodsRouter)
router.use('/reg',regRouter)
router.use('/login',loginRouter)