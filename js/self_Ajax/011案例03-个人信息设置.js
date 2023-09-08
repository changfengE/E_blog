/* 
目标1：信息渲染
1.1获取用户数据
1.2回显数据到标签上
*/
// 1.1获取用户数据
const creator = 'changfeng_E'
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(res => {
    console.log(res);
    const userObj = res.data.data;
    // 1.2数据回显
    Object.keys(userObj).forEach(key => {
        if (key === 'avatar') {
            // 赋予默认头像
            document.querySelector('.prew').src = userObj[key]
        } else if (key === 'gender') {
            // 赋予默认性别
            // 获取性别单选框：[男radio，女radio]
            const gRadioList = document.querySelectorAll('.gender');
            // 获取性别数字0男1女
            const gNum = userObj[key]
                // 通过性别数字作为下标找到对应性别单选框，设置选中
            gRadioList[gNum].checked = true
        } else {
            // 赋予默认内容
            document.querySelector(`.${key}`).value = userObj[key]
        }
    })
})

/* 
目标2：修改头像
2.1获取头像文件
2.2提交服务器并更新头像
*/
// 文件选择元素绑定change事件
document.querySelector('.upload').addEventListener('change', function(e) {
    // 2.1获取图片文件
    const imgfile = e.target.files[0];
    // FormData携带图片文件
    const fd = new FormData()
    fd.append('avatar', imgfile)
    fd.append('creator', creator);
    // 2.2提交服务器，更新头像
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'put',
        data: fd
    }).then(res => {
        console.log(res);
        const imgUrl = res.data.data.avatar
        document.querySelector('.prew').src = imgUrl
    })
})

/* 
目标3：信息修改
3.1收集表单信息
3.2提交服务器保存
*/
// 点击提交修改信息
document.querySelector('.submit').addEventListener('click', function() {
    // 3.1收集表单数据
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, { hash: true, empty: true })
    console.log(userObj);
    // 性别数字字符串，转成数字类型
    userObj.gender = +userObj.gender
    console.log(userObj);
    // 3.2提交服务器
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'put',
        data: {
            ...userObj,
            creator
        }
    }).then(res => {
        console.log(res);
        // toast操作成功提示框
        const toastDom = document.querySelector('.my-toast');
        const toast = new bootstrap.Toast(toastDom);
        toast.show()
    })
})