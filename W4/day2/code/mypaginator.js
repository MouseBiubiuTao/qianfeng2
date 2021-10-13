/**
 * 构造函数
 * @param {HTMLElement} domRoot 分页器渲染到的目标位置
 * @param {Object} options 分页器的基础配置（选配）
 * @param {Function} onPageChangeCallback 翻页回调函数 接收一个入参pagenum 代表最新页码
 */
function Paginator(domRoot, options = {}, onPageChangeCallback = null) {
    /* 记录用户传入的根布局+翻页回调 */
    this.domRoot = domRoot;
    this.onPageChangeCallback = onPageChangeCallback;

    /* 默认配置 */
    this.options = {
        // 数据总数
        total: 100,

        // 每页多少条数据
        pageSize: 10,

        /* 文本配置 */
        firstPage: "首页",
        lastPage: "末页",
        previous: "上页",
        next: "下页",

        // 初始页码
        currentPage: 1,
    };

    /* 接收用户传入的配置 其它使用默认配置 */
    for (let attr in options) {
        this.options[attr] = options[attr];
    }

    /* 计算总页码数量 1234/10 = 123.4 = 124 */
    this.options.totalPages = Math.ceil(
        this.options.total / this.options.pageSize
    );

    // 渲染分页器
    this.render();

    // 绑定事件监听
    this.startListen();
}

/* 渲染分页器：渲染静态组件 + 渲染页码 */
Paginator.prototype.render = function () {
    this.renderBasic();
    this.renderPagers();
};

/* 渲染页码：每次翻页后都要重新渲染 */
Paginator.prototype.renderPagers = function () {
    /* this.pagers.innerHTML = `
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px; background-color: orange;">1</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">2</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">3</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">4</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">5</p>
    ...
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">120</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">121</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">122</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">123</p>
    <p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">124</p>            
    `*/

    /* 准备攒很多的页码元素P 一种丢入this.pagers容器 */
    let pagersHtml = "";

    // _draw( [1,5], [], [120,124] )
    const _draw = (...arrs) => {
        arrs.forEach((a) => {
            //[1,5]
            if (a.length === 2) {
                for (let i = a[0]; i <= a[1]; i++) {
                    if (i === this.options.currentPage) {
                        // background-color: orange;
                        pagersHtml += `<p style="background-color: orange; border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">${i}</p>`;
                    } else {
                        pagersHtml += `<p style="border: 1px solid rgb(51, 51, 51); margin: 0px 5px; padding: 0px 5px;">${i}</p>`;
                    }
                }
            }

            // []
            else {
                pagersHtml += "...";
            }
        });
    };

    /* 当前页如果位于首末5页 则页码 1 2 【3】 4 5 ... 120 121 122 123 124*/
    // draw( [1,5], [], [120,124] )
    if (
        this.options.currentPage < 1 + 5 ||
        this.options.currentPage > this.options.totalPages - 5
    ) {
        _draw(
            [1, 5],
            [],
            [this.options.totalPages - 4, this.options.totalPages]
        );
    }

    /* 当前页如果位于中部 则页码 1 2 ... 98 99【100】101 102 ... 123 124*/
    // draw( [1,2], [], [98,102],[],[123,124] )
    else {
        _draw(
            [1, 2],
            [],
            [this.options.currentPage - 2, this.options.currentPage + 2],
            [],
            [123, 124]
        );
    }

    /* 将攒好的html设置给this.pagers */
    this.pagers.innerHTML = pagersHtml;
};

/* 绘制静态内容：首页 末页 上页 下页 input框 跳转按钮*/
Paginator.prototype.renderBasic = function () {
    this.domRoot.innerHTML = `
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnFirst">${this.options.firstPage}</div>
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnPrev">${this.options.previous}</div>
<div style="display: flex; justify-content: center; align-items: center;" class="pagers">这里用于放置动态页码</div>
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnNext">${this.options.next}</div>
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnLast">${this.options.lastPage}</div>
<input type="number" style="outline: none; width: 50px; height: 20px;">
<button style="outline: none; width: 30px; height: 24px; margin-left: 5px;" id="btnGo">Go</button>           
    `;

    // 找出页码容器
    this.pagers = this.domRoot.querySelector(".pagers");

    // 找出input框
    this.input = this.domRoot.querySelector("input");
};

/* 开始监听用户的点击事件 */
Paginator.prototype.startListen = function () {
    this.domRoot.addEventListener("click", (e) => {

        /* 点击页码时 按照标签上数字跳转 */
        if (e.target.nodeName === "P") {
            this.setCurrentPage(e.target.innerText * 1);
        } 
        
        /* 点击的是按钮 */
        else {
            switch (e.target.id) {
                // 首页
                case "btnFirst":
                    this.setCurrentPage(1);
                    break;

                // 末页
                case "btnLast":
                    this.setCurrentPage(this.options.totalPages);
                    break;

                // 上页
                case "btnPrev":
                    this.setCurrentPage(this.options.currentPage - 1);
                    break;

                // 下页
                case "btnNext":
                    this.setCurrentPage(this.options.currentPage + 1);
                    break;

                // 跳转按钮
                case "btnGo":
                    this.setCurrentPage(this.input.value * 1);
                    break;

                default:
                    break;
            }
        }
    });
};

/* 切换页码 */
Paginator.prototype.setCurrentPage = function (n) {

    /* 记录新的当前页 并重绘所有页码 */
    this.options.currentPage = n;
    this.renderPagers();

    /* 如果用户给了回调函数 通知用户：最新当前页为n */
    this.onPageChangeCallback &&
        this.onPageChangeCallback(this.options.currentPage);
};
