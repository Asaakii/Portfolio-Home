import sourceWhitepaper from '../content/county-whitepaper.md?raw';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import katex from 'katex';
import diagramAssets from '../content/county-diagrams.json';
import { diagramSignature, diagramSources } from '../../scripts/county-diagram-config.mjs';

// Keep a tracked source snapshot: the repository excludes its root docs/ folder.
export const whitepaper = sourceWhitepaper;
export const chapterNames = ['项目原点', '架构与运行时', '数据与知识工程', '9 条业务链', '16 个专家角色', '质量与评测', '隆昌试点', '工程复盘'];
const summaries: Record<string, [string, string]> = {
  '4.0': ['业务链共享的执行规范', '九条链共享 CountyEconomyState，依次完成输入校验、角色分派、工具调用、受控分析、质量审查与结构化交付。'],
  '5.0': ['专家规范的共同契约', '每个角色都有 role_id、业务链范围、授权工具、产物格式与判断边界。四个专家组按领域组织，实际执行由状态机按需装配。'],
  '6.0': ['程序断言、独立质检与经验闭环', '后置检查将生成结果收口：先验证数字、文号与规则，再由独立 Critic 审查体例和语义；失败诊断写入任务轨迹及经验库。'],
  '1.1': ['从人工填表开始的问题', '183 个县的经济情况，需要统一的数据口径和跨部门协作。立项材料描述了底数、研判、协同、政策追踪、报告时效与基层填报六类问题；总概算属于整体平台建设范围。'],
  '1.2': ['智能内核的任务与边界', '围绕经济监测、产业错位规划和政策执行三类业务，把证据整理成可追溯初稿。法定统计、正式行政排名、风险定性和最终审签保留在主管部门与专家手中。'],
  '2.1.1': ['宿主管平台，状态机管业务', 'Hermes 管会话、工具、技能和权限；LangGraph 管 CountyEconomyState、9 条业务链、质量门禁与产物。FastAPI/MCP 将业务入口与 PostgreSQL、Dify、证据存储连接起来。'],
  '2.1.2': ['为什么从 OpenClaw 迁移', '早期角色脚本和对话式探索难以维持长流程。迁移的重点是把路由、状态持久化、标准工具协议与多格式交付纳入工程控制，而非单纯更换模型。'],
  '2.1.3': ['把模型装进工作流', '代码明确必做步骤、允许的动作和停止条件；模型承担资料理解、假设生成、政策匹配与表达。业务规则负责全局控制，智能体只取得节点内的有限探索权。'],
  '2.1.4': ['外层按规则走，内层按证据查', '外层图控制前后依赖；内层 Harness 驱动 LLM → 工具 → 观测的反馈循环。单节点最多 6 轮，单次工具调用设 20 秒上限；失败会留下缺口和局部结论。'],
  '2.1.5': ['三问决定是否需要 Agent', '能穷举规则就用代码；只做一次提取或改写就用单步 LLM；需要根据观测继续追查时才用闭环 Agent。同比、LQ 和权限判断不交给语言模型计算。'],
  '2.2.1': ['七个模块如何形成一次交付', '目标、状态、模型、工具、记忆、规划器和护栏各司其职。完成判据同时检查文件落盘、Schema、6 层门禁、证据引用和进程退出码，不以模型自述作为成功依据。'],
  '2.2.2': ['工具调用的因果配对', '模型只声明调用，宿主负责执行。每条 tool_calls 与 role: tool 的结果通过 tool_call_id 配对；裁剪时成对处理。参数错误回传供自纠，Schema 合法后仍需核验行政区划权限。'],
  '2.2.3': ['规划、检索、反思分开负责', 'Planning 决定步骤，RAG 补事实，Reflection 查质量。缺数生成补数任务；先跑确定性断言，再调用语义 Critic；规划总师将章节交给独立 Worker 并按反馈重排。'],
  '2.2.4': ['多 Agent 什么时候有价值', '只有上下文容量、权限隔离、并行吞吐或独立审查确有需求时才拆 Worker。Supervisor 持有全局状态，Worker 仅回传结构化摘要，不做横向广播。文中 80/20 为选型描述。'],
  '2.3.1': ['基础设施与四级超时', 'Loop 处理一步模型协议；Harness 处理上下文、工具与预算；Infra 处理队列、持久化、追踪、多租户和沙箱。连接、首 Token、流片段间隔、任务总时限分别设限，429/5xx 使用随机指数退避。'],
  '2.3.2': ['用外部验证器判断结束', '防止反复震荡、虚假完成、相同参数空转和错误级联。Verifier 输出具体失败项，驱动定向修订；连续 3 轮质检失败转人工。文中的约 62% / 91% 是未附样本的测试描述。'],
  '2.3.3': ['可审查、可回滚的经验演进', '不修改模型权重，而是沉淀反思经验、在只读沙箱测试新工具、离线优化提示词。经验按后续成败增减置信度；生成工具需至少 3 组测试；敏感或全省通用规则经人类终审。'],
  '2.3.4': ['等待两天，也能接着跑', '补数和审批不能占用同步连接。挂起时保存 State、消息、角色和门禁快照并释放 Worker；签名回调通过 HMAC、时效与 CAS 检验后，补回原 tool_call_id 并恢复执行。'],
  '2.4.1': ['从线性调用升级为图', 'State 是单一事实源，Node 只读状态并返回 Delta，Edge 承担路由。分支、重试和并发变成可见拓扑，支持逐步快照与回放，避免控制流藏在节点内部。'],
  '2.4.2': ['状态生命周期与 Reducer', '必填输入、中间 Optional 字段、最终交付句柄分层建模。列表按 evidence_id 去重追加，大 DataFrame 留在节点内；下游安全访问缺项并显式降级。'],
  '2.4.3': ['路由必须有可用的出口', 'Literal 枚举约束意图，path_map 明确目标节点。前置参数错误直接收口；审查通过继续、失败定向重试、累计 3 次转人工，防止无限回环。'],
  '2.4.4': ['让长任务每一步都可见', 'app.stream / astream 将节点增量通过 SSE 或 WebSocket 推送。前端可看到正在做什么，运维可以关联工位耗时、输出字段和 Trace，减少误判卡死后的重复提交。'],
  '2.4.5': ['并发快，也要合得回来', '无依赖的能耗、产业链、财税和专利评估并行展开。Semaphore=5 控并发，分支独立超时返回缺数标记，深度合并 Reducer 保留嵌套子键；有依赖的步骤仍串行。'],
  '2.4.6': ['长研报分四个工位生成', '提纲 → 章节扩写 → 指标交叉核验 → 公文润色。各工位有独立字段，结构先由代码检查，语义再由模型检查；重试注入具体 critique_feedback，进度通过流事件呈现。'],
  '2.4.7': ['统一管理云端与内网模型', '数据分级决定模型路由，未公开敏感数据留在内网。统一连接池和消息协议适配异构模型，Pydantic 接收结构化结果；节点重试耗尽写错误标记并进入备用路径。'],
  '3.1': ['数字与政策走不同通道', '硬指标通过参数化 SQL 取得精确值、年份、来源和口径。政策与纪要经元数据过滤、混合检索和重排取回切片，两路在 Evidence Context 汇合后才进入分析。'],
  '3.2': ['先把数据底座清楚地建起来', '年鉴库包含 1952—2024 年数据、925 地区、970 张标准表和 324,539 条记录；企业库覆盖 21 市州、22,119 家企业。覆盖矩阵用于发现缺口，原文 9,150 单元的指标维度未说明。'],
  '3.3': ['427 份资料如何变成可检索知识', '12 个专题库承载约 254 万字。多模态解析、标题重建、纪要清洗、5 域语义目录、四维过滤和上下文前缀先改善原料；GraphRAG 做多跳与宏观检索，Vector/BM25 经 RRF 和 rerank 选出证据。'],
  '3.4': ['四层记忆，四种生命周期', '工作记忆维护当前目标；情景记忆留存任务轨迹；语义记忆保存指标与领域知识；程序记忆固化工作流、技能和工具。长期事实、操作规则和临时上下文各有存储位置。'],
  '3.5': ['消息、上下文、状态、记忆、知识', 'Messages 是原始协议记录，Context 是单次推理工作集，State 是任务进度，Memory 是跨任务经验，RAG 是外部客观资料。业务事实依 SQL/RAG，操作方法参考 Memory。'],
  '3.6': ['模型每一步究竟看到什么', '依序组装固定身份、实时环境、按需技能、已确认状态和近期轨迹。固定前缀避免动态变量破坏缓存；旧观测摘要折叠，工具调用成对裁剪，并在尾部重新强调当前目标。'],
  '4.1': ['数据治理：先确认能用哪些数据', '扫描覆盖度，校验一致性与完整性，将缺失字段变成带责任部门的补数任务。最终同时产出治理报告、资产目录和缺口台账；流转部门前人工确认。'],
  '4.2': ['运行监测：从指标到复核线索', '查询宏观指标并作同比、环比与横向对标，规则生成红黄绿信号，模型解释态势。每个数字核验 PostgreSQL 出处，低置信度或公开发布前复核。'],
  '4.3': ['产业诊断：优势需要比较依据', '聚合企业、行业和项目数据，用规模、成长、创新、带动、绿色五维和 LQ 描绘产业。检索规划及路线图后形成优势边界；薄弱证据降为线索，不将样本外推为全量结论。'],
  '4.4': ['瓶颈归因：让假设带着核验任务', '把监测信号、产业短板与土地、能耗、财政、人才约束交叉分析。输出假设与线下验证任务，未经识别检验的相关性不能升级为确定因果。'],
  '4.5': ['政策决策：从问题连到责任部门', '复用监测、产业与瓶颈产物，检索真实政策及申报条件，建立问题 → 政策 → 举措 → 牵头部门矩阵。文号与承诺内容经过审查，正式流转前由法制和业务处室复核。'],
  '4.6': ['一县一策：汇聚前序产物再编写', '总师设定定位与章节，独立 Worker 使用各自任务包写作。结构、证据、边界和模板适配审查生成修订补丁，通过后导出 Word 送审稿；完整规划展开前先审框架。'],
  '4.7': ['招商：从缺环反推机会', '由产业链断点匹配上下游企业，再核查园区、土地、能耗和环保承载力。形成机会清单、落地协同任务和项目报告；禁止未经审批的土地与税收承诺。'],
  '4.8': ['计量分析：先检验能不能算', '路由 DID、PSM、面板、空间计量等模型族，检查样本、控制变量和平行趋势。条件不足设为 blocked / needs_data；条件满足才执行，并交付系数、区间与运行元数据。'],
  '4.9': ['治理知识：解释现实中的协同堵点', '在财权事权、考核激励、垂直管理与属地责任中解释经济现象，匹配治理机制后生成协同方案。涉及部门权责与体制改革的表述经人工核验。'],
  '5.1': ['宏观与治理：统一判断基调', '首席经济专家统筹证据与业务；治理分析师解释部门运作；要素分析师核查资源承载。各自取得有限工具与证据切片，强结论需要主管部门核验。'],
  '5.2': ['数据与监测：让数字有依据', '数据治理、运行监测、阈值预警与计量分析四类角色分别把守入口、态势、线索和识别条件。缺数不能补造，预警不能当作已经发生的风险。'],
  '5.3': ['产业与招商：从画像走向可行动清单', '产业战略、产业链、瓶颈、招商和落地服务五类角色接力工作。分别交付优势边界、断点、假设、机会和服务任务，并守住样本、因果与承诺边界。'],
  '5.4': ['规划与审查：写作和验收分工', '政策策划、规划总师、专项质检和报告统稿四类角色负责政策映射、任务拆分、独立验收与公文输出。核查真实文号，避免模板照搬和将假设写成事实。'],
  '5.5': ['角色提示之后，还有代码护栏', 'Prompt 提高合规概率；allowed_tools、行政区划权限、数字来源和文号检验在执行或落盘前拦截。词法规则只是防线之一，不能据此声称语义安全绝对保证。'],
  '5.6': ['16 角色是按需激活的隔离工位', 'Supervisor 将目标、上下文和权限投影给 Worker，返回结果只保留结构化摘要。上下文隔离、并发、最小特权与独立审查才是角色拆分的工程价值。'],
  '6.1': ['六道门禁如何决定流转', '依次检查数字、证据、逻辑、结构、敏感信息和发布准入。无据内容打回，弱因果降为假设，敏感内容阻断，需要人审的任务挂起待审。'],
  '6.2': ['每个结论需要说明证据是什么', '硬数据、软证据、待核验假设和专家规则分别标识。假设必须带核验方法与责任部门，专家规则用于分析，不代替事实证据。'],
  '6.3': ['评测看环境结果，也看动作轨迹', '结果质量、路径效率、越权防护和异常恢复组成四维评测。执行断言、规则断言和模型裁判分层使用；200+ 题基准触发 PR 回归，每日巡检发现模型服务静默漂移。'],
  '7.1': ['为什么从隆昌跑通全流程', '隆昌市（510283）是端到端验证试点，材料包括历年统计公报、政府工作报告、专项材料与企业清单。它用于验证整条交付链，不能据此推定 183 县已经全面上线。'],
  '7.2': ['从业务指令到送审文件', '解析任务并加载县域配置，拉取指标与政策，运行监测、画像和归因，拆分章节并审查，注册审计轨迹，最后以标准公文模板输出 DOCX 与 JSON。'],
  '7.3': ['50+ 份成果与适用条件', '文档记录了五章规划送审稿、工程清单、采集与补数清单、政策矩阵和招商项目库。约 30 分钟是数据齐备后的初稿生成描述，不包含资料归集与行政审签。'],
  '8.1': ['复盘一：先守住业务确定性', '将数字、政策和权责检查放进流程与代码。生成能力只有在可追溯的证据边界中，才能成为严肃场景可以使用的决策辅助。'],
  '8.2': ['复盘二：真正费力的是数据工程', '970 张复杂报表、非标准标题、带噪音纪要和 206 张表的语义目录都需要前置治理。材料的结构和粒度会直接影响检索与交付质量。'],
  '8.3': ['上线前必须验证的五件事', '强杀后恢复、预算熔断、全链路追踪、沙箱权限、副作用幂等构成生产验收。原文列出的 100% 等指标为验收目标，不能当作已取得的上线测量结果。'],
  '8.4': ['持续观察循环是否真正收敛', '监测 Pass@1、Pass@3、无效动作比率，并每周抽查成功任务的事实与引用。WAR<10%、Pass@3≥90% 属于目标；4.8% 基线在原文未附原始日志。'],
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
  const [title, synopsis] = summaries[article.number] ?? [article.title, '核对表列出架构、数据、知识、试点与质量防线的可演示资产。'];
  const html = figures.reduce((result, [placeholder, figure]) => {
    if (!result.includes(placeholder)) throw new Error(`County exhibit: missing diagram placeholder in ${article.number}.`);
    return result.replace(placeholder, () => figure);
  }, code);
  return { ...article, id: `topic-${article.number.replaceAll('.', '-')}`, chapter: Number(article.number.split('.')[0]), title, synopsis, html, search: `${article.number} ${title} ${synopsis} ${article.body}`.toLowerCase().replace(/\s+/g, ' ').trim() };
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
