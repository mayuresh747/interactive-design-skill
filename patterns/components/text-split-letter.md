---
name: Split Letter Text Animation
category: components
tags: [text, split, stagger, gsap, scroll-trigger, characters, reveal]
description: >
  Characters split apart and stagger-animate in. Each character is wrapped in a
  span via a JS splitting function, then animated with GSAP stagger
  (y: 40, opacity: 0, stagger: 0.03). Can be triggered on scroll or on load.
---

## Preview

A heading or paragraph where each individual character flies up from below and fades in with a staggered delay. The text starts invisible. On trigger (scroll into view or page load) each character pops into place from bottom-to-top with a smooth ease, creating a wave-like reveal. Useful for hero headlines, section titles, or any text that needs a dramatic entrance.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Split Letter Text Animation</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --font-size: clamp(2.5rem, 6vw, 5rem);
    --font-weight: 700;
    --letter-spacing: -0.03em;
    --line-height: 1.1;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 200vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60vh;
  }

  .split-text {
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    letter-spacing: var(--letter-spacing);
    line-height: var(--line-height);
    text-align: center;
    max-width: 900px;
    padding: 0 2rem;
    overflow: hidden;
  }

  .split-text .char {
    display: inline-block;
    opacity: 0;
    will-change: transform, opacity;
  }

  /* Preserve spaces */
  .split-text .char-space {
    display: inline-block;
    width: 0.3em;
  }
</style>
</head>
<body>

<h1 class="split-text" data-split="true">
  Design is not just what it looks like.
</h1>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  /**
   * splitTextIntoChars — wraps every character in a <span class="char">.
   * Spaces become <span class="char-space">.
   * Returns array of character spans for animation.
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

  /**
   * animateSplitText — splits the element text and animates chars in.
   * @param {HTMLElement} el   — element containing text to split
   * @param {Object}      opts — configuration overrides
   */
  function animateSplitText(el, opts = {}) {
    const config = {
      y: opts.y ?? 40,
      opacity: opts.opacity ?? 0,
      stagger: opts.stagger ?? 0.03,
      duration: opts.duration ?? 0.8,
      ease: opts.ease ?? 'power3.out',
      trigger: opts.trigger ?? 'scroll', // 'scroll' | 'load'
      scrollStart: opts.scrollStart ?? 'top 85%',
      delay: opts.delay ?? 0,
    };

    const chars = splitTextIntoChars(el);

    const tweenVars = {
      y: 0,
      opacity: 1,
      stagger: config.stagger,
      duration: config.duration,
      ease: config.ease,
      delay: config.delay,
    };

    if (config.trigger === 'scroll') {
      gsap.from(chars, {
        y: config.y,
        opacity: config.opacity,
        ...tweenVars,
        scrollTrigger: {
          trigger: el,
          start: config.scrollStart,
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.from(chars, {
        y: config.y,
        opacity: config.opacity,
        ...tweenVars,
      });
    }
  }

  // Initialize all elements with data-split="true"
  document.querySelectorAll('[data-split="true"]').forEach(el => {
    animateSplitText(el, {
      trigger: 'scroll',  // change to 'load' for immediate playback
      y: 40,
      stagger: 0.03,
    });
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | Parameter | Default | Notes |
|---|---|---|---|
| Vertical offset | `y` | `40` | Pixels chars travel upward from |
| Starting opacity | `opacity` | `0` | Initial opacity of each char |
| Stagger delay | `stagger` | `0.03` | Seconds between each char start |
| Duration | `duration` | `0.8` | Seconds for each char tween |
| Ease | `ease` | `power3.out` | GSAP easing string |
| Trigger mode | `trigger` | `scroll` | `'scroll'` or `'load'` |
| Scroll start | `scrollStart` | `top 85%` | ScrollTrigger start position |
| Delay | `delay` | `0` | Seconds before animation begins |
| Font size | `--font-size` | `clamp(2.5rem, 6vw, 5rem)` | CSS variable |
| Font weight | `--font-weight` | `700` | CSS variable |
| Letter spacing | `--letter-spacing` | `-0.03em` | CSS variable |

---

## Dependencies

- GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- ScrollTrigger — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` (only when trigger is `'scroll'`)
