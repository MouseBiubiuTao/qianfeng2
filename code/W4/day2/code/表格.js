function MyTable(domRoot, dataArr = [], pageSize = 10) {
    this.domRoot = domRoot;
    this.dataArr = dataArr;
    this.pageSize = pageSize;
    this.domRoot.innerHTML = `<table border=1 cellspacing=0></table>`
    //找到table
    this.table = this.domRoot.querySelector("table")

    //重新渲染
    this.render()

    //事件监听
    this.startListen()
}

MyTable.prototype.render = function () {

    if (!this.dataArr.length) {
        this.table.style.display = "none"
        return
    }

    this.table.style.display = "block"


    let htmlStr = `<thead><tr><th>ID</th>`
    let attrsCount = 0;
    for (let attr in this.dataArr) {
        htmlStr += `<th>${attr}</th>`
        attrsCount++;
    }
    htmlStr += `<th>action</th></tr></thead><tbody>`




    this.dataArr.forEach(
        (item, index) => {

            htmlStr += `<td>${index+1}</td>`;
            for (let attr in item) {
                htmlStr += `<td>${item[attr]}</td>`;
            }
            htmlStr += `<td index=${index} class="tdDel">删除</td>`;
            htmlStr += "</tr>";
        }
    );
    htmlStr += `</tbody>`;
    //将htmlStr加到table的结构中
    this.table.innerHTML = htmlStr

    const tdWidth = this.domRoot.clientWidth / (attrsCount + 2)
    const ths = this.table.getAttributeAll("th")
    for (let i = 0; i < ths.length; i++) {
        ths[i].style.Width = tdWidth + "px";
    }

}

MyTable.prototype.startListen = function () {
    this.table.addEventListener(
        "click",
        e => {
            //如果点击的不是删除，则什么也不做
            if (!e.target.classList.contains("tdDel")) {
                return;
            }
            //获取点击的行的index
            const index = e.target.getAttribute("index") * 1;
            //删除点击的行
            this.dataArr.splice(index, 1)
            //重新渲染
            this.render();
        }
    )
}

MyTable.prototype.turn2Page = function (n) {
    console.log("表格翻到了", n);
    this.dataArr = this.dataArr.slice((n - 1) * this.pageSize, n * this.pageSize);
    this.render()
}