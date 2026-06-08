import { SmoothScroll } from './scroll.js';
import { initAnimations } from './animations.js';

const canvas = document.getElementById('canvas');
const app = document.getElementById('app');
const scrollContent = document.getElementById('main-scroll');
const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloader-bar');

function hidePreloader() {
    preloader.classList.add('is-hidden');
}

function setProgress(value) {
    preloaderBar.style.setProperty('--progress', `${Math.min(value, 100)}%`);
}

setTimeout(hidePreloader, 6000);

async function init() {
    setProgress(10);

    const scroll = new SmoothScroll(app, scrollContent);
    setProgress(30);

    let webgl = null;
    try {
        const { WebGLBackground } = await import('./webgl-bg.js');
        if (WebGLBackground.isWebGLAvailable()) {
            webgl = new WebGLBackground(canvas);
            webgl.init();
        } else {
            canvas.style.display = 'none';
            document.body.classList.add('no-webgl');
        }
    } catch (e) {
        console.warn('WebGL init failed, using fallback:', e);
        webgl = null;
        canvas.style.display = 'none';
        document.body.classList.add('no-webgl');
    }
    setProgress(60);

    await document.fonts.ready;
    setProgress(80);

    initAnimations(scroll);
    setProgress(100);

    setTimeout(hidePreloader, 400);

    const menuBtn = document.getElementById('header-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
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
