/**
 * legal.js - 法律页面专用脚本（privacy.html / terms.html）
 * 主题初始化 + 语言切换（innerHTML 版本，保留 HTML 标签）
 */

(function () {
    'use strict';

    // 语言切换（使用 innerHTML 以保留 data-zh/data-en 中的 HTML 标签）
    function switchLanguage(lang) {
        if (!lang) {
            lang = document.getElementById('languageSelect').value;
        }
        var elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(function (element) {
            element.innerHTML = element.getAttribute('data-' + lang);
        });
        SiteCommon.setPageLang(lang);
        SiteCommon.saveLanguage(lang);
    }

    function init() {
        SiteCommon.initTheme();

        var lang = SiteCommon.getPreferredLanguage();
        document.getElementById('languageSelect').value = lang;
        switchLanguage(lang);

        // 绑定语言切换事件
        document.getElementById('languageSelect').addEventListener('change', function () {
            switchLanguage(this.value);
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
