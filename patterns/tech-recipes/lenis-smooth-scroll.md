---
name: lenis-smooth-scroll
category: tech-recipes
tags: [lenis, smooth-scroll, scrolltrigger, gsap, inertia, scroll-hijack]
description: >
  Lenis smooth scroll setup with requestAnimationFrame loop, GSAP ScrollTrigger
  integration, configuration options, modal stop/start handling, and complete
  working example combining smooth scroll with scroll-triggered animations.
---

## Overview

Lenis is a lightweight smooth scroll library that intercepts native browser scroll and applies momentum/easing. It produces the buttery inertial scrolling seen on modern interactive websites.

**What it does:**
- Overrides native scroll with a smoothed, eased version
- Supports wheel, touch, keyboard, and programmatic scrolling
- Provides a real-time scroll position that can feed other libraries

**When to use:** Portfolio sites, creative agencies, product launches, any page where scroll feel matters. Avoid on content-heavy apps (docs, dashboards) where native scroll is expected.

**Key integration:** Lenis must sync with GSAP ScrollTrigger for pinned sections and scrub animations to work. Without the sync, ScrollTrigger reads native scroll position while Lenis controls a different one.

---

## Setup

### CDN Link

```html
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
```

### Required CSS

Without this, Lenis cannot calculate page height correctly:

```css
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto; /* prevent conflict with CSS smooth-scroll */
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain; /* isolate nested scrollable elements */
}

.lenis.lenis-stopped {
  overflow: hidden; /* freeze scroll when stopped */
}
```

### Basic Initialization

```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### Integration with GSAP ScrollTrigger

This is the critical connection. Without it, ScrollTrigger and Lenis are out of sync.

```js
// Feed Lenis scroll events into ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Use GSAP's ticker instead of a manual rAF loop (more efficient)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable GSAP's built-in lag smoothing (conflicts with Lenis)
gsap.ticker.lagSmoothing(0);
```

---

## Complete Working Example

Smooth scroll page with GSAP ScrollTrigger animations, nested scrollable area, and modal with scroll lock.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lenis Smooth Scroll</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --surface: #161616;
    --text: #f0f0f0;
    --muted: #888;
    --accent: #6366f1;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  /* Required Lenis CSS */
  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto; }
  .lenis.lenis-stopped { overflow: hidden; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  section {
    padding: 120px 10vw;
    min-height: 100vh;
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    margin-bottom: 24px;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--muted);
    max-width: 500px;
    line-height: 1.6;
  }

  /* Reveal elements */
  .reveal {
    opacity: 0;
    transform: translateY(80px);
  }

  /* Feature grid */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 48px;
  }

  .feature-card {
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 32px;
    opacity: 0;
    transform: translateY(40px);
  }

  .feature-card h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
  }

  .feature-card p {
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* Scroll progress bar */
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--accent);
    width: 0%;
    z-index: 100;
    transition: none;
  }

  /* Nested scrollable (Lenis ignores this) */
  .nested-scroll {
    max-height: 200px;
    overflow-y: auto;
    background: var(--surface);
    border-radius: 12px;
    padding: 24px;
    margin-top: 24px;
    border: 1px solid rgba(255,255,255,0.05);
    overscroll-behavior: contain;
  }

  .nested-scroll p {
    color: var(--muted);
    margin-bottom: 16px;
    line-height: 1.6;
  }

  /* Modal overlay */
  .modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(10px);
    z-index: 200;
    align-items: center;
    justify-content: center;
  }

  .modal-overlay.active { display: flex; }

  .modal-box {
    background: var(--surface);
    border-radius: 20px;
    padding: 48px;
    max-width: 500px;
    text-align: center;
  }

  .modal-box h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  .modal-box p {
    color: var(--muted);
    margin-bottom: 24px;
  }

  .btn {
    display: inline-block;
    padding: 12px 28px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    background: var(--accent);
    color: #fff;
    margin: 8px;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
  }

  /* Parallax image */
  .parallax-section {
    position: relative;
    overflow: hidden;
    min-height: 60vh;
    display: flex;
    align-items: center;
  }

  .parallax-bg {
    position: absolute;
    inset: -20%;
    background: linear-gradient(135deg, #6366f1 0%, #22d3ee 50%, #8b5cf6 100%);
    z-index: 0;
    border-radius: 24px;
  }

  .parallax-content {
    position: relative;
    z-index: 1;
    padding: 80px 10vw;
  }
</style>
</head>
<body>

<div class="scroll-progress" id="scrollProgress"></div>

<!-- Hero -->
<section>
  <div class="section-label">Lenis Smooth Scroll</div>
  <h1 class="reveal">Silky smooth<br>scrolling</h1>
  <p class="subtitle reveal">Momentum-based scroll with easing, synced with GSAP ScrollTrigger for scroll-driven animations.</p>
  <br>
  <button class="btn" onclick="openModal()">Open Modal (stops scroll)</button>
</section>

<!-- Features with stagger -->
<section>
  <div class="section-label">Features</div>
  <h2 class="reveal">Built for motion</h2>
  <div class="features">
    <div class="feature-card">
      <h3>Momentum</h3>
      <p>Inertial deceleration gives scroll a physical, weighted feel.</p>
    </div>
    <div class="feature-card">
      <h3>Easing</h3>
      <p>Configurable easing function controls the deceleration curve.</p>
    </div>
    <div class="feature-card">
      <h3>Touch</h3>
      <p>Native touch support with configurable multiplier for swipe speed.</p>
    </div>
    <div class="feature-card">
      <h3>Keyboard</h3>
      <p>Space, Page Up/Down, Home/End all work with smooth interpolation.</p>
    </div>
    <div class="feature-card">
      <h3>Anchors</h3>
      <p>Hash links scroll smoothly to target with <code>lenis.scrollTo('#id')</code>.</p>
    </div>
    <div class="feature-card">
      <h3>Nested</h3>
      <p>Use <code>data-lenis-prevent</code> on scrollable children to isolate them.</p>
    </div>
  </div>
</section>

<!-- Parallax -->
<section class="parallax-section">
  <div class="parallax-bg" id="parallaxBg"></div>
  <div class="parallax-content">
    <h2>Parallax Section</h2>
    <p class="subtitle" style="color: rgba(255,255,255,0.8);">This gradient background moves at a different rate than the content, driven by ScrollTrigger scrub.</p>
  </div>
</section>

<!-- Nested scrollable -->
<section>
  <div class="section-label">Nested Scroll</div>
  <h2 class="reveal">Nested Scrollable Area</h2>
  <p class="subtitle reveal">The box below scrolls independently. Add <code>data-lenis-prevent</code> to isolate it from Lenis.</p>
  <div class="nested-scroll" data-lenis-prevent>
    <p>This is a nested scrollable container. Lenis does not intercept scroll events inside elements with the data-lenis-prevent attribute.</p>
    <p>Scrolling here only moves this box, not the page. This is essential for dropdowns, code blocks, chat windows, and other scrollable sub-regions.</p>
    <p>The overscroll-behavior: contain CSS prevents scroll chaining — when you hit the top or bottom of this box, the page does not start scrolling.</p>
    <p>Additional content to demonstrate the independent scroll behavior within this contained region.</p>
    <p>More content here to ensure the container is scrollable and the effect is visible.</p>
  </div>
</section>

<section>
  <h2 class="reveal">End</h2>
  <p class="subtitle reveal">Smooth scroll with synchronized ScrollTrigger animations.</p>
</section>

<!-- Modal -->
<div class="modal-overlay" id="modal">
  <div class="modal-box">
    <h3>Scroll is stopped</h3>
    <p>Lenis.stop() freezes page scroll while the modal is open. Close to resume.</p>
    <button class="btn" onclick="closeModal()">Close</button>
  </div>
</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  // ── LENIS INIT ──
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  // ── SYNC WITH SCROLLTRIGGER ──
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── SCROLL PROGRESS BAR ──
  lenis.on('scroll', ({ progress }) => {
    document.getElementById('scrollProgress').style.width = (progress * 100) + '%';
  });

  // ── REVEAL ANIMATIONS ──
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  // ── FEATURE CARDS BATCH STAGGER ──
  ScrollTrigger.batch('.feature-card', {
    onEnter: (batch) => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        overwrite: true,
      });
    },
    start: 'top 90%',
    once: true,
  });

  // ── PARALLAX ──
  gsap.to('#parallaxBg', {
    y: '15%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });

  // ── MODAL: STOP / START SCROLL ──
  function openModal() {
    lenis.stop();
    document.getElementById('modal').classList.add('active');
  }

  function closeModal() {
    lenis.start();
    document.getElementById('modal').classList.remove('active');
  }

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modal').classList.contains('active')) {
      closeModal();
    }
  });
</script>

</body>
</html>
```

---

## Integration Notes

### With GSAP ScrollTrigger (required for most sites)

The three-line sync is mandatory:

```js
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

Without line 1, ScrollTrigger reads native scroll position (always 0 with Lenis). Without line 2, Lenis runs on its own rAF which desynchronizes from GSAP's frame timing. Without line 3, GSAP's lag compensation fights Lenis's easing.

### With Barba.js page transitions

Destroy and recreate Lenis on each page transition:

```js
let lenis;

function initLenis() {
  lenis = new Lenis({ duration: 1.2 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
}

barba.hooks.leave(() => {
  lenis.destroy();
  ScrollTrigger.getAll().forEach(t => t.kill());
});

barba.hooks.after(() => {
  initLenis();
  // Re-init scroll animations
});
```

### Nested scrollable areas

Add `data-lenis-prevent` to any element that should scroll independently:

```html
<div class="dropdown-menu" data-lenis-prevent>
  <!-- scrolls normally, Lenis ignores this -->
</div>
```

Add `overscroll-behavior: contain` to prevent scroll chaining (page scrolling when nested area reaches its limit).

### Programmatic scroll

```js
// Scroll to element
lenis.scrollTo('#section-2');

// Scroll to position
lenis.scrollTo(500); // px from top

// Scroll to element with options
lenis.scrollTo('#target', {
  offset: -100,      // 100px above the target
  duration: 2,       // override default duration
  immediate: false,   // true = jump without animation
});
```

---

## Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| `duration` | `1.2` | Scroll animation duration in seconds. Lower = snappier, higher = more inertia |
| `easing` | easeOutExpo | Function `(t) => number` controlling deceleration curve |
| `orientation` | `'vertical'` | `'vertical'` or `'horizontal'` |
| `gestureOrientation` | `'vertical'` | Which axis touch gestures map to |
| `smoothWheel` | `true` | Enable smooth scroll for mouse wheel |
| `touchMultiplier` | `2` | Touch swipe speed multiplier |
| `infinite` | `false` | Enable infinite scroll (wraps around) |
| `autoResize` | `true` | Auto-recalculate on window resize |
| `prevent` | `undefined` | Function `(node) => boolean` to prevent Lenis on specific elements |
| `wrapper` | `window` | Scroll container element (for non-window scroll) |
| `content` | `document.documentElement` | Content element that gets translated |

### Common easing functions

```js
// Expo out (default, most sites use this)
(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

// Cubic out (lighter feel)
(t) => 1 - Math.pow(1 - t, 3)

// Quart out (heavier feel)
(t) => 1 - Math.pow(1 - t, 4)

// Linear (no easing, just smoothing)
(t) => t
```

---

## Dependencies

| Library | URL |
|---------|-----|
| Lenis 1.1.18 | `https://unpkg.com/lenis@1.1.18/dist/lenis.min.js` |
| GSAP (for sync) | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger (for sync) | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
