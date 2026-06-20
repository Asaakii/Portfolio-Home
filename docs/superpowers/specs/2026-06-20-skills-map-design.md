# Skills Map Page Design

## Goal

Create a `/skills/` subpage for Asaakii's Home that presents personal abilities as a quiet, exploratory capability map. The page should feel aligned with the fourth homepage entry: "要有听雨的心情和淋雨的心情." It should describe a full personal practice field, not only work skills.

The homepage fourth featured card should link to `/skills/` and clearly label the destination as a personal skills map.

## Research Notes

GitHub has several "skill tree portfolio" examples, but most lean into RPG or cyberpunk conventions:

- `spereze27/skill-tree-portfolio`: React Flow skill nodes, character HUD, unlocked/in-progress/locked states, attribute radar.
- `Danilo-Vicentin-Silva/My-Skill-Tree`: a more conventional web developer portfolio with skill sections.
- `LanternCode/SkillTree`: an older React RPG skill-tree manager.
- `andrico1234/beautiful-skill-tree`: a reusable skill-tree component for web apps.

Useful pattern: clickable skill nodes with short descriptions and visible grouping.

Avoided pattern: heavy RPG HUD, XP bars, locked nodes, cyberpunk visuals, or resume-like percentage scores. Those clash with the current homepage's poetic tone.

## Chosen Approach

Use a "personal capability map" rather than a literal RPG tree.

The page is organized as four capability islands around Asaakii:

1. **创造表达**: photography, guitar, music production, livestreaming.
2. **山海行动**: mountaineering, hiking, diving.
3. **工程造物**: vibe coding, software development, hardware development, smart home and DIY.
4. **长期修炼**: writing, project shipping, curiosity, learning transfer.

Each skill should be described through personal fields:

- Status
- How I use it
- Trace or evidence
- Next exploration

The wording should avoid recruiting-page language like "90% proficiency" or generic "hard skills / soft skills." It should sound like a personal field notebook.

## Page Structure

### Hero

The hero introduces the page as:

- Title: `Skills`
- Chinese title or line: `在雨里生长的能力地图`
- Supporting sentence: `要有听雨的心情，也要有淋雨的心情。`

The first viewport should immediately signal that this is a personal skills map. The visual mood is dark, calm, and slightly rain-soaked, but not cyberpunk.

### Capability Map

Desktop layout:

- A central identity node for Asaakii.
- Four surrounding capability groups.
- Each group contains several skill nodes.
- Selecting or hovering a skill reveals a focused detail panel.

Mobile layout:

- Stack the four groups vertically.
- Skill nodes become compact cards or chips.
- Detail content is visible by default or expands inline.

### Skill Detail Content

Initial skill set:

- 摄影
- 弹吉他
- 音乐制作
- 直播
- 登山
- 徒步
- 潜水
- Vibe coding
- 硬件开发
- 软件开发
- 智能家居 / DIY
- 写作
- 项目落地
- 学习迁移

Example tone:

- 音乐制作: `把情绪变成可回放的空气。`
- 硬件开发: `让想法长出实体按钮、传感器和反馈。`
- 登山: `用身体重新校准距离、天气和意志。`

### Footer / Return Path

The page should include clear navigation back to:

- Home: `/`
- Projects: `/projects/`
- Blog: `https://blog.asaakii.com`

## Homepage Entry Change

Update the fourth featured card:

- Keep the main line: `要有听雨的心情和淋雨的心情`
- Change destination from `https://blog.asaakii.com` to `/skills/`
- Remove external-link behavior because `/skills/` is an internal page.
- Change subtitle from `学着去做一个潇洒的NPC！` to either `我的能力地图` or `Skills Map`.

Recommended subtitle: `我的能力地图`.

## Technical Shape

The root homepage is a static HTML/CSS/JS site. The simplest implementation is:

- Add `skills/index.html`.
- Add `skills/styles.css` if the page needs isolated styling.
- Reuse existing font files from `assets/fonts`.
- Keep the page dependency-free unless a very small interaction requires plain JavaScript.
- Update `index.html` fourth featured card link.

Avoid adding React, Astro, or a build step for this page. The existing root site is static, and a static skills page is easiest to host under `https://home.asaakii.com/skills`.

## Interaction Details

Desktop:

- Skill nodes can be keyboard-focusable buttons.
- Hover and focus update the active detail panel.
- Click locks the active skill until another skill is selected.

Mobile:

- Use tap-to-expand or always-visible summaries.
- Do not rely on hover.

Accessibility:

- All interactive nodes must be real buttons or links.
- Active state must be visible without relying only on color.
- The layout must remain readable with reduced motion.

## Visual Direction

Use a restrained palette:

- Deep charcoal / black base.
- Soft off-white text.
- Muted rain-blue accents.
- Small warm highlights for human/practice details.

Avoid a one-note blue or purple page. The current portfolio already uses strong dark visuals, so the skills page should feel textured and readable rather than decorative.

No decorative gradient orbs. Rain and map motifs can appear through subtle lines, borders, tiny droplets, noise, or text rhythm.

## Testing And Verification

Before completion:

- Serve the site locally.
- Check `/` and `/skills/`.
- Verify the fourth featured card navigates to `/skills/`.
- Capture or inspect desktop and mobile viewports.
- Confirm text does not overflow buttons, nodes, or cards.
- Confirm keyboard focus reaches all skill nodes.

## Open Decisions

Resolved:

- The page should use the personal capability map approach.
- No visual companion is needed.
- Initial implementation should be static.

Implementation may choose exact copy for each skill, but it must keep the personal field-notebook tone described above.
