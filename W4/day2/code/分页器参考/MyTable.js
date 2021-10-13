function MyTable(root, arr,canDelete=false) {
    this.root = root
    this.arr = arr
    this.canDelete = canDelete

    this.renderPage()
    // this.bindEvent()
}

MyTable.prototype.renderPage = function () {

    // 清空tbody的内容
    this.root.innerHTML = ""

    // 预定义tobody的HTML结构字符串
    var htmlStr = ""

    // 遍历数据
    this.arr.forEach(function (studentObj, index) {
        // 每个学生 动态造一个tr
        // 如果数据的序号为奇数 则当前行加入行内样式 定义其背景色为灰色
        // var tr = `<tr ${index%2===1?"style='background-color:#ccc'":""}>`

        // 如果数据的序号为奇数 则当前行加入行内样式 定义其背景色为灰色
        var tr
        if (index % 2 === 1) {
            tr = "<tr style='background-color:#ccc'>"
        } else {
            tr = "<tr>"
        }

        // 加入序号td
        tr += `<td>${index + 1}</td>`

        // 遍历学生属性 每个属性造一个td
        for (var attr in studentObj) {
            var td = `<td>${studentObj[attr]}</td>`
            tr += td
        }

        // 加入删除操作td
        if(this.canDelete){
            tr += `<td class="btnDel">删除</td>`
        }

        // 将造出来的tr/td拼接到htmlStr
        tr += "</tr>"
        htmlStr += tr
    })

    // 给tbody设置innerHTML
    this.root.innerHTML = htmlStr
}

MyTable.prototype.bindEvent = function () {
    /* 删除按钮监听 */
    // 找出所有class为btnDel的元素
    var btns = document.getElementsByClassName("btnDel")

    // 保存mt的实例this
    const mtThis = this

    // 绑定click监听
    for (var i = 0; i < btns.length; i++) {

        // 将当前的序号记录下来
        btns[i].setAttribute("index", i)

        btns[i].onclick = function () {
            // 删除对应的数据
            arr.splice(this.getAttribute("index"), 1)

            // 重新渲染页面
            mtThis.renderPage()

            // 重新绑定事件监听
            mtThis.bindEvent()
        }
    }


}

/* 修改数据 */
MyTable.prototype.setData = function(arr){
    this.arr = arr
    this.renderPage()
}