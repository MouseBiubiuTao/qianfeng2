// commonjs模块管理规范【module.exports + require】

// 导入自定义模块 greeting即greeting.js的module.exports对象
// const greeting = require('./src/greeting')
// console.log("greeting=",greeting);
// greeting.hello()
// console.log(greeting.a);

// const {hello,a} = require("./src/greeting")
// console.log(a);
// hello()

// const obj = require("./src/greeting")
// obj.sayHello()
// console.log(obj.nimei);

const { sayHello, nimei } = require("./src/greeting");
sayHello();
console.log(nimei);
