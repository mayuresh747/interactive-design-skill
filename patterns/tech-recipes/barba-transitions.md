---
name: barba-transitions
category: tech-recipes
tags: [barba, page-transitions, spa, gsap, pjax, route-animation, crossfade, slide, wipe]
description: >
  Barba.js page transition setup with 3 GSAP-powered transitions: crossfade,
  slide, and overlay wipe. Handles scroll reset, ScrollTrigger cleanup, and
  Lenis re-initialization after page change.
---

## Overview

Barba.js intercepts link clicks, fetches the next page via AJAX, and swaps the content with a transition animation. The result looks like a single-page app but uses standard multi-page HTML.

**How it works:**
1. User clicks a link
2. Barba prevents default navigation
3. Fetches the target HTML in the background
4. Runs a "leave" animation on the current page
5. Swaps the container with new content
6. Runs an "enter" animation on the new page

**When to use:** Multi-page sites where you want seamless transitions between pages (portfolios, agency sites, campaign microsites). Not needed for SPAs (React/Next already handle routing).

**Key requirement:** Every page must share the same Barba wrapper structure and load the same JS bundle. Barba only swaps the container, not the wrapper or scripts.

---

## Setup

### CDN Links

```html
<script src="https://unpkg.com/@barba/core"></script>
```

### Required HTML Structure

Every page must follow this structure:

```html
<body>
  <!-- Shared elements (nav, footer) live OUTSIDE the container -->
  <nav>...</nav>

  <div data-barba="wrapper">
    <div data-barba="container" data-barba-namespace="home">
      <!-- Page content that gets swapped -->
    </div>
  </div>

  <footer>...</footer>
</body>
```

- `data-barba="wrapper"` — outer shell, never replaced
- `data-barba="container"` — replaced on every page change
- `data-barba-namespace` — identifies the page (used for route-specific transitions)

### Minimal Initialization

```js
barba.init({
  transitions: [{
    name: 'default',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.5
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: 0.5
      });
    }
  }]
});
```

---

## Complete Working Example

Single-file demo simulating two pages with three transition types. In production, each page would be a separate HTML file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Barba.js Transitions</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
<script src="https://unpkg.com/@barba/core"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --surface: #161616;
    --text: #f0f0f0;
    --muted: #888;
    --accent: #6366f1;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html.lenis, html.lenis body { height: auto; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow-x: hidden;
  }

  /* Navigation */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 5vw;
    backdrop-filter: blur(20px);
    background: rgba(10, 10, 10, 0.6);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  nav .logo {
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
  }

  nav .links {
    display: flex;
    gap: 24px;
    list-style: none;
  }

  nav .links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }

  nav .links a:hover, nav .links a.active { color: var(--text); }

  /* Transition overlay panel (for wipe transition) */
  .transition-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: var(--accent);
    transform: translateY(100%);
    pointer-events: none;
  }

  /* Page content */
  .page-content {
    min-height: 100vh;
    padding: 140px 10vw 80px;
  }

  h1 {
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    margin-bottom: 24px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--muted);
    max-width: 500px;
    line-height: 1.6;
    margin-bottom: 48px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 48px;
  }

  .card {
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 32px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }

  .card h3 { font-size: 1.25rem; margin-bottom: 8px; }
  .card p { color: var(--muted); font-size: 0.9rem; line-height: 1.5; }

  /* Transition selector */
  .transition-select {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    gap: 8px;
    background: rgba(22,22,22,0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 8px;
  }

  .transition-select button {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-size: 0.8rem;
    cursor: pointer;
    font-weight: 500;
  }

  .transition-select button.active {
    background: var(--accent);
    color: #fff;
  }

  .spacer { height: 60vh; }
  .reveal { opacity: 0; transform: translateY(40px); }
</style>
</head>
<body>

<nav>
  <div class="logo">Barba Demo</div>
  <ul class="links">
    <li><a href="#home" class="active barba-link" data-page="home">Home</a></li>
    <li><a href="#work" class="barba-link" data-page="work">Work</a></li>
    <li><a href="#about" class="barba-link" data-page="about">About</a></li>
  </ul>
</nav>

<!-- Overlay for wipe transition -->
<div class="transition-overlay" id="transitionOverlay"></div>

<!-- Transition type selector -->
<div class="transition-select">
  <button class="active" onclick="setTransition('crossfade', this)">Crossfade</button>
  <button onclick="setTransition('slide', this)">Slide</button>
  <button onclick="setTransition('wipe', this)">Overlay Wipe</button>
</div>

<div data-barba="wrapper">
  <div data-barba="container" data-barba-namespace="home" id="barba-container">
    <div class="page-content" id="page-home">
      <h1 class="reveal">Page Transitions</h1>
      <p class="subtitle reveal">Click the nav links above to see Barba.js transitions in action. Switch transition type with the bottom bar.</p>
      <div class="card-grid">
        <div class="card reveal">
          <h3>Crossfade</h3>
          <p>Old page fades out, new page fades in. Clean and universal.</p>
        </div>
        <div class="card reveal">
          <h3>Slide</h3>
          <p>Old page slides left, new page enters from the right. Directional movement.</p>
        </div>
        <div class="card reveal">
          <h3>Overlay Wipe</h3>
          <p>Colored panel slides up covering the old page, then reveals the new content.</p>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  // ── STATE ──
  let currentTransition = 'crossfade';
  let lenis;

  // ── TRANSITION TYPE SELECTOR ──
  function setTransition(type, btn) {
    currentTransition = type;
    document.querySelectorAll('.transition-select button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // ── PAGE TEMPLATES ──
  const pages = {
    home: `
      <div class="page-content">
        <h1 class="reveal">Page Transitions</h1>
        <p class="subtitle reveal">Click the nav links above to see Barba.js transitions in action. Switch transition type with the bottom bar.</p>
        <div class="card-grid">
          <div class="card reveal"><h3>Crossfade</h3><p>Old page fades out, new page fades in. Clean and universal.</p></div>
          <div class="card reveal"><h3>Slide</h3><p>Old page slides left, new page enters from the right. Directional movement.</p></div>
          <div class="card reveal"><h3>Overlay Wipe</h3><p>Colored panel slides up covering the old page, then reveals the new content.</p></div>
        </div>
        <div class="spacer"></div>
      </div>`,
    work: `
      <div class="page-content">
        <h1 class="reveal">Selected Work</h1>
        <p class="subtitle reveal">Projects spanning brand, product, and experience design.</p>
        <div class="card-grid">
          <div class="card reveal"><h3>Project Alpha</h3><p>End-to-end product design for a fintech startup.</p></div>
          <div class="card reveal"><h3>Project Beta</h3><p>Brand identity and marketing site for a climate-tech company.</p></div>
          <div class="card reveal"><h3>Project Gamma</h3><p>Interactive data visualization dashboard.</p></div>
          <div class="card reveal"><h3>Project Delta</h3><p>E-commerce redesign increasing conversion by 40%.</p></div>
        </div>
        <div class="spacer"></div>
      </div>`,
    about: `
      <div class="page-content">
        <h1 class="reveal">About</h1>
        <p class="subtitle reveal">A design studio focused on digital products and brand experiences.</p>
        <div class="card-grid">
          <div class="card reveal"><h3>Philosophy</h3><p>Design should communicate, not decorate. Every element serves a purpose.</p></div>
          <div class="card reveal"><h3>Process</h3><p>Research, prototype, test, iterate. We validate before we build.</p></div>
        </div>
        <div class="spacer"></div>
      </div>`
  };

  // ── LENIS SETUP ──
  function initLenis() {
    if (lenis) lenis.destroy();
    lenis = new Lenis({ duration: 1.2 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);
  }

  function lenisRaf(time) {
    if (lenis) lenis.raf(time * 1000);
  }

  function destroyLenis() {
    if (lenis) {
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
      lenis = null;
    }
  }

  // ── SCROLL ANIMATIONS ──
  function initPageAnimations() {
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.set(el, { y: 40, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }

  function cleanupAnimations() {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  // ── TRANSITIONS ──
  const overlay = document.getElementById('transitionOverlay');

  // Crossfade: opacity out, swap, opacity in
  function crossfadeLeave(container) {
    return gsap.to(container, { opacity: 0, duration: 0.4, ease: 'power2.in' });
  }

  function crossfadeEnter(container) {
    gsap.set(container, { opacity: 0 });
    return gsap.to(container, { opacity: 1, duration: 0.4, ease: 'power2.out' });
  }

  // Slide: old slides left, new enters from right
  function slideLeave(container) {
    return gsap.to(container, {
      x: '-100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });
  }

  function slideEnter(container) {
    gsap.set(container, { x: '100%', opacity: 0 });
    return gsap.to(container, {
      x: '0%',
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
    });
  }

  // Overlay wipe: panel slides up, swap behind it, panel slides down
  function wipeLeave() {
    return gsap.to(overlay, {
      y: '0%',
      duration: 0.5,
      ease: 'power3.in',
    });
  }

  function wipeEnter() {
    return gsap.to(overlay, {
      y: '-100%',
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.1,
    });
  }

  function resetOverlay() {
    gsap.set(overlay, { y: '100%' });
  }

  // ── SIMULATED PAGE NAVIGATION ──
  // In production, Barba fetches real HTML pages via AJAX.
  // This demo simulates it with in-page content swapping.
  document.querySelectorAll('.barba-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = link.dataset.page;

      // Update active nav
      document.querySelectorAll('.barba-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const container = document.getElementById('barba-container');

      // Cleanup
      cleanupAnimations();
      destroyLenis();

      // Leave transition
      if (currentTransition === 'crossfade') {
        await crossfadeLeave(container);
      } else if (currentTransition === 'slide') {
        await slideLeave(container);
      } else if (currentTransition === 'wipe') {
        await wipeLeave();
      }

      // Swap content
      container.innerHTML = pages[page];
      container.dataset.barbaNamespace = page;

      // Reset scroll
      window.scrollTo(0, 0);

      // Enter transition
      if (currentTransition === 'crossfade') {
        await crossfadeEnter(container);
      } else if (currentTransition === 'slide') {
        await slideEnter(container);
      } else if (currentTransition === 'wipe') {
        gsap.set(container, { opacity: 1, x: '0%' });
        await wipeEnter();
        resetOverlay();
      }

      // Re-init
      initLenis();
      initPageAnimations();
    });
  });

  // ── PRODUCTION BARBA.INIT (commented out — use this with real multi-page sites) ──
  /*
  barba.init({
    transitions: [
      // Crossfade (default)
      {
        name: 'crossfade',
        leave(data) {
          cleanupAnimations();
          destroyLenis();
          return gsap.to(data.current.container, { opacity: 0, duration: 0.4, ease: 'power2.in' });
        },
        enter(data) {
          gsap.set(data.next.container, { opacity: 0 });
          return gsap.to(data.next.container, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        },
        after() {
          window.scrollTo(0, 0);
          initLenis();
          initPageAnimations();
        }
      },

      // Slide (from: home, to: work)
      {
        name: 'slide',
        from: { namespace: ['home'] },
        to: { namespace: ['work'] },
        leave(data) {
          cleanupAnimations();
          destroyLenis();
          return gsap.to(data.current.container, { x: '-100%', opacity: 0, duration: 0.5, ease: 'power3.in' });
        },
        enter(data) {
          gsap.set(data.next.container, { x: '100%', opacity: 0 });
          return gsap.to(data.next.container, { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' });
        },
        after() {
          window.scrollTo(0, 0);
          initLenis();
          initPageAnimations();
        }
      },

      // Overlay wipe (to: about)
      {
        name: 'wipe',
        to: { namespace: ['about'] },
        leave(data) {
          cleanupAnimations();
          destroyLenis();
          return gsap.to(overlay, { y: '0%', duration: 0.5, ease: 'power3.in' });
        },
        enter(data) {
          return gsap.to(overlay, { y: '-100%', duration: 0.5, ease: 'power3.out', delay: 0.1 });
        },
        after() {
          resetOverlay();
          window.scrollTo(0, 0);
          initLenis();
          initPageAnimations();
        }
      }
    ]
  });
  */

  // ── INIT ──
  initLenis();
  initPageAnimations();
</script>

</body>
</html>
```

---

## Transition Examples (Production Code)

### 1. Crossfade

The simplest transition. Old page fades out, new page fades in.

```js
{
  name: 'crossfade',
  leave(data) {
    return gsap.to(data.current.container, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    });
  },
  enter(data) {
    gsap.set(data.next.container, { opacity: 0 });
    return gsap.to(data.next.container, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  }
}
```

### 2. Slide

Directional movement. Old content slides left, new content enters from right.

```js
{
  name: 'slide',
  leave(data) {
    return gsap.to(data.current.container, {
      x: '-100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in'
    });
  },
  enter(data) {
    gsap.set(data.next.container, { x: '100%', opacity: 0 });
    return gsap.to(data.next.container, {
      x: '0%',
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
  }
}
```

### 3. Overlay Wipe

A colored panel slides in covering the old page, then the content swaps behind it, and the panel slides out revealing the new page.

```html
<!-- Add this outside the Barba wrapper -->
<div class="transition-overlay" style="
  position: fixed; inset: 0; z-index: 50;
  background: #6366f1; transform: translateY(100%);
  pointer-events: none;
"></div>
```

```js
{
  name: 'wipe',
  leave(data) {
    return gsap.to('.transition-overlay', {
      y: '0%',
      duration: 0.5,
      ease: 'power3.in'
    });
  },
  enter(data) {
    return gsap.to('.transition-overlay', {
      y: '-100%',
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.1
    });
  },
  after() {
    gsap.set('.transition-overlay', { y: '100%' }); // reset for next transition
  }
}
```

---

## Integration Notes

### Scroll position reset

Always reset scroll on page change:

```js
barba.hooks.after(() => {
  window.scrollTo(0, 0);
});
```

Or inside each transition's `after()` callback.

### Re-initializing ScrollTrigger

ScrollTrigger instances from the old page must be killed, and new ones created:

```js
barba.hooks.leave(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});

barba.hooks.after(() => {
  ScrollTrigger.refresh();
  initPageAnimations(); // your function that creates ScrollTriggers
});
```

### Re-initializing Lenis

Lenis must be destroyed and recreated on page transition:

```js
barba.hooks.leave(() => {
  lenis.destroy();
});

barba.hooks.after(() => {
  lenis = new Lenis({ duration: 1.2 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
});
```

### Route-specific transitions

Use `from` and `to` with namespace matching:

```js
{
  name: 'home-to-work',
  from: { namespace: ['home'] },
  to: { namespace: ['work'] },
  leave(data) { ... },
  enter(data) { ... }
}
```

Barba picks the most specific matching transition. A transition with both `from` and `to` takes priority over one with only `to`, which takes priority over the default.

### Analytics

Fire page view events in the `after` hook:

```js
barba.hooks.after((data) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_ID', { page_path: data.next.url.path });
  }
});
```

---

## Configuration

| Parameter | Location | Default | Description |
|-----------|----------|---------|-------------|
| `data-barba-namespace` | HTML attribute | - | Page identifier for route-specific transitions |
| `transitions` | `barba.init()` | `[]` | Array of transition objects |
| `from.namespace` | Transition | - | Source page filter (array of namespace strings) |
| `to.namespace` | Transition | - | Destination page filter |
| `leave(data)` | Transition | - | Leave animation function. Return a promise or GSAP tween |
| `enter(data)` | Transition | - | Enter animation function |
| `after(data)` | Transition | - | Runs after enter completes. Use for cleanup/re-init |
| `once(data)` | Transition | - | Runs on first page load only |
| `preventRunning` | `barba.init()` | `false` | Prevents clicking links during active transition |
| `prefetchIgnore` | `barba.init()` | `false` | Disable link prefetching |
| `cacheIgnore` | `barba.init()` | `false` | Disable page cache |

---

## Dependencies

| Library | URL |
|---------|-----|
| Barba.js | `https://unpkg.com/@barba/core` |
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
| Lenis (optional) | `https://unpkg.com/lenis@1.1.18/dist/lenis.min.js` |
