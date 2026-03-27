---
name: image-zoom-scroll
category: components
tags: [image, zoom, scroll, scale, pin, gsap, scrolltrigger, overlay]
description: >
  Image starts small (60% width) and scales to full viewport on scroll. Content overlays
  fade in at full zoom. Uses GSAP ScrollTrigger scrub to map scroll position to scale().
  Pinned section during zoom.
---

## Preview

A section containing a centered image that begins at 60% of viewport width with rounded corners. As the user scrolls, the image scales up smoothly to fill the entire viewport, its border-radius reducing to zero simultaneously. The section is pinned during this zoom transition. Once the image reaches full scale, text overlay content fades in on top of the image. The effect creates a dramatic zoom-into-image transition commonly seen on editorial and portfolio sites.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Image Zoom Scroll</title>
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

  .zoom-section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .zoom-image-wrapper {
    width: 60%;
    aspect-ratio: 16 / 9;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    will-change: transform, width, border-radius;
  }

  .zoom-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a3e 0%, #2d1b69 25%, #0f3460 50%, #1a1a2e 75%, #0c1445 100%);
    background-size: cover;
    background-position: center;
  }

  .zoom-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .zoom-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    pointer-events: none;
  }

  .zoom-overlay h2 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    max-width: 700px;
    margin-bottom: 20px;
  }

  .zoom-overlay p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 500px;
    line-height: 1.6;
  }

  .zoom-overlay .overlay-tag {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent-1);
    margin-bottom: 16px;
    font-weight: 600;
  }
</style>
</head>
<body>

<div class="spacer">Scroll down to zoom</div>

<section class="zoom-section" id="zoomSection">
  <div class="zoom-image-wrapper" id="zoomWrapper">
    <div class="zoom-image">
      <!-- Replace with <img> for real images -->
    </div>
    <div class="zoom-overlay" id="zoomOverlay">
      <span class="overlay-tag">Case Study</span>
      <h2>Redefining the digital frontier</h2>
      <p>An immersive experience that bridged physical and digital spaces for 2 million visitors.</p>
    </div>
  </div>
</section>

<div class="spacer">Continue scrolling</div>

<script>
  gsap.registerPlugin(ScrollTrigger);

  const section = document.getElementById('zoomSection');
  const wrapper = document.getElementById('zoomWrapper');
  const overlay = document.getElementById('zoomOverlay');

  // Calculate scale needed to fill viewport from 60% width
  function getScale() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const scaleX = window.innerWidth / wrapperRect.width;
    const scaleY = window.innerHeight / wrapperRect.height;
    return Math.max(scaleX, scaleY);
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  // Phase 1: Scale up image to fill viewport (0% to 70% of scroll)
  tl.to(wrapper, {
    scale: getScale,
    borderRadius: '0px',
    duration: 0.7,
    ease: 'none'
  });

  // Phase 2: Fade in overlay content (70% to 100% of scroll)
  tl.to(overlay, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.in'
  });

  // Recalculate scale on resize
  ScrollTrigger.addEventListener('refreshInit', () => {
    tl.invalidate();
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
| Text color | `--text` | `#f0f0f0` | Overlay heading color |
| Accent | `--accent-1` | `#6366f1` | Overlay tag color |
| Initial width | CSS: `.zoom-image-wrapper width` | `60%` | Starting size of image |
| Initial radius | CSS: `border-radius` | `24px` | Corner rounding at start |
| Final radius | JS: `borderRadius` | `0px` | Corners at full zoom |
| Aspect ratio | CSS: `aspect-ratio` | `16/9` | Image proportions |
| Pin | JS: `pin` | `true` | Section pins during zoom |
| Scroll distance | JS: `end` | `+=150%` | Total scroll length for zoom |
| Scrub | JS: `scrub` | `1` | Smoothing factor |
| Zoom phase | JS: `duration` | `0.7` | Proportion of timeline for zoom (70%) |
| Overlay phase | JS: `duration` | `0.3` | Proportion for overlay fade (30%) |
| Overlay background | CSS: `rgba(0,0,0,0.3)` | `0.3` | Overlay dimming intensity |

---

## Dependencies

| Library | URL |
|---------|-----|
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
