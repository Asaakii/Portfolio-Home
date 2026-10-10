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
  '04 · 9 条业务流水线',
  '05 · 16 角色协同沙箱',
  '06 · 质量门禁与评测',
  '07 · 隆昌试点交付',
  '08 · 生产就绪复盘',
];

export function getSubModule(num: string): string {
  if (num.startsWith('1.')) return '1.0 业务需求与权力边界';
  if (num.startsWith('2.1.')) return '2.1 架构设计与分层解耦';
  if (num.startsWith('2.2.')) return '2.2 核心运行时与交互范式';
  if (num.startsWith('2.3.')) return '2.3 基础设施稳态与长周期治理';
  if (num.startsWith('2.4.')) return '2.4 LangGraph 图状态机高阶拓扑';
  if (num === '3.1' || num === '3.2') return '3.1-3.2 结构化数据底座';
  if (num === '3.3') return '3.3 知识工程与检索架构';
  if (num === '3.4' || num === '3.5') return '3.4-3.5 记忆模型与数据形态';
  if (num === '3.6') return '3.6 上下文装配规范';
  if (num === '4.0') return '4.0 业务链架构规范与状态共享';
  if (num === '4.1' || num === '4.2' || num === '4.8') return '阶段一：基础监测与量化感知流水线';
  if (num === '4.3' || num === '4.4' || num === '4.9') return '阶段二：产业诊断与治理归因流水线';
  if (num === '4.5' || num === '4.6' || num === '4.7') return '阶段三：规划编制与招商决策流水线';
  if (num === '5.0') return '5.0 专家系统协作契约';
  if (['5.1', '5.2', '5.3', '5.4'].includes(num)) return '5.1-5.4 领域专家工位协同（16位专家）';
  if (num === '5.5' || num === '5.6') return '5.5-5.6 运行时隔离与代码拦截';
  if (num === '6.0' || num === '6.1') return '6.0-6.1 审查门禁网络 (Quality Gates)';
  if (num === '6.2') return '6.2 事实契约与证据分级 (L1-L4)';
  if (num === '6.3') return '6.3 自动化评测体系与 CI/CD';
  if (num === '7.1') return '7.1 试点原点与场景约束';
  if (num === '7.2') return '7.2 端到端 12 阶段落地流水线';
  if (num === '7.3') return '7.3 50+ 份核心交付资产全景';
  if (num === '8.1' || num === '8.2') return '8.1-8.2 工程师底层认知复盘';
  if (num === '8.3') return '8.3 生产就绪 5 维工业级验收矩阵';
  if (num === '8.4') return '8.4 循环收敛效能度量与退出审计';
  return '技术实现';
}

const summaries: Record<string, [string, string, string]> = {
  // 第 1 章：业务发起源起与系统定位
  '1.1': ['需求溯源：四川 183 县域治理六大痛点与立项动因', '梳理底数不清、研判不准、跨部门协同慢、政策跟踪不足、研判滞后与基层重复填报六类问题，说明建设全省 183 县域多源自动归集与动态研判平台的原因。', '业务痛点'],
  '1.2': ['系统定位：智能内核核心职责范围与权力边界划分', '聚焦经济监测、产业规划与政策推演三大流程，系统定位为决策辅助初稿引擎，明确不替代法定统计、正式排名与行政审签。', '边界契约'],

  // 第 2 章：智能内核架构设计哲学与运行时工程
  '2.1.1': ['平台分层：Hermes 平台宿主与 LangGraph 运行时双层解耦', 'Hermes 负责会话调度、工具网关与权限校验；LangGraph 负责管理 CountyEconomyState 状态、驱动 9 条业务链，分工解耦平台治理与业务推理。', '架构解耦'],
  '2.1.2': ['框架选型：从单体对话脚本到工业级图状态机架构迁移', '复盘从早期 OpenClaw 线性脚本转向 Hermes + LangGraph 的过程，梳理状态持久化、拓扑分支与工具协议的演进考量。', '选型演进'],
  '2.1.3': ['架构原则：工作流编排结构与工位智能体分工机制', '用确定性代码定义流程步骤与完成条件，模型在节点内部执行材料理解、假设推导与文字起草，避免流程失控。', '控制原则'],
  '2.1.4': ['双层控制：宏观状态机调度与工位微观工具重试', '外层状态机控制 9 条业务链的执行依赖，内层 Harness 驱动单工位 LLM 与 Tool 的重试循环，设置单工位最多 6 轮、20 秒超时等硬约束。', '双层控制'],
  '2.1.5': ['控制边界：工位节点分类矩阵与 Agent 选型决策准则', '根据确定性要求将工位划分为纯代码、单步 LLM 与闭环 Agent；同环比测算、区位商 LQ、数据编目与权限检查由确定性代码执行。', '选型矩阵'],

  '2.2.1': ['运行时模型：生产级 Agent 七大核心模块时序映射与完成判据', '梳理目标、状态、模型、工具、记忆、规划器与护栏七大模块；以文件落盘、Schema 合法、门禁通过和状态码为完成判据，不以模型自述完成为准。', '核心时序'],
  '2.2.2': ['协议交互：Tool Calling 底层交互机理与因果原子绑定规范', '模型声明调用意图，宿主校验权限后执行；基于 tool_call_id 将调用请求与返回结果成对绑定，防止上下文错配与跨区域越权。', '工具协议'],
  '2.2.3': ['核心范式：Planning、Reflection 与 RAG 三元协同防错配架构', '规划工位拆解任务，RAG 注入客观事实证据，独立 Critic 工位审查内容；前置规则过滤结合模型复核，避免单节点死循环。', '三元协同'],
  '2.2.4': ['拓扑选型：单 Agent 与多 Agent (Supervisor-Worker) 工程边界', '明确多智能体拆分边界：仅在上下文超限、权限隔离、并行加速或需要独立复核时使用 Worker；由 Supervisor 单向调度，不采用广播通信。', '拓扑边界'],

  '2.3.1': ['稳态设计：Agent Infra 三层分工与模型 API 四级超时治理', '划分 Loop、Harness 与 Infra 三层职责；配置握手 (≤3s)、首字 (15-30s)、数据块 (≤5s) 和全流程超时限制，配合重试退避保障接口可用。', '超时治理'],
  '2.3.2': ['循环治理：外部验证器驱动退出与 Loop 自收敛控制律', '针对死循环、虚假完成和错误级联，引入独立的外部 Verifier 给出校验结果并指导重试，三轮未通过则熔断转人工处理。', '收敛控制'],
  '2.3.3': ['运行时演进：情节反思、动态工具演练与防中毒安全门禁', '以运行时外化机制替代模型微调：动态调整反思置信度，在只读沙箱测试新工具；全省规则变更需经过人工审核。', '反思机制'],
  '2.3.4': ['异步协同：长周期任务挂载、会话挂起与安全 Webhook 唤醒', '针对耗时 48 小时的离线补数与跨部门审批，保存 Checkpoint 快照后释放运行资源；通过 HMAC 签名与版本校验安全恢复执行。', '挂起唤醒'],

  '2.4.1': ['状态图演进：State-Node-Edge 控制权反转与图引擎基石', '将流程从过程式代码解耦为图拓扑：State 保存全局状态，Node 返回局部增量 Delta，Edge 执行条件路由与跳转。', '状态图设计'],
  '2.4.2': ['数据流规范：三态生命周期建模与显式 Reducer 规约', '区分输入参数、中间缓存与最终交付三类状态；列表按 evidence_id 去重追加，大体积 DataFrame 保存在节点局部，下游只读访问。', '状态规约'],
  '2.4.3': ['拓扑控制：强类型枚举路由、即时短路熔断与多阶逃生通道', '使用类型枚举限制路由分支；关键参数缺失时快速熔断；循环修正设置最大重试次数与降级退出策略，防止卡死。', '拓扑控制'],
  '2.4.4': ['流式推进：逐工位事件驱动流 (app.stream) 与全链路可观测', '从整体阻塞式调用转为逐工位事件流推送，向前端反馈工位进度，在运维端关联 OpenTelemetry Trace，便于排查异常。', '流式追踪'],
  '2.4.5': ['并发拓扑：受控扇出 (Fan-out)、弹性扇入与深度合并 Reducer', '能耗、产业、财税与专利评估并行执行，使用 Semaphore=5 限制并发上限，各分支独立设置超时，合并 Reducer 聚合状态。', '受控并发'],
  '2.4.6': ['研报流水线：Prompt Chaining 多段门禁与反思注入编排', '将规划报告生成拆为大纲构思、章节撰写、指标比对与行文润色四道工位；先由代码校验格式，再注入定向意见指导修改。', '分步编排'],
  '2.4.7': ['模型治理：统一协议映射、连接池托管与节点级退避降级', '根据涉密级别分流内网私有化模型与云端模型；统一接入层管理连接池与重试，主模型异常时自动切换降级规则与备用模型。', '混合模型'],

  // 第 3 章：双通道数据底座与深度知识工程
  '3.1': ['数据架构：硬指标与软知识双通道物理隔离哲学', '统计数据走 SQL 确定性查询通道，政策规划走切片检索通道；在上下文装配阶段汇合，避免模型在统计数据上产生幻觉。', '双通道隔离'],
  '3.2': ['结构化底座：1952-2024 年鉴库与 22,119 家企业图谱建设', '整理全省 925 个地区、970 张统计年鉴报表与 32 万条历史指标记录，清洗 21 个市州重点企业数据，覆盖县域经济核心维度。', '数据底座'],
  '3.3': ['知识工程：Dify 12 大专题知识库治理与 GraphRAG 混合检索', '处理 427 份文献与 254 万字政务资料；完成标题重构、业务领域 Schema 语义映射、上下文切片前缀，并应用 GraphRAG 与 RRF 融合检索。', '知识工程'],
  '3.4': ['记忆架构：Working/Episodic/Semantic/Procedural 四层体系', '工作记忆保存当前任务上下文，情节记忆记录执行轨迹，语义记忆存储领域知识，程序记忆固化技能操作，生命周期分别管理。', '四层记忆'],
  '3.5': ['数据形态：五层数据形态解耦与 RAG vs Memory 本质分界', '区分 Messages、Context、State、Memory 与 Knowledge 五层数据；明确客观事实依赖 SQL 与 RAG 检索，操作经验参考 Memory。', '形态解耦'],
  '3.6': ['上下文工程：五层组装结构、状态栏注入与渐进式技能挂载', '规范上下文组装顺序：系统角色定义、实时状态信息、按需挂载技能、已确认事实与精简历史，保证 Prompt 缓存命中。', '上下文工程'],

  // 第 4 章：9 大核心业务链流水线全景剖析
  '4.0': ['业务链体系概览：共享状态模型与受控流转规范', '9 条业务链共享 CountyEconomyState 数据结构，按参数校验、工位分派、工具执行、分析推理、质量审查到交付归档标准流转。', '业务链总则'],
  '4.1': ['业务链 01：数据治理与基础普查流水线 (data_governance)', '检查县域指标覆盖情况，识别异常值与不一致口径，生成带责任部门的离线补数台账与数据编目，为后续分析提供一致的数据。', '感知 · 治理'],
  '4.2': ['业务链 02：运行态势综合研判流水线 (monitoring_report)', '查询核心指标，代码计算同环比与横向对标，按规则触发三级预警，模型辅助分析运行态势，所有数字均校验数据库出处。', '感知 · 监测'],
  '4.3': ['业务链 03：产业精准画像与比较优势分析流水线 (industry_diagnosis)', '汇集企业、行业与投资项目数据，计算区位商 LQ 并绘制产业画像，结合规划资料识别优势门类与缺失环节，避免主观判断。', '分析 · 画像'],
  '4.4': ['业务链 04：县域发展瓶颈归因流水线 (bottleneck_analysis)', '将预警指标与土地、能耗、财政及劳动力等要素约束关联，生成问题传导链；瓶颈推论标记为待核验假设，并附线下核验清单。', '分析 · 归因'],
  '4.5': ['业务链 05：政策需求梳理与行动匹配流水线 (policy_decision)', '结合前期诊断结果，检索现行有效政策，比对申报资格与扶持条件，输出问题、政策、举措与责任部门对照表，并校验公文发文字号。', '决策 · 政策'],
  '4.6': ['业务链 06：一县一策思路与规划编制流水线 (one_county_one_policy_outline)', '总师工位拟定五章大纲并经人工审签，各章节 Worker 隔离起草草稿，质检工位复核后汇总修订，最终导出符合规范的 DOCX 送审稿。', '决策 · 规划'],
  '4.7': ['业务链 07：基于产业链断点的精准招商流水线 (project_investment)', '依据主导产业缺环推导招商需求，筛选省内外目标企业，核对园区用地、能耗与环保容量，生成招商引资清单与部门协同任务。', '决策 · 招商'],
  '4.8': ['业务链 08：统计分析与计量经济学研判流水线 (model_analysis)', '提供双重差分 DID、倾向得分匹配 PSM 及空间计量等模型；运行前先检验平行趋势与样本要求，条件不满足时自动终止并说明原因。', '支撑 · 计量'],
  '4.9': ['业务链 09：县域体制运作逻辑与协同堵点研判流水线 (governance_knowledge)', '从财权事权、考核机制与属地责任维度分析推进阻碍，梳理跨部门协同建议；涉及行政职能的表述严格遵循预设规范。', '支撑 · 治理'],

  // 第 5 章：16 个专家角色协同体系与边界规范
  '5.0': ['专家系统架构：领域专家工位契约与协同原则', '统一规范 16 个角色的工位职责、授权工具、输入输出 Schema 与判断边界，由图状态机按流程节点动态装配调用。', '专家协同总则'],
  '5.1': ['专家组 01：宏观经济与行政治理专家组（3 大角色）', '由首席经济专家、治理知识分析师、要素约束分析师组成，负责全局把控、部门职责逻辑梳理与要素承载力复核。', '专家组 · 宏观'],
  '5.2': ['专家组 02：数据治理与量化监测专家组（4 大角色）', '由数据治理专员、运行监测分析师、预警分析师、计量模型分析师组成，负责数据入口质量把关、指标跟踪与计量检验。', '专家组 · 数据'],
  '5.3': ['专家组 03：产业诊断与招商协同专家组（5 大角色）', '由产业战略分析师、产业链分析师、瓶颈诊断师、招商机会分析师与落地服务专员组成，负责产业断点分析到招商对接。', '专家组 · 产业'],
  '5.4': ['专家组 04：规划策划与质检统筹专家组（4 大角色）', '由政策策划专家、规划首席专家、质量审查专家与报告统稿员组成，负责政策匹配、规划大纲拆解、独立质检与文字统筹。', '专家组 · 规划'],
  '5.5': ['安全防护：Prompt 语义约束与 Harness 代码校验分工', '不依赖模型自觉遵守规则；跨区域越权、未授权工具、未标记来源数字与虚构公文文号由网关和代码层直接拦截。', '代码硬拦截'],
  '5.6': ['工位隔离：基于 Supervisor-Worker 的上下文沙箱划分', '拆分角色的目的是控制单次 Prompt 上下文长度、避免角色提示词相互干扰并最小化工具权限；Worker 仅向主控返回结构化结果。', '沙箱隔离'],

  // 第 6 章：分层质量门禁与事实契约体系
  '6.0': ['质量保证架构：严肃政务 AI 交付质量收口机制', '建立三层质检：前置程序规则排查、独立 Critic 语义复核与失败轨迹留存，防止不合规内容进入下一环节。', '质量保证总则'],
  '6.1': ['审查门禁：6 层级进式质量拦截与流转决策网 (Quality Gates)', '设置数字来源、证据文号、因果逻辑、公文格式、敏感词与人工审签 6 道检查门禁，未通过则打回修改或转人工确认。', '6 层门禁'],
  '6.2': ['证据契约：L1-L4 证据分级体系与严肃政务事实契约', '划分 L1 统计数据、L2 公文证据、L3 待核验假设与 L4 专家经验四级；分析推论必须注明核验方法与责任部门，主观经验不作为事实。', '证据契约'],
  '6.3': ['评测体系：四维综合质量矩阵与 CI/CD 防退化流水线', '从生成质量、执行耗时、权限拦截与异常恢复四个维度建立指标；基于 200+ 题评测集建立自动化测试流水线，监控模型版本变动带来的影响。', '自动化评测'],

  // 第 7 章：隆昌试点真实交付闭环
  '7.1': ['试点原点：隆昌市 (510283) 试点背景与真实业务场景', '以川南经济区隆昌市为试点，归集历年统计公报、政府工作报告、实地调研记录与企业名录，验证各业务流水线可行性。', '试点背景'],
  '7.2': ['端到端落地：从指令输入到送审稿生成的 12 阶段全过程', '拆解任务受理、数据检索、监测画像、瓶颈归因、政策匹配、章节分工撰写到审签导出的 12 阶段时序，在数据完整条件下约 30 分钟生成初稿。', '12 阶段落地'],
  '7.3': ['交付资产：隆昌试点 50+ 份核心交付物全景与适用边界', '产出包括五章规划草案、重点工程清单、部门补数清单、政策落地矩阵与招商清单等 50 余份文档，均明确标注为决策辅助送审草案。', '交付物全景'],

  // 第 8 章：生产就绪验收与个人工程复盘
  '8.1': ['认知复盘 01：严肃政务场景优先保障业务确定性', '政务场景中，业务流程、口径与权责边界由代码规则锁定；模型在工位内部负责材料理解、归因假设与公文初稿起草，避免自由发挥。', '认知复盘'],
  '8.2': ['认知复盘 02：推理前数据与知识治理直接决定交付质量', '大模型应用的大部分工程工作在推理前：报表口径清洗、文档结构还原与数据表语义映射，直接决定输出结果的准确率。', '认知复盘'],
  '8.3': ['交付准入：生产就绪 5 维工业级验收矩阵 (Readiness Checklist)', '推广上线前的五项验收指标：进程异常终止后 Checkpoint 恢复、步数与 Token 预算熔断、OpenTelemetry 链路追踪、只读沙箱权限与重试幂等。', '生产验收'],
  '8.4': ['可观测性：循环收敛效能度量与退出真实性审计 (Loop Observability)', '建立 Pass@1、Pass@3、无效动作比率 WAR 与退出真实性抽检机制，监控循环执行状态，避免模型在未达标时误标记完成。', '循环可观测'],
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
