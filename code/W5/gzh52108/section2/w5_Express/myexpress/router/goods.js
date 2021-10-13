const express = require('express');

//新建一个路由并引出
const router = express.Router();
module.exports = router;

//模拟商品数据
let goodslist = [];
const prices = [9.9, 19.9, 28, 38, 58, 68, 88, 66, 111, 133, 168, 288, 588, 6668]
for (let i = 0; i < 20; i++) {
    let id = i + 1;
    const goods = {
        id,
        name: `goods${id}`,
        prices: prices[parseInt(Math.random() * prices.length)],
        imgurl: `img/goods${id}`
    }
    goodslist.push(goods);
}

//商品的CRUD

// 商品列表: /api/goods/list
router.get('/list', (req, res) => {
    res.send(goodslist)
})

//  获取单个商品信息
// get /goods 单个商品信息
router.get('/', (req, res) => {
    // url参数接收：req.query   自动把网址输入的 ?id=10&a=20  
    // 转换成 一个数组 {"id":10, "a":20 }
    const {
        id
    } = req.query;
    // 商品列表的结构   goodslist=[{id},{id},{id}]

    //  方法1   过滤的方式来找  找到的会是一个数组的形式，需要索引来去掉[ ]
    // const goods = goodslist.filter(item => {
    //     return item.id == id
    // })[0]

    //方法2     find 只会找到第一个符合条件的   不需要再去除 [ ]
    const goods = goodslist.find(item => {
        return item.id == id
    })
    res.send(goods)
})


//  添加商品
router.post('/', (req, res) => {
    console.log('req.body',req.body);
    res.send('添加商品')
})

//  删除商品
router.delete('/:id', (req, res) => {
    // 动态路由：路由地址为变量，只要访问路径匹配格式，
    //  就能进入该路由，?表示该变量可选('/:id/:arg?')
    // 动态路由接收：req.params
    const {
        id
    } = req.params;
    goodslist = goodslist.filter(item => {
        return item.id != id;
    })
    res.send(`商品${id}已删除`)
})

router.put('/', (req, res) => {
    res.send('修改商品')
})