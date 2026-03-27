---
name: Tab Nav
category: components
tags: [navigation, tabs, underline, smooth-scroll, sticky]
description: >
  Full-width tab bar with section names. Active tab has an animated
  underline that slides between tabs. Clicking a tab smooth-scrolls
  to that section. Sticky at top.
---

## Preview

A horizontal tab bar stretches across the full viewport width, stuck to the top. Each tab is a section name. The active tab has a colored underline indicator that physically slides left or right when a new tab is selected -- the underline translates and resizes to match the new tab's position and width. Clicking a tab smooth-scrolls the page to the corresponding section. The active tab updates on scroll as sections enter the viewport.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Tab Nav</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.45);
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
    --tab-bar-bg: rgba(10, 10, 10, 0.85);
    --tab-bar-blur: 12px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: auto; /* we handle smooth scroll in JS */ }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  /* ---------- TAB BAR ---------- */
  .tab-bar {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 0;
    background: var(--tab-bar-bg);
    backdrop-filter: blur(var(--tab-bar-blur));
    -webkit-backdrop-filter: blur(var(--tab-bar-blur));
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .tab-bar::-webkit-scrollbar { display: none; }

  .tab-bar__wrapper {
    position: relative;
    display: flex;
    width: 100%;
  }

  .tab {
    flex: 1;
    min-width: max-content;
    padding: 1rem 1.5rem;
    text-align: center;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.25s;
    white-space: nowrap;
  }

  .tab:hover {
    color: var(--text);
  }

  .tab.active {
    color: var(--accent-1);
  }

  /* Sliding underline indicator */
  .tab-indicator {
    position: absolute;
    bottom: 0;
    height: 2px;
    background: var(--accent-1);
    transition: left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* ---------- SECTIONS ---------- */
  .section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
  }

  .section__title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .section__body {
    font-size: 1.125rem;
    opacity: 0.4;
    max-width: 500px;
    text-align: center;
    line-height: 1.6;
  }

  .section:nth-child(odd) {
    background: rgba(255, 255, 255, 0.02);
  }
</style>
</head>
<body>

<div class="tab-bar">
  <div class="tab-bar__wrapper" id="tabWrapper">
    <button class="tab active" data-target="overview">Overview</button>
    <button class="tab" data-target="features">Features</button>
    <button class="tab" data-target="gallery">Gallery</button>
    <button class="tab" data-target="pricing">Pricing</button>
    <button class="tab" data-target="faq">FAQ</button>
    <div class="tab-indicator" id="tabIndicator"></div>
  </div>
</div>

<section class="section" id="overview">
  <h2 class="section__title">Overview</h2>
  <p class="section__body">The tab indicator slides to track which section is active. Scroll to see it update automatically.</p>
</section>

<section class="section" id="features">
  <h2 class="section__title">Features</h2>
  <p class="section__body">Clicking a tab smooth-scrolls to this section.</p>
</section>

<section class="section" id="gallery">
  <h2 class="section__title">Gallery</h2>
  <p class="section__body">The underline transitions its left position and width to match the active tab.</p>
</section>

<section class="section" id="pricing">
  <h2 class="section__title">Pricing</h2>
  <p class="section__body">Uses IntersectionObserver for scroll-based active state detection.</p>
</section>

<section class="section" id="faq">
  <h2 class="section__title">FAQ</h2>
  <p class="section__body">Last section. The indicator slides here when this section enters view.</p>
</section>

<script>
  const tabs = document.querySelectorAll('.tab');
  const indicator = document.getElementById('tabIndicator');
  const sections = document.querySelectorAll('.section');
  let isScrollingByClick = false;

  function moveIndicator(tab) {
    indicator.style.left = tab.offsetLeft + 'px';
    indicator.style.width = tab.offsetWidth + 'px';
  }

  function setActive(targetId) {
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.tab[data-target="${targetId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
      moveIndicator(activeTab);
    }
  }

  // Initialize indicator position
  moveIndicator(document.querySelector('.tab.active'));

  // Click handler — smooth scroll to section
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      const section = document.getElementById(targetId);
      if (!section) return;

      setActive(targetId);
      isScrollingByClick = true;

      const tabBarHeight = document.querySelector('.tab-bar').offsetHeight;
      const top = section.getBoundingClientRect().top + window.scrollY - tabBarHeight;

      window.scrollTo({ top, behavior: 'smooth' });

      // Allow observer to take over after scroll finishes
      setTimeout(() => { isScrollingByClick = false; }, 800);
    });
  });

  // Scroll observer — update active tab on scroll
  const observer = new IntersectionObserver((entries) => {
    if (isScrollingByClick) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));

  // Recalc on resize
  window.addEventListener('resize', () => {
    const active = document.querySelector('.tab.active');
    if (active) moveIndicator(active);
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
| Tab bar fill | `--tab-bar-bg` | `rgba(10,10,10,0.85)` | Tab bar tint |
| Blur | `--tab-bar-blur` | `12px` | Backdrop blur |
| Active color | `--accent-1` | `#90e0ef` | Active tab text + indicator |
| Muted text | `--text-muted` | `rgba(255,255,255,0.45)` | Inactive tabs |
| Indicator height | CSS `.tab-indicator` | `2px` | Underline thickness |
| Slide easing | CSS `transition` | `cubic-bezier(0.25,0.46,0.45,0.94)` | Underline motion curve |
| Observer margins | JS `rootMargin` | `-40% 0px -55% 0px` | When a section is "active" |

---

## Dependencies

None. Pure CSS + vanilla JS (IntersectionObserver).
