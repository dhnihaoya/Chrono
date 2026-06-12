/**
 * index.js - 首页专用脚本
 * 资源路径管理、截图更新、主题切换、语言切换
 */

(function () {
    'use strict';

    var currentLang = 'zh';
    var currentTheme = 'light';

    // ===== 资源路径映射 =====
    // icon 不跟语言走，直接放 assets/{theme}/icon.{ext}
    var ICON_EXT = { light: 'jpg', dark: 'png' };
    // 截图按 theme/lang 区分
    var ASSET_EXT = {
        main:         { light: { zh: 'jpg', en: 'png' }, dark: { zh: 'png', en: 'png' } },
        add_schedule: { light: { zh: 'jpg', en: 'png' }, dark: { zh: 'png', en: 'png' } },
        focus:        { light: { zh: 'jpg', en: 'png' }, dark: { zh: 'png', en: 'png' } },
        insight:      { light: { zh: 'jpg', en: 'png' }, dark: { zh: 'png', en: 'png' } },
        mine:         { light: { zh: 'jpg', en: 'png' }, dark: { zh: 'png', en: 'png' } },
        widgets:      { light: { zh: 'png', en: 'png' }, dark: { zh: 'png', en: 'png' } }
    };

    // 根据资源名、主题、语言构建路径
    function buildAssetPath(name, theme, lang) {
        if (name === 'icon') {
            return 'assets/' + theme + '/icon.' + (ICON_EXT[theme] || 'jpg');
        }
        var ext = (ASSET_EXT[name] && ASSET_EXT[name][theme] && ASSET_EXT[name][theme][lang])
                  || 'jpg';
        return 'assets/' + theme + '/' + lang + '/' + name + '.' + ext;
    }

    // ===== 图片更新 =====
    function updateAllAssets() {
        var imgs = document.querySelectorAll('.adaptive-asset');
        imgs.forEach(function (img) {
            var name = img.getAttribute('data-asset');
            if (!name) return;
            // Hero icon 按钮用固定主题（data-asset-theme），其余用当前主题
            var theme = img.getAttribute('data-asset-theme') || currentTheme;
            var path = buildAssetPath(name, theme, currentLang);
            img.src = path;
            var alt = img.getAttribute('data-alt-' + currentLang);
            if (alt) img.alt = alt;
        });
    }

    // 图片加载失败时降级到 light/同语言
    function handleAssetError() {
        var img = this;
        // Hero icon 用固定主题，不需要降级
        var fixedTheme = img.getAttribute('data-asset-theme');
        if (fixedTheme) return;
        if (currentTheme === 'light') return;
        var name = img.getAttribute('data-asset');
        if (!name) return;
        // 防止重复降级
        if (img.dataset.fallenBack) return;
        img.dataset.fallenBack = '1';
        img.src = buildAssetPath(name, 'light', currentLang);
    }

    // ===== 文字切换 =====
    function updateTextContent(lang) {
        var elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(function (element) {
            element.textContent = element.getAttribute('data-' + lang);
        });
        SiteCommon.setPageLang(lang);
    }

    // ===== 语言切换 =====
    function switchLanguage(lang) {
        currentLang = lang;
        document.getElementById('languageSelect').value = lang;
        updateTextContent(lang);
        updateAllAssets();
        SiteCommon.saveLanguage(lang);
    }

    // ===== 主题切换 =====
    function switchTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-preview-theme', theme);
        document.body.setAttribute('data-preview-theme', theme);

        // 更新 Hero icon 按钮状态
        var options = document.querySelectorAll('.app-icon-option');
        options.forEach(function (option) {
            var isActive = option.getAttribute('data-theme-option') === theme;
            option.classList.toggle('active', isActive);
            option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // 清除降级标记，更新图片
        document.querySelectorAll('.adaptive-asset').forEach(function (img) {
            delete img.dataset.fallenBack;
        });
        updateAllAssets();

        SiteCommon.saveTheme(theme);
    }

    // ===== 主题切换按钮（右上角） =====
    function toggleTheme() {
        switchTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    // ===== 初始化 =====
    function init() {
        // 为所有 adaptive-asset 绑定降级处理
        document.querySelectorAll('.adaptive-asset').forEach(function (img) {
            img.addEventListener('error', handleAssetError);
        });

        // 恢复主题
        var savedTheme = 'light';
        try { savedTheme = localStorage.getItem('preferredPreviewTheme') || 'light'; } catch (e) {}
        switchTheme(savedTheme);

        // 恢复语言
        var lang = SiteCommon.getPreferredLanguage();
        switchLanguage(lang);

        // 绑定事件
        document.getElementById('languageSelect').addEventListener('change', function () {
            switchLanguage(this.value);
        });
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);

        // Hero icon 按钮点击
        var controls = document.querySelector('.app-icon-options');
        if (controls) {
            controls.addEventListener('click', function (event) {
                var option = event.target.closest('.app-icon-option');
                if (!option) return;
                switchTheme(option.getAttribute('data-theme-option'));
            });
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
