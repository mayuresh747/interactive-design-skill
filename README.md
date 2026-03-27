# Interactive Design

A **self-learning** Claude Code skill that creates rich, interactive, award-quality websites through a guided design wizard with live browser previews at every step.

Give it a reference URL, a text brief, or just say "step by step" — it analyzes any site with Playwright, walks you through 8 design decisions with side-by-side previews, sources real images, and outputs production-ready code. **Every site it analyzes makes it smarter** — new patterns are automatically cataloged and available for future builds.

---

## What It Does

```
You:    "Build me a site like abc.com but for a coffee brand"

Skill:  1. Tears down the reference URL with Playwright
        2. Detects patterns: WebGL hero, GSAP scroll, sticky nav...
        3. Learns new patterns it hasn't seen before → grows its library
        4. Walks you through 8 design steps with 3-4 live side-by-side previews each
        5. Sources + edits real images to match your palette
        6. Assembles everything into a deployable site
```

### A Skill That Learns

Most tools ship with a fixed set of templates. This one **gets better the more you use it.**

Every time you point it at a new site, it tears down the design with Playwright — extracting colors, typography, layout patterns, animation libraries, and scroll behaviors. If it finds a technique that isn't in its pattern library yet, it asks to catalog it:

```
Skill: I found a pattern I haven't cataloged — "horizontal scroll gallery
       with parallax depth layers". Want me to add it to the pattern library?

You:   Yes

Skill: Saved to patterns/components/content-parallax-gallery.md
       This pattern is now available in all future builds.
```

The pattern library starts at 38 files. After a few projects, it could be 50, 60, or more — each one a real technique from a real site, not a generic template. **Your skill becomes uniquely yours.**

---

### The 8-Step Design Wizard

| Step | You Decide | Options Generated |
|------|-----------|------------------|
| 1. Mood & Direction | Dark/light, minimal/maximal, editorial/immersive | 4 mood boards with color + type + imagery |
| 2. Color Palette | Primary, accent, background, text colors | 4 palettes applied to sample UI elements |
| 3. Typography | Font pairing, size scale, weight system | 4 type specimens with Google Fonts |
| 4. Layout | Page skeleton, grid, section flow | 4 wireframe layouts with labeled sections |
| 5. Navigation | Sticky, overlay, hidden, tabs | 4 nav component variations |
| 6. Hero Section | The "wow" first impression | 4 hero sections with animations |
| 7. Content Sections | Cards, galleries, timelines, grids | 3-4 section types (pick multiple) |
| 8. Animation Level | Subtle to full WebGL | 4 intensity levels |

At every step, 3-4 options are rendered side by side in your browser. Pick one, remix two together, or ask for new options.

---

## Installation

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed
- Node.js 18+

### Install the Skill

Clone or download this repository, then install the skill into Claude Code:

```bash
# Clone the repo
git clone https://github.com/mayuresh747/interactive-design-skill.git

# Install the skill into Claude Code
claude skill install ./interactive-design-skill
```

Or install directly from GitHub:

```bash
claude skill install github:mayuresh747/interactive-design-skill
```

### Verify Installation

```bash
claude skill list
```

You should see `interactive-design` in the output.

---

## Usage

### Start the skill

In any Claude Code session, just describe what you want to build:

```
> Build me an interactive portfolio site with dark theme and smooth scroll animations
```

Or invoke it directly:

```
> /interactive-design
```

### Four Starting Modes

| Mode | Command Example |
|------|----------------|
| **Step by step** | `"Build me a landing page from scratch"` |
| **Copy from a site** | `"Make something like https://example.com"` |
| **URL + brief** | `"Like https://example.com but for a coffee brand, darker, more minimal"` |
| **Just a brief** | `"A cinematic scroll site for an ocean conservation nonprofit"` |

### Output Formats

When assembly is complete, choose your output:

| Format | Best For |
|--------|---------|
| **Single HTML** | Quick demos, sharing, email |
| **Multi-file static** | Simple hosting (Netlify, GitHub Pages) |
| **Next.js project** | Production apps, Vercel deployment |
| **Astro project** | Content sites, partial hydration |

---

## Example Workflows

### Example 1: "Copy from a site"

```
You:  Make me a site like https://example-agency.com but for a space startup

Skill: Starting URL teardown with Playwright...

       Detected Patterns:
         Navigation: "sticky minimal" (87% match)
         Hero: "3D/WebGL scene" (92% match)
         Layout: "single-column story" (95% match)
         Colors: closest to "Dark+Neon" palette
         Typography: "Clash Display + mono" system
         Animation: GSAP ScrollTrigger, Three.js, Lenis detected
         Scroll: 2800vh canvas, sticky sections

       Step 1: Mood & Direction
       Opening comparison page with 4 options...
       [Browser opens with side-by-side mood boards]

You:  I like option B but with the accent color from option D

Skill: Remixing B + D accent... Rendering updated preview.
       [Browser refreshes with the remix]

You:  Perfect. Let's go with that.

Skill: Step 2: Color Palette
       Here are 4 palettes based on your mood selection...
       [Browser shows 4 palette options with sample UI]
```

### Example 2: "Step by step" portfolio

```
You:  Build me a developer portfolio site

Skill: How would you like to start?
       1. Step by step
       2. Copy from a site
       3. URL + brief
       4. Just a brief

You:  1

Skill: Step 1: Mood & Direction
       I've generated 4 mood boards. Opening in your browser...

       A "Minimal Dark"   — charcoal + white + cyan accents
       B "Editorial Light" — warm cream + serif typography + muted tones
       C "Brutalist"       — raw, high-contrast, monospaced type
       D "Immersive Neon"  — deep black + electric gradients + 3D elements

       [Browser opens with all 4 rendered side by side]

You:  A, but can you make the accent more of a warm amber instead of cyan?

Skill: Updated. Here's Minimal Dark with amber (#f59e0b) accents...
       [Browser refreshes]

You:  Love it. Next.
```

### Example 3: Brief-driven nonprofit site

```
You:  Build a cinematic scroll site for an ocean conservation nonprofit.
      They want to feel like a documentary — slow reveals, full-bleed
      photography, minimal text. Dark and moody.

Skill: Searching for reference sites matching "ocean documentary cinematic scroll"...
       Found 3 references. Analyzing trends...

       Based on your brief, I'm weighting the wizard toward:
       - Dark+Neon or Ocean palette
       - Cinematic scroll hero pattern
       - Full-bleed image sections
       - Subtle animation level (lets photography breathe)

       Step 1: Mood & Direction
       [Browser opens with 4 mood boards tailored to the brief]
```

---

## Pattern Library

The skill ships with a curated library of **38 pattern files** covering modern interactive web design.

### Components (25 patterns)

| Category | Patterns |
|----------|---------|
| **Navigation** | Sticky Minimal, Hamburger Overlay, Hidden Reveal, Tab |
| **Hero** | Typography First, Video Fullscreen, WebGL Scene, Split Screen, Cinematic Scroll |
| **Content** | Staggered Cards, Horizontal Gallery, Timeline, Bento Grid, Marquee |
| **Images** | Parallax Reveal, WebGL Distortion, Zoom on Scroll, Clip-Path Iris |
| **Text** | Split Letter Animation, Gradient Sweep, Typewriter, Scramble |
| **Footer** | Mega Footer, Minimal Footer, CTA Footer |

### Animations (5 files, 34 presets)

- **Scroll-Driven** — 8 presets (parallax, pin, horizontal, reveal, counter, progress, snap, zoom)
- **Hover & Cursor** — 8 presets (magnetic, glow, tilt, trail, spotlight, ripple, distort, follow)
- **Page Transitions** — 6 presets (fade, slide, clip-path, curtain, scale, morph)
- **Loading Sequences** — 6 presets (counter, logo, bar, particles, stagger, cinematic)
- **Micro-Interactions** — 6 presets (toggle, button, input, card, notification, menu)

### Design Tokens

- **Color Systems** — 8 palettes (Dark+Neon, Warm Neutral, Ocean, Earth, Monochrome, Sunset, Forest, Pastel)
- **Typography** — 6 pairings with full scale definitions
- **Layouts** — 7 templates (single-column, split, grid, masonry, dashboard, magazine, portfolio)

### Tech Recipes

Production-ready integration guides for:
- Three.js scenes
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Barba.js page transitions
- WebGL shaders


---

## How It Works Under the Hood

```
                    ┌──────────────┐
                    │  User Input  │
                    │  URL / Brief │
                    └──────┬───────┘
                           │
              ┌────────────▼────────────┐
              │   Phase 1: Mode Select  │
              │   step-by-step / copy / │
              │   url+brief / brief     │
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  Phase 2: URL Teardown  │  ← Playwright: screenshot,
              │  (if URL provided)      │    DOM inspect, lib detect,
              │                         │    interaction map
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  Phase 3: Design Wizard │  ← 8 steps, each with
              │  8 steps × 3-4 options  │    side-by-side browser
              │  live browser previews  │    preview page
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  Phase 4: Image Source  │  ← Search Unsplash/Pexels,
              │  & Edit                 │    compare in browser,
              │                         │    color-grade to palette
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  Phase 5: Assembly      │  ← Stitch all selections,
              │  HTML / Next.js / Astro │    wire animations,
              │                         │    responsive breakpoints
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  Phase 6: Final Review  │  ← Open in browser,
              │  & Iteration            │    tweak loop until
              │                         │    user says "done"
              └──────────────────────────┘
```

---

## Project Structure

```
interactive-design/
├── SKILL.md                          # Skill definition (the orchestrator)
├── README.md                         # This file
├── patterns/
│   ├── components/                   # 25 UI component patterns
│   │   ├── nav-sticky-minimal.md
│   │   ├── hero-cinematic-scroll.md
│   │   ├── content-bento-grid.md
│   │   └── ...
│   ├── animations/                   # 34 animation presets across 5 files
│   │   ├── scroll-driven.md
│   │   ├── hover-cursor.md
│   │   └── ...
│   ├── palettes/
│   │   └── color-systems.md          # 8 color palettes
│   ├── typography/
│   │   └── type-systems.md           # 6 font pairings
│   ├── layouts/
│   │   └── layout-templates.md       # 7 layout templates
│   └── tech-recipes/                 # Integration guides
│       ├── threejs-scene.md
│       ├── gsap-scrolltrigger.md
│       └── ...
├── teardowns/                        # Reference site analyses
│   └── ...
├── templates/
│   └── nextjs-scaffold/              # Next.js output template
│       ├── app/
│       ├── components/
│       └── package.json
└── examples/
    └── demo-showcase.html            # Interactive pattern showcase
```

---

## Self-Learning in Detail

The pattern library is designed to grow continuously. There are two ways it learns:

### Automatic Discovery (during teardowns)

Every time the skill analyzes a reference URL, it maps what it finds against the existing library. When it encounters something new — a scroll technique, an animation pattern, a layout strategy — it flags it:

```
Skill: I found 2 patterns I haven't cataloged:
       1. "split-text counter with eased number roll"
       2. "sticky section with parallax video background"
       Want me to add them to the pattern library?

You:   Yes

Skill: Saved to patterns/components/text-counter-roll.md
       Saved to patterns/components/hero-parallax-video.md
       Both are now available as options in future wizard runs.
```

Each saved pattern includes complete working code, configuration options, and dependency lists — not just a description.

### What Gets Learned

| Learned from teardown | Saved as |
|----------------------|----------|
| New scroll behavior | `patterns/animations/` preset |
| Novel hero layout | `patterns/components/hero-*.md` |
| Unseen hover/cursor effect | `patterns/animations/hover-cursor.md` preset |
| New content section type | `patterns/components/content-*.md` |
| Color combination not in palettes | `patterns/palettes/color-systems.md` entry |
| Animation library integration | `patterns/tech-recipes/*.md` recipe |

### Manual Additions

You can also add patterns by hand. Each pattern file follows this format:

```markdown
---
name: My New Pattern
category: components
tags: [hero, animation, gsap]
description: >
  One-line description of what it does and when to use it.
---

## Preview
What it looks like and how it behaves.

## Code
\`\`\`html
<!-- Complete, working HTML + CSS + JS -->
\`\`\`

## Configuration
What can be customized (colors, speeds, content).

## Dependencies
CDN links needed (GSAP, Three.js, Lenis, fonts).
```

---

## Compatibility

| Platform | Status |
|----------|--------|
| Claude Code CLI | Fully supported |
| Claude Code Desktop (Mac) | Fully supported |
| Claude Code VS Code Extension | Fully supported |
| Claude Code JetBrains Extension | Fully supported |

### Browser Preview Requirements

The skill uses Playwright for live side-by-side previews and URL teardowns. If Playwright isn't available, it falls back to saving HTML files and prompting you to open them manually.

---

## Credits

Built by Mayuresh using [Claude](https://claude.ai).

---

## License

MIT
