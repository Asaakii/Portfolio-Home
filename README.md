# Asaakii's Home

个人主页，基于 [anheyu](https://index.anheyu.com/) 的源码二次开发。

## 预览

全屏 WebGL 3D 场景背景 + 滚动驱动动画，包含个人介绍、项目展示和联系方式。

## 技术栈

- **Three.js r112** — WebGL 3D 场景渲染（角色模型、布料模拟、地面反射）
- **TweenLite (GSAP)** — 缓动动画
- **Vanilla HTML / CSS / JS** — 无框架，无构建工具

> `js/index.js` 是 webpack 打包的压缩产物，包含所有业务逻辑（滚动系统、页面路由、WebGL 场景管理、音频交互等）。

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
└── assets/
    ├── fonts/                      # 自定义字体（GT-Sectra-Fine / NB Akademie，woff2 + 兼容格式）
    ├── audios/                     # 交互音效（hover、obstacle、under_water）
    └── images/
        ├── female.glb              # 3D 角色模型
        ├── animation.glb           # 角色动画数据
        ├── buffers.buf             # 几何缓冲区数据
        ├── high/                   # 布料模拟贴图（cloth_norm / cloth_pos / cloth.json）
        ├── floor.jpg / floor.png   # 地面材质
        ├── sprite.png              # 粒子精灵图
        ├── dark.png                # 暗色背景纹理
        ├── avatar.png              # 站点图标
        ├── myblog.png              # Featured 卡片 - 博客
        ├── code.webp               # Featured 卡片 - GitHub
        ├── Picturebed.png          # Featured 卡片 - 生活
        ├── Anheyu.png              # Featured 卡片 - 日常
        └── img-{1..4}/             # JS 动态加载的卡片缩略图（desktop / mobile 版本）
```

## 页面分区

| 区域 | 说明 |
|------|------|
| **Header** | 顶部导航栏（联系我 / GitHub / 个人博客），移动端有汉堡菜单 |
| **Hero** | 全屏欢迎语 "Welcome To Asaakii's Home"，WebGL 3D 场景背景 |
| **Message** | 个人介绍 —— "允许一切事情发生" |
| **Quote** | 座右铭 —— "你所热爱的就是你的生活" |
| **Featured** | 四张项目卡片（博客 / GitHub / 生活 / 日常），滚动视差效果 |
| **Contact** | 联系方式（博客、Email、GitHub） |

## 许可

基于 [anheyu](https://index.anheyu.com/) 源码，仅供个人学习使用。
