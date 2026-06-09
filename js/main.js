import { SmoothScroll } from './scroll.js';
import { initAnimations } from './animations.js';

const canvas = document.getElementById('canvas');
const app = document.getElementById('app');
const mainEl = document.getElementById('main');
const scrollContent = document.getElementById('main-scroll');
const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloader-bar');

function hidePreloader() {
    preloader.classList.add('is-hidden');
}

function setProgress(value) {
    preloaderBar.style.setProperty('--progress', `${Math.min(value, 100)}%`);
}

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
