function YourTable(domRoot, dataObj) {
    this.domRoot = domRoot;
    this.arr = dataObj.data;
    this.heads = dataObj.heads;
    this.position = dataObj.position;
    
    // 数据变化回调函数（用于通知主程序数据的变化）
    this.onDataChangeCallback = dataObj.onDataChangeCallback;

    // 当前页已经没有数据了（删完了） 通知主程序翻页
    this.onPageDataClearCallback = dataObj.onPageDataClearCallback

    // 绘制基础内容
    this.renderBasic();

    // 找出tbody
    this.tbody = domRoot.querySelector("tbody");

    // 根据数据绘制很多的tr丢入this.tbody
    this.renderData();

    // 绑定事件监听
    this.bindEvent();
}

/* 设置数据arr */
// YourTable.prototype.setData = function(arr){
//     this.arr = arr;

//     // 根据数据绘制很多的tr丢入this.tbody
//     this.renderData();

//     // 绑定事件监听
//     this.bindEvent();
// };

/* 设置数据的起止位置 */
YourTable.prototype.setPosition = function (position) {
    this.position = position;
    this.renderData();
};

/* 绘制基础内容 */
YourTable.prototype.renderBasic = function () {
    /* 拼接heads组成的th结构 */
    let headsStr = "";
    this.heads.forEach((head) => {
        headsStr += `<th>${head}</th>`;
    });

    this.domRoot.innerHTML = `
<table cellspacing="0">
<thead>
<tr>${headsStr}</tr>
</thead>
<tbody>
</tbody>
</table>
    `;
};

/* 渲染数据 */
YourTable.prototype.renderData = function () {
    // 清空tbody的内容
    this.tbody.innerHTML = "";

    // 预定义tobody的HTML结构字符串
    var htmlStr = "";

    console.log("renderData", this.position[0], this.position[1]);
    console.log(
        "renderData",
        this.arr.slice(this.position[0], this.position[1])
    );

    // 遍历数据
    for (let index = this.position[0]; index < this.position[1]; index++) {
        const studentObj = this.arr[index];
        if(!studentObj){
            break
        }

        // 每个学生 动态造一个tr
        // 如果数据的序号为奇数 则当前行加入行内样式 定义其背景色为灰色
        // var tr = `<tr ${index%2===1?"style='background-color:#ccc'":""}>`

        // 如果数据的序号为奇数 则当前行加入行内样式 定义其背景色为灰色
        var tr;
        if (index % 2 === 1) {
            tr = "<tr style='background-color:#ccc'>";
        } else {
            tr = "<tr>";
        }

        // 加入序号td
        tr += `<td>${index + 1}</td>`;

        // 遍历学生属性 每个属性造一个td
        for (var attr in studentObj) {
            var td = `<td>${studentObj[attr]}</td>`;
            tr += td;
        }

        // 加入删除操作td
        tr += `<td class="btnDel" index="${index}">删除</td>`;

        // 将造出来的tr/td拼接到htmlStr
        tr += "</tr>";
        htmlStr += tr;
    }

    // 给tbody设置innerHTML
    this.tbody.innerHTML = htmlStr;
};

/* 绑定事件监听 */
YourTable.prototype.bindEvent = function () {
    const ytThis = this;

    /* 删除按钮监听 */
    this.tbody.onclick = function (e) {
        if (e.target.classList.contains("btnDel")) {
            const index = e.target.getAttribute("index") * 1;
            ytThis.deleteData(index)
        }
    };
};

/* 删除数据 */
YourTable.prototype.deleteData = function (index) {
    // console.log(e.target.getAttribute("index")*1);
    this.arr.splice(index, 1);
    this.renderData();

    // 让主程序知道数据变化
    if (this.onDataChangeCallback) {
        this.onDataChangeCallback();
    }

    // 如果发现当前页已经没有数据 通知主程序翻页
    if(!this.arr[this.position[0]]){
        this.onPageDataClearCallback()
    }
};
