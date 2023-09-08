//flexible.js源码如下；
(function flexible(window, document) { //首先是一个立即执行函数，执行的时候传入参数window,document
    var docEl = document.documentElement //返回文档的root元素，即根元素html

    // dpr 物理像素比
    var dpr = window.devicePixelRatio || 1 //获取设备的dpr，即当前设置下物理像素与虚拟像素的比值


    //调整body标签的fontSize
    //设置默认字体的大小，默认字体的大小继承自body
    function setBodyFontSize() {
        // 若页面中有body元素，就设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            // 若没有body元素，则1等着页面主要的DOM元素加载完毕再去设置body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    //设置 1rem = viewWidth / 10
    // 设置html元素的文字大小
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit();

    //在页面resize或者pageshow重新设置rem
    // 页面尺寸大小发生变化时，重新设置rem的大小
    window.addEventListener('resize', setRemUnit)
        // pageshow 是重新加载页面触发的事件
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) { //某些浏览器，重新展示页面时，走的是页面展示缓存
            // e.persisted 返回的是true 就是说若这个页面是从缓存取过来的页面，也需要重新计算一下rem的大小
            setRemUnit();
        }
    })


    // 有些移动端的浏览器不支持0.5像素的写法
    //检测0.5px的支持，支持则root元素的class有hairlines
    //解决1px在高清屏多像素问题
    if (dpr >= 2) {
        var fakeBody = document.createElement('doby');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))