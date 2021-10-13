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
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            console.log('req.body', req.body);
            sql = "insert into user(username,password) value('".concat(username, "','").concat(password, "')");
            _context2.next = 5;
            return db(sql);

          case 5:
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

          case 7:
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