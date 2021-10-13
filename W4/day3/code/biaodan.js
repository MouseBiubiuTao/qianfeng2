// ·封装一个注册表单插件，包含姓名、手机号、邮箱
// ·点击提交时自动进行合法性校验，对于不合法的字段以红字提示
// ·全部合法时，回调主程序函数进行页面跳转
function register(callback) {
    const inp1 = document.getElementById("inp1")
    const inp2 = document.getElementById("inp2")
    const inp3 = document.getElementById("inp3")
    const btn = document.getElementById("btn")
    // 姓名
    const reg1 = /^[\u4e00-\u9fa5]{2,4}$/
    // 电话
    const reg2 = /^1[3456789]\d{9}$/
    // 邮箱
    const reg3 = /^([0-9a-zA-Z]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/

    btn.addEventListener(
        "click",
        e => {
            if (!reg1.test(inp1.value)) {
                inp1.nextElementSibling.innerText = "您输入的姓名格式不正确，请重新输入！"
            } 
            else if (!reg2.test(inp2.value)) {
                inp2.nextElementSibling.innerText = "您输入的电话号码格式不正确，请重新输入！"
            } 
            else if (!reg3.test(inp3.value)) {
                inp3.nextElementSibling.innerText = "您输入的邮箱号码格式不正确，请重新输入！"
            } 
            else if ((reg1.test(inp1.value)) && (reg2.test(inp2.value)) && (reg3.test(inp3.value))) {
                callback()
            }
        }
    )
}

