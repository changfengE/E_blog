// 随机颜色

function getRandomColor(flag = true) {
    let str
    let colorArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
        // 每次调用，清空str
    str = '#'
    if (flag) {
        // 若true，返回16进制
        // 抽6次累加到str
        for (let i = 0; i < 6; i++) {
            let next = colorArr[Math.floor(Math.random() * colorArr.length)]
            str += next
        }
        return str
    } else {
        // 否则，返回rgb格式
        let r = Math.floor(Math.random() * (255 + 1))
        let g = Math.floor(Math.random() * (255 + 1))
        let b = Math.floor(Math.random() * (255 + 1))
        return `rgb(${r},${g},${b})`
    }
}