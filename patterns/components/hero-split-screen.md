---
name: Split-Screen Hero
category: components
tags: [hero, split-screen, parallax, gsap, scroll-trigger, stagger]
description: >
  Viewport split 50/50. Left: text content with staggered reveal.
  Right: large image/visual with parallax. On scroll, the split slides --
  image grows, text compresses. Uses GSAP ScrollTrigger.
---

## Preview

The viewport divides into two equal halves. The left half contains a headline, body text, and a CTA button that stagger in from the left on load. The right half holds a large image (or placeholder gradient) with a subtle parallax shift. As the user scrolls, the split point slides leftward -- the image panel grows to occupy more of the viewport while the text panel compresses and fades. This creates a cinematic transition from text-focused to image-focused.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Split-Screen Hero</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
    --split-ratio: 50%;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  /* ---------- HERO CONTAINER ---------- */
  .hero {
    position: relative;
    width: 100%;
    height: 200vh; /* scroll canvas */
  }

  .hero__sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
  }

  /* ---------- LEFT PANEL (TEXT) ---------- */
  .hero__text {
    flex: 0 0 var(--split-ratio);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem clamp(2rem, 5vw, 6rem);
    background: var(--bg);
    z-index: 1;
    overflow: hidden;
  }

  .hero__tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-1);
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateX(-30px);
  }

  .hero__title {
    font-size: clamp(2rem, 4.5vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.08;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateX(-40px);
  }

  .hero__body {
    font-size: clamp(0.95rem, 1.3vw, 1.125rem);
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.55);
    max-width: 480px;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateX(-40px);
  }

  .hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.75rem;
    background: transparent;
    border: 1.5px solid var(--accent-1);
    color: var(--accent-1);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-decoration: none;
    border-radius: 100px;
    opacity: 0;
    transform: translateX(-30px);
    transition: background 0.25s, color 0.25s;
    width: fit-content;
  }

  .hero__cta:hover {
    background: var(--accent-1);
    color: var(--bg);
  }

  .hero__cta svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ---------- RIGHT PANEL (IMAGE) ---------- */
  .hero__image {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .hero__image-inner {
    width: 100%;
    height: 120%; /* extra for parallax */
    background: linear-gradient(
      135deg,
      #1a1a2e 0%,
      #16213e 30%,
      #0f3460 60%,
      #533483 100%
    );
    background-size: cover;
    transform: translateY(0);
  }

  /* ---------- BELOW FOLD ---------- */
  .below-fold {
    position: relative;
    z-index: 2;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    opacity: 0.15;
    padding: 2rem;
    text-align: center;
  }

  /* ---------- MOBILE ---------- */
  @media (max-width: 768px) {
    .hero__sticky {
      flex-direction: column;
    }
    .hero__text {
      flex: 0 0 50vh;
      padding: 3rem 1.5rem;
    }
    .hero__image {
      flex: 0 0 50vh;
    }
  }
</style>
</head>
<body>

<section class="hero" id="hero">
  <div class="hero__sticky" id="heroSticky">
    <div class="hero__text" id="heroText">
      <span class="hero__tag" id="heroTag">Digital Experience</span>
      <h1 class="hero__title" id="heroTitle">Designs That Command Attention</h1>
      <p class="hero__body" id="heroBody">
        We craft immersive digital experiences where every pixel serves a purpose
        and every interaction tells a story.
      </p>
      <a href="#" class="hero__cta" id="heroCta">
        View Work
        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
    <div class="hero__image" id="heroImage">
      <div class="hero__image-inner" id="heroImageInner"></div>
    </div>
  </div>
</section>

<div class="below-fold">Content continues here</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  // --- Entry animation (staggered text reveal) ---
  const entryTL = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

  entryTL
    .to('#heroTag', { opacity: 1, x: 0 }, 0.2)
    .to('#heroTitle', { opacity: 1, x: 0 }, 0.35)
    .to('#heroBody', { opacity: 1, x: 0 }, 0.5)
    .to('#heroCta', { opacity: 1, x: 0 }, 0.65);

  // --- Scroll: image grows, text compresses ---
  const scrollTL = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: false
    }
  });

  // Compress text panel
  scrollTL.to('#heroText', {
    flexBasis: '15%',
    opacity: 0,
    duration: 1,
    ease: 'none'
  }, 0);

  // Parallax on image
  scrollTL.to('#heroImageInner', {
    y: '-10%',
    duration: 1,
    ease: 'none'
  }, 0);

  // --- Image parallax on mouse (subtle) ---
  const imgInner = document.getElementById('heroImageInner');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    gsap.to(imgInner, {
      x: x,
      y: y,
      duration: 1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, { passive: true });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Notes |
|---|---|---|---|
| Background | `--bg` | `#0a0a0a` | Text panel and page |
| Text | `--text` | `#ffffff` | Headlines |
| Accent | `--accent-1` | `#90e0ef` | Tag, CTA, hover |
| Split ratio | `--split-ratio` | `50%` | Initial text panel width |
| Compressed width | JS `flexBasis` | `15%` | Text panel at max scroll |
| Parallax distance | JS `y: '-10%'` | `-10%` | Image vertical shift |
| Mouse parallax | JS `* 10` | `10px` max | Image mouse follow range |
| Image | CSS `.hero__image-inner` | Gradient placeholder | Replace with `background-image: url(...)` |

To use a real image, replace the `.hero__image-inner` gradient with:
```css
.hero__image-inner {
  background-image: url('your-image.jpg');
  background-size: cover;
  background-position: center;
}
```

---

## Dependencies

- **GSAP 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **ScrollTrigger 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
