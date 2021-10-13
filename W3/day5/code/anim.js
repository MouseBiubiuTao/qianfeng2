function animate(element, targetObj, timeCost, callback) {
    const regUnit = /^\-?\d+(\.\d+)?([a-z]*)$/

    for (let attr in targetObj) {
        const attrUnit = regUnit.exec(targetObj[attr])[2]

        let attrValue = parseFloat(getComputedStyle(element)[attr])

        const attrSpeed = (parseFloat(targetObj[attr]) - attrValue) / (timeCost / 40)

        targetObj[attr] = [targetObj[attr], attrUnit, attrSpeed, attrValue]
    }
    // console.log(targetObj);

    let timerId = setInterval(() => {
        for (let attr in targetObj) {
            const attrUnit = targetObj[attr][1]
            const attrSpeed = targetObj[attr][2]
          
            targetObj[attr][3] += attrSpeed
            element.style[attr] =targetObj[attr][3] + attrUnit
        }
    }, 40);

    setTimeout(() => {
        timerId && clearInterval(timerId)

        for (let attr in targetObj) {
            element.style[attr] = targetObj[attr][0]
        }

        callback && callback()
    }, timeCost);
}