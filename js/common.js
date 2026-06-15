/**
 * common.js - 共享工具：主题初始化 + 语言检测 + localStorage 读写
 * 所有页面共用
 */

(function () {
    'use strict';

    // 注入 Cloudflare Web Analytics（无 cookie，不追踪个人，仅统计匿名访问量与来源）
    function initAnalytics() {
        var s = document.createElement('script');
        s.defer = true;
        s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        s.setAttribute('data-cf-beacon', '{"token": "feedd6b504354cd9a4e81305a0a0b04a"}');
        document.head.appendChild(s);
    }
    initAnalytics();

    // 读取 localStorage 中保存的主题并应用
    function initTheme() {
        try {
            var theme = localStorage.getItem('preferredPreviewTheme') || 'light';
            document.documentElement.setAttribute('data-preview-theme', theme);
        } catch (e) {}
    }

    // 获取应使用的语言（优先 localStorage，其次浏览器语言）
    function getPreferredLanguage() {
        try {
            var saved = localStorage.getItem('preferredLanguage');
            if (saved) return saved;
        } catch (e) {}
        var browserLang = navigator.language || navigator.userLanguage || '';
        return browserLang.startsWith('zh') ? 'zh' : 'en';
    }

    // 保存语言偏好
    function saveLanguage(lang) {
        try { localStorage.setItem('preferredLanguage', lang); } catch (e) {}
    }

    // 保存主题偏好
    function saveTheme(theme) {
        try { localStorage.setItem('preferredPreviewTheme', theme); } catch (e) {}
    }

    // 更新 html lang 属性
    function setPageLang(lang) {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }

    // 暴露到全局
    window.SiteCommon = {
        initTheme: initTheme,
        getPreferredLanguage: getPreferredLanguage,
        saveLanguage: saveLanguage,
        saveTheme: saveTheme,
        setPageLang: setPageLang
    };
})();
