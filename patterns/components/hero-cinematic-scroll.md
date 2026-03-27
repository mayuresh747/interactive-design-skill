---
name: Cinematic Scroll Hero
category: components
tags: [hero, cinematic, scroll-driven, gsap, scroll-trigger, sticky, parallax, staged-reveal]
description: >
  Extended scroll canvas (300vh). Content reveals
  in stages as you scroll: title fades in, subtitle appears, image
  scales from small to full viewport, then text slides in from sides.
  Uses GSAP ScrollTrigger with scrub. Position sticky for the viewport
  container.
---

## Preview

A 300vh tall section that pins a viewport-sized container while the user scrolls. Content appears in cinematic stages driven by scroll progress:

1. **0-20%** -- Title fades in and scales up from 80% to 100%
2. **15-35%** -- Subtitle appears below with an upward slide
3. **30-65%** -- A central image (or placeholder) scales from a small rectangle (20% size) to fill the entire viewport, with a clip-path inset that opens outward
4. **60-80%** -- Two text blocks slide in from the left and right sides
5. **75-100%** -- Everything fades to reveal the section below

The effect is a scroll-driven film sequence where the user controls pacing.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cinematic Scroll Hero</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ---------- HERO SCROLL CANVAS ---------- */
  .hero-canvas {
    position: relative;
    height: 300vh;
  }

  .hero-viewport {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ---------- STAGE 1: TITLE ---------- */
  .hero__title {
    position: absolute;
    z-index: 3;
    font-size: clamp(2.5rem, 8vw, 7rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    opacity: 0;
    transform: scale(0.8);
  }

  /* ---------- STAGE 2: SUBTITLE ---------- */
  .hero__subtitle {
    position: absolute;
    z-index: 3;
    bottom: 35%;
    font-size: clamp(0.9rem, 1.8vw, 1.25rem);
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-1);
    opacity: 0;
    transform: translateY(30px);
    text-align: center;
  }

  /* ---------- STAGE 3: EXPANDING IMAGE ---------- */
  .hero__image-container {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero__image {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      160deg,
      #0f2027 0%,
      #203a43 30%,
      #2c5364 60%,
      #0f2027 100%
    );
    background-size: cover;
    clip-path: inset(40% 40% 40% 40% round 12px);
    opacity: 0;
  }

  /* ---------- STAGE 4: SIDE TEXT ---------- */
  .hero__side-text {
    position: absolute;
    z-index: 4;
    top: 50%;
    transform: translateY(-50%);
    max-width: 320px;
    padding: 0 2rem;
  }

  .hero__side-text--left {
    left: 0;
    opacity: 0;
    transform: translateX(-60px) translateY(-50%);
  }

  .hero__side-text--right {
    right: 0;
    text-align: right;
    opacity: 0;
    transform: translateX(60px) translateY(-50%);
  }

  .hero__side-text h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .hero__side-text p {
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.5);
  }

  /* ---------- SCROLL PROGRESS BAR ---------- */
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--accent-1);
    z-index: 100;
    transition: none;
  }

  /* ---------- BELOW FOLD ---------- */
  .content-after {
    position: relative;
    z-index: 5;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .content-after h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .content-after p {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.4);
    max-width: 600px;
    line-height: 1.6;
  }

  /* ---------- MOBILE ---------- */
  @media (max-width: 768px) {
    .hero__side-text { display: none; }
    .hero-canvas { height: 250vh; }
  }
</style>
</head>
<body>

<div class="progress-bar" id="progressBar"></div>

<section class="hero-canvas" id="heroCanvas">
  <div class="hero-viewport" id="heroViewport">

    <!-- Stage 1: Title -->
    <h1 class="hero__title" id="heroTitle">Discover the<br>Unknown</h1>

    <!-- Stage 2: Subtitle -->
    <p class="hero__subtitle" id="heroSubtitle">A scroll-driven cinematic experience</p>

    <!-- Stage 3: Expanding image -->
    <div class="hero__image-container">
      <div class="hero__image" id="heroImage"></div>
    </div>

    <!-- Stage 4: Side text -->
    <div class="hero__side-text hero__side-text--left" id="sideLeft">
      <h3>Our Mission</h3>
      <p>Pushing the boundaries of interactive storytelling through design and technology.</p>
    </div>
    <div class="hero__side-text hero__side-text--right" id="sideRight">
      <h3>The Approach</h3>
      <p>Every scroll increment advances the narrative. The user controls the pace of discovery.</p>
    </div>

  </div>
</section>

<section class="content-after">
  <h2>The Story Continues</h2>
  <p>Below the cinematic hero, the site returns to a standard layout. The scroll experience gives way to conventional content.</p>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: '#heroCanvas',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      pin: false,
      onUpdate: (self) => {
        document.getElementById('progressBar').style.width = (self.progress * 100) + '%';
      }
    }
  });

  // --- Stage 1: Title fades in and scales (0% - 20%) ---
  masterTL.fromTo('#heroTitle',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 20, ease: 'power2.out' },
    0
  );

  // --- Stage 2: Subtitle appears (15% - 35%) ---
  masterTL.fromTo('#heroSubtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 15, ease: 'power2.out' },
    12
  );

  // --- Title and subtitle fade out as image takes over (25% - 40%) ---
  masterTL.to('#heroTitle', {
    opacity: 0, scale: 1.1, duration: 15, ease: 'power1.in'
  }, 25);
  masterTL.to('#heroSubtitle', {
    opacity: 0, y: -20, duration: 10, ease: 'power1.in'
  }, 25);

  // --- Stage 3: Image appears and expands (30% - 65%) ---
  masterTL.fromTo('#heroImage',
    { opacity: 0, clipPath: 'inset(40% 40% 40% 40% round 12px)' },
    { opacity: 1, duration: 5, ease: 'none' },
    28
  );

  masterTL.to('#heroImage', {
    clipPath: 'inset(0% 0% 0% 0% round 0px)',
    duration: 35,
    ease: 'power1.inOut'
  }, 33);

  // --- Stage 4: Side text slides in (60% - 80%) ---
  masterTL.to('#sideLeft', {
    opacity: 1, x: 0, duration: 15, ease: 'power3.out'
  }, 60);

  masterTL.to('#sideRight', {
    opacity: 1, x: 0, duration: 15, ease: 'power3.out'
  }, 63);

  // --- Stage 5: Everything fades for exit (80% - 100%) ---
  masterTL.to(['#heroImage', '#sideLeft', '#sideRight'], {
    opacity: 0,
    duration: 20,
    ease: 'power1.in'
  }, 80);
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Notes |
|---|---|---|---|
| Background | `--bg` | `#0a0a0a` | Page and hero background |
| Text | `--text` | `#ffffff` | Title, side text headings |
| Accent | `--accent-1` | `#90e0ef` | Subtitle, progress bar |
| Scroll canvas height | CSS `.hero-canvas` | `300vh` | Total scroll distance |
| Scrub smoothness | JS `scrub` | `1.2` | Higher = more lag behind scroll |
| Image clip-path start | JS `inset(40%)` | `40% 40% 40% 40%` | Initial mask size |
| Image clip-path end | JS `inset(0%)` | `0% 0% 0% 0%` | Fully revealed |
| Progress bar | `#progressBar` | Shown | Remove element to disable |
| Stage timing | JS timeline positions | See code | Adjust numbers to shift reveal points |
| Image | CSS `.hero__image` | Gradient placeholder | Replace with `background-image: url(...)` |

### Timeline position map

| Stage | Timeline start | Timeline end | Scroll % (approx) |
|---|---|---|---|
| Title in | 0 | 20 | 0-20% |
| Subtitle in | 12 | 27 | 12-27% |
| Title/subtitle out | 25 | 40 | 25-40% |
| Image appear | 28 | 33 | 28-33% |
| Image expand | 33 | 68 | 33-68% |
| Side text in | 60 | 78 | 60-78% |
| Everything out | 80 | 100 | 80-100% |

---

## Dependencies

- **GSAP 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **ScrollTrigger 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
