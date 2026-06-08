export class SmoothScroll {
    constructor(container, scrollContent) {
        this.container = container;
        this.content = scrollContent;
        this.scrollY = 0;
        this.targetY = 0;
        this.maxScroll = 0;
        this.ease = 0.08;
        this.isActive = true;
        this.listeners = [];

        this._onWheel = this._onWheel.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onResize = this._onResize.bind(this);

        this.touchStartY = 0;
        this.touchLastY = 0;
        this.touchVelocity = 0;

        this._bind();
        this._onResize();
    }

    _bind() {
        this.container.addEventListener('wheel', this._onWheel, { passive: false });
        this.container.addEventListener('touchstart', this._onTouchStart, { passive: false });
        this.container.addEventListener('touchmove', this._onTouchMove, { passive: false });
        this.container.addEventListener('touchend', this._onTouchEnd);
        window.addEventListener('resize', this._onResize);
    }

    _onWheel(e) {
        e.preventDefault();
        this.targetY += e.deltaY;
        this.targetY = Math.max(0, Math.min(this.targetY, this.maxScroll));
    }

    _onTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
        this.touchLastY = this.touchStartY;
        this.touchVelocity = 0;
    }

    _onTouchMove(e) {
        e.preventDefault();
        const currentY = e.touches[0].clientY;
        const delta = this.touchLastY - currentY;
        this.touchVelocity = delta;
        this.touchLastY = currentY;
        this.targetY += delta;
        this.targetY = Math.max(0, Math.min(this.targetY, this.maxScroll));
    }

    _onTouchEnd() {
        this.targetY += this.touchVelocity * 10;
        this.targetY = Math.max(0, Math.min(this.targetY, this.maxScroll));
    }

    _onResize() {
        const contentHeight = this.content.scrollHeight || this.content.offsetHeight;
        this.maxScroll = Math.max(0, contentHeight - window.innerHeight);
    }

    onScroll(fn) {
        this.listeners.push(fn);
    }

    getProgress() {
        return this.maxScroll > 0 ? this.scrollY / this.maxScroll : 0;
    }

    update() {
        if (!this.isActive) return;

        const diff = this.targetY - this.scrollY;
        if (Math.abs(diff) < 0.5) {
            this.scrollY = this.targetY;
        } else {
            this.scrollY += diff * this.ease;
        }

        this.content.style.transform = `translate3d(0, ${-this.scrollY}px, 0)`;

        for (const fn of this.listeners) {
            fn(this.scrollY, this.getProgress());
        }
    }

    destroy() {
        this.container.removeEventListener('wheel', this._onWheel);
        this.container.removeEventListener('touchstart', this._onTouchStart);
        this.container.removeEventListener('touchmove', this._onTouchMove);
        this.container.removeEventListener('touchend', this._onTouchEnd);
        window.removeEventListener('resize', this._onResize);
    }
}
