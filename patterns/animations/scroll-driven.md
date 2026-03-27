---
name: Scroll-Driven Animations
category: animations
tags: [scroll, parallax, gsap, scrolltrigger, scrub, horizontal, sticky, clip-path, counter, color]
description: >
  8 scroll animation presets using GSAP ScrollTrigger. Parallax layers, progress
  scrub, horizontal scroll, cinematic zoom, sticky reveal, clip-path transition,
  counter animation, and scroll-linked color change.
---

## Preset 1 — Parallax Layers

Different elements move at different speeds as the user scrolls, creating depth.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Parallax Layers</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow-x: hidden; }
  .parallax-scene {
    position: relative;
    height: 200vh;
    overflow: hidden;
  }
  .parallax-layer {
    position: absolute;
    width: 100%;
    text-align: center;
    font-weight: 700;
    will-change: transform;
  }
  .layer-back {
    top: 30%;
    font-size: clamp(4rem, 12vw, 10rem);
    color: rgba(255,255,255,0.05);
  }
  .layer-mid {
    top: 40%;
    font-size: clamp(2rem, 6vw, 5rem);
    color: rgba(144,224,239,0.3);
  }
  .layer-front {
    top: 50%;
    font-size: clamp(1.5rem, 4vw, 3rem);
    color: #ffffff;
  }
</style>
</head>
<body>
<section class="parallax-scene">
  <div class="parallax-layer layer-back">DEPTH</div>
  <div class="parallax-layer layer-mid">LAYERS</div>
  <div class="parallax-layer layer-front">PARALLAX</div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  // Each layer moves at a different speed relative to scroll
  gsap.to('.layer-back', {
    y: -200,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-scene',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.layer-mid', {
    y: -400,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-scene',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.layer-front', {
    y: -600,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-scene',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Back layer speed | `y: -200` | Slowest / farthest |
| Mid layer speed | `y: -400` | Middle depth |
| Front layer speed | `y: -600` | Fastest / nearest |
| Scrub | `true` | Ties directly to scroll position |

---

## Preset 2 — Progress Scrub

An element property (width, rotation, opacity, etc.) is tied to scroll percentage.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Progress Scrub</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; min-height: 300vh; }
  .progress-section {
    height: 200vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #90e0ef, #c77dff);
    z-index: 9999;
  }
  .progress-box {
    width: 120px;
    height: 120px;
    background: #90e0ef;
    border-radius: 12px;
  }
</style>
</head>
<body>
<div class="progress-bar" id="progressBar"></div>
<section class="progress-section">
  <div class="progress-box" id="progressBox"></div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  // Progress bar width tied to overall page scroll
  gsap.to('#progressBar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });

  // Box rotation tied to section scroll
  gsap.to('#progressBox', {
    rotation: 360,
    scale: 1.5,
    borderRadius: '50%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.progress-section',
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5,
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Progress bar scrub | `0.3` | Smooth catchup time in seconds |
| Box rotation | `360` | Degrees over scroll range |
| Box scale | `1.5` | End scale |

---

## Preset 3 — Horizontal Scroll

Vertical scroll drives horizontal movement of a wide container.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Horizontal Scroll</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow-x: hidden; }
  .h-scroll-wrapper {
    overflow: hidden;
  }
  .h-scroll-track {
    display: flex;
    width: fit-content;
  }
  .h-scroll-panel {
    width: 100vw;
    height: 100vh;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
  }
  .h-scroll-panel:nth-child(1) { background: #0f0f0f; }
  .h-scroll-panel:nth-child(2) { background: #141428; }
  .h-scroll-panel:nth-child(3) { background: #1a2a1a; }
  .h-scroll-panel:nth-child(4) { background: #2a1a1a; }
  .spacer { height: 50vh; }
</style>
</head>
<body>
<div class="spacer"></div>
<section class="h-scroll-wrapper" id="hScroll">
  <div class="h-scroll-track" id="hTrack">
    <div class="h-scroll-panel">Panel One</div>
    <div class="h-scroll-panel">Panel Two</div>
    <div class="h-scroll-panel">Panel Three</div>
    <div class="h-scroll-panel">Panel Four</div>
  </div>
</section>
<div class="spacer"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  const track = document.getElementById('hTrack');
  const panels = track.querySelectorAll('.h-scroll-panel');
  const totalWidth = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hScroll',
      start: 'top top',
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Number of panels | `4` | Add more `.h-scroll-panel` divs |
| Scrub smoothness | `1` | Seconds of smooth catchup |
| Pin | `true` | Section pins during scroll |

---

## Preset 4 — Cinematic Zoom

An image scales from a small centered frame to full viewport as you scroll.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cinematic Zoom</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }
  .zoom-section {
    height: 300vh;
    position: relative;
  }
  .zoom-container {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .zoom-image {
    width: 30vw;
    height: 40vh;
    background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    will-change: transform, border-radius;
  }
  .spacer { height: 50vh; }
</style>
</head>
<body>
<div class="spacer"></div>
<section class="zoom-section" id="zoomSection">
  <div class="zoom-container">
    <div class="zoom-image" id="zoomImage">Image</div>
  </div>
</section>
<div class="spacer"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  // Calculate scale needed to fill viewport
  const img = document.getElementById('zoomImage');
  const scaleX = window.innerWidth / img.offsetWidth;
  const scaleY = window.innerHeight / img.offsetHeight;
  const targetScale = Math.max(scaleX, scaleY) * 1.05;

  gsap.to(img, {
    scale: targetScale,
    borderRadius: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#zoomSection',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Start size | `30vw x 40vh` | Initial image dimensions |
| Border radius | `12px` to `0` | Rounds to sharp |
| Scale target | auto-calculated | Fills viewport |
| Scrub | `0.5` | Smooth catchup |

---

## Preset 5 — Sticky Reveal

Content pins in place and items reveal one by one within the pinned container.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sticky Reveal</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }
  .sticky-section { height: 400vh; position: relative; }
  .sticky-container {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .reveal-stack {
    position: relative;
    width: 600px;
    max-width: 90vw;
  }
  .reveal-card {
    padding: 2rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(30px);
  }
  .reveal-card h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .reveal-card p {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.5;
  }
  .spacer { height: 50vh; }
</style>
</head>
<body>
<div class="spacer"></div>
<section class="sticky-section" id="stickySection">
  <div class="sticky-container">
    <div class="reveal-stack">
      <div class="reveal-card"><h3>Step 1</h3><p>Define the problem space and gather requirements.</p></div>
      <div class="reveal-card"><h3>Step 2</h3><p>Research, prototype, and test assumptions quickly.</p></div>
      <div class="reveal-card"><h3>Step 3</h3><p>Build the solution with iterative feedback loops.</p></div>
      <div class="reveal-card"><h3>Step 4</h3><p>Ship, measure, learn, and improve continuously.</p></div>
    </div>
  </div>
</section>
<div class="spacer"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll('.reveal-card');
  const sectionHeight = 400; // vh

  cards.forEach((card, i) => {
    const startPct = (i / cards.length) * 100;
    const endPct = ((i + 0.5) / cards.length) * 100;

    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#stickySection',
        start: `${startPct}% center`,
        end: `${endPct}% center`,
        toggleActions: 'play none none reverse',
      },
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Section height | `400vh` | More height = slower reveal |
| Card Y offset | `30px` | Starting offset |
| Ease | `power2.out` | GSAP ease |
| Reverse on scroll up | Yes | `toggleActions: 'play none none reverse'` |

---

## Preset 6 — Clip-Path Transition

Sections transition using animated clip-path, like a wipe or iris.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Clip-Path Transition</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }
  .clip-wrapper {
    position: relative;
    height: 300vh;
  }
  .clip-container {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }
  .clip-panel {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
  }
  .clip-panel--base { background: #0f0f0f; }
  .clip-panel--reveal {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    clip-path: circle(0% at 50% 50%);
  }
  .spacer { height: 50vh; }
</style>
</head>
<body>
<div class="spacer"></div>
<section class="clip-wrapper" id="clipWrapper">
  <div class="clip-container">
    <div class="clip-panel clip-panel--base">Section One</div>
    <div class="clip-panel clip-panel--reveal" id="clipReveal">Section Two</div>
  </div>
</section>
<div class="spacer"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('#clipReveal', {
    clipPath: 'circle(150% at 50% 50%)',
    ease: 'none',
    scrollTrigger: {
      trigger: '#clipWrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Start clip | `circle(0% at 50% 50%)` | Fully hidden |
| End clip | `circle(150% at 50% 50%)` | Fully revealed |
| Shape variants | `inset()`, `polygon()`, `ellipse()` | Any CSS clip-path |

---

## Preset 7 — Counter Animation

Numbers count up from 0 to a target value as the section scrolls into view.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Counter Animation</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; min-height: 200vh; }
  .counter-section {
    padding: 6rem 2rem;
    display: flex;
    justify-content: center;
    gap: 4rem;
    flex-wrap: wrap;
    margin-top: 80vh;
  }
  .counter-item { text-align: center; }
  .counter-value {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    color: #90e0ef;
  }
  .counter-label {
    font-size: 0.875rem;
    color: rgba(255,255,255,0.4);
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
</style>
</head>
<body>
<section class="counter-section" id="counterSection">
  <div class="counter-item">
    <div class="counter-value" data-target="1250" data-suffix="+">0</div>
    <div class="counter-label">Projects</div>
  </div>
  <div class="counter-item">
    <div class="counter-value" data-target="98" data-suffix="%">0</div>
    <div class="counter-label">Satisfaction</div>
  </div>
  <div class="counter-item">
    <div class="counter-value" data-target="47" data-prefix="" data-suffix="M">0</div>
    <div class="counter-label">Users</div>
  </div>
  <div class="counter-item">
    <div class="counter-value" data-target="12" data-suffix="">0</div>
    <div class="counter-label">Awards</div>
  </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.counter-value').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
      },
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Target value | `data-target` | Integer to count to |
| Prefix | `data-prefix` | Text before number (e.g., `$`) |
| Suffix | `data-suffix` | Text after number (e.g., `%`, `+`, `M`) |
| Duration | `2` | Seconds for count |
| Ease | `power2.out` | Decelerating count |

---

## Preset 8 — Scroll-Linked Color Change

Background color transitions smoothly as the user scrolls through sections.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Color Change</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: system-ui, sans-serif;
    color: #fff;
    background: #0a0a0a;
    transition: background 0.1s;
  }
  .color-section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
  }
</style>
</head>
<body id="colorBody">
<section class="color-section" data-bg="#0a0a0a">Midnight</section>
<section class="color-section" data-bg="#1a1a2e">Deep Blue</section>
<section class="color-section" data-bg="#16213e">Navy</section>
<section class="color-section" data-bg="#0f3460">Royal</section>
<section class="color-section" data-bg="#533483">Purple</section>
<section class="color-section" data-bg="#e94560">Crimson</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.color-section').forEach(section => {
    const bg = section.dataset.bg;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => gsap.to('body', { background: bg, duration: 0.5 }),
      onEnterBack: () => gsap.to('body', { background: bg, duration: 0.5 }),
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Section colors | `data-bg` attribute | Any CSS color |
| Transition duration | `0.5` | Seconds for color blend |
| Trigger point | `top center` / `bottom center` | When section hits middle |

---

## Dependencies (all presets)

- GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- ScrollTrigger — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
