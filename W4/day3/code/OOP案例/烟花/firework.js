function Firework(nightsky) {
    this.nightsky = nightsky;
    this.init();
}

Firework.prototype.init = function () {
    const thisFw = this
    // 鼠标点击事件
    this.nightsky.addEventListener("click", function (e) {
        const ex = e.offsetX;
        const ey = e.offsetY;

        // 在事件位置的正下方创建一颗烟花
        const sp = thisFw.createFirework(ex + "px", thisFw.nightsky.clientHeight + "px");
        thisFw.nightsky.appendChild(sp);

        // 烟花升起到事件位置 然后飞溅splash
        move(sp, { top: ey }, () => {
            thisFw.nightsky.removeChild(sp);
            thisFw.splash(ex + "px", ey + "px", getRandom(25, 50));
        });
    });
};

/* 在指定位置创建一颗烟花 */
Firework.prototype.createFirework = function (x, y) {
    const sp = document.createElement("span");
    sp.className = "fire";
    sp.style.backgroundColor = getRandomColor();
    sp.style.borderRadius = "50%";
    sp.style.left = x;
    sp.style.top = y;
    return sp;
};

/* 若干多烟花 从指定位置开始飞溅 */
Firework.prototype.splash = function (x, y, count) {
    for (let i = 0; i < count; i++) {
        const fw = this.createFirework(x, y);
        this.nightsky.appendChild(fw);

        // 生成一个随机消失位置
        const dieX = getRandom(0, this.nightsky.clientWidth);
        const dieY = getRandom(0, this.nightsky.clientHeight);
        move(fw, { left: dieX, top: dieY, opacity: 0 }, () => {
            console.log("许个愿吧");
            
            // 从天空里移出 从内存里移出
            nightsky.removeChild(fw)
            delete fw
        });
    }
};
