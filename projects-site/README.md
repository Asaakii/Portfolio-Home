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

## County Agent 项目展示

`src/pages/county-agent.astro` 使用独立的展示布局，包含分层架构探查、9 条业务链切换、知识治理案例、16 个角色工具与边界卡、异步挂起恢复演示、质量门禁示例和 12 阶段隆昌交付时间线。

- `src/data/county-exhibit.ts`：改写后的网页叙事、原生交互示例与展示配置。
- `src/content/county-whitepaper.md`：用户提供白皮书的完整、受版本管理的源文快照。根目录 `docs/` 被 Git 忽略，构建不能依赖该目录。
- `src/lib/county-whitepaper.ts`：将源文整理为 56 个技术主题，生成阅读导引、角色与流程契约、Markdown 表格、Shiki 代码和 KaTeX 公式。构建检查每个主题都有导引、业务链为 9、角色为 16。
- `src/scripts/county-agent.ts`：原生 TypeScript 交互、键盘切换、章节导航、搜索、深链接及 SVG 缩放。
- `src/scripts/county-motion.ts`：架构分层导览、9 条业务链逐步讲解、异步挂起恢复播放、轻量入场和阅读进度。播放由用户触发，可暂停；离开视口或切换页面时停止，系统减少动态效果的偏好会禁用视觉动画。
- `src/content/county-diagrams.json`：38 张图示的 SVG 构建资产。图示直接写入 HTML，浏览器不加载 Mermaid，不依赖网络生成图形；关闭 JavaScript 后仍可展开阅读。
- `scripts/render-county-diagrams.mjs`：构建前核对图示定义、主题配置和 Mermaid 版本。全部图示生成成功后才更新缓存，任何图示失败会阻止构建。缓存随源码提交，普通构建无需启动浏览器。
- `/projects/county-agent/whitepaper.md`：静态白皮书下载入口，不依赖后端服务。

展示层将全省覆盖范围、隆昌试点交付、工程配置、验收目标与文档中未附原始日志的测试描述区分标注。教学交互不调用实际业务 API，也不假定全部 183 县已上线。

正文使用 15–17px，辅助标签至少 12px，并提高浅色区域的文字对比度。技术图示默认保留原始绘制尺寸，在画布内滚动或拖动，可用「适配视图」看整体，也可在大图对话框中缩放阅读。关闭 JavaScript 后原文与内嵌 SVG 仍可访问。

原页面的 8 张图片全部保留并直接展示：平台总体图位于页面前部，受控工作流图位于架构章节，6 张项目图位于 `#screenshots`。图片预览不裁切；查看器可切换原始尺寸或打开原图。后续重构应核对原图 URL 清单，避免遗漏或改为默认折叠。

后续更新白皮书时，将原始文件同步至 `src/content/county-whitepaper.md`，并更新对应阅读导引与展示数据，再构建验证。正文与图表保留在可搜索手册中，主展示区使用适合网页的叙事和原生交互。

图示定义或配色发生变化时，构建会自动重新生成 SVG。首次生成需要本地 Chromium（`npx playwright install chromium`）；也可用已安装的 Chrome：`COUNTY_DIAGRAM_BROWSER=chrome npm run diagrams`。`npm run diagrams -- --force` 可强制重新生成。
