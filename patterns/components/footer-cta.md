---
name: CTA Footer
category: components
tags: [footer, cta, call-to-action, split-letter, gsap, button, contact]
description: >
  Full-width CTA section before the actual footer. Large headline text
  ("Let's work together"), big accent-colored button, then a minimal footer
  below. The CTA headline uses split-letter animation on scroll.
---

## Preview

A two-part footer area. The top section is a dramatic call-to-action spanning the full width: a large headline ("Let's work together" or similar) that reveals character by character on scroll, centered over a subtle background, with a prominent accent-colored pill button below. Beneath the CTA, a thin border separates it from a compact bottom bar with copyright and social links. The CTA text animation uses the split-letter stagger technique.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CTA Footer</title>
<style>
  :root {
    --bg: #0a0a0a;
    --cta-bg: #0f0f0f;
    --text: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.4);
    --accent: #90e0ef;
    --border: rgba(255, 255, 255, 0.08);
    --max-width: 1200px;
    --cta-font-size: clamp(3rem, 8vw, 7rem);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 200vh;
  }

  .spacer {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1.25rem;
  }

  /* ---------- CTA SECTION ---------- */
  .cta-section {
    background: var(--cta-bg);
    border-top: 1px solid var(--border);
    padding: clamp(5rem, 12vw, 10rem) clamp(1.5rem, 4vw, 3rem);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }

  .cta-section__heading {
    font-size: var(--cta-font-size);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    max-width: 900px;
    overflow: hidden;
  }

  .cta-section__heading .char {
    display: inline-block;
    opacity: 0;
    will-change: transform, opacity;
  }

  .cta-section__heading .char-space {
    display: inline-block;
    width: 0.3em;
  }

  .cta-section__subtext {
    font-size: 1.125rem;
    color: var(--text-muted);
    max-width: 480px;
    line-height: 1.5;
  }

  .cta-section__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    background: var(--accent);
    color: var(--bg);
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s;
  }

  .cta-section__btn:hover {
    transform: scale(1.04);
    box-shadow: 0 0 30px rgba(144, 224, 239, 0.25);
  }

  .cta-section__btn:active {
    transform: scale(0.98);
  }

  .cta-section__btn-arrow {
    font-size: 1.2em;
    transition: transform 0.25s;
  }

  .cta-section__btn:hover .cta-section__btn-arrow {
    transform: translateX(4px);
  }

  /* ---------- BOTTOM FOOTER ---------- */
  .bottom-footer {
    border-top: 1px solid var(--border);
    padding: 1.25rem clamp(1.5rem, 4vw, 3rem);
    background: var(--cta-bg);
  }

  .bottom-footer__inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom-footer__copy {
    font-size: 0.8125rem;
    color: var(--text-muted);
  }

  .bottom-footer__links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
  }

  .bottom-footer__link {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.8125rem;
    opacity: 0.7;
    transition: opacity 0.2s, color 0.2s;
  }

  .bottom-footer__link:hover {
    opacity: 1;
    color: var(--text);
  }

  @media (max-width: 480px) {
    .bottom-footer__inner {
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }
  }
</style>
</head>
<body>

<div class="spacer">Scroll down</div>

<!-- CTA Section -->
<section class="cta-section">
  <h2 class="cta-section__heading" id="ctaHeading">Let's build something together</h2>
  <p class="cta-section__subtext">Have a project in mind? We'd love to hear about it. Drop us a line and let's start a conversation.</p>
  <a href="#" class="cta-section__btn">
    Get in Touch
    <span class="cta-section__btn-arrow">&rarr;</span>
  </a>
</section>

<!-- Bottom Footer -->
<footer class="bottom-footer">
  <div class="bottom-footer__inner">
    <p class="bottom-footer__copy">&copy; 2026 Brand Inc. All rights reserved.</p>
    <ul class="bottom-footer__links">
      <li><a href="#" class="bottom-footer__link">Twitter</a></li>
      <li><a href="#" class="bottom-footer__link">GitHub</a></li>
      <li><a href="#" class="bottom-footer__link">LinkedIn</a></li>
      <li><a href="#" class="bottom-footer__link">Privacy</a></li>
    </ul>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  /**
   * splitTextIntoChars — wraps each character in a span for GSAP animation.
   */
  function splitTextIntoChars(element) {
    const text = element.textContent;
    element.innerHTML = '';
    const chars = [];

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      if (text[i] === ' ') {
        span.className = 'char-space';
        span.innerHTML = '&nbsp;';
      } else {
        span.className = 'char';
        span.textContent = text[i];
      }
      element.appendChild(span);
      chars.push(span);
    }

    return chars.filter(c => c.classList.contains('char'));
  }

  // Split and animate the CTA heading
  const heading = document.getElementById('ctaHeading');
  const chars = splitTextIntoChars(heading);

  gsap.from(chars, {
    y: 50,
    opacity: 0,
    stagger: 0.025,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: heading,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable | Default | Notes |
|---|---|---|---|
| CTA background | `--cta-bg` | `#0f0f0f` | Section background |
| Accent color | `--accent` | `#90e0ef` | Button fill, glow |
| CTA font size | `--cta-font-size` | `clamp(3rem, 8vw, 7rem)` | Heading size |
| Border color | `--border` | `rgba(255,255,255,0.08)` | Dividers |
| Text muted | `--text-muted` | `rgba(255,255,255,0.4)` | Subtext, copyright |

### Animation

| Property | Value | Notes |
|---|---|---|
| Char Y offset | `50` | Pixels chars fly up from |
| Stagger | `0.025` | Seconds between each char |
| Duration | `0.8` | Seconds per char tween |
| Ease | `power3.out` | GSAP easing |
| Scroll start | `top 85%` | When heading hits 85% viewport |

---

## Dependencies

- GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- ScrollTrigger — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
