---
name: content-bento-grid
category: components
tags: [bento, grid, dashboard, mixed-sizes, scroll-reveal, gsap, scrolltrigger]
description: >
  Dashboard-style grid with mixed card sizes (1x1, 2x1, 1x2, 2x2). Cards reveal with
  scale-up animation on scroll. Each card has distinct content type: stat, image, text
  quote, icon+label. Uses CSS Grid with named areas.
---

## Preview

A bento-box grid layout with cards of varying sizes arranged in an asymmetric but balanced composition. Card types include: a large stat card with a big number and label, an image card spanning two columns, a text quote card, an icon-plus-label card, and smaller accent cards. All cards start at scale 0.9 with opacity 0 and animate to full size on scroll entry. The grid uses named areas for precise layout control.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bento Grid</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #888;
    --accent-1: #6366f1;
    --accent-2: #22d3ee;
    --card-bg: #161616;
    --card-border: rgba(255, 255, 255, 0.06);
    --card-radius: 20px;
    --grid-gap: 16px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .spacer {
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1.25rem;
  }

  .bento-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 24px;
  }

  .bento-section h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.03em;
    margin-bottom: 48px;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "stat   stat   image  image"
      "quote  icon   image  image"
      "small1 small2 small3 cta";
    gap: var(--grid-gap);
  }

  @media (max-width: 900px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "stat   stat"
        "image  image"
        "quote  icon"
        "small1 small2"
        "small3 cta";
    }
  }

  @media (max-width: 500px) {
    .bento-grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        "stat"
        "image"
        "quote"
        "icon"
        "small1"
        "small2"
        "small3"
        "cta";
    }
  }

  .bento-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--card-radius);
    padding: 32px;
    overflow: hidden;
    position: relative;
  }

  /* Named grid assignments */
  .bento-stat   { grid-area: stat; }
  .bento-image  { grid-area: image; padding: 0; }
  .bento-quote  { grid-area: quote; }
  .bento-icon   { grid-area: icon; }
  .bento-small1 { grid-area: small1; }
  .bento-small2 { grid-area: small2; }
  .bento-small3 { grid-area: small3; }
  .bento-cta    { grid-area: cta; }

  /* Stat card */
  .bento-stat .stat-number {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .bento-stat .stat-label {
    font-size: 1rem;
    color: var(--text-muted);
    margin-top: 8px;
  }

  /* Image card */
  .bento-image .image-fill {
    width: 100%;
    height: 100%;
    min-height: 280px;
    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
    border-radius: var(--card-radius);
    display: flex;
    align-items: flex-end;
    padding: 24px;
  }

  .bento-image .image-fill span {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  /* Quote card */
  .bento-quote blockquote {
    font-size: 1.1rem;
    line-height: 1.6;
    font-style: italic;
    color: var(--text);
    border-left: 3px solid var(--accent-1);
    padding-left: 16px;
  }

  .bento-quote cite {
    display: block;
    margin-top: 12px;
    font-size: 0.85rem;
    color: var(--text-muted);
    font-style: normal;
  }

  /* Icon card */
  .bento-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
  }

  .bento-icon .icon-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .bento-icon .icon-label {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  /* Small cards */
  .bento-small1, .bento-small2, .bento-small3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 120px;
  }

  .small-title {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .small-label {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* CTA card */
  .bento-cta {
    background: var(--accent-1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s ease;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: -0.01em;
  }

  .bento-cta:hover {
    background: #4f46e5;
  }
</style>
</head>
<body>

<div class="spacer">Scroll down</div>

<section class="bento-section">
  <h2>By the Numbers</h2>

  <div class="bento-grid">

    <div class="bento-card bento-stat">
      <div class="stat-number">98.7%</div>
      <div class="stat-label">Uptime across all production systems this year</div>
    </div>

    <div class="bento-card bento-image">
      <div class="image-fill">
        <span>Data center, Oslo &mdash; 2025</span>
      </div>
    </div>

    <div class="bento-card bento-quote">
      <blockquote>
        The best infrastructure is the kind you never have to think about.
      </blockquote>
      <cite>-- Engineering Lead, Q3 Review</cite>
    </div>

    <div class="bento-card bento-icon">
      <div class="icon-circle">&#9889;</div>
      <div class="icon-label">Sub-50ms global latency</div>
    </div>

    <div class="bento-card bento-small1">
      <div class="small-title">42</div>
      <div class="small-label">Countries served</div>
    </div>

    <div class="bento-card bento-small2">
      <div class="small-title">3.2M</div>
      <div class="small-label">Requests / second</div>
    </div>

    <div class="bento-card bento-small3">
      <div class="small-title">128</div>
      <div class="small-label">Team members</div>
    </div>

    <div class="bento-card bento-cta">
      View Case Study &rarr;
    </div>

  </div>
</section>

<div class="spacer">End</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray('.bento-card');

  gsap.set(cards, { scale: 0.9, opacity: 0 });

  ScrollTrigger.batch(cards, {
    onEnter: (batch) => {
      gsap.to(batch, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(1.4)',
        stagger: 0.1,
        overwrite: true
      });
    },
    start: 'top 88%',
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
| Background | `--bg` | `#0a0a0a` | Section background |
| Card background | `--card-bg` | `#161616` | Default card fill |
| Card border | `--card-border` | `rgba(255,255,255,0.06)` | Subtle border |
| Card radius | `--card-radius` | `20px` | Corner rounding |
| Grid gap | `--grid-gap` | `16px` | Space between cards |
| Accent 1 | `--accent-1` | `#6366f1` | Primary accent / gradient start |
| Accent 2 | `--accent-2` | `#22d3ee` | Secondary accent / gradient end |
| Scale start | JS: `scale` | `0.9` | Initial scale of cards |
| Stagger | JS: `stagger` | `0.1` | Delay between card reveals |
| Duration | JS: `duration` | `0.7` | Animation length in seconds |
| Easing | JS: `ease` | `back.out(1.4)` | Overshoot easing for pop effect |
| Grid areas | CSS: `grid-template-areas` | See code | Rearrange by editing area names |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
