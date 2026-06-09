function splitTextIntoLines(element) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('split-line-mask-effect');

    const lineWrapper = document.createElement('div');
    lineWrapper.classList.add('split-line');
    const innerSpan = document.createElement('span');
    innerSpan.classList.add('split-line-inner');
    innerSpan.textContent = text;
    lineWrapper.appendChild(innerSpan);
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
    const splitElements = document.querySelectorAll('.split-line-mask-effect');
    const splitData = [];
    splitElements.forEach(el => {
        if (!el.querySelector('.split-line')) {
            splitTextIntoLines(el);
        }
        splitData.push({ el, revealed: false });
    });

    if (scrollInstance) {
        scrollInstance.onScroll((scrollY) => {
            const vh = window.innerHeight;

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
