# Chrono GitHub Pages 设置指南

这个目录包含 Chrono 应用的官方网站文件，用于 App Store 的技术支持和营销页面。

## 文件结构

```
docs/
├── index.html       # 主页面（支持中英文切换）
├── style.css        # 样式文件
├── privacy.html     # 隐私政策（支持中英文切换）
├── terms.html       # 使用条款（支持中英文切换）
├── pics_cn/         # 中文版应用截图
│   ├── Icon-1024.jpg
│   ├── main.jpg
│   ├── add_schedule.jpg
│   ├── focus.jpg
│   ├── insight.jpg
│   └── mine.jpg
└── README.md        # 本文件
```

## ✨ 新功能特性

- 🌍 **多语言支持**：自动检测浏览器语言，支持中文/英文切换
- 📱 **响应式设计**：完美适配桌面、平板、手机
- 🎨 **现代化设计**：与 Chrono 应用风格保持一致
- 🖼️ **真实截图**：集成应用实际截图展示
- ⚡ **流畅动画**：悬停效果和过渡动画

## 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 `Settings`（设置）
3. 在左侧菜单中找到 `Pages`
4. 在 `Build and deployment` 部分：
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main` 分支，目录选择 `/docs`
   - 点击 `Save` 保存
5. 等待几分钟，你的网站将会发布在 `https://[你的用户名].github.io/Chrono/`

## 自定义域名（可选）

如果你想使用自己的域名：

1. 在 `docs/` 目录下创建一个名为 `CNAME` 的文件（无扩展名）
2. 在文件中写入你的域名，例如：`chrono.example.com`
3. 在你的域名服务商处配置 DNS 记录：
   - 添加一条 CNAME 记录指向 `[你的用户名].github.io`
4. 在 GitHub Pages 设置中输入你的自定义域名

## ✅ 已完成的内容

### 图片资源集成

✅ **应用图标**：`pics_cn/Icon-1024.jpg`
✅ **Hero 主图**：`pics_cn/main.jpg` (主页面截图)
✅ **功能截图**：已集成所有应用截图
   - `pics_cn/main.jpg` (主页面)
   - `pics_cn/add_schedule.jpg` (添加任务)
   - `pics_cn/focus.jpg` (专注模式)
   - `pics_cn/insight.jpg` (数据洞察)
   - `pics_cn/mine.jpg` (个人中心)

### 多语言支持

✅ **自动语言检测**：根据浏览器语言自动选择中文或英文
✅ **语言切换器**：右上角下拉菜单可手动切换语言
✅ **本地存储**：记住用户的语言选择偏好
✅ **完整翻译**：所有页面内容都支持中英文切换

## 需要修改的内容

### 联系邮箱

✅ **已完成**：所有页面中的邮箱地址已更新为 `chronoapp@163.com`

### App Store 链接

应用上架后，在 `index.html` 中更新 App Store 下载链接：

```html
<a href="https://apps.apple.com/app/idXXXXXXXX" class="btn btn-primary">
```

### 元数据

建议添加以下 meta 标签到 `index.html` 的 `<head>` 部分：

```html
<!-- Open Graph (社交媒体分享) -->
<meta property="og:title" content="Chrono - 时间线任务管理">
<meta property="og:description" content="优雅的时间线任务管理应用，让每一刻都井然有序">
<meta property="og:image" content="https://[你的域名]/images/og-image.png">
<meta property="og:url" content="https://[你的域名]">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Chrono - 时间线任务管理">
<meta name="twitter:description" content="优雅的时间线任务管理应用，让每一刻都井然有序">
<meta name="twitter:image" content="https://[你的域名]/images/og-image.png">
```

## 测试网站

在本地测试网站：

```bash
cd docs
python3 -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000`

## App Store 配置

在 App Store Connect 中：

1. **技术支持网址**：填写你的 GitHub Pages 地址或自定义域名
2. **营销网址**：同上
3. **隐私政策网址**：`https://[你的域名]/privacy.html`

## 注意事项

- 确保所有图片经过优化，避免文件过大
- 建议使用 WebP 格式以获得更好的性能
- 定期更新隐私政策和使用条款的日期
- 测试在不同设备上的显示效果（桌面、平板、手机）

## 参考资源

- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [App Store Connect 帮助](https://help.apple.com/app-store-connect/)

