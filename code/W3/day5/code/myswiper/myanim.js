const frame_timecost = 34

/**
 * 多属性动画框架封装
 * @param {HTMLElement} elem 要做动画的元素
 * @param {Object} targetObj 元素的目标状态 {left: "500px",top: "500px",opacity: 0.5},
 * @param {number} timeCost 动画耗时毫秒
 * @param {Function} callback 动画结束时的回调函数
 */
function move0(elem, targetObj, timeCost, callback) {
    // 基于targetObj的结构创建一个对称的Object
    // 将来每个属性一个独立的动画
    // 该Object用于记录每个独立的动画是否已完成
    // 所有属性的初始值先预设为false
    // 将来每完成一个属性动画 就将对应的值设置为true
    // 所有的属性值都为true时 说明所有属性动画都已完成 就可以调用【回调函数】了
    // const objCopy = { left: false, top: false, opacity: false };
    const objCopy = {};
    for (var attr in targetObj) {
        objCopy[attr] = false;
    }

    // 遍历所有要做动画的属性 每个属性一个定时器
    for (let attr in targetObj) {
        // 拿到当前属性的值 转换为number（好做数学运算）
        let temp = parseFloat(window.getComputedStyle(elem)[attr]);

        // 拿到属性的目标值
        const target = targetObj[attr];

        // 每帧的动画速率（10px/帧） = (目标值 - 当前值)/总帧数（总耗时/每帧毫秒数）
        const speed = (parseFloat(target) - temp) / (timeCost / frame_timecost);

        // 跑起定时器 40毫秒/帧 每秒25帧（刚好察觉不到跳动）
        let timerId = setInterval(() => {
            /* 变换一帧 相当于切换一张胶片 */
            // 当前帧的阶段目标
            temp += speed;

            // 变换元素的属性
            if (typeof target === "string") {
                // target是string时 还要截取目标值的单位
                // div.style.left = 10"px"
                elem.style[attr] = temp + target.match(/[a-z]+/g)[0];
            } else {
                // div.style.opacity = 0.02
                elem.style[attr] = temp;
            }

            console.log(speed,parseFloat(window.getComputedStyle(elem)[attr]), parseFloat(target));
            // 元素属性达到目标位置时 移除动画定时器
            if (
                // 属性目标值由大向小变化（500px->0px）当前值小于等于目标值时 动画停止
                (speed < 0 &&
                    parseFloat(window.getComputedStyle(elem)[attr]) <=
                        parseFloat(target)) ||
                // 属性目标值由小向大变化（0px->500px）当前值大于等于目标值时 动画停止
                (speed > 0 &&
                    parseFloat(window.getComputedStyle(elem)[attr]) >=
                        parseFloat(target))
            ) {
                // 移除定时器
                clearInterval(timerId);

                // 暴力地设置当前属性为默认值
                elem.style[attr] = targetObj[attr]

                // console.log(attr, "动画结束");
                // 标记当前属性动画已结束
                // objCopy.left = true
                objCopy[attr] = true;

                // 假设所有动画都结束
                let allAnimOver = true;
                // 遍历所有的属性
                // const objCopy = { left: true, top: true, opacity: true };
                for (let key in objCopy) {
                    // 如果有任何一个动画未结束 则判定总体上还未结束
                    if (!objCopy[key]) {
                        allAnimOver = false;
                        break;
                    }
                }

                // 所有属性都到终点了 就执行回调
                if (allAnimOver) {
                    // if(callback){
                    //     callback()
                    // }

                    // 当callback有值时 执行callback()
                    callback && callback();
                }
            }
        }, frame_timecost);
    }

    // 时辰已到时 执行动画结束回调
    // 逼格不饱满 存在时间误差
    // setTimeout(() => {
    //     // 当callback有值时 执行callback()
    //     callback && callback();
    // }, timeCost);
}

/* 稳定性 容错性更好 更加简单粗暴的动画框架 */
function move(elem, targetObj, timeCost, callback) {
    const timerIds = [];

    // 遍历所有要做动画的属性 每个属性一个定时器
    for (let attr in targetObj) {
        // 拿到当前属性的值 转换为number（好做数学运算）
        let temp = parseFloat(window.getComputedStyle(elem)[attr]);

        // 拿到属性的目标值
        const target = targetObj[attr];

        // 每帧的动画速率（10px/帧） = (目标值 - 当前值)/总帧数（总耗时/每帧毫秒数）
        const speed = (parseFloat(target) - temp) / (timeCost / frame_timecost);

        // 跑起定时器 40毫秒/帧 每秒25帧（刚好察觉不到跳动）
        let timerId = setInterval(() => {
            /* 变换一帧 相当于切换一张胶片 */
            // 当前帧的阶段目标
            temp += speed;

            // 变换元素的属性
            if (typeof target === "string") {
                // target是string时 还要截取目标值的单位
                // div.style.left = 10"px"
                elem.style[attr] = temp + target.match(/[a-z]+/g)[0];
            } else {
                // div.style.opacity = 0.02
                elem.style[attr] = temp;
            }
            console.log(speed,parseFloat(window.getComputedStyle(elem)[attr]), parseFloat(target));
        }, frame_timecost);

        // 所有的定时器装在数组里
        timerIds.push(timerId);
    }

    // 时辰已到 执行动画结束回调
    setTimeout(() => {
        // 不问青红皂白 杀死所有的动画
        timerIds.forEach((timerId) => {
            clearInterval(timerId);
        });

        // 暴力将所有属性都设置为目标值
        for(var attr in targetObj){
            elem.style[attr] = targetObj[attr]
        }

        // 不问青红皂白 执行回调函数
        // 当callback有值时 执行callback()
        callback && callback();
    }, timeCost);
    
}
