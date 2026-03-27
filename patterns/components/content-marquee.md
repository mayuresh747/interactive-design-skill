---
name: content-marquee
category: components
tags: [marquee, ticker, infinite-scroll, text-stroke, css-animation, gsap, hover]
description: >
  Infinite horizontal scrolling ticker. Two rows scrolling in opposite directions.
  Large text with stroke outlines (text-stroke). Speed increases on hover. Pure CSS
  animation with GSAP for hover speed control.
---

## Preview

Two horizontal bands of oversized text scrolling continuously. The top row moves left-to-right, the bottom row right-to-left. Text alternates between filled and stroked (outlined) styles. On hover over either row, the scroll speed increases noticeably, creating an energetic acceleration effect. The text is large, bold, and tightly tracked. The content is duplicated to create a seamless infinite loop.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Marquee</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #888;
    --accent-1: #6366f1;
    --accent-2: #22d3ee;
    --marquee-speed: 30s;
    --marquee-fast: 12s;
    --marquee-font-size: clamp(4rem, 10vw, 8rem);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
  }

  .spacer {
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1.25rem;
  }

  .marquee-section {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    cursor: default;
    overflow: hidden;
  }

  .marquee-row {
    display: flex;
    width: max-content;
    white-space: nowrap;
  }

  .marquee-row.scroll-left {
    animation: scroll-left var(--marquee-speed) linear infinite;
  }

  .marquee-row.scroll-right {
    animation: scroll-right var(--marquee-speed) linear infinite;
  }

  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes scroll-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .marquee-item {
    font-size: var(--marquee-font-size);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.1;
    padding: 0 24px;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 24px;
    user-select: none;
  }

  .marquee-item.filled {
    color: var(--text);
  }

  .marquee-item.stroked {
    color: transparent;
    -webkit-text-stroke: 2px var(--text);
  }

  .marquee-item .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent-1);
    flex-shrink: 0;
  }

  /* Hover speed handled via GSAP timeScale — CSS fallback below */
  .marquee-section:hover .marquee-row.scroll-left {
    animation-duration: var(--marquee-fast);
  }

  .marquee-section:hover .marquee-row.scroll-right {
    animation-duration: var(--marquee-fast);
  }
</style>
</head>
<body>

<div class="spacer">Scroll to the marquee</div>

<section class="marquee-section" id="marqueeSection">

  <div class="marquee-row scroll-left">
    <!-- Original content -->
    <span class="marquee-item filled">Design <span class="dot"></span></span>
    <span class="marquee-item stroked">Develop <span class="dot"></span></span>
    <span class="marquee-item filled">Create <span class="dot"></span></span>
    <span class="marquee-item stroked">Iterate <span class="dot"></span></span>
    <span class="marquee-item filled">Ship <span class="dot"></span></span>
    <span class="marquee-item stroked">Repeat <span class="dot"></span></span>
    <!-- Duplicate for seamless loop -->
    <span class="marquee-item filled">Design <span class="dot"></span></span>
    <span class="marquee-item stroked">Develop <span class="dot"></span></span>
    <span class="marquee-item filled">Create <span class="dot"></span></span>
    <span class="marquee-item stroked">Iterate <span class="dot"></span></span>
    <span class="marquee-item filled">Ship <span class="dot"></span></span>
    <span class="marquee-item stroked">Repeat <span class="dot"></span></span>
  </div>

  <div class="marquee-row scroll-right">
    <!-- Original content -->
    <span class="marquee-item stroked">Strategy <span class="dot"></span></span>
    <span class="marquee-item filled">Motion <span class="dot"></span></span>
    <span class="marquee-item stroked">Identity <span class="dot"></span></span>
    <span class="marquee-item filled">Systems <span class="dot"></span></span>
    <span class="marquee-item stroked">Culture <span class="dot"></span></span>
    <span class="marquee-item filled">Impact <span class="dot"></span></span>
    <!-- Duplicate for seamless loop -->
    <span class="marquee-item stroked">Strategy <span class="dot"></span></span>
    <span class="marquee-item filled">Motion <span class="dot"></span></span>
    <span class="marquee-item stroked">Identity <span class="dot"></span></span>
    <span class="marquee-item filled">Systems <span class="dot"></span></span>
    <span class="marquee-item stroked">Culture <span class="dot"></span></span>
    <span class="marquee-item filled">Impact <span class="dot"></span></span>
  </div>

</section>

<div class="spacer">End</div>

<script>
  // GSAP-based smooth hover speed control
  const section = document.getElementById('marqueeSection');
  const rows = section.querySelectorAll('.marquee-row');

  // Pause CSS animation, drive via GSAP instead
  rows.forEach((row) => {
    const isLeft = row.classList.contains('scroll-left');
    const totalWidth = row.scrollWidth / 2;

    // Kill CSS animation
    row.style.animation = 'none';

    // Set up GSAP infinite tween
    const tween = gsap.to(row, {
      x: isLeft ? -totalWidth : totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return isLeft
            ? parseFloat(x) % totalWidth
            : -(Math.abs(parseFloat(x)) % totalWidth);
        })
      }
    });

    // Start position for right-scrolling row
    if (!isLeft) {
      gsap.set(row, { x: -totalWidth });
    }

    row._tween = tween;
  });

  // Hover speed control
  section.addEventListener('mouseenter', () => {
    rows.forEach((row) => {
      gsap.to(row._tween, { timeScale: 2.5, duration: 0.6, ease: 'power2.out' });
    });
  });

  section.addEventListener('mouseleave', () => {
    rows.forEach((row) => {
      gsap.to(row._tween, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
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
| Text color | `--text` | `#f0f0f0` | Filled text color |
| Accent | `--accent-1` | `#6366f1` | Dot color |
| Font size | `--marquee-font-size` | `clamp(4rem, 10vw, 8rem)` | Text size |
| Normal speed | JS: `duration` | `30` | Seconds for one full loop |
| Hover speed multiplier | JS: `timeScale` | `2.5` | Speed multiplier on hover |
| Hover transition in | JS: `duration` | `0.6` | Seconds to ramp up speed |
| Hover transition out | JS: `duration` | `0.8` | Seconds to ramp back down |
| Stroke width | CSS: `-webkit-text-stroke` | `2px` | Outline thickness on stroked items |
| Row gap | CSS: `.marquee-section gap` | `16px` | Space between the two rows |
| Words | HTML | 6 per row | Change text inside `.marquee-item` spans |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
