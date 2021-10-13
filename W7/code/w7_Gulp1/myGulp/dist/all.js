"use strict";

var express = require('express'); // 导入mysql模块


var mysql = require('mysql');

var _require = require('./reg'),
    route = _require.route; // 连接方式一：创建连接对象，并配置参数


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '863987995',
  // port: 3306,      默认端口为3306 可以不写
  database: 'h52108'
}); // 连接方式二：创建连接池（默认创建10个连接对象放入连接池中）

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '863987995',
  // port: 3306,      默认端口为3306 可以不写
  database: 'h52108'
});
var router = express.Router();
module.exports = router; //  获取商品列表

router.get('/list', function (req, res) {
  // sql 语句
  var sql = "select * from goods"; // 方法一 写法
  // 先链接数据库
  // connection.connect();
  // connection.query(sql, (error, results, fields) => {
  //     if (error) throw error;
  //     console.log('results', results);
  //     res.send(results);
  //     // 关闭连接
  //     connection.end();
  // })
  // 方法 二 

  pool.query(sql, function (err, rows) {
    res.send(rows);
  });
}); //  获取单个商品

router.get('/:id', function (req, res) {
  var id = req.params.id;
  var sql = "select * from goods where id=".concat(id);
  pool.query(sql, function (err, rows) {
    res.send(rows[0]);
  });
});
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var db = require('../db');

var router = express.Router();
module.exports = router;
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, username, password, mdl, sql, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, username = _req$query.username, password = _req$query.password, mdl = _req$query.mdl;
            sql = "select id,username,regtime from user where username='".concat(username, "' and password='").concat(password, "'");
            _context.next = 4;
            return db(sql);

          case 4:
            data = _context.sent;
            console.log(data);
            console.log(username);
            console.log(password);

            if (data.length > 0) {
              res.send({
                code: 200,
                data: data[0],
                message: 'success'
              });
            } else {
              res.send({
                code: 400,
                data: [],
                message: 'fail'
              });
            }

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var db = require('../db');

var router = express.Router();
module.exports = router; //  检测用户是否存在

router.get('/check', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var username, sql, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //  获取前端发送回来的  username
            username = req.query.username; // 检测用户名是否存在：根据用户名查询数据库，看是否能查询到数据
            // 查询到：用户已存在
            // 查不到：可注册

            sql = "select username from user where username='".concat(username, "'");
            _context.next = 4;
            return db(sql);

          case 4:
            data = _context.sent;
            console.log('data', data);

            if (data.length > 0) {
              res.send({
                code: 400
              });
            } else {
              res.send({
                code: 200
              });
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //  注册用户

router.post('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, username, password, sql, data;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //  获取通过请求体发送回来的数据
            console.log(req);
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            console.log('req.body', req.body);
            sql = "insert into user(username,password) value('".concat(username, "','").concat(password, "')");
            _context2.next = 6;
            return db(sql);

          case 6:
            data = _context2.sent;

            if (data.insertId) {
              // 统一前后端数据格式
              res.send({
                code: 200,
                data: [],
                msg: 'success'
              });
            } else {
              res.send({
                code: 400,
                data: [],
                msg: 'fail'
              }); // res.send(formatData({code:400})) {code:400,data:[],msg:'fail'}
            }

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());