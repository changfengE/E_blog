/*
 * @Author: 3517134128@qq.com 
 * @Email: 3517134128@qq.com
 * @Date: 2023-03-28 21:09:40 
 * @Last Modified by: 3517134128@qq.com
 * @Last Modified time: 2023-04-14 18:45:39
 * @Description: jQuery选择器
 */
$(function() {
    /* 类选择器 */
    $('.sec')[0].style.backgroundColor = 'var(--pink)';
    /* 类选择器 */
    /* id选择器 */
    $('#thi')[0].style.backgroundColor = 'var(--red)';
    /* id选择器 */
    /* 后代选择器 */
    $('.jqsel1 li:nth-child(4)').css('color', 'var(--yellow)');
    /* 后代选择器 */
    /* 隐式迭代，子代选择器 */
    $('.jqsel1>li').css('border-bottom', '5px solid #ccc');
    /* 隐式迭代，子代选择器 */

    /* 筛选选择器 */
    $('.jqsel2 li:first').css('color', 'red');
    $('.jqsel2 li:last').css('color', 'var(--yellow)');
    $('.jqsel2 li:eq(1)').css('background-color', 'var(--red)');
    $('.jqsel2 li:odd').css('font-size', '12px');
    $('.jqsel2 li:even').css('font-size', '18px');
    /* 筛选选择器 */

    /* 案例新浪下拉菜单 */
    $('.nav').parent().css('height', '300px');
    // 提前隐藏下拉项
    $('.nav>li ul').hide();
    /*     // 鼠标经过
        $('.nav>li').mouseover(function() {
            // $(this) jQuery当前元素，this不加引号
            $(this).children('ul').show(); //show()显示元素 hide()隐藏
        });
        // 鼠标离开
        $('.nav>li').mouseout(function() {
            $(this).children('ul').hide();
        }); */
    // 1.事件切换hover就是鼠标经过和离开的复合写法
    /* $('.nav>li').hover(function() {
        // over
        $(this).children('ul').slideDown(500);
    }, function() {
        // out
        $(this).children('ul').slideUp(500);
    }); */
    // 2.事件切换hover若只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数
    $('.nav>li').hover(function() {
        // stop()方法必须写到动画前面
        $(this).children('ul').stop().slideToggle(500);
    });
    /* 案例新浪下拉菜单结束 */

    /* 案例-排他思想 */
    // 1.隐式迭代，给所有按钮都绑定了点击事件
    $('button').click(function(e) {
        e.preventDefault();
        // 2.当前的元素变化背景色
        // $(this).css('background', 'var(--pink)');
        // 3.其余的兄弟去掉背景色，隐式迭代
        // $(this).siblings('button').css('background', '');

        // 链式编程
        $(this).css('background', 'var(--pink)').siblings().css('background', '');
    });
    /* 案例-排他思想结束 */
})