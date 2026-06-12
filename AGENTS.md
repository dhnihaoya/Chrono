# Chrono Website - 项目指南

> 本文件面向 AI 编码助手。阅读前默认你对本项目一无所知。

## 项目概览

本项目是 **Chrono** iOS 应用的公开官方网站仓库，用于产品展示、技术支持、隐私政策和使用条款。仓库地址为 `https://github.com/dhnihaoya/ChronoWebsite.git`，默认分支为 `main`，通过 GitHub Pages 发布到：

`https://dhnihaoya.github.io/Chrono/`

项目语言以中文为主，同时通过前端脚本实现中英文双语切换。

Chrono 应用主体仓库位于本机 `/Users/dinghao/Chrono/`。当需要核对产品事实、功能描述、支持的系统能力或当前工程状态时，优先参考该目录中的实际代码和文档，不要只凭网站旧文案推断。

## 对外文案定位

- `README.md` 是公开仓库首页，应同时承担产品宣传和用户支持入口的作用。
- README 应优先说明 Chrono 是什么、官网在哪里、主要功能、截图预览、隐私与条款、如何反馈问题。
- README 不应展示本地预览命令、部署步骤、贡献者招募口吻或 GitHub Pages 后台配置手册内容。
- 引导用户优先在 GitHub Issues 提交使用问题、网站错误和功能建议，同时保留邮箱 `chronoapp@163.com`。
- README 和首页的显眼位置应保留 UI 设计师联系方式 `1176180038@qq.com`。
- 不要在公开文案中过度暴露内部实现细节、临时待办或未确认的上架信息。

## 主要页面

- `index.html`：官网首页，包含 Hero 区域、核心功能介绍、应用截图轮播、技术支持 FAQ、页脚等。
- `privacy.html`：隐私政策页面，支持中英文切换。
- `terms.html`：使用条款页面，支持中英文切换。
- `style.css`：全局样式表，`index.html` 引用；`privacy.html` 与 `terms.html` 使用内嵌样式。
- `pics_cn/`：中文版应用截图资源目录，包含图标与 5 张功能截图。
- `pics_en/`：英文界面截图资源目录；真实英文截图整理完成前可使用空白占位图。
- `pics_dark/`：深色模式资源目录，包含深色 App Icon；深色界面截图路径可先预留，真实截图整理好后再接入切换。
- `README.md`：公开仓库展示与用户支持入口。

## 技术栈与运行时架构

- **纯静态站点**：仅使用 HTML5、CSS3 和原生 JavaScript，无构建工具、无框架、无包管理器。
- **部署目标**：GitHub Pages。当前仓库文件位于根目录，Pages 应选择 `main` 分支和根目录 `/`。
- **浏览器端特性**：
  - 语言切换：通过 `data-zh` / `data-en` 属性存储双语文本，运行时替换 `textContent`（`index.html`）或 `innerHTML`（`privacy.html`、`terms.html`）。
  - 语言持久化：使用 `localStorage.setItem('preferredLanguage', lang)` 记住用户选择。
  - 自动检测：页面加载时根据 `navigator.language` 自动选择中文或英文。
  - 响应式布局：CSS Grid、Flexbox 与 `@media` 媒体查询适配桌面、平板和手机。

## 文件结构

```text
ChronoWebsite/
├── index.html
├── privacy.html
├── terms.html
├── style.css
├── README.md
├── AGENTS.md
└── pics_cn/
    ├── Icon-1024.jpg
    ├── main.jpg
    ├── add_schedule.jpg
    ├── focus.jpg
    ├── insight.jpg
    └── mine.jpg
└── pics_en/
    ├── main.svg
    ├── add_schedule.svg
    ├── focus.svg
    ├── insight.svg
    └── mine.svg
└── pics_dark/
    └── Icon-Dark-1024.png
```

## 页面内容组织

- **Hero**：左侧截图 + 右侧应用图标、名称、标语、副标题、App Store 下载按钮。
- **Hero**：展示浅色和深色两个 App Icon。浅色图标保持默认浅色网站配色；深色图标切换到参考 App Dracula 主题的网页配色。
- **Features**：8 张功能卡片，展示时间线视图、标签、Apple 提醒事项集成、日历同步、快速操作、专注模式、数据洞察、浅色与吸血鬼模式。
- **Screenshots**：横向滚动轮播，展示 5 张应用截图；图片资源应通过 `data-src-zh` / `data-src-en` 随网站语言切换。深色截图路径用 `data-src-dark-*` 预留，真实深色截图完成前不要切到不存在的图片。
- **Support / FAQ**：联系方式、可折叠的常见问题、隐私政策/使用条款入口。
- **Footer**：版权信息、政策链接、联系邮箱。

## 本地预览

本项目无需构建步骤。在项目根目录执行：

```bash
python3 -m http.server 8000
```

然后在浏览器访问 `http://localhost:8000`。

## 代码风格指南

- **HTML**：
  - 使用 4 空格缩进。
  - 双语文本通过 `data-zh` 和 `data-en` 属性内联存储，初始显示中文内容。
  - 首页外链 `style.css`；隐私政策与使用条款使用 `<style>` 内嵌样式。
- **CSS**：
  - 使用 CSS 自定义属性（`:root`）集中管理颜色、阴影、圆角、过渡动画。
  - 主色调为温暖的棕色系：`#735A33`、`#4F3422`、`#926247`。
  - 响应式断点：`768px` 和 `480px`。
- **JavaScript**：
  - 使用原生 JavaScript，无模块系统。
  - 三个页面均内嵌语言切换脚本：`switchLanguage()`、`detectLanguage()`、`DOMContentLoaded` 事件监听。
  - 注释优先使用中文，保持与现有文件一致。

## 内容维护规则

- 公开支持入口统一使用 GitHub Issues：`https://github.com/dhnihaoya/ChronoWebsite/issues`。
- 维护邮箱统一为 `chronoapp@163.com`。修改时需检查 `README.md`、`index.html`、`privacy.html`、`terms.html` 是否一致。
- UI 设计师联系方式统一为 `1176180038@qq.com`。修改公开首页或 README 时，确保该邮箱仍在显眼位置。
- App Store 下载按钮当前如仍为 `#`，不要在 README 中承诺真实下载链接；应用上架后再替换为正式 App Store URL。
- 隐私政策声明当前为：Chrono 不收集个人信息，数据本地存储，不使用第三方分析，无广告。修改隐私声明时需同步更新页面上的“最后更新日期”。
- 产品功能描述应以 `/Users/dinghao/Chrono/` 主项目事实为准，尤其是 iOS 版本、Widget、Live Activity、日历/提醒事项同步、多语言和主题支持。
- 首页应合理说明 Chrono App 支持浅色和 Dracula 风格深色外观。网站默认浅色背景不得随意改动；深色网页配色只在用户选择深色 App Icon 后启用。
- 截图素材应按语言和外观分目录维护。真实多语言截图未整理好时先使用占位图；真实深色截图未整理好时只预留路径，不要让页面加载不存在的深色截图。
- README 面向公开读者，AGENTS 面向编码助手；不要把内部维护提醒塞回 README。

## 测试说明

本项目没有自动化测试套件。修改后至少做以下手动检查：

1. 启动本地服务器并访问首页。
2. 验证中文/英文切换是否生效，刷新后是否记住上次选择。
3. 验证隐私政策、使用条款页面的语言切换。
4. 在桌面、平板、手机视图下检查响应式布局。
5. 检查 `pics_cn/` 图片是否正常加载。
6. 检查 `mailto:chronoapp@163.com` 与 GitHub Issues 链接是否一致。

## 部署流程

1. 将修改推送到 `main` 分支。
2. 在 GitHub 仓库 `Settings > Pages` 中：
   - Source 选择 `Deploy from a branch`。
   - Branch 选择 `main`，目录选择根目录 `/`。
3. 保存后等待 GitHub Pages 构建完成。
4. 访问 `https://dhnihaoya.github.io/Chrono/`。

## 安全与隐私注意事项

- 静态站点不处理用户输入、不调用后端 API、不存储敏感数据到服务器。
- `localStorage` 仅用于保存用户语言偏好（键 `preferredLanguage`），不收集个人身份信息。
- 当前页面未引用外部 CDN、分析脚本或广告追踪脚本。
- 修改隐私、条款或公开支持说明时，保持中英文内容含义一致。
