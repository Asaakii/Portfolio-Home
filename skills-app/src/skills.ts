export type SkillGroupId = 'all' | 'creative' | 'body' | 'engineering' | 'making' | 'life' | 'thinking' | 'leisure';
export type ConcreteSkillGroupId = Exclude<SkillGroupId, 'all'>;

export interface SkillGroup {
  id: ConcreteSkillGroupId;
  label: string;
  subtitle: string;
  color: string;
  center: [number, number, number];
}

export interface Skill {
  id: string;
  name: string;
  group: ConcreteSkillGroupId;
  section: string;
  level: 1 | 2 | 3 | 4 | 5;
  quote: string;
  body: string;
  tags: string[];
  color: string;
  position: [number, number, number];
}

export interface SkillStar {
  id: string;
  skillId: string;
  group: ConcreteSkillGroupId;
  level: Skill['level'];
  position: [number, number, number];
  color: string;
  size: number;
  intensity: number;
}

type SkillRow = readonly [
  id: string,
  name: string,
  group: ConcreteSkillGroupId,
  section: string,
  level: Skill['level'],
  tags: readonly string[]
];

export const skillGroups: SkillGroup[] = [
  { id: 'creative', label: '创造与表达', subtitle: '影像、声音、文字和传播', color: '#eaa0af', center: [-4.4, 1.3, -0.7] },
  { id: 'body', label: '身体与行动', subtitle: '山海、速度、球场和身体经验', color: '#82ddc9', center: [-2.6, -2.8, 0.35] },
  { id: 'engineering', label: '工程与技术', subtitle: '代码、硬件、数据和自动化系统', color: '#9cc8ff', center: [2.8, 1.0, -0.6] },
  { id: 'making', label: '手艺与制造', subtitle: '维修、改造和电子 DIY', color: '#f1cf83', center: [4.5, -2.5, 0.85] },
  { id: 'life', label: '生活与生存', subtitle: '烹饪、整理和日常系统', color: '#93d98d', center: [-0.3, -4.0, -0.45] },
  { id: 'thinking', label: '思维与策略', subtitle: '产品、项目、学习和协作', color: '#c9b6ff', center: [0.1, 3.1, 0.62] },
  { id: 'leisure', label: '休闲与收藏', subtitle: '游戏、鉴赏、装备研究和旅行', color: '#efb58a', center: [4.8, 3.0, 0.5] }
];

const skillRows: SkillRow[] = [
  ['photography', '摄影', 'creative', '视觉创作', 3, ['风光', '人像', '街头', '产品', '微距']],
  ['mobile-photography', '手机摄影', 'creative', '视觉创作', 2, []],
  ['aerial-photography', '航拍 / 无人机摄影', 'creative', '视觉创作', 3, ['航拍', '无人机摄影']],
  ['video-shooting', '视频拍摄', 'creative', '视觉创作', 3, ['短片', 'vlog', '纪录片']],
  ['video-editing', '视频剪辑', 'creative', '视觉创作', 4, ['Premiere', 'Final Cut', 'DaVinci', '剪映']],
  ['color-grading', '调色 / 色彩分级', 'creative', '视觉创作', 2, ['调色', '色彩分级']],
  ['3d-modeling', '3D 建模', 'creative', '视觉创作', 1, ['Blender', 'C4D', 'SolidWorks']],
  ['digital-illustration', '插画 / 数字绘画', 'creative', '视觉创作', 1, ['插画', '数字绘画']],
  ['sketch-watercolor', '手绘 / 素描 / 水彩', 'creative', '视觉创作', 1, ['手绘', '素描', '水彩']],
  ['guitar', '弹吉他', 'creative', '音乐与声音', 2, ['木吉他', '电吉他']],
  ['harmonica', '口琴', 'creative', '音乐与声音', 1, []],
  ['vocal', '唱歌 / 声乐', 'creative', '音乐与声音', 2, ['唱歌', '声乐']],
  ['mixing-mastering', '混音 / 母带', 'creative', '音乐与声音', 2, ['混音', '母带']],
  ['podcast-audio-editing', '播客制作 / 音频剪辑', 'creative', '音乐与声音', 2, ['播客制作', '音频剪辑']],
  ['writing', '写作', 'creative', '文字与语言', 3, ['散文', '随笔', '博客']],
  ['technical-writing', '技术写作 / 文档', 'creative', '文字与语言', 3, ['技术写作', '文档']],
  ['english', '英语', 'creative', '文字与语言', 3, []],
  ['livestreaming', '直播', 'creative', '表演与传播', 3, ['游戏', '聊天', '才艺', '技术']],
  ['mountaineering', '登山', 'body', '山地与户外', 3, ['技术登山', '高海拔']],
  ['hiking', '徒步', 'body', '山地与户外', 3, ['长距离', '多日']],
  ['diving', '潜水', 'body', '水上运动', 1, ['自由潜', '水肺 SCUBA']],
  ['skiing', '滑雪', 'body', '雪上运动', 1, ['双板', '单板']],
  ['ice-sports', '冰上运动', 'body', '雪上运动', 1, ['滑冰', '冰球']],
  ['road-cycling', '公路骑行', 'body', '骑行与驾驶', 3, []],
  ['motorcycling', '摩托车骑行', 'body', '骑行与驾驶', 1, []],
  ['driving', '汽车驾驶', 'body', '骑行与驾驶', 4, []],
  ['running', '跑步', 'body', '竞技与格斗', 2, ['短跑', '长跑', '马拉松']],
  ['table-tennis', '乒乓球', 'body', '竞技与格斗', 4, []],
  ['badminton', '羽毛球', 'body', '竞技与格斗', 3, []],
  ['basketball', '篮球', 'body', '竞技与格斗', 1, []],
  ['esports', '电子竞技', 'body', '竞技与格斗', 4, []],
  ['frontend', '前端开发', 'engineering', '软件开发', 3, ['HTML', 'CSS', 'JavaScript', 'TypeScript']],
  ['python', 'Python', 'engineering', '软件开发', 3, []],
  ['systems-languages', 'Go / Rust / Java / C++', 'engineering', '软件开发', 3, ['Go', 'Rust', 'Java', 'C++']],
  ['database', '数据库', 'engineering', '软件开发', 3, ['SQL', 'NoSQL', 'Redis']],
  ['devops', 'DevOps', 'engineering', '软件开发', 2, ['Docker', 'K8s', 'CI/CD']],
  ['cloud', '云平台', 'engineering', '软件开发', 1, ['AWS', 'GCP', 'Azure', '阿里云']],
  ['linux-admin', 'Linux 系统管理', 'engineering', '软件开发', 3, []],
  ['api-design', 'API 设计', 'engineering', '软件开发', 2, ['REST', 'GraphQL', 'gRPC']],
  ['vibe-coding', 'Vibe Coding', 'engineering', 'AI 与数据', 3, ['AI辅助编程']],
  ['prompt-engineering', 'Prompt Engineering', 'engineering', 'AI 与数据', 3, []],
  ['data-analysis', '数据分析', 'engineering', 'AI 与数据', 3, ['Pandas', 'SQL', 'Excel']],
  ['data-visualization', '数据可视化', 'engineering', 'AI 与数据', 2, ['D3', 'ECharts', 'Tableau']],
  ['llm-apps', '大模型应用开发', 'engineering', 'AI 与数据', 3, ['LangChain', 'RAG', 'Agent']],
  ['web-scraping', '爬虫 / 数据采集', 'engineering', 'AI 与数据', 3, ['爬虫', '数据采集']],
  ['hardware', '硬件开发', 'engineering', '硬件与嵌入式', 2, ['电路设计', 'PCB']],
  ['embedded', '单片机 / 嵌入式', 'engineering', '硬件与嵌入式', 2, ['Arduino', 'ESP32', 'STM32', '树莓派']],
  ['soldering', '焊接', 'engineering', '硬件与嵌入式', 2, ['手工焊', '热风枪', '回流焊']],
  ['sensors-actuators', '传感器与执行器', 'engineering', '硬件与嵌入式', 2, []],
  ['smart-home', '智能家居搭建', 'engineering', '智能家居与 IoT', 3, ['HomeAssistant', '米家', 'HomeKit']],
  ['networking', '网络部署', 'engineering', '智能家居与 IoT', 3, ['路由', 'VLAN', '组网']],
  ['nas-home-server', 'NAS / 家庭服务器', 'engineering', '智能家居与 IoT', 3, ['NAS', '家庭服务器']],
  ['automation-scenes', '自动化规则 / 场景编排', 'engineering', '智能家居与 IoT', 2, ['自动化规则', '场景编排']],
  ['appliance-repair', '电器维修', 'making', '维修与改造', 2, []],
  ['furniture-assembly', '家具组装 / 改造', 'making', '维修与改造', 2, ['家具组装', '改造']],
  ['bike-maintenance', '自行车维护 / 调校', 'making', '维修与改造', 2, ['自行车维护', '调校']],
  ['electronic-diy', '电子 DIY / 改装', 'making', '模型与微缩', 2, ['电子 DIY', '改装']],
  ['chinese-cooking', '中餐烹饪', 'life', '烹饪', 2, ['家常菜', '地方菜系']],
  ['cocktail', '调酒', 'life', '烹饪', 1, []],
  ['organizing', '收纳整理', 'life', '生活管理', 2, []],
  ['time-management', '时间管理 / 效率系统', 'life', '生活管理', 2, ['GTD', '番茄钟']],
  ['knowledge-management', '知识管理', 'life', '生活管理', 2, ['Obsidian', 'Notion', '卡片笔记']],
  ['product-thinking', '产品设计 / 产品思维', 'thinking', '产品与项目', 2, ['产品设计', '产品思维']],
  ['project-management', '项目管理', 'thinking', '产品与项目', 2, ['敏捷', 'Scrum', '看板']],
  ['requirements-analysis', '需求分析', 'thinking', '产品与项目', 2, []],
  ['user-research', '用户研究 / 用户访谈', 'thinking', '产品与项目', 2, ['用户研究', '用户访谈']],
  ['data-driven-decision', '数据驱动决策', 'thinking', '产品与项目', 2, []],
  ['fast-learning', '快速学习 / 学习迁移', 'thinking', '学习与认知', 3, ['快速学习', '学习迁移']],
  ['systems-thinking', '系统思维 / 结构化思考', 'thinking', '学习与认知', 3, ['系统思维', '结构化思考']],
  ['critical-thinking', '批判性思维', 'thinking', '学习与认知', 3, []],
  ['teaching', '教学 / 知识传授', 'thinking', '学习与认知', 2, ['教学', '知识传授']],
  ['tutorial-course', '写教程 / 做课程', 'thinking', '学习与认知', 3, ['写教程', '做课程']],
  ['research-methodology', '研究方法论', 'thinking', '学习与认知', 2, []],
  ['team-leadership', '团队领导 / 管理', 'thinking', '社交与协作', 3, ['团队领导', '管理']],
  ['cross-functional-communication', '跨部门沟通', 'thinking', '社交与协作', 2, []],
  ['video-games', '电子游戏', 'leisure', '游戏', 4, ['主机', 'PC', '手游']],
  ['mahjong-cards', '麻将 / 纸牌', 'leisure', '游戏', 2, ['麻将', '纸牌']],
  ['film-appreciation', '影视鉴赏', 'leisure', '收藏与鉴赏', 2, []],
  ['music-appreciation', '音乐鉴赏', 'leisure', '收藏与鉴赏', 3, []],
  ['literature-reading', '文学阅读', 'leisure', '收藏与鉴赏', 2, []],
  ['art-appreciation', '艺术鉴赏', 'leisure', '收藏与鉴赏', 2, []],
  ['gear-research', '装备研究', 'leisure', '收藏与鉴赏', 4, ['相机', '音频', '户外', '数码']],
  ['travel-planning', '旅行规划', 'leisure', '旅行', 4, []],
  ['solo-travel', '独自旅行', 'leisure', '旅行', 4, []],
  ['backpacking', '背包旅行', 'leisure', '旅行', 4, []],
  ['road-trip', '自驾旅行', 'leisure', '旅行', 4, []],
  ['visa-border', '签证与出入境', 'leisure', '旅行', 4, []]
];

const levelLabels: Record<Skill['level'], string> = {
  1: '萌芽',
  2: '入门',
  3: '熟练',
  4: '精通',
  5: '造物'
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return function next() {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mixChannel(a: number, b: number, ratio: number) {
  return Math.round(a + (b - a) * ratio);
}

function mixHex(hex: string, target: string, ratio: number) {
  const source = parseInt(hex.slice(1), 16);
  const destination = parseInt(target.slice(1), 16);
  const r = mixChannel((source >> 16) & 255, (destination >> 16) & 255, ratio);
  const g = mixChannel((source >> 8) & 255, (destination >> 8) & 255, ratio);
  const b = mixChannel(source & 255, destination & 255, ratio);
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`;
}

const random = seededRandom(20260626);

function makePosition(group: SkillGroup, indexInGroup: number, groupCount: number): [number, number, number] {
  const angle = (indexInGroup / groupCount) * Math.PI * 2 + random() * 0.42;
  const ring = Math.sqrt((indexInGroup + 1) / groupCount);
  const radius = 0.35 + ring * 1.95 + random() * 0.32;
  const x = group.center[0] + Math.cos(angle) * radius * 1.18 + (random() - 0.5) * 0.48;
  const y = group.center[1] + Math.sin(angle) * radius * 0.86 + (random() - 0.5) * 0.44;
  const z = group.center[2] + Math.sin(angle * 1.7) * radius * 0.42 + (random() - 0.5) * 0.72;
  return [x, y, z];
}

const groupCounts = skillRows.reduce<Record<ConcreteSkillGroupId, number>>((acc, row) => {
  acc[row[2]] += 1;
  return acc;
}, { creative: 0, body: 0, engineering: 0, making: 0, life: 0, thinking: 0, leisure: 0 });

const groupIndexes: Record<ConcreteSkillGroupId, number> = {
  creative: 0,
  body: 0,
  engineering: 0,
  making: 0,
  life: 0,
  thinking: 0,
  leisure: 0
};

export const skills: Skill[] = skillRows.map(([id, name, groupId, section, level, tags]) => {
  const group = skillGroups.find((item) => item.id === groupId);
  if (!group) throw new Error(`Unknown skill group: ${groupId}`);
  const indexInGroup = groupIndexes[groupId];
  groupIndexes[groupId] += 1;
  const color = mixHex(group.color, level >= 4 ? '#fff2c2' : '#83c9ff', level >= 4 ? 0.28 : 0.12);

  return {
    id,
    name,
    group: groupId,
    section,
    level,
    quote: `${section} · ${levelLabels[level]}`,
    body: tags.length > 0 ? `${name}：${tags.join(' / ')}` : `${name}：熟练度 ${level} · ${levelLabels[level]}`,
    tags: [section, `Lv.${level} ${levelLabels[level]}`, ...tags],
    color,
    position: makePosition(group, indexInGroup, groupCounts[groupId])
  };
});

export function getSkillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id);
}

export function listSkillsByGroup(group: SkillGroupId): Skill[] {
  if (group === 'all') return skills;
  return skills.filter((skill) => skill.group === group);
}

export function getGroupLabel(group: ConcreteSkillGroupId): string {
  return skillGroups.find((item) => item.id === group)?.label ?? group;
}

export function buildSkillStars(): SkillStar[] {
  return skills.map((skill) => ({
    id: skill.id,
    skillId: skill.id,
    group: skill.group,
    level: skill.level,
    position: skill.position,
    color: skill.color,
    size: 0.72 + skill.level * 0.5,
    intensity: 0.28 + skill.level * 0.14
  }));
}
