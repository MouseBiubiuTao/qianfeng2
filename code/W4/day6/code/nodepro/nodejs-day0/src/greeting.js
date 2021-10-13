const hello = () => {
    console.log("hello ~");
};

// 在【导出对象】中添加hello方法
// module.exports.hello=hello
// module.exports.a = 123

module.exports = {
    sayHello() {
        console.log("雷猴啊");
    },
    nimei: "你妹",
};
