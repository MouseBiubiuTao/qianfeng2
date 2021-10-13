class Danmu {
    /* 如果传入了根布局 就使用传入的根布局 */
    // options {useDefaultDOM:true}
    constructor(root, comments, options) {
        this.root = root;
        this.comments = comments;

        /* 初始化用户配置 */
        this.options = {
            useDefaultDOM:
                options.useDefaultDOM === undefined
                    ? true
                    : options.useDefaultDOM,
            useAutoPlay:
                options.useAutoPlay === undefined ? true : options.useAutoPlay,
            showDanmu:
                options.showDanmu === undefined ? true : options.showDanmu,
        };

        /* 初始化 */
        this.init();

        /* 渲染DOM结构 */
        if (this.options.useDefaultDOM) {
            this.render();
        }

        /* 找出【【【自己的】】】屏幕 输入框 按钮 checkbox */
        this.findElements();

        // 开启数据的自动轮播
        if (this.options.useAutoPlay) {
            this.startAutoPlay();
        }

        // 弹幕能【自己】监听用户事件
        this.startListen();
    }

    /* 渲染DOM结构 */
    render() {
        /* 建立DOM结构 */
        this.root.innerHTML = `
        <div id="danmu"></div>
        <div id="bottom">
            <input type="text" id="ipComment" placeholder="请输入评论内容">
            <button id="btn">发送</button>
            <div>
                <input id="cbWanlai" type="checkbox" checked="checked">
                <input id="cbToggle" type="checkbox" checked="checked"><br>
                <label id="lbWanlai" for="cbWanlai">玩赖模式</label>
            </div>
        </div>            
        `;

        /* 默认的样式表 */
        this.defaultStyle = [
            {
                selector: "#root",
                css: {
                    width: "800px",
                    margin: "50px auto",
                    padding: "5px",
                    border: "1px solid black",
                },
            },
            {
                selector: "#danmu",
                css: {
                    width: "100 %",
                    height: "500px",
                    backgroundColor: "black",
                    marginBottom: "5px",
                    position: "relative",
                    overflow: "hidden",
                },
            },
            {
                selector: ".comment",
                css: {
                    position: "absolute",
                    whiteSpace: "nowrap",
                },
            },
            {
                selector: "#bottom",
                css: {
                    width: "100%",
                    display: "flex",
                    height: "50px",
                },
            },
            {
                selector: "#ipComment",
                css: {
                    flexGrow: 3,
                },
            },
            {
                selector: "#btn",
                css: {
                    flexGrow: 1,
                    height: "100%",
                    margin: "auto 5px",
                },
            },
            {
                selector: "#cbWanlai",
                css: {
                    width: "20px",
                    height: "20px",
                },
            },
            {
                selector: "#lbWanlai",
                css: {
                    fontSize: "15px",
                },
            },
        ];

        /* 添加样式：遍历样式表中的所有selector 找出对应元素 设置css给定的样式*/
        this.defaultStyle.forEach(({ selector, css }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el) => {
                // 遍历css中的全部样式
                for (let attr in css) {
                    el.style[attr] = css[attr];
                }
            });
        });
    }

    /* 初始化（一些数据） */
    init() {
        // 记录弹幕是否应该显示
        this.shouldShow = true;

        // 所有正在运行的弹幕span和timer
        //{sp1:timer1,sp2:timer2}
        this.allMovingSpans = {};

        // 弹幕自动播放定时器
        this.autoPlayTimer = null;
    }

    /* 找出所有的控件元素 */
    findElements() {
        this.danmu = root.querySelector("#danmu");
        this.ipComment = root.querySelector("#ipComment");
        this.btn = root.querySelector("#btn");
        this.cbWanlai = root.querySelector("#cbWanlai");
        this.cbToggle = root.querySelector("#cbToggle");
    }

    /* dm实例监听用户事件 */
    startListen() {
        // 此时的this还是调用当前函数的主语
        const dm = this;

        /* 用户点击发送按钮可以发送弹幕 */
        dm.btn.onclick = function (e) {
            dm.fire();
        };

        /* 用户敲回车也可以发送弹幕 */
        dm.ipComment.onkeydown = function (ke) {
            if (ke.code === "Enter") {
                dm.fire();
            }
        };

        /* 监听cbToggle 控制弹幕的显示/隐藏 */
        dm.cbToggle.onchange = function () {
            // console.log(this.checked);
            if (!dm.cbToggle.checked) {
                // 关闭弹幕
                dm.closeDanmu();
            } else {
                // 打开弹幕
                dm.openDanmu();
            }
        };
    }

    /* 开火：响应用户的敲回车或者点击发送 */
    fire() {
        // 拿到用户的评论 追加到数据中
        const comment = this.ipComment.value;
        this.comments.push(comment);

        // 发送该条评论
        this.sendComment(comment, this.cbWanlai.checked);
        this.ipComment.value = "";
    }

    /* 动态应用样式到指定元素 */
    applyClass(element, className) {
        if (this.options.useDefaultDOM) {
            for (var i = 0; i < this.defaultStyle.length; i++) {
                const obj = this.defaultStyle[i];
                if (obj.selector === "." + className) {
                    for (let attr in obj.css) {
                        element.style[attr] = obj.css[attr];
                    }
                }
            }
        } else {
            element.classList.add(className);
        }
    }

    /* 发送弹幕 */
    sendComment(comment, useWanlai = false) {
        /* 判断用户是否起用了玩赖模式 */
        let count = 1,
            fontSize = 15;
        if (useWanlai) {
            count = 10;
            fontSize = 30;
        }

        /* 多次发送弹幕 */
        for (let i = 0; i < count; i++) {
            // 从input中拿到输入comment
            // const comment = this.ipComment.value

            // 造一个span名曰sp
            const sp = document.createElement("span");

            // sp的文字为comment
            sp.innerText = comment;

            // 样式设置为.comment
            // sp.classList.add("comment")
            this.applyClass(sp, "comment");

            // 颜色随机
            sp.style.color = getRandomColor();

            // 字体围绕fontSize随机
            sp.style.fontSize = getRandom(fontSize, 2 * fontSize) + "px";

            // sp的位置随机出现在（800px,随机高度）
            sp.style.left = this.danmu.clientWidth + "px";
            sp.style.top = getRandom(0, this.danmu.clientHeight * 0.9) + "px";
            console.log(getComputedStyle(sp).left, getComputedStyle(sp).top);

            // sp丢入danmu
            this.danmu.appendChild(sp);

            // sp做动画（使用轮子）
            // 动画结束后消灭sp
            const timer = move(
                /* 做动画的span */
                sp,

                /* 目标位置 */
                { left: 0 - sp.clientWidth + "px" },

                /* 动画耗时 */
                getRandom(1000, 3000),

                /* 动画结束回调 */
                () => {
                    // 移除span
                    sp.remove();

                    // 从【所有弹幕obj】中移出键值
                    delete this.allMovingSpans[sp];
                }
            );

            // 向正在运行的动画中添加【key:value】sp:timer
            //{sp1:timer1,sp2:timer2}
            // obj["name"] = "zqd"
            this.allMovingSpans[sp] = timer;
        }
    }

    /* 自动播放评论数据 */
    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            // 随机抽取一条comments数据并模拟用户发送
            const comment = getRandomItem(this.comments);
            this.sendComment(comment, false);
        }, 1000);
    }

    /* 关闭弹幕 */
    closeDanmu() {
        /* 停掉所有正在运行的动画 */
        //{sp1:timer1,sp2:timer2}
        for (let sp in this.allMovingSpans) {
            // 所有播放中的动画停掉
            clearInterval(this.allMovingSpans[sp]);

            // 从obj中删除键值
            delete this.allMovingSpans[sp];
        }

        /* 移除this.danmu中的全部span */
        for (let i = 0; i < this.danmu.children.length; i++) {
            this.danmu.children[i].remove();
        }

        // 停止自动播放
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }

        // 禁用发送功能
        this.btn.disabled = true;
        this.ipComment.disabled = true;
    }

    /* 打开弹幕 */
    openDanmu() {
        // 禁用发送功能
        this.btn.disabled = false;
        this.ipComment.disabled = false;

        // 开始自动播放
        this.startAutoPlay();
    }
}
