function doSth() {
    if (Math.random() > 0.5) {
        throw new Error("牛头马面：恭喜你被我王看中了，请跟我们走一趟！");
    }
    console.log("任务圆满完成");
}

function chufa(a, b) {
    if (b === 0) {
        throw new Error("分母不能为0");
    }
    return a / b;
}

try {
    // console.log(nimei)
} catch (error) {
    console.log("发现错误", error);
}

console.log("领红包");
