/* 原来的构造函数的名字 升级为类名 */
// class称之为原来【构造函数+原型属性】的语法糖
class Enlarger {

    /* 原来的构造函数换个名字：构造器 constructor */
    constructor(box) {
        console.log("Enlarger constructor");
    
        // 接收所有成员
        this.box = box;
    
        // 把所有的元素都找到并赋值
        this.show = this.box.querySelector(".show");//中图区
        this.mask = this.box.querySelector(".mask");//放大镜遮罩层
        this.list = this.box.querySelector(".list");//小图列表
        this.enlarge = this.box.querySelector(".enlarge");//大图区
    
        // 初始化
        this.init();
    }
    
    /* 初始化：绑定4个事件 */
    // Enlarger.prototype.init = function ()
    // 原来的原型函数（所有实例共享）直接变成类的普通方法
    // 类的普通方法：实例方法
    init() {
        console.log("init");
    
        // 事件外边的this指的Enlarger实例
        // 事件内的this指的是事件源
        // 先将Enlarger实例这个this保存下来
        const that = this;
    
        /* 鼠标在show中的移入移出事件 */
        this.show.onmouseover = function (e) {
            that.mask.style.display = that.enlarge.style.display = "block";
        };
    
        this.show.onmouseout = function (e) {
            that.mask.style.display = that.enlarge.style.display = "none";
        };
    
        /* 鼠标在show中的move事件 */
        this.show.onmousemove = function (e) {
            const ex = e.pageX;
            const ey = e.pageY;
            console.log(ex, ey);
    
            let left = ex - that.box.offsetLeft - that.mask.clientWidth / 2;
            let top = ey - that.box.offsetTop - that.mask.clientHeight / 2;
    
            // 边界检测
            left = left < 0 ? 0 : left;
            left =
                left > that.show.clientWidth - that.mask.clientWidth
                    ? that.show.clientWidth - that.mask.clientWidth
                    : left;
            top = top < 0 ? 0 : top;
            top =
                top > that.show.clientHeight - that.mask.clientHeight
                    ? that.show.clientHeight - that.mask.clientHeight
                    : top;
    
            /* 设置mask的位置 */
            that.mask.style.left = left + "px";
            that.mask.style.top = top + "px";
    
            /* 计算enlarge的background-position */
            console.log("thisEnlarger.enlarge.clientWidth=",that.enlarge.clientWidth);
            console.log("thisEnlarger.mask.clientWidth=",that.mask.clientWidth);
            
            that.enlarge.style.backgroundPosition = `
            ${(-that.enlarge.clientWidth / (1*that.mask.clientWidth)) * left}px 
            ${(-that.enlarge.clientHeight / (1*that.mask.clientHeight)) * top}px`;
        };
    
        /* list中p的点击事件 */
        // 遍历list中的所有p 一一给每个P设置点击事件
        for (let i = 0; i < this.list.children.length; i++) {
    
            this.list.children[i].onclick = function (e) {
    
                // 取消所有p的active
                for (let j = 0; j < that.list.children.length; j++) {
                    that.list.children[j].className = "";
                }
    
                // 设置当前p为active
                // 这里的this就是点击的P元素
                this.className = "active";
    
                // 从当前p中的img中拿到showImg enlargeImg
                const showImg = this.children[0].getAttribute("showImg");
                const enlargeImg = this.children[0].getAttribute("enlargeImg");
    
                // 分别丢给show中的图片的src 和enlarge的背景
                that.show.children[0].src = showImg;
                that.enlarge.style.backgroundImage = `url(${enlargeImg})`;
            };
    
        }

    };

}

function getStyle(element, attr) {
    return window.getComputedStyle(element)[attr];
}
