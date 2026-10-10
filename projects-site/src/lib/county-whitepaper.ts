import sourceWhitepaper from '../content/county-whitepaper.md?raw';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import katex from 'katex';
import diagramAssets from '../content/county-diagrams.json';
import { diagramSignature, diagramSources } from '../../scripts/county-diagram-config.mjs';

// Keep a tracked source snapshot: the repository excludes its root docs/ folder.
export const whitepaper = sourceWhitepaper;
export const chapterNames = [
  '01 · 业务原点',
  '02 · 架构与运行时',
  '03 · 数据与知识工程',
  '04 · 9 大业务链流水线',
  '05 · 16 角色协同沙箱',
  '06 · 质量门禁与评测',
  '07 · 隆昌试点交付',
  '08 · 生产就绪复盘',
];

export function getSubModule(num: string): string {
  if (num.startsWith('1.')) return '1.0 业务需求与权力边界界定';
  if (num.startsWith('2.1.')) return '2.1 架构设计哲学与分层解耦';
  if (num.startsWith('2.2.')) return '2.2 核心运行时与交互范式';
  if (num.startsWith('2.3.')) return '2.3 基础设施韧性与长周期治理';
  if (num.startsWith('2.4.')) return '2.4 LangGraph 图状态机高阶拓扑';
  if (num === '3.1' || num === '3.2') return '3.1-3.2 结构化数据底座';
  if (num === '3.3') return '3.3 深度知识工程与高级检索';
  if (num === '3.4' || num === '3.5') return '3.4-3.5 认知记忆模型与形态解耦';
  if (num === '3.6') return '3.6 上下文工程装配规范';
  if (num === '4.0') return '4.0 业务链架构规范与状态共享契约';
  if (num === '4.1' || num === '4.2' || num === '4.8') return '阶段一：基础监测与量化感知流水线';
  if (num === '4.3' || num === '4.4' || num === '4.9') return '阶段二：深度诊断与治理归因流水线';
  if (num === '4.5' || num === '4.6' || num === '4.7') return '阶段三：战略规划与招商决策流水线';
  if (num === '5.0') return '5.0 专家系统协作契约';
  if (['5.1', '5.2', '5.3', '5.4'].includes(num)) return '5.1-5.4 领域专家工位协同群（16位专家）';
  if (num === '5.5' || num === '5.6') return '5.5-5.6 运行时隔离与代码硬防线';
  if (num === '6.0' || num === '6.1') return '6.0-6.1 审查门禁网络 (Quality Gates)';
  if (num === '6.2') return '6.2 事实契约与证据分级 (L1-L4)';
  if (num === '6.3') return '6.3 自动化评测体系与 CI/CD';
  if (num === '7.1') return '7.1 试点原点与场景约束';
  if (num === '7.2') return '7.2 端到端 12 阶段落地流水线';
  if (num === '7.3') return '7.3 50+ 份核心交付物资产全景';
  if (num === '8.1' || num === '8.2') return '8.1-8.2 工程师底层认知复盘';
  if (num === '8.3') return '8.3 生产就绪 5 维工业级验收矩阵';
  if (num === '8.4') return '8.4 循环收敛效能度量与退出审计';
  return '技术实现';
}

const summaries: Record<string, [string, string, string]> = {
  // 第 1 章：业务发起源起与系统定位
  '1.1': ['需求溯源：四川 183 县域治理六大痛点与立项动因', '针对底数不清、研判不准、协同不畅、政策不精、决策滞后与基层负担重六大顽疾，重构为覆盖全省 183 县域的多源自动归集与动态研判平台。', '业务痛点'],
  '1.2': ['系统定位：智能内核核心职责范围与权力边界划分', '聚焦经济监测、产业规划与政策推演三大流程，系统严格定位为“可追溯决策辅助初稿引擎”，坚决不替代法定统计、正式排名与行政审签。', '边界契约'],

  // 第 2 章：智能内核架构设计哲学与运行时工程
  '2.1.1': ['平台分层：Hermes 平台宿主与 LangGraph 运行时双层解耦', 'Hermes 负责会话调度、工具网关与权限校验；LangGraph 驱动 CountyEconomyState、9 条业务链与多格式交付，实现平台治理与决策推理彻底解耦。', '架构解耦'],
  '2.1.2': ['框架选型：从单体对话脚本到工业级图状态机架构迁移', '复盘从早期 OpenClaw 线性提示词向 Hermes + LangGraph 生产架构演进的选型历程，解决长流程状态持久化、拓扑分支与协议失控难题。', '选型演进'],
  '2.1.3': ['架构哲学：工作流骨架嵌装受控智能体的确定性控制律', '代码确定性流向定义必做步骤与停止判据，智能体仅在节点内承担资料理解、假设生成与公文表达，以确定性工作流约束模型自由度。', '控制哲学'],
  '2.1.4': ['双层闭环：宏观状态机调度与微观工具闭环的协作设计', '外层图状态机推进 9 条业务链宏观依赖，内层 Harness 驱动 LLM → Tool → Observation 反馈循环，设单工位最多 6 轮与 20 秒超时硬约束。', '双层拓扑'],
  '2.1.5': ['控制边界：工位节点分类矩阵与 Agent 选型决策准则', '确立纯代码节点、单步 LLM 与闭环 Agent 的“选型三问”；同环比测算、区位商 LQ、资产编目与权限拦截坚决不由语言模型计算。', '选型矩阵'],

  '2.2.1': ['运行时模型：生产级 Agent 七大核心模块时序映射与完成判据', '拆解目标、状态、模型、工具、记忆、规划器与护栏七大模块；将物理文件落盘、Schema 合法性、6 层门禁与退出码作为完成判据，拒绝自述完成。', '核心时序'],
  '2.2.2': ['协议交互：Tool Calling 底层交互机理与因果原子绑定规范', '模型仅声明调用，宿主严格鉴权执行；tool_calls 与 tool 角色结果基于 tool_call_id 成对原子绑定与安全裁剪，严防语义错配与跨区越权。', '工具协议'],
  '2.2.3': ['核心范式：Planning、Reflection 与 RAG 三元协同防错配架构', '规划总师负责拓扑拆解，RAG 注入客观事实证据，Critic 独立质检审查；代码断言先行、语义模型后验，避免单点模型陷入死循环。', '三元协同'],
  '2.2.4': ['拓扑选型：单 Agent 与多 Agent (Supervisor-Worker) 工程边界', '明确多智能体适用红线：仅在上下文超限、权限物理隔离、并行吞吐或独立批判时拆分 Worker；Supervisor 单向控制，禁止横向广播。', '拓扑边界'],

  '2.3.1': ['稳态底座：Agent Infra 三层分工与模型 API 四级超时治理', 'Loop/Harness/Infra 三层分工；建立握手(≤3s)、首字(15-30s)、分片(≤5s)与全局任务四级超时矩阵，结合抖动指数退避保障高可用。', '超时治理'],
  '2.3.2': ['循环治理：外部验证器驱动退出与 Loop 自收敛控制律', '根治震荡循环、虚假完成与错误级联四大病灶；以外部独立 Verifier 结构化反馈驱动定向修复，三轮未过强制熔断转人工工单。', '收敛控制'],
  '2.3.3': ['运行时进化：情节反思、动态工具自举与防中毒安全门禁', '外化自进化机制替代权重微调：动态反思置信度升降、只读沙箱演练新工具；全省通用与高危规则设置严格的人类终审安全门禁。', '反思自举'],
  '2.3.4': ['异步协同：长周期任务挂载、会话挂起与安全 Webhook 唤醒', '面对跨部门 48 小时离线补数与审批，任务保存 Checkpoint 快照并释放计算资源；通过 HMAC 与 CAS 乐观锁安全校验后无缝热恢复。', '挂起唤醒'],

  '2.4.1': ['状态图演进：State-Node-Edge 控制权反转与图引擎基石', '将控制流从代码内部解耦为显式图拓扑：State 作为全局单一事实源，Node 仅计算返回状态增量 Delta，Edge 承担确定性条件路由。', '状态图基石'],
  '2.4.2': ['数据流规范：三态生命周期建模与显式 Reducer 规约', '必填输入、中间可选与最终交付三态分层；列表按 evidence_id 去重追加，大体积 DataFrame 留在节点局部，下游实行防御性安全访问。', '状态规约'],
  '2.4.3': ['拓扑控制：强类型枚举路由、即时短路熔断与多阶逃生通道', 'Pydantic Literal 受控枚举约束路由分支；输入缺失毫秒级 Fail-Fast 短路熔断；环形自纠设最大重试与降级退出的多阶逃生通道。', '拓扑控制'],
  '2.4.4': ['流式推进：逐工位事件驱动流 (app.stream) 与全链路可观测', '从阻塞式调用转向逐工位事件流推送（SSE/WebSocket），前端呈现细粒度工位进度，运维端关联 OpenTelemetry Trace 消除卡死误判。', '流式追踪'],
  '2.4.5': ['并发拓扑：受控扇出 (Fan-out)、弹性扇入与深度合并 Reducer', '能耗、产业、财税与专利多维评估并行推进，Semaphore=5 控制并发上限，分支独立超时兜底，深合并 Reducer 保证状态完整归并。', '受控并发'],
  '2.4.6': ['研报流水线：Prompt Chaining 多段门禁与反思注入编排', '超长规划研报解耦为提纲生成、章节扩写、指标交叉核验与公文润色四道工位；结构规则先检，定向 critique 注入指导重试。', '分步编排'],
  '2.4.7': ['模型治理：统一协议映射、连接池托管与节点级退避降级', '按涉密等级分流内网私有化模型与云端强模型；统一抽象层托管长连接池与重试，单节点衰竭时无缝切换降级规则与备用模型。', '混合模型'],

  // 第 3 章：双通道数据底座与深度知识工程
  '3.1': ['数据架构：硬指标与软知识双通道物理隔离哲学', '统计数值走参数化 SQL 精确通道，政策规划走语义切片检索通道；两路在证据上下文层结构化汇合，严禁模型幻觉编造统计数字。', '双通道隔离'],
  '3.2': ['结构化底座：1952-2024 年鉴库与 22,119 家企业图谱建设', '纳管全省 925 个地区、970 张标准统计表与 32 万条历史指标记录，清洗覆盖 21 市州核心企业数据，构建全省县域经济指标覆盖矩阵。', '数据底座'],
  '3.3': ['知识工程：Dify 12 大专题知识库治理与 GraphRAG 混合检索', '治理 427 份核心文献与 254 万字政务资料；落地标题重建、业务域 Schema 语义桥、上下文切片前缀、GraphRAG 实体图谱与 RRF 倒数融合检索。', '知识工程'],
  '3.4': ['记忆架构：Working/Episodic/Semantic/Procedural 四层体系', '工作记忆维系当前任务上下文，情景记忆沉淀执行轨迹，语义记忆存储知识与指标，程序记忆固化工作流与技能，生命周期严格隔离。', '四层记忆'],
  '3.5': ['数据形态：五层数据形态解耦与 RAG vs Memory 本质分界', '厘清 Messages、Context、State、Memory 与 Knowledge 五层界限；确立“事实依据依 SQL/RAG，操作经验参考 Memory”的工程边界。', '形态解耦'],
  '3.6': ['上下文工程：五层组装结构、状态栏注入与渐进式技能挂载', '从 Prompt 转向 Context 工程：组装固定身份基线、实时状态栏、按需渐进式技能、确认状态与裁剪轨迹，保持 Prompt 缓存稳定。', '上下文工程'],

  // 第 4 章：9 大核心业务链流水线全景剖析
  '4.0': ['业务链体系概览：共享状态模型与受控流转规范', '九条链共享 CountyEconomyState 数据字典，依次经历参数校验、角色分派、工具执行、分析推理、质量审查与交付归档六步标准流。', '业务链总则'],
  '4.1': ['业务链 01：数据治理与基础普查流水线 (data_governance)', '扫描县域指标覆盖度，校验一致性与异常值，自动生成带责任部门的离线补数台账与数据资产编目，夯实后续分析底座。', '感知 · 治理'],
  '4.2': ['业务链 02：运行态势综合研判流水线 (monitoring_report)', '查询核心宏观指标，代码计算同环比与横向对标，规则触发红黄绿分级预警，受控模型解释运行态势，数字严格核验 PostgreSQL 出处。', '感知 · 监测'],
  '4.3': ['业务链 03：产业精准画像与比较优势分析流水线 (industry_diagnosis)', '汇聚企业、行业与项目数据，通过五维画像与区位商 LQ 计算，结合规划文献判定优势与上下游断点，严防样本外推。', '分析 · 画像'],
  '4.4': ['业务链 04：县域发展瓶颈归因流水线 (bottleneck_analysis)', '将监测预警短板与土地、能耗、财政、人才要素约束交叉映射，生成传导链分析；瓶颈推论标为“待核验假设”并附线下核验任务。', '分析 · 归因'],
  '4.5': ['业务链 05：政策需求梳理与行动匹配流水线 (policy_decision)', '复用前期研判产物，检索现行真实有效政策，核对申报与享受条件，构建“问题-政策-举措-责任部门”四维落地矩阵并核验公文文号。', '决策 · 政策'],
  '4.6': ['业务链 06：一县一策思路与规划编制流水线 (one_county_one_policy_outline)', '规划总师确立五章大纲并经人工审签，多 Worker 隔离编写各章节草稿，经专项质检生成修订补丁，最终导出符合规范的 DOCX 送审稿。', '决策 · 规划'],
  '4.7': ['业务链 07：基于产业链断点的精准招商流水线 (project_investment)', '针对主导产业链断点逆向推导补链需求，匹配省内外候选企业样本，核查园区能耗与环保承载力，形成精准招商清单与协同任务。', '决策 · 招商'],
  '4.8': ['业务链 08：统计分析与计量经济学研判流水线 (model_analysis)', '路由双重差分 DID、倾向得分匹配 PSM、空间计量等模型族；前置严格检验平行趋势与面板样本，条件不足自动挂起或阻断。', '支撑 · 计量'],
  '4.9': ['业务链 09：县域体制运作逻辑与协同堵点研判流水线 (governance_knowledge)', '从财权事权、考核激励、垂直管理与属地责任维度解释经济阻滞成因，映射治理机制并提出跨部门协同破局路径，权责表述受控审签。', '支撑 · 治理'],

  // 第 5 章：16 个专家角色协同体系与边界规范
  '5.0': ['专家系统架构：领域专家工位契约与协同原则', '统一确立 16 个角色的 role_id、链内工位职责、授权工具集、产物 Schema 与判断边界，由图状态机按需动态调度装配。', '专家协同总则'],
  '5.1': ['专家组 01：宏观经济与行政治理专家组（3 大角色）', '涵盖首席经济专家、治理知识分析师、要素约束分析师，负责全局统筹、部门权责逻辑拆解与资源承载力红线核算。', '专家组 · 宏观'],
  '5.2': ['专家组 02：数据治理与量化监测专家组（4 大角色）', '涵盖数据治理专员、运行监测分析师、预警分析师、计量模型分析师，负责数据入口质量把关、态势跟踪与计量识别检验。', '专家组 · 数据'],
  '5.3': ['专家组 03：产业诊断与招商协同专家组（5 大角色）', '涵盖产业战略分析师、产业链分析师、瓶颈诊断师、招商机会分析师、落地协同专员，推进从产业断点到招商工单的逐级闭环。', '专家组 · 产业'],
  '5.4': ['专家组 04：规划策划与质检统筹专家组（4 大角色）', '涵盖政策策划专家、规划首席专家、质量审查专家、报告统稿员，分工负责政策映射、送审大纲拆分、独立批判与格式收口。', '专家组 · 规划'],
  '5.5': ['安全防线：从 Prompt 软约束到 Harness 代码硬拦截', '打破提示词万能幻想；行政区划越权、工具白名单、未绑定数字落盘与虚假文号在 Tool Gateway 与落地层实行确定性代码阻断。', '代码硬拦截'],
  '5.6': ['隔离真相：基于 Supervisor-Worker 的沙箱物理隔离', '角色拆分的工程本质是隔离上下文、降低 Token 消耗、防范提示词污染与实现权限最小化；Worker 仅向总控回传结构化结果。', '沙箱隔离'],

  // 第 6 章：分层质量门禁与事实契约体系
  '6.0': ['质量保证架构：严肃政务 AI 交付质量收口机制', '确立“程序断言前置排查、独立 Critic 语义后审、失败诊断沉淀轨迹”三位一体的质量收口体系，杜绝劣质内容流转下游。', '质量保证总则'],
  '6.1': ['审查门禁：6 层级进式质量拦截与流转决策网 (Quality Gates)', '数字门禁查来源、证据门禁查文号、逻辑门禁限因果、结构门禁验体例、敏感门禁阻泄密、发布门禁待审签，违规坚决拦截打回。', '6 层门禁'],
  '6.2': ['证据契约：L1-L4 证据分级体系与严肃政务事实契约', '严格划定 L1 硬数据、L2 软证据、L3 待核验假设与 L4 专家规则；推论必须绑定核验方法与责任部门，专家规则不代替事实。', '证据契约'],
  '6.3': ['评测体系：四维综合质量矩阵与 CI/CD 防退化流水线', '设计结果质量、轨迹效率、权限防护与异常恢复四维指标；200+ 题 Golden Set 触发 PR 自动化回归，日常巡检防范模型供应商静默漂移。', '自动化评测'],

  // 第 7 章：隆昌试点真实交付闭环
  '7.1': ['试点原点：隆昌市 (510283) 试点背景与真实业务场景', '选取川南经济区隆昌市为端到端验证基点，整合历年统计公报、政府工作报告、专项调研材料与企业名录，检验交付链可行性。', '试点背景'],
  '7.2': ['端到端落地：从指令输入到送审稿生成的 12 阶段全过程', '拆解任务受理、配置加载、数据检索、监测画像、归因决策、章节协同到审签导出的 12 阶段全时序，30 分钟完成数据齐备初稿。', '12 阶段落地'],
  '7.3': ['交付资产：隆昌试点 50+ 份核心交付物全景与适用边界', '归档五章规划草案、重点工程清单、部门补数清单、政策矩阵与招商库等 50 余份资产，严格明确仅为送审草案而非正式发布件。', '交付物全景'],

  // 第 8 章：生产就绪验收与个人工程复盘
  '8.1': ['认知复盘 01：严肃政务场景的核心是业务确定性而非自由发散', 'AI 落地政务的关键是用代码死锁业务流程、数据口径与权责边界；智能体不是失控生成器，而是高壁垒证据链上的受控装配工。', '认知复盘'],
  '8.2': ['认知复盘 02：数据与知识工程构成底层交付不可逾越的基石', '大模型工程 80% 的工作在推理前：报表口径清洗、文档结构重塑、去噪与业务 Schema 语义桥，决定了最终生成成果的生死。', '认知复盘'],
  '8.3': ['交付准入：生产就绪 5 维工业级验收矩阵 (Readiness Checklist)', '上线前必须通过的五项工业级验收：强杀后检查点恢复、多级成本熔断、全链路 OpenTelemetry 追踪、只读沙箱鉴权与副作用幂等。', '生产验收'],
  '8.4': ['可观测性：循环收敛效能度量与退出真实性审计 (Loop Observability)', '建立 Pass@1、Pass@3、无效动作比率 WAR 与退出真实性抽查台账，全面监控死循环震荡与伪完成，确保系统稳定自收敛。', '循环可观测'],
};

function sections(source: string) {
  const result: { number: string; title: string; body: string }[] = [];
  let current: (typeof result)[number] | undefined;
  let fenced = false;
  let chapter = '';
  for (const line of source.split('\n')) {
    if (/^```/.test(line)) fenced = !fenced;
    const chapterHeading = !fenced && line.match(/^## (\d+)\. (.+)$/);
    if (chapterHeading) {
      chapter = chapterHeading[1];
      current = { number: `${chapter}.0`, title: chapterHeading[2], body: '' };
      result.push(current);
      continue;
    }
    const heading = !fenced && line.match(/^#{3,4} (\d+(?:\.\d+)+)\s+(.+)$/);
    if (heading) {
      current = { number: heading[1], title: heading[2], body: '' };
      result.push(current);
    } else if (current) {
      // H2 belongs to the next chapter, rather than the preceding article.
      if (!fenced && /^## /.test(line)) { current = undefined; continue; }
      current.body += line + '\n';
    }
  }
  return result.filter(item => item.body.trim().replace(/^---$/gm, '').trim());
}
export const rawArticles = sections(whitepaper);
export const coverage = { sourceSections: rawArticles.length, adaptedSections: rawArticles.filter(a => summaries[a.number]).length };
if (coverage.sourceSections !== coverage.adaptedSections) throw new Error('County exhibit: a whitepaper section is missing its reading guide.');
if (diagramAssets.signature !== diagramSignature(diagramSources(whitepaper)) || diagramAssets.diagrams.length !== diagramSources(whitepaper).length) {
  throw new Error('County exhibit: diagram assets are stale. Run npm run diagrams before building.');
}
const processor = await createMarkdownProcessor({ smartypants: false, syntaxHighlight: 'shiki', shikiConfig: { theme: 'github-light', wrap: true } });
let diagramIndex = 0;
export const articles = await Promise.all(rawArticles.map(async (article, i) => {
  let diagram = 0;
  const figures: [string, string][] = [];
  const source = article.body.replace(/[ \t]+$/gm, '').replace(/\*\*“([^”]+)”\*\*/g, '“**$1**”').replace(/```mermaid\n([\s\S]*?)```/g, () => {
    const id = `wp-diagram-${i}-${diagram++}`;
    const asset = diagramAssets.diagrams[diagramIndex++];
    if (!asset) throw new Error(`County exhibit: missing SVG for ${article.number}.`);
    const naturalWidth = Number(asset.svg.match(/viewBox="[^ ]+ [^ ]+ ([^ ]+)/)?.[1] ?? 560);
    const placeholder = `<figure data-county-diagram-placeholder="${id}"></figure>`;
    figures.push([placeholder, `<figure class="source-diagram"><div class="diagram-controls" aria-label="图示缩放"><button type="button" data-diagram-zoom="out" aria-label="缩小图示">−</button><span data-diagram-scale>100%</span><button type="button" data-diagram-zoom="in" aria-label="放大图示">+</button><button type="button" data-diagram-zoom="natural">原始尺寸</button><button type="button" data-diagram-zoom="reset">适配视图</button><button type="button" data-diagram-expand aria-label="在大画布中查看图示">大图查看 ↗</button></div><div class="mermaid-host" tabindex="0" role="region" aria-label="白皮书图示，可拖动、缩放及滚动" style="--diagram-natural-width:${naturalWidth}px" data-natural-width="${naturalWidth}" data-diagram-id="${id}" data-rendered="true">${asset.svg}</div><figcaption>以原始尺寸显示 · 拖动或滚动画布查看 · 大图可放大阅读</figcaption></figure>`]);
    // Insert SVG after Markdown processing: SVG styles and labels must stay intact.
    return placeholder;
  }).replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => katex.renderToString(tex, { displayMode: true, throwOnError: false }))
    .replace(/\$([^$\n]+)\$/g, (_, tex) => katex.renderToString(tex, { throwOnError: false }));
  const { code } = await processor.render(source);
  const [title, synopsis, tag = '架构规范'] = summaries[article.number] ?? [article.title, '核对表列出架构、数据、知识、试点与质量防线的可演示资产。', '资产核对'];
  const subModule = getSubModule(article.number);
  const html = figures.reduce((result, [placeholder, figure]) => {
    if (!result.includes(placeholder)) throw new Error(`County exhibit: missing diagram placeholder in ${article.number}.`);
    return result.replace(placeholder, () => figure);
  }, code);
  return {
    ...article,
    id: `topic-${article.number.replaceAll('.', '-')}`,
    chapter: Number(article.number.split('.')[0]),
    title,
    synopsis,
    tag,
    subModule,
    sourceTitle: article.title,
    html,
    search: `${article.number} ${title} ${tag} ${subModule} ${synopsis} ${article.body}`.toLowerCase().replace(/\s+/g, ' ').trim()
  };
}));
if (diagramIndex !== diagramAssets.diagrams.length) throw new Error('County exhibit: some SVG assets were not included in the reader.');

const field = (body: string, name: string) => body.match(new RegExp(`- \\*\\*${name}\\*\\*：([^\\n]+)`))?.[1]?.replace(/\*|`/g, '') ?? '';
const codes = (value: string) => [...value.matchAll(/`([^`]+)`/g)].map(m => m[1]);
export const chains = rawArticles.filter(a => /^4\.[1-9]$/.test(a.number)).map((a, i) => ({
  id: a.body ? codes(a.title)[0] : '',
  name: ['数据治理', '运行监测', '产业诊断', '瓶颈归因', '政策决策', '一县一策', '项目招商', '计量模型', '治理知识'][i],
  question: ['这个县的数据，哪些能用？', '经济运行出现了什么变化？', '产业优势，究竟在哪里？', '发展受阻，可能因为什么？', '哪些政策可以对应这些问题？', '如何汇聚成一份县域规划？', '从产业缺环，找到招商方向', '数据条件允许作因果分析吗？', '如何理解现实中的部门协同？'][i],
  intro: summaries[a.number][1],
  input: field(a.body, '输入参数'), trigger: field(a.body, '触发短语'), roles: field(a.body, '协同角色'),
  tools: codes(a.body.match(/- \*\*依赖工具\*\*：([^\n]+)/)?.[1] ?? ''),
  outputs: codes(a.body.split('**交付产物**：')[1]?.split('**复核策略**')[0] ?? ''),
  review: field(a.body, '复核策略'), topic: `topic-${a.number.replaceAll('.', '-')}`,
  steps: [
    ['校验参数', '扫描覆盖度', '检查质量', '生成补数任务', '资产编目', '报告与门禁'],
    ['查询硬指标', '汇总与对标', '规则预警', '态势解释', '数字核验', '发布审查'],
    ['企业 / 指标 / 项目', '五维画像 + LQ', '检索规划', '分析优势与断点', '证据审查', '诊断与缺口'],
    ['加载预警与短板', '查询要素约束', '构建传导链', '生成瓶颈假设', '因果边界检查', '报告与核验任务'],
    ['加载上游产物', '检索真实政策', '核对适用条件', '建立行动矩阵', '文号与承诺审查', '建议与需求清单'],
    ['组装分析底包', '总师设定框架', '框架人工审签', '章节 Worker 写作', '专项质检与修订', 'DOCX 送审稿'],
    ['识别产业缺环', '匹配企业样本', '形成补链方向', '核验资源承载', '招商合规审查', '机会与服务任务'],
    ['匹配模型族', '加载面板数据', '识别条件门禁', '执行模型', '解释系数与局限', '结果与元数据'],
    ['加载县域难题', '匹配治理机制', '解析协同堵点', '生成可行建议', '行政权责审查', '报告与协作映射'],
  ][i],
}));
const roleChapter = whitepaper.match(/^## 5\.[^\n]*\n([\s\S]*?)(?=^## 6\.)/m)?.[1] ?? '';
export const roles = [...roleChapter.matchAll(/^#### (\d+)\. ([^\n]+)\n([\s\S]*?)(?=^#### |^### |^## |$(?![\s\S]))/gm)].filter(m => /`\w+`/.test(m[2])).map(m => {
  const num = Number(m[1]); const body = m[3];
  return { number: num, id: codes(m[2])[0], name: m[2].replace(/\s*\(`[^`]+`\)/, ''), group: num <= 3 ? 0 : num <= 7 ? 1 : num <= 12 ? 2 : 3,
    purpose: field(body, '角色定位'), input: field(body, '输入要求'), output: field(body, '输出结构'), chains: field(body, '协同业务链'), tools: codes(body.match(/- \*\*授权工具集\*\*：([^\n]+)/)?.[1] ?? ''),
    boundary: body.split('**判断边界与禁止表达**：')[1]?.replace(/---/g, '').replace(/^\s*-\s*/gm, '').replace(/\*/g, '').trim() ?? '',
  };
});
if (chains.length !== 9 || roles.length !== 16) throw new Error(`County exhibit: expected 9 workflows and 16 roles, got ${chains.length} / ${roles.length}.`);
