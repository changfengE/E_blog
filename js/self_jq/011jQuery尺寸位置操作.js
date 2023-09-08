$(function() {
    // 1.width()/height()，元素width和height
    var ol = $("<ol class="sizedetail"></ol>");
    $('.jqsize').after(ol);
    $('.sizedetail').append("<li>width=" + $('.jqsize').width() + "</li>");
    // width()里面带参数则为修改
    // $('.jqsize').width(110);

    // 2.innerWidth()/innerHeight()，元素width+padding
    $('.sizedetail').append("<li>innerWidth=width+padding=" + $('.jqsize').innerWidth() + "</li>");

    // 3.outerWidth()/outerHeight()，元素width+padding+border
    $('.sizedetail').append("<li>outerWidth=width+padding+border=" + $('.jqsize').outerWidth() + "</li>");

    // 4.outerWidth(true)/outerHeight(true)，元素width+padding+border+margin
    $('.sizedetail').append("<li>outerWidth(true)=width+padding+border+margin=" + $('.jqsize').outerWidth(true) + "</li>");
})