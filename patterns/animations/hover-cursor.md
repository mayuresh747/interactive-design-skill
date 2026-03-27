---
name: Hover & Cursor Effects
category: animations
tags: [hover, cursor, magnetic, image-reveal, distortion, glow, scale, underline, tilt, interactive]
description: >
  8 hover/cursor interaction presets. Magnetic button, image reveal on hover,
  distortion ripple, custom cursor, glow trail, scale-up, underline draw,
  and card tilt toward cursor.
---

## Preset 1 — Magnetic Button

Button element subtly follows the cursor when it enters a proximity zone.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Magnetic Button</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .magnetic-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2.5rem;
    background: transparent;
    border: 1px solid #90e0ef;
    border-radius: 100px;
    color: #90e0ef;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
    will-change: transform;
  }
  .magnetic-btn:hover {
    background: #90e0ef;
    color: #0a0a0a;
  }
</style>
</head>
<body>

<a href="#" class="magnetic-btn" data-magnetic data-strength="0.3">Get Started</a>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    const strength = parseFloat(btn.dataset.strength) || 0.3;
    const ease = 'power3.out';
    const duration = 0.5;

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration,
        ease,
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration,
        ease,
      });
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Strength | `data-strength="0.3"` | 0 = none, 1 = full cursor follow |
| Duration | `0.5` | Return-to-center speed |
| Ease | `power3.out` | GSAP ease for smooth snap-back |

---

## Preset 2 — Image Reveal on Hover

An image follows the cursor when hovering over a link or text element.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Reveal on Hover</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reveal-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .reveal-item {
    position: relative;
    font-size: clamp(1.5rem, 4vw, 3rem);
    font-weight: 700;
    cursor: pointer;
    padding: 0.5rem 0;
    transition: color 0.2s;
  }
  .reveal-item:hover { color: #90e0ef; }
  .reveal-image {
    position: fixed;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.8);
    z-index: 100;
    transition: opacity 0.25s, transform 0.25s;
  }
  .reveal-image--visible {
    opacity: 1;
    transform: scale(1);
  }
</style>
</head>
<body>

<ul class="reveal-list">
  <li class="reveal-item" data-img="https://picsum.photos/600/400?random=1">Project Alpha</li>
  <li class="reveal-item" data-img="https://picsum.photos/600/400?random=2">Project Beta</li>
  <li class="reveal-item" data-img="https://picsum.photos/600/400?random=3">Project Gamma</li>
  <li class="reveal-item" data-img="https://picsum.photos/600/400?random=4">Project Delta</li>
</ul>

<img class="reveal-image" id="revealImg" src="" alt="" />

<script>
  const img = document.getElementById('revealImg');
  let mouseX = 0, mouseY = 0;
  let imgX = 0, imgY = 0;

  // Smooth follow with lerp
  function animate() {
    imgX += (mouseX - imgX) * 0.1;
    imgY += (mouseY - imgY) * 0.1;
    img.style.left = imgX + 20 + 'px';
    img.style.top = imgY - 100 + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.querySelectorAll('.reveal-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      img.src = item.dataset.img;
      img.classList.add('reveal-image--visible');
    });

    item.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    item.addEventListener('mouseleave', () => {
      img.classList.remove('reveal-image--visible');
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Image source | `data-img` attribute | URL per item |
| Image size | `300px x 200px` | CSS width/height |
| Lerp factor | `0.1` | 0-1, higher = snappier follow |
| Offset | `+20px, -100px` | Image position relative to cursor |

---

## Preset 3 — Distortion / Ripple Effect

Hover causes a CSS ripple distortion over an image using filter.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Distortion Effect</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .distort-card {
    width: 400px;
    height: 300px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .distort-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                filter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .distort-card:hover .distort-card__img {
    transform: scale(1.08);
    filter: saturate(1.2) contrast(1.1);
  }
  .distort-card__overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mx) var(--my),
      rgba(144, 224, 239, 0.15) 0%,
      transparent 50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .distort-card:hover .distort-card__overlay {
    opacity: 1;
  }
</style>
</head>
<body>

<div class="distort-card" id="distortCard">
  <img class="distort-card__img" src="https://picsum.photos/800/600?random=5" alt="Sample" />
  <div class="distort-card__overlay" id="distortOverlay"></div>
</div>

<script>
  const card = document.getElementById('distortCard');
  const overlay = document.getElementById('distortOverlay');

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    overlay.style.setProperty('--mx', x + '%');
    overlay.style.setProperty('--my', y + '%');
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Glow color | `rgba(144, 224, 239, 0.15)` | Radial gradient color |
| Scale on hover | `1.08` | Image zoom amount |
| Transition speed | `0.6s` | CSS transition duration |

---

## Preset 4 — Custom Cursor

A dot + ring cursor that replaces the default and scales on interactive elements.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Custom Cursor</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; cursor: none; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    background: #90e0ef;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s, background 0.15s;
  }
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(144, 224, 239, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                width 0.3s, height 0.3s, border-color 0.3s;
  }
  .cursor-dot--active {
    transform: translate(-50%, -50%) scale(0.5);
    background: #fff;
  }
  .cursor-ring--active {
    width: 60px;
    height: 60px;
    border-color: rgba(255, 255, 255, 0.3);
  }
  a, button { cursor: none; }
  .demo-link {
    font-size: 1.5rem;
    color: #90e0ef;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
  .demo-btn {
    padding: 0.8rem 2rem;
    border: 1px solid #90e0ef;
    background: transparent;
    color: #90e0ef;
    font-size: 1rem;
    border-radius: 100px;
  }
  p { font-size: 1.25rem; color: rgba(255,255,255,0.3); }
</style>
</head>
<body>

<div class="cursor-dot" id="cursorDot"></div>
<div class="cursor-ring" id="cursorRing"></div>

<p>Move your cursor around</p>
<a href="#" class="demo-link" data-cursor-active>Hover this link</a>
<button class="demo-btn" data-cursor-active>Or this button</button>

<script>
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX - 4 + 'px';
    dot.style.top = mouseY - 4 + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX - 20 + 'px';
    ring.style.top = ringY - 20 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Scale up on interactive elements
  document.querySelectorAll('[data-cursor-active], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('cursor-dot--active');
      ring.classList.add('cursor-ring--active');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('cursor-dot--active');
      ring.classList.remove('cursor-ring--active');
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Dot size | `8px` | Inner dot diameter |
| Ring size | `40px` / `60px` active | Outer ring diameter |
| Dot color | `#90e0ef` | Accent color |
| Ring border | `1px solid rgba(144,224,239,0.5)` | Outer ring stroke |
| Ring lerp | `0.15` | Follow smoothness (0-1) |
| Active trigger | `[data-cursor-active]`, `a`, `button` | Auto-targets interactive elements |

---

## Preset 5 — Glow Trail

Cursor leaves a glowing trail of fading dots.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Glow Trail</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: rgba(255,255,255,0.2);
  }
  .trail-dot {
    position: fixed;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(144,224,239,0.8), transparent);
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    will-change: transform, opacity;
  }
</style>
</head>
<body>

<p>Move your cursor to see the glow trail</p>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const TRAIL_COUNT = 20;
  const TRAIL_COLOR = 'rgba(144, 224, 239, 0.8)';
  const TRAIL_SIZE = 12;
  const TRAIL_FADE_DURATION = 0.8;

  const dots = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    document.body.appendChild(dot);
    dots.push(dot);
  }

  let currentDot = 0;
  let lastX = 0, lastY = 0;

  document.addEventListener('mousemove', e => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.abs(dx) + Math.abs(dy) < 5) return; // throttle

    lastX = e.clientX;
    lastY = e.clientY;

    const dot = dots[currentDot % TRAIL_COUNT];
    dot.style.left = e.clientX - TRAIL_SIZE / 2 + 'px';
    dot.style.top = e.clientY - TRAIL_SIZE / 2 + 'px';

    gsap.fromTo(dot,
      { opacity: 0.8, scale: 1 },
      { opacity: 0, scale: 0.2, duration: TRAIL_FADE_DURATION, ease: 'power2.out' }
    );

    currentDot++;
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Trail count | `20` | Number of dot elements pooled |
| Trail color | `rgba(144, 224, 239, 0.8)` | Glow color |
| Trail size | `12px` | Dot diameter |
| Fade duration | `0.8s` | How long each dot fades |
| Movement threshold | `5px` | Min movement to spawn dot |

---

## Preset 6 — Scale-Up with Spring

Element scales to 1.05 with spring easing on hover.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scale-Up</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 2rem;
  }
  .scale-card {
    width: 280px;
    padding: 2rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    text-align: center;
    will-change: transform;
    cursor: pointer;
  }
  .scale-card h3 { margin-bottom: 0.5rem; }
  .scale-card p { font-size: 0.875rem; color: rgba(255,255,255,0.5); }
</style>
</head>
<body>

<div class="scale-card" data-scale>
  <h3>Card One</h3>
  <p>Hover to see the spring scale effect.</p>
</div>
<div class="scale-card" data-scale>
  <h3>Card Two</h3>
  <p>Smooth and satisfying micro-interaction.</p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  document.querySelectorAll('[data-scale]').forEach(el => {
    const scale = parseFloat(el.dataset.scale) || 1.05;

    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        scale,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Scale amount | `1.05` | Via `data-scale` or default |
| Duration in | `0.4s` | Hover enter |
| Duration out | `0.3s` | Hover leave |
| Ease in | `back.out(1.7)` | Spring overshoot |
| Ease out | `power2.out` | Smooth return |

---

## Preset 7 — Underline Draw

A line draws from left to right under the text on hover.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Underline Draw</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }
  .underline-link {
    position: relative;
    display: inline-block;
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    padding-bottom: 4px;
  }
  .underline-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #90e0ef;
    transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .underline-link:hover::after {
    width: 100%;
  }
  /* Variant: right-to-left on leave */
  .underline-link--rtl::after {
    right: 0;
    left: auto;
  }
  .underline-link--rtl:hover::after {
    width: 100%;
  }
  /* Variant: center outward */
  .underline-link--center::after {
    left: 50%;
    transform: translateX(-50%);
  }
</style>
</head>
<body>

<a href="#" class="underline-link">Left to Right</a>
<a href="#" class="underline-link underline-link--rtl">Right to Left</a>
<a href="#" class="underline-link underline-link--center">Center Outward</a>

</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Line color | `#90e0ef` | Underline color |
| Line height | `2px` | Underline thickness |
| Duration | `0.35s` | CSS transition |
| Direction | Left-to-right | Add `--rtl` or `--center` class |

---

## Preset 8 — Card Tilt

Card tilts toward the cursor position using 3D transforms.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Card Tilt</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #fff;
    font-family: system-ui, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
  }
  .tilt-card {
    width: 350px;
    height: 250px;
    background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out, box-shadow 0.3s;
    will-change: transform;
  }
  .tilt-card:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }
  .tilt-card__shine {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%),
      rgba(255,255,255,0.08), transparent 60%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tilt-card:hover .tilt-card__shine {
    opacity: 1;
  }
</style>
</head>
<body>

<div class="tilt-card" id="tiltCard">
  Tilt Me
  <div class="tilt-card__shine" id="tiltShine"></div>
</div>

<script>
  const card = document.getElementById('tiltCard');
  const shine = document.getElementById('tiltShine');
  const MAX_TILT = 15; // degrees

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 to 1
    const y = (e.clientY - rect.top) / rect.height;   // 0 to 1

    const rotateY = (x - 0.5) * MAX_TILT * 2;  // -15 to 15
    const rotateX = (0.5 - y) * MAX_TILT * 2;  // -15 to 15

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    shine.style.setProperty('--shine-x', (x * 100) + '%');
    shine.style.setProperty('--shine-y', (y * 100) + '%');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Max tilt | `15` degrees | Maximum rotation angle |
| Shine | On | Radial highlight follows cursor |
| Perspective | `1000px` | On parent/body — lower = more dramatic |
| Reset on leave | Yes | Returns to flat |

---

## Dependencies

- Presets 1, 5, 6: GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- Presets 2, 3, 4, 7, 8: No dependencies (vanilla JS + CSS)
