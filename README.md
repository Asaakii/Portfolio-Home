# Asaakii's Home

个人主页，基于 [anheyu](https://index.anheyu.com/) 的源码二次开发。

## 预览

全屏 WebGL 3D 场景背景 + 滚动驱动动画，包含个人介绍、项目展示和联系方式。

## 技术栈

- **Three.js r112** — WebGL 3D 场景渲染（角色模型、布料模拟、地面反射）
- **TweenLite (GSAP)** — 缓动动画
- **Web Audio API** — 背景音乐与交互音效（右下角音频按钮控制）
- **Vanilla HTML / CSS / JS** — 无框架，无构建工具
- **阿里云 OSS** — 卡片图、favicon 等静态资源托管

> `js/index.js` 是 webpack 打包的压缩产物，包含所有业务逻辑（滚动系统、页面路由、WebGL 场景管理等）。

### 子站点

| 目录 | 说明 | 技术栈 |
|------|------|--------|
| `usage/` | AI 使用统计页 | Vanilla JS + 手写 SVG 图表，数据由 `scripts/update-usage-public.mjs` 生成 |
| `skills-app/` → `skills/` | 能力星图 | Vite + React 18 + Three.js + @react-three/fiber + drei + zustand |
| `projects-site/` → `projects/` | 项目集 | Astro 6 + Tailwind CSS 4，纯静态输出、零外部 JS |

## 本地运行

需要静态文件服务器（字体和 3D 模型通过绝对路径加载）：

```bash
# Python
python3 -m http.server 8080

# 或 Node.js
npx serve .
```

打开 http://localhost:8080

## 项目结构

```
├── index.html                      # 页面结构（Header / Hero / Message / Quote / Featured / Contact）
├── css/
│   └── index.css                   # 全局样式、动画、响应式断点（1600/1440/1280/420/400px）
├── js/
│   ├── index.js                    # 主业务逻辑（webpack 打包产物，14000+ 行）
│   ├── three.r112.js               # Three.js r112 运行时
│   └── TweenLite.js                # GSAP TweenLite 缓动库
├── assets/
│   ├── fonts/                      # 自定义字体（GT-Sectra-Fine / NB Akademie，仅 woff2）
│   ├── audios/                     # 音效（hover / 环境音，由右下角音频按钮控制）
│   └── images/
│       ├── female.glb              # 3D 角色模型
│       ├── animation.glb           # 角色动画数据
│       ├── buffers.buf             # 几何缓冲区数据
│       ├── high/                   # 布料模拟贴图（cloth_norm / cloth_pos / cloth.json）
│       ├── floor.jpg / floor.png   # 地面材质
│       ├── sprite.png              # 粒子精灵图
│       └── dark.png                # 暗色背景纹理
├── usage/                          # AI 使用统计静态页（见 usage/README.md）
├── skills-app/                     # 能力星图源码（Vite + React + Three.js），构建输出到 skills/
├── projects-site/                  # 项目集源码（Astro + Tailwind），构建输出到 projects/
└── scripts/
    └── update-usage-public.mjs     # 生成 usage/data.json 公开快照
```

> Featured 卡片图片和 favicon 托管在阿里云 OSS（`img-asaakii-top.oss-cn-shanghai.aliyuncs.com`），本地不再存副本。

## 页面分区

| 区域 | 说明 |
|------|------|
| **Header** | 顶部导航栏（联系我 / AI 使用 / 项目集 / GitHub / 个人博客），移动端有汉堡菜单；页面右下角有音频开关按钮 |
| **Hero** | 全屏欢迎语 "Welcome To Asaakii's Home"，WebGL 3D 场景背景 |
| **Message** | 个人介绍 —— 研发工程师 / 独立开发者 / 博主 |
| **Quote** | 座右铭 ——「内心丰盈者，独行也如众」 |
| **Featured** | 四张入口卡片（博客 / GitHub / 项目集 / 能力星图），滚动视差效果，图片走 OSS |
| **Contact** | 联系方式（博客、Email、GitHub） |

## 许可

本站源码基于 [anheyu](https://index.anheyu.com/) 的网站源码二次开发，原作者未附带开源协议，因此本仓库**不授予任何使用、修改、再分发或商用许可**，仅供个人学习参考。

仓库内的第三方资产与库各自适用其原始许可，不随本仓库授权：

- `assets/fonts/` 下的 **GT Sectra Fine**（Grilli Type）与 **NB Akademie** 为商业付费字体，仅用于本站页面渲染，不允许从本仓库提取、再分发或用于其他项目；
- `js/three.r112.js` 为 [Three.js](https://github.com/mrdoob/three.js)（MIT）；
- `js/TweenLite.js` 为 GreenSock 动画库，适用 [GreenSock 标准许可](https://greensock.com/standard-license/)；
- 子项目 `skills-app/`、`projects-site/` 的第三方依赖许可见其 `package.json` 对应包。
