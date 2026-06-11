# projects.asaakii.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal, clean portfolio website at projects.asaakii.com showcasing 4 projects with detail pages, using Astro + React + Tailwind CSS + Motion.

**Architecture:** Static site generated with Astro SSG. Project data lives in a single TypeScript file, consumed by Astro components for the homepage card grid and 4 detail pages. React is used only for the interactive ArchitectureDiagram component. Tailwind handles all styling. Motion provides scroll-reveal and hover animations.

**Tech Stack:** Astro 5, React 19, Tailwind CSS 4, Motion (Framer Motion), TypeScript

**Spec:** `docs/superpowers/specs/2026-06-11-projects-portfolio-design.md`

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `projects-site/package.json`
- Create: `projects-site/astro.config.mjs`
- Create: `projects-site/tailwind.config.mjs`
- Create: `projects-site/tsconfig.json`
- Create: `projects-site/src/env.d.ts`

This task creates the project in a `projects-site/` directory at the repo root.

- [ ] **Step 1: Create Astro project and install dependencies**

```bash
cd /Users/leehom/portfolio-home
npm create astro@latest projects-site -- --template minimal --no-install --typescript strict
cd projects-site
npm install
npx astro add react tailwind --yes
npm install motion
```

- [ ] **Step 2: Verify astro.config.mjs has React and Tailwind integrations**

Open `projects-site/astro.config.mjs` and ensure it looks like:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwindcss()],
  output: 'static',
});
```

- [ ] **Step 3: Start dev server and verify it runs**

```bash
cd /Users/leehom/portfolio-home/projects-site
npm run dev
```

Expected: Astro dev server starts on http://localhost:4321, default page loads.

- [ ] **Step 4: Commit**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/
git commit -m "feat: scaffold Astro project with React, Tailwind, Motion"
```

---

### Task 2: Project Data File

**Files:**
- Create: `projects-site/src/data/projects.ts`

All 4 projects' data in a single typed file. Every component reads from here.

- [ ] **Step 1: Create the project data file**

```typescript
// projects-site/src/data/projects.ts

export interface ArchNode {
  label: string;
  sub?: string;
  color: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  company: string;
  period: string;
  year: string;
  summary: string;
  icon: string;
  categoryLabel: string;
  gradientFrom: string;
  gradientTo: string;
  categoryColor: string;
  metrics: Metric[];
  role: string;
  techStack: string[];
  architecture: ArchNode[];
  highlights: Highlight[];
}

export const projects: Project[] = [
  {
    slug: 'county-agent',
    title: '县域经济智能分析与协同决策平台 Agent 内核',
    company: '四川库信数字科技有限公司',
    period: '2026.03 — 至今',
    year: '2026',
    summary:
      '基于 OpenClaw / Hermes Agent 内核，使用 LangGraph 编排 9 条业务链与 16 个专家角色的 Multi-Agent 协同决策系统，将一次性问答升级为可复跑、可追踪的政务研究工作流。',
    icon: '🤖',
    categoryLabel: 'MULTI-AGENT SYSTEM',
    gradientFrom: '#f0f4ff',
    gradientTo: '#e8ecf8',
    categoryColor: '#8893b0',
    metrics: [
      { value: '9', label: '业务链' },
      { value: '16', label: '专家角色' },
      { value: '50+', label: '自动化测试' },
      { value: '270万', label: '知识库字数' },
    ],
    role: '独立负责 Agent 智能内核建设，主导试点县全流程交付验证。负责核心模块开发，包括任务路由、状态流转、多节点编排，以及从 OpenClaw 到 Hermes Agent 框架的架构迁移。',
    techStack: [
      'LangGraph',
      'OpenClaw',
      'Hermes Agent',
      'Dify',
      'FastAPI',
      'PostgreSQL',
      'MCP',
      'SSE / WebSocket',
    ],
    architecture: [
      { label: '用户请求', color: '#e0e7ff' },
      { label: '任务路由', sub: 'LangGraph', color: '#dbeafe' },
      { label: 'Multi-Agent', sub: '16 专家协同', color: '#fef3c7' },
      { label: 'RAG + SQL', sub: '混合检索', color: '#d1fae5' },
      { label: 'Evals 门禁', sub: '质量检查', color: '#ede9fe' },
      { label: '交付物生成', sub: '12 类报告', color: '#f3f4f6' },
    ],
    highlights: [
      {
        title: 'Agent 内核架构',
        description:
          '基于 OpenClaw 内核设计 Agent Runtime 架构，使用 LangGraph 实现任务路由、状态流转与多节点编排。内置 Memory 管理与上下文压缩机制，将一次性问答升级为可复跑、可追踪的政务研究工作流。后期主导迁移至 Hermes Agent 框架，将架构从聊天触发式升级为支持长期运行、业务链编排与多格式交付的智能内核。',
      },
      {
        title: 'RAG 与结构化数据融合',
        description:
          '基于 Dify 建设 6 类本地知识库（2100+ 分块，约 270 万字），采用语义检索 + 关键词检索 + Rerank 混合召回，结合 PostgreSQL 结构化指标查询，在同一任务中联合调用多源数据并输出带政策脚注的研判结论。',
      },
      {
        title: '工具封装与服务化',
        description:
          '设计封装 12 个标准化工具 MCP 接口（指标查询、RAG 检索、文档解析等），接入 20+ 项县域核心指标。按 FastAPI 服务化方式设计 Agent 接口层，支持 SSE 流式输出与 WebSocket 推送，设计统一 JSON 响应结构。',
      },
      {
        title: '质量门禁与交付自动化',
        description:
          '在核心业务链关键输出节点设置 Evals 自动评估（来源引用完整性、指标事实一致性、输出格式合规性），编写 50+ 项自动化测试用例覆盖全链路。处理 1000+ 份政府文档，自动生成 12 类结构化交付物，单次全链路报告生成从人工数天缩短至约 30 分钟。',
      },
    ],
  },
  {
    slug: 'ai-assistant',
    title: '智慧电厂 AI 知识助理',
    company: '四川能投云电科技有限公司',
    period: '2023.06 — 2026.02',
    year: '2024',
    summary:
      '在工业内网完成 DeepSeek-R1 系列 70B 级蒸馏模型私有化部署，构建 RAG 知识库支撑秒级检索召回与可溯源问答链路。',
    icon: '🧠',
    categoryLabel: 'LLM + RAG',
    gradientFrom: '#f0fff4',
    gradientTo: '#e8f8ec',
    categoryColor: '#6b9b7a',
    metrics: [
      { value: '70B', label: '模型参数' },
      { value: '500+', label: '文档数量' },
      { value: '<40GB', label: '显存占用' },
      { value: '秒级', label: '检索速度' },
    ],
    role: '负责 LLM 私有化部署与 RAG 知识库建设，设计 Prompt Engineering 策略与效果评测体系。',
    techStack: [
      'DeepSeek-R1',
      'llama.cpp',
      'GGUF Q4 量化',
      'BGE-M3',
      'Chroma',
      'FastAPI',
    ],
    architecture: [
      { label: '用户提问', color: '#d1fae5' },
      { label: '意图识别', sub: 'Prompt', color: '#dcfce7' },
      { label: 'RAG 检索', sub: 'BGE-M3 + Chroma', color: '#dbeafe' },
      { label: 'LLM 推理', sub: 'DeepSeek-R1 70B', color: '#fef3c7' },
      { label: '来源标注', sub: '溯源引用', color: '#ede9fe' },
      { label: '回答输出', color: '#f3f4f6' },
    ],
    highlights: [
      {
        title: 'LLM 私有化部署',
        description:
          '在工业内网（银河麒麟 + 离线环境）完成 DeepSeek-R1 系列 70B 级蒸馏模型私有化部署，采用 llama.cpp + GGUF Q4_K_M 量化方案将显存占用降至 40GB 以内，通过 FastAPI 封装推理 API 并接入知识库问答链路。',
      },
      {
        title: 'RAG 知识库构建',
        description:
          '对 500+ 份设备手册、运维资料和制度文档进行结构化分块，基于 BGE-M3 Embedding 模型生成向量并写入 Chroma 向量库，支撑秒级检索召回与可溯源问答链路。',
      },
      {
        title: 'Prompt Engineering 与评测',
        description:
          '设计系统提示词边界约束、来源强制引用和回答格式模板，使回答准确标注原始文档来源。构建工业场景测试用例进行效果评测，幻觉率有效控制，工业场景回答可用性与可信度稳步提升。',
      },
    ],
  },
  {
    slug: 'smart-platform',
    title: '智慧电厂一体化平台 · 系统集成',
    company: '四川能投云电科技有限公司',
    period: '2023.06 — 2026.02',
    year: '2023',
    summary:
      '完成 17 个异构子系统集成对接，设计统一适配层实现协议归一化，覆盖 500+ 台终端设备数据接入，搭建统一运维监控大屏。',
    icon: '⚡',
    categoryLabel: 'SYSTEM INTEGRATION',
    gradientFrom: '#fff8f0',
    gradientTo: '#f8f0e8',
    categoryColor: '#b08b5a',
    metrics: [
      { value: '17', label: '子系统' },
      { value: '500+', label: '终端设备' },
      { value: '统一', label: '监控大屏' },
      { value: '全自动', label: '报表推送' },
    ],
    role: '负责异构子系统集成对接与统一运维监控大屏开发，设计适配层解决协议不统一问题。',
    techStack: ['Vue', 'ECharts', 'MQTT', 'FastAPI'],
    architecture: [
      { label: '17 子系统', sub: '安防/定位/AI', color: '#fef3c7' },
      { label: '协议适配层', sub: '归一化处理', color: '#fed7aa' },
      { label: 'MQTT 采集', sub: '异步事件', color: '#dbeafe' },
      { label: 'FastAPI', sub: '数据聚合', color: '#d1fae5' },
      { label: '监控大屏', sub: 'Vue + ECharts', color: '#ede9fe' },
    ],
    highlights: [
      {
        title: '异构系统集成',
        description:
          '完成 17 个异构子系统（安防、定位、AI 推理等）的集成对接，针对各系统接口协议不统一的问题，设计统一适配层完成协议归一化处理。',
      },
      {
        title: '设备数据采集',
        description:
          '使用 MQTT 实现设备事件异步采集，覆盖 500+ 台终端设备数据接入，确保数据实时性与可靠性。',
      },
      {
        title: '运维监控大屏',
        description:
          '基于 Vue + ECharts 搭建统一运维监控大屏，开发 FastAPI 后端服务实现数据聚合与报表自动推送，将原依赖人工的周期性流程全面自动化。',
      },
    ],
  },
  {
    slug: 'data-collection',
    title: '工业数据采集与二次开发',
    company: '四川能投云电科技有限公司',
    period: '2023.06 — 2026.02',
    year: '2023',
    summary:
      '开发 Modbus 双协议解析模块支撑设备数据稳定采集，基于 ThingsBoard 定制可视化组件与告警规则引擎。',
    icon: '📡',
    categoryLabel: 'INDUSTRIAL IOT',
    gradientFrom: '#f8f0ff',
    gradientTo: '#ece4f5',
    categoryColor: '#8b6bb0',
    metrics: [
      { value: '2', label: '协议支持' },
      { value: '稳定', label: '数据采集' },
      { value: '定制', label: '可视化组件' },
      { value: '标准化', label: '数据源' },
    ],
    role: '独立负责数据采集模块开发与前端可视化页面开发交付，对接上层 IoT 平台提供标准化数据源。',
    techStack: [
      'Modbus',
      'Python',
      'ThingsBoard',
      'JavaScript',
      'HTML / CSS',
      'RESTful API',
    ],
    architecture: [
      { label: '工业设备', sub: 'Modbus RTU/TCP', color: '#ede9fe' },
      { label: '协议解析', sub: '双协议模块', color: '#e0e7ff' },
      { label: '数据适配', sub: 'Python + REST', color: '#dbeafe' },
      { label: 'IoT 平台', sub: 'ThingsBoard', color: '#d1fae5' },
      { label: '可视化', sub: 'Widget 定制', color: '#fef3c7' },
    ],
    highlights: [
      {
        title: 'Modbus 双协议解析',
        description:
          '开发 Modbus 双协议解析模块（RTU + TCP），支撑设备数据稳定采集。使用 Python 开发数据适配服务与 RESTful API，对接上层 IoT 平台，为数据驱动分析提供标准化数据源。',
      },
      {
        title: 'ThingsBoard 可视化定制',
        description:
          '基于 ThingsBoard 使用 JavaScript / HTML / CSS 定制可视化 Widget 组件与告警规则引擎，独立完成前端数据可视化页面开发与交付。',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : undefined,
    next: idx < projects.length - 1 ? projects[idx + 1] : undefined,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/leehom/portfolio-home/projects-site
npx astro check
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/src/data/projects.ts
git commit -m "feat: add project data file with all 4 projects"
```

---

### Task 3: Global Layout, Header, Footer, Base Styles

**Files:**
- Create: `projects-site/src/styles/global.css`
- Create: `projects-site/src/components/Header.astro`
- Create: `projects-site/src/components/Footer.astro`
- Create: `projects-site/src/layouts/Layout.astro`

- [ ] **Step 1: Create global.css**

```css
/* projects-site/src/styles/global.css */
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', 'PingFang SC', 'Noto Sans SC', ui-sans-serif, system-ui,
    sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 2: Create Header.astro**

```astro
---
// projects-site/src/components/Header.astro
interface Props {
  showBack?: boolean;
}

const { showBack = false } = Astro.props;
---

<header
  class="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md"
>
  <div
    class="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 md:px-10"
  >
    <a
      href="https://asaakii.com"
      class="text-base font-semibold tracking-tight text-gray-900"
    >
      Asaakii
    </a>
    <nav class="hidden items-center gap-7 text-xs text-gray-400 md:flex">
      {showBack && (
        <a href="/" class="text-gray-900 transition hover:text-gray-600">
          ← Back
        </a>
      )}
      <a href="/#projects" class="transition hover:text-gray-900">Projects</a>
      <a
        href="https://blog.asaakii.com"
        target="_blank"
        rel="noopener noreferrer"
        class="transition hover:text-gray-900"
      >
        Blog
      </a>
      <a
        href="https://github.com/asaakii"
        target="_blank"
        rel="noopener noreferrer"
        class="transition hover:text-gray-900"
      >
        GitHub
      </a>
      <a
        href="mailto:tpittman942@gmail.com"
        class="transition hover:text-gray-900"
      >
        Contact
      </a>
    </nav>

    <!-- Mobile hamburger -->
    <button
      id="menu-toggle"
      class="flex flex-col gap-1 md:hidden"
      aria-label="Toggle menu"
    >
      <span class="block h-0.5 w-5 bg-gray-900"></span>
      <span class="block h-0.5 w-5 bg-gray-900"></span>
    </button>
  </div>

  <!-- Mobile menu -->
  <div
    id="mobile-menu"
    class="hidden border-t border-gray-100 bg-white px-6 pb-4 md:hidden"
  >
    {showBack && (
      <a href="/" class="block py-2 text-sm text-gray-900">← Back</a>
    )}
    <a href="/#projects" class="block py-2 text-sm text-gray-500">Projects</a>
    <a
      href="https://blog.asaakii.com"
      target="_blank"
      rel="noopener noreferrer"
      class="block py-2 text-sm text-gray-500"
    >
      Blog
    </a>
    <a
      href="https://github.com/asaakii"
      target="_blank"
      rel="noopener noreferrer"
      class="block py-2 text-sm text-gray-500"
    >
      GitHub
    </a>
    <a
      href="mailto:tpittman942@gmail.com"
      class="block py-2 text-sm text-gray-500"
    >
      Contact
    </a>
  </div>
</header>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => menu?.classList.toggle('hidden'));
</script>
```

- [ ] **Step 3: Create Footer.astro**

```astro
---
// projects-site/src/components/Footer.astro
---

<footer class="border-t border-gray-100">
  <div
    class="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 md:px-10"
  >
    <span class="text-xs text-gray-300">© 2026 Asaakii</span>
    <div class="flex gap-5 text-xs text-gray-400">
      <a
        href="https://github.com/asaakii"
        target="_blank"
        rel="noopener noreferrer"
        class="transition hover:text-gray-900"
      >
        GitHub
      </a>
      <a
        href="https://blog.asaakii.com"
        target="_blank"
        rel="noopener noreferrer"
        class="transition hover:text-gray-900"
      >
        Blog
      </a>
      <a
        href="mailto:tpittman942@gmail.com"
        class="transition hover:text-gray-900"
      >
        Email
      </a>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Create Layout.astro**

```astro
---
// projects-site/src/layouts/Layout.astro
interface Props {
  title?: string;
  showBack?: boolean;
}

const { title = "Asaakii's Projects", showBack = false } = Astro.props;

import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <link
      rel="icon"
      href="https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/avatar2.png"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="min-h-screen bg-[#fafafa] font-sans text-gray-900 antialiased">
    <Header showBack={showBack} />
    <slot />
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Verify layout renders**

```bash
cd /Users/leehom/portfolio-home/projects-site
npm run dev
```

Visit http://localhost:4321. Expected: page loads with header nav and footer visible on a light gray background.

- [ ] **Step 6: Commit**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/src/styles/ projects-site/src/components/Header.astro projects-site/src/components/Footer.astro projects-site/src/layouts/Layout.astro
git commit -m "feat: add global layout, header, footer, base styles"
```

---

### Task 4: Homepage — Hero + Project Cards

**Files:**
- Create: `projects-site/src/components/ProjectCard.astro`
- Create: `projects-site/src/pages/index.astro`

- [ ] **Step 1: Create ProjectCard.astro**

```astro
---
// projects-site/src/components/ProjectCard.astro
interface Props {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  categoryLabel: string;
  gradientFrom: string;
  gradientTo: string;
  categoryColor: string;
  year: string;
  techStack: string[];
}

const {
  slug,
  title,
  summary,
  icon,
  categoryLabel,
  gradientFrom,
  gradientTo,
  categoryColor,
  year,
  techStack,
} = Astro.props;
---

<a
  href={`/projects/${slug}`}
  class="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
>
  <!-- Cover -->
  <div
    class="relative flex h-36 items-center justify-center"
    style={`background: linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%);`}
  >
    <div class="relative w-full text-center">
      <div class="text-3xl">{icon}</div>
      <div
        class="mt-1.5 text-[9px] tracking-widest"
        style={`color: ${categoryColor};`}
      >
        {categoryLabel}
      </div>
    </div>
    <span
      class="absolute right-3 top-3 rounded-full bg-black/5 px-2.5 py-0.5 text-[9px] text-gray-500"
    >
      {year}
    </span>
  </div>

  <!-- Content -->
  <div class="p-5">
    <h3 class="mb-1.5 text-sm font-semibold text-gray-900">{title}</h3>
    <p class="mb-3.5 text-[11px] leading-relaxed text-gray-500">{summary}</p>
    <div class="flex flex-wrap gap-1.5">
      {
        techStack.slice(0, 4).map((tech) => (
          <span class="rounded bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500">
            {tech}
          </span>
        ))
      }
    </div>
  </div>
</a>
```

- [ ] **Step 2: Create index.astro**

```astro
---
// projects-site/src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { projects } from '../data/projects';
---

<Layout title="Asaakii's Projects">
  <main class="mx-auto max-w-5xl px-6 md:px-10">
    <!-- Hero -->
    <section class="pb-14 pt-20 md:pt-24">
      <div
        class="mb-4 text-[11px] uppercase tracking-[3px] text-gray-400"
      >
        AI Agent / RAG Engineer
      </div>
      <h1
        class="mb-5 max-w-lg text-3xl font-light leading-snug text-gray-900 md:text-4xl"
      >
        构建智能系统，<br />让 Agent 从想法到落地。
      </h1>
      <p
        class="max-w-md text-[13px] leading-relaxed text-gray-500"
      >
        2 年+后端与工业数字化研发经验，专注 Agent 工程化与 RAG 管线建设。<br
        />目前在库信数字负责县域经济 Agent 智能内核。
      </p>
    </section>

    <!-- Projects -->
    <section id="projects" class="pb-16">
      <div
        class="mb-5 text-[10px] uppercase tracking-[2px] text-gray-300"
      >
        Selected Projects
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {
          projects.map((project) => (
            <ProjectCard
              slug={project.slug}
              title={project.title}
              summary={project.summary}
              icon={project.icon}
              categoryLabel={project.categoryLabel}
              gradientFrom={project.gradientFrom}
              gradientTo={project.gradientTo}
              categoryColor={project.categoryColor}
              year={project.year}
              techStack={project.techStack}
            />
          ))
        }
      </div>
    </section>
  </main>
</Layout>
```

- [ ] **Step 3: Verify in browser**

```bash
cd /Users/leehom/portfolio-home/projects-site
npm run dev
```

Visit http://localhost:4321. Expected: Hero section with title + 2×2 card grid with all 4 projects, each showing icon, gradient cover, title, summary, tech tags. Cards should lift on hover.

- [ ] **Step 4: Commit**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/src/components/ProjectCard.astro projects-site/src/pages/index.astro
git commit -m "feat: add homepage with hero and project card grid"
```

---

### Task 5: Shared Detail Page Components

**Files:**
- Create: `projects-site/src/components/MetricsGrid.astro`
- Create: `projects-site/src/components/TechTags.astro`
- Create: `projects-site/src/components/SectionLabel.astro`
- Create: `projects-site/src/components/ArchitectureDiagram.tsx`

- [ ] **Step 1: Create SectionLabel.astro**

```astro
---
// projects-site/src/components/SectionLabel.astro
interface Props {
  text: string;
}

const { text } = Astro.props;
---

<div class="mb-4 text-[10px] uppercase tracking-[3px] text-gray-300">
  {text}
</div>
```

- [ ] **Step 2: Create MetricsGrid.astro**

```astro
---
// projects-site/src/components/MetricsGrid.astro
import type { Metric } from '../data/projects';

interface Props {
  metrics: Metric[];
}

const { metrics } = Astro.props;
---

<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
  {
    metrics.map((m) => (
      <div class="rounded-xl border border-gray-200 bg-white p-5 text-center">
        <div class="text-2xl font-light text-gray-900">{m.value}</div>
        <div class="mt-1 text-[10px] text-gray-400">{m.label}</div>
      </div>
    ))
  }
</div>
```

- [ ] **Step 3: Create TechTags.astro**

```astro
---
// projects-site/src/components/TechTags.astro
interface Props {
  tags: string[];
}

const { tags } = Astro.props;
---

<div class="flex flex-wrap gap-2">
  {
    tags.map((tag) => (
      <span class="rounded-full border border-gray-200 px-3.5 py-1.5 text-[11px] text-gray-500">
        {tag}
      </span>
    ))
  }
</div>
```

- [ ] **Step 4: Create ArchitectureDiagram.tsx**

```tsx
// projects-site/src/components/ArchitectureDiagram.tsx
import { useState } from 'react';
import type { ArchNode } from '../data/projects';

interface Props {
  nodes: ArchNode[];
}

export default function ArchitectureDiagram({ nodes }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-lg border px-3.5 py-2.5 text-center transition-all duration-200"
              style={{
                backgroundColor: node.color,
                borderColor:
                  hovered === i
                    ? 'rgba(0,0,0,0.2)'
                    : 'rgba(0,0,0,0.06)',
                transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div className="text-[10px] font-semibold text-gray-700">
                {node.label}
              </div>
              {node.sub && (
                <div className="mt-0.5 text-[8px] text-gray-400">
                  {node.sub}
                </div>
              )}
            </div>
            {i < nodes.length - 1 && (
              <span className="text-gray-300">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/src/components/MetricsGrid.astro projects-site/src/components/TechTags.astro projects-site/src/components/SectionLabel.astro projects-site/src/components/ArchitectureDiagram.tsx
git commit -m "feat: add detail page shared components"
```

---

### Task 6: Project Detail Pages

**Files:**
- Create: `projects-site/src/layouts/ProjectLayout.astro`
- Create: `projects-site/src/pages/projects/county-agent.astro`
- Create: `projects-site/src/pages/projects/ai-assistant.astro`
- Create: `projects-site/src/pages/projects/smart-platform.astro`
- Create: `projects-site/src/pages/projects/data-collection.astro`

- [ ] **Step 1: Create ProjectLayout.astro**

This shared layout renders the full detail page from a project slug. Each page file just passes its slug.

```astro
---
// projects-site/src/layouts/ProjectLayout.astro
import Layout from './Layout.astro';
import SectionLabel from '../components/SectionLabel.astro';
import MetricsGrid from '../components/MetricsGrid.astro';
import TechTags from '../components/TechTags.astro';
import ArchitectureDiagram from '../components/ArchitectureDiagram.tsx';
import { getProject, getAdjacentProjects } from '../data/projects';

interface Props {
  slug: string;
}

const { slug } = Astro.props;
const project = getProject(slug)!;
const { prev, next } = getAdjacentProjects(slug);
---

<Layout title={`${project.title} — Asaakii`} showBack>
  <main class="mx-auto max-w-5xl px-6 md:px-10">
    <!-- Project Hero -->
    <section class="pb-10 pt-16 md:pt-20">
      <div class="mb-3 text-[10px] uppercase tracking-[2px] text-gray-400">
        {project.company} · {project.period}
      </div>
      <h1 class="mb-4 max-w-xl text-2xl font-light leading-snug text-gray-900 md:text-3xl">
        {project.title}
      </h1>
      <p class="max-w-lg text-[13px] leading-relaxed text-gray-500">
        {project.summary}
      </p>
    </section>

    <!-- Key Metrics -->
    <section class="pb-10">
      <MetricsGrid metrics={project.metrics} />
    </section>

    <hr class="border-gray-100" />

    <!-- My Role -->
    <section class="py-10">
      <SectionLabel text="My Role" />
      <p class="max-w-lg text-[13px] leading-relaxed text-gray-500">
        {project.role}
      </p>
    </section>

    <!-- Tech Stack -->
    <section class="pb-10">
      <SectionLabel text="Tech Stack" />
      <TechTags tags={project.techStack} />
    </section>

    <hr class="border-gray-100" />

    <!-- Architecture -->
    <section class="py-10">
      <SectionLabel text="Architecture" />
      <ArchitectureDiagram client:visible nodes={project.architecture} />
    </section>

    <!-- Key Highlights -->
    <section class="pb-16">
      <SectionLabel text="Key Highlights" />
      <div class="space-y-6">
        {
          project.highlights.map((h) => (
            <div>
              <h3 class="mb-2 text-[13px] font-semibold text-gray-900">
                {h.title}
              </h3>
              <p class="text-[12px] leading-relaxed text-gray-500">
                {h.description}
              </p>
            </div>
          ))
        }
      </div>
    </section>

    <!-- Prev / Next -->
    <div
      class="flex items-center justify-between border-t border-gray-100 py-8"
    >
      {prev ? (
        <a
          href={`/projects/${prev.slug}`}
          class="text-[11px] text-gray-400 transition hover:text-gray-900"
        >
          ← {prev.title}
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a
          href={`/projects/${next.slug}`}
          class="text-[11px] text-gray-900 transition hover:text-gray-600"
        >
          {next.title} →
        </a>
      ) : (
        <span />
      )}
    </div>
  </main>
</Layout>
```

- [ ] **Step 2: Create county-agent.astro**

```astro
---
// projects-site/src/pages/projects/county-agent.astro
import ProjectLayout from '../../layouts/ProjectLayout.astro';
---

<ProjectLayout slug="county-agent" />
```

- [ ] **Step 3: Create ai-assistant.astro**

```astro
---
// projects-site/src/pages/projects/ai-assistant.astro
import ProjectLayout from '../../layouts/ProjectLayout.astro';
---

<ProjectLayout slug="ai-assistant" />
```

- [ ] **Step 4: Create smart-platform.astro**

```astro
---
// projects-site/src/pages/projects/smart-platform.astro
import ProjectLayout from '../../layouts/ProjectLayout.astro';
---

<ProjectLayout slug="smart-platform" />
```

- [ ] **Step 5: Create data-collection.astro**

```astro
---
// projects-site/src/pages/projects/data-collection.astro
import ProjectLayout from '../../layouts/ProjectLayout.astro';
---

<ProjectLayout slug="data-collection" />
```

- [ ] **Step 6: Verify in browser**

```bash
cd /Users/leehom/portfolio-home/projects-site
npm run dev
```

Visit http://localhost:4321. Click each project card on the homepage. Expected: each detail page renders with Project Hero, Key Metrics (4 boxes), My Role, Tech Stack tags, Architecture diagram with hover highlighting, Key Highlights sections, and Prev/Next navigation. Verify all 4 pages load correctly and Prev/Next links navigate between them.

- [ ] **Step 7: Commit**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/src/layouts/ProjectLayout.astro projects-site/src/pages/projects/
git commit -m "feat: add project detail pages with shared layout"
```

---

### Task 7: Scroll Reveal Animations

**Files:**
- Create: `projects-site/src/components/FadeIn.tsx`
- Modify: `projects-site/src/layouts/ProjectLayout.astro`
- Modify: `projects-site/src/pages/index.astro`

- [ ] **Step 1: Create FadeIn.tsx wrapper component**

```tsx
// projects-site/src/components/FadeIn.tsx
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Add FadeIn to homepage hero and cards**

Update `projects-site/src/pages/index.astro` — wrap the hero section content and each project card row in `<FadeIn>` components:

```astro
---
// projects-site/src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import FadeIn from '../components/FadeIn.tsx';
import { projects } from '../data/projects';
---

<Layout title="Asaakii's Projects">
  <main class="mx-auto max-w-5xl px-6 md:px-10">
    <!-- Hero -->
    <FadeIn client:load>
      <section class="pb-14 pt-20 md:pt-24">
        <div
          class="mb-4 text-[11px] uppercase tracking-[3px] text-gray-400"
        >
          AI Agent / RAG Engineer
        </div>
        <h1
          class="mb-5 max-w-lg text-3xl font-light leading-snug text-gray-900 md:text-4xl"
        >
          构建智能系统，<br />让 Agent 从想法到落地。
        </h1>
        <p
          class="max-w-md text-[13px] leading-relaxed text-gray-500"
        >
          2 年+后端与工业数字化研发经验，专注 Agent 工程化与 RAG 管线建设。<br
          />目前在库信数字负责县域经济 Agent 智能内核。
        </p>
      </section>
    </FadeIn>

    <!-- Projects -->
    <section id="projects" class="pb-16">
      <div
        class="mb-5 text-[10px] uppercase tracking-[2px] text-gray-300"
      >
        Selected Projects
      </div>
      <FadeIn client:visible delay={0.1}>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {
            projects.map((project) => (
              <ProjectCard
                slug={project.slug}
                title={project.title}
                summary={project.summary}
                icon={project.icon}
                categoryLabel={project.categoryLabel}
                gradientFrom={project.gradientFrom}
                gradientTo={project.gradientTo}
                categoryColor={project.categoryColor}
                year={project.year}
                techStack={project.techStack}
              />
            ))
          }
        </div>
      </FadeIn>
    </section>
  </main>
</Layout>
```

- [ ] **Step 3: Add FadeIn to ProjectLayout.astro sections**

Wrap each section in the detail page with `<FadeIn>`. Add the import at the top:

```astro
import FadeIn from '../components/FadeIn.tsx';
```

Then wrap sections like:

```astro
<FadeIn client:visible>
  <section class="pb-10">
    <MetricsGrid metrics={project.metrics} />
  </section>
</FadeIn>

<FadeIn client:visible delay={0.1}>
  <section class="py-10">
    <SectionLabel text="My Role" />
    ...
  </section>
</FadeIn>
```

Apply to: Metrics, My Role, Tech Stack, Architecture, Key Highlights — each with increasing `delay` (0, 0.1, 0.15, 0.2, 0.25).

- [ ] **Step 4: Verify animations in browser**

Visit http://localhost:4321. Scroll down — sections should fade in and slide up as they enter the viewport. Check both homepage and detail pages.

- [ ] **Step 5: Commit**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/src/components/FadeIn.tsx projects-site/src/pages/index.astro projects-site/src/layouts/ProjectLayout.astro
git commit -m "feat: add scroll reveal animations with Motion"
```

---

### Task 8: Build and Final Verification

**Files:**
- None new — verification only

- [ ] **Step 1: Run production build**

```bash
cd /Users/leehom/portfolio-home/projects-site
npm run build
```

Expected: Build succeeds, outputs to `dist/` with static HTML files for all 5 pages.

- [ ] **Step 2: Preview production build**

```bash
cd /Users/leehom/portfolio-home/projects-site
npm run preview
```

Visit http://localhost:4321. Verify:
- Homepage loads with hero + 4 project cards
- All 4 detail pages load when clicking cards
- Prev/Next navigation works across all pages
- Scroll animations fire correctly
- Architecture diagram hover works
- Mobile hamburger menu works (resize browser to <768px)
- All external links (Blog, GitHub, Contact) work

- [ ] **Step 3: Commit final state**

```bash
cd /Users/leehom/portfolio-home
git add projects-site/
git commit -m "feat: complete projects.asaakii.com portfolio site"
```
