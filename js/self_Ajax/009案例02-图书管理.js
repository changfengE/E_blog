/* 
目标1：渲染图书列表
1.1获取数据
1.2渲染数据
*/
// 封装渲染函数
// 外号
const creator = 'changfeng_E'

function getBookList() {
    // 1.1获取数据
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            creator
        }
    }).then(res => {
        console.log(res);
        const bookList = res.data.data;
        console.log(bookList);
        // 渲染数据
        const htmlStr = bookList.map((item, idx) => {
            return `<tr>
        <td>${idx+1}</td>
        <td>${item.bookname}</td>
        <td>${item.author}</td>
        <td>${item.publisher}</td>
        <td data-id="${item.id}">
            <span class="del">删除</span>
            <span class="edit">编辑</span>
        </td>
    </tr>`
        }).join('')
        document.querySelector('.list').innerHTML = htmlStr
    })
}
// 页面加载渲染
getBookList()

/* 
目标2：新增图书
2.1新增弹框-显示隐藏
2.2收集表单数据，提交服务器保存
2.3刷新，重新渲染
*/
// 2.1创建弹框对象
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom);
// 保存按钮点击事件
document.querySelector('.add-btn').addEventListener('click', function() {
    const addForm = document.querySelector('.add-form')
    const bookObj = serialize(addForm, { hash: true, empty: true })
    console.log(bookObj);
    // 提交到服务器
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'post',
        data: {
            // 需要传入的参数与表单数据相比只多一个creator，可以使用展开运算符展开bookObj，再加上一个creator即可
            // 当然用对象解构也可
            ...bookObj,
            creator
        }
    }).then(res => {
        console.log(res);
        // 2.3添加成功后重新渲染
        getBookList();
        // 重置表单
        addForm.reset();
        // 隐藏modal
        addModal.hide()
    });
});
/* 
目标3：删除图书
3.1删除元素点击事件->获取图书id
3.2调用删除接口
3.3删除图书列表
*/
// 3.1删除元素点击事件绑定
// 删除元素为动态创建的，所以点击事件使用事件委托来绑定，委托到父级.list上
document.querySelector('.list').addEventListener('click', function(e) {
    // 获取触发事件的目标元素
    const del = e.target
    console.log(del);
    // 若是删除元素则可删除
    if (del.classList.contains('del')) {
        console.log('点击了删除元素');
        // 获取图书id（自定义属性id）
        const bookId = del.parentNode.dataset.id
        console.log(bookId);
        // 3.2调用删除接口
        axios({
            url: `http://hmajax.itheima.net/api/books/${bookId}`,
            method: 'delete'
        }).then(res => {
            console.log(res);
            // 刷新页面
            getBookList()
        })
    }
});
/* 
目标4：编辑图书
4.1编辑弹框，显示隐藏
4.2获取当前编辑图书数据-回显到编辑表单中
4.3提交保存修改，并刷新列表
*/
// 4.1编辑弹框-显示隐藏
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom);
// 编辑元素点击事件
document.querySelector('.list').addEventListener('click', function(e) {
    const edit = e.target
    console.log(edit.classList);
    if (edit.classList.contains('edit')) {
        console.log('点击了编辑元素');
        // 4.2获取图书数据回显到编辑表单
        const bookId = edit.parentNode.dataset.id;
        console.log(bookId);
        axios({
            url: `http://hmajax.itheima.net/api/books/${bookId}`
        }).then(res => {
            console.log(res);
            const bookObj = res.data.data;
            // 数据对象的属性和标签类名一致
            // 遍历数据对象，使用属性去获取对应的标签，快速赋值
            const keys = Object.keys(bookObj)
            keys.forEach(key => {
                document.querySelector(`.edit-form .${key}`).value = bookObj[key]
            })
        })
        editModal.show()
    }
});
// 修改按钮-点击-隐藏弹框
document.querySelector('.edit-btn').addEventListener('click', function() {
    // 4.3提交保存修改，刷新列表
    const editForm = document.querySelector('.edit-form')
    const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true });
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'put',
        data: {
            bookname,
            author,
            publisher,
            creator
        }
    }).then(res => {
        // 修改成功后，重新获取并刷新列表
        getBookList()
            // 隐藏弹框
        editModal.hide()
    })
})