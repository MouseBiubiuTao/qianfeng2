const express = require('express');

//创建一个服务器
const app = express();

//在当前目录下的public下创建 静态资源服务器
const static = express.static('./public')

app.use(static)

// app.use(
//     function (req, res, next) {
//         console.log("one");
//         next();
//     },
//     function (req, res, next) {
//         console.log("two");
//         next();
//     }
// )
// app.use(
//     function (req, res, next) {
//         console.log("three");
//         next();
//     }
// )

// app.use('/api', function (req, res, next) {
//     console.log('api');
//     res.send('api');
//     // next();
// })
// app.use('/xxx', function (req, res, next) {
//     console.log('xxx');
//     res.send('xxx');
//     // next();
// })
// app.use('/aaa', function (req, res, next) {
//     console.log('aaa');
//     res.send('aaa');
//     // next();
// })


// send() = req.write()+req.end()  send()可以写数组，对象  而end() 之能写字符串
app.get('/goodslist', (request, response) => {
    response.send([{
            name: "goods1",
            price: 999
        },
        {
            name: "goods2",
            price: 1999
        },
        {
            name: "goods3",
            price: 2999
        }
    ])
})

//商品列表
app.get('/goods', (request, response) => {
    response.send([{
            name: "goods1",
            price: 999
        }

    ])
})

app.post('/goods', (req, res) => {
    res.send('增加商品成功')
})
app.delete('/goods', (req, res) => {
    res.send('删除商品')
})
app.put('/goods', (req, res) => {
    res.send('修改商品')
})


//CRUD用户
app.get('/user', (req, res) => {
    res.send({
        name: "johr",
        age: 20
    })
})
app.post('/user', (req, res) => {
    res.send('添加用户')
})
app.delete('/user', (req, res) => {
    res.send('删除用户')
})
app.put('/user', (req, res) => {
    res.send('修改用户')
})

app.listen(9999, () => {
    console.log('server is runing');
})
//supervisor 在全局目录下安装 动态修改代码时 无需重启服务器