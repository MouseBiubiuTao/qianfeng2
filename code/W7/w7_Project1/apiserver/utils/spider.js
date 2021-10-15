/**
 * 后端（服务端）
    * 发送请求
        * request
        * superagent
 */

// https://offer.qfh5.cn/api/iq?sort=hot&total=false

const superagent = require('superagent')
const cheerio = require('cheerio')

// console.log(superagent)

const mysql = require('mysql')

// @面试题
// const pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     // port: 3306,
//     database: 'offer',

//     // 允许每个mysql语句有多条查询（默认false）.使用它时要非常注意，因为它很容易引起sql注入攻击
//     // multipleStatements: true
// });

// superagent.get('https://offer.qfh5.cn/api/iq?sort=hot&total=false')
// // url传参
// // .query({sort:'hot',total:false})

// // 请求体传参
// // .send({})

// // 设置请求头
// // .set({})

// .then((res)=>{
//     // console.log('res=',res.text,res.body)
//     // const data = JSON.parse(res.text)
//     console.log('data=',res.body)
//     let sql = `insert into question(question,category,userid,hot,difficulty,answer) values`
//     sql += res.body.data.map(item=>{
//         const {question,category,userid,hot,difficulty,answer} = item;
//         return `('${question}','${category}','${userid}','${hot}','${difficulty}','${answer}')`
//     }).join(',');

//     console.log('sql',sql)
//     pool.query(sql,(err,result)=>{
//         if(err){
//             console.log('err',err)
//             return
//         }

//         console.log('数据插入成功',result)
//     })
// })

// @手表

const pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    // port: 3306,
    database: 'h52108',

    // 允许每个mysql语句有多条查询（默认false）.使用它时要非常注意，因为它很容易引起sql注入攻击
    // multipleStatements: true
});

superagent.get('https://www.wbiao.cn/search/share/list/')
.query({
    bCode:111,
    w:'百达翡丽',
    exposedFrom:1
})
// 设置请求头
.set({
    // :authority: www.wbiao.cn
    // :method: GET
    // :path: /search/share/list/?bCode=111&w=%E7%99%BE%E8%BE%BE%E7%BF%A1%E4%B8%BD&exposedFrom=1
    // :scheme: https
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding':' gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,mt;q=0.7',
    'cache-control': 'no-cache',
    cookie: 'w_info=eyJlbnYiOiJwcm9kIn0=; wTk=peMx2Tt50x1DPZCkhieW8sys; wbiaoid=3e480d1bc71b74f86c7aa03dcf95a6b3; wbiaoid.sig=0dcAIc9HXBc-nJemKF1BR1XKqt5RcccsMyHRFIPi-B4; showNum=0; NTKF_T2D_CLIENTID=guest1DAF1562-E7DB-D34F-52E3-818E8C4B9799; nTalk_CACHE_DATA={uid:wx_1000_ISME9754_guest1DAF1562-E7DB-D3,tid:1634261175371851}; _ga=GA1.2.566133262.1634261245; _gid=GA1.2.1316472707.1634261245; acw_tc=2ff6179916342636625977180e467456a2051f69a8599186255ee63a84; Hm_lvt_d8e95c635d8135c55060c556fd69e039=1634261173,1634263669; Hm_lpvt_d8e95c635d8135c55060c556fd69e039=1634263697',
    pragma: 'no-cache',
    referer: 'https://www.wbiao.cn/',
    'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': "Windows",
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': 1,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
})
.then(res=>{
    console.log(res.text);
    // 使用cheerio.load()加载html结构
    const $ = cheerio.load(res.text)

    let sql = `insert into wanbiao(name,price,old_price,img_url) values`
    const goodslist = []

    // 查找需要的html结构
    $('.share__list li').each((idx,el)=>{
        // idx: 索引值
        // el: 每个li

        // 提取li中的信息
        const $li = $(el);

        const goods = {
            img_url: $li.find('img').attr('src'),
            name:$li.find('.desc').text(),
            price:$li.find('.new').text().replace(/[,￥¥]/g,'')*1,
            old_price:$li.find('.old').text().replace(/[,￥¥]/g,'')*1
        }
        goodslist.push(goods)
    })

    sql += goodslist.map(item=>{
        const {name,price,old_price,img_url} = item;
        return `('${name}','${price}','${old_price}','${img_url}')`
    }).join(',')

    console.log('goodslist',goodslist)

    // 写入数据库
    pool.query(sql,(err,result)=>{
        if(err){
            console.log('err',err)
            return
        }

        console.log('数据插入成功',result)
    })
})