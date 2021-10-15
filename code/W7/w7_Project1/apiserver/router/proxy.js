const express = require('express')
const router = express.Router();
module.exports = router;

const { createProxyMiddleware } = require('http-proxy-middleware');

// 代理服务器

// /proxy/offer
const offerProxy = createProxyMiddleware({
    // 目标服务器
    target: 'https://offer.qfh5.cn', 
    changeOrigin: true,
    // 重写路径：过滤掉多余的路径
    pathRewrite:{
        '^/proxy/offer':''
    }
})

// 前端请求：http://localhost:2108/proxy/offer/api/iq/today
// 1. 替换服务器：http://localhost:2108/proxy/offer/api/iq/today 
// -> https://offer.qfh5.cn/proxy/offer/api/iq/today
// 2. 重写路径：https://offer.qfh5.cn/proxy/offer/api/iq/today 
// -> https://offer.qfh5.cn/api/iq/today
// 目标请求：https://offer.qfh5.cn/api/iq/today
router.use('/offer',offerProxy)


// 代理百度
// const baiduProxy = createProxyMiddleware({
//     // 目标服务器
//     target: 'https://baidu.com', 
//     changeOrigin: true,
//     // 重写路径：过滤掉多余的路径
//     pathRewrite:{
//         '^/proxy/bd':''
//     }
// })
// // /proxy/bd
// router.use('/bd',baiduProxy)