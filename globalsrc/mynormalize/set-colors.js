/* 动态设置自定义颜色模块
    2023年3月13日
    */
// 1.获取所有自定义色块
var color_con = document.querySelector(".my-color");
var r_colors = color_con.querySelectorAll('li');
// 2.循环改写色块背景色，值即为获取到的色块内容
for (var i = 0; i < r_colors.length; i++) {
    r_colors[i].style.backgroundColor = 'var(' + r_colors[i].innerHTML + ')';
}
/* 动态设置自定义颜色模块结束 */