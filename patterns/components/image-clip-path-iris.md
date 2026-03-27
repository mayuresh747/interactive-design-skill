---
name: image-clip-path-iris
category: components
tags: [image, clip-path, circle, iris, reveal, scroll, gsap, scrolltrigger]
description: >
  Image revealed through an expanding circular
  clip-path. Starts as a small circle in center, expands to full frame on scroll. Uses
  clip-path: circle() animated with GSAP ScrollTrigger.
---

## Preview

An image section that begins completely hidden behind a tiny circular clip-path at the center of the viewport. As the user scrolls, the circle expands outward like a camera iris opening, progressively revealing the full image underneath. The effect is pinned during the transition. A subtle scale animation on the image (from 1.1 to 1.0) adds depth. Optional: a rectangular `clip-path: inset()` variant is included as an alternative.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Clip-Path Iris Reveal</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #888;
    --accent-1: #6366f1;
    --accent-2: #22d3ee;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .spacer {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1.25rem;
  }

  .intro-text {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 24px 20vh;
    text-align: center;
  }

  .intro-text h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.03em;
    margin-bottom: 16px;
  }

  .intro-text p {
    font-size: 1.1rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .iris-section {
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .iris-image {
    position: absolute;
    inset: 0;
    /* Start as a tiny circle at center */
    clip-path: circle(0% at 50% 50%);
    will-change: clip-path;
  }

  .iris-image-inner {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
      #0c1445 0%,
      #1a1a3e 20%,
      #2d1b69 40%,
      #0f3460 60%,
      #051937 80%,
      #0a0a2e 100%
    );
    background-size: cover;
    background-position: center;
    transform: scale(1.1);
    will-change: transform;
  }

  .iris-image-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .iris-content {
    position: absolute;
    bottom: 60px;
    left: 60px;
    right: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    opacity: 0;
    z-index: 2;
  }

  @media (max-width: 768px) {
    .iris-content {
      left: 24px;
      right: 24px;
      bottom: 40px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  .iris-content h3 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    letter-spacing: -0.02em;
    max-width: 500px;
    line-height: 1.2;
  }

  .iris-content .iris-meta {
    font-size: 0.85rem;
    color: var(--text-muted);
    text-align: right;
    line-height: 1.6;
  }

  /* Variant toggle: add class "rect" to .iris-image for rectangular reveal */
  .iris-image.rect {
    clip-path: inset(50% 50% 50% 50%);
  }

  .iris-controls {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    display: flex;
    gap: 8px;
  }

  .iris-controls button {
    padding: 8px 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.6);
    color: var(--text);
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: inherit;
    backdrop-filter: blur(8px);
    transition: background 0.2s;
  }

  .iris-controls button.active {
    background: var(--accent-1);
    border-color: var(--accent-1);
  }

  .iris-controls button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .iris-controls button.active:hover {
    background: var(--accent-1);
  }
</style>
</head>
<body>

<div class="spacer">Scroll down</div>

<div class="intro-text">
  <h2>Dive into the deep</h2>
  <p>The ocean covers 71% of Earth's surface, yet 80% of it remains unexplored and unmapped.</p>
</div>

<section class="iris-section" id="irisSection">
  <div class="iris-image" id="irisImage">
    <div class="iris-image-inner" id="irisInner">
      <!-- Replace with <img> for real images -->
    </div>
  </div>

  <div class="iris-content" id="irisContent">
    <h3>Expedition: Midnight Zone</h3>
    <div class="iris-meta">
      Depth: 3,800m<br>
      Duration: 14 days<br>
      Team: 23 researchers
    </div>
  </div>
</section>

<div class="spacer">Continue scrolling</div>

<!-- Variant toggle controls -->
<div class="iris-controls">
  <button class="active" id="btnCircle">Circle</button>
  <button id="btnRect">Rectangle</button>
</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  const irisImage = document.getElementById('irisImage');
  const irisInner = document.getElementById('irisInner');
  const irisContent = document.getElementById('irisContent');
  const section = document.getElementById('irisSection');

  let currentMode = 'circle';
  let scrollTriggerInstance;

  function buildAnimation() {
    // Kill previous instance
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    // Reset
    if (currentMode === 'circle') {
      irisImage.classList.remove('rect');
      gsap.set(irisImage, { clipPath: 'circle(0% at 50% 50%)' });
    } else {
      irisImage.classList.add('rect');
      gsap.set(irisImage, { clipPath: 'inset(50% 50% 50% 50%)' });
    }
    gsap.set(irisInner, { scale: 1.1 });
    gsap.set(irisContent, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        id: 'iris'
      }
    });

    // Phase 1: Expand clip-path (0% to 70% of scroll)
    if (currentMode === 'circle') {
      tl.to(irisImage, {
        clipPath: 'circle(75% at 50% 50%)',
        duration: 0.7,
        ease: 'none'
      });
    } else {
      tl.to(irisImage, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.7,
        ease: 'none'
      });
    }

    // Simultaneous subtle zoom out on the image
    tl.to(irisInner, {
      scale: 1,
      duration: 0.7,
      ease: 'none'
    }, 0);

    // Phase 2: Fade in content (70% to 100% of scroll)
    tl.to(irisContent, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.in'
    });

    scrollTriggerInstance = tl.scrollTrigger;
  }

  buildAnimation();

  // Variant toggle
  const btnCircle = document.getElementById('btnCircle');
  const btnRect = document.getElementById('btnRect');

  btnCircle.addEventListener('click', () => {
    if (currentMode === 'circle') return;
    currentMode = 'circle';
    btnCircle.classList.add('active');
    btnRect.classList.remove('active');
    buildAnimation();
    ScrollTrigger.refresh();
  });

  btnRect.addEventListener('click', () => {
    if (currentMode === 'rect') return;
    currentMode = 'rect';
    btnRect.classList.add('active');
    btnCircle.classList.remove('active');
    buildAnimation();
    ScrollTrigger.refresh();
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Description |
|----------|-------------------|---------|-------------|
| Background | `--bg` | `#0a0a0a` | Page background |
| Text color | `--text` | `#f0f0f0` | Content overlay text |
| Accent | `--accent-1` | `#6366f1` | Active button color |
| Mode | JS: `currentMode` | `circle` | `circle` or `rect` variant |
| Start clip (circle) | JS | `circle(0% at 50% 50%)` | Initial circle size |
| End clip (circle) | JS | `circle(75% at 50% 50%)` | Final circle size |
| Start clip (rect) | JS | `inset(50% 50% 50% 50%)` | Initial inset |
| End clip (rect) | JS | `inset(0% 0% 0% 0%)` | Final inset (fully revealed) |
| Image scale start | JS: `scale` | `1.1` | Slight zoom at start |
| Image scale end | JS: `scale` | `1` | Normal scale at end |
| Pin | JS: `pin` | `true` | Section pins during animation |
| Scroll distance | JS: `end` | `+=120%` | Total scroll length |
| Scrub | JS: `scrub` | `1` | Smoothing factor |
| Iris phase | JS: `duration` | `0.7` | Proportion of timeline for iris (70%) |
| Content phase | JS: `duration` | `0.3` | Proportion for content fade (30%) |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
