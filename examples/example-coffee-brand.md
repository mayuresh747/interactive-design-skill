# Example: Coffee Brand Landing Page

This walkthrough shows the skill building a coffee roasting brand website from a reference URL + brief.

---

## Input

```
> Build me a site like example-agency.com but for a specialty
  coffee roasting company. Dark and moody, lots of rich photography,
  smooth scroll. The brand is called "Obsidian Roasters."
```

## Phase 1: Mode Detection

The skill detects **mode 3 (URL + brief)** — a reference URL plus descriptive text.

## Phase 2: URL Teardown

```
Starting URL teardown of example-agency.com...

Detected Patterns:
  Navigation: "hidden reveal" (78% match)
  Hero: "3D/WebGL scene" (92% match) — Three.js particle visualization
  Layout: "single-column story" (95% match) — 7 narrative sections
  Colors: closest to "Dark+Neon" palette — #0a0a0a bg, electric blue accents
  Typography: "Clash Display + monospace" — bold grotesque + technical details
  Animation: GSAP ScrollTrigger, Three.js, Lenis smooth scroll
  Scroll: 2800vh canvas, sticky pinned sections, shader crossfade transitions
  Performance: 4.2MB total, 23 requests, WebGL is 60% of budget
```

## Phase 3: Design Wizard

### Step 1 — Mood & Direction

The skill generates 4 mood boards weighted by the teardown + brief:

```
Here are 4 directions based on your brief + teardown:

  A "Dark Roast"     — pure black + warm amber + coffee photography
  B "Moody Editorial" — charcoal + off-white + serif accents + film grain
  C "Industrial"     — concrete gray + exposed type + raw textures
  D "Minimal Luxury"  — matte black + gold accent + lots of whitespace

Which direction? Pick one, remix, or regenerate.
```

**User picks:** "B, but with the amber accent from A"

### Step 2 — Color Palette

```
Here are 4 palettes based on Moody Editorial + amber accent:

  A  #0f0f0f / #1a1a1a / #e8e0d4 / #d97706 / #78716c / #3f3f46
  B  #121210 / #1c1c18 / #f5f0e8 / #b45309 / #a3a3a3 / #44403c
  C  #0a0a08 / #171714 / #ede8df / #f59e0b / #737373 / #52524e
  D  #141412 / #1e1e1a / #faf5eb / #ca8a04 / #8a8a8a / #3d3d3a

Each palette applied to buttons, cards, headings, body text.
```

**User picks:** "C"

### Step 3 — Typography

```
4 pairings with palette C applied:

  A  Playfair Display + Source Sans 3 — editorial, classic contrast
  B  Space Grotesk + Inter — modern, clean, slightly technical
  C  Cormorant Garamond + Lato — elegant, warm, readable
  D  Syne + JetBrains Mono — bold, contemporary, brand-forward

Full type scale rendered: h1-h6, body, caption, button text.
```

**User picks:** "A — the serif headlines feel right for artisan coffee"

### Steps 4-8

The wizard continues through layout, navigation, hero, content sections, and animation level — each with 3-4 generated options.

## Phase 4: Image Sourcing

```
Shot list for Obsidian Roasters:
  1. Hero — close-up of coffee beans in dramatic lighting (1920x1080)
  2. About — barista pouring latte art, overhead shot (800x600)
  3. Process — roasting machine with visible flames (1200x800)
  4. Product — bag of coffee on dark marble surface (600x600)

Searching Unsplash and Pexels...
Found 4 candidates for "Hero" image. Which one fits best?
```

Each image is color-graded to match palette C (warm amber tones, high contrast, dark shadows).

## Phase 5: Assembly

```
Output format? Single HTML / Multi-file / Next.js / Astro

> Next.js

Assembling Next.js project:
  ✓ Nav component — hidden reveal with scroll detection
  ✓ Hero — cinematic scroll with Playfair Display headline
  ✓ Content — timeline + staggered cards
  ✓ Footer — CTA footer with newsletter signup
  ✓ Animations — moderate level (parallax, split-text, magnetic buttons)
  ✓ Images — 4 sourced, color-graded, placed
  ✓ Responsive — mobile + tablet breakpoints
  ✓ Performance — lazy loading, defer scripts

Assembling final output...
```

## Result

A complete Next.js project for "Obsidian Roasters" with:
- Cinematic scroll hero with staged content reveals
- Warm amber + charcoal palette
- Playfair Display headlines + Source Sans body
- Real coffee photography, color-graded to match
- GSAP ScrollTrigger animations
- Responsive down to mobile
- Ready for `vercel deploy`
