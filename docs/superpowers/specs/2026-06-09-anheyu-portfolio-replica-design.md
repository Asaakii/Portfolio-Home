# Anheyu Portfolio Replica Design

Date: 2026-06-09

## Goal

Rework the current `portfolio-home` demo into a high-fidelity personal portfolio homepage inspired by `https://index.anheyu.com/`. The target is visual closeness rather than a loose redesign: the first viewport, typography, WebGL mood, featured-card section, scroll behavior, and small interface details should read as the same kind of site.

The implementation should keep the current lightweight static HTML/CSS/JavaScript structure unless a specific effect requires a new module. Avoid importing the original site's minified application bundle wholesale; rebuild the visible behavior in maintainable local code.

## Current State

The project is a static single-page site:

- `index.html` defines the header, hero, message/quote sections, featured cards, contact section, scrollbar, scroll prompt, and cursor follower.
- `css/index.css` already mirrors many structural styles from the reference site.
- `js/main.js` wires preloading, custom smooth scroll, WebGL background, animation setup, and mobile menu toggling.
- `js/webgl-bg.js` currently renders a soft blue mouse-following light-scatter background.
- `js/animations.js` implements hero title reveal, section fades, basic split-line reveal, lazy card images, card hover, and scrollbar movement.
- `js/scroll.js` implements custom scroll inertia.

The current demo is close in layout but visibly weaker because it lacks the reference site's original fonts, real image assets, dark texture, high-energy WebGL scene, preloader canvas feel, music button, and scroll-driven card deformation.

## Reference Signals To Match

The reference site's important visible traits are:

- Dark full-screen stage with strong neon blue/pink light trails.
- A central glowing particle/human silhouette in the hero background.
- Large serif hero title over the animated scene.
- Small uppercase header text at top left and right.
- Thin right-side scroll indicator and rotated left-bottom scroll prompt.
- Local serif/sans fonts similar to `GT-Sectra-Fine` and `nb_akademie`.
- Featured cards with large rounded screenshots and black text panels overlapping the image.
- During scroll, featured images start vertically stretched and text panels horizontally stretched, then settle into normal proportions.
- Subtle text mask reveals rather than plain opacity-only fades.
- Contact area with larger title, white links, and a left vertical rule.
- Optional details: preloader canvas, sound button, cursor follower text, mobile menu state polish.

## Scope

### In Scope

- Add local or bundled visual assets needed to approximate the reference:
  - Portfolio card imagery.
  - Dark background texture or CSS-generated replacement.
  - Font-face setup using available downloadable font assets if accessible, with strong fallbacks.
- Tune global typography, spacing, breakpoints, and section styles to match the reference more closely.
- Replace the current WebGL background with a high-impact neon tunnel/particle hero scene.
- Add a central particle figure approximation using Three.js primitives or shader/point-cloud techniques.
- Implement scroll-driven transforms for the featured card section.
- Improve split text reveal behavior.
- Restore/reference the small details that contribute to fidelity: sound button shell, preloader treatment, contact styling, menu state, and cursor follower.
- Verify in browser at desktop and mobile sizes with screenshots.

### Out Of Scope

- Copying the reference site's minified `js/index.js` wholesale.
- Using the reference owner's exact identity, links, or personal branding in final content unless the current demo already intentionally uses matching placeholder text.
- Building a multi-page route system.
- Adding a framework or bundler unless the static ES module setup cannot support the required effect.
- Reproducing server-side restrictions, analytics, or unrelated project pages from the reference site.

## Recommended Approach

Use a high-fidelity rebuild:

1. Preserve the current static architecture.
2. Add missing assets and font definitions.
3. Re-tune CSS to match the reference's type scale, section proportions, contact styles, and card dimensions.
4. Replace the hero WebGL effect with a custom Three.js scene inspired by the reference:
   - Forward-moving neon streaks.
   - Blue/pink palette.
   - Bloom-like glow where supported.
   - Central particle figure or luminous silhouette.
   - Graceful reduced fallback for weaker devices.
5. Add scroll-progress-driven transforms for featured cards and section reveals.
6. Test desktop and mobile renderings in the browser.

This gives the closest visible result while keeping the code understandable.

## Architecture

### HTML

Keep `index.html` as the main document. Add only the elements needed for visible parity:

- Optional `#snd-btn`.
- Optional `#preloader-canvas` inside `#preloader` if the preloader is upgraded.
- More reference-like IDs where helpful for animation targeting, without breaking existing selectors.

### CSS

`css/index.css` remains the single stylesheet.

Key changes:

- Replace Google-font reliance with `@font-face` declarations and fallbacks.
- Align `.font-header`, `.font-header-bold`, `.font-bold`, body font, featured card styles, contact styles, and breakpoint behavior with the reference CSS.
- Use a texture asset or CSS pseudo-element for `.darker-bg::before`.
- Make mobile card overlay behavior match the reference more closely.

### JavaScript Modules

Keep the current module split:

- `js/main.js`: orchestration, preloader lifecycle, menu wiring, render loop.
- `js/webgl-bg.js`: replace current light-scatter scene with neon streaks and particle figure.
- `js/animations.js`: add scroll-progress based transforms and improved text masking.
- `js/scroll.js`: keep inertia model unless verification shows it prevents accurate animation timing.

If the WebGL scene becomes large, add a helper module such as `js/particle-figure.js`; otherwise keep it inside `webgl-bg.js`.

## Visual Implementation Details

### Hero WebGL

The hero should no longer be a static-feeling blue glow. It should render:

- A dark road/tunnel-like field.
- Many elongated light streaks moving toward or away from the viewer.
- Pink and cyan color accents.
- Bloom or additive blending for glow.
- A central point-cloud silhouette that reads like a running human or luminous figure.

The figure can be an approximation, not a perfect anatomical model. The pass condition is that the first viewport has the same "neon speed tunnel plus glowing figure" impression as the reference screenshot.

### Featured Cards

Cards should start visually distorted when approaching the viewport:

- Image panel: `translateY(10vh) scaleY(1.6)` near entry.
- Text panel: `translateX(20px) scaleX(1.6)` near entry.
- Container: subtle skew tied to scroll velocity.
- Settled state: normal scale and stable overlap.

Transforms should be driven by the custom scroll position, not only by hover.

### Text Reveals

Text should reveal through masking:

- Section headings and descriptions split into line wrappers.
- Inner spans animate from below into place.
- Featured text should become visible through a mask, not by opacity alone.

### Mobile

The reference redirects mobile visitors to the blog, but this portfolio should remain usable. Mobile should instead:

- Use the compact fixed header and menu button.
- Stack featured card text below or over the image in the reference-like mobile style.
- Disable or reduce heavy WebGL effects if needed.
- Preserve the dark/neon mood.

## Data And Assets

Use local files for all production-critical visual assets so the portfolio works without depending on remote CDNs.

Preferred asset paths:

- `assets/fonts/`
- `assets/images/`
- `assets/textures/`

If exact reference assets are inaccessible or unsuitable to reuse, create close local substitutes. Placeholder gradients are not acceptable for the final high-fidelity pass.

## Error Handling And Fallbacks

- If WebGL fails, show a CSS fallback with a dark blue/pink radial and streak-like background.
- If font files fail, fall back to `Georgia` for headers and a clean system sans stack for body text.
- If image assets fail, show a dark neutral placeholder with the card title still readable.
- Preloader must always hide after a safety timeout.
- Mobile and reduced-performance paths should avoid expensive bloom/particle counts.

## Testing And Verification

Verify with browser screenshots:

- Desktop: 1440 x 900 first viewport.
- Default/browser breakpoint around 1280 width.
- Mobile: approximately 390 x 844.
- At least one scrolled state near the featured cards.

Checks:

- The page leaves preloader and shows hero content.
- No severe console errors from local code.
- Hero has visible neon streaks and central luminous figure on desktop.
- Header, scroll indicator, title, and left-bottom prompt match reference placement.
- Featured cards show real imagery and reference-like overlap.
- Scroll transforms work and settle cleanly.
- Mobile has no incoherent overlapping text.

## Implementation Phases

### Phase 1: Static Visual Parity

- Add local assets and fonts.
- Update `index.html` references if needed.
- Tune CSS for typography, card dimensions, contact section, and background texture.
- Verify first viewport and card section without major WebGL changes.

### Phase 2: Hero WebGL

- Replace the current light-scatter shader with the neon tunnel/particle-figure scene.
- Add performance fallbacks.
- Verify desktop and mobile rendering.

### Phase 3: Scroll And Microinteractions

- Add featured-card scroll deformation.
- Improve split text masks.
- Add sound button shell, preloader polish, and cursor follower behavior.
- Verify scrolled states.

### Phase 4: Final QA

- Run full visual checks.
- Fix overlap, spacing, loading, and console issues.
- Leave the local dev server URL available for review.

## Acceptance Criteria

The first implementation pass is complete when:

- The first viewport visually resembles the reference: dark neon light trails, central luminous figure, large serif title, matching header and scroll UI.
- The featured card section uses real imagery and scroll-driven deformation.
- Fonts and contact/card typography are noticeably closer to the reference than the current demo.
- The site works as a static local page through a simple HTTP server.
- Desktop and mobile screenshots show no broken layout or persistent preloader.

