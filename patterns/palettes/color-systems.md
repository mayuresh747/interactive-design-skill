---
name: color-systems
category: palettes
description: 8 production-ready color palettes with CSS custom properties and usage examples
---

# Color Systems Pattern Library

Each palette provides 6 semantic color roles, a ready-to-paste CSS custom properties block, and a sample component styled in the palette.

---

## 1. Dark+Neon

**Mood:** High-contrast hacker aesthetic. Deep charcoal ground with electric blue and neon cyan cuts. Reads as futuristic, technical, confident.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#0a0a0a` | Page background, app shell |
| `surface` | `#141414` | Cards, modals, elevated containers |
| `text` | `#e5e5e5` | Primary body text, headings |
| `accent-1` | `#3b82f6` | CTAs, links, primary actions |
| `accent-2` | `#06b6d4` | Secondary highlights, badges, progress bars |
| `muted` | `#525252` | Borders, disabled states, captions |

```css
:root {
  --color-background: #0a0a0a;
  --color-surface: #141414;
  --color-text: #e5e5e5;
  --color-accent-1: #3b82f6;
  --color-accent-2: #06b6d4;
  --color-muted: #525252;

  --color-accent-1-hover: #2563eb;
  --color-accent-2-hover: #0891b2;
  --color-surface-hover: #1c1c1c;
  --color-text-muted: #a3a3a3;
}
```

### Sample Usage

```html
<style>
  .dn-card {
    background: var(--color-surface);
    border: 1px solid var(--color-muted);
    border-radius: 12px;
    padding: 24px;
    max-width: 380px;
  }
  .dn-card h3 {
    color: var(--color-text);
    font-size: 1.25rem;
    margin: 0 0 8px;
  }
  .dn-card p {
    color: var(--color-text-muted);
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 0 0 20px;
  }
  .dn-badge {
    display: inline-block;
    background: rgba(6, 182, 212, 0.15);
    color: var(--color-accent-2);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
    margin-bottom: 12px;
  }
  .dn-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--color-accent-1);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .dn-btn:hover {
    background: var(--color-accent-1-hover);
  }
</style>

<div class="dn-card">
  <span class="dn-badge">New Feature</span>
  <h3>Deploy Pipeline</h3>
  <p>Push your latest build to staging with zero-downtime rollout and automatic rollback.</p>
  <button class="dn-btn">Launch Deploy</button>
</div>
```

---

## 2. Warm Earth

**Mood:** Rich, grounded, organic. Dark espresso background with burnt sienna and golden sand. Reads as artisanal, premium, calm.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#1a1209` | Page background |
| `surface` | `#2a1f14` | Cards, panels |
| `text` | `#e8ddd0` | Primary text |
| `accent-1` | `#c2703e` | CTAs, primary actions |
| `accent-2` | `#d4a76a` | Secondary highlights, links |
| `muted` | `#6b5c4d` | Borders, captions |

```css
:root {
  --color-background: #1a1209;
  --color-surface: #2a1f14;
  --color-text: #e8ddd0;
  --color-accent-1: #c2703e;
  --color-accent-2: #d4a76a;
  --color-muted: #6b5c4d;

  --color-accent-1-hover: #a85c30;
  --color-accent-2-hover: #c49555;
  --color-surface-hover: #352a1e;
  --color-text-muted: #a89a8b;
}
```

### Sample Usage

```html
<style>
  .we-card {
    background: var(--color-surface);
    border: 1px solid var(--color-muted);
    border-radius: 16px;
    padding: 28px;
    max-width: 380px;
  }
  .we-card h3 {
    color: var(--color-accent-2);
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 8px;
    letter-spacing: 0.02em;
  }
  .we-card p {
    color: var(--color-text);
    font-size: 0.875rem;
    line-height: 1.7;
    margin: 0 0 20px;
  }
  .we-divider {
    height: 1px;
    background: var(--color-muted);
    margin: 16px 0;
    opacity: 0.5;
  }
  .we-btn {
    background: var(--color-accent-1);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 10px 24px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .we-btn:hover {
    background: var(--color-accent-1-hover);
  }
  .we-meta {
    color: var(--color-text-muted);
    font-size: 0.75rem;
    margin-top: 12px;
  }
</style>

<div class="we-card">
  <h3>Single Origin Roast</h3>
  <p>Ethiopian Yirgacheffe with notes of bergamot and dark honey. Medium body, bright finish.</p>
  <div class="we-divider"></div>
  <button class="we-btn">Order Now</button>
  <p class="we-meta">Free shipping on orders over $40</p>
</div>
```

---

## 3. Minimal Mono

**Mood:** Stark, editorial, no-nonsense. Near-white canvas with black type and a single gray for hierarchy. Reads as Swiss design, clean, authoritative.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#fafafa` | Page background |
| `surface` | `#ffffff` | Cards, elevated panels |
| `text` | `#171717` | Primary text, headings |
| `accent-1` | `#171717` | CTAs (same as text; uses weight/size for emphasis) |
| `accent-2` | `#737373` | Secondary text, subtitles |
| `muted` | `#a3a3a3` | Borders, placeholders, disabled states |

```css
:root {
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-text: #171717;
  --color-accent-1: #171717;
  --color-accent-2: #737373;
  --color-muted: #a3a3a3;

  --color-accent-1-hover: #000000;
  --color-surface-hover: #f5f5f5;
  --color-text-muted: #737373;
  --color-border: #e5e5e5;
}
```

### Sample Usage

```html
<style>
  .mm-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 32px;
    max-width: 380px;
  }
  .mm-card h3 {
    color: var(--color-text);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 4px;
    letter-spacing: -0.02em;
  }
  .mm-card .subtitle {
    color: var(--color-accent-2);
    font-size: 0.875rem;
    margin: 0 0 20px;
  }
  .mm-card p {
    color: var(--color-text);
    font-size: 0.9375rem;
    line-height: 1.65;
    margin: 0 0 24px;
  }
  .mm-btn {
    background: var(--color-accent-1);
    color: var(--color-surface);
    font-size: 0.875rem;
    font-weight: 600;
    padding: 10px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: background 0.15s ease;
  }
  .mm-btn:hover {
    background: var(--color-accent-1-hover);
  }
  .mm-link {
    color: var(--color-text);
    font-size: 0.875rem;
    text-decoration: underline;
    text-underline-offset: 3px;
    margin-left: 16px;
  }
</style>

<div class="mm-card">
  <h3>Annual Report</h3>
  <p class="subtitle">Q4 2025 Financial Summary</p>
  <p>Revenue grew 23% year-over-year, driven by expansion into three new markets and a 15% increase in average deal size.</p>
  <button class="mm-btn">Download PDF</button>
  <a href="#" class="mm-link">View Online</a>
</div>
```

---

## 4. Soft Mint

**Mood:** Cool, fresh, calming. Dark teal canvas with mint green accents. Reads as health-tech, environmental, trustworthy.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#0a1a1a` | Page background |
| `surface` | `#0f2626` | Cards, panels |
| `text` | `#d1e8e0` | Primary text |
| `accent-1` | `#61ce70` | CTAs, success states |
| `accent-2` | `#34d399` | Secondary highlights, progress indicators |
| `muted` | `#4a6b5e` | Borders, captions |

```css
:root {
  --color-background: #0a1a1a;
  --color-surface: #0f2626;
  --color-text: #d1e8e0;
  --color-accent-1: #61ce70;
  --color-accent-2: #34d399;
  --color-muted: #4a6b5e;

  --color-accent-1-hover: #4db85c;
  --color-accent-2-hover: #2ab383;
  --color-surface-hover: #153030;
  --color-text-muted: #8aad9e;
}
```

### Sample Usage

```html
<style>
  .sm-card {
    background: var(--color-surface);
    border: 1px solid var(--color-muted);
    border-radius: 16px;
    padding: 24px;
    max-width: 380px;
  }
  .sm-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--color-accent-1);
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .sm-status-dot {
    width: 8px;
    height: 8px;
    background: var(--color-accent-1);
    border-radius: 50%;
  }
  .sm-card h3 {
    color: var(--color-text);
    font-size: 1.25rem;
    margin: 0 0 8px;
  }
  .sm-card p {
    color: var(--color-text-muted);
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 0 0 20px;
  }
  .sm-progress {
    width: 100%;
    height: 6px;
    background: var(--color-muted);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  .sm-progress-fill {
    width: 72%;
    height: 100%;
    background: linear-gradient(90deg, var(--color-accent-2), var(--color-accent-1));
    border-radius: 999px;
  }
  .sm-btn {
    background: var(--color-accent-1);
    color: #0a1a1a;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .sm-btn:hover {
    background: var(--color-accent-1-hover);
  }
</style>

<div class="sm-card">
  <div class="sm-status"><span class="sm-status-dot"></span>Active</div>
  <h3>Carbon Offset Tracker</h3>
  <p>72% of your monthly target reached. 1.4 tonnes remaining to offset this quarter.</p>
  <div class="sm-progress"><div class="sm-progress-fill"></div></div>
  <button class="sm-btn">View Details</button>
</div>
```

---

## 5. Retro Warm

**Mood:** Vintage, nostalgic, approachable. Cream background with rust red and mustard. Reads as craft, indie, editorial print.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#faf5ee` | Page background |
| `surface` | `#fff8f0` | Cards, panels |
| `text` | `#2d1b0e` | Primary text, headings |
| `accent-1` | `#c43e1c` | CTAs, primary actions |
| `accent-2` | `#d4952a` | Secondary highlights, callouts |
| `muted` | `#8b7355` | Borders, captions, metadata |

```css
:root {
  --color-background: #faf5ee;
  --color-surface: #fff8f0;
  --color-text: #2d1b0e;
  --color-accent-1: #c43e1c;
  --color-accent-2: #d4952a;
  --color-muted: #8b7355;

  --color-accent-1-hover: #a83316;
  --color-accent-2-hover: #b88024;
  --color-surface-hover: #f5efe5;
  --color-text-muted: #8b7355;
  --color-border: #d9cfc2;
}
```

### Sample Usage

```html
<style>
  .rw-card {
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    padding: 28px;
    max-width: 380px;
    position: relative;
  }
  .rw-tag {
    position: absolute;
    top: -12px;
    left: 20px;
    background: var(--color-accent-2);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 12px;
    border-radius: 4px;
  }
  .rw-card h3 {
    color: var(--color-text);
    font-size: 1.375rem;
    font-weight: 800;
    margin: 8px 0 6px;
    letter-spacing: -0.01em;
  }
  .rw-card .date {
    color: var(--color-muted);
    font-size: 0.8rem;
    margin: 0 0 16px;
  }
  .rw-card p {
    color: var(--color-text);
    font-size: 0.9375rem;
    line-height: 1.7;
    margin: 0 0 20px;
  }
  .rw-btn {
    background: var(--color-accent-1);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .rw-btn:hover {
    background: var(--color-accent-1-hover);
  }
</style>

<div class="rw-card">
  <span class="rw-tag">Editor's Pick</span>
  <h3>The Lost Art of Letterpress</h3>
  <p class="date">March 2026 Issue</p>
  <p>How a handful of printmakers in Brooklyn are reviving 19th-century type-setting techniques for a digital age.</p>
  <button class="rw-btn">Read Article</button>
</div>
```

---

## 6. Chrome/Metallic

**Mood:** Industrial, sleek, premium. Near-black with silver and cool blue. Reads as automotive, fintech, high-end SaaS.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#0a0a0c` | Page background |
| `surface` | `#16161a` | Cards, panels |
| `text` | `#c0c0c8` | Primary text |
| `accent-1` | `#a0a0b0` | Labels, secondary emphasis |
| `accent-2` | `#5b7bef` | CTAs, interactive elements |
| `muted` | `#4a4a55` | Borders, dividers |

```css
:root {
  --color-background: #0a0a0c;
  --color-surface: #16161a;
  --color-text: #c0c0c8;
  --color-accent-1: #a0a0b0;
  --color-accent-2: #5b7bef;
  --color-muted: #4a4a55;

  --color-accent-2-hover: #4a68d4;
  --color-surface-hover: #1e1e24;
  --color-text-muted: #7a7a88;
  --color-surface-glass: rgba(22, 22, 26, 0.7);
}
```

### Sample Usage

```html
<style>
  .cm-card {
    background: var(--color-surface-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--color-muted);
    border-radius: 14px;
    padding: 28px;
    max-width: 380px;
  }
  .cm-card h3 {
    color: var(--color-text);
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 4px;
  }
  .cm-card .sub {
    color: var(--color-accent-1);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 16px;
  }
  .cm-card p {
    color: var(--color-text-muted);
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 0 0 20px;
  }
  .cm-stat {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
  }
  .cm-stat-item {
    display: flex;
    flex-direction: column;
  }
  .cm-stat-value {
    color: var(--color-text);
    font-size: 1.5rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .cm-stat-label {
    color: var(--color-text-muted);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .cm-btn {
    background: var(--color-accent-2);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 10px 22px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .cm-btn:hover {
    background: var(--color-accent-2-hover);
  }
</style>

<div class="cm-card">
  <p class="sub">Portfolio Overview</p>
  <h3>Titanium Fund</h3>
  <div class="cm-stat">
    <div class="cm-stat-item">
      <span class="cm-stat-value">$2.4M</span>
      <span class="cm-stat-label">Total Value</span>
    </div>
    <div class="cm-stat-item">
      <span class="cm-stat-value">+18.3%</span>
      <span class="cm-stat-label">YTD Return</span>
    </div>
  </div>
  <button class="cm-btn">View Holdings</button>
</div>
```

---

## 7. Pastel+Neon Pop

**Mood:** Playful, energetic, bold contrast. Soft lavender canvas with neon pink and electric yellow. Reads as Gen-Z, creative tools, entertainment.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#f0ebf8` | Page background |
| `surface` | `#faf7ff` | Cards, panels |
| `text` | `#1a1a2e` | Primary text |
| `accent-1` | `#ff2d7b` | CTAs, primary emphasis |
| `accent-2` | `#ffe600` | Highlights, badges, callouts |
| `muted` | `#9b8fb8` | Borders, captions |

```css
:root {
  --color-background: #f0ebf8;
  --color-surface: #faf7ff;
  --color-text: #1a1a2e;
  --color-accent-1: #ff2d7b;
  --color-accent-2: #ffe600;
  --color-muted: #9b8fb8;

  --color-accent-1-hover: #e0245e;
  --color-accent-2-hover: #e6cf00;
  --color-surface-hover: #f0ecf8;
  --color-text-muted: #6b6088;
  --color-border: #d8d0e8;
}
```

### Sample Usage

```html
<style>
  .pn-card {
    background: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: 20px;
    padding: 28px;
    max-width: 380px;
    position: relative;
    overflow: hidden;
  }
  .pn-card::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: var(--color-accent-2);
    border-radius: 0 0 0 100%;
    opacity: 0.3;
  }
  .pn-badge {
    display: inline-block;
    background: var(--color-accent-1);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 5px 12px;
    border-radius: 999px;
    margin-bottom: 14px;
  }
  .pn-card h3 {
    color: var(--color-text);
    font-size: 1.375rem;
    font-weight: 800;
    margin: 0 0 8px;
  }
  .pn-card p {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0 0 20px;
  }
  .pn-btn {
    background: var(--color-accent-1);
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 12px 28px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: transform 0.15s ease, background 0.2s ease;
  }
  .pn-btn:hover {
    background: var(--color-accent-1-hover);
    transform: scale(1.04);
  }
</style>

<div class="pn-card">
  <span class="pn-badge">Trending</span>
  <h3>Create Your Remix</h3>
  <p>Mash up beats, layer effects, and share your track with the community in under 60 seconds.</p>
  <button class="pn-btn">Start Creating</button>
</div>
```

---

## 8. Deep Burgundy

**Mood:** Luxurious, dramatic, intimate. Dark wine tones with gold and warm rose. Reads as high fashion, wine/spirits branding, evening events.

| Role | Hex | Usage |
|------|-----|-------|
| `background` | `#1a0a10` | Page background |
| `surface` | `#2a1420` | Cards, panels |
| `text` | `#f0d8e0` | Primary text |
| `accent-1` | `#c9a84c` | CTAs, gold emphasis |
| `accent-2` | `#d4708a` | Secondary highlights, links |
| `muted` | `#6b4558` | Borders, captions |

```css
:root {
  --color-background: #1a0a10;
  --color-surface: #2a1420;
  --color-text: #f0d8e0;
  --color-accent-1: #c9a84c;
  --color-accent-2: #d4708a;
  --color-muted: #6b4558;

  --color-accent-1-hover: #b39340;
  --color-accent-2-hover: #c05c76;
  --color-surface-hover: #351a2a;
  --color-text-muted: #b89aa8;
}
```

### Sample Usage

```html
<style>
  .db-card {
    background: var(--color-surface);
    border: 1px solid var(--color-muted);
    border-radius: 12px;
    padding: 32px;
    max-width: 380px;
    text-align: center;
  }
  .db-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(201, 168, 76, 0.15);
    border-radius: 50%;
    margin-bottom: 16px;
    font-size: 1.25rem;
  }
  .db-card h3 {
    color: var(--color-accent-1);
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 8px;
    letter-spacing: 0.04em;
  }
  .db-card p {
    color: var(--color-text-muted);
    font-size: 0.875rem;
    line-height: 1.65;
    margin: 0 0 24px;
  }
  .db-btn {
    background: transparent;
    color: var(--color-accent-1);
    font-size: 0.875rem;
    font-weight: 700;
    padding: 10px 28px;
    border: 2px solid var(--color-accent-1);
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .db-btn:hover {
    background: var(--color-accent-1);
    color: var(--color-background);
  }
  .db-link {
    display: block;
    margin-top: 12px;
    color: var(--color-accent-2);
    font-size: 0.8rem;
    text-decoration: none;
  }
  .db-link:hover {
    text-decoration: underline;
  }
</style>

<div class="db-card">
  <div class="db-icon">&#9830;</div>
  <h3>Grand Reserve 2019</h3>
  <p>A full-bodied Cabernet Sauvignon with layers of blackcurrant, cedar, and dark chocolate. Aged 24 months in French oak.</p>
  <button class="db-btn">Reserve a Bottle</button>
  <a href="#" class="db-link">View Tasting Notes</a>
</div>
```

---

## Quick Reference Table

| Palette | BG | Surface | Text | Accent-1 | Accent-2 | Muted | Best For |
|---------|-----|---------|------|----------|----------|-------|----------|
| Dark+Neon | `#0a0a0a` | `#141414` | `#e5e5e5` | `#3b82f6` | `#06b6d4` | `#525252` | Dev tools, dashboards, SaaS |
| Warm Earth | `#1a1209` | `#2a1f14` | `#e8ddd0` | `#c2703e` | `#d4a76a` | `#6b5c4d` | Artisan brands, food/bev |
| Minimal Mono | `#fafafa` | `#ffffff` | `#171717` | `#171717` | `#737373` | `#a3a3a3` | Editorial, finance, corp |
| Soft Mint | `#0a1a1a` | `#0f2626` | `#d1e8e0` | `#61ce70` | `#34d399` | `#4a6b5e` | Health-tech, sustainability |
| Retro Warm | `#faf5ee` | `#fff8f0` | `#2d1b0e` | `#c43e1c` | `#d4952a` | `#8b7355` | Indie media, craft, print |
| Chrome/Metallic | `#0a0a0c` | `#16161a` | `#c0c0c8` | `#a0a0b0` | `#5b7bef` | `#4a4a55` | Fintech, automotive, luxury |
| Pastel+Neon Pop | `#f0ebf8` | `#faf7ff` | `#1a1a2e` | `#ff2d7b` | `#ffe600` | `#9b8fb8` | Creative tools, social, Gen-Z |
| Deep Burgundy | `#1a0a10` | `#2a1420` | `#f0d8e0` | `#c9a84c` | `#d4708a` | `#6b4558` | Fashion, wine, luxury events |
