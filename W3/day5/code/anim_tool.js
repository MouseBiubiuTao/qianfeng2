// 判断属性是否为【君子属性（这厮不好色）】
function isGoodmanAttr(attrName) {
    return attrName.indexOf("color") === -1 && attrName.indexOf("Color") === -1;
}

// 获取颜色的动画速度
function getColorSpeed(startColor, endColor, frames) {
    // rgb(255, 192, 203) rgb(0, 255, 0) 25
    // [rs,gs,bs]
    const regColor = /^rgb\((\d+), (\d+), (\d+)\)$/;
    const [, sr, sg, sb] = regColor.exec(startColor);
    const [, er, eg, eb] = regColor.exec(endColor);

    return [(er - sr) / frames, (eg - sg) / frames, (eb - sb) / frames];
}
//getColorSpeed("rgb(255, 192, 203)","rgb(0, 255, 0)",25)

// 根据rgb颜色偏移[rs,gs,bs]计算新的颜色
function getNewColor(color = "rgb(0, 0, 0)", rgbOffset = [0, 0, 0]) {
    const regColor = /^rgb\((\d+(\.\d+)?), (\d+(\.\d+)?), (\d+(\.\d+)?)\)$/;

    console.log("getNewColor color=", color);
    const [, r, , g, , b] = regColor.exec(color);

    return `rgb(${r * 1 + rgbOffset[0]}, ${g * 1 + rgbOffset[1]}, ${
        b * 1 + rgbOffset[2]
    })`;
}

/* 
        多属性动画框架
        element 要做动画的元素
        targetObj 动画的目标值 可包含多属性 {left:"500px",top:"400px",opacity:0.5},
        timeCost 动画时间消耗 单位毫秒
        callback 动画结束回调函数
        */
function animate(element, targetObj, timeCost, callback) {
    // 提取属性的单位 500.123px
    const regUnit = /^\-?\d*(\.\d+)?([a-z]*)$/; //[500.123px .123 px index:0 groups:undefined]

    /* 获取各大属性的【目标值、单位、动画速度、实时值】 */
    // {left:"500px",top:"400px",opacity:0.5}
    for (let attr in targetObj) {
        // 提取属性的单位 500.123px
        const attrUnit = regUnit.exec(targetObj[attr])[2];

        // 记录每个属性的当前值
        let attrValue = parseFloat(window.getComputedStyle(element)[attr]);

        // attr的动画速度 = (attr目标值 - attr当前值)/帧数
        const attrSpeed =
            (parseFloat(targetObj[attr]) - attrValue) / (timeCost / 40);

        // {left:[  "500px",    "px",   attrSpeed,  attrValue   ],top:...},
        targetObj[attr] = [targetObj[attr], attrUnit, attrSpeed, attrValue];
    }
    console.log(targetObj);

    /* 所有属性 每一帧 都偏移对应的动画速度 */
    let timer = setInterval(() => {
        for (let attr in targetObj) {
            // const attrTarget = targetObj[attr][0]
            const attrUnit = targetObj[attr][1];
            const attrSpeed = targetObj[attr][2];

            // 属性的实时值 += 属性的动画速度
            targetObj[attr][3] += attrSpeed;

            // 改变元素样式的实时值
            element.style[attr] = targetObj[attr][3] + attrUnit;
        }
    }, 40);

    /* 时间一到 就停止动画 暴力校正 回调callback函数 */
    setTimeout(() => {
        timer && clearInterval(timer);

        /* targetObj中的所有属性都取目标值 */
        // {left: [  "500px",    "px",   attrSpeed,  attrValue   ], top:...},
        for (let attr in targetObj) {
            element.style[attr] = targetObj[attr][0];
        }

        /* 回调callback函数 */
        //    if(callback){
        //        callback()
        //    }
        callback && callback();
    }, timeCost);
}

/* 
多属性动画框架
element 要做动画的元素
targetObj 动画的目标值 可包含多属性 {left:"500px",top:"400px",opacity:0.5},
timeCost 动画时间消耗 单位毫秒
callback 动画结束回调函数
*/
function animateWithColor(element, targetObj, timeCost, callback) {
    // 提取属性的单位 500.123px
    const regUnit = /^\-?\d*(\.\d+)?([a-z]*)$/; //[500.123px .123 px index:0 groups:undefined]

    /* 获取各大属性的【目标值、单位、动画速度、实时值】 */
    // {left:"500px",top:"400px",opacity:0.5}
    for (let attr in targetObj) {
        let attrUnit, attrValue, attrSpeed;
        if (isGoodmanAttr(attr)) {
            // 提取属性的单位 500.123px
            console.log(attr, targetObj, regUnit);
            attrUnit = regUnit.exec(targetObj[attr])[2];

            // 记录每个属性的当前值
            attrValue = parseFloat(window.getComputedStyle(element)[attr]);

            // attr的动画速度 = (attr目标值 - attr当前值)/帧数
            attrSpeed =
                (parseFloat(targetObj[attr]) - attrValue) / (timeCost / 40);

            // {left:[  "500px",    "px",   attrSpeed,  attrValue   ],top:...},
            targetObj[attr] = [targetObj[attr], attrUnit, attrSpeed, attrValue];
        } else {
            attrUnit = null;
            attrValue = window.getComputedStyle(element)[attr];
            attrSpeed = getColorSpeed(
                attrValue,
                targetObj[attr],
                timeCost / 40
            );
        }

        // {left:   [  "500px",             "px",   动画速度20,              实时属性值40                  ],top:...},
        // {color:  [  "rgb(0, 255, 0)",    null,   [-10.2, 2.52, -8.12],   rgb(0, 255, 0)      ],top:...},
        targetObj[attr] = [targetObj[attr], attrUnit, attrSpeed, attrValue];
    }
    console.log(targetObj);

    /* 所有属性 每一帧 都偏移对应的动画速度 */
    let timer = setInterval(() => {
        for (let attr in targetObj) {
            // const attrTarget = targetObj[attr][0]
            const attrUnit = targetObj[attr][1];
            const attrSpeed = targetObj[attr][2];

            if (isGoodmanAttr(attr)) {
                // 属性的实时值 += 属性的动画速度
                targetObj[attr][3] += attrSpeed;
                // 改变元素样式的实时值
                element.style[attr] = targetObj[attr][3] + attrUnit;
            } else {
                targetObj[attr][3] = getNewColor(targetObj[attr][3], attrSpeed);
                element.style[attr] = targetObj[attr][3];
            }
        }
    }, 40);

    /* 时间一到 就停止动画 暴力校正 回调callback函数 */
    setTimeout(() => {
        timer && clearInterval(timer);

        /* targetObj中的所有属性都取目标值 */
        // {left: [  "500px",    "px",   attrSpeed,  attrValue   ], top:...},
        for (let attr in targetObj) {
            element.style[attr] = targetObj[attr][0];
        }

        /* 回调callback函数 */
        //    if(callback){
        //        callback()
        //    }
        callback && callback();
    }, timeCost);
}
