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
  coverImage?: string;
  featured?: boolean;
  categoryLabel: string;
  gradientFrom: string;
  gradientTo: string;
  categoryColor: string;
  metrics: Metric[];
  background?: string;
  outcomes?: string[];
  businessChains?: BusinessChain[];
  qualityGates?: QualityGate[];
  ragExample?: {
    question: string;
    docs: string[];
    answer: string;
    sources: string[];
  };
  subsystems?: { name: string; category: string }[];
  protocolSpecs?: {
    protocol: string;
    medium: string;
    dataTypes: string;
    use: string;
  }[];
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
      '基于 LangGraph 编排 9 条业务链的主 Agent + Subagent 协同决策系统，融合 RAG 知识库与结构化数据双通道，通过 6 层质量门禁实现从资料接收到 Word 报告交付的全自动化链路。',
    icon: '🤖',
    coverImage:
      'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/county_agent.webp',
    featured: true,
    categoryLabel: 'AGENT + SUBAGENT',
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
      {
        label: '文档解析',
        sub: 'MinerU / MarkItDown / Jina',
        color: '#dbeafe',
      },
      {
        label: '知识与数据入库',
        sub: 'Dify + PostgreSQL + SQLite',
        color: '#d1fae5',
      },
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
    coverImage:
      'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/AI_RAG.webp',
    featured: true,
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
    background:
      '电厂运维人员在日常巡检、故障排查和制度查询中长期依赖纸质手册和个人经验——一个具体的设备参数或操作规程往往需要翻阅数百页 PDF 才能定位，新员工上手周期长、知识传承断层严重。与此同时，电厂处于工业内网（银河麒麟操作系统 + 完全离线环境），无法使用任何公有云 AI 服务。本项目在这一严苛约束下完成大模型私有化部署与 RAG 知识库建设，为运维人员提供"问即得、答有源"的 AI 知识助理，将设备手册、运维规程、安全制度等沉淀为可检索、可溯源的数字知识资产。',
    outcomes: [
      '在银河麒麟离线环境完成 <strong>DeepSeek-R1 70B</strong> 级蒸馏模型私有化部署，采用 GGUF Q4_K_M 量化将显存占用控制在 <strong>40GB</strong> 以内',
      '处理 <strong>500+</strong> 份设备手册、运维规程、安全制度等文档，构建结构化知识库，检索响应达到<strong>秒级</strong>',
      '所有回答强制标注原始文档来源与页码，实现<strong>可溯源问答</strong>，幻觉率有效控制',
      '通过 FastAPI 封装推理 API，支撑<strong>多终端接入</strong>（Web 端 + 移动端），新员工上手查询效率显著提升',
    ],
    ragExample: {
      question: '#2 机组给水泵的额定流量是多少？',
      docs: [
        '《DG-280/140 型给水泵技术规格书》第 3.2 节',
        '《2号机组辅机参数汇总表》Sheet-给水系统',
      ],
      answer:
        '#2 机组给水泵额定流量为 280 t/h，额定扬程 140 m，配套电机功率 1600 kW。该参数来自设备出厂技术规格书，具体安装参数请以现场铭牌为准。',
      sources: [
        'DG-280/140 型给水泵技术规格书 — 第 3.2 节 · 第 12 页',
        '2号机组辅机参数汇总表 — Sheet"给水系统" · B3 单元格',
      ],
    },
    role: '独立负责 LLM 私有化部署全流程：调研量化方案并在离线环境完成 DeepSeek-R1 70B 模型部署；设计文档分块策略与 RAG 检索链路（BGE-M3 + Chroma）；开发 FastAPI 推理服务与问答接口；构建 Prompt Engineering 策略（系统边界约束、来源强制引用、格式模板）；搭建工业场景评测用例进行效果验证与持续优化。',
    techStack: [
      'DeepSeek-R1',
      'llama.cpp',
      'GGUF Q4 量化',
      'BGE-M3',
      'Chroma',
      'FastAPI',
      'Python',
      '银河麒麟',
    ],
    architecture: [
      { label: '用户提问', sub: 'Web / 移动端', color: '#d1fae5' },
      { label: '意图识别', sub: 'Prompt 分流', color: '#dcfce7' },
      { label: 'RAG 检索', sub: 'BGE-M3 + Chroma', color: '#dbeafe' },
      { label: 'LLM 推理', sub: 'DeepSeek-R1 70B', color: '#fef3c7' },
      { label: '来源标注', sub: '文档 + 页码溯源', color: '#ede9fe' },
      { label: '回答输出', sub: '结构化格式', color: '#f3f4f6' },
    ],
    highlights: [
      {
        title: 'LLM 离线私有化部署',
        description: '',
        bullets: [
          '在银河麒麟 + 完全离线的工业内网环境中完成 DeepSeek-R1 系列 70B 级蒸馏模型部署，无法依赖任何公有云服务',
          '采用 llama.cpp 推理引擎 + GGUF Q4_K_M 量化方案，在单卡环境下将显存占用降至 40GB 以内，推理速度满足交互需求',
          '通过 FastAPI 封装标准化推理 API，支持流式输出（SSE），对接前端 Web 与移动端多终端访问',
        ],
        tags: ['llama.cpp', 'GGUF', 'Q4_K_M', '银河麒麟', 'FastAPI'],
      },
      {
        title: 'RAG 知识库与检索链路',
        description: '',
        bullets: [
          '对 500+ 份设备手册、运维规程、安全制度文档进行结构化分块，按文档类型设计差异化分块策略（手册按章节、规程按条目、表格按行列）',
          '使用 BGE-M3 多语言 Embedding 模型生成向量，写入 Chroma 向量库，支撑秒级语义检索与 Top-K 召回',
          '检索结果经相关性排序后注入 LLM 上下文，回答强制标注原始文档名称与页码，确保可溯源',
        ],
        tags: ['BGE-M3', 'Chroma', 'Embedding', '语义检索'],
      },
      {
        title: 'Prompt Engineering 策略',
        description: '',
        bullets: [
          '设计系统提示词边界约束：限定回答范围为知识库内容，超出范围明确告知"未找到相关资料"',
          '强制来源引用机制：每条回答必须附带原始文档名称和定位信息，杜绝无根据回答',
          '回答格式模板化：针对不同问题类型（参数查询、操作步骤、故障排查）设计结构化输出模板',
        ],
        tags: ['Prompt Engineering', 'System Prompt', '格式模板'],
      },
      {
        title: '效果评测与持续优化',
        description: '',
        bullets: [
          '构建工业场景测试用例集，覆盖设备参数查询、操作规程检索、故障排查建议等典型场景',
          '设计评测指标：回答准确率、来源标注率、幻觉率、检索召回率，建立量化评估基线',
          '根据评测结果迭代优化分块策略、检索参数和 Prompt 模板，幻觉率持续下降',
        ],
        tags: ['Evals', '幻觉率', '召回率', '评测体系'],
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
    coverImage:
      'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/yitihua.webp',
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
    background:
      '电厂在智慧化改造过程中陆续引入了安防监控、人员定位、AI 视觉推理、环境监测、门禁管理等十余套独立子系统，但各系统由不同厂商建设，接口协议各异（REST、WebSocket、MQTT、私有 SDK 等），数据格式不统一，运维人员需要在多个平台间反复切换查看，无法形成统一态势感知。本项目旨在构建"一体化平台"，通过设计统一协议适配层将 17 个异构子系统整合为一个统一入口，实现设备状态实时监控、告警事件统一处理和运维报表自动推送，从根本上解决"信息孤岛"和"多屏切换"的运维痛点。',
    outcomes: [
      '完成 <strong>17</strong> 个异构子系统的集成对接，覆盖安防监控、人员定位、AI 视觉推理、环境监测、门禁管理等全场景',
      '接入 <strong>500+</strong> 台终端设备的实时数据，设备在线率监控覆盖率达到 <strong>100%</strong>',
      '搭建统一运维监控大屏，运维人员从"多平台切换"收敛为<strong>单屏操作</strong>，响应效率显著提升',
      '实现运维报表<strong>全自动推送</strong>，将原依赖人工导出的周期性流程完全自动化，每周节省数小时人工操作',
    ],
    subsystems: [
      { name: '视频监控', category: '安防' },
      { name: '入侵检测', category: '安防' },
      { name: '电子围栏', category: '安防' },
      { name: '门禁管理', category: '安防' },
      { name: '人员定位', category: '定位' },
      { name: '车辆管理', category: '定位' },
      { name: '访客管理', category: '定位' },
      { name: 'AI 视觉推理', category: 'AI' },
      { name: '安全帽检测', category: 'AI' },
      { name: '烟火检测', category: 'AI' },
      { name: '环境监测', category: '环境' },
      { name: '温湿度采集', category: '环境' },
      { name: '消防报警', category: '消防' },
      { name: '消防联动', category: '消防' },
      { name: '广播对讲', category: '通信' },
      { name: '会议系统', category: '通信' },
      { name: '能耗监测', category: '能源' },
    ],
    role: '独立负责异构子系统集成架构设计与实现：调研 17 个子系统的接口协议与数据格式，设计统一适配层完成协议归一化；基于 MQTT 构建设备事件异步采集管道；使用 Vue + ECharts 开发统一运维监控大屏，包括设备拓扑、实时告警、趋势分析等模块；开发 FastAPI 后端服务实现跨系统数据聚合与报表自动生成推送。',
    techStack: [
      'Vue',
      'ECharts',
      'MQTT',
      'FastAPI',
      'Python',
      'WebSocket',
      'RESTful API',
      'PostgreSQL',
    ],
    architecture: [
      { label: '17 子系统', sub: '安防/定位/AI/环监/门禁', color: '#fef3c7' },
      {
        label: '协议适配层',
        sub: 'REST/WS/MQTT/SDK 归一化',
        color: '#fed7aa',
      },
      {
        label: 'MQTT 事件总线',
        sub: '异步采集 + 订阅分发',
        color: '#dbeafe',
      },
      {
        label: 'FastAPI 聚合层',
        sub: '数据融合 + 报表引擎',
        color: '#d1fae5',
      },
      {
        label: '统一监控大屏',
        sub: 'Vue + ECharts 可视化',
        color: '#ede9fe',
      },
    ],
    highlights: [
      {
        title: '17 子系统协议适配层',
        description: '',
        bullets: [
          '调研并对接 17 个独立子系统，涵盖安防监控、人员定位、AI 视觉推理、环境监测、门禁管理、消防报警等',
          '各系统接口协议各异（REST API、WebSocket 推送、MQTT Topic、厂商私有 SDK），设计统一适配层完成协议归一化',
          '适配层采用插件式架构：每个子系统对应一个 Adapter，新增子系统只需实现标准接口即可接入，无需修改核心逻辑',
        ],
        tags: ['REST', 'WebSocket', 'MQTT', '适配器模式'],
      },
      {
        title: 'MQTT 事件总线与设备采集',
        description: '',
        bullets: [
          '基于 MQTT 构建统一事件总线，500+ 台终端设备的状态变更、告警事件通过 Topic 订阅实时推送',
          '设计设备心跳检测机制，超时未上报自动标记离线并触发告警，设备在线率监控覆盖率 100%',
          '事件消息标准化：统一 payload 格式（设备 ID、时间戳、事件类型、数据体），下游消费无需关心源系统差异',
        ],
        tags: ['MQTT', '事件驱动', '心跳检测', '消息标准化'],
      },
      {
        title: '统一运维监控大屏',
        description: '',
        bullets: [
          '基于 Vue + ECharts 开发全屏监控大屏，包括设备拓扑总览、实时告警列表、趋势分析图表、子系统状态面板等模块',
          '告警模块支持按等级（紧急/重要/一般）分类展示，点击可下钻至具体子系统详情页',
          '趋势分析支持多维度切换（设备类型、区域、时间段），数据实时刷新，支撑运维决策',
        ],
        tags: ['Vue', 'ECharts', '数据可视化', '实时刷新'],
      },
      {
        title: '报表自动生成与推送',
        description: '',
        bullets: [
          '开发 FastAPI 后端服务实现跨系统数据聚合，按日/周/月维度自动汇总设备运行、告警处理、巡检完成等关键指标',
          '报表模板化生成：预设运维日报、周报、月报模板，自动填充数据并导出为 Excel/PDF',
          '自动推送机制：报表生成后按配置规则推送至相关人员，将原依赖人工导出的周期性流程完全自动化',
        ],
        tags: ['FastAPI', '报表引擎', '自动推送', '数据聚合'],
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
    coverImage:
      'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/IOT.webp',
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
    background:
      '电厂现场运行着大量工业设备（传感器、PLC、仪表等），设备数据是智慧电厂一切上层应用的基础。但现场设备普遍采用 Modbus 工业协议（RTU 串口通信和 TCP 以太网通信两种模式），与上层 IT 系统之间存在协议鸿沟。同时，运维团队需要直观的数据可视化界面来监控设备运行状态和异常告警，但 ThingsBoard IoT 平台的默认组件无法满足电厂定制化需求。本项目从底层协议解析到上层可视化交付，打通工业设备数据到业务展示的完整链路，为智慧电厂的数据驱动决策提供标准化数据源。',
    outcomes: [
      '开发 Modbus <strong>RTU + TCP</strong> 双协议解析模块，实现对现场工业设备数据的<strong>稳定采集</strong>',
      '通过 Python 数据适配服务对接 ThingsBoard IoT 平台，提供<strong>标准化 RESTful API</strong> 数据源',
      '基于 ThingsBoard 定制<strong>多套可视化 Widget</strong> 组件，满足电厂运维团队的个性化监控需求',
      '配置<strong>告警规则引擎</strong>实现设备异常自动检测与分级告警推送，缩短故障发现时间',
    ],
    protocolSpecs: [
      {
        protocol: 'Modbus RTU',
        medium: 'RS-485 串口',
        dataTypes: 'Holding / Input Register, Coil',
        use: '近距离有线设备（传感器、仪表）',
      },
      {
        protocol: 'Modbus TCP',
        medium: '以太网 TCP/IP',
        dataTypes: 'Holding / Input Register, Coil',
        use: '远距离网络设备（PLC、网关）',
      },
      {
        protocol: 'MQTT',
        medium: 'TCP/IP',
        dataTypes: 'JSON Telemetry',
        use: '设备 → ThingsBoard 遥测上报',
      },
      {
        protocol: 'REST API',
        medium: 'HTTP/HTTPS',
        dataTypes: 'JSON',
        use: '适配服务 → IoT 平台属性写入',
      },
    ],
    role: '独立负责工业数据采集全链路开发：研究 Modbus RTU/TCP 协议规范并实现双协议解析模块；使用 Python 开发数据适配服务与 RESTful API 对接 ThingsBoard；基于 JavaScript/HTML/CSS 定制可视化 Widget 组件（实时数据面板、趋势曲线、告警仪表盘等）；配置告警规则引擎实现设备异常自动检测与推送；完成前端可视化页面的完整开发与交付。',
    techStack: [
      'Modbus RTU/TCP',
      'Python',
      'ThingsBoard',
      'JavaScript',
      'HTML / CSS',
      'RESTful API',
      'pymodbus',
      'MQTT',
    ],
    architecture: [
      { label: '工业设备', sub: '传感器/PLC/仪表', color: '#ede9fe' },
      { label: '协议解析', sub: 'Modbus RTU + TCP', color: '#e0e7ff' },
      { label: '数据适配服务', sub: 'Python + pymodbus', color: '#dbeafe' },
      { label: 'IoT 平台', sub: 'ThingsBoard + MQTT', color: '#d1fae5' },
      { label: '告警引擎', sub: '规则链 + 分级推送', color: '#fef3c7' },
      { label: '可视化交付', sub: '定制 Widget 组件', color: '#fce7f3' },
    ],
    highlights: [
      {
        title: 'Modbus 双协议解析模块',
        description: '',
        bullets: [
          '实现 Modbus RTU（串口 RS-485）和 Modbus TCP（以太网）双协议解析，覆盖电厂现场两类主流设备通信方式',
          '基于 pymodbus 库封装统一读写接口，支持 Holding Register、Input Register、Coil 等多种寄存器类型读取',
          '设计自动重连与异常恢复机制：串口断开或 TCP 超时后自动重试，确保数据采集链路稳定可靠',
        ],
        tags: ['Modbus RTU', 'Modbus TCP', 'pymodbus', 'RS-485'],
      },
      {
        title: '数据适配与标准化',
        description: '',
        bullets: [
          '使用 Python 开发数据适配服务，将 Modbus 原始寄存器值转换为业务语义数据（温度、压力、流量等）',
          '通过 RESTful API 和 MQTT 双通道对接 ThingsBoard IoT 平台，实时上报设备遥测数据',
          '设计数据校验规则：过滤异常值（量程越界、突变检测），确保上报数据质量',
        ],
        tags: ['Python', 'RESTful API', 'MQTT', '数据校验'],
      },
      {
        title: 'ThingsBoard 可视化定制',
        description: '',
        bullets: [
          '基于 ThingsBoard Widget API 使用 JavaScript/HTML/CSS 定制多套可视化组件（实时数据面板、趋势曲线图、设备状态卡片等）',
          '开发告警仪表盘：按区域和设备类型分组展示告警状态，支持历史告警查询与统计分析',
          '独立完成前端可视化页面的设计、开发与交付，满足运维团队日常监控需求',
        ],
        tags: ['ThingsBoard', 'JavaScript', 'Widget API', '数据可视化'],
      },
      {
        title: '告警规则引擎配置',
        description: '',
        bullets: [
          '基于 ThingsBoard 规则链引擎配置多级告警策略：设备离线告警、阈值越限告警、趋势异常告警',
          '告警分级机制：按严重程度（紧急/重要/一般）分类，不同等级触发不同通知渠道与响应流程',
          '告警恢复自动确认：设备数据恢复正常后自动清除告警状态，减少人工干预',
        ],
        tags: ['规则链', '告警策略', '分级告警', '自动恢复'],
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
