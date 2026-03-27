---
name: Mega Footer
category: components
tags: [footer, mega, multi-column, newsletter, social, links, gsap, scroll]
description: >
  Large multi-column footer. Logo + tagline on the left, 3-4 link columns,
  newsletter signup input, and social icons. Subtle top border. Links have
  hover underline-draw. The entire footer fades in on scroll via GSAP ScrollTrigger.
---

## Preview

A full-width dark footer spanning the bottom of the page. The top edge has a thin subtle border. The layout is a grid: a branding column on the far left (logo mark, one-line tagline), then 3-4 columns of categorized links (Company, Product, Resources, Legal), followed by a newsletter email input with a submit button. Below the columns a bottom bar holds a copyright line on the left and a row of social media icon links on the right. Every link has an underline that draws in from the left on hover. The entire footer animates into view with a fade and upward slide when scrolled to.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mega Footer</title>
<style>
  :root {
    --bg: #0a0a0a;
    --footer-bg: #0f0f0f;
    --text: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.45);
    --accent: #90e0ef;
    --border: rgba(255, 255, 255, 0.08);
    --max-width: 1200px;
    --footer-padding: clamp(3rem, 6vw, 5rem);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  /* Spacer to enable scroll */
  .spacer {
    height: 120vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: var(--text-muted);
  }

  /* ---------- FOOTER ---------- */
  .mega-footer {
    background: var(--footer-bg);
    border-top: 1px solid var(--border);
    padding: var(--footer-padding) clamp(1.5rem, 4vw, 3rem);
    opacity: 0;
    transform: translateY(40px);
  }

  .mega-footer__inner {
    max-width: var(--max-width);
    margin: 0 auto;
  }

  /* Top section: brand + columns + newsletter */
  .mega-footer__top {
    display: grid;
    grid-template-columns: 1.5fr repeat(3, 1fr) 1.5fr;
    gap: 2rem;
  }

  /* Brand column */
  .mega-footer__brand {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .mega-footer__logo {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text);
    text-decoration: none;
  }

  .mega-footer__tagline {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
    max-width: 200px;
  }

  /* Link columns */
  .mega-footer__col-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .mega-footer__links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .mega-footer__link {
    position: relative;
    color: var(--text);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 400;
    transition: color 0.2s;
    display: inline-block;
  }

  .mega-footer__link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .mega-footer__link:hover {
    color: var(--accent);
  }

  .mega-footer__link:hover::after {
    width: 100%;
  }

  /* Newsletter column */
  .mega-footer__newsletter {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .mega-footer__newsletter-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .mega-footer__newsletter-form {
    display: flex;
    gap: 0;
  }

  .mega-footer__newsletter-input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-right: none;
    border-radius: 6px 0 0 6px;
    color: var(--text);
    font-size: 0.8125rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .mega-footer__newsletter-input:focus {
    border-color: var(--accent);
  }

  .mega-footer__newsletter-input::placeholder {
    color: var(--text-muted);
  }

  .mega-footer__newsletter-btn {
    padding: 0.6rem 1rem;
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 0 6px 6px 0;
    color: var(--bg);
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .mega-footer__newsletter-btn:hover {
    opacity: 0.85;
  }

  .mega-footer__newsletter-note {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  /* ---------- Bottom bar ---------- */
  .mega-footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }

  .mega-footer__copy {
    font-size: 0.8125rem;
    color: var(--text-muted);
  }

  .mega-footer__socials {
    display: flex;
    gap: 1.25rem;
    list-style: none;
  }

  .mega-footer__social-link {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .mega-footer__social-link:hover {
    color: var(--accent);
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 900px) {
    .mega-footer__top {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }
    .mega-footer__brand {
      grid-column: 1 / -1;
    }
    .mega-footer__newsletter {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 480px) {
    .mega-footer__top {
      grid-template-columns: 1fr;
    }
    .mega-footer__bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
</style>
</head>
<body>

<div class="spacer">Scroll down to see the footer</div>

<footer class="mega-footer" id="megaFooter">
  <div class="mega-footer__inner">
    <div class="mega-footer__top">

      <!-- Brand -->
      <div class="mega-footer__brand">
        <a href="#" class="mega-footer__logo">BRAND</a>
        <p class="mega-footer__tagline">Building the tools that shape tomorrow's digital experiences.</p>
      </div>

      <!-- Column 1 -->
      <div>
        <p class="mega-footer__col-title">Company</p>
        <ul class="mega-footer__links">
          <li><a href="#" class="mega-footer__link">About</a></li>
          <li><a href="#" class="mega-footer__link">Careers</a></li>
          <li><a href="#" class="mega-footer__link">Press</a></li>
          <li><a href="#" class="mega-footer__link">Blog</a></li>
        </ul>
      </div>

      <!-- Column 2 -->
      <div>
        <p class="mega-footer__col-title">Product</p>
        <ul class="mega-footer__links">
          <li><a href="#" class="mega-footer__link">Features</a></li>
          <li><a href="#" class="mega-footer__link">Pricing</a></li>
          <li><a href="#" class="mega-footer__link">Changelog</a></li>
          <li><a href="#" class="mega-footer__link">Integrations</a></li>
        </ul>
      </div>

      <!-- Column 3 -->
      <div>
        <p class="mega-footer__col-title">Resources</p>
        <ul class="mega-footer__links">
          <li><a href="#" class="mega-footer__link">Documentation</a></li>
          <li><a href="#" class="mega-footer__link">Guides</a></li>
          <li><a href="#" class="mega-footer__link">API Reference</a></li>
          <li><a href="#" class="mega-footer__link">Status</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="mega-footer__newsletter">
        <p class="mega-footer__newsletter-label">Stay updated</p>
        <form class="mega-footer__newsletter-form" onsubmit="event.preventDefault()">
          <input
            type="email"
            class="mega-footer__newsletter-input"
            placeholder="you@email.com"
            aria-label="Email address"
          />
          <button type="submit" class="mega-footer__newsletter-btn">Subscribe</button>
        </form>
        <p class="mega-footer__newsletter-note">No spam. Unsubscribe anytime.</p>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="mega-footer__bottom">
      <p class="mega-footer__copy">&copy; 2026 Brand Inc. All rights reserved.</p>
      <ul class="mega-footer__socials">
        <li><a href="#" class="mega-footer__social-link">Twitter</a></li>
        <li><a href="#" class="mega-footer__social-link">GitHub</a></li>
        <li><a href="#" class="mega-footer__social-link">LinkedIn</a></li>
        <li><a href="#" class="mega-footer__social-link">Dribbble</a></li>
      </ul>
    </div>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('#megaFooter', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#megaFooter',
      start: 'top 90%',
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
| Footer background | `--footer-bg` | `#0f0f0f` | Slightly lighter than page bg |
| Text color | `--text` | `#ffffff` | Primary text |
| Muted text | `--text-muted` | `rgba(255,255,255,0.45)` | Subtitles, labels |
| Accent color | `--accent` | `#90e0ef` | Hover states, CTA button |
| Border color | `--border` | `rgba(255,255,255,0.08)` | Top border, dividers |
| Max content width | `--max-width` | `1200px` | Inner container |
| Padding | `--footer-padding` | `clamp(3rem, 6vw, 5rem)` | Vertical padding |

### GSAP Animation

| Property | Value | Notes |
|---|---|---|
| Initial opacity | `0` | Set in CSS |
| Initial Y offset | `40px` | Set in CSS |
| Duration | `1s` | Configurable in JS |
| ScrollTrigger start | `top 90%` | Configurable |

---

## Dependencies

- GSAP 3.12.5 — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- ScrollTrigger — `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
