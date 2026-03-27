---
name: image-parallax-reveal
category: components
tags: [image, parallax, clip-path, reveal, scroll, gsap, scrolltrigger]
description: >
  Image revealed by a sliding clip-path on scroll. Image has parallax movement (moves
  slower than scroll). Uses clip-path: inset() animated via GSAP ScrollTrigger. Container
  overflow hidden. Parallax offset of -20%.
---

## Preview

A large image container that starts fully clipped (hidden) and reveals progressively as the user scrolls. The clip-path slides open from left to right using `clip-path: inset()`. Simultaneously, the image inside moves at a slower rate than the scroll (parallax), creating a sense of depth. The image is slightly oversized (120% height) to allow parallax travel without revealing gaps. The effect feels cinematic, like a curtain being drawn.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Parallax Reveal</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #888;
    --accent-1: #6366f1;
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

  .reveal-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .reveal-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .reveal-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.03em;
    margin-bottom: 48px;
    max-width: 600px;
  }

  .reveal-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    position: relative;
    border-radius: 16px;
    /* Initial state: fully clipped from the right */
    clip-path: inset(0 100% 0 0);
  }

  .reveal-image {
    width: 100%;
    height: 120%;
    position: absolute;
    top: -10%;
    left: 0;
    background: linear-gradient(135deg, #1a1a3e 0%, #2d1b69 30%, #0f3460 60%, #1a1a2e 100%);
    background-size: cover;
    background-position: center;
    will-change: transform;
  }

  .reveal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .reveal-caption {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-bottom: 80px;
  }

  .reveal-caption-text {
    font-size: 1rem;
    color: var(--text-muted);
  }

  .reveal-caption-number {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--accent-1);
    font-variant-numeric: tabular-nums;
  }
</style>
</head>
<body>

<div class="spacer">Scroll down to reveal the image</div>

<section class="reveal-section">
  <div class="reveal-label">Featured Project</div>
  <h2 class="reveal-title">The architecture of light and shadow</h2>

  <div class="reveal-container" id="revealContainer">
    <div class="reveal-image" id="revealImage">
      <!-- Replace with <img> for real images -->
    </div>
  </div>

  <div class="reveal-caption">
    <span class="reveal-caption-text">Nordic Pavilion, Helsinki -- 2025</span>
    <span class="reveal-caption-number">01 / 06</span>
  </div>
</section>

<div class="spacer">Continue scrolling</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  const container = document.getElementById('revealContainer');
  const image = document.getElementById('revealImage');

  // Clip-path reveal: slide open from left to right
  gsap.to(container, {
    clipPath: 'inset(0 0% 0 0)',
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      end: 'top 20%',
      scrub: 1
    }
  });

  // Parallax: image moves slower than scroll (-20% offset)
  gsap.to(image, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
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
| Text color | `--text` | `#f0f0f0` | Heading color |
| Accent | `--accent-1` | `#6366f1` | Caption number color |
| Initial clip | CSS/JS | `inset(0 100% 0 0)` | Fully clipped from right |
| Final clip | JS | `inset(0 0% 0 0)` | Fully revealed |
| Reveal start | JS: `start` | `top 75%` | When reveal begins |
| Reveal end | JS: `end` | `top 20%` | When reveal completes |
| Scrub | JS: `scrub` | `1` | Smoothing factor |
| Parallax amount | JS: `yPercent` | `20` | Image travels 20% of its height |
| Image oversize | CSS: `height` | `120%` | Extra height for parallax travel |
| Aspect ratio | CSS: `aspect-ratio` | `16/9` | Container proportions |
| Border radius | CSS: `border-radius` | `16px` | Container corner rounding |
| Reveal direction | CSS/JS: `clip-path` | Left-to-right | Change inset values for other directions |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
