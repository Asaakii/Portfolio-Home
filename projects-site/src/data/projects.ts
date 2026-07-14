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
  subsystems?: { name: string; category: string; type?: 'hardware' | 'software' }[];
  protocolSpecs?: {
    protocol: string;
    medium: string;
    dataTypes: string;
    use: string;
  }[];
  screenshots?: { src: string; alt: string }[];
  painPoints?: { title: string; description: string }[];
  solutionPositioning?: string;
  dataAssets?: { name: string; value: string; description: string }[];
  expertRoles?: { name: string; responsibility: string }[];
  reflection?: string;
  outlook?: { title: string; description: string }[];
  implementationPath?: {
    title: string;
    subtitle: string;
    steps: { name: string; description: string }[];
  };
  coreDifferentiators?: { title: string; description: string }[];
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
    period: '2026.03 — 2026.06',
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
      '本项目由四川省发展和改革委员会发起，属于省级统建的政务数智化应用场景。直接起点是省政府 2025 年 8 月的批示——要求"建设数智赋能县域经济动态监测和研究分析平台"，随后由省发改委牵头，经"四张清单"申报论证程序立项，总投资概算约 2682 万元。项目不是从零开始的全新系统，而是对省发改委现有县域经济监测平台的智能化升级——原平台仅覆盖约 20 项宏观监测指标，以人工填报和静态排名为主，无法支撑精细化研判和跨部门协同决策。四川省 183 个县（市、区）发展差异大、产业定位趋同、政策传导效率低，需要一套数智化工具来支撑精准施策。',
    painPoints: [
      {
        title: '底数不清',
        description:
          '全省县域季度核心指标约 3500 个、年度约 8000 个，但现有监测体系偏重 GDP、固投等宏观指标，缺少产业结构、增长动能、要素配置等深度分析维度。数据人工汇总校核效率低，从收集到报告产出周期需 1—3 个月。',
      },
      {
        title: '研判不准',
        description:
          '在全省 15+N 现代产业体系布局下，61.2% 的县域主导产业集中在食品饮料、装备制造等传统赛道，产业筛选和比较优势研判仍依赖经验判断，缺乏量化工具支撑错位发展。',
      },
      {
        title: '协同不畅',
        description:
          '县域经济核心监管事项中有 15 项需跨部门调取 12 类数据，涉及 18 个省级部门。全省跨部门数据共享响应平均时长超 72 小时，三级联动依赖人工对接。',
      },
      {
        title: '政策不精',
        description:
          '省级每年向 183 个县下发经济发展、产业扶持、民生保障类政策超 200 项，但仅三分之一实现全流程跟踪，事前无沙盘推演、事中无实时监测、事后无精准评估。',
      },
      {
        title: '决策不快',
        description:
          '报告产出周期长，人工汇总校核易出错，从数据采集到分析报告落地存在显著时间损耗，无法匹配经济形势快速变化。',
      },
      {
        title: '基层负担重',
        description:
          '基层面临数据重复报送、表格多头填报、分析任务繁重等问题，人工汇总效率低、误差大，亟需数智化工具减负增效。',
      },
    ],
    solutionPositioning:
      '智能内核不是单一聊天机器人，也不是单一报告生成脚本，而是嵌入三大业务平台全流程的智能分析引擎——把县域经济分析所需的业务链、专家角色、知识库、结构化数据、证据边界、质量门禁和交付物组织成可复用、可追踪、可平台化接入的智能体业务编排系统。项目重构三大核心业务流程：县域经济监测分析从人工填报升级为多源数据自动归集与智能预警；主导产业错位发展规划从经验判断升级为量化比较优势分析与"一县一策"方案智能生成；政策执行从事后总结升级为事前推演、事中监测、事后量化评估的全周期闭环。系统明确划定边界：不替代统计部门的正式数据口径，不直接生成正式考核排名或因果结论，所有 AI 产出标注证据层级和使用边界，正式规划仍需人工组织和专家评审。',
    dataAssets: [
      {
        name: '统计年鉴数据',
        value: '324,539 条',
        description:
          '覆盖 925 个地区、970 张统计表，时间跨度 1952—2024 年，含 183 县专属 11 类指标',
      },
      {
        name: '企业工商数据',
        value: '22,119 家',
        description:
          '覆盖 21 个市州，包含工商登记、行业分类、经营范围等 18 个字段',
      },
      {
        name: 'Dify 知识库',
        value: '427 个文档',
        description:
          '12 个专题知识库，约 254 万字，覆盖政策、规划、会议纪要、产业资料等',
      },
      {
        name: '数据治理矩阵',
        value: '9,150 条',
        description:
          '183 个县 × 5 年 × 多张统计表的覆盖度评估，量化每个县的数据缺口',
      },
      {
        name: '源材料归档',
        value: '823 张卡片',
        description:
          '全量源材料卡片 + 原始文件（22 MB），覆盖 281 个 Hermes 文件 + 167 个 OpenClaw 文件',
      },
    ],
    expertRoles: [
      { name: '首席经济专家', responsibility: '统一业务链判断、证据边界和最终口径' },
      { name: '数据治理专家', responsibility: '检查指标来源、口径、缺失项和数据质量' },
      { name: '运行监测分析师', responsibility: '形成运行态势摘要、指标解释和压力判断' },
      { name: '预警分析师', responsibility: '解释预警触发规则和复核方向' },
      { name: '产业战略专家', responsibility: '形成产业画像、优势方向和短板判断' },
      { name: '链条分析师', responsibility: '分析产业链缺口、项目支撑和补链机会' },
      { name: '瓶颈诊断专家', responsibility: '把预警和诊断转化为可核验的瓶颈假设' },
      { name: '政策规划专家', responsibility: '把问题和预警转化为政策抓手' },
      { name: '县域规划总师', responsibility: '接收上游分析包，组织一县一策与规划交付物' },
      { name: '规划质量审查专家', responsibility: '检查规划框架的证据、边界和越权表达' },
      { name: '项目招商分析师', responsibility: '生成招商补链机会清单' },
      { name: '落地服务专员', responsibility: '把项目机会转化为落地服务和部门协同任务' },
      { name: '量化模型分析师', responsibility: '选择统计模型、检查前置假设并解释模型边界' },
      { name: '县域治理知识分析师', responsibility: '解释县域财政、产业、项目、企业和治理运转逻辑' },
    ],
    reflection:
      '这个项目让我深刻理解了 AI 在政务场景中的边界问题。最大的收获不是技术实现本身，而是建立了"证据层级意识"——在政务分析中，硬指标结论必须有硬数据支撑、瓶颈归因只能作为待核验假设、规划建议必须引用上游分析结论。这种边界控制思维在通用 AI 应用中容易被忽视，但在政务场景中是生命线。架构迁移（OpenClaw → Hermes）的经历也让我认识到：技术选型不是一次性决策，而是随项目形态演进的持续判断——当项目从"聊天入口触发 Agent"升级为"长期运行的业务智能内核"时，平台能力的匹配度比历史资产的沉没成本更重要。另一个重要反思是数据治理的优先级：我们花了大量时间从零建立覆盖全省 183 个县的数据底座，这看似是"基础设施工作"，但实际上决定了上层所有分析的可信度和可用性。',
    implementationPath: {
      title: '隆昌试点 · 端到端实施路径',
      subtitle: '以隆昌县为试点，展示从原始数据采集到正式交付物产出的完整链路',
      steps: [
        {
          name: '数据采集与治理',
          description:
            '采集隆昌县多源政府文档（统计公报、政府工作报告、政策 PDF、企业 Excel 等），建立覆盖 183 县 × 5 年的数据资产目录，量化每个县的数据缺口并生成部门补数清单。',
        },
        {
          name: '知识库建设与文档解析',
          description:
            '将 1000+ 份文档经 MinerU / MarkItDown / Jina 解析后入库，构建 6 类 Dify 知识库（2100+ 分块，约 270 万字），覆盖政策、规划、会议纪要、产业资料等。',
        },
        {
          name: '运行监测与产业诊断',
          description:
            '系统自动完成隆昌经济运行态势摘要与预警识别，形成产业画像和比较优势判断，产出运行监测报告和产业诊断报告。',
        },
        {
          name: '瓶颈归因与政策决策',
          description:
            '将监测预警和产业诊断转化为待核验瓶颈假设与验证任务，匹配政策依据，生成政策行动矩阵和决策报告。',
        },
        {
          name: '一县一策规划与项目招商',
          description:
            '汇总上游分析包，生成一县一策规划框架（v0.1→v0.2 深化稿）、规划专家任务包和招商补链机会清单，由 county_planning_subagent 协同规划写作队列。',
        },
        {
          name: '质量门禁与交付',
          description:
            '经证据核验 Subagent、质量审查 Subagent 和专家终审三级门禁，产出 12 类结构化交付物（Markdown 报告、JSON 清单、Word 送审稿），不通过则进入人工复核重跑闭环。',
        },
      ],
    },
    coreDifferentiators: [
      {
        title: '证据层级体系',
        description:
          '严格区分硬数据（指标值、台账）、软证据（调研材料、政策文本）、待核验假设（瓶颈归因、因果推断）和专家规则（角色边界、门禁约束）四级证据，所有 AI 产出标注证据层级和使用边界，不把相关性写成因果性。',
      },
      {
        title: '业务链强控制',
        description:
          '9 条业务链的路由由 workflow_id 和 add_conditional_edges 控制，而非 LLM 临场发挥。相同入口稳定进入相同业务链，招商链必须经过"运行监测→产业诊断→瓶颈归因"后才能生成招商机会。',
      },
      {
        title: '质量门禁驱动',
        description:
          '报告不是一次性生成，而是经过 6 层质量门禁（数字/证据/逻辑/结构/发布/敏感）逐级审查。门禁不通过自动进入 needs_human_review 状态，支持 retry_job 重跑，确保产出可用于正式决策场景。',
      },
      {
        title: '专属知识库 vs 通用大模型',
        description:
          '区别于互联网通用大模型，系统基于地方政府专属的统计年鉴、政策文本、产业资料等构建领域知识底座。模型检索本地知识库而非互联网数据，确保产出贴合地方实际而非泛化生成。',
      },
      {
        title: '多步接力而非单点问答',
        description:
          '县域经济分析不是一次问答，而是多节点接力——项目招商链需经 5 个上游节点积累分析包后才产出招商清单，一县一策规划链需经 7 个节点才到达专家终审，每个节点读写同一个 CountyEconomyState 状态黑板。',
      },
    ],
    outlook: [
      {
        title: '扩展结构化知识表示',
        description:
          '把县域、产业、指标、政策、项目、部门和证据来源之间的关系沉淀为可查询的知识图谱，从文档检索升级为关系推理。',
      },
      {
        title: '增强质量门禁自动修订',
        description:
          '当前质量门禁不通过需人工复核后重跑，后续将增加图内自动修订循环——质量门禁驱动 revision_planner 自动修改草稿再重新审查。',
      },
      {
        title: '多县复用机制',
        description:
          '在隆昌试点基础上抽象多县模板、指标适配规则、产业类型画像和政策匹配方法，实现从单县验证到全省 183 个县的规模化覆盖。',
      },
      {
        title: '平台化持久化增强',
        description:
          '将工作记忆和推理解释从 runtime state 写入 PostgreSQL 证据链数据库，支持跨 session 的分析追溯和版本化回滚。',
      },
    ],
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
    screenshots: [
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/%E6%9E%B6%E6%9E%84%E5%9B%BE.webp',
        alt: '智能内核总体架构图',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/OpenClaw%20%E5%8E%BF%E5%9F%9F%E7%BB%8F%E6%B5%8E%20LangGraph%20%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%80%BB%E8%A7%88-%E6%80%BB%E8%A7%88-%E8%BF%90%E8%A1%8C%E6%97%B6%E8%B7%AF%E7%94%B1.drawio.webp',
        alt: 'LangGraph 9 条业务链运行时路由图',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/chatflow%E5%B1%95%E7%A4%BA.webp',
        alt: 'Dify Chatflow 20 个专家角色总览',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/%E6%99%BA%E8%83%BD%E4%BD%93%E5%AF%B9%E8%AF%9D.webp',
        alt: 'Agent 实际对话 · 隆昌高新企业分析',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/%E9%9A%86%E6%98%8C%E7%9F%A5%E8%AF%86%E5%BA%93.webp',
        alt: '隆昌知识库 · 136 份政府文档',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/chatflow.webp',
        alt: '数据治理链 Chatflow 编排详情',
      },
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
        description: '解决县域经济分析中业务流程松散、多环节依赖人工衔接效率低的问题',
        bullets: [
          '设计 CountyEconomyState 状态模型，承载 request → workflow → roles → data → analysis → review → outputs → trace 全链路状态',
          '使用 add_conditional_edges 实现 9 条业务链的条件路由，分支由 workflow_id 控制而非模型临场发挥',
          '支持多步接力：招商链需经"运行监测→产业诊断→瓶颈归因"后才生成招商机会与政策闭环清单',
        ],
        tags: ['LangGraph', 'State Machine', 'Conditional Routing'],
      },
      {
        title: '13 阶段报告生成链路',
        description: '解决从原始材料到正式报告周期长达数天、人工汇总校核易出错的问题',
        bullets: [
          '从"需求触发"到"Obsidian 归档"的 13 阶段连续链路，而非一次性 prompt 写作',
          '文档解析层：MinerU 解析扫描件、MarkItDown 转 Markdown、Jina 抽取网页、pandas 清洗 Excel',
          '分析包构建：先汇聚经济运行摘要、产业画像、瓶颈假设、政策依据等中间层，再交由专家角色生成草稿',
        ],
        tags: ['MinerU', 'MarkItDown', 'Jina Reader', 'pandas'],
      },
      {
        title: 'RAG + 结构化数据双通道',
        description: '解决政策判断缺乏依据、数字结论缺少来源的可信度问题',
        bullets: [
          'Dify 承载 6 类知识库（2100+ 分块，约 270 万字），覆盖政策、规划、会议纪要、产业资料等软知识',
          'PostgreSQL 承载县域指标、企业、项目等硬数据，支撑具体数字和结构化查询',
          '融合原则：具体数字必须有结构化来源，政策判断必须有政策依据，不足以定性写成"待核验事项"',
        ],
        tags: ['Dify', 'PostgreSQL', 'RAG', 'Rerank'],
      },
      {
        title: '6 层质量门禁体系',
        description: '解决 AI 生成内容无审查机制、可能越界承诺或输出错误结论的安全风险',
        bullets: [
          '数字门禁（来源/年份/口径）、证据门禁（追溯性）、逻辑门禁（因果边界）',
          '结构门禁（章节合规）、发布门禁（人工复核）、敏感门禁（脱敏检查）',
          '门禁不通过进入 needs_human_review 状态，支持 retry_job 重新运行',
        ],
        tags: ['Quality Gate', 'Evals', 'Human Review'],
      },
      {
        title: 'OpenClaw → Hermes 架构迁移',
        description: '解决原架构定位为聊天入口 Gateway、无法承载长期运行业务内核的技术瓶颈',
        bullets: [
          'OpenClaw 定位为多渠道 Gateway，适合入口层但不适合承载长期运行的业务内核',
          'Hermes 提供 Persistent Memory、Skills System、MCP、Subagent Delegation、Cron 和 API Server',
          '迁移后业务链、专家角色、质量门禁和交付闭环沉淀为可复用的项目资产',
        ],
        tags: ['Hermes Agent', 'OpenClaw', 'Architecture Migration'],
      },
      {
        title: '工具链与 MCP 服务化',
        description: '解决工具能力分散、接入方式不统一、无法标准化复用的问题',
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
      '完成 27 个子系统（17 个硬件 + 10 个软件）集成对接，设计统一适配层实现协议归一化，覆盖 500+ 台终端设备数据接入，搭建统一运维监控大屏。',
    icon: '⚡',
    coverImage:
      'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/yitihua.webp',
    categoryLabel: 'SYSTEM INTEGRATION',
    gradientFrom: '#fff8f0',
    gradientTo: '#f8f0e8',
    categoryColor: '#b08b5a',
    metrics: [
      { value: '27', label: '子系统' },
      { value: '500+', label: '终端设备' },
      { value: '统一', label: '监控大屏' },
      { value: '全自动', label: '报表推送' },
    ],
    background:
      '电厂在智慧化改造过程中陆续引入了安防监控、人员定位、门禁道闸、视频监控等 17 套硬件子系统，以及智慧运行、智慧检修、智慧安全等 10 套软件应用子系统，但各系统由不同厂商建设，接口协议各异（REST、WebSocket、MQTT、私有 SDK 等），数据格式不统一，运维人员需要在多个平台间反复切换查看，无法形成统一态势感知。本项目旨在构建"一体化平台"，通过设计统一协议适配层将 27 个子系统整合为一个统一入口，实现设备状态实时监控、告警事件统一处理和运维报表自动推送，从根本上解决"信息孤岛"和"多屏切换"的运维痛点。',
    outcomes: [
      '完成 <strong>27</strong> 个子系统的集成对接，覆盖 17 个硬件子系统（视频监控、门禁道闸、人员定位、网络安全等）和 10 个软件子系统（智慧运行、智慧检修、智慧安全等）',
      '接入 <strong>500+</strong> 台终端设备的实时数据，设备在线率监控覆盖率达到 <strong>100%</strong>',
      '搭建统一运维监控大屏，运维人员从"多平台切换"收敛为<strong>单屏操作</strong>，响应效率显著提升',
      '实现运维报表<strong>全自动推送</strong>，将原依赖人工导出的周期性流程完全自动化，每周节省数小时人工操作',
    ],
    subsystems: [
      { name: '机房建设', category: '基础设施', type: 'hardware' },
      { name: '智慧展厅', category: '基础设施', type: 'hardware' },
      { name: '超融合', category: '基础设施', type: 'hardware' },
      { name: '有线网络', category: '网络', type: 'hardware' },
      { name: '无线网络', category: '网络', type: 'hardware' },
      { name: '网络安全', category: '网络', type: 'hardware' },
      { name: '视频监控', category: '安防', type: 'hardware' },
      { name: '门禁道闸及访客机', category: '安防', type: 'hardware' },
      { name: '周界防护及电子巡更', category: '安防', type: 'hardware' },
      { name: '人员定位', category: '定位', type: 'hardware' },
      { name: '物资设备管理', category: '管理', type: 'hardware' },
      { name: '信息展示大屏', category: '展示', type: 'hardware' },
      { name: '会议室', category: '通信', type: 'hardware' },
      { name: '智能机器人', category: '智能', type: 'hardware' },
      { name: '语音广播', category: '通信', type: 'hardware' },
      { name: '其他普通设备', category: '其他', type: 'hardware' },
      { name: '其他智能设备', category: '其他', type: 'hardware' },
      { name: '仿真培训系统', category: '培训仿真', type: 'software' },
      { name: '数字化虚拟电厂', category: '数字孪生', type: 'software' },
      { name: '智慧安全应用', category: '安全', type: 'software' },
      { name: '智慧管控平台', category: '管控', type: 'software' },
      { name: '智慧管理应用', category: '管理', type: 'software' },
      { name: '智慧检修应用', category: '检修', type: 'software' },
      { name: '智慧建设应用', category: '建设', type: 'software' },
      { name: '智慧经营应用', category: '经营', type: 'software' },
      { name: '智慧运行平台', category: '运行', type: 'software' },
      { name: '智慧运行应用', category: '运行', type: 'software' },
    ],
    screenshots: [
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/1.%E5%9B%9B%E5%B7%9D%E8%83%BD%E6%8A%95%E5%B9%BF%E5%85%83%E7%87%83%E6%9C%BA%E5%B7%A5%E7%A8%8B%E6%99%BA%E6%85%A7%E7%94%B5%E5%8E%82%E9%87%87%E8%B4%AD%E8%BD%AF%E4%BB%B6%E5%BA%94%E7%94%A8%E6%8A%80%E6%9C%AF%E6%9C%8D%E5%8A%A1_%E6%99%BA%E6%85%A7%E5%BB%BA%E8%AE%BE_%E5%9F%BA%E5%BB%BA%E9%97%A8%E6%88%B7.webp',
        alt: '基建管理驾驶舱大屏',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/34.%E5%9B%9B%E5%B7%9D%E8%83%BD%E6%8A%95%E5%B9%BF%E5%85%83%E7%87%83%E6%9C%BA%E5%B7%A5%E7%A8%8B%E6%99%BA%E6%85%A7%E7%94%B5%E5%8E%82%E9%87%87%E8%B4%AD%E8%BD%AF%E4%BB%B6%E5%BA%94%E7%94%A8%E6%8A%80%E6%9C%AF%E6%9C%8D%E5%8A%A1_%E6%99%BA%E6%85%A7%E7%BB%8F%E8%90%A5_%E5%A4%A7%E5%B1%8F%E5%BA%94%E7%94%A8.webp',
        alt: '智慧经营驾驶舱',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/23.%E5%9B%9B%E5%B7%9D%E8%83%BD%E6%8A%95%E5%B9%BF%E5%85%83%E7%87%83%E6%9C%BA%E5%B7%A5%E7%A8%8B%E6%99%BA%E6%85%A7%E7%94%B5%E5%8E%82%E9%87%87%E8%B4%AD%E8%BD%AF%E4%BB%B6%E5%BA%94%E7%94%A8%E6%8A%80%E6%9C%AF%E6%9C%8D%E5%8A%A1_%E6%99%BA%E6%85%A7%E5%AE%89%E5%85%A8_%E6%99%BA%E8%83%BD%E5%AE%89%E9%98%B2.webp',
        alt: '智能安防 · 在线围栏调度平台',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/5.%E5%9B%9B%E5%B7%9D%E8%83%BD%E6%8A%95%E5%B9%BF%E5%85%83%E7%87%83%E6%9C%BA%E5%B7%A5%E7%A8%8B%E6%99%BA%E6%85%A7%E7%94%B5%E5%8E%82%E9%87%87%E8%B4%AD%E5%B9%B3%E5%8F%B0%E5%8F%8A%E9%83%A8%E7%BD%B2%E6%9C%8D%E5%8A%A1_%E5%B7%A5%E4%B8%9A%E5%A4%A7%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6.webp',
        alt: '工业大数据 · 时序数据库管理平台',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/3.%E5%9B%9B%E5%B7%9D%E8%83%BD%E6%8A%95%E5%B9%BF%E5%85%83%E7%87%83%E6%9C%BA%E5%B7%A5%E7%A8%8B%E6%99%BA%E6%85%A7%E7%94%B5%E5%8E%82%E9%87%87%E8%B4%AD%E5%B9%B3%E5%8F%B0%E5%8F%8A%E9%83%A8%E7%BD%B2%E6%9C%8D%E5%8A%A1_%E7%BB%84%E6%80%81%E5%BB%BA%E6%A8%A1%E7%BB%84%E4%BB%B6.webp',
        alt: '一体化平台 · 组态建模',
      },
      {
        src: 'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/7.%E5%9B%9B%E5%B7%9D%E8%83%BD%E6%8A%95%E5%B9%BF%E5%85%83%E7%87%83%E6%9C%BA%E5%B7%A5%E7%A8%8B%E6%99%BA%E6%85%A7%E7%94%B5%E5%8E%82%E9%87%87%E8%B4%AD%E5%B9%B3%E5%8F%B0%E5%8F%8A%E9%83%A8%E7%BD%B2%E6%9C%8D%E5%8A%A1_%E6%95%B0%E5%AD%97%E5%AD%AA%E7%94%9F%E7%BB%84%E4%BB%B6.webp',
        alt: '数字孪生 · 工厂建模',
      },
    ],
    role: '独立负责异构子系统集成架构设计与实现：调研 27 个子系统（17 个硬件 + 10 个软件）的接口协议与数据格式，设计统一适配层完成协议归一化；基于 MQTT 构建设备事件异步采集管道；使用 Vue + ECharts 开发统一运维监控大屏，包括设备拓扑、实时告警、趋势分析等模块；开发 FastAPI 后端服务实现跨系统数据聚合与报表自动生成推送。',
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
      { label: '27 子系统', sub: '17 硬件 + 10 软件', color: '#fef3c7' },
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
        title: '27 子系统协议适配层',
        description: '',
        bullets: [
          '调研并对接 27 个子系统，硬件涵盖视频监控、门禁道闸、周界防护、人员定位、网络安全等 17 套，软件涵盖智慧运行、智慧检修、智慧安全、智慧经营等 10 套',
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
