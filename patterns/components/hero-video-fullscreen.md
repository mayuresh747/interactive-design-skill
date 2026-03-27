---
name: Video Fullscreen Hero
category: components
tags: [hero, video, fullscreen, parallax, gsap, scroll-trigger]
description: >
  Full viewport video background (uses a placeholder gradient animation
  to simulate video). Overlay with centered text. Text fades in with
  upward motion. Scroll reveals content below with parallax offset.
  Video dims on scroll.
---

## Preview

A full-viewport section with an animated gradient background simulating a looping video. A dark overlay sits on top to ensure text readability. Centered headline and subtitle fade in with upward motion on load. As the user scrolls down, the "video" background dims (overlay darkens) and shifts upward slightly (parallax). Content below the hero scrolls over the dimmed background.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Video Fullscreen Hero</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
    --overlay-opacity: 0.35;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  /* ---------- HERO ---------- */
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  /* Simulated video — animated gradient */
  .hero__video {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      #0f2027 0%,
      #203a43 25%,
      #2c5364 50%,
      #203a43 75%,
      #0f2027 100%
    );
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
  }

  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Dark overlay */
  .hero__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, var(--overlay-opacity));
    z-index: 1;
  }

  /* Content */
  .hero__content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
  }

  .hero__title {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    opacity: 0;
    transform: translateY(40px);
  }

  .hero__subtitle {
    margin-top: 1.25rem;
    font-size: clamp(1rem, 2vw, 1.375rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    line-height: 1.5;
    opacity: 0;
    transform: translateY(30px);
  }

  .hero__cta {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    font-size: 0.9375rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--bg);
    background: var(--accent-1);
    border: none;
    border-radius: 100px;
    text-decoration: none;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.2s;
  }

  .hero__cta:hover {
    opacity: 0.85;
  }

  /* Scroll indicator */
  .hero__scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 24px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    opacity: 0;
  }

  .hero__scroll-hint::after {
    content: "";
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: var(--accent-1);
    border-radius: 2px;
    animation: scrollDot 1.6s ease-in-out infinite;
  }

  @keyframes scrollDot {
    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
    50% { transform: translateX(-50%) translateY(14px); opacity: 0.3; }
  }

  /* ---------- BELOW FOLD ---------- */
  .content-section {
    position: relative;
    z-index: 3;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
  }

  .content-section__inner {
    max-width: 700px;
    text-align: center;
  }

  .content-section__inner h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .content-section__inner p {
    font-size: 1.125rem;
    line-height: 1.7;
    opacity: 0.5;
  }
</style>
</head>
<body>

<section class="hero" id="hero">
  <div class="hero__video" id="heroVideo"></div>
  <div class="hero__overlay" id="heroOverlay"></div>
  <div class="hero__content">
    <h1 class="hero__title" id="heroTitle">Experience the Future</h1>
    <p class="hero__subtitle" id="heroSubtitle">
      Immersive design that captivates and converts. Built for brands that refuse to blend in.
    </p>
    <a href="#" class="hero__cta" id="heroCta">Explore</a>
  </div>
  <div class="hero__scroll-hint" id="scrollHint"></div>
</section>

<section class="content-section">
  <div class="content-section__inner">
    <h2>Below the Fold</h2>
    <p>The hero video dims and shifts as you scroll. Content appears cleanly on a solid background.</p>
  </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  // --- Entry animation ---
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('#heroTitle', { opacity: 1, y: 0, duration: 0.9 }, 0.2)
    .to('#heroSubtitle', { opacity: 1, y: 0, duration: 0.7 }, 0.5)
    .to('#heroCta', { opacity: 1, y: 0, duration: 0.6 }, 0.7)
    .to('#scrollHint', { opacity: 1, duration: 0.5 }, 1);

  // --- Scroll: dim video + parallax ---
  gsap.to('#heroOverlay', {
    '--overlay-opacity': 0.85,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Parallax — video moves up slower than scroll
  gsap.to('#heroVideo', {
    yPercent: -20,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Fade out hero content on scroll
  gsap.to('.hero__content', {
    opacity: 0,
    y: -60,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '40% top',
      scrub: true
    }
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Notes |
|---|---|---|---|
| Background | `--bg` | `#0a0a0a` | Below-fold and overlay color base |
| Text | `--text` | `#ffffff` | Headline, CTA text |
| Accent | `--accent-1` | `#90e0ef` | CTA button, scroll dot |
| Initial overlay | `--overlay-opacity` | `0.35` | Starting dimness |
| Gradient colors | CSS `.hero__video` | Deep teal palette | Change for different "video" look |
| Gradient speed | CSS `animation` | `8s` | Slower = more cinematic |
| Parallax distance | JS `yPercent` | `-20` | How far video shifts |
| Content fade end | JS ScrollTrigger `end` | `40% top` | When content fully fades |

To use a real video, replace `.hero__video` with:
```html
<video class="hero__video" autoplay muted loop playsinline>
  <source src="video.mp4" type="video/mp4" />
</video>
```
And add `object-fit: cover; width: 100%; height: 100%;` to `.hero__video`.

---

## Dependencies

- **GSAP 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **ScrollTrigger 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
