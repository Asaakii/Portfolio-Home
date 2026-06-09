# Anheyu Portfolio Replica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current static portfolio demo into a high-fidelity Anheyu-inspired homepage with stronger first-viewport WebGL, closer typography/assets, featured-card scroll deformation, and polished microinteractions.

**Architecture:** Keep the existing static single-page architecture and ES module split. Add local assets under `assets/`, tune the single stylesheet, replace the WebGL background module with a maintainable Three.js neon scene, and extend the animation module with scroll-driven transforms.

**Tech Stack:** HTML, CSS, vanilla JavaScript ES modules, Three.js r168, GSAP 3, Python static HTTP server, in-app Browser verification.

---

## File Structure

- Create: `assets/images/featured-1.svg` through `assets/images/featured-4.svg`
  - Local project-card imagery substitutes with dark/neon composition so the final site does not rely on gradient placeholders.
- Create: `assets/textures/dark.svg`
  - Reference-like dark texture used by `.darker-bg::before`.
- Modify: `index.html`
  - Remove remote Google font dependency.
  - Point card images to local assets.
  - Add `#snd-btn` and optional preloader canvas shell.
- Modify: `css/index.css`
  - Tune font stacks, hero, header, featured card, contact, preloader, sound button, mobile menu, texture, and fallback styles.
- Modify: `js/webgl-bg.js`
  - Replace soft light-scatter shader with neon streak field plus central luminous point-cloud figure.
- Modify: `js/animations.js`
  - Add text line splitting that respects wrapped lines well enough for this page.
  - Add featured-card scroll deformation and cursor follower behavior.
- Modify: `js/main.js`
  - Add ready-state classes and small preloader canvas lifecycle support.
- Keep: `js/scroll.js`
  - Leave the custom inertia implementation unless browser verification shows it blocks scroll animation timing.

## Verification Commands

Use these commands during implementation:

```bash
python3 -m http.server 8080
```

Expected: server listens on `http://localhost:8080/`. If port 8080 is unavailable, use another available port and update browser checks accordingly.

Browser checks:

- Desktop first viewport: `http://localhost:8080/` at 1440 x 900.
- Default breakpoint: around 1280 x 720.
- Mobile: around 390 x 844.
- Scrolled featured state: scroll until the first featured card is partially visible.

Expected browser results:

- Preloader hides within 6 seconds.
- Console has no severe local-code errors.
- Hero shows dark neon light trails plus a central luminous figure.
- Header and scroll indicators match the reference placement.
- Featured cards use real imagery and overlap text panels.
- Featured cards deform while entering and settle while centered.
- Mobile layout has no incoherent overlap.

---

### Task 1: Add Local Visual Assets

**Files:**
- Create: `assets/images/featured-1.svg`
- Create: `assets/images/featured-2.svg`
- Create: `assets/images/featured-3.svg`
- Create: `assets/images/featured-4.svg`
- Create: `assets/textures/dark.svg`

- [ ] **Step 1: Add featured image assets**

Create four SVG image assets with 16:9 viewBox, dark backgrounds, cyan/pink accents, and distinct compositions. These are local substitutes for reference screenshots.

`assets/images/featured-1.svg` should represent a blog/dashboard screen with blue neon panels.

`assets/images/featured-2.svg` should represent a code/github screen with terminal columns.

`assets/images/featured-3.svg` should represent an image/gallery screen with luminous thumbnails.

`assets/images/featured-4.svg` should represent a personal/home screen with layered cards and a neon title.

- [ ] **Step 2: Add dark texture asset**

Create `assets/textures/dark.svg` as a low-contrast radial texture with transparent edges and subtle noise-like dots. The asset should be usable as `background-image: url("../assets/textures/dark.svg")`.

- [ ] **Step 3: Verify assets exist**

Run:

```bash
rg --files assets
```

Expected output includes:

```text
assets/images/featured-1.svg
assets/images/featured-2.svg
assets/images/featured-3.svg
assets/images/featured-4.svg
assets/textures/dark.svg
```

- [ ] **Step 4: Commit**

Run:

```bash
git add assets/images/featured-1.svg assets/images/featured-2.svg assets/images/featured-3.svg assets/images/featured-4.svg assets/textures/dark.svg
git commit -m "feat: add local replica visual assets"
```

Expected: commit succeeds.

---

### Task 2: Tune Markup And Static CSS Parity

**Files:**
- Modify: `index.html`
- Modify: `css/index.css`

- [ ] **Step 1: Update `index.html` asset references**

Remove the Google Fonts preconnect/link tags. Keep the Three.js import map and GSAP script.

Add this sound button before `#preloader` or near the other fixed controls:

```html
<a id="snd-btn" class="cache" aria-label="sound toggle"></a>
```

Inside `#preloader`, add:

```html
<canvas id="preloader-canvas" aria-hidden="true"></canvas>
```

Change featured card `data-src` values to:

```html
data-src="assets/images/featured-1.svg"
data-src="assets/images/featured-2.svg"
data-src="assets/images/featured-3.svg"
data-src="assets/images/featured-4.svg"
```

- [ ] **Step 2: Update font and base CSS**

At the top of `css/index.css`, replace the Google font-centric font rules with local/reference-like stacks:

```css
.font-header,
h1.hero-title,
#menu {
    font-family: Georgia, "Times New Roman", "Microsoft Yahei", serif;
    font-weight: 400;
}

.font-header-bold {
    font-family: Georgia, "Times New Roman", "Microsoft Yahei", serif;
    font-weight: 700;
}

.font-bold {
    font-family: "Avenir Next", "Helvetica Neue", Arial, "Microsoft Yahei", sans-serif;
    font-weight: 700;
}
```

Set the main `html` font family to:

```css
font-family: "Avenir Next", "Helvetica Neue", Arial, "Microsoft Yahei", sans-serif;
```

- [ ] **Step 3: Update texture and feature card CSS**

Change `.darker-bg::before` to use the local texture:

```css
background-image: url("../assets/textures/dark.svg");
background-size: 100% 100%;
background-repeat: no-repeat;
```

Set `.featured-item-image` to a fixed desktop ratio matching the reference:

```css
height: 612px;
padding-bottom: 0;
```

Keep media query overrides for 1440 and mobile:

```css
@media (max-width: 1440px) {
    .featured-item-image {
        width: 960px;
        height: 540px;
    }
}

@media (max-width: 1280px) {
    .featured-item-image {
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
    }
}
```

- [ ] **Step 4: Update contact and sound button CSS**

Tune contact to match the reference:

```css
#contact {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    height: 100vh;
}

#contact-main {
    display: flex;
    flex-grow: 1;
    width: 100%;
    height: 100%;
}

#contact-title {
    font-size: 3em;
    margin: 0;
    padding: 0;
    text-transform: none;
    text-indent: -0.08em;
}

#contact-desc {
    font-size: 0.75em;
    letter-spacing: 0.05em;
    margin: 1em 0 2em 0;
    color: #eeeeff;
}

.contact-column {
    position: relative;
    float: left;
    margin-left: 0.6em;
    padding-right: 4.4em;
    letter-spacing: 0.04em;
}

.contact-column::before {
    content: "";
    position: absolute;
    left: -0.6em;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #fff;
}

.contact-column-item a {
    color: #fff;
}

#snd-btn {
    display: block;
    position: absolute;
    width: 60px;
    height: 60px;
    right: 60px;
    bottom: 30px;
    margin-right: -25px;
    margin-bottom: -20px;
    cursor: pointer;
    z-index: 2500;
    opacity: 0.85;
}

#snd-btn::before,
#snd-btn::after {
    content: "";
    position: absolute;
    left: 20px;
    top: 28px;
    width: 20px;
    height: 2px;
    background: #fff;
}

#snd-btn::after {
    transform: rotate(90deg);
}
```

- [ ] **Step 5: Browser static check**

Start server:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

Expected:

- Preloader hides.
- Hero is visible.
- Header desktop menu appears at widths above 1280.
- Cards load local SVG imagery when scrolled near featured section.
- Contact section has large title and vertical rule.

- [ ] **Step 6: Commit**

Run:

```bash
git add index.html css/index.css
git commit -m "feat: tune static replica styling"
```

Expected: commit succeeds.

---

### Task 3: Replace Hero WebGL With Neon Scene

**Files:**
- Modify: `js/webgl-bg.js`

- [ ] **Step 1: Replace scene responsibilities**

Rewrite `WebGLBackground` to create:

- `this.streaks`: line meshes or instanced line-like planes moving along z.
- `this.figure`: `THREE.Points` object forming a luminous running silhouette.
- `this.ground`: subtle reflective dark plane or shader-like gradient plane.
- `this.clock`: animation timing.

Keep the public API unchanged:

```js
const webgl = new WebGLBackground(canvas);
webgl.init();
webgl.update();
webgl.destroy();
WebGLBackground.isWebGLAvailable();
```

- [ ] **Step 2: Implement neon streak creation**

Add a method named `_createStreaks()` that returns a `THREE.Group` with many cyan/pink/blue line meshes. Use additive blending and randomized x/y/z placement. Each streak stores speed in `userData.speed`.

Expected behavior:

- Streaks appear to rush from the center toward the viewer.
- Streaks recycle when they pass the camera.
- Palette includes cyan, blue, and pink.

- [ ] **Step 3: Implement particle figure**

Add a method named `_createParticleFigure()` that returns a `THREE.Points` object. Build a point cloud from simple parametric body regions:

- Head circle.
- Torso curve.
- Arms.
- Legs in running pose.

Use `THREE.BufferGeometry` with `position` and `color` attributes. Use `THREE.PointsMaterial` with additive blending and small point size.

Expected behavior:

- The center-right hero area reads as a luminous human-like particle silhouette.
- The figure pulses subtly in `update()`.

- [ ] **Step 4: Implement update loop**

`update()` should:

- Smooth mouse values.
- Move/recycle streaks.
- Slightly rotate or offset the figure based on mouse.
- Pulse figure material opacity/size.
- Render composer when available, otherwise renderer.

- [ ] **Step 5: Keep fallback and cleanup**

`destroy()` should dispose geometries/materials and remove event listeners.

`_onResize()` should update camera, renderer, composer, and pixel ratio.

On mobile or width <= 1280:

- Use lower particle/streak counts.
- Skip expensive bloom if needed.

- [ ] **Step 6: Browser hero check**

Run server and open `http://localhost:8080/` at 1440 x 900.

Expected:

- The first viewport shows visible neon light trails and a luminous central figure.
- The hero title remains readable.
- No local console error from `js/webgl-bg.js`.

- [ ] **Step 7: Commit**

Run:

```bash
git add js/webgl-bg.js
git commit -m "feat: add neon hero webgl scene"
```

Expected: commit succeeds.

---

### Task 4: Add Scroll Deformation And Text Polish

**Files:**
- Modify: `js/animations.js`
- Modify: `css/index.css`

- [ ] **Step 1: Improve split text reveal**

In `js/animations.js`, keep `splitTextIntoLines(element)` but update it so each target gets one `.split-line` wrapper and `.split-line-inner` with `transform: translateY(105%)` as the initial state. Preserve existing text and avoid double-wrapping already split elements.

Expected:

- Featured title and descriptions reveal from below.
- Featured card text is initially hidden behind masks and becomes visible on scroll.

- [ ] **Step 2: Add featured-card scroll transform helper**

Add a helper:

```js
function updateFeaturedTransforms(scrollY) {
    const vh = window.innerHeight;
    const items = document.querySelectorAll('.featured-item');

    items.forEach(item => {
        const image = item.querySelector('.featured-item-image');
        const context = item.querySelector('.featured-item-context');
        if (!image || !context) return;

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
```

Call it from the existing `scrollInstance.onScroll(...)` block and once during init.

- [ ] **Step 3: Add featured container skew**

Track scroll velocity from consecutive scroll positions. Apply subtle skew to `#featured-items-container`:

```js
const skew = Math.max(-4, Math.min(4, velocity * 0.02));
featuredContainer.style.transform = `skewY(${skew}deg) translateZ(0)`;
```

Expected:

- Fast scroll gives the featured list a subtle directional skew.
- The transform decays as scroll settles.

- [ ] **Step 4: Add cursor follower labels**

Attach mouseenter/mouseleave handlers to `.featured-item-link`:

- On enter, show `#cursor-follow` with text `View`.
- On mouse move, update its transform near the pointer.
- On leave, hide it.

Expected:

- Desktop only.
- No cursor follower on mobile.

- [ ] **Step 5: Browser scroll check**

Run server, open page, scroll to featured section.

Expected:

- First featured card image and text panel deform near entry.
- Card settles near center.
- Hover scales image and shows cursor follower.
- Text masks reveal.

- [ ] **Step 6: Commit**

Run:

```bash
git add js/animations.js css/index.css
git commit -m "feat: add replica scroll interactions"
```

Expected: commit succeeds.

---

### Task 5: Preloader, Ready State, And Mobile QA

**Files:**
- Modify: `js/main.js`
- Modify: `css/index.css`
- Modify: `index.html`

- [ ] **Step 1: Add ready-state classes**

In `main.js`, after successful animation setup and progress reaches 100, add:

```js
document.documentElement.classList.add('is-ready', webgl ? 'use-webgl' : 'no-webgl');
```

When WebGL is unavailable or fails, ensure `no-webgl` is added once.

- [ ] **Step 2: Add preloader canvas animation**

If `#preloader-canvas` exists, draw simple pulsing center dots/lines while loading. Stop drawing after `hidePreloader()`.

Expected:

- Preloader feels closer to a canvas intro than a plain line.
- Safety timeout still hides it.

- [ ] **Step 3: Improve mobile CSS**

At `max-width: 420px`:

- Reduce hero title enough to avoid overflow.
- Keep card text readable.
- Hide `#snd-btn` if it crowds the viewport.
- Keep `#main-scrollbar` visible but unobtrusive.

- [ ] **Step 4: Browser QA**

Run server and verify:

- Desktop 1440 x 900 first viewport.
- Default 1280 x 720 viewport.
- Mobile 390 x 844 viewport.
- Featured section scrolled state.

Expected:

- No persistent preloader.
- No broken layout.
- No severe local console errors.
- First viewport and featured cards are visibly much closer to reference.

- [ ] **Step 5: Commit**

Run:

```bash
git add index.html css/index.css js/main.js
git commit -m "feat: polish replica loading and mobile states"
```

Expected: commit succeeds.

---

### Task 6: Final Verification And Handoff

**Files:**
- No planned file edits unless QA finds issues.

- [ ] **Step 1: Run final git status**

Run:

```bash
git status --short
```

Expected: only known user-owned untracked files remain, or a clean worktree.

- [ ] **Step 2: Run final browser verification**

Start server:

```bash
python3 -m http.server 8080
```

Verify:

- Desktop screenshot at 1440 x 900.
- Mobile screenshot at 390 x 844.
- Featured scrolled screenshot.
- Console logs for severe local-code errors.

- [ ] **Step 3: Stop the local server**

Stop the server process after verification unless the user wants to keep it open.

- [ ] **Step 4: Final response**

Report:

- Files changed.
- Verification evidence.
- Local preview URL if the server remains running.
- Any known limitations, especially if exact reference assets or exact particle figure matching could not be achieved.

