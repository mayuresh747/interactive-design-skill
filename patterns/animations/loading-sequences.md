---
name: Loading Sequences
category: animations
tags: [loading, preloader, counter, blur, logo, skeleton, shimmer, curtain, particles, gsap]
description: >
  6 preloader/loading sequence presets. Counter preloader with progress bar,
  progressive blur, logo animation, skeleton shimmer, curtain lift, and
  particle gather.
---

## Preset 1 — Counter Preloader

A numeric counter from 0-100% with a progress bar, then reveals the page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Counter Preloader</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }

  .preloader {
    position: fixed;
    inset: 0;
    background: #0a0a0a;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }

  .preloader__count {
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.04em;
    color: #90e0ef;
  }

  .preloader__bar-track {
    width: 200px;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
  }

  .preloader__bar-fill {
    height: 100%;
    width: 0%;
    background: #90e0ef;
    border-radius: 2px;
  }

  .page-content {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    opacity: 0;
  }
</style>
</head>
<body>

<div class="preloader" id="preloader">
  <div class="preloader__count" id="preCount">0</div>
  <div class="preloader__bar-track">
    <div class="preloader__bar-fill" id="preFill"></div>
  </div>
</div>

<div class="page-content" id="pageContent">
  Page Content Loaded
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const counter = { val: 0 };
  const countEl = document.getElementById('preCount');
  const fillEl = document.getElementById('preFill');
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('pageContent');

  // Count from 0 to 100
  gsap.to(counter, {
    val: 100,
    duration: 2.5,
    ease: 'power2.inOut',
    onUpdate: () => {
      const v = Math.round(counter.val);
      countEl.textContent = v;
      fillEl.style.width = v + '%';
    },
    onComplete: () => {
      // Fade out preloader, reveal content
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          preloader.style.display = 'none';
          document.body.style.overflow = 'auto';
        },
      });
      gsap.to(content, {
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
      });
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Count duration | `2.5s` | Time from 0 to 100 |
| Ease | `power2.inOut` | Accelerates then decelerates |
| Bar width | `200px` | Progress bar track width |
| Accent color | `#90e0ef` | Counter + bar fill color |
| Fade-out duration | `0.5s` | Preloader exit |

---

## Preset 2 — Progressive Blur

Page loads behind a full-screen blur that progressively sharpens.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Progressive Blur</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }

  .blur-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    background: rgba(10, 10, 10, 0.3);
    pointer-events: none;
    will-change: backdrop-filter, opacity;
  }

  .page-content {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 2rem;
    padding: 2rem;
    text-align: center;
  }
  .page-content p { font-size: 1rem; color: rgba(255,255,255,0.4); max-width: 500px; }
</style>
</head>
<body>

<div class="blur-overlay" id="blurOverlay"></div>

<div class="page-content">
  <h1>Content Ready</h1>
  <p>The page loaded behind a blur that progressively sharpened to reveal the content.</p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const overlay = document.getElementById('blurOverlay');
  const blur = { amount: 30 };

  // Simulate loading delay, then sharpen
  gsap.to(blur, {
    amount: 0,
    delay: 0.5,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate: () => {
      overlay.style.backdropFilter = `blur(${blur.amount}px)`;
      overlay.style.webkitBackdropFilter = `blur(${blur.amount}px)`;
    },
    onComplete: () => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => overlay.remove(),
      });
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Initial blur | `30px` | Starting blur radius |
| Delay | `0.5s` | Wait before sharpening |
| Sharpen duration | `1.5s` | Time to reach full clarity |
| Overlay bg | `rgba(10,10,10,0.3)` | Tinted overlay color |

---

## Preset 3 — Logo Animation

A logo draws itself (SVG stroke) or assembles, then fades away to reveal the page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Logo Preloader</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }

  .logo-preloader {
    position: fixed;
    inset: 0;
    background: #0a0a0a;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-svg {
    width: 120px;
    height: 120px;
  }

  .logo-svg path {
    fill: none;
    stroke: #90e0ef;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
  }

  .page-content {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
</style>
</head>
<body>

<div class="logo-preloader" id="logoPreloader">
  <svg class="logo-svg" viewBox="0 0 100 100">
    <!-- Simple geometric logo: hexagon -->
    <path id="logoPath" d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" />
    <!-- Inner triangle -->
    <path id="logoInner" d="M50 25 L75 62.5 L25 62.5 Z" />
  </svg>
</div>

<div class="page-content" id="pageContent" style="opacity: 0;">
  Page Content
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const tl = gsap.timeline();

  // Draw outer shape
  tl.to('#logoPath', {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power2.inOut',
  });

  // Draw inner shape
  tl.to('#logoInner', {
    strokeDashoffset: 0,
    duration: 0.8,
    ease: 'power2.inOut',
  }, '-=0.4');

  // Fill in
  tl.to('.logo-svg path', {
    fill: '#90e0ef',
    fillOpacity: 0.15,
    duration: 0.4,
    ease: 'power1.in',
  });

  // Scale up and fade out
  tl.to('.logo-svg', {
    scale: 1.2,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
  });

  // Remove preloader, show content
  tl.to('#logoPreloader', {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      document.getElementById('logoPreloader').style.display = 'none';
      document.body.style.overflow = 'auto';
    },
  });

  tl.to('#pageContent', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.2');
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| SVG paths | Hexagon + triangle | Replace with your logo SVG |
| Stroke color | `#90e0ef` | Drawing color |
| Draw duration | `1.2s` outer, `0.8s` inner | Stroke animation speed |
| Fill opacity | `0.15` | Brief fill flash |
| Total sequence | ~3.5s | Full timeline duration |

---

## Preset 4 — Skeleton Shimmer

Placeholder shapes with a shimmer animation that resolves to real content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Skeleton Shimmer</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }

  .skeleton-page {
    max-width: 600px;
    margin: 4rem auto;
    padding: 0 2rem;
  }

  .skeleton {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .skeleton::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.04) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .skeleton--avatar { width: 60px; height: 60px; border-radius: 50%; }
  .skeleton--title { width: 70%; height: 28px; }
  .skeleton--text { width: 100%; height: 16px; }
  .skeleton--text-short { width: 60%; height: 16px; }
  .skeleton--image { width: 100%; height: 200px; }

  .skeleton-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .skeleton-header-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .real-content {
    max-width: 600px;
    margin: 4rem auto;
    padding: 0 2rem;
    opacity: 0;
    display: none;
  }

  .real-content h1 { font-size: 1.75rem; margin-bottom: 1rem; }
  .real-content p { color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 1rem; }
</style>
</head>
<body>

<div class="skeleton-page" id="skeletonPage">
  <div class="skeleton-header">
    <div class="skeleton skeleton--avatar"></div>
    <div class="skeleton-header-text">
      <div class="skeleton skeleton--title"></div>
      <div class="skeleton skeleton--text-short"></div>
    </div>
  </div>
  <div class="skeleton skeleton--image"></div>
  <div class="skeleton skeleton--text"></div>
  <div class="skeleton skeleton--text"></div>
  <div class="skeleton skeleton--text-short"></div>
</div>

<div class="real-content" id="realContent">
  <h1>Article Title Here</h1>
  <p>This is the real content that was loading behind the skeleton placeholder. The shimmer animation gave the user a sense of progress while data was being fetched.</p>
  <p>Skeleton screens improve perceived performance by showing the layout structure before content arrives.</p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  // Simulate loading delay
  setTimeout(() => {
    const skeleton = document.getElementById('skeletonPage');
    const content = document.getElementById('realContent');

    gsap.to(skeleton, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        skeleton.style.display = 'none';
        content.style.display = 'block';
        gsap.to(content, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  }, 2500);
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Shimmer speed | `1.5s` | CSS animation duration |
| Shimmer highlight | `rgba(255,255,255,0.04)` | Sweep brightness |
| Skeleton bg | `rgba(255,255,255,0.05)` | Placeholder base color |
| Simulate delay | `2500ms` | Replace with real data fetch |
| Shapes | avatar, title, text, image | Composable skeleton blocks |

---

## Preset 5 — Curtain Lift

Colored panels slide up sequentially to reveal the content beneath.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Curtain Lift</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }

  .curtain-container {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    pointer-events: none;
  }

  .curtain-panel {
    flex: 1;
    height: 100%;
    will-change: transform;
  }

  .curtain-panel:nth-child(1) { background: #0f0f0f; }
  .curtain-panel:nth-child(2) { background: #141414; }
  .curtain-panel:nth-child(3) { background: #191919; }
  .curtain-panel:nth-child(4) { background: #1e1e1e; }
  .curtain-panel:nth-child(5) { background: #232323; }

  .page-content {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
</style>
</head>
<body>

<div class="curtain-container" id="curtains">
  <div class="curtain-panel"></div>
  <div class="curtain-panel"></div>
  <div class="curtain-panel"></div>
  <div class="curtain-panel"></div>
  <div class="curtain-panel"></div>
</div>

<div class="page-content">Content Revealed</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const panels = document.querySelectorAll('.curtain-panel');

  gsap.to(panels, {
    y: '-100%',
    duration: 0.8,
    ease: 'power3.inOut',
    stagger: 0.1,
    delay: 0.5,
    onComplete: () => {
      document.getElementById('curtains').remove();
      document.body.style.overflow = 'auto';
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Number of panels | `5` | More panels = more granular |
| Direction | `y: '-100%'` (up) | Change to `'100%'` for down |
| Stagger | `0.1s` | Delay between each panel |
| Duration | `0.8s` | Per-panel animation |
| Start delay | `0.5s` | Wait before curtain lifts |
| Panel colors | Gradient of grays | Configurable |

---

## Preset 6 — Particle Gather

Scattered particles converge to form content, then dissolve to reveal the page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Particle Gather</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }

  .particle-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #0a0a0a;
  }

  .particle-canvas {
    width: 100%;
    height: 100%;
  }

  .page-content {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    opacity: 0;
  }
</style>
</head>
<body>

<div class="particle-overlay" id="particleOverlay">
  <canvas class="particle-canvas" id="particleCanvas"></canvas>
</div>

<div class="page-content" id="pageContent">Content Loaded</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('particleOverlay');
  const content = document.getElementById('pageContent');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const PARTICLE_COUNT = 80;
  const CENTER_X = canvas.width / 2;
  const CENTER_Y = canvas.height / 2;
  const GATHER_RADIUS = 60;

  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 200 + Math.random() * 400;
    particles.push({
      x: CENTER_X + Math.cos(angle) * dist,
      y: CENTER_Y + Math.sin(angle) * dist,
      targetX: CENTER_X + (Math.random() - 0.5) * GATHER_RADIUS,
      targetY: CENTER_Y + (Math.random() - 0.5) * GATHER_RADIUS,
      size: 2 + Math.random() * 3,
      alpha: 0.3 + Math.random() * 0.7,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(144, 224, 239, ${p.alpha})`;
      ctx.fill();
    });
  }

  draw();

  // Animate particles gathering to center
  const tl = gsap.timeline();

  particles.forEach((p, i) => {
    tl.to(p, {
      x: p.targetX,
      y: p.targetY,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: draw,
    }, i * 0.01);
  });

  // Hold briefly, then fade overlay
  tl.to({}, { duration: 0.5 });

  tl.to(overlay, {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      overlay.remove();
      document.body.style.overflow = 'auto';
    },
  });

  tl.to(content, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.4');
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Particle count | `80` | Number of dots |
| Scatter radius | `200-600px` | Starting spread |
| Gather radius | `60px` | Final cluster size |
| Particle size | `2-5px` | Dot diameter range |
| Particle color | `rgba(144, 224, 239, *)` | Accent with varying alpha |
| Gather duration | `1.5s` | Convergence speed |
| Hold time | `0.5s` | Pause at center |

---

## Dependencies (all presets)

- GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- Preset 4 (Skeleton Shimmer) can work without GSAP using CSS-only transitions
