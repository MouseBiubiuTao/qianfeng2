function getRandomColor() {
    return `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(
        0,
        255
    )})`;
}

function getRandom(a, b) {
    return a + parseInt(Math.random() * (b - a + 1));
}

// target {left:100,top:80}

function move(element, target, callback) {
    // animObj{ leftTimerId:1, topTimerId:2 }
    // 存储每个属性的定时器的id
    const animObj = {};

    for (const attr in target) {
        // 拿到动画前element的left属性
        let currentAttrValue = parseFloat(getStyle(element, attr));

        // 50帧(1秒跑完) 计算动画速度
        const speed = (target[attr] - currentAttrValue) / 50;

        // 已经跑完的帧数 50帧跑完就结束动画
        let frameCount = 0;

        // 将当前属性定时器的id存入animObj
        animObj[attr] = setInterval(() => {
            currentAttrValue += speed;
            if (attr !== "opacity") {
                element.style[attr] = currentAttrValue + "px";
            } else {
                element.style[attr] = currentAttrValue;
            }

            if (++frameCount >= 50) {
                // 万一动画最后一帧略有偏差 手动校正
                if (attr !== "opacity") {
                    element.style[attr] = target[attr] + "px";
                } else {
                    element.style[attr] = target[attr];
                }
                clearInterval(animObj[attr]);

                // 从animObj中删除left键值
                delete animObj[attr];

                // 如果所有定时器都从animObj中移出 全部属的动画都做完了 就回调callback函数
                if (isEmptyObj(animObj)) {
                    // callback && callback()
                    if (callback) {
                        callback();
                    }
                }
            }
        }, 20);
    }
}

function getStyle(element, attr) {
    return window.getComputedStyle(element)[attr];
}

/* 检查一个obj是不是一个空对象 */
function isEmptyObj(obj) {
    // 数一数obj有多少自身的属性（Object给的不算）
    let attrCount = 0;
    for (const attr in obj) {
        attrCount++;
    }

    // 属性数量为0 则为空对象 is empty
    return attrCount === 0;
}
