// ·将隔行变色的表格抽取为MyTable构造函数；
// ·由外界传入根元素和数据，自动完成渲染，并具有删除功能；
function MyTable(domRoot, dataArr = [], pageSize = 10) {
    this.domRoot = domRoot;
    this.dataArr = dataArr;

    // 每页多少条数据
    this.pageSize = pageSize;

    this.domRoot.innerHTML = "<table border=1 cellspacing=0></table>";

    // 通过父元素去寻找子元素 性能优于通过document找
    this.table = this.domRoot.querySelector("table");
    console.log(this.table);

    // 完成渲染
    // this.render();
    this.turn2Page(1);

    // 添加事件监听
    this.startListen();
}

/* 根据数据渲染内容 */
MyTable.prototype.render = function () {
    if (!this.pageArr.length) {
        this.table.style.display = "none";
        return;
    }

    this.table.style.display = "block";

    let htmlStr = `<thead><tr><th>ID</th>`;
    let attrsCount = 0;
    for (let attr in this.pageArr[0]) {
        htmlStr += `<th>${attr}</th>`;
        attrsCount++;
    }
    htmlStr += `<th>action</th></tr></thead><tbody>`;

    // 遍历自己的dataArr
    this.pageArr.forEach((item, index) => {
        htmlStr += `<td>${index + 1}</td>`;
        // 遍历item的全部属性 每个属性一个td
        for (let attr in item) {
            htmlStr += `<td>${item[attr]}</td>`;
        }
        htmlStr += `<td index=${index} class="tdDel">删除</td>`;
        htmlStr += "</tr>";
    });
    htmlStr += `</tbody>`;
    this.table.innerHTML = htmlStr;

    /* 计算列宽 */
    const tdWidth = this.domRoot.clientWidth / (attrsCount + 2);
    const ths = this.table.querySelectorAll("th");
    for (let i = 0; i < ths.length; i++) {
        ths[i].style.width = tdWidth + "px";
    }
};

/* 事件监听 */
MyTable.prototype.startListen = function () {
    this.table.addEventListener("click", (e) => {
        if (!e.target.classList.contains("tdDel")) {
            return;
        }

        // 拿到序号
        const index = e.target.getAttribute("index") * 1;
        // 删除数据
        this.pageArr.splice(index, 1);
        // 重新渲染
        this.render();
    });
};


/* 表格翻页 */
MyTable.prototype.turn2Page = function (n) {
    console.log("表格翻页", n);

    /* 从总数据当中截取第n页 */
    this.pageArr = this.dataArr.slice((n - 1) * this.pageSize, n * this.pageSize);

    //根据pageArr渲染页面
    this.render();
};