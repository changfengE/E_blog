document.addEventListener('DOMContentLoaded', function () {
    var links = ['https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css', 'https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.css'];
    var scripts = ['https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js', 'https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js'];

    function loadCss(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    function loadScript(src) {
        var script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    }

    function loadPrism() {
        for (var i = 0; i < links.length; i++) {
            loadCss(links[i]);
        }
        for (var j = 0; j < scripts.length; j++) {
            loadScript(scripts[j]);
        }
    }

    loadPrism();
});
