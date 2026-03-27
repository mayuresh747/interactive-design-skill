---
name: Minimal Footer
category: components
tags: [footer, minimal, single-line, social, copyright, clean]
description: >
  Single-line footer. Copyright text on the left, social icon links on the right.
  Thin top border. Minimal spacing. Links have opacity hover transition.
---

## Preview

A single horizontal bar anchored to the bottom of the page content. A thin 1px top border separates it from the content above. On the left sits a copyright line in muted text. On the right, a row of social links (text labels or SVG icons) with opacity transitions on hover. Compact vertical padding keeps it tight. Fully responsive — stacks vertically on small screens.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Minimal Footer</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.4);
    --accent: #90e0ef;
    --border: rgba(255, 255, 255, 0.08);
    --max-width: 1200px;
    --footer-py: 1.25rem;
    --footer-px: clamp(1.5rem, 4vw, 3rem);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 1.25rem;
  }

  /* ---------- FOOTER ---------- */
  .minimal-footer {
    border-top: 1px solid var(--border);
    padding: var(--footer-py) var(--footer-px);
  }

  .minimal-footer__inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .minimal-footer__copy {
    font-size: 0.8125rem;
    color: var(--text-muted);
  }

  .minimal-footer__links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
  }

  .minimal-footer__link {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 500;
    opacity: 0.7;
    transition: opacity 0.2s, color 0.2s;
  }

  .minimal-footer__link:hover {
    opacity: 1;
    color: var(--text);
  }

  /* SVG icon variant */
  .minimal-footer__link svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    vertical-align: middle;
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 480px) {
    .minimal-footer__inner {
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }
  }
</style>
</head>
<body>

<div class="content">Page content</div>

<footer class="minimal-footer">
  <div class="minimal-footer__inner">
    <p class="minimal-footer__copy">&copy; 2026 Brand Inc.</p>
    <ul class="minimal-footer__links">
      <li><a href="#" class="minimal-footer__link">
        <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
      </a></li>
      <li><a href="#" class="minimal-footer__link">
        <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a></li>
      <li><a href="#" class="minimal-footer__link">
        <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a></li>
    </ul>
  </div>
</footer>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable | Default | Notes |
|---|---|---|---|
| Page background | `--bg` | `#0a0a0a` | Body background |
| Text color | `--text` | `#ffffff` | Full-opacity text |
| Muted text | `--text-muted` | `rgba(255,255,255,0.4)` | Copyright, links at rest |
| Border color | `--border` | `rgba(255,255,255,0.08)` | Top divider |
| Max width | `--max-width` | `1200px` | Inner container |
| Vertical padding | `--footer-py` | `1.25rem` | Top and bottom padding |
| Horizontal padding | `--footer-px` | `clamp(1.5rem, 4vw, 3rem)` | Left and right padding |
| Link hover opacity | inline | `1` | From `0.7` to `1` |
| Icon size | inline | `18px` | SVG width/height |

---

## Dependencies

None. Pure CSS + inline SVGs.
