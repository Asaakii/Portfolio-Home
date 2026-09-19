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
  runtimeCase?: {
    title: string;
    subtitle: string;
    input: { label: string; value: string }[];
    steps: {
      name: string;
      tool: string;
      description: string;
      result: string;
    }[];
  };
  engineeringMethods?: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
    evidence: { value: string; label: string; detail: string }[];
  };
  deliveryLayers?: {
    name: string;
    format: string;
    description: string;
  }[];
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
      '基于 LangGraph 编排 9 条业务链的主 Agent 与 Subagent 系统，打通政策知识库与统计指标双通道，配合 6 层质量门禁，把政府材料自动整理、分析并输出为 Word 送审报告。',
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
      '本项目由四川省发改委发起，总投资概算约 2682 万元，是对原有县域经济监测平台的升级改造。原平台仅覆盖约 20 项宏观指标，主要靠人工填报和静态排名，难以支撑深度研判与跨部门协同。四川省 183 个县（市、区）发展差异大、产业定位容易趋同，需要一套系统梳理海量统计数据和政策资料，为精准研判和错位发展提供量化支撑。',
    painPoints: [
      {
        title: '指标维度浅、周期长',
        description:
          '全省县域季度指标约 3500 个、年度约 8000 个，原有监测集中在 GDP、固投等宏观数字，缺少产业结构和要素流向等深层数据；人工汇总校核通常需要 1 到 3 个月。',
      },
      {
        title: '产业同质化、缺少量化依据',
        description:
          '全省 61.2% 的县域主导产业集中在食品饮料、装备制造等传统赛道，产业优势判断过去多凭经验，缺少横向比较与错位发展的量化工具。',
      },
      {
        title: '跨部门取数慢',
        description:
          '县域经济重点监管事项涉及 18 个省级部门的 12 类数据，跨部门协调取数平均耗时超 72 小时，省市县联动全靠人工对接。',
      },
      {
        title: '政策执行缺少追踪',
        description:
          '省级每年发给 183 个县的产业扶持和民生政策超 200 项，仅约三分之一有完整跟踪，事前缺少推演、事中缺监测、事后缺量化评估。',
      },
      {
        title: '报告产出滞后',
        description:
          '以往从数据采集、多轮核对到最终成稿流程繁琐，容易出错，报告出来时往往赶不上经济形势的新变化。',
      },
      {
        title: '基层填报负担重',
        description:
          '基层面临表格多头填报、数据反复报送的问题，耗费大量人力且口径容易打架，迫切需要自动化工具减负。',
      },
    ],
    solutionPositioning:
      '系统是嵌入在省发改委业务流程中的智能分析引擎，把县域分析涉及的 9 条业务链、14 个专家角色、本地知识库、指标数据、质量门禁与输出模版整合为受控的 Agent 系统。平台打通了多源数据自动归集、产业比较优势量化分析与政策推演评估流程。系统明确限定工作边界：不代替统计部门官方口径，不自行生成考核排名或因果结论，所有结论标注依据来源与使用边界，最终规划仍由人工组织和专家评审把关。',
    dataAssets: [
      {
        name: '统计年鉴数据',
        value: '324,539 条',
        description:
          '覆盖 925 个地区、970 张统计表，时间跨度 1952—2024 年，含 183 县专属指标',
      },
      {
        name: '企业工商数据',
        value: '22,119 家',
        description:
          '覆盖 21 个市州，包含工商登记、行业分类、经营范围等 18 个字段',
      },
      {
        name: '政策与资料知识库',
        value: '427 份',
        description:
          '12 个专题知识库，约 254 万字，覆盖政策、规划、纪要与产业资料',
      },
      {
        name: '数据覆盖度矩阵',
        value: '9,150 条',
        description:
          '梳理 183 县 × 5 年数据覆盖情况，量化各县缺口并出具补数清单',
      },
      {
        name: '原始归档文件',
        value: '823 份',
        description:
          '全量原始材料卡片与文件（22 MB），含 281 个 Hermes 文件和 167 个 OpenClaw 文件',
      },
    ],
    expertRoles: [
      { name: '首席经济专家', responsibility: '负责统一业务链判断、证据边界与最终结论口径' },
      { name: '数据治理专家', responsibility: '核查指标来源、统计口径、缺失项与数据质量' },
      { name: '运行监测分析师', responsibility: '梳理经济运行态势摘要、指标解释与下行压力点' },
      { name: '预警分析师', responsibility: '解释预警触发规则并明确线下核查方向' },
      { name: '产业战略专家', responsibility: '输出产业画像、优势赛道与短板判断' },
      { name: '产业链分析师', responsibility: '梳理产业链断点、重点项目支撑与补链空间' },
      { name: '瓶颈诊断专家', responsibility: '把运行预警转化为可验证的瓶颈假设' },
      { name: '政策规划专家', responsibility: '结合问题与预警匹配政策支持抓手' },
      { name: '县域规划总师', responsibility: '汇总上游分析材料，牵头起草一县一策规划' },
      { name: '规划审查专家', responsibility: '审查规划依据、表述边界与是否存在越权定性' },
      { name: '招商引资分析师', responsibility: '梳理产业链上下游缺口并输出招商机会清单' },
      { name: '落地协同专员', responsibility: '把招商线索转化为落地跟进与部门协同任务' },
      { name: '量化模型分析师', responsibility: '选择统计分析模型，检查前置假设并明确模型适用范围' },
      { name: '治理机制分析师', responsibility: '梳理县域财政、产业、项目与部门治理逻辑' },
    ],
    reflection:
      '做政务场景的 Agent，最核心的不是让模型写得多漂亮，而是管住它的表达边界。硬指标必须从数据库查具体数字，瓶颈归因只能写成待核验假设，政策建议必须引用上游结论，绝不能让模型凭感觉把相关性写成因果性。从 OpenClaw 迁移到 Hermes 的过程也让我体会到选型的务实性：早期当作对话网关用没问题，但当系统演化成需要定时任务、状态持久化、MCP 工具集和 Subagent 协同的复杂业务后台时，就得果断切到更匹配业务形态的架构上。另外，我们花了大半精力做全省 183 县的数据治理和底座清洗，虽然干的是脏活累活，但底座不扎实，上层再聪明的 Agent 也跑不准。',
    implementationPath: {
      title: '隆昌试点 · 端到端实施路径',
      subtitle: '以隆昌市为试点，跑通从数据采集、多步分析到输出正式交付物的完整链路',
      steps: [
        {
          name: '数据采集与治理',
          description:
            '汇总隆昌县统计公报、政府工作报告、政策与企业资料，摸排 183 县 × 5 年数据覆盖情况，梳理缺漏并生成补数清单。',
        },
        {
          name: '文档解析与入库',
          description:
            '将 1000+ 份材料经 MinerU / MarkItDown / Jina 解析，分门别类入库（2100+ 分块，约 270 万字），覆盖政策、规划与产业材料。',
        },
        {
          name: '运行监测与产业画像',
          description:
            '自动生成经济运行态势摘要与指标预警，结合产业数据量化比较优势，输出监测报告和诊断报告。',
        },
        {
          name: '瓶颈归因与政策匹配',
          description:
            '将预警信号和产业短板转化为待核验假设，关联政策条款，输出政策行动建议矩阵。',
        },
        {
          name: '一县一策规划与招商整理',
          description:
            '汇总各环节分析结果，起草规划框架初稿，生成产业链招商清单，由子 Agent 协同排版撰写。',
        },
        {
          name: '质量门禁与交付归档',
          description:
            '通过证据校验、文本合规审查和专家复核，输出 Markdown 报告、JSON 清单和 Word 送审材料；未通过项转入人工复核重跑。',
        },
      ],
    },
    runtimeCase: {
      title: '隆昌市运行监测 · 真实任务链路',
      subtitle: '以隆昌市综合运行监测为例，展示 Agent 运行时如何把指令转化为有依据的分析报告',
      input: [
        { label: '县域', value: '隆昌市 · 510283' },
        { label: '周期', value: '2024 年' },
        { label: '任务', value: '综合运行监测' },
        { label: '输出', value: '运行监测报告' },
      ],
      steps: [
        {
          name: '任务受理',
          tool: 'intake',
          description: '解析县域编号、时间周期与任务类型，将自然语言请求转为标准化调度任务。',
          result: '匹配 workflow_id，初始化任务上下文',
        },
        {
          name: '角色与权限分派',
          tool: 'role_dispatch',
          description: '载入运行监测角色的分析规范、工具权限与结构化输出模版。',
          result: '确定当前角色、工具集合与操作流程',
        },
        {
          name: '指标数据查询',
          tool: 'query_indicator · MCP',
          description: '从 PostgreSQL 查询 GDP、规上工业增加值、固投及同比增速。',
          result: '获取精准数值，保留年份与统计口径',
        },
        {
          name: '政策与背景检索',
          tool: 'Dify RAG · Rerank',
          description: '按 2024 年度和县级维度检索政府工作报告与统计公报。',
          result: '检索到对应政策背景与原文段落',
        },
        {
          name: '组装中间分析包',
          tool: 'CountyEconomyState',
          description: '把硬指标、原文依据、预警条目整合到共享状态中，供报告生成使用。',
          result: '形成运行态势摘要与横向对比依据',
        },
        {
          name: '审查并输出报告',
          tool: 'review · artifact registry',
          description: '校验数字出处、证据边界与格式规范，生成报告并记录操作痕迹。',
          result: '输出带出处、可复核的运行监测报告',
        },
      ],
    },
    engineeringMethods: {
      title: '知识工程与检索优化',
      description: '将专家经验、研究框架与零散材料拆解为可调用的工具、规则与评测题库。',
      items: [
        {
          title: '提炼专家分析规则',
          description: '梳理专家研判逻辑，把分析维度、证据要求和反例总结成系统角色的 Prompt 规则与业务流程。',
        },
        {
          title: '计算逻辑工具化',
          description: '把指标计算、公式统计等确定性逻辑封装为 SQL 查询与 Python 处理工具，减少大模型运算偏差。',
        },
        {
          title: '四维元数据过滤',
          description: '在向量检索前先按领域、资料类型、时间年份和层级精简范围，再做语义召回与重排序。',
        },
        {
          title: '测试集回归验证',
          description: '用固定问题题库定期回归，检验目标资料召回率、相关性得分和引用准确度，避免调整后退化。',
        },
      ],
      evidence: [
        { value: '12 题', label: '固定检索测试集', detail: '用于策略调整与分块效果回归' },
        { value: '1,855 → 720 字', label: '报告平均分块', detail: '层级分块后消除超大文本块' },
        { value: '0 → 0.67–0.75', label: '会议纪要语义得分', detail: '清洗口语碎片并重建知识条目' },
        { value: '0.815', label: '表目录查询得分', detail: '为 206 张表建立业务域目录索引' },
      ],
    },
    deliveryLayers: [
      {
        name: '报告层',
        format: 'Markdown · Word',
        description: '面向业务人员与专家评审，输出格式规范、可直接编辑的 Word 送审稿与报告。',
      },
      {
        name: '结构化数据层',
        format: 'JSON · Matrix · List',
        description: '输出政策矩阵、招商清单和数据资产目录，供业务系统与前端组件使用。',
      },
      {
        name: '审计追踪层',
        format: 'Evidence · Review · Trace',
        description: '记录数据出处、门禁审查结论与工具调用日志，方便后续追溯与排查。',
      },
    ],
    coreDifferentiators: [
      {
        title: '分级管理证据来源',
        description:
          '严格划分硬数据（指标数值）、软证据（政策材料）、待核验假设（瓶颈归因）与门禁规则，所有输出注明依据层级，不把相关性写成因果关系。',
      },
      {
        title: '业务链由状态机硬控制',
        description:
          '9 条业务链由 workflow_id 与条件分支明确调度，相同请求进入相同路径；招商分析必须依赖上游运行监测与瓶颈归因完成后的结果。',
      },
      {
        title: '嵌入 6 层质量审查门禁',
        description:
          '报告生成后经过数字、证据、逻辑、格式、人工确认及脱敏 6 层门禁检查，未通过则挂起等待人工复核或重新执行。',
      },
      {
        title: '基于政务专属资料构建底座',
        description:
          '依靠本地统计年鉴、政策汇编和产业调研材料建库，检索本地资料作答，确保内容符合县域实际情况。',
      },
      {
        title: '多节点接力沉淀共享状态',
        description:
          '长流程分析拆成多个节点逐步递进，招商链需 5 个节点汇总材料，规划链需 7 个节点交接，各节点统一读写 CountyEconomyState 状态。',
      },
    ],
    outlook: [
      {
        title: '构建结构化知识图谱',
        description:
          '把县域、主导产业、关键指标、扶持政策与部门职责沉淀为知识图谱，提升复杂关系推理能力。',
      },
      {
        title: '增加图内自动修正循环',
        description:
          '优化当前未过门禁需人工复核重跑的机制，让 Agent 结合审查反馈自动修改草稿再交审。',
      },
      {
        title: '沉淀多县通用分析模版',
        description:
          '总结隆昌试点经验，提炼通用指标适配、产业类型画像与政策匹配规则，为覆盖更多区县做准备。',
      },
      {
        title: '强化状态与轨迹持久化',
        description:
          '把分析过程、中间推导和证据链从内存状态同步到 PostgreSQL，便于长期归档与历史版本比对。',
      },
    ],
    outcomes: [
      '在<strong>隆昌市</strong>试点完成全流程验证，覆盖运行监测、产业诊断、瓶颈归因、政策匹配、招商梳理和一县一策规划等场景',
      '处理 <strong>1000+</strong> 份政府资料（统计公报、工作报告、政策汇编与表格），建起 <strong>6 类</strong> Dify 知识库（2100+ 分块，约 <strong>270 万字</strong>）',
      '单次全链路报告生成时间从过去人工耗费数天缩减至约 <strong>30 分钟</strong>，产出 <strong>12 类</strong>结构化交付物（诊断报告、政策矩阵、招商清单、规划初稿等）',
      '累计形成 <strong>81 份</strong>交付材料，涵盖规划方案、样例报告、审查清单、任务工单与 Word 送审稿',
      '把 Agent 内核从 <strong>OpenClaw 迁移到 Hermes</strong>，支持多业务链编排、长时间运行与结构化交付',
      '编写 <strong>50+</strong> 项自动化测试用例与 <strong>50+</strong> 项评测指标，覆盖核心功能与交付质量回归',
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
      { name: '数字门禁', check: '核查数字是否有清晰来源、年份和口径' },
      { name: '证据门禁', check: '核验政策和结论是否能追溯原文' },
      { name: '逻辑门禁', check: '检查是否将相关性推论表述为因果关系' },
      { name: '结构门禁', check: '核对是否符合报告章节规范与排版结构' },
      { name: '发布门禁', check: '判断是否需要转入人工复核与部门核验' },
      { name: '敏感门禁', check: '检查是否包含涉密或不可外发的敏感信息' },
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
    role: '独立负责 Agent 智能内核架构与开发：设计 CountyEconomyState 状态模型与 LangGraph 业务链条件路由；开发 9 条业务链（数据治理、运行监测、产业诊断、瓶颈归因、政策决策、项目招商、一县一策规划、模型分析、治理知识）的节点逻辑与流转机制；构建专家角色协同规则与 6 层质量审查门禁；主导从 OpenClaw 到 Hermes Agent 的框架迁移；在隆昌市跑通试点并完成端到端成果交付。',
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
        title: 'LangGraph 业务链条件路由',
        description: '梳理县域经济分析中的分散环节，用状态机实现各步骤稳定衔接',
        bullets: [
          '设计 CountyEconomyState 状态模型，全程串联请求、流程、角色、数据、审查与产物',
          '用 add_conditional_edges 编排 9 条业务链，分支跳转由 workflow_id 明确控制',
          '支持多步接力流转：招商链需依次读取运行监测、产业诊断和瓶颈分析产出的数据包',
        ],
        tags: ['LangGraph', 'State Machine', 'Conditional Routing'],
      },
      {
        title: '13 阶段报告生成流程',
        description: '将长周期报告编制拆解为连续流水线，替代单次 Prompt 粗暴生成',
        bullets: [
          '梳理从需求触发、材料解析、数据查询到归档交付的 13 个阶段',
          '混合解析工具链：MinerU 提取扫描件、MarkItDown 转换格式、Jina 抽取网页、pandas 清洗表格',
          '先聚拢经济指标、产业短板与政策依据等中间结果，再交给对应专家角色组织成文',
        ],
        tags: ['MinerU', 'MarkItDown', 'Jina Reader', 'pandas'],
      },
      {
        title: '知识库与指标数据双通道',
        description: '区分政策文字与统计数字来源，确保结论有据可查',
        bullets: [
          'Dify 沉淀 6 类知识库（2100+ 分块，约 270 万字），涵盖政策、规划与产业材料',
          'PostgreSQL 存储县域经济、重点企业与投资项目等结构化数据，供精准检索计算',
          '制定核验规则：具体数字必须来自数据库，政策引用必须找到原文，缺少依据的标注待核验',
        ],
        tags: ['Dify', 'PostgreSQL', 'RAG', 'Rerank'],
      },
      {
        title: '6 层质量审查门禁',
        description: '在成文前设置审查规则，拦截格式错漏与无依据的定性表述',
        bullets: [
          '核对数字来源、年份与口径，核验政策出处，检查因果推断是否合理',
          '审查报告章节完整性，检查敏感信息脱敏情况，设置人工复核节点',
          '审查不通过则标为 needs_human_review，支持人工确认后执行 retry_job',
        ],
        tags: ['Quality Gate', 'Evals', 'Human Review'],
      },
      {
        title: '从 OpenClaw 迁移至 Hermes',
        description: '根据长期运行与复杂编排需求重构底层框架',
        bullets: [
          'OpenClaw 更偏向多渠道对话网关，难以满足复杂业务状态长期维护的需要',
          'Hermes 提供状态记忆、Skills 机制、MCP 接入、Subagent 派发和调度能力',
          '重构后将业务链、角色职责与门禁审查沉淀为可独立维护的工程模块',
        ],
        tags: ['Hermes Agent', 'OpenClaw', 'Architecture Migration'],
      },
      {
        title: '工具封装与 MCP 接口服务',
        description: '统一数据查询与文档解析的调用方式，对外提供标准化服务',
        bullets: [
          '封装 12 个标准 MCP 接口，涵盖指标检索、知识库查询与文档抽取，接入 20+ 项核心指标',
          '工具按职责分层：按文件格式分别调度 OCR、Office 转换、网页解析或表格清洗',
          'FastAPI 服务层支持 SSE 流式返回与 WebSocket 推送，便于前端状态联动',
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
      '在银河麒麟工业内网部署量化后的 70B 级 DeepSeek-R1 蒸馏模型，接入 500+ 份设备资料建成本地 RAG 知识库；回答必须引用原始文档、章节和页码，便于运维人员回到原文核对。',
    icon: '🧠',
    coverImage:
      'https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/AI_RAG.webp',
    featured: true,
    categoryLabel: 'LLM + RAG',
    gradientFrom: '#f0fff4',
    gradientTo: '#e8f8ec',
    categoryColor: '#6b9b7a',
    metrics: [
      { value: '70B级', label: '蒸馏模型' },
      { value: '500+', label: '文档数量' },
      { value: '40GB级', label: '量化模型体积' },
      { value: '秒级', label: '检索速度' },
    ],
    background:
      '电厂运维查参数、排故障主要翻纸质手册和上百页的设备 PDF，不仅慢，新人查阅也费劲。由于生产网运行在银河麒麟系统上，且完全断网，无法调用任何公有云 AI。这个项目要在离线内网环境下跑通大模型本地部署与 RAG 检索，把设备手册、运维规程和安全制度做成本地知识库，让运维人员提问时能快速拿到带章节和页码依据的答案。',
    outcomes: [
      '在银河麒麟离线环境部署 <strong>DeepSeek-R1 70B 级蒸馏模型</strong>，通过 GGUF Q4_K_M 量化把模型压到约 <strong>40GB 级</strong>，跑通内网本地推理',
      '整理接入 <strong>500+</strong> 份设备手册、规程与制度，按章节、条目与表格差异化分块，检索响应达到<strong>秒级</strong>',
      '执行“<strong>查无依据直接拒答，回答必须带出处</strong>”原则，输出附原始文档、章节和页码，方便现场快速复核',
      '用 FastAPI 封装本地推理和 RAG 接口，支持 <strong>SSE 流式输出</strong>，对接 Web 与移动端',
      '针对设备参数、操作规程和故障排查编写工业测试用例，围绕准确率、召回率、引用准确度与拒答率持续回归验证',
    ],
    painPoints: [
      {
        title: '知识难找',
        description:
          '设备参数、规程和安全制度分散在几百页 PDF、Word 和表格里，全靠翻目录和老师傅经验，查一条依据很耗时间。',
      },
      {
        title: '内网隔离',
        description:
          '系统跑在银河麒麟内网，完全断网且资料不能出域，不能调用云端模型或在线解析服务，模型、依赖和知识库必须全量离线运行。',
      },
      {
        title: '资源受限',
        description:
          '70B 原始模型对现场硬件要求太高，必须在回答质量、模型体积、显存占用与推理速度之间反复权衡。',
      },
      {
        title: '文档结构杂',
        description:
          '手册按章节写，规程按条目列，参数表靠行列对应；按固定字数切块容易把故障代码、步骤和安全警示切碎，破坏语义。',
      },
      {
        title: '答错代价大',
        description:
          '工业参数和操作步骤一旦胡编或漏掉安全前提，会直接误导现场操作。资料里没有的宁可拒答，也不能自由发挥。',
      },
      {
        title: '效果难量化',
        description:
          '模型能顺畅说话不代表可用。必须拆开测：文档召回准不准、回答是否忠于原文、引用页码对不对、没依据时能不能老实拒答。',
      },
    ],
    solutionPositioning:
      '这是部署在电厂工业内网的受约束知识查询系统，核心目标是帮运维快速定位依据。系统先从授权知识库检索证据，再让本地模型基于召回内容整理回答，并附上文档名、章节与页码。系统只做资料检索与辅助参考，不替代现场操作规程、设备铭牌和专业人员确认；一旦检索资料不足或超出范围，明确告知未找到，不做无根据推测。',
    implementationPath: {
      title: '离线内网 · 端到端实施路径',
      subtitle: '从环境约束摸底、模型量化部署到资料治理、受约束问答与测试回归的工程链路',
      steps: [
        {
          name: '场景与环境摸底',
          description:
            '摸清断网内网与银河麒麟系统约束，对齐设备参数查询、规程定位、故障排查等场景，确定模型与检索的边界。',
        },
        {
          name: '模型量化与本地部署',
          description:
            '选取 DeepSeek-R1 70B 级蒸馏模型，采用 llama.cpp 与 GGUF Q4_K_M 量化方案，把模型体积压到 40GB 级并验证本地推理吞吐。',
        },
        {
          name: '文档治理与语义分块',
          description:
            '整理 500+ 份手册、规程与表格，按章节、条目和行列切块，并在每个分块上挂载原始文档名、章节和页码。',
        },
        {
          name: '向量索引与证据检索',
          description:
            '用 BGE-M3 生成向量并存入 Chroma，提问时做标准化、Top-K 召回、去重和相关性过滤，精简送入模型的上下文。',
        },
        {
          name: '受约束生成与接口封装',
          description:
            '编写 Prompt 约束模型严格依据检索内容作答，必须输出出处；用 FastAPI 封装接口并支持 SSE 流式返回，对接多端。',
        },
        {
          name: '场景测试与分层回归',
          description:
            '拿真实参数、规程和排查用例跑测试，把差错归因到解析、分块、召回、Prompt 或模型本身，定向修补并持续回归。',
        },
      ],
    },
    runtimeCase: {
      title: '给水泵参数查询 · 可溯源问答链路',
      subtitle: '以一个具体查询展示从自然语言提问到定位原文、附带出处的完整处理过程',
      input: [
        { label: '对象', value: '#2 机组给水泵' },
        { label: '问题', value: '额定流量 / 扬程 / 功率' },
        { label: '资料', value: '技术规格书 + 参数汇总表' },
        { label: '边界', value: '现场铭牌优先' },
      ],
      steps: [
        {
          name: '问题解析',
          tool: 'query parser',
          description: '提取设备对象、机组编号与参数需求，把口语转成规范的查询表达。',
          result: '生成“#2 机组 / 给水泵 / 额定参数”上下文',
        },
        {
          name: '向量化',
          tool: 'BGE-M3',
          description: '将标准化问题编码为向量，保留设备型号与专业术语。',
          result: '生成面向本地知识库的检索向量',
        },
        {
          name: '证据召回',
          tool: 'Chroma Top-K',
          description: '从知识库召回手册与参数表候选片段，过滤无关内容。',
          result: '命中技术规格书 3.2 节与参数表对应记录',
        },
        {
          name: '证据校验',
          tool: 'source filter',
          description: '核对候选片段是否包含具体数值、单位和出处页码；资料不足则直接拒答。',
          result: '确认流量、扬程与电机功率具备原文依据',
        },
        {
          name: '受约束回答',
          tool: 'DeepSeek-R1',
          description: '仅依据检索出的片段组织语言，不外扩模型记忆里的无关参数。',
          result: '生成 280 t/h、140 m、1600 kW 结构化回答',
        },
        {
          name: '输出与提醒',
          tool: 'answer formatter',
          description: '拼接文档名、章节、页码和表格位置，并提示现场安装参数以铭牌为准。',
          result: '输出带精确出处的答案与安全提醒',
        },
      ],
    },
    dataAssets: [
      {
        name: '工业知识文档',
        value: '500+ 份',
        description: '涵盖设备手册、运维规程和安全制度等内部资料',
      },
      {
        name: '分块策略',
        value: '3 种',
        description: '按手册章节、规程条目、表格行列差异化切块',
      },
      {
        name: '溯源层级',
        value: '3 级',
        description: '回答标注文档名、章节、具体页码',
      },
      {
        name: '问答模版',
        value: '3 类',
        description: '参数查询、操作步骤、故障排查分别套用对应格式',
      },
      {
        name: '评测维度',
        value: '4 项',
        description: '测试回答准确率、检索召回率、引用准确率与拒答表现',
      },
    ],
    engineeringMethods: {
      title: 'RAG 工程与质量把控',
      description: '把文档切块、来源追踪与安全边界做在检索链路前段，而不是寄希望于模型在最后一步自行保持克制。',
      items: [
        {
          title: '按语义单元分块',
          description: '依手册章节、规程条目和表格行列切分，避免固定字数切块拆散操作步骤和安全警示。',
        },
        {
          title: '全程透传来源信息',
          description: '从文档入库切块开始，将文档名、章节、页码绑定在元数据中，回答时直接带出对应出处。',
        },
        {
          title: '无依据宁可拒答',
          description: '检索不到足够材料时直接告知未查到；涉及设备参数时注明以现场铭牌和规程为准，不硬猜。',
        },
        {
          title: '定位问题发生层级',
          description: '把回答错误拆解到解析、分块、召回、Prompt 或模型层面，定位后修补并加进回归题库。',
        },
      ],
      evidence: [
        { value: '500+ 份', label: '知识文档', detail: '设备手册、运维规程和安全制度离线入库' },
        { value: '3 种', label: '分块策略', detail: '章节、条目与表格结构分别处理' },
        { value: '秒级', label: '语义检索', detail: 'BGE-M3 + Chroma 支撑本地证据召回' },
        { value: '4 项', label: '质量检查', detail: '准确性、召回、引用与拒答形成回归闭环' },
      ],
    },
    deliveryLayers: [
      {
        name: '回答层',
        format: 'ANSWER · TEMPLATE',
        description: '按参数、操作步骤或故障排查分类组织，结构清晰，减少歧义。',
      },
      {
        name: '证据层',
        format: 'SOURCE · SECTION · PAGE',
        description: '结论后紧跟文档名、章节和页码，方便运维翻阅纸质或原件核对。',
      },
      {
        name: '评测层',
        format: 'EVAL · REFUSAL · REGRESSION',
        description: '用固定测试集验证召回率、忠实度、引用率和拒答表现，保障迭代稳定。',
      },
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
    role: '负责大模型私有化部署与 RAG 落地：在银河麒麟断网内网完成 70B 级 DeepSeek-R1 蒸馏模型量化部署；针对手册、规程和表格设计差异化分块，搭建 BGE-M3 + Chroma 检索链路；开发 FastAPI 推理与问答接口；编写限制模型胡编、强制输出页码的 Prompt 规则与格式模板；构建工业测试集，针对准确率、召回率、引用准确度与拒答表现做回归评测。',
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
        title: '内网离线量化部署',
        description: '在完全断网的银河麒麟内网中部署大模型，平衡硬件开销与回答表现',
        bullets: [
          '在银河麒麟离线工业内网部署 DeepSeek-R1 70B 蒸馏模型，全流程脱离外网',
          '用 llama.cpp 结合 GGUF Q4_K_M 量化，把模型压到 40GB 左右，适配内网服务器显存',
          '通过 FastAPI 封装接口，提供 SSE 流式输出，支持 Web 和手机端调用',
        ],
        tags: ['llama.cpp', 'GGUF', 'Q4_K_M', '银河麒麟', 'FastAPI'],
      },
      {
        title: '文档感知切块与检索',
        description: '针对结构各异的设备资料做差异化分块，避免打散业务上下文',
        bullets: [
          '500+ 份资料分类处理：设备手册按章节拆，规程按条款拆，参数表按行列拆',
          '采用 BGE-M3 向量化并写入 Chroma，本地语义检索达到秒级响应',
          '候选片段重排后送入模型上下文，强制带出原始文档名称与页码',
        ],
        tags: ['BGE-M3', 'Chroma', 'Embedding', '语义检索'],
      },
      {
        title: '严格约束 Prompt 与模板',
        description: '从输入端约束模型只依据资料回答，统一输出格式',
        bullets: [
          'Prompt 明确限定范围：未检索到的内容直接回复未查到，不让模型自行推想',
          '每条结论必须附带文档名和页码，方便现场翻看原书核验',
          '设计参数查询、操作规程、排障建议三套输出模版，规范展示格式',
        ],
        tags: ['Prompt Engineering', 'System Prompt', '格式模板'],
      },
      {
        title: '基于工业用例的分层评测',
        description: '用真实问题集评测各环节表现，针对故障根因定向优化',
        bullets: [
          '整理工业测试题库，涵盖参数核查、规程定位与故障建议等常见问题',
          '追踪四项指标：回答准确率、引用标注率、幻觉率、检索召回率',
          '出现错漏时对齐排查是分块、召回、Prompt 还是模型理解问题，修复后纳入回归集',
        ],
        tags: ['Evals', '幻觉率', '召回率', '评测体系'],
      },
    ],
    coreDifferentiators: [
      {
        title: '纯内网离线运行',
        description:
          '模型、Embedding、向量库和 API 服务全部部署在工业内网，数据不出网，满足生产安全与合规要求。',
      },
      {
        title: '精确到章节与页码',
        description:
          '回答必须附带文档名、章节和页码；运维人员能随时回翻原始依据，系统重在缩短查阅时间，而非替代人工确认。',
      },
      {
        title: '按文档形态做针对性分块',
        description:
          '针对手册、条文和参数表采用不同的分块规则，尽量避免拆断操作步骤、丢失表头或搞混设备型号。',
      },
      {
        title: '结合硬件做量化选型',
        description:
          '选用 70B 蒸馏模型搭配 Q4_K_M 量化，在现有内网硬件条件下兼顾参数理解力与响应速度。',
      },
      {
        title: '查不到就明确拒答',
        description:
          '检索资料不足时直接说明无依据；涉及设备安全参数提示以铭牌和规程为准，不靠语言流畅掩盖资料缺漏。',
      },
    ],
    reflection:
      '做工业 RAG 最大的体会是：可信比流畅重要得多。模型语言再通顺，如果数字不可查、出处不可验，现场就没人敢用。整条链路里最耗精力的其实是前段：文档切块切得好不好直接决定了能不能召回关键步骤，出处信息从入库切块起就得一路透传到最后输出。回头来看，如果在项目初期就先把各类典型查询题库建好，再去对比不同量化档位和分块参数，选型过程会更有依据，也能少走弯路。',
    outlook: [
      {
        title: '量化参数横向对比',
        description:
          '用统一的参数查询和规程定位题库，系统测试不同量化档位的准确率、首字延迟和显存占用，形成量化依据。',
      },
      {
        title: '引入多维度过滤',
        description:
          '在向量召回前增加设备型号、文档版本和专业领域等标签过滤，并尝试接入重排序进一步提升出处命中率。',
      },
      {
        title: '按岗位划分查询权限',
        description:
          '根据运维岗位和设备责任区设置检索过滤条件，控制敏感规程和资料的查阅范围。',
      },
      {
        title: '完善文档更新与运维观测',
        description:
          '补齐新文档增量入库、索引版本管理以及检索未命中日志统计，便于长期排查与维护。',
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
