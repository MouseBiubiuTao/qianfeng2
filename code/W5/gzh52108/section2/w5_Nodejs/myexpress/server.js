const express = require('express');

//创建一个服务器
const app = express();

//在当前目录下的public下创建 静态资源服务器
app.use(express.static('./public'))

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

app.get('/goods', (request, response) => {
    response.send([{
            name: "goods1",
            price: 999
        }

    ])
})

app.listen(9999, () => {
    console.log('server is runing');
})
//supervisor 在全局目录下安装 动态修改代码时 无需重启服务器