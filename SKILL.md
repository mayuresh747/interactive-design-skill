---
name: interactive-design
description: >
  Use when the user wants to create a rich, interactive, award-quality website.
  Accepts reference URLs, text briefs, or both. Analyzes reference sites via
  playwright teardown, then guides the user through 8 design steps with 3-4
  live side-by-side browser previews at each step. Produces single HTML,
  multi-file, Next.js, or Astro output with real images sourced and edited to fit.
---

# Interactive Design

Create rich, interactive, award-quality websites through a guided design wizard with live browser previews at every step.

## Quick Start

When this skill is invoked, follow the phases below in order. Do not skip phases.

### First Run

Before starting any phase, verify these directories exist relative to the skill root. Create any that are missing:

- `teardowns/` — starts empty, populated when you analyze reference URLs
- `patterns/components/`
- `patterns/animations/`
- `patterns/palettes/`
- `patterns/typography/`
- `patterns/layouts/`
- `patterns/tech-recipes/`

When saving new files (teardowns, learned patterns), always create the parent directory first if it doesn't exist.

---

## Phase 1: Mode Selection

Ask the user:

> **How would you like to start?**
> 1. **Step by step** — I'll guide you through each design decision from scratch
> 2. **Copy from a site** — Give me a URL and I'll analyze it, then we'll riff on what they did
> 3. **URL + brief** — Give me a reference URL and describe what you want, I'll blend both
> 4. **Just a brief** — Describe what you want and I'll propose directions

| Mode | Teardown? | Brief parsing? | How wizard options are seeded |
|------|-----------|----------------|------------------------------|
| Step by step | No | No | Pure pattern library |
| Copy from a site | Yes | No | Teardown matches first, library alternatives |
| URL + brief | Yes | Yes | Teardown + brief jointly weight options |
| Just a brief | No | Yes | Web search for references, then library |

---

## Phase 2: URL Teardown (if applicable)

Run only for modes 2 and 3. Use playwright to deeply analyze the reference URL.

### Teardown Steps

1. **Open in playwright** — `npx @playwright/cli open <url>`, wait for full load
2. **Screenshot sweep** — full-page screenshot, then screenshot each viewport-height section
3. **DOM inspection** — run JavaScript evaluation in playwright to extract:
   ```
   Colors: computed background-color, color on body, headers, buttons, links
   Fonts: computed font-family, font-size, font-weight on h1-h6, p, nav
   Layout: display type (grid/flex), grid-template-columns, gap values
   Z-index: layering map of positioned elements
   Animations: CSS animation-name, transition properties
   ```
4. **Library detection** — check for globals and script sources:
   ```
   Three.js: window.THREE
   GSAP: window.gsap or window.TweenMax
   Lenis: window.Lenis or 'lenis' in scripts
   ScrollTrigger: gsap.plugins includes ScrollTrigger
   Barba.js: window.barba
   Framer Motion: 'framer-motion' in scripts
   Lottie: window.lottie or 'lottie' in scripts
   Spline: 'spline' in scripts
   ```
5. **Interaction mapping** — programmatic scroll from 0% to 100% in 10% steps:
   - At each step, capture screenshot + any DOM mutations
   - Hover over key interactive elements (nav, buttons, cards, images)
   - Record what changes (cursor, transform, opacity, class additions)
6. **Asset inventory** — list all loaded images, videos, fonts, SVGs
7. **Performance snapshot** — count requests, total transfer size, note largest assets

### Teardown Output Format

Map findings to the pattern library. Read `patterns/` files to find closest matches:

```
Detected Patterns:
  Navigation: "sticky minimal" (match %)
  Hero: "3D/WebGL scene" (match %)
  Layout: "single-column story" (match %)
  Colors: closest palette name from color-systems.md
  Typography: closest pairing from type-systems.md
  Animation: libraries detected
  Scroll: total height, section strategy
```

### Saving Teardowns

After completing a teardown, save the analysis to `teardowns/<site-name>.md` using the detected patterns format above. This builds up a local reference library for future sessions. Create the `teardowns/` directory if it doesn't exist.

### Library Growth

If you find a pattern NOT in the library, ask the user:

> "I found a pattern I haven't cataloged — [description]. Want me to add it to the pattern library?"

If yes, create the parent directory if it doesn't exist, then create a new `.md` file in the appropriate `patterns/` subdirectory following the existing format.

---

## Phase 3: Design Wizard (8 Steps)

This is the core of the skill. At EVERY step:

1. Generate 3-4 options from the pattern library (informed by teardown/brief if available)
2. Build a **single comparison HTML page** with all options rendered side by side
3. Open it in playwright — user sees all options at once
4. Each option is labeled (A, B, C, D) with a descriptive tag
5. User picks one, requests a remix ("mix A and C"), or asks for re-generation
6. Move to the next step

### How to Build Comparison Pages

Use the template at `templates/comparison-page.html` as the base. For each step:

1. Read the relevant pattern files to get the HTML/CSS/JS for each option
2. Inject each option into a quadrant of the comparison grid
3. Customize colors/fonts/content to match any prior selections
4. Write the comparison page to a temp file
5. Open in playwright: `npx @playwright/cli open <path>`
6. Wait for user's choice

### The 8 Steps

#### Step 1: Mood & Direction
**Decides:** Overall vibe — dark/light, minimal/maximal, editorial/immersive
**Show:** 4 mood boards as HTML pages with color swatches + type samples + sample imagery
**Pattern files to read:** `patterns/palettes/color-systems.md`, `patterns/typography/type-systems.md`
**Build each option as:** A styled card with background color, 2-3 text samples, accent color blocks, and a sample image placeholder

#### Step 2: Color Palette
**Decides:** Primary, accent, background, text colors
**Show:** 4 palettes with sample UI elements (buttons, cards, text blocks) rendered in each
**Pattern files to read:** `patterns/palettes/color-systems.md`
**Build each option as:** Render a mini UI (button, card, heading, body text, link) in each palette's colors

#### Step 3: Typography
**Decides:** Font pairing, size scale, weight system
**Show:** 4 type specimens with hero heading + subheading + body + caption
**Pattern files to read:** `patterns/typography/type-systems.md`
**Build each option as:** Load fonts from Google Fonts CDN, render the full type scale with the chosen palette colors

#### Step 4: Layout Structure
**Decides:** Page skeleton — grid type, section flow, responsive strategy
**Show:** 4 wireframe layouts with placeholder content blocks
**Pattern files to read:** `patterns/layouts/layout-templates.md`
**Build each option as:** Gray wireframe boxes showing section arrangement, labeled with section names

#### Step 5: Navigation
**Decides:** Nav pattern — sticky, overlay, hidden, tabs
**Show:** 4 nav components with hover/click interactivity working
**Pattern files to read:** `patterns/components/nav-*.md`
**Build each option as:** Full-width nav bar with dummy links, applying chosen palette + typography

#### Step 6: Hero Section
**Decides:** First impression — the "wow" moment
**Show:** 4 hero sections with real animations running
**Pattern files to read:** `patterns/components/hero-*.md`, relevant `patterns/animations/` files
**Build each option as:** Full viewport-height hero with animation code active. Use chosen palette, typography, and a placeholder image.

#### Step 7: Content Sections
**Decides:** Body content patterns — cards, galleries, timelines, features
**Show:** 3-4 section types rendered with placeholder content
**Pattern files to read:** `patterns/components/content-*.md`
**Build each option as:** A content section with 3-4 items of placeholder content. User can select MULTIPLE sections to include.

#### Step 8: Animation & Interaction Level
**Decides:** Scroll behavior, hover effects, transitions, loading sequence
**Show:** 4 intensity levels (subtle → moderate → dramatic → full WebGL)
**Pattern files to read:** `patterns/animations/*.md`, `patterns/tech-recipes/*.md`
**Build each option as:** A scrollable mini-page with the chosen hero + one content section, wired with increasing levels of animation:
- **A "Subtle":** Fade-in on scroll, gentle hover states
- **B "Moderate":** Parallax, split-text reveals, magnetic buttons
- **C "Dramatic":** Clip-path transitions, horizontal scroll, custom cursor
- **D "Full WebGL":** Three.js background, particle effects, shader transitions

---

## Phase 4: Image Sourcing & Editing

After the wizard, source real images for the design.

### Step 1: Generate Shot List

Analyze the assembled design selections and list every image needed:
- What the image should depict
- Exact dimensions required
- Color tone to match the chosen palette
- Where it appears in the layout

### Step 2: Search & Select

For each image in the shot list:
1. Search via WebSearch for free-to-use images: `"<description> site:unsplash.com OR site:pexels.com OR site:pixabay.com"`
2. Find 3-4 candidates
3. Build a side-by-side comparison page showing all candidates (use the comparison template)
4. Open in playwright, user picks the best
5. Download the selected image via WebFetch

### Step 3: Edit to Fit

Process each downloaded image to match the design:

| Edit | Method |
|------|--------|
| **Color grading** | CSS filters for HTML output; PIL `ImageEnhance` + `ImageFilter` for file output |
| **Crop & resize** | CSS `object-fit`/`object-position` for HTML; PIL `crop()` + `resize()` for files |
| **Overlay** | CSS `linear-gradient` overlay for HTML; PIL `Image.alpha_composite()` for files |
| **Background removal** | `rembg` if available; else CSS `mix-blend-mode: multiply` workaround |
| **Filter effects** | CSS `filter: grayscale() sepia() blur()` for HTML; PIL filters for files |

### Step 4: Review

Place all edited images in the assembled design, render in playwright, get user approval. Allow swaps and re-edits.

---

## Phase 5: Assembly & Output

### Ask Output Format

> **What output format?**
> 1. **Single HTML file** — everything inline, open in any browser
> 2. **Multi-file static site** — separate HTML/CSS/JS/assets folder
> 3. **Next.js project** — component-based, deployable to Vercel
> 4. **Astro project** — static-first, partial hydration for interactive parts

### Assembly Steps

1. **Combine selections** — stitch together: nav + hero + content sections + footer
2. **Wire interactions** — connect GSAP timelines, ScrollTrigger, Lenis, hover effects per animation level
3. **Inject images** — place edited images in correct positions
4. **Add responsive** — generate mobile (< 768px) and tablet (768-1024px) breakpoints
5. **Performance pass** — `loading="lazy"` on below-fold images, `defer` on non-critical scripts
6. **Package per format:**

**Single HTML:**
- Inline all CSS in `<style>`
- Inline all JS in `<script>`
- Embed small images as base64 data URIs, larger ones as CDN links
- Output: one `.html` file

**Multi-file:**
```
output/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
```

**Next.js:**
Use `templates/nextjs-scaffold/` as base. Generate:
```
output/
├── package.json
├── next.config.js
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── ContentSection.tsx
│   └── Footer.tsx
└── public/
    └── images/
```

**Astro:**
```
output/
├── package.json
├── astro.config.mjs
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── components/
│       ├── Nav.astro
│       ├── Hero.astro
│       ├── ContentSection.astro
│       └── Footer.astro
└── public/
    └── images/
```

### Final Review Loop

1. Open the assembled site in playwright
2. User scrolls, interacts, checks every section
3. User requests tweaks → apply and re-render
4. Repeat until user says "done"
5. Save output files to the project directory

---

## Phase 6: Wrap-Up

After the user approves the final output:
1. Report what was built: output format, number of sections, animation level, images used
2. If any new patterns were discovered during teardown, confirm they've been saved to the library
3. Offer cleanup: "The wizard generated temporary HTML files during steps 1-8 (comparison pages, previews). Want me to delete them, or would you like to keep them for reference?"
   - If delete: remove all temporary comparison/preview HTML files created during the wizard
   - If keep: leave them in place
4. Offer: "Want me to deploy this to Vercel?" (if Next.js/Astro format)

---

## Fallback Handling

| Failure | Fallback |
|---------|----------|
| Playwright fails to open preview | Save as HTML file, tell user to open manually |
| URL teardown can't load (auth, SPA) | WebSearch for screenshots/reviews of the site |
| Image search returns nothing | Suggest alternative terms, offer placeholder with palette overlay |
| WebGL/Three.js fails | Degrade to CSS-only animation |
| Font not on CDN | Fall back to closest Google Fonts match |

---

## Pattern Library Reference

The pattern library lives in `patterns/` subdirectories. Each file contains:
- **Frontmatter** with name, category, tags, and description
- **Preview** section with a screenshot or description of what it looks like
- **Code** section with complete, working HTML + CSS + JS
- **Configuration** section listing what can be customized (colors, speeds, content)
- **Dependencies** listing CDN links needed (GSAP, Three.js, Lenis, fonts)

### Pattern file locations:

**Components** (`patterns/components/`):
- `nav-sticky-minimal.md`, `nav-hamburger-overlay.md`, `nav-hidden-reveal.md`, `nav-tab.md`
- `hero-typography-first.md`, `hero-video-fullscreen.md`, `hero-webgl-scene.md`, `hero-split-screen.md`, `hero-cinematic-scroll.md`
- `content-staggered-cards.md`, `content-horizontal-gallery.md`, `content-timeline.md`, `content-bento-grid.md`, `content-marquee.md`
- `image-parallax-reveal.md`, `image-webgl-distortion.md`, `image-zoom-scroll.md`, `image-clip-path-iris.md`
- `text-split-letter.md`, `text-gradient-sweep.md`, `text-typewriter.md`, `text-scramble.md`
- `footer-mega.md`, `footer-minimal.md`, `footer-cta.md`

**Animations** (`patterns/animations/`):
- `scroll-driven.md` (8 presets), `hover-cursor.md` (8 presets), `page-transitions.md` (6 presets), `loading-sequences.md` (6 presets), `micro-interactions.md` (6 presets)

**Design Tokens** (`patterns/palettes/`, `patterns/typography/`, `patterns/layouts/`):
- `color-systems.md` (8 palettes), `type-systems.md` (6 pairings), `layout-templates.md` (7 layouts)

**Tech Recipes** (`patterns/tech-recipes/`):
- `threejs-scene.md`, `gsap-scrolltrigger.md`, `lenis-smooth-scroll.md`, `barba-transitions.md`, `webgl-shaders.md`

**Teardowns** (`teardowns/`):
- This directory starts empty and grows as you analyze reference sites. Each teardown is saved here automatically.
