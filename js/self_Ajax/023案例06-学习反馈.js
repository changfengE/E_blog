/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
// 1.1省份数据
axios({
    url: 'http://hmajax.itheima.net/api/province'
}).then(res => {
    console.log(res);
    const optionStr = res.data.list.map(pname => {
        return `<option value="${pname}">${pname}</option>`
    }).join('')
    document.querySelector('.province').innerHTML = `<option value>省份</option>` + optionStr;
    // 1.2切换省份，设置城市，清空地区
    document.querySelector('.province').addEventListener('change', async function(e) {
        // 获取用户选择的省份
        const res = await axios({
            url: 'http://hmajax.itheima.net/api/city',
            params: {
                pname: e.target.value
            }
        })
        console.log(res);
        const cityStr = res.data.list.map(cname => {
            return `<option value="${cname}">${cname}</option>`
        }).join('')
        document.querySelector('.city').innerHTML = `<option value>城市</option>` + cityStr;

        // 清空地区
        document.querySelector('.area').innerHTML = `<option value>地区</option>`;
    });
    // 1.3切换地区
    document.querySelector('.city').addEventListener('change', async function(e) {
        const res = await axios({
            url: 'http://hmajax.itheima.net/api/area',
            params: {
                pname: document.querySelector('.province').value,
                cname: e.target.value
            }
        })
        const areaStr = res.data.list.map(areaname => {
            return `<option value="${areaname}">${areaname}</option>`
        }).join('')
        document.querySelector('.area').innerHTML = `<option value>地区</option>` + areaStr
    })
});
/* 
 * 目标2：收集数据提交保存
 * 2.1监听按钮点击事件
 * 2.2form-serialize收集数据
 * 2.3提交保存，显示结果
 */
// 2.1监听按钮点击事件
document.querySelector('.submit').addEventListener('click', async function() {
    // 2.2收集表单数据
    const form = document.querySelector('.info-form')
    const data = serialize(form, { hash: true, empty: true })
    console.log(data);
    // 2.3提交保存
    try {
        const res = await axios({
            url: 'http://hmajax.itheima.net/api/feedback',
            method: 'post',
            data
        })
        console.log(res);
        alert(res.data.message)
    } catch (err) {
        console.dir(err);
        alert(err.response.data.message)
    }
})