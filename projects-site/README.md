# 项目集（projects-site）

个人主页的「项目集」子站点源码，构建产物发布到仓库根目录的 `projects/`。

## 技术栈

- **Astro 6** — 纯静态输出（`output: 'static'`），`base: '/projects'`，全站零外部 JS 运行时
- **Tailwind CSS 4** — 通过 `@tailwindcss/vite` 插件接入
- **淡入动画** — `src/components/FadeIn.astro` 用纯 CSS transition + IntersectionObserver 实现（`src/layouts/Layout.astro` 里的内联脚本驱动），不依赖 React / motion

## 目录结构

```text
src/
├── pages/          # 路由页面：index + ai-assistant / county-agent / data-collection / smart-platform
├── layouts/        # Layout.astro（通用骨架 + 淡入脚本）、ProjectLayout.astro（项目详情页）
├── components/     # FadeIn / Header / Footer / ProjectCard / HeroPipeline / MetricsGrid / SectionLabel / TechTags
├── data/           # 项目数据
└── styles/         # 全局样式
```

## 命令

```bash
npm install          # 安装依赖（需要 Node >= 22.12）
npm run dev          # 本地开发，localhost:4321
npm run build        # 构建到 ./dist/
npm run preview      # 本地预览构建产物
```

## 发布

构建后把产物同步到部署目录：

```bash
npm run build && rsync -a --delete dist/ ../projects/
```
