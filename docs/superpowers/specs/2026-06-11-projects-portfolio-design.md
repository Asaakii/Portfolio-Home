# projects.asaakii.com — 项目作品集网站设计文档

## 概述

为 projects.asaakii.com 从零构建项目作品集展示网站，从主页 asaakii.com 的 img-3 卡片（"我的项目集"）跳转进入。展示 4 个核心项目的详细 case study，突出 AI Agent / RAG 工程化能力。

## 设计决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 视觉风格 | 极简留白 | 大量空间、轻字重排版，让项目内容本身说话，专业感强 |
| 页面结构 | 首页 + 项目详情页 | 首页卡片列表总览，点击进入独立详情页做深度展示 |
| 首页布局 | 卡片网格式（2×2） | 视觉丰富，每个项目有独立封面和视觉标识 |
| 技术栈 | Astro + 少量 React | 默认输出纯静态 HTML，需要交互的部分按需加载 React，轻量易部署 |

## 项目内容（4 个项目）

### 1. 县域经济智能分析与协同决策平台 Agent 内核
- **公司**：四川库信数字科技有限公司
- **时间**：2026.03 — 至今
- **核心数据**：9 条业务链、16 个专家角色、50+ 自动化测试、270 万字知识库
- **技术栈**：LangGraph、OpenClaw、Hermes Agent、Dify、FastAPI、PostgreSQL、MCP、SSE/WebSocket
- **角色**：独立负责 Agent 智能内核建设，主导试点县全流程交付验证
- **亮点模块**：
  - Agent 内核架构（LangGraph 编排、Memory 管理、框架迁移）
  - RAG 与结构化数据融合（6 类知识库、混合检索 + Rerank）
  - 工具封装与服务化（12 个 MCP 接口、FastAPI 服务化）
  - 质量门禁与交付自动化（Evals 评估、1000+ 文档处理、12 类交付物）

### 2. 智慧电厂 AI 知识助理
- **公司**：四川能投云电科技有限公司
- **时间**：2023.06 — 2026.02
- **核心数据**：70B 级模型部署、500+ 份文档、40GB 以内显存
- **技术栈**：DeepSeek-R1、llama.cpp（GGUF Q4 量化）、BGE-M3、Chroma、FastAPI
- **角色**：负责 LLM 私有化部署与 RAG 知识库建设
- **亮点模块**：
  - LLM 私有化部署（银河麒麟 + 离线环境、Q4_K_M 量化）
  - RAG 知识库构建（500+ 文档分块、向量检索）
  - Prompt Engineering 与评测（幻觉控制、来源引用）

### 3. 智慧电厂一体化平台 · 系统集成
- **公司**：四川能投云电科技有限公司
- **时间**：2023.06 — 2026.02
- **核心数据**：17 个子系统、500+ 台终端设备
- **技术栈**：Vue、ECharts、MQTT、FastAPI
- **角色**：负责异构子系统集成与监控大屏开发
- **亮点模块**：
  - 17 子系统协议归一化适配
  - MQTT 设备事件异步采集
  - Vue + ECharts 统一运维监控大屏

### 4. 工业数据采集与二次开发
- **公司**：四川能投云电科技有限公司
- **时间**：2023.06 — 2026.02
- **核心数据**：Modbus 双协议支持
- **技术栈**：Modbus、Python、ThingsBoard、JavaScript/HTML/CSS
- **角色**：独立负责数据采集模块与前端可视化开发交付
- **亮点模块**：
  - Modbus 双协议解析模块
  - ThingsBoard 可视化 Widget 定制
  - RESTful API 数据适配服务

## 首页设计

### Header
- Logo：`Asaakii`（左侧，点击跳回主站 asaakii.com）
- 导航（右侧）：
  - Projects：锚点滚动到项目卡片区域
  - Blog：外部链接 → blog.asaakii.com
  - GitHub：外部链接 → github.com/asaakii
  - Contact：mailto 链接 → tpittman942@gmail.com

### Hero Section
- 标签：`AI AGENT / RAG ENGINEER`（小号大写、灰色、字间距大）
- 主标题：`构建智能系统，让 Agent 从想法到落地。`（大号细体）
- 副文本：简短个人介绍（2 年+经验、当前职位）

### Project Cards（2×2 网格）
每张卡片包含：
- **封面区域**：浅色渐变背景 + 居中 emoji 图标 + 英文类别标签
- **年份标签**：右上角圆角胶囊
- **标题**：项目名称（14px 粗体）
- **简介**：一句话描述（11px 灰色）
- **技术标签**：胶囊式标签行（灰色背景、小字）
- **交互**：hover 微上移 + 阴影加深，点击进入详情页

每张卡片的渐变色方案：
- 县域经济 Agent：蓝紫色系 `#f0f4ff → #e8ecf8`
- 智慧电厂 AI 助理：绿色系 `#f0fff4 → #e8f8ec`
- 智慧电厂一体化：橙色系 `#fff8f0 → #f8f0e8`
- 工业数据采集：紫色系 `#f8f0ff → #ece4f5`

### Footer
- 左：`© 2026 Asaakii`
- 右：GitHub / Blog / Email 链接

## 项目详情页设计

### 返回导航
- Header 中加入 `← Back` 返回首页

### Project Hero
- 标签行：公司名 + 年份（小号灰色）
- 主标题：项目全称（28px 细体）
- 概述：一段话描述项目整体（13px 灰色）

### Key Metrics（4 格网格）
- 每格：大号数字 + 小号标签
- 白色卡片、细边框、圆角
- 数据从简历提取，每个项目 4 个关键指标

### My Role
- 小号大写标签 `MY ROLE`
- 角色描述段落

### Tech Stack
- 小号大写标签 `TECH STACK`
- 胶囊标签行（圆角边框、灰色文字）

### Architecture
- 小号大写标签 `ARCHITECTURE`
- 白色卡片容器内展示流程图
- 每个项目定制不同的架构/流程图
- 使用彩色节点 + 箭头的横向流程图

### Key Highlights
- 小号大写标签 `KEY HIGHLIGHTS`
- 分段展示核心工作：
  - 每段：粗体子标题 + 详细描述段落
  - 内容直接来自简历，适当润色

### Prev / Next 导航
- 底部分栏：← 上一个项目 / 下一个项目 →
- 项目顺序：县域 Agent → AI 知识助理 → 一体化平台 → 数据采集

## 技术架构

### 技术栈
- **框架**：Astro（SSG 静态站点生成）
- **交互组件**：React（按需加载，用于 hover 动效等）
- **样式**：Tailwind CSS
- **动画**：Motion（原 Framer Motion），用于页面过渡和滚动动画
- **图标**：Remix Icon
- **字体**：Inter（英文）+ PingFang SC / Noto Sans SC（中文）

### 项目结构
```
projects-site/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # 全局布局（Header + Footer）
│   ├── pages/
│   │   ├── index.astro           # 首页
│   │   └── projects/
│   │       ├── county-agent.astro
│   │       ├── ai-assistant.astro
│   │       ├── smart-platform.astro
│   │       └── data-collection.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProjectCard.astro
│   │   ├── MetricsGrid.astro
│   │   ├── TechTags.astro
│   │   └── ArchitectureDiagram.tsx  # React 组件（需交互）
│   ├── data/
│   │   └── projects.ts           # 项目数据集中管理
│   └── styles/
│       └── global.css
├── public/
│   └── favicon.png
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

### 数据管理
项目数据集中在 `src/data/projects.ts`，包含每个项目的：
- 基本信息（标题、公司、时间、简介）
- 核心数据（metrics）
- 技术栈列表
- 角色描述
- 架构流程节点
- 亮点模块内容
- 卡片封面配色

### 部署
- Astro 构建输出纯静态文件（`astro build` → `dist/`）
- 部署到与现有站点相同的静态托管
- 域名 projects.asaakii.com 指向部署目录

## 响应式设计
- **桌面端**（>1024px）：2×2 卡片网格，完整布局
- **平板端**（768-1024px）：2×2 网格保持，间距缩小
- **手机端**（<768px）：单列卡片，Hero 文字缩小，导航收为汉堡菜单

## 交互与动效
- 卡片 hover：微上移（translateY -4px）+ 阴影加深
- 页面过渡：淡入淡出（Motion）
- 滚动动画：详情页各 section 滚动时淡入上移
- 架构图：hover 高亮当前节点
