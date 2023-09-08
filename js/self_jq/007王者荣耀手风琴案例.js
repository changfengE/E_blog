$(function() {
    // 鼠标经过某个li有两步操作：
    $('.king li').mouseenter(function() {
        // 1.当前li宽度变为224px， 同时里面的小图片淡出， 大图片淡入
        $(this).stop().animate({
            width: 224
        }).find('.small').stop().fadeOut().siblings('.big').stop().fadeIn();
        // 2.其余li宽度变为69px， 小图片淡入， 大图片淡出
        $(this).siblings('li').stop().animate({
            width: 69
        }).find('.small').stop().fadeIn().siblings('.big').stop().fadeOut();
    });
});