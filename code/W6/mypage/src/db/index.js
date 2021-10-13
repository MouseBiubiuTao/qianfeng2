const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '863987995',
    database: 'h52108'
})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '863987995',
    database: 'h52108'
})


// 回调函数 就是把想要传递的值包着  通过调用函数的方式来传递

// module.exports = function (sql, callback) {
//     pool.query(sql, (err, rows) => {
//         if (err) {
//             throw err;
//         }
//         callback(rows);
//     })
// }


//  Promise 方法

module.exports = function (sql) {

    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    })

}