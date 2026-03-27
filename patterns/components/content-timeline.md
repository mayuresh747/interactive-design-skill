---
name: content-timeline
category: components
tags: [timeline, scroll-reveal, alternating, gsap, scrolltrigger, line-draw]
description: >
  Vertical timeline with alternating left/right entries. Central line draws progressively
  on scroll. Each entry fades in from its side. Dots on the timeline pulse at each entry.
  Uses GSAP ScrollTrigger for each entry.
---

## Preview

A vertical timeline with a central line that extends downward as the user scrolls. Entries alternate left and right of the line. Each entry has a pulsing dot on the line, a date/label, a title, and a description. Entries fade in from their respective side (left entries slide from left, right from right). The central line uses a scaleY animation tied to scroll progress. On mobile, all entries stack to the right of the line.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timeline</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #888;
    --accent-1: #6366f1;
    --accent-2: #22d3ee;
    --line-color: #333;
    --dot-size: 16px;
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

  .timeline-section {
    max-width: 1000px;
    margin: 0 auto;
    padding: 80px 24px;
  }

  .timeline-section h2 {
    text-align: center;
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.03em;
    margin-bottom: 80px;
  }

  .timeline {
    position: relative;
  }

  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--line-color);
    transform: translateX(-50%);
  }

  .timeline-line-fill {
    position: absolute;
    left: 50%;
    top: 0;
    width: 2px;
    height: 0;
    background: var(--accent-1);
    transform: translateX(-50%);
    z-index: 1;
  }

  .timeline-entry {
    position: relative;
    width: 50%;
    padding: 0 48px 80px;
  }

  .timeline-entry.left {
    text-align: right;
    padding-right: 48px;
    padding-left: 0;
  }

  .timeline-entry.right {
    margin-left: 50%;
    text-align: left;
    padding-left: 48px;
    padding-right: 0;
  }

  .timeline-dot {
    position: absolute;
    top: 4px;
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: 50%;
    background: var(--accent-1);
    z-index: 2;
  }

  .timeline-dot::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid var(--accent-1);
    opacity: 0;
    animation: none;
  }

  .timeline-dot.active::after {
    animation: pulse-ring 2s ease-out infinite;
  }

  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }

  .timeline-entry.left .timeline-dot {
    right: -8px;
  }

  .timeline-entry.right .timeline-dot {
    left: -8px;
  }

  .timeline-date {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-1);
    margin-bottom: 8px;
  }

  .timeline-title {
    font-size: 1.35rem;
    font-weight: 600;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  .timeline-desc {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .timeline-line,
    .timeline-line-fill {
      left: 20px;
    }

    .timeline-entry,
    .timeline-entry.left,
    .timeline-entry.right {
      width: 100%;
      margin-left: 0;
      padding-left: 56px;
      padding-right: 0;
      text-align: left;
    }

    .timeline-entry.left .timeline-dot,
    .timeline-entry.right .timeline-dot {
      left: 12px;
      right: auto;
    }
  }
</style>
</head>
<body>

<div class="spacer">Scroll down</div>

<section class="timeline-section">
  <h2>Our Journey</h2>

  <div class="timeline">
    <div class="timeline-line"></div>
    <div class="timeline-line-fill"></div>

    <div class="timeline-entry left">
      <div class="timeline-dot"></div>
      <div class="timeline-date">January 2023</div>
      <h3 class="timeline-title">Company Founded</h3>
      <p class="timeline-desc">Started in a garage with three engineers and a whiteboard full of impossible ideas.</p>
    </div>

    <div class="timeline-entry right">
      <div class="timeline-dot"></div>
      <div class="timeline-date">June 2023</div>
      <h3 class="timeline-title">Seed Round Closed</h3>
      <p class="timeline-desc">Raised $4M from early believers who saw what the market had not caught up to yet.</p>
    </div>

    <div class="timeline-entry left">
      <div class="timeline-dot"></div>
      <div class="timeline-date">November 2023</div>
      <h3 class="timeline-title">First Product Launch</h3>
      <p class="timeline-desc">Shipped v1 to 200 beta users. Broke twice, fixed three times, came back stronger.</p>
    </div>

    <div class="timeline-entry right">
      <div class="timeline-dot"></div>
      <div class="timeline-date">March 2024</div>
      <h3 class="timeline-title">10,000 Users</h3>
      <p class="timeline-desc">Organic growth took hold. Word of mouth outpaced every ad dollar we considered spending.</p>
    </div>

    <div class="timeline-entry left">
      <div class="timeline-dot"></div>
      <div class="timeline-date">August 2024</div>
      <h3 class="timeline-title">Series A</h3>
      <p class="timeline-desc">$18M raised to scale the team and expand into three new markets.</p>
    </div>

    <div class="timeline-entry right">
      <div class="timeline-dot"></div>
      <div class="timeline-date">January 2025</div>
      <h3 class="timeline-title">Global Expansion</h3>
      <p class="timeline-desc">Opened offices in London and Tokyo. Same culture, wider reach.</p>
    </div>

  </div>
</section>

<div class="spacer">End</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  // Animate the line fill
  const lineFill = document.querySelector('.timeline-line-fill');
  const timeline = document.querySelector('.timeline');

  gsap.to(lineFill, {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 0.5
    }
  });

  // Animate each entry
  const entries = gsap.utils.toArray('.timeline-entry');

  entries.forEach((entry) => {
    const isLeft = entry.classList.contains('left');
    const dot = entry.querySelector('.timeline-dot');

    gsap.from(entry, {
      x: isLeft ? -60 : 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: entry,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Activate dot pulse when in view
    ScrollTrigger.create({
      trigger: entry,
      start: 'top 70%',
      onEnter: () => dot.classList.add('active'),
    });
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
| Text color | `--text` | `#f0f0f0` | Title/heading color |
| Muted text | `--text-muted` | `#888` | Description text color |
| Accent | `--accent-1` | `#6366f1` | Line fill, dot, and date color |
| Line color | `--line-color` | `#333` | Unfilled line background |
| Dot size | `--dot-size` | `16px` | Timeline dot diameter |
| Entry X offset | JS: `x` | `60` | Slide distance in pixels |
| Scrub smoothness | JS: `scrub` | `0.5` | Line fill scrub factor |
| Trigger start (line) | JS: `start` | `top 60%` | When line begins filling |
| Trigger start (entry) | JS: `start` | `top 80%` | When entries begin animating in |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
