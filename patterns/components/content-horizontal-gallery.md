---
name: content-horizontal-gallery
category: components
tags: [horizontal-scroll, gallery, sticky, pin, gsap, scrolltrigger, scrub]
description: >
  Horizontal scroll section triggered by vertical scroll. Container is position sticky,
  inner content translates horizontally as user scrolls. Contains large image cards with
  captions. Uses GSAP ScrollTrigger with pin:true and horizontal scrub.
---

## Preview

A full-viewport section that pins in place while the user scrolls vertically. Inside, a row of large image cards with captions translates horizontally from right to left, creating a cinematic gallery effect. The scroll distance maps 1:1 to horizontal movement. Each card is large with rounded corners, a gradient placeholder image, and a caption below.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Horizontal Gallery</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #888;
    --accent-1: #6366f1;
    --accent-2: #22d3ee;
    --card-radius: 16px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .spacer {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--text-muted);
  }

  .gallery-wrapper {
    overflow: hidden;
  }

  .gallery-track {
    display: flex;
    gap: 40px;
    padding: 0 5vw;
    height: 100vh;
    align-items: center;
    width: max-content;
  }

  .gallery-card {
    flex-shrink: 0;
    width: 60vw;
    max-width: 900px;
  }

  @media (max-width: 768px) {
    .gallery-card { width: 80vw; }
    .gallery-track { gap: 24px; }
  }

  .gallery-card-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--card-radius);
    overflow: hidden;
    position: relative;
  }

  .gallery-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .gallery-card-image .placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  }

  .gallery-card-caption {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
  }

  .gallery-card-title {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .gallery-card-meta {
    font-size: 0.875rem;
    color: var(--text-muted);
    white-space: nowrap;
  }

  .gallery-header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 5vw 40px;
  }

  .gallery-header h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.03em;
  }

  .gallery-header p {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-top: 12px;
  }
</style>
</head>
<body>

<div class="spacer">Scroll down</div>

<div class="gallery-header">
  <h2>Selected Projects</h2>
  <p>A curated collection of recent work across brand, product, and digital.</p>
</div>

<section class="gallery-wrapper">
  <div class="gallery-track">

    <div class="gallery-card">
      <div class="gallery-card-image">
        <div class="placeholder" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);"></div>
      </div>
      <div class="gallery-card-caption">
        <span class="gallery-card-title">Ethereal Spaces</span>
        <span class="gallery-card-meta">Architecture / 2025</span>
      </div>
    </div>

    <div class="gallery-card">
      <div class="gallery-card-image">
        <div class="placeholder" style="background: linear-gradient(135deg, #f59e0b, #ef4444);"></div>
      </div>
      <div class="gallery-card-caption">
        <span class="gallery-card-title">Solar Harvest</span>
        <span class="gallery-card-meta">Branding / 2025</span>
      </div>
    </div>

    <div class="gallery-card">
      <div class="gallery-card-image">
        <div class="placeholder" style="background: linear-gradient(135deg, #10b981, #06b6d4);"></div>
      </div>
      <div class="gallery-card-caption">
        <span class="gallery-card-title">Deep Current</span>
        <span class="gallery-card-meta">Digital / 2024</span>
      </div>
    </div>

    <div class="gallery-card">
      <div class="gallery-card-image">
        <div class="placeholder" style="background: linear-gradient(135deg, #ec4899, #f97316);"></div>
      </div>
      <div class="gallery-card-caption">
        <span class="gallery-card-title">Neon Bloom</span>
        <span class="gallery-card-meta">Product / 2024</span>
      </div>
    </div>

    <div class="gallery-card">
      <div class="gallery-card-image">
        <div class="placeholder" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6);"></div>
      </div>
      <div class="gallery-card-caption">
        <span class="gallery-card-title">Waveform</span>
        <span class="gallery-card-meta">Interactive / 2024</span>
      </div>
    </div>

  </div>
</section>

<div class="spacer">Continue scrolling</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  const track = document.querySelector('.gallery-track');
  const cards = gsap.utils.toArray('.gallery-card');

  const totalScroll = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: '.gallery-wrapper',
      pin: true,
      scrub: 1,
      end: () => '+=' + totalScroll,
      invalidateOnRefresh: true
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
| Text color | `--text` | `#f0f0f0` | Title text color |
| Muted text | `--text-muted` | `#888` | Meta/caption text color |
| Card radius | `--card-radius` | `16px` | Image corner radius |
| Card width | CSS: `.gallery-card width` | `60vw` | Width of each gallery card |
| Gap | CSS: `.gallery-track gap` | `40px` | Space between cards |
| Scrub smoothness | JS: `scrub` | `1` | Smoothing factor (higher = smoother) |
| Pin | JS: `pin` | `true` | Section pins during horizontal scroll |
| Number of cards | HTML | 5 | Add or remove `.gallery-card` elements |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
