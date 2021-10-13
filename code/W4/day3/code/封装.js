function jiaoyan(callBack) {
    let nameReg = /^[\u4e00-\u9fa5]{2,4}$/
    let phoneReg = /^\d{11}$/
    let emailReg = /^([a-zA-Z\d][\w-]{2,}@[\w]{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/

    btn.addEventListener(
        "click",
        e => {
            //获取文本
            let nameStr = ipName.value;
            let phoneStr = ipPhone.value;
            let emailStr = ipEmail.value;

            /* 获取结果 */
            let retName = nameReg.test(nameStr)
            let retPhone = phoneReg.test(phoneStr)
            let retEmail = emailReg.test(emailStr)

            //检测名字
            if (!retName) {
                spName.style.display = "inline-block"
            } else {
                spName.style.display = "none"
            }

            /* 检测手机号码 */
            if (!retPhone) {
                spPhone.style.display = "inline-block"
            } else {
                spPhone.style.display = "none"
            }

            //检测邮箱
            if (!retEmail) {
                spEmail.style.display = "inline-block"
            } else {
                spEmail.style.display = "none"
            }

            //全部通过就跳转
            if (retName && retPhone && retEmail) {
                callBack()
            }
        }
    )
}