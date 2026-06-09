import { SmoothScroll } from './scroll.js';
import { initAnimations } from './animations.js?v=20260609-polish';

const canvas = document.getElementById('canvas');
const app = document.getElementById('app');
const mainEl = document.getElementById('main');
const scrollContent = document.getElementById('main-scroll');
const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloader-bar');
const preloaderCanvas = document.getElementById('preloader-canvas');
let preloaderFrame = null;

function hidePreloader() {
    if (preloaderFrame) {
        cancelAnimationFrame(preloaderFrame);
        preloaderFrame = null;
    }
    preloader.classList.add('is-hidden');
}

function setProgress(value) {
    preloaderBar.style.setProperty('--progress', `${Math.min(value, 100)}%`);
}

function initPreloaderCanvas() {
    if (!preloaderCanvas) return;

    const ctx = preloaderCanvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        preloaderCanvas.width = Math.floor(window.innerWidth * dpr);
        preloaderCanvas.height = Math.floor(window.innerHeight * dpr);
        preloaderCanvas.style.width = `${window.innerWidth}px`;
        preloaderCanvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const draw = (time) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const cx = width / 2;
        const cy = height / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < 26; i++) {
            const angle = i * 0.7 + time * 0.0012;
            const radius = 36 + Math.sin(time * 0.002 + i) * 18;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius * 0.35;
            ctx.fillStyle = i % 2 ? 'rgba(255, 88, 190, 0.55)' : 'rgba(116, 220, 255, 0.55)';
            ctx.beginPath();
            ctx.arc(x, y, 1.4 + (i % 4) * 0.35, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalCompositeOperation = 'source-over';
        preloaderFrame = requestAnimationFrame(draw);
    };

    preloaderFrame = requestAnimationFrame(draw);
}

initPreloaderCanvas();

// Safety timeout — always hide preloader after 6s
setTimeout(hidePreloader, 6000);

async function init() {
    setProgress(10);

    const scroll = new SmoothScroll(mainEl, scrollContent);
    setProgress(30);

    let webgl = null;
    try {
        const { WebGLBackground } = await import('./webgl-bg.js?v=20260609-neon');
        if (WebGLBackground.isWebGLAvailable()) {
            webgl = new WebGLBackground(canvas);
            webgl.init();
        } else {
            canvas.style.display = 'none';
            document.documentElement.classList.add('no-webgl');
        }
    } catch (e) {
        console.warn('WebGL init failed, using fallback:', e);
        webgl = null;
        canvas.style.display = 'none';
        document.documentElement.classList.add('no-webgl');
    }
    setProgress(60);

    await document.fonts.ready;
    setProgress(80);

    initAnimations(scroll);
    document.documentElement.classList.add('is-ready');
    document.documentElement.classList.toggle('use-webgl', !!webgl);
    document.documentElement.classList.toggle('no-webgl', !webgl);
    setProgress(100);

    setTimeout(hidePreloader, 400);

    // Mobile menu toggle
    const menuBtn = document.getElementById('header-menu-btn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('is-selected');
            menu.classList.toggle('is-active');
        });
    }

    function loop() {
        scroll.update();
        if (webgl) webgl.update();
        requestAnimationFrame(loop);
    }
    loop();
}

init().catch(e => {
    console.error('Init failed:', e);
    hidePreloader();
});
