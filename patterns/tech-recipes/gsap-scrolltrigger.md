---
name: gsap-scrolltrigger
category: tech-recipes
tags: [gsap, scrolltrigger, scroll-animation, parallax, pin, scrub, stagger, horizontal-scroll]
description: >
  Complete GSAP + ScrollTrigger setup with 5 common patterns: basic fade-in,
  scrub animation, pin + timeline, batch stagger, and horizontal scroll section.
  Includes responsive handling via ScrollTrigger.matchMedia.
---

## Overview

GSAP (GreenSock Animation Platform) is the most reliable animation library for the web. ScrollTrigger is its plugin for tying animations to scroll position.

Key concepts:
- **Trigger:** the DOM element whose position fires the animation
- **Start / End:** scroll positions where the animation begins and ends (e.g., `"top 80%"` means the top of the trigger hits 80% down the viewport)
- **Scrub:** ties animation progress directly to scroll position instead of playing on enter
- **Pin:** locks an element in place while a scroll-driven animation plays through
- **Batch:** groups multiple elements and staggers their entrance

**When to use:** Any scroll-driven animation. Fade-ins, parallax, pinned sections, horizontal scroll, progress-linked effects. GSAP handles cross-browser quirks, GPU acceleration, and cleanup automatically.

---

## Setup

### CDN Links

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

### Registration

```js
gsap.registerPlugin(ScrollTrigger);
```

Always call `registerPlugin` before creating any ScrollTrigger instances. Without it, ScrollTrigger silently does nothing.

---

## Complete Working Example

All 5 patterns in a single page. Scroll through to see each one.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GSAP ScrollTrigger Patterns</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --surface: #161616;
    --text: #f0f0f0;
    --muted: #888;
    --accent: #6366f1;
    --accent-2: #22d3ee;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  section {
    padding: 120px 10vw;
    min-height: 100vh;
    position: relative;
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }

  p.desc {
    color: var(--muted);
    max-width: 600px;
    line-height: 1.6;
    margin-bottom: 48px;
  }

  /* ── Pattern 1: Fade In ── */
  .fade-item {
    background: var(--surface);
    padding: 32px;
    border-radius: 12px;
    margin-bottom: 24px;
    max-width: 600px;
    border: 1px solid rgba(255,255,255,0.05);
  }

  /* ── Pattern 2: Scrub ── */
  .scrub-section { overflow: hidden; }
  .scrub-bar {
    height: 8px;
    background: var(--accent);
    border-radius: 4px;
    width: 0%;
    margin-bottom: 40px;
  }
  .scrub-box {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    border-radius: 16px;
  }

  /* ── Pattern 3: Pin + Timeline ── */
  .pin-section {
    min-height: 300vh;
  }
  .pin-panel {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 24px;
  }
  .pin-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: var(--accent);
  }
  .pin-text {
    font-size: 1.5rem;
    font-weight: 600;
    opacity: 0;
  }

  /* ── Pattern 4: Batch Stagger ── */
  .batch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  .batch-card {
    background: var(--surface);
    padding: 40px 24px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .batch-card .icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  /* ── Pattern 5: Horizontal Scroll ── */
  .horizontal-section {
    overflow: hidden;
    min-height: auto;
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .horizontal-wrapper {
    display: flex;
    flex-wrap: nowrap;
    gap: 32px;
    width: max-content;
  }
  .h-panel {
    width: 80vw;
    max-width: 600px;
    height: 60vh;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    flex-shrink: 0;
  }
</style>
</head>
<body>

<!-- ═══ PATTERN 1: Basic Scroll-Triggered Fade-In ═══ -->
<section class="fade-section">
  <div class="section-label">Pattern 1</div>
  <h2>Scroll-Triggered Fade In</h2>
  <p class="desc">Elements animate from below with opacity when they enter the viewport. Each item triggers independently.</p>

  <div class="fade-item">First item fades in</div>
  <div class="fade-item">Second item follows</div>
  <div class="fade-item">Third item appears last</div>
</section>

<!-- ═══ PATTERN 2: Scrub Animation ═══ -->
<section class="scrub-section">
  <div class="section-label">Pattern 2</div>
  <h2>Scrub Animation</h2>
  <p class="desc">The bar width and box rotation are tied directly to scroll position. Scroll forward to animate, backward to reverse.</p>

  <div class="scrub-bar"></div>
  <div class="scrub-box"></div>
</section>

<!-- ═══ PATTERN 3: Pin + Timeline ═══ -->
<section class="pin-section">
  <div class="section-label">Pattern 3</div>
  <div class="pin-panel">
    <div class="pin-circle"></div>
    <div class="pin-text pin-text-1">Scale up</div>
    <div class="pin-text pin-text-2">Change color</div>
    <div class="pin-text pin-text-3">Shrink down</div>
  </div>
</section>

<!-- ═══ PATTERN 4: Batch Stagger ═══ -->
<section class="batch-section">
  <div class="section-label">Pattern 4</div>
  <h2>Batch Stagger</h2>
  <p class="desc">Cards animate in batches as rows enter the viewport. Uses ScrollTrigger.batch for efficient grouped reveals.</p>

  <div class="batch-grid">
    <div class="batch-card"><div class="icon">01</div><div>Analytics</div></div>
    <div class="batch-card"><div class="icon">02</div><div>Security</div></div>
    <div class="batch-card"><div class="icon">03</div><div>Database</div></div>
    <div class="batch-card"><div class="icon">04</div><div>Storage</div></div>
    <div class="batch-card"><div class="icon">05</div><div>Compute</div></div>
    <div class="batch-card"><div class="icon">06</div><div>Network</div></div>
    <div class="batch-card"><div class="icon">07</div><div>Deploy</div></div>
    <div class="batch-card"><div class="icon">08</div><div>Monitor</div></div>
  </div>
</section>

<!-- ═══ PATTERN 5: Horizontal Scroll ═══ -->
<section class="horizontal-section">
  <div class="section-label">Pattern 5</div>
  <h2 style="padding: 0 0 24px;">Horizontal Scroll</h2>
  <div class="horizontal-wrapper">
    <div class="h-panel" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);">Panel 1</div>
    <div class="h-panel" style="background: linear-gradient(135deg, #22d3ee, #06b6d4);">Panel 2</div>
    <div class="h-panel" style="background: linear-gradient(135deg, #f59e0b, #ef4444);">Panel 3</div>
    <div class="h-panel" style="background: linear-gradient(135deg, #10b981, #059669);">Panel 4</div>
  </div>
</section>

<section>
  <h2>End</h2>
  <p class="desc">All five ScrollTrigger patterns demonstrated above.</p>
</section>

<script>
  gsap.registerPlugin(ScrollTrigger);

  // ── PATTERN 1: Basic Fade-In ──
  gsap.utils.toArray('.fade-item').forEach((item) => {
    gsap.from(item, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse', // onEnter, onLeave, onEnterBack, onLeaveBack
      }
    });
  });

  // ── PATTERN 2: Scrub (tied to scroll position) ──
  const scrubTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.scrub-section',
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1, // 1 second smoothing
    }
  });
  scrubTl
    .to('.scrub-bar', { width: '100%', duration: 1 })
    .to('.scrub-box', { x: 400, rotation: 360, borderRadius: '50%', duration: 1 }, 0);

  // ── PATTERN 3: Pin + Timeline ──
  const pinTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.pin-section',
      start: 'top top',
      end: '+=200%', // pin for 2x viewport heights of scroll
      pin: '.pin-panel',
      scrub: 1,
    }
  });
  pinTl
    .to('.pin-circle', { scale: 2, duration: 1 })
    .to('.pin-text-1', { opacity: 1, duration: 0.5 }, 0.3)
    .to('.pin-circle', { background: '#22d3ee', duration: 1 })
    .to('.pin-text-1', { opacity: 0, duration: 0.3 })
    .to('.pin-text-2', { opacity: 1, duration: 0.5 })
    .to('.pin-circle', { scale: 0.5, background: '#ec4899', duration: 1 })
    .to('.pin-text-2', { opacity: 0, duration: 0.3 })
    .to('.pin-text-3', { opacity: 1, duration: 0.5 });

  // ── PATTERN 4: Batch Stagger ──
  gsap.set('.batch-card', { y: 40, opacity: 0 });

  ScrollTrigger.batch('.batch-card', {
    onEnter: (batch) => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        overwrite: true,
      });
    },
    start: 'top 90%',
    once: true,
  });

  // ── PATTERN 5: Horizontal Scroll ──
  const horizontalWrapper = document.querySelector('.horizontal-wrapper');
  const panels = gsap.utils.toArray('.h-panel');
  const totalScroll = horizontalWrapper.scrollWidth - window.innerWidth;

  gsap.to(horizontalWrapper, {
    x: -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-section',
      start: 'top top',
      end: () => `+=${totalScroll}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  // ── RESPONSIVE: matchMedia ──
  ScrollTrigger.matchMedia({
    // Desktop only
    '(min-width: 769px)': function() {
      // Desktop-specific animations can go here
      // They auto-revert when viewport drops below 769px
    },
    // Mobile only
    '(max-width: 768px)': function() {
      // Simpler animations for mobile
      // Example: disable horizontal scroll on mobile
    },
    // All sizes
    'all': function() {
      // Animations that work at every breakpoint
    }
  });
</script>

</body>
</html>
```

---

## Integration Notes

### With Lenis smooth scroll

Lenis must feed scroll position to ScrollTrigger. Without this, pinned sections and scrub animations break.

```js
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### With Barba.js page transitions

Kill all ScrollTrigger instances on page leave, recreate on page enter:

```js
barba.hooks.leave(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
});

barba.hooks.after(() => {
  ScrollTrigger.refresh();
  // Re-init your scroll animations here
});
```

### With Three.js

Read `self.progress` inside a ScrollTrigger `onUpdate` callback to drive 3D scene changes (camera zoom, object scale, material uniforms).

### Cleanup

Always kill ScrollTrigger instances when removing elements:

```js
// Kill specific trigger
const st = ScrollTrigger.create({ ... });
st.kill();

// Kill all
ScrollTrigger.getAll().forEach(t => t.kill());
```

---

## Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| `start` | `"top 85%"` | When trigger's top crosses 85% of viewport height |
| `end` | `"bottom top"` | When trigger's bottom reaches viewport top |
| `scrub` | `false` / `1` | `true` = instant link to scroll, number = seconds of smoothing |
| `pin` | `false` | Pin the trigger element during the scroll range |
| `toggleActions` | `"play none none none"` | Four states: onEnter, onLeave, onEnterBack, onLeaveBack. Values: `play`, `pause`, `resume`, `reverse`, `restart`, `reset`, `complete`, `none` |
| `once` | `false` | Animation plays once, then ScrollTrigger self-destructs |
| `markers` | `false` | Show debug markers (start/end lines). Remove in production |
| `invalidateOnRefresh` | `false` | Recalculate values on resize. Use with dynamic widths |
| `stagger` (batch) | `0.1` | Delay between items in a batch |
| `matchMedia` | - | Object mapping media queries to setup/cleanup functions |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
