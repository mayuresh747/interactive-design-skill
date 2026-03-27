---
name: Sticky Minimal Nav
category: components
tags: [navigation, sticky, minimal, blur, scroll-shrink]
description: >
  Thin sticky bar at top. Logo left, centered links, CTA button right.
  Shrinks on scroll (height reduces, background gains backdrop-blur).
  Links have an underline-draw hover effect.
---

## Preview

A slender navigation bar pinned to the top of the viewport. At rest the bar is transparent with generous padding. Once the user scrolls past a threshold the bar compresses to roughly half its height and a frosted-glass blur fills in behind it. Each nav link has a thin underline that draws from left to right on hover.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sticky Minimal Nav</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
    --nav-height: 80px;
    --nav-height-shrunk: 48px;
    --nav-transition: 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 300vh;
  }

  /* ---------- NAV ---------- */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(1.5rem, 4vw, 3rem);
    z-index: 1000;
    transition:
      height var(--nav-transition),
      background var(--nav-transition),
      backdrop-filter var(--nav-transition);
    background: transparent;
  }

  .nav.scrolled {
    height: var(--nav-height-shrunk);
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* Logo */
  .nav__logo {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);
    text-decoration: none;
    white-space: nowrap;
  }

  /* Links */
  .nav__links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav__link {
    position: relative;
    color: var(--text);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding-bottom: 2px;
  }

  .nav__link::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: var(--accent-1);
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .nav__link:hover::after {
    width: 100%;
  }

  /* CTA */
  .nav__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--accent-1);
    border-radius: 100px;
    color: var(--accent-1);
    font-size: 0.8125rem;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: background 0.25s, color 0.25s;
  }

  .nav__cta:hover {
    background: var(--accent-1);
    color: var(--bg);
  }

  /* ---------- DEMO CONTENT ---------- */
  .demo-hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(2rem, 5vw, 4rem);
    opacity: 0.15;
    text-align: center;
    padding: 2rem;
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 768px) {
    .nav__links { display: none; }
    .nav__cta { font-size: 0.75rem; padding: 0.4rem 1rem; }
  }
</style>
</head>
<body>

<nav class="nav" id="mainNav">
  <a href="#" class="nav__logo">BRAND</a>
  <ul class="nav__links">
    <li><a href="#" class="nav__link">Work</a></li>
    <li><a href="#" class="nav__link">About</a></li>
    <li><a href="#" class="nav__link">Services</a></li>
    <li><a href="#" class="nav__link">Journal</a></li>
  </ul>
  <a href="#" class="nav__cta">Get in Touch</a>
</nav>

<div class="demo-hero">Scroll down to see the nav shrink</div>
<div class="demo-hero">Keep scrolling</div>
<div class="demo-hero">More content</div>

<script>
  const nav = document.getElementById('mainNav');
  const SCROLL_THRESHOLD = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable | Default | Notes |
|---|---|---|---|
| Background | `--bg` | `#0a0a0a` | Page and nav fallback |
| Text color | `--text` | `#ffffff` | Links, logo |
| Accent color | `--accent-1` | `#90e0ef` | Underline, CTA border/fill |
| Full height | `--nav-height` | `80px` | Before scroll |
| Shrunk height | `--nav-height-shrunk` | `48px` | After scroll |
| Transition speed | `--nav-transition` | `0.35s` | Shrink/blur timing |
| Scroll threshold | JS `SCROLL_THRESHOLD` | `50` | Pixels before shrink triggers |
| Blur amount | Inline in `.scrolled` | `16px` | Backdrop blur radius |

---

## Dependencies

None. Pure CSS + vanilla JS.
