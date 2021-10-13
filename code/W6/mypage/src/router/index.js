const express = require('express');

const regRouter = require('./reg')
const loginRouter = require('./login')
const goodsRouter = require('./goods')
const userRouter = require('./user');

const router = express.Router();
module.exports = router;

router.use(
    express.urlencoded({
        extended: true
    }),
    express.json()
)

router.use('/reg', regRouter)
router.use('/login', loginRouter)
router.use('/goods', goodsRouter)
router.use('/user', userRouter)