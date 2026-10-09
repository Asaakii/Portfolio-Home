export const architectureLayers = [
  { name: '业务入口', en: 'BUSINESS ENTRY', tag: '目标与范围', items: ['业务系统', 'FastAPI', 'Hermes CLI'], title: '从业务诉求开始，先把任务界定清楚。', description: '接收用户问题、县域区划、年份和交付类型。入口不直接生成报告，先识别业务链、检查必填字段与行政区划授权，再把目标和完成判据交给运行时。', responsibility: '接口契约 · 身份与权限 · 任务受理', topic: '1-2' },
  { name: '平台宿主', en: 'HERMES HOST', tag: '工具与权限', items: ['Tool Gateway', 'Skills', 'MCP Hub'], title: '让工具、技能与会话有统一的管理边界。', description: 'Hermes 管理会话调度、技能角色注册和 MCP 服务。Tool Gateway 核验 Schema、工具白名单与参数权限。模型声明调用，宿主执行查询；业务计算和协议执行职责分离。', responsibility: '会话管理 · 工具鉴权 · 技能注册', topic: '2-1-1' },
  { name: '领域运行时', en: 'LANGGRAPH RUNTIME', tag: '流程与状态', items: ['CountyEconomyState', '9 Workflows', 'Reducer'], title: '下一步走哪里，由图和状态决定。', description: '强类型 State 维护任务进度、活跃证据、资源预算与重试计数。Node 返回增量，Reducer 合并证据；Edge 决定继续、补数、修订或挂起。检查点使长任务可以跨进程恢复。', responsibility: '确定性路由 · 节点调度 · 快照与恢复', topic: '2-4-1' },
  { name: '双通道底座', en: 'DATA + KNOWLEDGE', tag: '事实与依据', items: ['PostgreSQL', 'Dify RAG', 'Evidence Cards'], title: '数字查数据库，政策查原文。', description: '硬指标保留年份、单位、口径和记录来源；软知识保留文号、段落与元数据。两条通道在证据上下文汇合，不用向量片段推测统计数字。SQLite / Obsidian 组织证据卡与知识地图。', responsibility: '精确指标 · 政策溯源 · 缺口识别', topic: '3-1' },
  { name: '审查与交付', en: 'QUALITY + ARTIFACTS', tag: '验收与留痕', items: ['6 Quality Gates', 'Artifact Registry', 'MD / JSON / DOCX'], title: '一份初稿，必须带着它的证据一起交付。', description: '六道门禁检查数字、证据、逻辑、结构、敏感信息与发布资格。产物版本和 reasoning_trace.json 留下证据链；需要专家审签的结果挂起待审，文件生成不等于行政发布。', responsibility: '分层门禁 · 版本归档 · 人工审签', topic: '6-1' },
];
export const nodeTypes = [
  { name: '纯代码节点', en: 'DETERMINISTIC', question: '步骤与规则能完全穷举吗？', description: '同比 / 环比、区位商 LQ、资产编目、权限拦截和只读 SQL。算式和规则清楚的部分交给代码。', control: '代码掌握全部控制权', sample: '同比 = (本期值 − 同期值) / 同期值', color: 'mint' },
  { name: '单步 LLM', en: 'TRANSFORM', question: '只需完成一次提取或表达吗？', description: '运行摘要、意图分类、预警解释、公文润色。固定输入输出，不引入工具探索循环。', control: '代码定流程，模型做一次转换', sample: '已确认指标 → 结构化态势摘要', color: 'violet' },
  { name: '闭环 Agent', en: 'EXPLORE', question: '需要看完结果再决定查什么吗？', description: '产业链断点追查、瓶颈假设交叉核验、复杂规划章节协同。有限工具、预算和步数内自适应探索。', control: '局部探索权 + Harness 熔断', sample: '查企业 → 发现缺环 → 补查供应商 → 核验', color: 'peach' },
];
// Local walkthroughs explain the source-backed steps; they never call business APIs.
export const workflowNarratives = [
  ['确认县域、年份和数据范围，先检查必填参数。', '扫描指标和表结构，找出哪些年份、字段已有数据。', '检查完整性、一致性和异常值，记录冲突口径。', '把缺项整理为补数任务，并标明责任部门。', '将可用数据与缺口写入统一资产目录。', '交付治理报告和缺口台账，流转部门前人工确认。'],
  ['读取带年份、单位、统计口径和来源的硬指标。', '用代码计算变化，并作同口径的横向比较。', '规则产生预警线索，预警不等于风险已经发生。', '模型依据已确认指标解释运行态势。', '逐项核对数字与 PostgreSQL 记录是否一致。', '低置信度结果转复核，公开发布前进入人工审查。'],
  ['汇聚企业、行业指标和项目资料，确认样本边界。', '用规模、成长、创新、带动、绿色与 LQ 描绘产业。', '补充产业规划和技术路线资料，保留原文引用。', '对照上下游关系，识别优势以及配套断点。', '核查证据强度，不能将局部样本外推为全量结论。', '交付产业诊断、优势边界与仍待补充的证据。'],
  ['复用监测信号与产业诊断，不重复生成无来源结论。', '交叉查询土地、能耗、财政和人才等要素约束。', '整理可能的传导关系，区分观测事实与解释。', '将发展受阻的解释标为待核验假设。', '检查因果表述，相关性不能直接升级为确定因果。', '把假设、验证方法与线下核查任务一起交付。'],
  ['汇聚监测、产业与瓶颈分析的已有产物。', '检索真实政策，保留文号和原文段落。', '核对适用时期、产业范围与申报条件。', '形成问题、政策、举措和牵头部门的对应矩阵。', '审查文号与承诺内容，防止越权表述。', '交付建议与需求清单，正式流转前由业务和法制复核。'],
  ['组装指标、产业、瓶颈和政策的证据底包。', '规划总师设定定位、章节与写作任务。', '完整规划展开前，先由专家审查框架。', '独立 Worker 取得各自证据包，编写章节草稿。', '专项质检指出结构与证据问题，生成定向修订。', '导出 Word 送审稿；文件生成之后仍需行政审签。'],
  ['从产业链断点识别需要补齐的上下游环节。', '匹配企业样本，检查与本地产业的关联。', '将缺环整理为候选招商方向。', '核查园区、土地、能耗与环保承载条件。', '拦截未经审批的土地、税收等政策承诺。', '交付机会清单、落地服务任务与项目报告。'],
  ['按分析问题选择 DID、PSM、面板或空间模型族。', '加载面板数据，确认样本、变量与可用年份。', '检查识别条件；条件不足就阻断或请求补数。', '只有条件满足时才执行确定性计量工具。', '解释系数、区间和适用局限，保留运行元数据。', '交付模型结果与限制说明，因果结论需要对应检验。'],
  ['读取县域经济难题以及已有事实和证据。', '匹配财权事权、考核激励和属地责任等机制。', '用治理知识解释可能的部门协同堵点。', '把机制分析整理为可行的协作建议。', '对部门权责和体制改革表述进行人工核验。', '交付治理分析与协作映射，保留判断边界。'],
];
export const knowledgeCases = [
  { title: '报告分块', label: '让一个段落只回答一个问题', before: '无标题层级，按字符切块；平均 1,855 字，主题混在一起。', after: '将“一、”“（一）”恢复为 Markdown 标题，名词解释移到附录。', stats: [['12 → 23', '段落数量'], ['1,855 → 720', '平均字数'], ['6 → 0', '>1,500 字段']], note: '2025 年工作报告的单文档治理样例，不是全部知识库平均值。', visual: 'chunks' },
  { title: '纪要去噪', label: '把录音转写变成有结构的证据', before: '时间戳、口语词和短句割裂语义，检索无法有效命中。', after: '剔除口语噪音，合并自然段，补充经济实体关键词与章节层级。', stats: [['0 → 0.67–0.75', '文中记录的相似度'], ['清洗 + 重建', '治理步骤']], note: '相似度属于原文样例描述；它不能直接代表召回率或准确率。', visual: 'noise' },
  { title: '语义目录', label: '把业务用语接到物理表名', before: '“隆昌 GDP 在哪张表？”与 206 张技术 DDL 文档之间缺少语义桥。', after: '按经济人口、工业科技、农业投资、商贸民生和县域速查建立 5 个业务域索引。', stats: [['206', '物理表结构'], ['5', '业务域索引'], ['0 → 0.815', '样例命中得分']], note: '0.815 是样例检索得分，原文未提供检索评测集。', visual: 'schema' },
  { title: '上下文前缀', label: '“我市”“上述产业”终于有了主语', before: '孤立切片含“我市”“上述骨干企业”，无法确认县域和产业。', after: '离线为 Chunk 加入 50–100 字的文档、章节与主题前缀，再计算向量和 BM25 索引。', stats: [['50–100 字', '离线上下文前缀'], ['文档 → 章节 → 主题', '定位结构']], note: '前缀提前生成；线上仍需承担检索、重排与模型推理成本。', visual: 'prefix' },
  { title: 'GraphRAG', label: '既能追上下游，也能看整体战略', before: '零散向量片段难以串起供应依赖，也难以归纳县域整体战略。', after: '抽取实体关系，Leiden 聚类生成社群摘要；局部沿边扩散 1–2 度，全局检索高层摘要。', stats: [['Local', '实体多跳路径'], ['Global', '宏观社群摘要']], note: '下方产业关系为白皮书中的架构示例，不是本页实时查询结果。', visual: 'graph' },
  { title: '混合检索', label: '语义相似与文号精确匹配一起用', before: '向量分数与 BM25 分数量纲不同，简单相加会偏向单一路径。', after: 'Vector / BM25 各召回 Top-50；RRF（k=60）按名次融合，Top-30 进入 gte-rerank-v2，选 Top-5 证据。', stats: [['50 → 30 → 5', '召回 · 粗排 · 精排'], ['Σ 1 / (60 + rank)', 'RRF 融合']], note: '这些是检索流程配置，不是检索准确率测量。', visual: 'rrf' },
];
export const contextLayers = [
  ['固定身份与安全基线', '稳定前缀', '专家身份与统计、权责、涉密边界固定在最顶部，不混入动态时间，以保持缓存前缀稳定。'],
  ['运行时状态栏', '实时环境', '注入真实时间、county_code、step_used / max_steps、Token 水位。模型看见当前范围与预算，代码仍负责硬熔断。'],
  ['渐进式技能挂载', '按需披露', '起步只给技能索引。确认需要后再加载行业 SOP 和 SKILL.md，避免 16 角色的所有规范挤占工作集。'],
  ['状态与已确认事实', '当前子目标', '放入本阶段目标、已确认硬指标、完成里程碑和证据句柄；与假设保持明确标识。'],
  ['近期轨迹与工具观测', '安全裁剪', '保留近期清洗观测，旧轨迹摘要折叠。工具声明与结果成对保留，尾部再强调当前交付任务。'],
];
export const gates = [
  ['数字门禁', '每个数值能否对应来源、年份与口径？', '无据数字打回，不能用流畅表达掩盖数据缺口。'],
  ['证据门禁', '政策文号与原文段落是否真实可追溯？', '校验 Dify 真实切片和政策元数据，避免模糊引文。'],
  ['逻辑门禁', '相关性是否被写成因果？是否越权承诺？', '未满足识别条件的强因果表述降级为待核验假设。'],
  ['结构门禁', '章节、Schema 与公文格式是否齐备？', '先查结构规则，再用独立 Critic 检查主观语义质量。'],
  ['敏感门禁', '是否含未脱敏的隐私或敏感经营信息？', '发现敏感内容阻断流转，按数据分级约束模型路由。'],
  ['发布门禁', '是否需要专家或主管部门审签？', '需要人审的任务进入待审队列，送审稿保留草案身份。'],
];
export const qualityExamples = [
  { title: '缺少出处的数字', text: '“隆昌某产业增长 18.6%，具备绝对比较优势。”', gate: 0, result: '数字门禁打回', detail: '18.6% 是演示用数字，未绑定指标 ID。先补齐来源、年份和统计口径，不能直接进入后续论证。', repair: '写入 missing_metric_tasks，生成补数与核验事项。' },
  { title: '把关联写成因果', text: '“政策出台直接导致该产业回升。”', gate: 2, result: '逻辑门禁降级', detail: '未附计量识别条件和模型结果。时间上的先后或同期变化不足以证明因果关系。', repair: '改为“提示存在关联，需进一步核验”，附验证任务与责任部门。' },
  { title: '有依据的规划草案', text: '“依据已核验指标与真实政策条款，形成一县一策方案初稿。”', gate: 5, result: '挂起等待专家审签', detail: '演示假定数字、引用、结构和脱敏检查已通过。生成送审文件后，仍需经过对应业务的人工审核。', repair: '保存 Checkpoint 与审查记录；经授权确认后恢复流转。' },
];
export const deliverySteps = [
  ['受理业务目标', '识别“全域数智化转型规划”任务，确认县域、周期和产物范围。', 'task_spec / DoD'],
  ['加载县域配置', '加载隆昌 510283 的角色、证据库与流程配置，核验区划权限。', 'county_context'],
  ['拉取硬指标', '从 PostgreSQL 查询近 5 年 GDP、工业增加值、固投等，记录口径与来源。', 'macro_metrics_snapshot'],
  ['检索软证据', '从 KB-510283 与政策库检索规划指引、调研纪要及产业资料。', 'active_evidence_refs'],
  ['运行监测', '对比指标表现与规则阈值，产出态势摘要和需复核预警。', 'monitoring_report.md'],
  ['产业画像', '分析主导产业、五维比较优势和上下游断点，保留优势边界。', 'advantage_boundary.json'],
  ['瓶颈假设', '交叉分析要素制约，生成假设、缺口和线下核查任务。', 'hypotheses.json'],
  ['拆分写作任务', '总师设定框架，章节 Worker 取得相关证据和有限工具权限。', 'chapter_task_packages'],
  ['章节与工程清单', '编写第一至第五章草稿及重点工程条目，独立返回结构化产物。', 'section_drafts'],
  ['六层质量审查', '核对数字与政策文号，检查因果边界、结构和脱敏，问题生成修订补丁。', 'planning_quality_review.json'],
  ['注册审计轨迹', '关联 Finding 与 Evidence，记录产物版本、工具观测与审核状态。', 'reasoning_trace.json'],
  ['导出送审文件', '注入标准公文模板，通过 Pandoc / Docx 导出 DOCX，并交付结构化清单。', 'DOCX + MD + JSON / Excel'],
];
export const engineeringTabs = [
  { title: '状态契约', subtitle: '输入、中间态与交付句柄分层', description: '中间字段允许未生成；节点只读取状态并返回 Delta。大对象留在节点局部，State 保留摘要与句柄，避免检查点膨胀。', code: 'class CountyEconomyState(TypedDict):\n    county_code: str        # 必填输入\n    target_year: str\n    workflow_id: str\n    macro_metrics: Optional[dict]\n    hypotheses: Optional[list]\n    final_artifact: Optional[str]\n    review_retry_count: int', topic: '2-4-2' },
  { title: '证据合并', subtitle: '避免后一个节点覆盖前一个节点', description: '列表以 evidence_id 合并去重；并发嵌套字典使用深度合并 Reducer。消息按协议原子对追加和裁剪，保证审计链连续。', code: 'def merge_evidence(current, delta):\n    by_id = {e["evidence_id"]: e\n             for e in current}\n    for evidence in delta:\n        by_id[evidence["evidence_id"]] = evidence\n    return list(by_id.values())\n\n# 嵌套字典：递归合并，保留不同维度子键', topic: '2-4-5' },
  { title: '受控路由', subtitle: '继续、修订与人工接管都有出口', description: '枚举路径与 path_map 明确映射，不让模型用自由文本指定下一节点。输入错误快速收口；连续 3 轮审查失败转人工。', code: 'def route_review(state):\n    if state.get("review_passed"):\n        return "continue"\n    if state.get("review_retry_count", 0) >= 3:\n        return "human_review"\n    return "revise_with_feedback"\n\n# 条件边负责跳转；节点只返回增量', topic: '2-4-3' },
  { title: '真实完成', subtitle: '模型说“完成”，还要经过外部验收', description: '同时核验真实文件、结构化契约、质量门禁和证据闭合。预算、步数与总时限都由宿主检查；失败项记录后定向修订。', code: 'checks = [\n    artifacts_exist_and_schema_valid(),\n    quality_gates_passed(no_p0=True),\n    every_reference_has_source_id(),\n    process_exit_code == 0,\n]\nstatus = "succeeded" if all(checks) \\\n         else "needs_revision"', topic: '2-2-1' },
];
export const asyncStates = [
  { status: 'RUNNING', title: '分析发现指标缺项', text: '不猜数。准备派发跨部门补数工单，并保留本次工具调用的唯一标识。', items: ['缺项 → missing_metric_tasks', '保留 tool_call_id', '准备异步任务句柄'] },
  { status: 'SUSPENDED', title: '完整保存现场，释放 Worker', text: '持久化业务 State、消息轨迹、角色配置与门禁快照；发出签名句柄，任务等待外部数据。', items: ['PostgreSQL Checkpoint', 'AsyncHandleToken + HMAC', 'CPU / 内存释放'] },
  { status: 'VERIFYING', title: '补数系统发来回调', text: '网关校验 HMAC-SHA256 签名、时间戳与有效期。CAS 要求当前状态仍为 SUSPENDED，重复投递不会重复执行。', items: ['签名验证', '72 小时时效检查', 'CAS 防重放'] },
  { status: 'RESUMED', title: '将结果接回原来的步骤', text: '恢复上下文，将补数结果装配成配对的 role: tool 观测，再进入后续分析。未通过验签的回调保留挂起状态。', items: ['恢复 State 与消息', '配对 tool_call_id', '继续下一节点'] },
];
