// 1.1定义函数，接收配置对象，返回Promise对象
function myAxios(config) {
    return new Promise((resolve, reject) => {
        // 1.2发起XHR请求，默认请求方法GET
        const xhr = new XMLHttpRequest();
        // 2.1判断是否有params选项，携带查询参数
        if (config.params) {
            // 2.2使用URLSearchParams
            const paramsObj = new URLSearchParams(config.params)
            const queryString = paramsObj.toString();
            // 查询参数字符串拼接到url
            config.url += `?${queryString}`
        }
        xhr.open(config.method || 'GET', config.url)
        xhr.addEventListener('loadend', function() {
            // 1.3调用成功/失败的处理程序
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response))
            } else {
                reject(new Error(xhr.response))
            }
        });
        // 3.1判断是否有data选项，携带请求体
        if (config.data) {
            // 3.2接口要求传参为JSON字符串，转换类型
            const dataStr = JSON.stringify(config.data)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(dataStr)
        } else {
            // 若没有请求体数据，则正常发送
            xhr.send()
        }
    })
}