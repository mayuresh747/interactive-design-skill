---
name: Gradient Sweep Text
category: components
tags: [text, gradient, sweep, animation, css, background-clip]
description: >
  Text with an animated gradient that sweeps continuously across.
  Uses background: linear-gradient() with background-clip: text and
  a CSS keyframe animation to shift background-position. Configurable
  gradient colors, speed, and angle.
---

## Preview

A heading where the text fill is a moving gradient. The gradient slides from left to right (or at a configurable angle) in an infinite loop, creating a shimmering metallic or holographic effect. The text itself is transparent; the gradient shows through via background-clip. Works purely with CSS, no JS required for the base effect.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Gradient Sweep Text</title>
<style>
  :root {
    --bg: #0a0a0a;
    --gradient-1: #90e0ef;
    --gradient-2: #c77dff;
    --gradient-3: #ff7438;
    --gradient-4: #90e0ef;
    --gradient-angle: 90deg;
    --gradient-speed: 3s;
    --font-size: clamp(3rem, 8vw, 7rem);
    --font-weight: 800;
    --letter-spacing: -0.04em;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .gradient-text {
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    letter-spacing: var(--letter-spacing);
    line-height: 1.1;
    text-align: center;
    background: linear-gradient(
      var(--gradient-angle),
      var(--gradient-1),
      var(--gradient-2),
      var(--gradient-3),
      var(--gradient-4)
    );
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: gradientSweep var(--gradient-speed) linear infinite;
  }

  @keyframes gradientSweep {
    0%   { background-position: 0% 50%; }
    100% { background-position: 300% 50%; }
  }

  /* ---------- VARIANT: hover-only sweep ---------- */
  .gradient-text--hover {
    background-size: 300% 100%;
    background-position: 0% 50%;
    animation: none;
    transition: background-position 0.6s ease;
  }

  .gradient-text--hover:hover {
    background-position: 100% 50%;
  }

  /* ---------- VARIANT: vertical sweep ---------- */
  .gradient-text--vertical {
    --gradient-angle: 180deg;
    background-size: 100% 300%;
    animation: gradientSweepVertical var(--gradient-speed) linear infinite;
  }

  @keyframes gradientSweepVertical {
    0%   { background-position: 50% 0%; }
    100% { background-position: 50% 300%; }
  }

  /* ---------- DEMO LAYOUT ---------- */
  .demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }

  .demo__label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: -1.5rem;
  }
</style>
</head>
<body>

<div class="demo">
  <span class="demo__label">Continuous sweep</span>
  <h1 class="gradient-text">Beautiful Things</h1>

  <span class="demo__label">Hover to sweep</span>
  <h1 class="gradient-text gradient-text--hover">Hover Me</h1>

  <span class="demo__label">Vertical sweep</span>
  <h1 class="gradient-text gradient-text--vertical">Going Down</h1>
</div>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable | Default | Notes |
|---|---|---|---|
| Color stop 1 | `--gradient-1` | `#90e0ef` | First gradient color |
| Color stop 2 | `--gradient-2` | `#c77dff` | Second gradient color |
| Color stop 3 | `--gradient-3` | `#ff7438` | Third gradient color |
| Color stop 4 | `--gradient-4` | `#90e0ef` | Fourth color (matches first for seamless loop) |
| Angle | `--gradient-angle` | `90deg` | Direction of gradient |
| Speed | `--gradient-speed` | `3s` | Duration of one full sweep cycle |
| Font size | `--font-size` | `clamp(3rem, 8vw, 7rem)` | Responsive text size |
| Font weight | `--font-weight` | `800` | Text weight |
| Letter spacing | `--letter-spacing` | `-0.04em` | Tracking |

### Variants

| Class | Behavior |
|---|---|
| `.gradient-text` | Continuous infinite sweep (default) |
| `.gradient-text--hover` | Sweep only on hover |
| `.gradient-text--vertical` | Vertical sweep direction |

---

## Dependencies

None. Pure CSS animation.
