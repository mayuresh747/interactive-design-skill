---
name: Page Transitions
category: animations
tags: [page, transition, crossfade, slide, morph, svg-mask, blur, scale, navigation, gsap]
description: >
  6 page transition presets. Crossfade, slide, shared-element morph, SVG mask
  wipe, blur-in, and scale-from-center. Each can be wired into SPA routing
  or multi-page navigation via the View Transitions API.
---

## Preset 1 — Crossfade

Old page fades out, new page fades in. The simplest page transition.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Crossfade Transition</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }
  .page {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    opacity: 0;
    transition: opacity 0.6s ease;
    pointer-events: none;
  }
  .page--active {
    opacity: 1;
    pointer-events: all;
  }
  .page h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .page p { color: rgba(255,255,255,0.4); }
  .page--a { background: #0a0a0a; }
  .page--b { background: #0f1a2e; }
  .nav-btn {
    padding: 0.8rem 2rem;
    border: 1px solid #90e0ef;
    background: transparent;
    color: #90e0ef;
    font-size: 1rem;
    border-radius: 100px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .nav-btn:hover { background: #90e0ef; color: #0a0a0a; }
</style>
</head>
<body>

<div class="page page--a page--active" id="pageA">
  <h1>Page A</h1>
  <p>The origin page with a crossfade transition.</p>
  <button class="nav-btn" onclick="crossfadeTo('pageB', 'pageA')">Go to Page B</button>
</div>

<div class="page page--b" id="pageB">
  <h1>Page B</h1>
  <p>The destination page.</p>
  <button class="nav-btn" onclick="crossfadeTo('pageA', 'pageB')">Back to Page A</button>
</div>

<script>
  /**
   * crossfadeTo — fades out current page, fades in target.
   * @param {string} showId — ID of page to show
   * @param {string} hideId — ID of page to hide
   * @param {number} duration — transition time in ms (default 600)
   */
  function crossfadeTo(showId, hideId, duration = 600) {
    const show = document.getElementById(showId);
    const hide = document.getElementById(hideId);

    hide.classList.remove('page--active');

    setTimeout(() => {
      show.classList.add('page--active');
    }, duration * 0.4); // Overlap slightly for smoother feel
  }
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Duration | `0.6s` | CSS transition-duration on `.page` |
| Overlap | `40%` | Incoming page starts before outgoing fully fades |
| Ease | `ease` | CSS easing |

---

## Preset 2 — Slide

Old page slides out, new page slides in from the opposite side.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Slide Transition</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }
  .page {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    will-change: transform;
  }
  .page h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .page--a { background: #0a0a0a; }
  .page--b { background: #0f1a2e; transform: translateX(100%); }
  .nav-btn {
    padding: 0.8rem 2rem;
    border: 1px solid #90e0ef;
    background: transparent;
    color: #90e0ef;
    font-size: 1rem;
    border-radius: 100px;
    cursor: pointer;
  }
  .nav-btn:hover { background: #90e0ef; color: #0a0a0a; }
</style>
</head>
<body>

<div class="page page--a" id="slideA">
  <h1>Page A</h1>
  <button class="nav-btn" onclick="slideTo('slideB', 'slideA', 'left')">Slide to B &rarr;</button>
</div>

<div class="page page--b" id="slideB">
  <h1>Page B</h1>
  <button class="nav-btn" onclick="slideTo('slideA', 'slideB', 'right')">&larr; Slide to A</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  /**
   * slideTo — slides pages horizontally.
   * @param {string} showId    — incoming page
   * @param {string} hideId    — outgoing page
   * @param {string} direction — 'left' or 'right'
   */
  function slideTo(showId, hideId, direction = 'left') {
    const show = document.getElementById(showId);
    const hide = document.getElementById(hideId);
    const dir = direction === 'left' ? 1 : -1;

    // Position incoming page off-screen
    gsap.set(show, { x: dir * window.innerWidth });

    // Animate both simultaneously
    gsap.to(hide, {
      x: -dir * window.innerWidth,
      duration: 0.7,
      ease: 'power3.inOut',
    });

    gsap.to(show, {
      x: 0,
      duration: 0.7,
      ease: 'power3.inOut',
    });
  }
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Direction | `'left'` or `'right'` | Slide direction |
| Duration | `0.7s` | Transition speed |
| Ease | `power3.inOut` | Smooth acceleration/deceleration |

---

## Preset 3 — Shared Element Morph

A "shared" element (card, image, title) morphs its position and size between pages using FLIP.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Morph Transition</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }
  .page {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
  }
  .page--hidden { opacity: 0; pointer-events: none; }
  .page--a { background: #0a0a0a; }
  .page--b { background: #0f1a2e; }
  .morph-box {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #90e0ef, #c77dff);
    border-radius: 12px;
    cursor: pointer;
    will-change: transform;
  }
  .morph-box--expanded {
    width: 400px;
    height: 300px;
    border-radius: 16px;
  }
  .page p { color: rgba(255,255,255,0.4); font-size: 0.875rem; }
</style>
</head>
<body>

<div class="page page--a" id="morphPageA">
  <p>Click the box to morph</p>
  <div class="morph-box" id="morphBox" onclick="morphExpand()"></div>
</div>

<div class="page page--b page--hidden" id="morphPageB">
  <div class="morph-box morph-box--expanded" id="morphBoxExpanded" onclick="morphCollapse()"></div>
  <p>Click to return</p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  function morphExpand() {
    const box = document.getElementById('morphBox');
    const expanded = document.getElementById('morphBoxExpanded');
    const pageA = document.getElementById('morphPageA');
    const pageB = document.getElementById('morphPageB');

    // FLIP: record First position
    const first = box.getBoundingClientRect();

    // Show page B, hide page A
    pageB.classList.remove('page--hidden');
    pageA.classList.add('page--hidden');

    // FLIP: record Last position
    const last = expanded.getBoundingClientRect();

    // FLIP: Invert and Play
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const dw = first.width / last.width;
    const dh = first.height / last.height;

    gsap.fromTo(expanded, {
      x: dx,
      y: dy,
      scaleX: dw,
      scaleY: dh,
      opacity: 0.8,
    }, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  function morphCollapse() {
    const box = document.getElementById('morphBox');
    const expanded = document.getElementById('morphBoxExpanded');
    const pageA = document.getElementById('morphPageA');
    const pageB = document.getElementById('morphPageB');

    const first = expanded.getBoundingClientRect();
    pageA.classList.remove('page--hidden');
    pageB.classList.add('page--hidden');
    const last = box.getBoundingClientRect();

    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const dw = first.width / last.width;
    const dh = first.height / last.height;

    gsap.fromTo(box, {
      x: dx,
      y: dy,
      scaleX: dw,
      scaleY: dh,
    }, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Duration | `0.6s` | Morph animation speed |
| Ease | `power3.out` | GSAP easing |
| Technique | FLIP (First, Last, Invert, Play) | Manual FLIP approach |

---

## Preset 4 — SVG Mask Wipe

An SVG circle (or shape) expands as a mask to reveal the new page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SVG Mask Wipe</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }
  .page {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
  }
  .page h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .page--a { background: #0a0a0a; z-index: 1; }
  .page--b { background: #1a1a2e; z-index: 2; }
  .mask-overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    pointer-events: none;
  }
  .mask-overlay svg {
    width: 100%;
    height: 100%;
  }
  .nav-btn {
    padding: 0.8rem 2rem;
    border: 1px solid #90e0ef;
    background: transparent;
    color: #90e0ef;
    font-size: 1rem;
    border-radius: 100px;
    cursor: pointer;
    z-index: 5;
    position: relative;
  }
  .nav-btn:hover { background: #90e0ef; color: #0a0a0a; }
</style>
</head>
<body>

<div class="page page--a" id="maskPageA">
  <h1>Page A</h1>
  <button class="nav-btn" id="maskTrigger">Reveal Page B</button>
</div>

<div class="page page--b" id="maskPageB" style="clip-path: circle(0% at 50% 50%);">
  <h1>Page B</h1>
  <button class="nav-btn" id="maskBack">Back to A</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  document.getElementById('maskTrigger').addEventListener('click', function(e) {
    const pageB = document.getElementById('maskPageB');
    const rect = this.getBoundingClientRect();
    const cx = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const cy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    pageB.style.clipPath = `circle(0% at ${cx}% ${cy}%)`;

    gsap.to(pageB, {
      clipPath: `circle(150% at ${cx}% ${cy}%)`,
      duration: 1,
      ease: 'power2.inOut',
    });
  });

  document.getElementById('maskBack').addEventListener('click', function(e) {
    const pageB = document.getElementById('maskPageB');
    const rect = this.getBoundingClientRect();
    const cx = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const cy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    gsap.to(pageB, {
      clipPath: `circle(0% at ${cx}% ${cy}%)`,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Origin | Button center | Expand from click point |
| End radius | `150%` | Ensures full coverage |
| Duration | `1s` expand, `0.8s` collapse | Configurable |
| Ease | `power2.inOut` | Smooth acceleration |

---

## Preset 5 — Blur-In

Old page blurs out and fades, new page focuses in from blurred state.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Blur Transition</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }
  .page {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    will-change: filter, opacity;
  }
  .page h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .page--a { background: #0a0a0a; }
  .page--b { background: #1a1a2e; opacity: 0; filter: blur(20px); pointer-events: none; }
  .nav-btn {
    padding: 0.8rem 2rem;
    border: 1px solid #90e0ef;
    background: transparent;
    color: #90e0ef;
    font-size: 1rem;
    border-radius: 100px;
    cursor: pointer;
  }
  .nav-btn:hover { background: #90e0ef; color: #0a0a0a; }
</style>
</head>
<body>

<div class="page page--a" id="blurA">
  <h1>Page A</h1>
  <button class="nav-btn" onclick="blurTransition('blurB', 'blurA')">Go to B</button>
</div>

<div class="page page--b" id="blurB">
  <h1>Page B</h1>
  <button class="nav-btn" onclick="blurTransition('blurA', 'blurB')">Back to A</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  function blurTransition(showId, hideId) {
    const show = document.getElementById(showId);
    const hide = document.getElementById(hideId);

    // Blur out old page
    gsap.to(hide, {
      filter: 'blur(20px)',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        hide.style.pointerEvents = 'none';
      },
    });

    // Focus in new page
    show.style.pointerEvents = 'all';
    gsap.fromTo(show,
      { filter: 'blur(20px)', opacity: 0 },
      {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3,
      }
    );
  }
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Blur amount | `20px` | Max blur radius |
| Fade out duration | `0.5s` | Old page blur-out |
| Fade in duration | `0.6s` | New page focus-in |
| Overlap delay | `0.3s` | Delay before new page starts |

---

## Preset 6 — Scale from Center

New page expands from a center point, like zooming in.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scale from Center</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; overflow: hidden; }
  .page {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    will-change: transform, opacity;
  }
  .page h1 { font-size: clamp(2rem, 5vw, 4rem); }
  .page--a { background: #0a0a0a; }
  .page--b { background: #1a1a2e; transform: scale(0); opacity: 0; border-radius: 50%; pointer-events: none; }
  .nav-btn {
    padding: 0.8rem 2rem;
    border: 1px solid #90e0ef;
    background: transparent;
    color: #90e0ef;
    font-size: 1rem;
    border-radius: 100px;
    cursor: pointer;
  }
  .nav-btn:hover { background: #90e0ef; color: #0a0a0a; }
</style>
</head>
<body>

<div class="page page--a" id="scaleA">
  <h1>Page A</h1>
  <button class="nav-btn" onclick="scaleIn('scaleB', 'scaleA')">Zoom to B</button>
</div>

<div class="page page--b" id="scaleB">
  <h1>Page B</h1>
  <button class="nav-btn" onclick="scaleOut('scaleA', 'scaleB')">Back to A</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  function scaleIn(showId, hideId) {
    const show = document.getElementById(showId);
    const hide = document.getElementById(hideId);

    show.style.pointerEvents = 'all';

    gsap.to(hide, {
      scale: 0.9,
      opacity: 0.5,
      duration: 0.6,
      ease: 'power2.in',
    });

    gsap.fromTo(show,
      { scale: 0, opacity: 0, borderRadius: '50%' },
      {
        scale: 1,
        opacity: 1,
        borderRadius: '0%',
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          hide.style.pointerEvents = 'none';
          gsap.set(hide, { scale: 1, opacity: 1 });
        },
      }
    );
  }

  function scaleOut(showId, hideId) {
    const show = document.getElementById(showId);
    const hide = document.getElementById(hideId);

    show.style.pointerEvents = 'all';

    gsap.to(hide, {
      scale: 0,
      opacity: 0,
      borderRadius: '50%',
      duration: 0.6,
      ease: 'power2.in',
      onComplete: () => {
        hide.style.pointerEvents = 'none';
      },
    });

    gsap.fromTo(show,
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Start scale | `0` | New page starts from nothing |
| Border radius | `50%` to `0%` | Circle to rectangle morph |
| Duration in | `0.8s` | Expand duration |
| Duration out | `0.6s` | Collapse duration |
| Ease in | `power3.out` | Smooth deceleration |

---

## Dependencies

- GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` (presets 2-6)
- Preset 1 uses pure CSS transitions only
