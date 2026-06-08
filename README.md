# Asaakii Portfolio Home

Personal portfolio homepage, inspired by [index.anheyu.com](https://index.anheyu.com/).

## Tech Stack

- **Three.js** (r168) — WebGL light scatter background with custom shaders
- **GSAP 3** — Animations and scroll-driven effects
- **HTML / CSS / JavaScript** — No frameworks, ES Modules

## Local Development

Requires a static file server (ES Modules don't work over `file://`):

```bash
cd portfolio-home

# Python
python3 -m http.server 8080

# Or Node.js
npx serve .
```

Open http://localhost:8080

## Project Structure

```
├── index.html          — Page structure (5 sections + header)
├── css/index.css       — Layout, typography, animations, responsive
├── js/
│   ├── main.js         — Entry point, preloader, module wiring
│   ├── webgl-bg.js     — WebGL background (Three.js + post-processing)
│   ├── scroll.js       — Custom smooth scroll with inertia
│   └── animations.js   — DOM animations (split-line, hero flip, cursor)
├── fonts/              — Custom fonts (Playfair Display + Inter)
└── images/             — Card images (placeholder gradients for now)
```

## Features

- Full-screen WebGL light scatter effect (mouse-following)
- Custom smooth scroll with momentum/inertia
- Character-by-character hero title animation
- Split-line text reveal on scroll
- Responsive (1600/1440/1280/420/400px breakpoints)
- Mobile hamburger menu
- WebGL graceful degradation (CSS fallback)
