---
name: type-systems
category: typography
description: 6 production-ready typography pairings with responsive clamp() scales and CSS blocks
---

# Typography Systems Pattern Library

Each pairing provides a Google Fonts import, a complete responsive size scale using `clamp()`, weight system, spacing recommendations, and a ready-to-paste CSS block.

**Clamp formula reference:** `clamp(min, preferred, max)` where preferred uses viewport-relative units. The preferred value is calculated as `min + (max - min) * ((100vw - 375px) / (1440px - 375px))`, simplified to a `vw` coefficient.

---

## 1. PP Neue Montreal + Inter

**Vibe:** Clean geometric, modernist. Tight, functional, no-frills. Swiss-grid energy.

**Display:** PP Neue Montreal (proprietary) -- use **Inter** at heavier weights as a universally available substitute.
**Body:** Inter

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Weights to Load
- **400** -- body text, long-form reading
- **500** -- UI labels, navigation, subtle emphasis
- **600** -- subheadings, card titles
- **700** -- section headings, h2/h3
- **800** -- hero text, h1, display

### Spacing Recommendations
| Element | Letter-Spacing | Line-Height |
|---------|---------------|-------------|
| Hero / Display | `-0.04em` | `1.0` |
| H1 | `-0.03em` | `1.1` |
| H2 | `-0.02em` | `1.15` |
| H3 | `-0.015em` | `1.2` |
| Body | `0` | `1.6` |
| Small | `0.01em` | `1.5` |
| Caption | `0.02em` | `1.4` |

### CSS Block

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Responsive type scale: 375px -> 1440px viewport */
  --text-hero:    clamp(3rem, 1.46rem + 6.76vw, 7.5rem);       /* 48px -> 120px */
  --text-h1:      clamp(2.25rem, 1.08rem + 5.07vw, 4.5rem);    /* 36px -> 72px */
  --text-h2:      clamp(1.75rem, 1.1rem + 2.82vw, 3rem);       /* 28px -> 48px */
  --text-h3:      clamp(1.375rem, 1.05rem + 1.41vw, 2rem);     /* 22px -> 32px */
  --text-body:    clamp(1rem, 0.87rem + 0.56vw, 1.25rem);      /* 16px -> 20px */
  --text-small:   clamp(0.75rem, 0.685rem + 0.28vw, 0.875rem); /* 12px -> 14px */
  --text-caption: clamp(0.625rem, 0.56rem + 0.28vw, 0.75rem);  /* 10px -> 12px */

  /* Weight tokens */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
}

.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.04em;
  line-height: 1.0;
}

h1, .text-h1 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

h2, .text-h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

h3, .text-h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-bold);
  letter-spacing: -0.015em;
  line-height: 1.2;
}

body, .text-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  letter-spacing: 0;
  line-height: 1.6;
}

.text-small {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-regular);
  letter-spacing: 0.01em;
  line-height: 1.5;
}

.text-caption {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  letter-spacing: 0.02em;
  line-height: 1.4;
  text-transform: uppercase;
}
```

---

## 2. Clash Display + Satoshi (Space Grotesk + DM Sans)

**Vibe:** Bold editorial display paired with a warm, neutral body. High contrast between headline weight and body lightness. Magazine covers, brand landing pages.

**Display:** Clash Display (proprietary) -- substitute **Space Grotesk** from Google Fonts.
**Body:** Satoshi (proprietary) -- substitute **DM Sans** from Google Fonts.

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

### Weights to Load
- **Space Grotesk:** 500, 600, 700
- **DM Sans:** 400, 400 italic, 500, 700

### Spacing Recommendations
| Element | Letter-Spacing | Line-Height |
|---------|---------------|-------------|
| Hero / Display | `-0.05em` | `0.95` |
| H1 | `-0.04em` | `1.05` |
| H2 | `-0.02em` | `1.15` |
| H3 | `-0.01em` | `1.2` |
| Body | `0` | `1.65` |
| Small | `0.01em` | `1.5` |
| Caption | `0.06em` | `1.4` |

### CSS Block

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  --text-hero:    clamp(3rem, 1.46rem + 6.76vw, 7.5rem);
  --text-h1:      clamp(2.25rem, 1.08rem + 5.07vw, 4.5rem);
  --text-h2:      clamp(1.75rem, 1.1rem + 2.82vw, 3rem);
  --text-h3:      clamp(1.375rem, 1.05rem + 1.41vw, 2rem);
  --text-body:    clamp(1rem, 0.87rem + 0.56vw, 1.25rem);
  --text-small:   clamp(0.75rem, 0.685rem + 0.28vw, 0.875rem);
  --text-caption: clamp(0.625rem, 0.56rem + 0.28vw, 0.75rem);

  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-regular: 400;
}

.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  letter-spacing: -0.05em;
  line-height: 0.95;
}

h1, .text-h1 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  letter-spacing: -0.04em;
  line-height: 1.05;
}

h2, .text-h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

h3, .text-h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

body, .text-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  letter-spacing: 0;
  line-height: 1.65;
}

.text-small {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-regular);
  letter-spacing: 0.01em;
  line-height: 1.5;
}

.text-caption {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  letter-spacing: 0.06em;
  line-height: 1.4;
  text-transform: uppercase;
}
```

---

## 3. Zeist + DM Mono (Playfair Display + DM Mono)

**Vibe:** Editorial serif paired with data-grade monospace. High literary contrast. Works for long-form writing with technical callouts, financial dashboards, data journalism.

**Display:** Zeist (proprietary) -- substitute **Playfair Display** from Google Fonts.
**Body/Data:** DM Mono

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

### Weights to Load
- **Playfair Display:** 400, 400 italic, 600, 700, 800
- **DM Mono:** 400, 400 italic, 500

### Spacing Recommendations
| Element | Letter-Spacing | Line-Height |
|---------|---------------|-------------|
| Hero / Display | `-0.02em` | `1.0` |
| H1 | `-0.015em` | `1.1` |
| H2 | `-0.01em` | `1.2` |
| H3 | `0` | `1.25` |
| Body (mono) | `0` | `1.7` |
| Small (mono) | `0` | `1.55` |
| Caption (mono) | `0.04em` | `1.4` |

### CSS Block

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');

:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Mono', 'Courier New', monospace;

  --text-hero:    clamp(3rem, 1.46rem + 6.76vw, 7.5rem);
  --text-h1:      clamp(2.25rem, 1.08rem + 5.07vw, 4.5rem);
  --text-h2:      clamp(1.75rem, 1.1rem + 2.82vw, 3rem);
  --text-h3:      clamp(1.375rem, 1.05rem + 1.41vw, 2rem);
  --text-body:    clamp(1rem, 0.87rem + 0.56vw, 1.25rem);
  --text-small:   clamp(0.75rem, 0.685rem + 0.28vw, 0.875rem);
  --text-caption: clamp(0.625rem, 0.56rem + 0.28vw, 0.75rem);

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
}

.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.02em;
  line-height: 1.0;
  font-style: normal;
}

h1, .text-h1 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  letter-spacing: -0.015em;
  line-height: 1.1;
}

h2, .text-h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

h3, .text-h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  letter-spacing: 0;
  line-height: 1.25;
}

body, .text-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  letter-spacing: 0;
  line-height: 1.7;
}

.text-small {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-regular);
  letter-spacing: 0;
  line-height: 1.55;
}

.text-caption {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  letter-spacing: 0.04em;
  line-height: 1.4;
  text-transform: uppercase;
}

/* Utility: serif body for editorial long-form */
.prose-serif {
  font-family: var(--font-display);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  line-height: 1.8;
  letter-spacing: 0.005em;
}

/* Utility: mono data table text */
.data-text {
  font-family: var(--font-body);
  font-variant-numeric: tabular-nums;
  font-size: var(--text-small);
  letter-spacing: 0;
}
```

---

## 4. PP Mori + DM Sans (Plus Jakarta Sans + DM Sans)

**Vibe:** Soft humanist geometry. Rounded terminals, friendly but professional. Approachable SaaS, health-tech, onboarding flows.

**Display:** PP Mori (proprietary) -- substitute **Plus Jakarta Sans** from Google Fonts.
**Body:** DM Sans

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

### Weights to Load
- **Plus Jakarta Sans:** 400, 400 italic, 500, 600, 700, 800
- **DM Sans:** 400, 400 italic, 500, 700

### Spacing Recommendations
| Element | Letter-Spacing | Line-Height |
|---------|---------------|-------------|
| Hero / Display | `-0.035em` | `1.0` |
| H1 | `-0.025em` | `1.1` |
| H2 | `-0.015em` | `1.2` |
| H3 | `-0.01em` | `1.25` |
| Body | `0` | `1.6` |
| Small | `0.005em` | `1.5` |
| Caption | `0.03em` | `1.4` |

### CSS Block

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

:root {
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  --text-hero:    clamp(3rem, 1.46rem + 6.76vw, 7.5rem);
  --text-h1:      clamp(2.25rem, 1.08rem + 5.07vw, 4.5rem);
  --text-h2:      clamp(1.75rem, 1.1rem + 2.82vw, 3rem);
  --text-h3:      clamp(1.375rem, 1.05rem + 1.41vw, 2rem);
  --text-body:    clamp(1rem, 0.87rem + 0.56vw, 1.25rem);
  --text-small:   clamp(0.75rem, 0.685rem + 0.28vw, 0.875rem);
  --text-caption: clamp(0.625rem, 0.56rem + 0.28vw, 0.75rem);

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
}

.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.035em;
  line-height: 1.0;
}

h1, .text-h1 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  letter-spacing: -0.025em;
  line-height: 1.1;
}

h2, .text-h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.015em;
  line-height: 1.2;
}

h3, .text-h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
  line-height: 1.25;
}

body, .text-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  letter-spacing: 0;
  line-height: 1.6;
}

.text-small {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-regular);
  letter-spacing: 0.005em;
  line-height: 1.5;
}

.text-caption {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  letter-spacing: 0.03em;
  line-height: 1.4;
  text-transform: uppercase;
}
```

---

## 5. Space Grotesk + IBM Plex Sans

**Vibe:** Technical, structured, engineering-forward. Monospaced-influenced geometry paired with IBM's systematic workhorse. Dev tools, API docs, data platforms.

**Display:** Space Grotesk
**Body:** IBM Plex Sans

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

### Weights to Load
- **Space Grotesk:** 400, 500, 600, 700
- **IBM Plex Sans:** 400, 400 italic, 500, 600, 700

### Spacing Recommendations
| Element | Letter-Spacing | Line-Height |
|---------|---------------|-------------|
| Hero / Display | `-0.04em` | `0.98` |
| H1 | `-0.03em` | `1.08` |
| H2 | `-0.02em` | `1.15` |
| H3 | `-0.01em` | `1.2` |
| Body | `0` | `1.6` |
| Small | `0.01em` | `1.5` |
| Caption | `0.05em` | `1.4` |

### CSS Block

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'IBM Plex Sans', 'Helvetica Neue', sans-serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace; /* optional companion */

  --text-hero:    clamp(3rem, 1.46rem + 6.76vw, 7.5rem);
  --text-h1:      clamp(2.25rem, 1.08rem + 5.07vw, 4.5rem);
  --text-h2:      clamp(1.75rem, 1.1rem + 2.82vw, 3rem);
  --text-h3:      clamp(1.375rem, 1.05rem + 1.41vw, 2rem);
  --text-body:    clamp(1rem, 0.87rem + 0.56vw, 1.25rem);
  --text-small:   clamp(0.75rem, 0.685rem + 0.28vw, 0.875rem);
  --text-caption: clamp(0.625rem, 0.56rem + 0.28vw, 0.75rem);

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}

.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  letter-spacing: -0.04em;
  line-height: 0.98;
}

h1, .text-h1 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  letter-spacing: -0.03em;
  line-height: 1.08;
}

h2, .text-h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

h3, .text-h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

body, .text-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  letter-spacing: 0;
  line-height: 1.6;
}

.text-small {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-regular);
  letter-spacing: 0.01em;
  line-height: 1.5;
}

.text-caption {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  letter-spacing: 0.05em;
  line-height: 1.4;
  text-transform: uppercase;
}

/* Utility: code/data companion */
code, .text-code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  letter-spacing: 0;
  line-height: 1.5;
}
```

---

## 6. Playfair Display + Source Sans 3

**Vibe:** Classic serif display paired with a clean modern sans body. High editorial contrast. Magazine features, long-form reading, institutional sites, luxury brand copy.

**Display:** Playfair Display
**Body:** Source Sans 3

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

### Weights to Load
- **Playfair Display:** 400, 400 italic, 600, 700, 700 italic, 800, 900
- **Source Sans 3:** 400, 400 italic, 500, 600, 700

### Spacing Recommendations
| Element | Letter-Spacing | Line-Height |
|---------|---------------|-------------|
| Hero / Display | `-0.02em` | `1.0` |
| H1 | `-0.015em` | `1.1` |
| H2 | `-0.01em` | `1.2` |
| H3 | `0` | `1.25` |
| Body | `0` | `1.65` |
| Small | `0.01em` | `1.5` |
| Caption | `0.04em` | `1.4` |

### CSS Block

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

:root {
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Source Sans 3', 'Segoe UI', sans-serif;

  --text-hero:    clamp(3rem, 1.46rem + 6.76vw, 7.5rem);
  --text-h1:      clamp(2.25rem, 1.08rem + 5.07vw, 4.5rem);
  --text-h2:      clamp(1.75rem, 1.1rem + 2.82vw, 3rem);
  --text-h3:      clamp(1.375rem, 1.05rem + 1.41vw, 2rem);
  --text-body:    clamp(1rem, 0.87rem + 0.56vw, 1.25rem);
  --text-small:   clamp(0.75rem, 0.685rem + 0.28vw, 0.875rem);
  --text-caption: clamp(0.625rem, 0.56rem + 0.28vw, 0.75rem);

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
  --weight-black: 900;
}

.text-hero {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: var(--weight-black);
  letter-spacing: -0.02em;
  line-height: 1.0;
}

h1, .text-h1 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-extrabold);
  letter-spacing: -0.015em;
  line-height: 1.1;
}

h2, .text-h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  letter-spacing: -0.01em;
  line-height: 1.2;
}

h3, .text-h3 {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  letter-spacing: 0;
  line-height: 1.25;
}

body, .text-body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  letter-spacing: 0;
  line-height: 1.65;
}

.text-small {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: var(--weight-regular);
  letter-spacing: 0.01em;
  line-height: 1.5;
}

.text-caption {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.04em;
  line-height: 1.4;
  text-transform: uppercase;
}

/* Utility: italic pull-quote for editorial */
.pullquote {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-regular);
  font-style: italic;
  letter-spacing: 0;
  line-height: 1.35;
}

/* Utility: serif body for long-form reading */
.prose-serif {
  font-family: var(--font-display);
  font-size: var(--text-body);
  font-weight: var(--weight-regular);
  line-height: 1.8;
  letter-spacing: 0.005em;
}
```

---

## Quick Reference Table

| # | Pairing | Display | Body | Mood | Best For |
|---|---------|---------|------|------|----------|
| 1 | Neue Montreal + Inter | Inter (800) | Inter (400) | Clean geometric | SaaS, dashboards, dev tools |
| 2 | Clash + Satoshi | Space Grotesk | DM Sans | Bold editorial | Landing pages, brand sites |
| 3 | Zeist + DM Mono | Playfair Display | DM Mono | Serif + data | Data journalism, finance |
| 4 | PP Mori + DM Sans | Plus Jakarta Sans | DM Sans | Soft humanist | Health-tech, onboarding |
| 5 | Space Grotesk + IBM Plex | Space Grotesk | IBM Plex Sans | Technical | API docs, data platforms |
| 6 | Playfair + Source Sans 3 | Playfair Display | Source Sans 3 | Classic editorial | Magazines, luxury, institutions |
