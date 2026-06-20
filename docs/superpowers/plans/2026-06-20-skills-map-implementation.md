# Skills Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static `/skills/` personal capability map page and route the homepage fourth featured card to it.

**Architecture:** The root site is static HTML/CSS/JS, so the skills page should live under `skills/` without introducing a build step. The page owns its isolated CSS and JS, while `index.html` only changes the existing fourth featured card link and subtitle.

**Tech Stack:** Static HTML, CSS, plain JavaScript, existing local fonts, Node.js for lightweight verification.

---

## File Structure

- Create `skills/index.html`: complete static markup for the capability map page, including hero, map groups, skill nodes, detail panel, and footer navigation.
- Create `skills/styles.css`: isolated responsive styling for the skills page. It reuses existing font files from `../assets/fonts` and avoids depending on root `css/index.css`.
- Create `skills/script.js`: small interaction layer for selecting skill nodes and updating the desktop detail panel. The page remains useful if JavaScript fails because each node carries accessible text.
- Modify `index.html`: update the fourth featured card from external blog link to internal `/skills/`, remove external-link attributes, and set subtitle to `我的能力地图`.
- Create `tests/skills-page.test.mjs`: Node verification script that parses static files as strings and checks required route, copy, skill nodes, and accessible button structure.

## Task 1: Add Failing Static Verification

**Files:**
- Create: `tests/skills-page.test.mjs`

- [ ] **Step 1: Write the failing verification script**

Create `tests/skills-page.test.mjs` with this content:

```js
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const rootIndex = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const skillsIndex = await readFile(new URL('../skills/index.html', import.meta.url), 'utf8');
const skillsScript = await readFile(new URL('../skills/script.js', import.meta.url), 'utf8');

assert.match(
  rootIndex,
  /<div class="featured-item" data-id="img-4"[\s\S]*?<a class="featured-item-link"\s+href="\/skills\/"/,
  'Homepage fourth featured card should link internally to /skills/.'
);

assert.doesNotMatch(
  rootIndex,
  /<div class="featured-item" data-id="img-4"[\s\S]*?target="_blank"/,
  'Homepage fourth featured card should not open /skills/ in a new tab.'
);

assert.match(rootIndex, /我的能力地图/, 'Homepage fourth featured card should name the skills map.');

const requiredCopy = [
  '在雨里生长的能力地图',
  '要有听雨的心情，也要有淋雨的心情。',
  '创造表达',
  '山海行动',
  '工程造物',
  '长期修炼'
];

for (const text of requiredCopy) {
  assert.match(skillsIndex, new RegExp(text), `Missing required skills page copy: ${text}`);
}

const requiredSkills = [
  '摄影',
  '弹吉他',
  '音乐制作',
  '直播',
  '登山',
  '徒步',
  '潜水',
  'Vibe coding',
  '硬件开发',
  '软件开发',
  '智能家居 / DIY',
  '写作',
  '项目落地',
  '学习迁移'
];

for (const skill of requiredSkills) {
  assert.match(skillsIndex, new RegExp(`data-skill="${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), `Missing skill node: ${skill}`);
}

assert.match(skillsIndex, /<button[^>]+class="skill-node"/, 'Skill nodes should be real buttons.');
assert.match(skillsIndex, /aria-pressed="true"/, 'One skill node should be active by default.');
assert.match(skillsIndex, /href="\/"/, 'Skills page should link back to home.');
assert.match(skillsIndex, /href="\/projects\/"/, 'Skills page should link to projects.');
assert.match(skillsIndex, /href="https:\/\/blog\.asaakii\.com"/, 'Skills page should link to blog.');

assert.match(skillsScript, /addEventListener\('click'/, 'Skills script should support click selection.');
assert.match(skillsScript, /addEventListener\('focus'/, 'Skills script should support keyboard focus selection.');

console.log('skills page static checks passed');
```

- [ ] **Step 2: Run verification to confirm it fails**

Run:

```bash
node tests/skills-page.test.mjs
```

Expected: FAIL with `ENOENT` for `skills/index.html` because the page has not been created yet.

- [ ] **Step 3: Commit the failing verification**

Run:

```bash
git add tests/skills-page.test.mjs
git commit -m "test: add skills page static checks"
```

## Task 2: Build Static Skills Page Markup

**Files:**
- Create: `skills/index.html`

- [ ] **Step 1: Create the static page HTML**

Create `skills/index.html` with this content:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Skills - Asaakii's Home</title>
  <meta name="description" content="Asaakii 的个人能力地图：摄影、音乐、山海行动、vibe coding、软硬件开发与长期修炼。">
  <link rel="icon" href="https://img-asaakii-top.oss-cn-shanghai.aliyuncs.com/img/avatar2.png">
  <link rel="preload" href="../assets/fonts/nb_akademie_light-webfont.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/nb_akademie_medium-webfont.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/GT-Sectra-Fine-Book.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/GT-Sectra-Fine-Medium.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header class="site-header" aria-label="主导航">
    <a class="brand" href="/">Asaakii</a>
    <nav class="nav-links" aria-label="页面导航">
      <a href="/">Home</a>
      <a href="/projects/">Projects</a>
      <a href="https://blog.asaakii.com" target="_blank" rel="noopener noreferrer">Blog</a>
      <a href="https://github.com/asaakii" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </header>

  <main>
    <section class="hero" aria-labelledby="skills-title">
      <div class="rain-field" aria-hidden="true"></div>
      <p class="eyebrow">Skills Map</p>
      <h1 id="skills-title">在雨里生长的能力地图</h1>
      <p class="hero-line">要有听雨的心情，也要有淋雨的心情。</p>
      <p class="hero-copy">
        这里不是一份熟练度清单，而是一张持续生长的个人地图：有相机、琴弦、山海、直播间、代码、传感器，也有把它们串起来的好奇心。
      </p>
    </section>

    <section class="map-section" aria-labelledby="map-title">
      <div class="section-heading">
        <p class="eyebrow">Capability Islands</p>
        <h2 id="map-title">四个能力岛</h2>
      </div>

      <div class="skills-map">
        <div class="center-node" aria-label="中心节点">
          <span>Asaakii</span>
          <small>创造 / 行动 / 造物 / 修炼</small>
        </div>

        <article class="skill-group group-create" aria-labelledby="create-title">
          <h3 id="create-title">创造表达</h3>
          <p>把看见、听见和感受到的东西，变成可以被别人再次进入的现场。</p>
          <div class="skill-nodes">
            <button class="skill-node is-active" type="button" data-skill="摄影" data-status="持续拍摄" data-use="用画面收集日常里的光、天气和人的状态。" data-trace="桌面、旅行、户外和生活切片。" data-next="整理一组更完整的个人摄影专题。" aria-pressed="true">摄影</button>
            <button class="skill-node" type="button" data-skill="弹吉他" data-status="长期练习" data-use="用手指给情绪找一个节奏。" data-trace="翻弹、即兴、夜晚练习。" data-next="录几段更完整的木吉他片段。" aria-pressed="false">弹吉他</button>
            <button class="skill-node" type="button" data-skill="音乐制作" data-status="探索中" data-use="把情绪变成可回放的空气。" data-trace="旋律草稿、采样、混音实验。" data-next="完成一首从动机到发布的作品。" aria-pressed="false">音乐制作</button>
            <button class="skill-node" type="button" data-skill="直播" data-status="现场表达" data-use="把折腾过程、想法和情绪放到实时场域里。" data-trace="分享设备、开发、音乐和生活。" data-next="形成固定主题和更稳定的直播节奏。" aria-pressed="false">直播</button>
          </div>
        </article>

        <article class="skill-group group-action" aria-labelledby="action-title">
          <h3 id="action-title">山海行动</h3>
          <p>用身体重新校准距离、天气、风险和自由。</p>
          <div class="skill-nodes">
            <button class="skill-node" type="button" data-skill="登山" data-status="持续出发" data-use="在坡度和海拔里训练判断力。" data-trace="山路、风、负重和抵达。" data-next="做更系统的路线记录和装备复盘。" aria-pressed="false">登山</button>
            <button class="skill-node" type="button" data-skill="徒步" data-status="稳定进行" data-use="用长距离把脑子里的噪声走干净。" data-trace="城市边缘、山野路线、日常训练。" data-next="规划一条更长周期的徒步路线。" aria-pressed="false">徒步</button>
            <button class="skill-node" type="button" data-skill="潜水" data-status="向海学习" data-use="在水下练习安静、呼吸和信任装备。" data-trace="开放水域、海洋观察、潜水记录。" data-next="继续积累水下影像和安全经验。" aria-pressed="false">潜水</button>
          </div>
        </article>

        <article class="skill-group group-build" aria-labelledby="build-title">
          <h3 id="build-title">工程造物</h3>
          <p>让想法从一句话变成能运行、能触碰、能被别人使用的东西。</p>
          <div class="skill-nodes">
            <button class="skill-node" type="button" data-skill="Vibe coding" data-status="高频使用" data-use="用 AI 协作把灵感快速推到可运行状态。" data-trace="个人站点、项目原型、自动化工具。" data-next="沉淀更稳定的人机协作工作流。" aria-pressed="false">Vibe coding</button>
            <button class="skill-node" type="button" data-skill="软件开发" data-status="主线能力" data-use="搭建系统、接口、页面和数据流。" data-trace="业务系统、个人项目、工程化实践。" data-next="继续提升产品化、可维护性和交互质感。" aria-pressed="false">软件开发</button>
            <button class="skill-node" type="button" data-skill="硬件开发" data-status="动手造物" data-use="让想法长出实体按钮、传感器和反馈。" data-trace="硬件 DIY、智能设备、调试现场。" data-next="做一个软硬件联动的完整小作品。" aria-pressed="false">硬件开发</button>
            <button class="skill-node" type="button" data-skill="智能家居 / DIY" data-status="持续折腾" data-use="把生活空间改造成更懂自己的系统。" data-trace="自动化、设备联动、桌面环境。" data-next="整理一篇完整的智能家居实践笔记。" aria-pressed="false">智能家居 / DIY</button>
          </div>
        </article>

        <article class="skill-group group-practice" aria-labelledby="practice-title">
          <h3 id="practice-title">长期修炼</h3>
          <p>真正有用的能力，常常藏在跨领域迁移和持续完成里。</p>
          <div class="skill-nodes">
            <button class="skill-node" type="button" data-skill="写作" data-status="长期记录" data-use="把经验、观察和问题写成可以回看的路标。" data-trace="博客、项目记录、生活碎片。" data-next="提高长文结构和系列化表达。" aria-pressed="false">写作</button>
            <button class="skill-node" type="button" data-skill="项目落地" data-status="持续打磨" data-use="把想法从兴奋点推进到可展示、可使用、可复盘。" data-trace="项目集、个人工具、交付文档。" data-next="让更多项目拥有清晰的展示页和复盘。" aria-pressed="false">项目落地</button>
            <button class="skill-node" type="button" data-skill="学习迁移" data-status="核心方法" data-use="把音乐、户外、硬件和软件里的经验互相借力。" data-trace="跨领域解决问题、快速上手新工具。" data-next="建立更明确的学习地图和实践节奏。" aria-pressed="false">学习迁移</button>
          </div>
        </article>
      </div>

      <aside class="detail-panel" aria-live="polite" aria-label="技能详情">
        <p class="detail-kicker">当前节点</p>
        <h2 id="detail-title">摄影</h2>
        <dl>
          <div>
            <dt>状态</dt>
            <dd id="detail-status">持续拍摄</dd>
          </div>
          <div>
            <dt>我怎么用它</dt>
            <dd id="detail-use">用画面收集日常里的光、天气和人的状态。</dd>
          </div>
          <div>
            <dt>代表痕迹</dt>
            <dd id="detail-trace">桌面、旅行、户外和生活切片。</dd>
          </div>
          <div>
            <dt>下一步想探索</dt>
            <dd id="detail-next">整理一组更完整的个人摄影专题。</dd>
          </div>
        </dl>
      </aside>
    </section>
  </main>

  <footer class="site-footer">
    <p>允许一切事情发生，也允许自己慢慢长成一张更大的地图。</p>
    <nav aria-label="底部导航">
      <a href="/">回到首页</a>
      <a href="/projects/">项目集</a>
      <a href="https://blog.asaakii.com" target="_blank" rel="noopener noreferrer">个人博客</a>
    </nav>
  </footer>

  <script src="./script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Run verification to confirm remaining failures**

Run:

```bash
node tests/skills-page.test.mjs
```

Expected: FAIL with `ENOENT` for `skills/script.js` because the interaction file has not been created yet.

- [ ] **Step 3: Commit static markup**

Run:

```bash
git add skills/index.html
git commit -m "feat: add skills map markup"
```

## Task 3: Add Skills Page Interaction

**Files:**
- Create: `skills/script.js`

- [ ] **Step 1: Create the plain JavaScript interaction**

Create `skills/script.js` with this content:

```js
(function() {
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.skill-node'));
  var title = document.getElementById('detail-title');
  var status = document.getElementById('detail-status');
  var use = document.getElementById('detail-use');
  var trace = document.getElementById('detail-trace');
  var next = document.getElementById('detail-next');

  if (!nodes.length || !title || !status || !use || !trace || !next) return;

  function activateSkill(node) {
    nodes.forEach(function(item) {
      var isActive = item === node;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    title.textContent = node.getAttribute('data-skill') || node.textContent.trim();
    status.textContent = node.getAttribute('data-status') || '';
    use.textContent = node.getAttribute('data-use') || '';
    trace.textContent = node.getAttribute('data-trace') || '';
    next.textContent = node.getAttribute('data-next') || '';
  }

  nodes.forEach(function(node) {
    node.addEventListener('click', function() {
      activateSkill(node);
    });

    node.addEventListener('focus', function() {
      activateSkill(node);
    });
  });
})();
```

- [ ] **Step 2: Run verification to confirm homepage failure**

Run:

```bash
node tests/skills-page.test.mjs
```

Expected: FAIL with `Homepage fourth featured card should link internally to /skills/.`

- [ ] **Step 3: Commit interaction**

Run:

```bash
git add skills/script.js
git commit -m "feat: add skills map interaction"
```

## Task 4: Add Skills Page Styling

**Files:**
- Create: `skills/styles.css`

- [ ] **Step 1: Create isolated responsive CSS**

Create `skills/styles.css` with this content:

```css
@font-face {
  font-family: "GT-Sectra-Fine";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("../assets/fonts/GT-Sectra-Fine-Book.woff2") format("woff2");
}

@font-face {
  font-family: "GT-Sectra-Fine-Bold";
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("../assets/fonts/GT-Sectra-Fine-Medium.woff2") format("woff2");
}

@font-face {
  font-family: "nb_akademie_light";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("../assets/fonts/nb_akademie_light-webfont.woff2") format("woff2");
}

@font-face {
  font-family: "nb_akademie_medium";
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("../assets/fonts/nb_akademie_medium-webfont.woff2") format("woff2");
}

:root {
  color-scheme: dark;
  --bg: #050607;
  --panel: rgba(18, 22, 24, 0.82);
  --panel-strong: rgba(12, 15, 17, 0.94);
  --line: rgba(185, 205, 208, 0.18);
  --line-strong: rgba(209, 229, 229, 0.38);
  --text: #f3f0e8;
  --muted: rgba(243, 240, 232, 0.68);
  --soft: rgba(243, 240, 232, 0.46);
  --rain: #8fb8c7;
  --moss: #a5b68d;
  --warm: #d6b27c;
  --coral: #c98f82;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  background: var(--bg);
}

body {
  min-height: 100%;
  margin: 0;
  color: var(--text);
  background:
    radial-gradient(circle at 16% 8%, rgba(143, 184, 199, 0.16), transparent 32rem),
    radial-gradient(circle at 78% 22%, rgba(214, 178, 124, 0.1), transparent 26rem),
    linear-gradient(135deg, #050607 0%, #0c1113 48%, #050607 100%);
  font-family: "nb_akademie_light", "Microsoft Yahei", sans-serif;
  letter-spacing: 0;
}

body::before {
  position: fixed;
  inset: 0;
  pointer-events: none;
  content: "";
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, black, transparent 78%);
}

a {
  color: inherit;
  text-decoration: none;
}

.site-header,
.site-footer {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.site-header {
  min-height: 86px;
}

.brand {
  font-family: "GT-Sectra-Fine-Bold", serif;
  font-size: 1.05rem;
}

.nav-links,
.site-footer nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: var(--muted);
  font-family: "nb_akademie_medium", sans-serif;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.nav-links a,
.site-footer a {
  border-bottom: 1px solid transparent;
}

.nav-links a:hover,
.site-footer a:hover {
  border-bottom-color: currentColor;
  color: var(--text);
}

.hero {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: center;
  min-height: 78vh;
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 8vh 0 12vh;
  overflow: hidden;
}

.rain-field {
  position: absolute;
  inset: 8% 0 auto auto;
  width: min(48vw, 620px);
  height: 62vh;
  border: 1px solid var(--line);
  border-radius: 8px;
  opacity: 0.7;
  background:
    linear-gradient(110deg, transparent 0 46%, rgba(143, 184, 199, 0.22) 47%, transparent 48% 100%),
    repeating-linear-gradient(100deg, rgba(255, 255, 255, 0.16) 0 1px, transparent 1px 24px);
  transform: skewX(-8deg);
}

.eyebrow {
  margin: 0 0 1.5rem;
  color: var(--rain);
  font-family: "nb_akademie_medium", sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  margin: 0;
  font-family: "GT-Sectra-Fine", "Microsoft Yahei", serif;
  font-weight: 400;
}

h1 {
  max-width: 850px;
  font-size: clamp(3.8rem, 10vw, 9rem);
  line-height: 0.92;
}

.hero-line {
  max-width: 720px;
  margin: 2rem 0 0;
  color: var(--text);
  font-family: "GT-Sectra-Fine", "Microsoft Yahei", serif;
  font-size: clamp(1.5rem, 3vw, 2.7rem);
  line-height: 1.2;
}

.hero-copy {
  max-width: 620px;
  margin: 1.5rem 0 0;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.9;
}

.map-section {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 2rem;
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 4rem 0 6rem;
}

.section-heading {
  grid-column: 1 / -1;
}

.section-heading h2 {
  font-size: clamp(2.4rem, 5vw, 4.8rem);
}

.skills-map {
  position: relative;
  min-height: 760px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
  overflow: hidden;
}

.skills-map::before {
  position: absolute;
  inset: 12%;
  border: 1px dashed rgba(143, 184, 199, 0.2);
  border-radius: 999px;
  content: "";
}

.center-node,
.skill-group,
.detail-panel {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--panel);
  backdrop-filter: blur(18px);
}

.center-node {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 180px;
  min-height: 180px;
  padding: 1.3rem;
  text-align: center;
  transform: translate(-50%, -50%);
}

.center-node span {
  font-family: "GT-Sectra-Fine-Bold", serif;
  font-size: 1.6rem;
}

.center-node small {
  margin-top: 0.6rem;
  color: var(--soft);
  line-height: 1.7;
}

.skill-group {
  position: absolute;
  width: min(42%, 330px);
  padding: 1.3rem;
}

.skill-group h3 {
  font-size: 1.8rem;
}

.skill-group p {
  margin: 0.7rem 0 1rem;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.7;
}

.group-create {
  left: 4%;
  top: 5%;
  border-color: rgba(214, 178, 124, 0.34);
}

.group-action {
  right: 4%;
  top: 10%;
  border-color: rgba(165, 182, 141, 0.34);
}

.group-build {
  left: 5%;
  bottom: 6%;
  border-color: rgba(143, 184, 199, 0.38);
}

.group-practice {
  right: 5%;
  bottom: 8%;
  border-color: rgba(201, 143, 130, 0.34);
}

.skill-nodes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.skill-node {
  min-height: 38px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.55rem 0.85rem;
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  font: inherit;
  line-height: 1.2;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.skill-node:hover,
.skill-node:focus-visible,
.skill-node.is-active {
  border-color: var(--line-strong);
  background: rgba(143, 184, 199, 0.16);
  outline: none;
}

.skill-node:focus-visible {
  box-shadow: 0 0 0 3px rgba(143, 184, 199, 0.22);
}

.skill-node.is-active {
  transform: translateY(-1px);
}

.detail-panel {
  position: sticky;
  top: 24px;
  align-self: start;
  padding: 1.5rem;
  background: var(--panel-strong);
}

.detail-kicker {
  margin: 0 0 0.75rem;
  color: var(--rain);
  font-family: "nb_akademie_medium", sans-serif;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.detail-panel h2 {
  margin-bottom: 1.2rem;
  font-size: 2.6rem;
}

.detail-panel dl {
  display: grid;
  gap: 1rem;
  margin: 0;
}

.detail-panel dt {
  margin-bottom: 0.3rem;
  color: var(--soft);
  font-family: "nb_akademie_medium", sans-serif;
  font-size: 0.76rem;
}

.detail-panel dd {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.site-footer {
  align-items: flex-start;
  padding: 3rem 0 4rem;
  border-top: 1px solid var(--line);
}

.site-footer p {
  max-width: 520px;
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
}

@media (max-width: 960px) {
  .site-header,
  .site-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero {
    min-height: auto;
    padding-top: 4rem;
  }

  .rain-field {
    width: 74vw;
    height: 48vh;
    opacity: 0.42;
  }

  .map-section {
    display: block;
  }

  .skills-map {
    display: grid;
    gap: 1rem;
    min-height: 0;
    border: 0;
    background: transparent;
    overflow: visible;
  }

  .skills-map::before {
    display: none;
  }

  .center-node,
  .skill-group {
    position: static;
    width: 100%;
    transform: none;
  }

  .center-node {
    min-height: 0;
    place-items: start;
    text-align: left;
  }

  .detail-panel {
    position: static;
    margin-top: 1rem;
  }
}

@media (max-width: 560px) {
  .site-header,
  .site-footer,
  .hero,
  .map-section {
    width: min(100% - 28px, 1180px);
  }

  .nav-links,
  .site-footer nav {
    gap: 0.8rem;
  }

  h1 {
    font-size: clamp(3rem, 17vw, 4.6rem);
  }

  .hero-line {
    font-size: 1.45rem;
  }

  .skill-group,
  .detail-panel,
  .center-node {
    padding: 1rem;
  }

  .skill-node {
    max-width: 100%;
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
    animation-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Run verification to confirm homepage failure remains**

Run:

```bash
node tests/skills-page.test.mjs
```

Expected: FAIL with `Homepage fourth featured card should link internally to /skills/.`

- [ ] **Step 3: Commit styling**

Run:

```bash
git add skills/styles.css
git commit -m "style: design skills map page"
```

## Task 5: Update Homepage Fourth Entry

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update the fourth featured card link and label**

In `index.html`, replace the fourth featured card anchor opening:

```html
<a class="featured-item-link" target="_blank" rel="noopener noreferrer"
    href="https://blog.asaakii.com" data-has-parsed="true">
```

with:

```html
<a class="featured-item-link"
    href="/skills/" data-has-parsed="true">
```

In the same fourth featured card, replace:

```html
学着去做一个潇洒的NPC！
```

with:

```html
我的能力地图
```

- [ ] **Step 2: Run static verification**

Run:

```bash
node tests/skills-page.test.mjs
```

Expected: PASS with `skills page static checks passed`.

- [ ] **Step 3: Commit homepage route change**

Run:

```bash
git add index.html
git commit -m "feat: route homepage skills card"
```

## Task 6: Browser Verification And Polish

**Files:**
- Modify if needed: `skills/index.html`
- Modify if needed: `skills/styles.css`
- Modify if needed: `skills/script.js`
- Modify if needed: `index.html`

- [ ] **Step 1: Start a local static server**

Run:

```bash
python3 -m http.server 4000
```

Expected: server starts with `Serving HTTP on :: port 4000`.

- [ ] **Step 2: Verify desktop rendering**

Open `http://localhost:4000/skills/` at desktop width.

Check:

- Hero title is visible without overlap.
- Four capability groups are visible.
- Detail panel updates when clicking `音乐制作`, `潜水`, and `硬件开发`.
- Text fits inside skill buttons and cards.
- Footer links are visible.

- [ ] **Step 3: Verify mobile rendering**

Open `http://localhost:4000/skills/` at a narrow viewport around `390px`.

Check:

- Header links wrap cleanly.
- Hero copy does not cover the rain-field visual.
- Capability groups stack vertically.
- Skill buttons wrap without horizontal scroll.
- Detail panel appears after the map content and remains readable.

- [ ] **Step 4: Verify homepage route**

Open `http://localhost:4000/`.

Scroll to the fourth featured card and click it.

Expected: browser navigates to `http://localhost:4000/skills/` in the same tab.

- [ ] **Step 5: Run final static verification**

Run:

```bash
node tests/skills-page.test.mjs
```

Expected: PASS with `skills page static checks passed`.

- [ ] **Step 6: Commit polish if any changes were needed**

If browser verification required edits, run:

```bash
git add skills/index.html skills/styles.css skills/script.js index.html tests/skills-page.test.mjs
git commit -m "fix: polish skills map responsive layout"
```

If no edits were needed, do not create an empty commit.

## Self-Review

Spec coverage:

- `/skills/` static page: Task 2.
- Personal capability map instead of RPG tree: Task 2 and Task 4.
- Four groups and required skill set: Task 1 and Task 2.
- Homepage fourth card route and subtitle: Task 1 and Task 5.
- Dependency-free implementation: Task 2 through Task 4.
- Click/focus interaction and accessible buttons: Task 1 and Task 3.
- Desktop/mobile verification: Task 6.

Red-flag scan:

- No incomplete markers or vague implementation steps remain.

Type and name consistency:

- The test expects `skills/index.html`, `skills/styles.css`, and `skills/script.js`, matching the implementation tasks.
- Skill names in the verification list match the `data-skill` values in the markup.
- Detail panel IDs in `skills/script.js` match the IDs defined in `skills/index.html`.
