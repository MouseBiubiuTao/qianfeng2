function DataAdder(domRoot,arr) {
    /* 接收属性 */
    this.domRoot = domRoot;
    this.arr = arr

    /* 渲染页面 */
    this.renderPage();

    /* 绑定事件 */
    this.bindEvent();
}

DataAdder.prototype.renderPage = function (e) {
    this.domRoot.innerHTML = `
    <input type="text" palceholder="请输入姓名" id="ipName"><br>
    <input type="text" palceholder="请输入年龄" id="ipAge"><br>
    <input type="text" palceholder="请输入性别" id="ipGender"><br>
    <input type="text" palceholder="请输入班级" id="ipClass"><br>
    <input type="text" palceholder="请输入薪水" id="ipSalary"><br>
    <button id="btn">提交</button>    
    `;

    this.btn = this.domRoot.querySelector("#btn")
    this.ipName = this.domRoot.querySelector("#ipName")
    this.ipAge = this.domRoot.querySelector("#ipAge")
    this.ipGender = this.domRoot.querySelector("#ipGender")
    this.ipClass = this.domRoot.querySelector("#ipClass")
    this.ipSalary = this.domRoot.querySelector("#ipSalary")
};

DataAdder.prototype.bindEvent = function (e) {
    const daThis = this
    this.btn.onclick = function (e) {
        console.log("btn");
        const stu = new Student(
            daThis.arr[arr.length - 1].id + 1,
            daThis.ipName.value,
            daThis.ipAge.value * 1,
            daThis.ipGender.value,
            daThis.ipClass.value,
            daThis.ipSalary.value
        );
        daThis.arr.push(stu);
        // console.log(arr);
    };
};
