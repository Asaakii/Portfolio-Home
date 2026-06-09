function splitTextIntoLines(element) {
    if (element.querySelector('.split-line')) {
        return element.querySelector('.split-line-inner');
    }

    const text = element.textContent;
    element.textContent = '';
    element.classList.add('split-line-mask-effect');

    const lineWrapper = document.createElement('div');
    lineWrapper.classList.add('split-line');

    const sizerSpan = document.createElement('span');
    sizerSpan.classList.add('split-line-sizer');
    sizerSpan.setAttribute('aria-hidden', 'true');
    sizerSpan.textContent = text;
    sizerSpan.style.visibility = 'hidden';
    sizerSpan.style.display = 'block';

    const innerSpan = document.createElement('span');
    innerSpan.classList.add('split-line-inner');
    innerSpan.textContent = text;
    innerSpan.style.transform = 'translateY(105%)';
    lineWrapper.appendChild(innerSpan);
    lineWrapper.appendChild(sizerSpan);
    element.appendChild(lineWrapper);

    return innerSpan;
}

function createHeroTitleAnimation(titleElement) {
    const text = titleElement.textContent.trim();
    titleElement.textContent = '';
    titleElement.style.visibility = 'visible';

    const chars = text.split('');
    const spans = chars.map(char => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';

        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.innerHTML = char === ' ' ? '&nbsp;' : char;
        inner.style.transform = 'rotateX(90deg)';
        inner.style.transformOrigin = '50% 50%';
        inner.style.opacity = '0';

        wrapper.appendChild(inner);
        titleElement.appendChild(wrapper);
        return inner;
    });

    return spans;
}

function updateFeaturedTransforms(scrollVelocity = 0) {
    const vh = window.innerHeight;
    const items = document.querySelectorAll('.featured-item');
    const featuredContainer = document.getElementById('featured-items-container');

    if (featuredContainer) {
        const skew = Math.max(-4, Math.min(4, scrollVelocity * 0.02));
        featuredContainer.style.transform = `skewY(${skew}deg) translateZ(0)`;
    }

    items.forEach(item => {
        const image = item.querySelector('.featured-item-image');
        const context = item.querySelector('.featured-item-context');
        if (!image || !context) return;

        if (window.innerWidth <= 1280) {
            image.style.transform = '';
            context.style.transform = '';
            return;
        }

        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = Math.min(1, Math.abs(center - vh * 0.55) / vh);
        const settle = 1 - distance;
        const imageScaleY = 1 + (1 - settle) * 0.6;
        const imageY = (1 - settle) * 10;
        const contextScaleX = 1 + (1 - settle) * 0.6;
        const contextX = (1 - settle) * 20;

        image.style.transform = `translate3d(0, ${imageY}vh, 0) scale3d(1, ${imageScaleY}, 1)`;
        context.style.transform = `translate3d(${contextX}px, 0, 0) scale3d(${contextScaleX}, 1, 1)`;
    });
}

function initCursorFollower(gsap) {
    const cursor = document.getElementById('cursor-follow');
    if (!cursor || window.innerWidth <= 1280) return;

    let visible = false;
    let mouseX = -100;
    let mouseY = -100;

    const render = () => {
        if (!visible) return;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        requestAnimationFrame(render);
    };

    document.querySelectorAll('.featured-item-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            visible = true;
            cursor.textContent = 'View';
            cursor.style.display = 'block';
            gsap.to(cursor, { opacity: 1, duration: 0.18 });
            render();
        });

        link.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        link.addEventListener('mouseleave', () => {
            visible = false;
            gsap.to(cursor, {
                opacity: 0,
                duration: 0.18,
                onComplete: () => {
                    cursor.style.display = 'none';
                },
            });
        });
    });
}

export function initAnimations(scrollInstance) {
    const gsap = window.gsap;
    if (!gsap) {
        console.warn('GSAP not loaded, skipping animations');
        return;
    }

    // Hero title flip-in
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const charSpans = createHeroTitleAnimation(heroTitle);
        gsap.to(charSpans, {
            rotateX: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            delay: 0.5,
        });
    }

    // Scroll indicator fade-out
    const scrollIndicator = document.getElementById('main-scroll-indicator');
    if (scrollIndicator && scrollInstance) {
        scrollInstance.onScroll((scrollY) => {
            if (scrollY > 50) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Scroll-based section reveals (opacity: 0 elements)
    const revealSections = document.querySelectorAll('.sec-context-inner[style*="opacity: 0"]');
    const revealData = [];
    revealSections.forEach(el => {
        revealData.push({ el, revealed: false });
    });

    // Split-line mask reveals
    const splitElements = document.querySelectorAll('.split-line-mask-effect, .split-line-up-effect');
    const splitData = [];
    splitElements.forEach(el => {
        if (!el.querySelector('.split-line')) {
            splitTextIntoLines(el);
        }
        splitData.push({ el, revealed: false });
    });

    let previousScrollY = 0;
    let previousVelocity = 0;

    if (scrollInstance) {
        scrollInstance.onScroll((scrollY) => {
            const vh = window.innerHeight;
            const velocity = scrollY - previousScrollY;
            previousScrollY = scrollY;
            previousVelocity += (velocity - previousVelocity) * 0.18;
            updateFeaturedTransforms(previousVelocity);

            // Section reveals
            for (const item of revealData) {
                if (item.revealed) continue;
                const rect = item.el.getBoundingClientRect();
                const elTop = rect.top + scrollY;
                if (scrollY + vh * 0.8 > elTop) {
                    item.revealed = true;
                    gsap.to(item.el, {
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                    });
                }
            }

            // Split-line text reveals
            for (const item of splitData) {
                if (item.revealed) continue;
                const rect = item.el.getBoundingClientRect();
                const elTop = rect.top + scrollY;
                if (scrollY + vh * 0.8 > elTop) {
                    item.revealed = true;
                    const innerSpan = item.el.querySelector('.split-line-inner');
                    const lineWrapper = item.el.querySelector('.split-line');
                    if (lineWrapper) lineWrapper.classList.add('is-visible');
                    if (innerSpan) {
                        gsap.to(innerSpan, {
                            y: 0,
                            duration: 0.8,
                            ease: 'power3.out',
                        });
                    }
                }
            }
        });
    }

    updateFeaturedTransforms(0);

    // Featured card hover
    const featuredItems = document.querySelectorAll('.featured-item');
    featuredItems.forEach(item => {
        const context = item.querySelector('.featured-item-context');
        item.addEventListener('mouseenter', () => {
            if (context) gsap.to(context, { y: -5, duration: 0.3, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
            if (context) gsap.to(context, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    initCursorFollower(gsap);

    // Lazy load featured card images
    const lazyImages = [...document.querySelectorAll('.featured-item-image-inner[data-src]')];
    const lazyData = lazyImages.map(el => ({ el, loaded: false }));

    if (scrollInstance) {
        scrollInstance.onScroll((scrollY) => {
            const vh = window.innerHeight;
            for (const item of lazyData) {
                if (item.loaded) continue;
                const rect = item.el.getBoundingClientRect();
                const elTop = rect.top + scrollY;
                if (scrollY + vh + 200 > elTop) {
                    item.loaded = true;
                    item.el.style.backgroundImage = `url(${item.el.dataset.src})`;
                    gsap.fromTo(item.el, { opacity: 0 }, { opacity: 1, duration: 0.5 });
                }
            }
        });
    }

    // Scrollbar indicator
    const scrollbarIndicator = document.getElementById('main-scrollbar-indicator');
    if (scrollbarIndicator && scrollInstance) {
        scrollInstance.onScroll((scrollY, progress) => {
            const maxTravel = window.innerHeight - 60;
            scrollbarIndicator.style.height = `${Math.max(20, window.innerHeight * 0.1)}px`;
            scrollbarIndicator.style.transform = `translate3d(0, ${progress * maxTravel}px, 0)`;
        });
    }
}
