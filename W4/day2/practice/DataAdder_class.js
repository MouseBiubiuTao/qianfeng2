class DataAdder {
    /* 构造器/构造函数 创建DataAdder实例*/
    constructor(domRoot, arr, onDataChangeCallback) {
        // 继承父类对domRoot, arr的处理
        // super(domRoot, arr)

        /* 接收属性 */
        this.domRoot = domRoot;
        this.arr = arr;
        this.onDataChangeCallback = onDataChangeCallback;

        /* 渲染页面 */
        this.renderPage();

        /* 绑定事件 */
        this.bindEvent();
    }

    /* 实例方法 */
    renderPage() {
        this.domRoot.innerHTML = `
        <div><input type="text" placeholder="请输入姓名" id="ipName"><span>提示信息</span></div>
        <div><input type="text" placeholder="请输入年龄" id="ipAge"><span>提示信息</span></div>
        <div><input type="text" placeholder="请输入性别" id="ipGender"><span>提示信息</span></div>
        <div><input type="text" placeholder="请输入班级" id="ipClass"><span>提示信息</span></div>
        <div><input type="text" placeholder="请输入薪水" id="ipSalary"><span>提示信息</span></div>
        <button id="btn">提交</button>    
        `;

        this.btn = this.domRoot.querySelector("#btn");
        this.ipName = this.domRoot.querySelector("#ipName");
        this.ipAge = this.domRoot.querySelector("#ipAge");
        this.ipGender = this.domRoot.querySelector("#ipGender");
        this.ipClass = this.domRoot.querySelector("#ipClass");
        this.ipSalary = this.domRoot.querySelector("#ipSalary");
    }

    /* 实例方法 */
    bindEvent() {
        const daThis = this;

        this.btn.onclick = function (e) {
            console.log("btn");

            const stu = new Student(
                daThis.arr[arr.length - 1].id * 1 + 1,
                daThis.ipName.value,
                daThis.ipAge.value * 1,
                daThis.ipGender.value,
                daThis.ipClass.value,
                daThis.ipSalary.value
            );

            daThis.arr.push(stu);
            // console.log(daThis.arr);

            // 通知主程序数据变化
            daThis.onDataChangeCallback && daThis.onDataChangeCallback();
            // if(daThis.onDataChangeCallback){
            //     daThis.onDataChangeCallback()
            // }
        };
    }
}
