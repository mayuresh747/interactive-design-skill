---
name: Hidden Reveal Nav
category: components
tags: [navigation, hidden, scroll-direction, glassmorphism, gsap]
description: >
  Nav hidden by default. Slides down on scroll-up, hides on scroll-down.
  Uses GSAP and scroll direction detection. Glassmorphism background
  with backdrop-filter blur.
---

## Preview

The navigation bar is invisible when the page loads. As soon as the user scrolls upward (reversing direction), the nav slides down from above the viewport with a smooth GSAP tween. When the user scrolls downward again, it slides back up and hides. The bar itself has a frosted-glass effect -- semi-transparent background with a strong backdrop blur.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Hidden Reveal Nav</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
    --nav-glass-bg: rgba(10, 10, 10, 0.55);
    --nav-blur: 20px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 400vh;
  }

  /* ---------- NAV ---------- */
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(1.5rem, 4vw, 3rem);
    z-index: 1000;
    background: var(--nav-glass-bg);
    backdrop-filter: blur(var(--nav-blur));
    -webkit-backdrop-filter: blur(var(--nav-blur));
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transform: translateY(-100%);
  }

  .nav__logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .nav__links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav__link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    transition: color 0.2s;
  }

  .nav__link:hover {
    color: var(--accent-1);
  }

  .nav__cta {
    padding: 0.45rem 1.1rem;
    background: var(--accent-1);
    color: var(--bg);
    font-size: 0.8125rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 6px;
    transition: opacity 0.2s;
  }

  .nav__cta:hover {
    opacity: 0.85;
  }

  /* ---------- DEMO CONTENT ---------- */
  .demo-section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.5rem, 4vw, 3rem);
    opacity: 0.15;
    text-align: center;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    .nav__links { display: none; }
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
  <a href="#" class="nav__cta">Contact</a>
</nav>

<div class="demo-section">Scroll down first, then scroll back up</div>
<div class="demo-section">The nav appears when you scroll up</div>
<div class="demo-section">And hides when you scroll down</div>
<div class="demo-section">Keep going</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const nav = document.getElementById('mainNav');
  let lastScrollY = window.scrollY;
  let isShown = false;
  const MIN_SCROLL = 100; // don't show nav until user has scrolled at least this far

  function showNav() {
    if (isShown) return;
    isShown = true;
    gsap.to(nav, {
      y: 0,
      duration: 0.4,
      ease: 'power3.out'
    });
  }

  function hideNav() {
    if (!isShown) return;
    isShown = false;
    gsap.to(nav, {
      y: '-100%',
      duration: 0.3,
      ease: 'power2.in'
    });
  }

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY < MIN_SCROLL) {
      hideNav();
    } else if (currentY < lastScrollY) {
      // scrolling up
      showNav();
    } else {
      // scrolling down
      hideNav();
    }

    lastScrollY = currentY;
  }, { passive: true });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Notes |
|---|---|---|---|
| Background | `--bg` | `#0a0a0a` | Page background |
| Glass tint | `--nav-glass-bg` | `rgba(10,10,10,0.55)` | Semi-transparent fill |
| Blur radius | `--nav-blur` | `20px` | Backdrop blur strength |
| Text color | `--text` | `#ffffff` | Logo and links |
| Accent | `--accent-1` | `#90e0ef` | Hover state, CTA fill |
| Min scroll | JS `MIN_SCROLL` | `100` | Pixels before nav can appear |
| Show duration | JS | `0.4s` | Slide-in timing |
| Hide duration | JS | `0.3s` | Slide-out timing |

---

## Dependencies

- **GSAP 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
