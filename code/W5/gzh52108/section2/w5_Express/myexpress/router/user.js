const express = require('express');

//新建一个路由并引出
const router = express.Router();
module.exports = router;

//CRUD用户
// 生成随机用户
const one = '陶廖李卢陆陈王马龚'
const two = '啊拉开给哈拉卡四年'
const three = '啊树莓派噶环境污染'
const year = [10, 16, 19, 16, 65, 45, 62, 95, 32, 15]
const gender = ["男", "女", "女同", "基佬"]
let userlist = [];
for (let i = 0; i < 20; i++) {
    let id = i + 1;
    let user = {
        id,
        name: `${one[parseInt(Math.random()*one.length)]}${two[parseInt(Math.random()*two.length)]}${three[parseInt(Math.random()*three.length)]}`,

        age: `${year[parseInt(Math.random()*year.length)]}`,
        
        gender: `${gender[parseInt(Math.random()*gender.length)]}`
    }
    userlist.push(user)
}

// 用户列表
router.get('/list', (req, res) => {
    res.send(userlist)
})
//查找单个用户
router.get('/', (req, res) => {
    const {
        id
    } = req.query;

    const user = userlist.find(item => {
        return item.id == id
    })

    res.send(user)
})
router.post('/', (req, res) => {
    res.send('添加用户')
})
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    userlist = userlist.filter(item => {
        return item.id != id
    })
    res.send(`删除${id}用户`)
})
router.put('/', (req, res) => {
    res.send('修改用户')
})