import { SmoothScroll } from './scroll.js';
import { WebGLBackground } from './webgl-bg.js';
import { initAnimations } from './animations.js';

const canvas = document.getElementById('canvas');
const app = document.getElementById('app');
const scrollContent = document.getElementById('main-scroll');
const preloader = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloader-bar');

function setProgress(value) {
    preloaderBar.style.setProperty('--progress', `${Math.min(value, 100)}%`);
}

async function init() {
    setProgress(10);

    const scroll = new SmoothScroll(app, scrollContent);
    setProgress(30);

    let webgl = null;
    if (WebGLBackground.isWebGLAvailable()) {
        webgl = new WebGLBackground(canvas);
        webgl.init();
        setProgress(60);
    } else {
        canvas.style.display = 'none';
        document.body.classList.add('no-webgl');
        setProgress(60);
    }

    await document.fonts.ready;
    setProgress(80);

    initAnimations(scroll);
    setProgress(100);

    setTimeout(() => {
        preloader.classList.add('is-hidden');
    }, 400);

    // Mobile menu toggle
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

init();
