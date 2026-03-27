---
name: content-staggered-cards
category: components
tags: [cards, grid, stagger, scroll-reveal, gsap, scrolltrigger]
description: >
  Grid of cards that stagger-reveal on scroll. 3-column desktop, 1-column mobile.
  Each card has image, title, description, tag. Cards animate in with y:60 opacity:0
  staggered by 0.15s using GSAP ScrollTrigger. Hover lifts card with shadow.
---

## Preview

A responsive card grid section. On desktop, three cards per row. On mobile, single column. Cards are invisible initially and animate upward with a stagger when the section scrolls into view. Each card contains a top image, a colored tag pill, a title, and a short description. On hover, cards lift upward and gain a deeper box-shadow.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Staggered Cards</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #999;
    --accent-1: #6366f1;
    --accent-2: #22d3ee;
    --card-bg: #161616;
    --card-radius: 16px;
    --card-gap: 24px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-height: 200vh;
  }

  .spacer { height: 60vh; }

  .cards-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px var(--card-gap);
  }

  .cards-section h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 48px;
    letter-spacing: -0.02em;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--card-gap);
  }

  @media (max-width: 900px) {
    .cards-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 600px) {
    .cards-grid { grid-template-columns: 1fr; }
  }

  .card {
    background: var(--card-bg);
    border-radius: var(--card-radius);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .card-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    position: relative;
    overflow: hidden;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .card-body {
    padding: 24px;
  }

  .card-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 4px 12px;
    border-radius: 100px;
    background: rgba(99, 102, 241, 0.15);
    color: var(--accent-1);
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  .card-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
</style>
</head>
<body>

<div class="spacer"></div>

<section class="cards-section">
  <h2>Featured Work</h2>
  <div class="cards-grid">

    <div class="card">
      <div class="card-image"></div>
      <div class="card-body">
        <span class="card-tag">Design</span>
        <h3 class="card-title">Brand Identity System</h3>
        <p class="card-desc">A comprehensive visual identity built from first principles, spanning digital and print.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-image" style="background: linear-gradient(135deg, #f59e0b, #ef4444);"></div>
      <div class="card-body">
        <span class="card-tag">Development</span>
        <h3 class="card-title">Interactive Dashboard</h3>
        <p class="card-desc">Real-time data visualization with smooth transitions and responsive layout.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-image" style="background: linear-gradient(135deg, #10b981, #3b82f6);"></div>
      <div class="card-body">
        <span class="card-tag">Strategy</span>
        <h3 class="card-title">Growth Framework</h3>
        <p class="card-desc">Data-driven acquisition strategy that doubled conversion in three months.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-image" style="background: linear-gradient(135deg, #8b5cf6, #ec4899);"></div>
      <div class="card-body">
        <span class="card-tag">Design</span>
        <h3 class="card-title">Mobile Experience</h3>
        <p class="card-desc">Touch-first interface design with gesture navigation and haptic feedback.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-image" style="background: linear-gradient(135deg, #06b6d4, #6366f1);"></div>
      <div class="card-body">
        <span class="card-tag">Development</span>
        <h3 class="card-title">API Platform</h3>
        <p class="card-desc">Developer-facing API with interactive docs, sandbox, and real-time monitoring.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-image" style="background: linear-gradient(135deg, #f97316, #facc15);"></div>
      <div class="card-body">
        <span class="card-tag">Strategy</span>
        <h3 class="card-title">Market Expansion</h3>
        <p class="card-desc">Research-backed entry into three new verticals with localized campaigns.</p>
      </div>
    </div>

  </div>
</section>

<div class="spacer"></div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray('.card');

  gsap.set(cards, { y: 60, opacity: 0 });

  ScrollTrigger.batch(cards, {
    onEnter: (batch) => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        overwrite: true
      });
    },
    start: 'top 85%',
    once: true
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Description |
|----------|-------------------|---------|-------------|
| Background | `--bg` | `#0a0a0a` | Section background color |
| Card background | `--card-bg` | `#161616` | Individual card background |
| Text color | `--text` | `#f0f0f0` | Primary text color |
| Muted text | `--text-muted` | `#999` | Description text color |
| Accent | `--accent-1` | `#6366f1` | Tag and gradient accent |
| Card radius | `--card-radius` | `16px` | Border radius on cards |
| Card gap | `--card-gap` | `24px` | Grid gap between cards |
| Stagger delay | JS: `stagger` | `0.15` | Seconds between each card animation |
| Y offset | JS: `y` | `60` | Starting Y translate in pixels |
| Animation duration | JS: `duration` | `0.8` | Seconds for reveal animation |
| Trigger point | JS: `start` | `top 85%` | ScrollTrigger start position |
| Columns (desktop) | CSS: `grid-template-columns` | `repeat(3, 1fr)` | Number of columns at full width |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
