---
name: Hamburger Overlay Nav
category: components
tags: [navigation, hamburger, overlay, fullscreen, gsap, stagger]
description: >
  Minimal bar with logo left and hamburger icon right. Click opens a
  full-screen dark overlay with large staggered-reveal links. Links
  animate in from bottom one by one using GSAP. Close button morphs
  from the hamburger.
---

## Preview

A thin top bar shows only a logo and a three-line hamburger icon. Clicking the hamburger triggers a full-viewport dark overlay that fades in. Large navigation links (60px+) appear one after another sliding up from below with GSAP stagger. A close button (X) replaces the hamburger. Clicking close reverses the animation.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Hamburger Overlay Nav</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
    --overlay-bg: #0a0a0a;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 200vh;
  }

  /* ---------- TOP BAR ---------- */
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(1.5rem, 4vw, 3rem);
    z-index: 1001;
  }

  .topbar__logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
    letter-spacing: -0.02em;
    z-index: 1002;
  }

  /* ---------- HAMBURGER BUTTON ---------- */
  .hamburger {
    position: relative;
    width: 32px;
    height: 24px;
    cursor: pointer;
    background: none;
    border: none;
    z-index: 1002;
  }

  .hamburger__line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--text);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity 0.3s;
  }

  .hamburger__line:nth-child(1) { top: 0; }
  .hamburger__line:nth-child(2) { top: 50%; transform: translateY(-50%); }
  .hamburger__line:nth-child(3) { bottom: 0; }

  .hamburger.open .hamburger__line:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  .hamburger.open .hamburger__line:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open .hamburger__line:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }

  /* ---------- OVERLAY ---------- */
  .overlay {
    position: fixed;
    inset: 0;
    background: var(--overlay-bg);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s, visibility 0.4s;
  }

  .overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .overlay__link {
    display: block;
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    line-height: 1.2;
    opacity: 0;
    transform: translateY(60px);
    transition: color 0.25s;
  }

  .overlay__link:hover {
    color: var(--accent-1);
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
</style>
</head>
<body>

<div class="topbar">
  <a href="#" class="topbar__logo">BRAND</a>
  <button class="hamburger" id="hamburgerBtn" aria-label="Toggle menu">
    <span class="hamburger__line"></span>
    <span class="hamburger__line"></span>
    <span class="hamburger__line"></span>
  </button>
</div>

<div class="overlay" id="overlay">
  <a href="#" class="overlay__link">Work</a>
  <a href="#" class="overlay__link">About</a>
  <a href="#" class="overlay__link">Services</a>
  <a href="#" class="overlay__link">Contact</a>
  <a href="#" class="overlay__link">Journal</a>
</div>

<div class="demo-hero">Click the hamburger icon</div>
<div class="demo-hero">More content below</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  const btn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('overlay');
  const links = overlay.querySelectorAll('.overlay__link');
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    btn.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(links,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15
      }
    );
  }

  function closeMenu() {
    isOpen = false;
    btn.classList.remove('open');
    document.body.style.overflow = '';

    gsap.to(links, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => {
        overlay.classList.remove('active');
        gsap.set(links, { y: 60, opacity: 0 });
      }
    });
  }

  btn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Notes |
|---|---|---|---|
| Background | `--bg` | `#0a0a0a` | Page background |
| Overlay background | `--overlay-bg` | `#0a0a0a` | Full-screen overlay fill |
| Text color | `--text` | `#ffffff` | Links and logo |
| Hover color | `--accent-1` | `#90e0ef` | Link hover state |
| Link font size | CSS `clamp()` | `2.5rem - 5rem` | Responsive |
| Stagger delay | JS `stagger` | `0.08` | Seconds between each link |
| Entry distance | JS `y` | `60` | Pixels links travel upward |
| Animation duration | JS `duration` | `0.5` | Seconds per link |

---

## Dependencies

- **GSAP 3.12.5** — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
