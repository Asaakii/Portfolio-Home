export interface ArchNode {
  label: string;
  sub?: string;
  color: string;
}

export interface Highlight {
  title: string;
  description: string;
  bullets?: string[];
  tags?: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface BusinessChain {
  name: string;
  output: string;
}

export interface QualityGate {
  name: string;
  check: string;
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
  background?: string;
  outcomes?: string[];
  businessChains?: BusinessChain[];
  qualityGates?: QualityGate[];
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
      '基于 LangGraph 编排 9 条业务链的 Multi-Agent 协同决策系统，融合 RAG 知识库与结构化数据双通道，通过 6 层质量门禁实现从资料接收到 Word 报告交付的全自动化链路。',
    icon: '🤖',
    categoryLabel: 'MULTI-AGENT SYSTEM',
    gradientFrom: '#f0f4ff',
    gradientTo: '#e8ecf8',
    categoryColor: '#8893b0',
    metrics: [
      { value: '9', label: '业务链 Workflow' },
      { value: '13', label: '报告生成阶段' },
      { value: '6', label: '质量门禁层' },
      { value: '1000+', label: '政府文档处理' },
    ],
    background:
      '县域经济是中国经济的基本空间单元，但县级政府在产业诊断、政策研判、项目招商和规划编制等工作中长期依赖人工调研与经验判断——一份县域诊断报告往往需要多部门协调、多轮数据核实，耗时数天到数周。本项目旨在为县域经济场景建设"智能分析与协同决策平台智能内核"，将县域数据、产业研判、政策决策、运行监测、项目招商、规划写作和专家协同组织成可复用、可追踪、可交付的智能体工作流，从根本上改变传统县域经济分析"数据散、流程断、结论无依据"的痛点。项目以四川隆昌县作为首个试点，完成从资料接收、文档解析、知识入库、业务链分析到 Word 报告交付的全链路验证。',
    outcomes: [
      '在<strong>隆昌县</strong>试点完成全链路交付验证，涵盖运行监测、产业诊断、瓶颈归因、政策决策、项目招商、一县一策规划等完整业务场景',
      '处理 <strong>1000+</strong> 份政府文档（统计公报、政府工作报告、政策 PDF、部门 Excel 等），建成 <strong>6 类</strong> Dify 知识库（2100+ 分块，约 <strong>270 万字</strong>）',
      '单次全链路报告生成从人工数天缩短至约 <strong>30 分钟</strong>，自动生成 <strong>12 类</strong>结构化交付物（诊断报告、政策矩阵、项目清单、规划送审稿等）',
      '建设 <strong>81 份</strong>可交付成果，包括规划书、样例报告、质量报告、任务包、Word 送审稿和交接验收材料',
      '成功完成 <strong>OpenClaw → Hermes Agent</strong> 架构迁移，将项目从聊天触发式升级为支持长期运行、业务链编排与多格式交付的智能内核',
      '构建 <strong>50+</strong> 项自动化测试用例覆盖全链路，编写 <strong>50+</strong> 项 Evals 评估指标确保交付质量',
    ],
    businessChains: [
      { name: '数据治理链', output: '数据资产目录' },
      { name: '运行监测链', output: '运行监测报告' },
      { name: '产业诊断链', output: '产业诊断报告' },
      { name: '瓶颈归因链', output: '瓶颈归因报告' },
      { name: '政策决策链', output: '政策矩阵' },
      { name: '项目招商链', output: '招商清单' },
      { name: '一县一策规划链', output: 'Word 送审稿' },
      { name: '模型分析链', output: '模型分析报告' },
      { name: '县域治理知识链', output: '治理知识报告' },
    ],
    qualityGates: [
      { name: '数字门禁', check: '数字是否有来源、年份和口径' },
      { name: '证据门禁', check: '政策和结论是否能追溯' },
      { name: '逻辑门禁', check: '是否把相关性写成因果性' },
      { name: '结构门禁', check: '是否符合报告章节结构' },
      { name: '发布门禁', check: '是否需要部门确认或人工复核' },
      { name: '敏感门禁', check: '是否包含不可外发内容' },
    ],
    role: '独立负责 Agent 智能内核全栈建设：设计 CountyEconomyState 状态模型与 LangGraph 多业务链条件路由；开发 9 条业务链（数据治理→运行监测→产业诊断→瓶颈归因→政策决策→项目招商→一县一策规划→模型分析→县域治理知识）的节点实现与多步接力编排；构建专家角色协同机制与质量门禁体系；主导从 OpenClaw 到 Hermes Agent 框架的架构迁移；在隆昌县完成试点全流程交付验证。',
    techStack: [
      'LangGraph',
      'Hermes Agent',
      'Dify RAG',
      'PostgreSQL',
      'SQLite',
      'MCP',
      'FastAPI',
      'MinerU',
      'MarkItDown',
      'Jina Reader',
    ],
    architecture: [
      { label: '资料接收', sub: 'PDF/Word/Excel/网页', color: '#e0e7ff' },
      { label: '文档解析', sub: 'MinerU / MarkItDown / Jina', color: '#dbeafe' },
      { label: '知识与数据入库', sub: 'Dify + PostgreSQL + SQLite', color: '#d1fae5' },
      { label: '业务链路由', sub: 'LangGraph 9 条链', color: '#fef3c7' },
      { label: '专家角色协同', sub: '多角色分析生成', color: '#fce7f3' },
      { label: 'RAG + 指标融合', sub: '软知识 + 硬数据', color: '#ccfbf1' },
      { label: '质量门禁', sub: '6 层审查', color: '#ede9fe' },
      { label: '交付物输出', sub: 'MD/JSON/Word', color: '#f3f4f6' },
    ],
    highlights: [
      {
        title: 'LangGraph 多业务链编排',
        description: '',
        bullets: [
          '设计 CountyEconomyState 状态模型，承载 request → workflow → roles → data → analysis → review → outputs → trace 全链路状态',
          '使用 add_conditional_edges 实现 9 条业务链的条件路由，分支由 workflow_id 控制而非模型临场发挥',
          '支持多步接力：招商链需经"运行监测→产业诊断→瓶颈归因"后才生成招商机会与政策闭环清单',
        ],
        tags: ['LangGraph', 'State Machine', 'Conditional Routing'],
      },
      {
        title: '13 阶段报告生成链路',
        description: '',
        bullets: [
          '从"需求触发"到"Obsidian 归档"的 13 阶段连续链路，而非一次性 prompt 写作',
          '文档解析层：MinerU 解析扫描件、MarkItDown 转 Markdown、Jina 抽取网页、pandas 清洗 Excel',
          '分析包构建：先汇聚经济运行摘要、产业画像、瓶颈假设、政策依据等中间层，再交由专家角色生成草稿',
        ],
        tags: ['MinerU', 'MarkItDown', 'Jina Reader', 'pandas'],
      },
      {
        title: 'RAG + 结构化数据双通道',
        description: '',
        bullets: [
          'Dify 承载 6 类知识库（2100+ 分块，约 270 万字），覆盖政策、规划、会议纪要、产业资料等软知识',
          'PostgreSQL 承载县域指标、企业、项目等硬数据，支撑具体数字和结构化查询',
          '融合原则：具体数字必须有结构化来源，政策判断必须有政策依据，不足以定性写成"待核验事项"',
        ],
        tags: ['Dify', 'PostgreSQL', 'RAG', 'Rerank'],
      },
      {
        title: '6 层质量门禁体系',
        description: '',
        bullets: [
          '数字门禁（来源/年份/口径）、证据门禁（追溯性）、逻辑门禁（因果边界）',
          '结构门禁（章节合规）、发布门禁（人工复核）、敏感门禁（脱敏检查）',
          '门禁不通过进入 needs_human_review 状态，支持 retry_job 重新运行',
        ],
        tags: ['Quality Gate', 'Evals', 'Human Review'],
      },
      {
        title: 'OpenClaw → Hermes 架构迁移',
        description: '',
        bullets: [
          'OpenClaw 定位为多渠道 Gateway，适合入口层但不适合承载长期运行的业务内核',
          'Hermes 提供 Persistent Memory、Skills System、MCP、Subagent Delegation、Cron 和 API Server',
          '迁移后业务链、专家角色、质量门禁和交付闭环沉淀为可复用的项目资产',
        ],
        tags: ['Hermes Agent', 'OpenClaw', 'Architecture Migration'],
      },
      {
        title: '工具链与 MCP 服务化',
        description: '',
        bullets: [
          '封装 12 个标准化 MCP 接口（指标查询、RAG 检索、文档解析等），接入 20+ 项县域核心指标',
          '工具链分层：MinerU（扫描件 OCR）→ MarkItDown（Office 转换）→ Jina（网页抽取）→ pandas（表格清洗）',
          'FastAPI 接口层支持 SSE 流式输出与 WebSocket 推送',
        ],
        tags: ['MCP', 'FastAPI', 'SSE', 'WebSocket'],
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
