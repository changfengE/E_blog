/*
 * @Author: 3517134128@qq.com 
 * @Email: 3517134128@qq.com
 * @Date: 2023-07-03 19:13:33 
 * @Last Modified by: 3517134128@qq.com
 * @Last Modified time: 2023-07-28 12:08:03
 * @Description: mynormalize侧边栏、返回顶部、去底部
 */
window.onload = function() {
    /* sidebar侧边栏 */
    const sidebar = document.querySelector(".sidebar");
    /* 获取到元素才继续 */
    if (sidebar != null) {
        /* 遮罩层mask */
        const mask = document.querySelector(".mask");

        /* 目录按钮 */
        const catabtn = document.createElement("div");
        catabtn.className = "catalog";
        sidebar.appendChild(catabtn);

        /* 获取sidebar宽度 */
        /* 目录按钮宽度 */
        const catawidth = catabtn.getBoundingClientRect().width;
        let barwidth = sidebar.getBoundingClientRect().width;
        window.addEventListener("resize", function() {
            mask.style.display = "none";
            /* 移动端适配，实时获取sidebar宽度，避免屏幕缩小导致sidebar宽度缩小，而barwidth过大与实际不一致的情况 */
            barwidth = sidebar.getBoundingClientRect().width;
            sidebar.style.left = -barwidth + "px";
            catabtn.style.left = barwidth + "px";
        })
        catabtn.addEventListener("click", function() {
            /* 显示遮罩层 */
            mask.style.display = "block";
            /* 目录按钮动画效果 */
            animate(sidebar, 0);
            animate(catabtn, barwidth - catawidth);
        })

        /* 页面大标题 */
        const h2 = document.querySelector("h2");
        /* 所有的二级标题 */
        const h3s = document.querySelectorAll(".div2 h3");

        /* 创建关闭按钮 */
        const closebtn = document.createElement("i");
        closebtn.className = "close";
        sidebar.appendChild(closebtn);
        /* 关闭按钮点击事件 */
        function hidenav() {
            /* 隐藏遮罩层 */
            mask.style.display = "none";
            animate(sidebar, -barwidth);
            animate(catabtn, barwidth);
        }
        closebtn.addEventListener("click", hidenav);
        mask.addEventListener("click", hidenav);

        /* 创建导航条大标题 */
        const sideBarTitle = document.createElement("h2");
        sideBarTitle.innerHTML = h2.innerHTML;
        sidebar.appendChild(sideBarTitle);

        /* 创建标题list */
        const list = document.createElement("ul");

        /* 循环写入list项 */
        // for (var i = 0; i < h3s.length; i++) {
        //     var newh3 = document.createElement("li");
        //     var newlink = document.createElement("a");
        //     h3s[i].id = "title" + (i + 1);
        //     newlink.href = "#title" + (i + 1);
        //     newlink.innerHTML = h3s[i].innerHTML;
        //     newh3.appendChild(newlink);
        //     list.appendChild(newh3);
        // }
        // sidebar.appendChild(list);

        /* 优化：
        2023年3月21日
        */
        for (let i = 0; i < h3s.length; i++) {
            const newLink = document.createElement("a");
            const newLi = document.createElement("li");
            h3s[i].id = `title${i + 1}`;
            newLink.href = `#title${i + 1}`;
            newLink.innerText = h3s[i].innerText;
            newLi.appendChild(newLink);
            list.appendChild(newLi);
        }
        sidebar.appendChild(list);

        /* 点击导航，页面滚动缓动效果 
        2023年3月28日
        */
        const navLinks = document.querySelectorAll('.sidebar ul li a');
        // 滚动到对应的内容
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetHeading = document.querySelector(targetId);
                window.scrollTo({
                    top: targetHeading.offsetTop,
                    behavior: 'smooth'
                })
            })
        });
        /* 页面滚动缓动效果结束 */
        /* 滚动到页面h3标题位置，对应导航链接样式修改
        2023年3月28日
        */
        // 监听滚动事件，设置对应的导航链接为 active 状态
        const contentHeadings = document.querySelectorAll('h3');
        window.addEventListener('scroll', () => {
            let fromTop = window.scrollY;

            contentHeadings.forEach(heading => {
                if (fromTop > heading.offsetTop - 100) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${heading.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // 触发一次滚动事件，确保页面加载完毕后正确设置导航链接的状态
        window.dispatchEvent(new Event('scroll'));

        /* 滚动到页面h3标题位置，对应导航链接样式修改结束 */

        /* 禁止页面滚动 */
        sidebar.addEventListener("mouseenter", function() {
            let widthBar = 0,
                root = document.documentElement;
            if (typeof window.innerWidth == 'number') {
                widthBar = window.innerWidth - root.clientWidth;
            }
            root.style.overflow = 'hidden';
            /* 隐藏滚动条，用相同宽度的边框代替，避免页面闪烁 */
            root.style.borderRight = widthBar + 'px solid transparent';
        })
        sidebar.addEventListener("mouseleave", function() {
            let root = document.documentElement;
            root.style.overflow = '';
            root.style.borderRight = '';
        })
    }
    /* sidebar侧边栏结束 */

    /* backtop返回顶部，godown直达底部模块 
    2023年3月14日
    */
    // 封装显示隐藏功能
    function hideornot(obj, target, edge) {
        // 三个参数：功能对象，目标值，临界值
        // 判断
        // 若页面滚动距离大于等于设计距离
        if (target >= edge) {
            // 则显示按钮
            obj.style.display = 'block';
        } else {
            // 否则隐藏
            obj.style.display = 'none';
        }
    }
    // 点击返回顶部
    function topclick() {
        let s = document.documentElement.scrollTop;
        // 定时器 每10ms执行一次
        let timer = window.setInterval(function() {
            // 每次走100
            s -= 100;
            //  到顶部后清除定时器  必须清定时器  不然就死循环了
            if (s < 0) {
                window.clearInterval(timer);
            }
            window.scrollTo(0, s);
        }, 10);
        // 搭配jQuery使用
        // $('body,html').stop().animate({
        //     scrollTop: 0
        // });
    }
    // 点击直达底部
    function bottomclick() {
        let st = document.documentElement.scrollTop;
        let sh = document.documentElement.scrollHeight;
        let bottomdis = sh - st;
        // 定时器 每10ms执行一次
        let timer = window.setInterval(function() {
            // 每次走100
            bottomdis -= 100;
            st += 100;
            //  到顶部后清除定时器  必须清定时器  不然就死循环了
            if (bottomdis 