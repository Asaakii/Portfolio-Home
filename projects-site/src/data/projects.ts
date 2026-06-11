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

export function getAdjacentProjects(
  slug: string,
): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : undefined,
    next: idx < projects.length - 1 ? projects[idx + 1] : undefined,
  };
}
