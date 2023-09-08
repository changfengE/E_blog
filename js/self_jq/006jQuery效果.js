$(function() {
    /* 显示隐藏 */
    $(".showhide .show").click(function() {
        $(this).siblings(".testbox").show(1000);
    });
    $(".showhide .hide").click(function() {
        $(this).siblings(".testbox").hide(1000);
    });
    $(".showhide .toggle").click(function() {
        $(this)
            .siblings(".testbox")
            .toggle(1000, function() {
                alert("已切换");
            });
    });

    /* 滑动 */
    $(".slide .down").click(function() {
        $(this).siblings(".testbox").slideDown();
    });
    $(".slide .up").click(function() {
        $(this).siblings(".testbox").slideUp();
    });
    $(".slide .toggle").click(function() {
        $(this).siblings(".testbox").slideToggle();
    });

    /* 淡入淡出 */
    $(".fade .in").click(function() {
        $(this).siblings(".testbox").fadeIn(1000);
    });
    $(".fade .out").click(function() {
        $(this).siblings(".testbox").fadeOut(500);
    });
    $(".fade .toggle").click(function() {
        $(this).siblings(".testbox").fadeToggle();
    });
    $(".fade .fadeto").click(function() {
        // 速度和透明度必写
        $(this).siblings(".testbox").fadeTo(1000, 0.5);
    });

    /* 高亮当前li案例 */
    $(".highlight li").hover(
        function() {
            // over
            $(this).siblings().stop().fadeTo(400, 0.5);
        },
        function() {
            // out
            $(this).siblings().stop().fadeTo(400, 1);
        }
    );
    /* 高亮当前li案例结束 */

    /* 自定义动画 */
    $(".move button").click(function() {
        $(".move .testbox").animate({
                marginLeft: 200,
                marginTop: 40,
                opacity: 0.4,
                width: 200,
            },
            500
        );
    });
});