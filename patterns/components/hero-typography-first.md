---
name: Typography-First Hero
category: components
tags: [hero, typography, split-text, stagger, gsap, gradient]
description: >
  Full viewport height. Massive headline (120px+) with split-letter
  stagger animation on load. Subtle gradient background. Scroll
  indicator at bottom with bounce animation. Uses manual character
  splitting for a GSAP SplitText-like approach.
---

## Preview

The entire viewport is filled with a subtle dark gradient. A massive headline (120px or larger) dominates center-screen. On load, each letter of the headline animates in individually -- sliding up from below with staggered timing, creating a wave-like reveal. A small subtitle fades in after the headline completes. At the very bottom, a scroll indicator (downward chevron or line) bounces gently to invite scrolling.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Typography-First Hero</title>
<style>
  :root {
    --bg: #0a0a0a;
    --bg-gradient-end: #111827;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      160deg,
      var(--bg) 0%,
      var(--bg-gradient-end) 50%,
      var(--bg) 100%
    );
    overflow: hidden;
  }

  /* Headline */
  .hero__headline {
    font-size: clamp(3rem, 12vw, 10rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
  }

  .hero__headline .word {
    display: inline-block;
    margin: 0 0.15em;
  }

  .hero__headline .char {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%) rotateX(-80deg);
    transform-origin: bottom center;
  }

  /* Subtitle */
  .hero__subtitle {
    margin-top: 1.5rem;
    font-size: clamp(1rem, 2vw, 1.5rem);
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-1);
    opacity: 0;
  }

  /* Scroll indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
  }

  .scroll-indicator__label {
    font-size: 0.6875rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }

  .scroll-indicator__line {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
  }

  .scroll-indicator__line::after {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--accent-1);
    animation: scrollBounce 1.8s ease-in-out infinite;
  }

  @keyframes scrollBounce {
    0% { top: -100%; }
    50% { top: 100%; }
    100% { top: -100%; }
  }

  /* ---------- BELOW FOLD ---------- */
  .below-fold {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    opacity: 0.1;
    padding: 2rem;
    text-align: center;
  }
</style>
</head>
<body>

<section class="hero">
  <h1 class="hero__headline" id="headline">Creative Studio</h1>
  <p class="hero__subtitle" id="subtitle">Design that moves</p>
  <div class="scroll-indicator" id="scrollIndicator">
    <span class="scroll-indicator__label">Scroll</span>
    <div class="scroll-indicator__line"></div>
  </div>
</section>

<div class="below-fold">Content below the fold</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  // --- Split text into chars ---
  function splitText(el) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = '';

    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';

      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);
      // Add space between words (not after last)
      if (wi < words.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }
    });
  }

  const headline = document.getElementById('headline');
  splitText(headline);
  const chars = headline.querySelectorAll('.char');

  // --- Animate ---
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to(chars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.8,
    stagger: 0.035
  })
  .to('#subtitle', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .to('#scrollIndicator', {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.2');
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Notes |
|---|---|---|---|
| Background start | `--bg` | `#0a0a0a` | Gradient edge color |
| Background mid | `--bg-gradient-end` | `#111827` | Gradient center color |
| Text color | `--text` | `#ffffff` | Headline |
| Subtitle color | `--accent-1` | `#90e0ef` | Subtitle text |
| Headline font size | CSS `clamp()` | `3rem - 10rem` | Responsive |
| Stagger delay | JS `stagger` | `0.035s` | Per-character delay |
| Char entry distance | CSS `translateY` | `100%` | How far chars travel |
| Char rotation | CSS `rotateX` | `-80deg` | 3D flip on entry |
| Bounce animation | CSS `@keyframes` | `1.8s` | Scroll indicator cycle |

---

## Dependencies

- **GSAP 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
