/* 
创建Paginator对象
domRoot DOM根节点
options 基本配置
onPageChangeCallback 页码变化回调（通知主程序页码变化）
*/
function Paginator(domRoot, options, onPageChangeCallback) {

    // 初始化分页器属性
    this.domRoot = domRoot;
    this.options = options;
    this.onPageChangeCallback = onPageChangeCallback;

    // 设置根元素的样式
    this.setStyle(
        this.domRoot,
        `padding: 0;width: 800px;height: 40px;border: 1px solid #333;margin: 30px auto;display: flex;justify-content: center;align-items: center;`
    );

    //渲染基本元素（固定不变的）
    this.renderBasic();

    // 绘制页码（动态渲染）
    this.renderPagers();

    // 绑定事件监听（该委托就委托，尽量避免反复绑定）
    this.bindEvent();
}

/* 渲染基本元素： */
Paginator.prototype.renderBasic = function () {
    // 以极为暴力的方式 将固定不动的元素 绘制到根元素中
    this.domRoot.innerHTML = `
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnFirst">first</div>
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnPrev">prev</div>
<div style="display: flex; justify-content: center; align-items: center;" class="pagers"></div>
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnNext">next</div>
<div style="border: 1px solid rgb(51, 51, 51); padding: 0px 5px; margin: 0px 5px;" id="btnLast">last</div>
<input type="number" style="outline: none; width: 50px; height: 20px;">
<button style="outline: none; width: 30px; height: 24px; margin-left: 5px;">go</button>           
    `;

    // 拿到有交互的控件
    this.btnFirst = document.getElementById("btnFirst");
    this.btnLast = document.getElementById("btnLast");
    this.btnPrev = document.getElementById("btnPrev");
    this.btnNext = document.getElementById("btnNext");
    this.pagers = this.domRoot.querySelector(".pagers");
    this.input = this.domRoot.querySelector("input");
    this.btn = this.domRoot.querySelector("button");

    // 同步input框中的页码
    this.input.value = this.options.current;
};

/* 设置样式 */
Paginator.prototype.setStyle = function (elem, css) {
    elem.style = css;
};

/* 绑定监听 */
Paginator.prototype.bindEvent = function () {
    const divs = this.domRoot.querySelectorAll("div");
    // const ps = this.domRoot.querySelectorAll("p")
    const pgThis = this;

    // 用户点击首页、末页、上页、下页
    for (let i = 0; i < divs.length; i++) {
        divs[i].onclick = function (e) {
            // 如果已经被disabled 则直接返回
            if (this.getAttribute("disabled") == "true") {
                return;
            }
            console.log(this);

            // 拿到当前页的页码
            let temp = pgThis.options.current;
            switch (this.innerText) {
                case "first":
                    temp = 1;
                    break;
                case "last":
                    temp = pgThis.options.total;
                    break;
                case "prev":
                    temp = pgThis.options.current - 1;
                    break;
                case "next":
                    temp = pgThis.options.current + 1;
                    break;
                default:
                    break;
            }

            // 纠正越界
            temp = temp < 1 ? 1 : temp;
            temp = temp > pgThis.options.total ? pgThis.options.total : temp;

            //调用回调函数 通知页码变化
            pgThis.setCurrentPage(temp);
        };
    }

    // 点击页码（改为事件委托）
    // for (let i = 0; i < ps.length; i++) {
    //     ps[i].onclick = function (e) {
    //         let temp = this.innerText * 1
    //         pgThis.setCurrentPage(temp)
    //     }
    // }
    pgThis.pagers.onclick = function (e) {
        // 如果点击的是页码p元素（而不是...）
        if (e.target.nodeName === "P") {
            // 拿出页码 并变换之
            let temp = e.target.innerText * 1;
            pgThis.setCurrentPage(temp);
        }
    };

    // 点击go按钮 从input框中取出页码 并变换之
    this.btn.onclick = function (e) {
        let temp = pgThis.input.value * 1;
        pgThis.setCurrentPage(temp);
    };
};

/* 修改页码 */
Paginator.prototype.setCurrentPage = function (n) {
    // 只有页码的的确确发生变化时 才重新设置页码
    if (n != this.options.current) {

        // 更新配置中的当前页码
        this.options.current = n;
        console.log(this.options.current);

        // 重新渲染页码
        this.renderPagers();

        // input同步显示
        this.input.value = this.options.current;

        //判断是否有按钮应该被禁用
        this.checkDisable();

        // 通过用户传入的回调函数（引用类型）地址 调用该函数（实际上实现主程序对页面的重新渲染）
        this.onPageChangeCallback(this.options.current);
    }
};

/* 判断是否有按钮该被禁用 */
Paginator.prototype.checkDisable = function () {

    // 在第一页禁用首页、上一页
    if (this.options.current === 1) {
        this.btnFirst.setAttribute("disabled", true);
        this.btnPrev.setAttribute("disabled", true);
        this.btnFirst.style.backgroundColor = "#ccc";
        this.btnPrev.style.backgroundColor = "#ccc";
    } else {
        this.btnFirst.setAttribute("disabled", false);
        this.btnPrev.setAttribute("disabled", false);
        this.btnFirst.style.backgroundColor = "#fff";
        this.btnPrev.style.backgroundColor = "#fff";
    }

    // 在最后一页 禁用末页、下一页
    if (this.options.current === this.options.total) {
        this.btnLast.setAttribute("disabled", true);
        this.btnNext.setAttribute("disabled", true);
        this.btnLast.style.backgroundColor = "#ccc";
        this.btnNext.style.backgroundColor = "#ccc";
    } else {
        this.btnLast.setAttribute("disabled", false);
        this.btnNext.setAttribute("disabled", false);
        this.btnLast.style.backgroundColor = "#fff";
        this.btnNext.style.backgroundColor = "#fff";
    }
};

/* 绘制页码 */
Paginator.prototype.renderPagers = function () {

    // 1 2【3】4 5 ... 58 59 60 61 62
    // render([1,5],[],[58,62])
    function render(...arrs) {
        arrs.forEach(function (arr) {
            if (arr.length) {
                for (let i = arr[0]; i <= arr[1]; i++) {
                    const p = document.createElement("p");
                    p.innerText = i;
                    pgThis.setStyle(
                        p,
                        `border: 1px solid rgb(51, 51, 51);margin: 0px 5px;padding: 0px 5px;`
                    );
                    pgThis.pagers.appendChild(p);
                }
            } else {
                pgThis.pagers.appendChild(document.createTextNode("..."));
            }
        });
    }

    // 保存this
    const pgThis = this;

    // 清空页码
    pgThis.pagers.innerHTML = "";

    console.log(
        `绘制${this.options.total}页码，第${this.options.current}页高亮`
    );
    // 分两种情况绘制
    // 当前页在边缘 1 2【3】4 5 ... 58 59 60 61 62
    if (
        this.options.current < 6 ||
        this.options.current > this.options.total - 5
    ) {
        render(
            [1, 5], 
            [], 
            [this.options.total - 4, this.options.total]
        );
    }
    // 当前页逢中 1 2 ... 28 29 【30】 31 32 ... 61 62
    else {
        render(
            [1, 2],
            [],
            [this.options.current - 2, this.options.current + 2],
            [],
            [this.options.total - 1, this.options.total]
        );
    }

    // 设置高亮页：遍历所有页码p元素 如果innerText等于this.options.current 则该p高亮
    for (let i = 0; i < this.pagers.children.length; i++) {
        const p = this.pagers.children[i];
        if (p.innerText == this.options.current) {
            p.style.backgroundColor = "orange";
            break;
        }
    }
};
