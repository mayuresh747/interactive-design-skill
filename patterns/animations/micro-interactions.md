---
name: Micro-Interactions
category: animations
tags: [micro, interaction, ripple, toggle, morph, hamburger, tooltip, input, focus, button, press]
description: >
  6 micro-interaction presets. Click ripple, toggle icon morph (hamburger to X),
  menu icon transform, tooltip fade, input focus glow, and button press effect.
---

## Preset 1 — Click Ripple

A click creates an expanding circle from the exact click point, like Material Design.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Click Ripple</title>
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

  .ripple-btn {
    position: relative;
    overflow: hidden;
    padding: 1rem 2.5rem;
    background: transparent;
    border: 1px solid #90e0ef;
    border-radius: 8px;
    color: #90e0ef;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .ripple-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(144, 224, 239, 0.3);
    transform: scale(0);
    animation: rippleExpand 0.6s ease-out forwards;
    pointer-events: none;
  }

  @keyframes rippleExpand {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>
</head>
<body>

<button class="ripple-btn" data-ripple>Click Me</button>

<script>
  /**
   * Adds ripple effect to any element with [data-ripple].
   * Ripple originates from the exact click coordinates.
   */
  document.querySelectorAll('[data-ripple]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x - size / 2 + 'px';
      ripple.style.top = y - size / 2 + 'px';

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Ripple color | `rgba(144, 224, 239, 0.3)` | Circle fill |
| Duration | `0.6s` | Expand animation |
| Scale | `4` | Final scale multiplier |
| Trigger | `click` | Can change to `mousedown` |

---

## Preset 2 — Toggle Morph (Icon State Change)

An icon morphs smoothly between two states (e.g., play/pause, sun/moon).

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Toggle Morph</title>
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
    gap: 3rem;
  }

  .toggle-morph {
    width: 60px;
    height: 60px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.3s;
  }

  .toggle-morph:hover {
    border-color: #90e0ef;
  }

  .toggle-morph svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Play/Pause toggle */
  .play-icon, .pause-icon {
    transition: opacity 0.3s, transform 0.3s;
  }

  .toggle-morph[data-state="pause"] .play-icon {
    opacity: 0;
    transform: scale(0.5) rotate(90deg);
  }

  .toggle-morph[data-state="play"] .pause-icon {
    opacity: 0;
    transform: scale(0.5) rotate(-90deg);
  }

  .toggle-morph[data-state="pause"] .pause-icon,
  .toggle-morph[data-state="play"] .play-icon {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
</style>
</head>
<body>

<button class="toggle-morph" data-state="play" onclick="toggleState(this)">
  <svg viewBox="0 0 24 24">
    <!-- Play triangle -->
    <polygon class="play-icon" points="6,4 20,12 6,20" fill="#fff" stroke="none" />
    <!-- Pause bars -->
    <g class="pause-icon">
      <rect x="6" y="4" width="4" height="16" rx="1" fill="#fff" stroke="none" />
      <rect x="14" y="4" width="4" height="16" rx="1" fill="#fff" stroke="none" />
    </g>
  </svg>
</button>

<script>
  function toggleState(btn) {
    const current = btn.dataset.state;
    btn.dataset.state = current === 'play' ? 'pause' : 'play';
  }
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| States | `play` / `pause` | Any two-state toggle |
| Transition | `0.3s` | Morph speed |
| Icon size | `24px` | SVG viewport |
| Button size | `60px` | Circle diameter |

---

## Preset 3 — Menu Icon Transform (Hamburger to X)

Three horizontal bars animate into an X and back.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Menu Icon Transform</title>
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

  .menu-toggle {
    width: 48px;
    height: 48px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px;
    transition: border-color 0.3s;
  }

  .menu-toggle:hover {
    border-color: #90e0ef;
  }

  .menu-toggle__bar {
    display: block;
    width: 100%;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition:
      transform 0.35s cubic-bezier(0.77, 0, 0.175, 1),
      opacity 0.25s ease;
    transform-origin: center;
  }

  /* Active (X) state */
  .menu-toggle--active .menu-toggle__bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-toggle--active .menu-toggle__bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .menu-toggle--active .menu-toggle__bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
</style>
</head>
<body>

<button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
  <span class="menu-toggle__bar"></span>
  <span class="menu-toggle__bar"></span>
  <span class="menu-toggle__bar"></span>
</button>

<script>
  const toggle = document.getElementById('menuToggle');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('menu-toggle--active');
  });
</script>
</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Bar width | `100%` of 48px button | Configurable |
| Bar height | `2px` | Line thickness |
| Bar gap | `6px` | Space between bars |
| Rotation | `45deg` / `-45deg` | X angle |
| Transition | `0.35s` | Animation speed |
| Ease | `cubic-bezier(0.77, 0, 0.175, 1)` | Snappy ease |
| Y translate | `8px` | Must match gap + bar height |

---

## Preset 4 — Tooltip Fade

A tooltip appears on hover with a fade + slight Y offset. Handles positioning.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Tooltip Fade</title>
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
    gap: 3rem;
  }

  .tooltip-trigger {
    position: relative;
    display: inline-block;
    padding: 0.8rem 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    padding: 0.5rem 0.75rem;
    background: #1a1a2e;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 0.75rem;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.8);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
    z-index: 100;
  }

  /* Arrow */
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #1a1a2e;
  }

  .tooltip-trigger:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* Position variants */
  .tooltip--bottom {
    bottom: auto;
    top: calc(100% + 10px);
  }
  .tooltip--bottom::after {
    top: auto;
    bottom: 100%;
    border-top-color: transparent;
    border-bottom-color: #1a1a2e;
  }
</style>
</head>
<body>

<div class="tooltip-trigger">
  Hover me (top)
  <div class="tooltip">This is a tooltip</div>
</div>

<div class="tooltip-trigger">
  Hover me (bottom)
  <div class="tooltip tooltip--bottom">Bottom tooltip</div>
</div>

</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Position | Top (default), bottom variant | Via `.tooltip--bottom` |
| Y offset | `6px` slide | Distance tooltip travels |
| Duration | `0.25s` | Fade/slide speed |
| Background | `#1a1a2e` | Tooltip bg |
| Border | `rgba(255,255,255,0.1)` | Subtle border |
| Arrow | `5px` border trick | CSS triangle |

---

## Preset 5 — Input Focus Glow

Input border glows with accent color on focus, with a smooth transition.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Input Focus Glow</title>
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

  .glow-input-wrapper {
    position: relative;
    width: 320px;
  }

  .glow-input {
    width: 100%;
    padding: 0.8rem 1rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #fff;
    font-size: 0.875rem;
    outline: none;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .glow-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  .glow-input:focus {
    border-color: #90e0ef;
    box-shadow:
      0 0 0 3px rgba(144, 224, 239, 0.1),
      0 0 20px rgba(144, 224, 239, 0.08);
  }

  /* Label float variant */
  .glow-label {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    transition:
      top 0.25s ease,
      font-size 0.25s ease,
      color 0.25s ease;
  }

  .glow-input:focus ~ .glow-label,
  .glow-input:not(:placeholder-shown) ~ .glow-label {
    top: -8px;
    font-size: 0.7rem;
    color: #90e0ef;
    background: #0a0a0a;
    padding: 0 4px;
  }
</style>
</head>
<body>

<div class="glow-input-wrapper">
  <input type="text" class="glow-input" placeholder="Standard input" />
</div>

<div class="glow-input-wrapper">
  <input type="email" class="glow-input" placeholder=" " id="floatInput" />
  <label class="glow-label" for="floatInput">Email address</label>
</div>

</body>
</html>
```

**Configuration:**
| Option | Default | Notes |
|---|---|---|
| Glow color | `#90e0ef` | Border + shadow accent |
| Shadow spread | `3px` ring + `20px` glow | Outer glow radius |
| Shadow opacity | `0.1` ring, `0.08` glow | Glow intensity |
| Transition | `0.3s` | Focus animation speed |
| Background | `rgba(255,255,255,0.04)` | Input fill |
| Border default | `rgba(255,255,255,0.1)` | Unfocused border |
| Float label | Optional | Add `.glow-label` sibling |

---

## Preset 6 — Button Press

Button scales down slightly on press, springs back on release.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Button Press</title>
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
  }

  .press-btn {
    padding: 0.9rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    border: none;
    will-change: transform;
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.15s ease;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .press-btn:active {
    transform: scale(0.95);
  }

  /* Primary variant */
  .press-btn--primary {
    background: #90e0ef;
    color: #0a0a0a;
  }

  .press-btn--primary:active {
    box-shadow: 0 0 0 4px rgba(144, 224, 239, 0.2);
  }

  /* Outline variant */
  .press-btn--outline {
    background: transparent;
    color: #90e0ef;
    border: 1px solid #90e0ef;
  }

  .press-btn--outline:active {
    box-shadow: 0 0 0 3px rgba(144, 224, 239, 0.15);
  }

  /* Ghost variant */
  .press-btn--ghost {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .press-btn--ghost:active {
    background: rgba(255, 255, 255, 0.1);
  }
</style>
</head>
<body>

<button class="press-btn press-btn--primary">Primary</button>
<button class="press-btn press-btn--outline">Outline</button>
<button class="press-btn press-btn--ghost">Ghost</button>

<!-- Enhanced version with GSAP for spring easing -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script>
  // Optional: GSAP-enhanced press for richer spring easing
  document.querySelectorAll('.press-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.in',
      });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
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
| Press scale | `0.95` | How much button shrinks |
| Press duration | `0.1s` | Down speed |
| Release duration | `0.4s` | Spring-back speed |
| Release ease | `elastic.out(1, 0.4)` | Bouncy return |
| Focus ring | `0 0 0 4px rgba(...)` | Active box-shadow |
| Variants | primary, outline, ghost | Three button styles |

### CSS-only fallback

The CSS `:active` pseudo-class provides the basic press effect without JS. The GSAP enhancement adds elastic spring easing on release for a more polished feel.

---

## Dependencies

- Presets 1, 2, 3, 4, 5: No dependencies (pure CSS + vanilla JS)
- Preset 6: Optional GSAP 3.12.5 for enhanced spring easing — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
