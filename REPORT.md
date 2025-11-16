# 代码库结构与用途说明（REPORT）

## 顶层

- `index.html`：应用入口 HTML，挂载点 `#app`，Vite 注入构建产物
- `package.json`：包信息与脚本（`dev`/`build`/`preview`/`deploy`），依赖包含 `vue`、`naive-ui`、`vue-router`、`vue-i18n`
- `package-lock.json`：依赖锁定文件
- `vite.config.js`：Vite 构建配置（默认配置）
- `README.md`：项目说明（手写文档）
- `REPORT.md`：本报告，描述主要文件和目录用途
- `.gitignore`：Git 忽略规则
- `.vscode/`：编辑器配置（如扩展推荐）

## 静态资源（public/）

- `public/about.json`：关于页面数据，双语结构 `{ zh: { tech, nonTech }, en: { tech, nonTech } }`
- `public/projects.json`：项目列表与详情数据，字段（`title`/`description`/`sections[*].title|content`）均为双语 `{ zh, en }`
- `public/images/projects/`：项目封面与详情图片（按项目划分，如 `flask_ap.jpg`、`hvp_*.jpg` 等）
- `public/videos/`：视频资源（如 `hvp.mp4`）
- `public/vite.svg`：示例静态资源

说明：`public/*` 的内容会在构建时被原样复制，可通过绝对路径 `/...` 在运行时直接访问，适合集合式 JSON、图片、视频等。

## 源码（src/）

- `src/main.js`：应用入口，创建 Vue 应用并注册 `router`、`naive-ui`、`i18n`，挂载到 `#app`
- `src/App.vue`：顶层布局与导航栏
  - 顶部导航 `NLayoutHeader`，路由节选按钮（首页、关于、技能、项目、博客、联系）
  - 语言切换按钮位于导航栏右侧（`中 / EN`），通过 `vue-i18n` 的 `locale` 实现即时切换
  - 移动端抽屉菜单复用同样的导航与语言切换
  - 内容区域使用 `<router-view />` 承载各页面视图
- `src/i18n.js`：国际化配置
  - 启用 `legacy: false`，默认语言 `zh`，回退 `en`
  - 定义页面与组件的文案词条：`nav`、`home`、`projects`、`skills`、`bloglist`、`contact`、`blogArticle`、`projectDetail`
- `src/style.css`：全局样式（基础样式与布局微调）

### 路由（src/router/）

- `src/router/index.js`：路由配置，注册首页、项目详情、博客文章等页面路径

### 视图页面（src/views/）

- `Home.vue`：主页
  - 第一屏 Hero：左侧个人信息栏（头像与简介文案），右侧关于卡片（按钮滚动到 About 区域）
  - 使用滚动监听标记当前显示的区块并通知 `App.vue` 激活导航状态
  - 背景图在内联样式中叠加线性渐变与图片
- `About.vue`：关于我
  - 加载 `public/about.json`，根据当前语言展示 `tech` 与 `nonTech` 两类内容
  - 标签切换（技术经历 / 兴趣与价值观），背景图与半透明卡片样式
- `Skills.vue`：技能页
  - 展示技能项与进度条，标题与说明使用 i18n 词条
  - 背景图通过 CSS 设置线性渐变叠加
- `Projects.vue`：项目列表
  - 加载 `public/projects.json`，对数据进行映射与排序（如置顶 `id === 6`）
  - 根据当前语言显示项目标题，卡片点击跳转详情
  - 页面背景图与居中布局
- `ProjectDetail.vue`：项目详情
  - 根据路由参数 `id` 读取对应项目，显示封面、描述、时间线分节、技能标签、更多图片、外链与视频
  - 所有可见文本根据当前语言从双语字段中选择
- `BlogList.vue`：博客列表
  - 通过 `import.meta.glob('../data/*.md')` 读取 Markdown 源文件的标题并生成文章列表
  - 标题与“阅读文章”文案通过 i18n 词条配置
- `BlogArticle.vue`：博客文章
  - 按 `id` 读取对应 Markdown，解析标题与渲染正文；支持 KaTeX 公式（`markdown-it-katex`）
  - 返回按钮与 404 文案使用 i18n 词条
- `Contact.vue`：联系页
  - 展示 Google/QQ 邮箱与 GitHub 链接，标题与说明使用 i18n 词条

### 组件（src/components/）

- `HelloWorld.vue`：示例组件（来自 Vite 模板，当前未在页面使用）

### 资源（src/assets/）

- 背景与封面图片：`about.jpg`、`skills.jpg`、`projects.jpg`、`blog.jpg`、`contact.jpg`、`background.jpg`
- 头像等：`GaryPhoto.jpg`
- 图标：`vue.svg`

### 数据（src/data/）

- `blog*.md`：博客文章源文件，首行注释 `<!-- title: ... -->` 用于抽取标题；在页面中按 `id` 读取并渲染

## 第三方库与关键点

- 框架：`vue@3`（组合式 API 与模板渲染）
- UI：`naive-ui`（布局、按钮、卡片、栅格、标签、抽屉、进度）
- 路由：`vue-router@4`（页面导航与详情路由）
- 国际化：`vue-i18n`（语言切换，`locale` 动态选择文案与 JSON 字段）
- Markdown：`markdown-it` + `markdown-it-katex`（博客文章渲染与公式支持）
- 构建：`vite`（开发服务器与打包）

## 数据与国际化协作约定

- JSON 双语：将可变文案的数据源改为双语结构，页面根据 `locale` 选择 `zh` 或 `en`
- 文案词条：UI 固定文案（按钮、标题）统一放在 `src/i18n.js` 中维护，避免硬编码

## 部署与预览

- 开发：`npm run dev` 启动 Vite 本地服务器
- 构建：`npm run build` 输出产物至 `dist/`
- 预览：`npm run preview` 本地预览构建产物
- 部署：`npm run deploy` 使用 `gh-pages` 推送 `dist/` 到 GitHub Pages