---
name: layout-templates
category: layouts
description: 7 responsive layout templates with CSS Grid/Flexbox code and ASCII wireframes
---

# Layout Templates Pattern Library

Each template provides an ASCII wireframe, complete CSS Grid/Flexbox skeleton, responsive breakpoints (mobile < 768px, tablet 768-1024px, desktop > 1024px), and a section flow description.

---

## 1. Editorial Grid

**Description:** Multi-column layout with intentional asymmetry. Wide feature column beside a narrow sidebar, staggered rows that break the grid at intervals. Ideal for magazine-style content, blog indexes, and portfolio showcases.

### Wireframe

```
Desktop (> 1024px):
+--------------------------------------------------+
|                    HEADER / NAV                   |
+--------------------------------------------------+
|                                                    |
|  +--------- FEATURE (8col) ---------+  +--SIDE--+ |
|  |                                   |  |        | |
|  |           Hero Article            |  | Recent | |
|  |                                   |  | Posts  | |
|  +-----------------------------------+  |        | |
|                                         +--------+ |
|  +---- 5col ----+  +-------- 7col --------+       |
|  |   Article 2  |  |      Article 3       |       |
|  +---------------+  +---------------------+       |
|                                                    |
|  +--- 4col ---+  +--- 4col ---+  +--- 4col ---+  |
|  |  Article 4 |  |  Article 5 |  |  Article 6 |  |
|  +------------+  +------------+  +------------+  |
+--------------------------------------------------+
|                     FOOTER                        |
+--------------------------------------------------+

Mobile (< 768px):
+--------------------+
|       HEADER       |
+--------------------+
|   Hero Article     |
+--------------------+
|   Recent Posts     |
+--------------------+
|   Article 2        |
+--------------------+
|   Article 3        |
+--------------------+
|   Article 4        |
+--------------------+
|   Article 5        |
+--------------------+
|   Article 6        |
+--------------------+
|       FOOTER       |
+--------------------+
```

### Section Flow
1. Full-width header/nav
2. Hero feature spanning 8 of 12 columns, sidebar takes 4
3. Two-up asymmetric row (5+7 columns)
4. Three-up equal row
5. Full-width footer

### CSS

```css
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.editorial-header,
.editorial-footer {
  grid-column: 1 / -1;
}

.editorial-hero {
  grid-column: 1 / 9;
  min-height: 400px;
}

.editorial-sidebar {
  grid-column: 9 / -1;
}

.editorial-mid-wide {
  grid-column: 1 / 6;
}

.editorial-mid-wider {
  grid-column: 6 / -1;
}

.editorial-third {
  grid-column: span 4;
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .editorial-grid {
    grid-template-columns: repeat(8, 1fr);
    gap: 20px;
    padding: 0 20px;
  }

  .editorial-hero {
    grid-column: 1 / 6;
    min-height: 320px;
  }

  .editorial-sidebar {
    grid-column: 6 / -1;
  }

  .editorial-mid-wide {
    grid-column: 1 / 4;
  }

  .editorial-mid-wider {
    grid-column: 4 / -1;
  }

  .editorial-third {
    grid-column: span 4;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .editorial-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
  }

  .editorial-hero,
  .editorial-sidebar,
  .editorial-mid-wide,
  .editorial-mid-wider,
  .editorial-third {
    grid-column: 1 / -1;
  }

  .editorial-hero {
    min-height: 240px;
  }
}
```

### HTML Skeleton

```html
<div class="editorial-grid">
  <header class="editorial-header"><!-- Nav --></header>
  <article class="editorial-hero"><!-- Feature article --></article>
  <aside class="editorial-sidebar"><!-- Recent posts --></aside>
  <article class="editorial-mid-wide"><!-- Article 2 --></article>
  <article class="editorial-mid-wider"><!-- Article 3 --></article>
  <article class="editorial-third"><!-- Article 4 --></article>
  <article class="editorial-third"><!-- Article 5 --></article>
  <article class="editorial-third"><!-- Article 6 --></article>
  <footer class="editorial-footer"><!-- Footer --></footer>
</div>
```

---

## 2. Asymmetric

**Description:** Off-center compositions with diagonal tension. Content blocks are intentionally shifted from center, using offset grid placements and negative space to create visual movement. Works for creative portfolios, brand storytelling, and product showcases.

### Wireframe

```
Desktop (> 1024px):
+--------------------------------------------------+
|                    HEADER / NAV                   |
+--------------------------------------------------+
|                                                    |
|         +---------- HERO TEXT ----------+          |
|         |  Left-aligned, starts col 2   |          |
|         |  Large display heading        |          |
|         +-------------------------------+          |
|                                                    |
|  +-- IMAGE --+                                     |
|  | col 1-5   |     +-------- TEXT --------+        |
|  |           |     |  col 6-11, offset    |        |
|  |           |     |  down 40px           |        |
|  +-----------+     +----------------------+        |
|                                                    |
|              +-------- WIDE BLOCK --------+        |
|              |  col 3-12, right-heavy     |        |
|              +----------------------------+        |
|                                                    |
|  +--- TEXT ---+              +--- IMAGE ---+       |
|  | col 1-4   |              |  col 8-12   |       |
|  +------------+              +-------------+       |
|                                                    |
+--------------------------------------------------+
|                     FOOTER                        |
+--------------------------------------------------+

Mobile (< 768px):
+--------------------+
|       HEADER       |
+--------------------+
|     HERO TEXT      |
+--------------------+
|      IMAGE         |
+--------------------+
|       TEXT         |
+--------------------+
|    WIDE BLOCK      |
+--------------------+
|       TEXT         |
+--------------------+
|      IMAGE         |
+--------------------+
|       FOOTER       |
+--------------------+
```

### Section Flow
1. Full-width header
2. Hero text offset from left edge (starts at column 2)
3. Image-text pair with vertical offset creating diagonal rhythm
4. Wide content block shifted right (columns 3-12)
5. Mirrored text-image pair with gap between
6. Footer

### CSS

```css
.asymmetric-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
}

.asym-header,
.asym-footer {
  grid-column: 1 / -1;
}

.asym-hero {
  grid-column: 2 / 11;
  padding: 80px 0 60px;
}

.asym-img-left {
  grid-column: 1 / 6;
  grid-row: span 1;
}

.asym-text-right {
  grid-column: 6 / 12;
  align-self: end;
  transform: translateY(40px);
}

.asym-wide-right {
  grid-column: 3 / -1;
  margin-top: 60px;
}

.asym-text-left {
  grid-column: 1 / 5;
}

.asym-img-right {
  grid-column: 8 / -1;
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .asymmetric-layout {
    grid-template-columns: repeat(8, 1fr);
    gap: 20px;
    padding: 0 24px;
  }

  .asym-hero {
    grid-column: 1 / -1;
    padding: 60px 0 40px;
  }

  .asym-img-left {
    grid-column: 1 / 5;
  }

  .asym-text-right {
    grid-column: 5 / -1;
    transform: translateY(20px);
  }

  .asym-wide-right {
    grid-column: 2 / -1;
    margin-top: 40px;
  }

  .asym-text-left {
    grid-column: 1 / 4;
  }

  .asym-img-right {
    grid-column: 5 / -1;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .asymmetric-layout {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
  }

  .asym-hero,
  .asym-img-left,
  .asym-text-right,
  .asym-wide-right,
  .asym-text-left,
  .asym-img-right {
    grid-column: 1 / -1;
    transform: none;
    margin-top: 0;
  }

  .asym-hero {
    padding: 40px 0 24px;
  }
}
```

### HTML Skeleton

```html
<div class="asymmetric-layout">
  <header class="asym-header"><!-- Nav --></header>
  <section class="asym-hero"><!-- Hero heading + subtext --></section>
  <div class="asym-img-left"><!-- Image --></div>
  <div class="asym-text-right"><!-- Body text --></div>
  <section class="asym-wide-right"><!-- Wide content block --></section>
  <div class="asym-text-left"><!-- Body text --></div>
  <div class="asym-img-right"><!-- Image --></div>
  <footer class="asym-footer"><!-- Footer --></footer>
</div>
```

---

## 3. Bento Grid

**Description:** Dashboard-style mixed card sizes inspired by Apple's bento box presentations. Cards of different spans create a mosaic. Ideal for feature overviews, dashboards, product capability showcases, and stats grids.

### Wireframe

```
Desktop (> 1024px):
+--------------------------------------------------+
|                    HEADER / NAV                   |
+--------------------------------------------------+
|                                                    |
|  +------ LARGE (2x2) ------+  +-- MED --+        |
|  |                          |  | (1x2)   |        |
|  |     Primary Feature      |  |         |        |
|  |                          |  +---------+        |
|  |                          |  +-- SM ---+        |
|  +--------------------------+  | (1x1)   |        |
|                                +---------+        |
|  +-- SM ---+  +-- SM ---+  +------ WIDE (2x1) -+ |
|  | (1x1)   |  | (1x1)   |  |                   | |
|  +---------+  +---------+  +-------------------+ |
|                                                    |
|  +-- MED --+  +------ LARGE (2x2) ------+        |
|  | (1x2)   |  |                          |        |
|  |         |  |     Secondary Feature    |        |
|  +---------+  |                          |        |
|  +-- SM ---+  |                          |        |
|  | (1x1)   |  +--------------------------+        |
|  +---------+                                      |
+--------------------------------------------------+
|                     FOOTER                        |
+--------------------------------------------------+

Mobile (< 768px):
+--------------------+
|       HEADER       |
+--------------------+
| Primary Feature    |
|    (full width)    |
+--------------------+
|   Medium Card      |
+--------------------+
|   Small Card       |
+--------------------+
| Small  |  Small    |
+--------+-----------+
|   Wide Card        |
+--------------------+
|   Medium Card      |
+--------------------+
| Secondary Feature  |
|   (full width)     |
+--------------------+
|   Small Card       |
+--------------------+
|       FOOTER       |
+--------------------+
```

### Section Flow
1. Header
2. Primary feature (2x2) + medium card (1x2) + small card (1x1) in first cluster
3. Two small cards + one wide card (2x1) in second row
4. Medium card (1x2) + secondary feature (2x2) + small card in third cluster
5. Footer

### CSS

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.bento-header,
.bento-footer {
  grid-column: 1 / -1;
}

/* Card size variants */
.bento-card-lg {
  grid-column: span 2;
  grid-row: span 2;
  min-height: 376px;
}

.bento-card-md {
  grid-column: span 1;
  grid-row: span 2;
  min-height: 376px;
}

.bento-card-wide {
  grid-column: span 2;
  grid-row: span 1;
}

.bento-card-sm {
  grid-column: span 1;
  grid-row: span 1;
}

/* Card base styling */
.bento-card-lg,
.bento-card-md,
.bento-card-wide,
.bento-card-sm {
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(160px, auto);
    gap: 14px;
    padding: 0 20px;
  }

  .bento-card-lg {
    grid-column: span 2;
    grid-row: span 2;
    min-height: 334px;
  }

  .bento-card-md {
    grid-column: span 1;
    grid-row: span 2;
    min-height: 334px;
  }

  .bento-card-wide {
    grid-column: span 2;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(140px, auto);
    gap: 12px;
    padding: 0 16px;
  }

  .bento-card-lg {
    grid-column: 1 / -1;
    grid-row: span 2;
    min-height: 280px;
  }

  .bento-card-md {
    grid-column: 1 / -1;
    grid-row: span 1;
    min-height: 180px;
  }

  .bento-card-wide {
    grid-column: 1 / -1;
  }

  .bento-card-sm {
    grid-column: span 1;
  }
}
```

### HTML Skeleton

```html
<div class="bento-grid">
  <header class="bento-header"><!-- Nav --></header>

  <!-- Cluster 1 -->
  <div class="bento-card-lg"><!-- Primary feature --></div>
  <div class="bento-card-md"><!-- Medium card --></div>
  <div class="bento-card-sm"><!-- Small card --></div>

  <!-- Cluster 2 -->
  <div class="bento-card-sm"><!-- Small card --></div>
  <div class="bento-card-sm"><!-- Small card --></div>
  <div class="bento-card-wide"><!-- Wide card --></div>

  <!-- Cluster 3 -->
  <div class="bento-card-md"><!-- Medium card --></div>
  <div class="bento-card-lg"><!-- Secondary feature --></div>
  <div class="bento-card-sm"><!-- Small card --></div>

  <footer class="bento-footer"><!-- Footer --></footer>
</div>
```

---

## 4. Stacked Narrative

**Description:** Full-width sections stacked vertically with sticky elements that persist during scroll. Each section is a complete viewport-height scene. Ideal for product launches, case studies, long-form storytelling, and annual reports.

### Wireframe

```
Desktop (> 1024px):
+==================================================+
|                    STICKY NAV                     |  <- sticky top
+==================================================+
|                                                    |
|                 SECTION 1: HERO                    |
|              (100vh, centered text)                |
|                                                    |
+--------------------------------------------------+
|  +-- STICKY LABEL --+                              |
|  | "Chapter One"    |  SECTION 2: CONTENT          |
|  | (sticky left)    |  +---- text + media ----+    |
|  |                  |  | scrolls past sticky  |    |
|  +------------------+  +---------------------+    |
|                        +---- text + media ----+    |
|                        |                     |    |
|                        +---------------------+    |
+--------------------------------------------------+
|                                                    |
|              SECTION 3: FULL BLEED                 |
|           (full-width image or video)              |
|                                                    |
+--------------------------------------------------+
|  +-- STICKY LABEL --+                              |
|  | "Chapter Two"    |  SECTION 4: CONTENT          |
|  | (sticky left)    |  +---- text + media ----+    |
|  |                  |  |                     |    |
|  +------------------+  +---------------------+    |
+--------------------------------------------------+
|                                                    |
|                SECTION 5: CTA                      |
|            (centered, full-width)                  |
|                                                    |
+==================================================+
|                     FOOTER                        |
+==================================================+

Mobile (< 768px):
+--------------------+
|    STICKY NAV      |
+--------------------+
|                    |
|    HERO (100vh)    |
|                    |
+--------------------+
| Chapter One        |
+--------------------+
|  Content block 1   |
+--------------------+
|  Content block 2   |
+--------------------+
| Full-bleed media   |
+--------------------+
| Chapter Two        |
+--------------------+
|  Content block 3   |
+--------------------+
|       CTA          |
+--------------------+
|      FOOTER        |
+--------------------+
```

### Section Flow
1. Sticky navigation bar (persists through scroll)
2. Full viewport hero
3. Sticky chapter label on left + scrolling content blocks on right
4. Full-bleed media break
5. Another sticky label + content section
6. CTA section
7. Footer

### CSS

```css
/* Sticky nav */
.stacked-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Full-viewport hero */
.stacked-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
}

/* Chapter section with sticky label */
.stacked-chapter {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 48px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 40px;
  min-height: 100vh;
}

.stacked-chapter-label {
  position: sticky;
  top: 100px; /* below nav height */
  align-self: start;
  height: fit-content;
}

.stacked-chapter-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.stacked-content-block {
  max-width: 680px;
}

/* Full-bleed media break */
.stacked-fullbleed {
  width: 100%;
  min-height: 70vh;
  overflow: hidden;
  position: relative;
}

.stacked-fullbleed img,
.stacked-fullbleed video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

/* CTA section */
.stacked-cta {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 40px;
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .stacked-chapter {
    grid-template-columns: 180px 1fr;
    gap: 32px;
    padding: 60px 24px;
  }

  .stacked-chapter-label {
    top: 80px;
  }

  .stacked-chapter-content {
    gap: 36px;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .stacked-chapter {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 40px 16px;
    min-height: auto;
  }

  .stacked-chapter-label {
    position: relative;
    top: auto;
    padding-bottom: 16px;
    border-bottom: 1px solid currentColor;
    opacity: 0.5;
  }

  .stacked-hero {
    min-height: 85vh;
    padding: 24px;
  }

  .stacked-fullbleed {
    min-height: 50vh;
  }

  .stacked-cta {
    min-height: 50vh;
    padding: 40px 16px;
  }

  .stacked-content-block {
    max-width: 100%;
  }
}
```

### HTML Skeleton

```html
<nav class="stacked-nav"><!-- Sticky navigation --></nav>

<section class="stacked-hero">
  <!-- Hero text, centered -->
</section>

<section class="stacked-chapter">
  <div class="stacked-chapter-label">
    <span>Chapter One</span>
  </div>
  <div class="stacked-chapter-content">
    <div class="stacked-content-block"><!-- Text + media --></div>
    <div class="stacked-content-block"><!-- Text + media --></div>
  </div>
</section>

<div class="stacked-fullbleed">
  <!-- Full-width image or video -->
</div>

<section class="stacked-chapter">
  <div class="stacked-chapter-label">
    <span>Chapter Two</span>
  </div>
  <div class="stacked-chapter-content">
    <div class="stacked-content-block"><!-- Text + media --></div>
  </div>
</section>

<section class="stacked-cta">
  <!-- Call to action -->
</section>

<footer><!-- Footer --></footer>
```

---

## 5. Single-Column Story

**Description:** Linear scroll-driven narrative in a single centered column. Content sections reveal sequentially with scroll-snap behavior and generous whitespace. Common on immersive product pages and interactive documentaries.

### Wireframe

```
Desktop (> 1024px):
+--------------------------------------------------+
|                    NAV (fixed)                    |
+--------------------------------------------------+
|                                                    |
|              +----- 640px max -----+               |
|              |                     |               |
|              |    HERO TITLE       |               |
|              |    + subtitle       |               |
|              |                     |               |
|              +---------------------+               |
|                                                    |
|  +----- FULL-WIDTH MEDIA (100vw) -----+           |
|  |                                     |           |
|  +-------------------------------------+           |
|                                                    |
|              +----- 640px max -----+               |
|              |                     |               |
|              |    Paragraph 1      |               |
|              |    (scroll reveal)  |               |
|              |                     |               |
|              +---------------------+               |
|                                                    |
|              +----- 640px max -----+               |
|              |    Pull Quote       |               |
|              +---------------------+               |
|                                                    |
|              +----- 640px max -----+               |
|              |    Paragraph 2      |               |
|              +---------------------+               |
|                                                    |
|  +----- FULL-WIDTH MEDIA (100vw) -----+           |
|  |                                     |           |
|  +-------------------------------------+           |
|                                                    |
|              +----- 640px max -----+               |
|              |    Paragraph 3      |               |
|              +---------------------+               |
|                                                    |
|              +----- CTA BLOCK -----+               |
|              |                     |               |
|              +---------------------+               |
|                                                    |
+--------------------------------------------------+
|                     FOOTER                        |
+--------------------------------------------------+

Mobile (< 768px):
Identical structure, max-width
becomes 100% with 16px padding.
```

### Section Flow
1. Fixed/sticky navigation
2. Centered hero (narrow column, ~640px)
3. Full-viewport-width media break
4. Alternating narrow text blocks and media breaks
5. Pull quotes break the reading rhythm
6. CTA and footer

### CSS

```css
.story-layout {
  width: 100%;
  overflow-x: hidden;
}

/* Fixed nav */
.story-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Narrow content column */
.story-narrow {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero section */
.story-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px; /* clear fixed nav */
}

.story-hero-inner {
  max-width: 640px;
  padding: 0 24px;
  text-align: center;
}

/* Full-width media */
.story-media {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-height: 60vh;
  overflow: hidden;
  position: relative;
}

.story-media img,
.story-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

/* Text blocks */
.story-text {
  padding: 80px 0;
}

/* Pull quote */
.story-pullquote {
  padding: 60px 0;
  text-align: center;
  border-top: 1px solid;
  border-bottom: 1px solid;
  margin: 40px 0;
  opacity: 0.9;
}

/* CTA */
.story-cta {
  padding: 120px 0;
  text-align: center;
}

/* Scroll-driven reveal animation */
.story-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.story-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .story-narrow {
    max-width: 560px;
  }

  .story-hero-inner {
    max-width: 560px;
  }

  .story-text {
    padding: 60px 0;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .story-narrow {
    max-width: 100%;
    padding: 0 16px;
  }

  .story-hero-inner {
    max-width: 100%;
    padding: 0 16px;
  }

  .story-hero {
    min-height: 85vh;
  }

  .story-media {
    min-height: 40vh;
  }

  .story-text {
    padding: 40px 0;
  }

  .story-pullquote {
    padding: 40px 0;
    margin: 24px 0;
  }

  .story-cta {
    padding: 60px 0;
  }
}
```

### Scroll Reveal JavaScript

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.story-reveal').forEach(el => observer.observe(el));
```

### HTML Skeleton

```html
<div class="story-layout">
  <nav class="story-nav"><!-- Navigation --></nav>

  <section class="story-hero">
    <div class="story-hero-inner">
      <!-- Hero title + subtitle -->
    </div>
  </section>

  <div class="story-media">
    <!-- Full-width image or video -->
  </div>

  <div class="story-narrow">
    <div class="story-text story-reveal">
      <!-- Paragraph 1 -->
    </div>

    <blockquote class="story-pullquote story-reveal">
      <!-- Pull quote -->
    </blockquote>

    <div class="story-text story-reveal">
      <!-- Paragraph 2 -->
    </div>
  </div>

  <div class="story-media">
    <!-- Full-width image or video -->
  </div>

  <div class="story-narrow">
    <div class="story-text story-reveal">
      <!-- Paragraph 3 -->
    </div>

    <div class="story-cta story-reveal">
      <!-- CTA block -->
    </div>
  </div>

  <footer><!-- Footer --></footer>
</div>
```

---

## 6. Organic/Fluid

**Description:** Curved sections, overlapping layers, and non-rectangular shapes. Uses CSS `clip-path`, `border-radius`, and overlapping positioned elements to break the rigid box model. Works for creative brands, event pages, health/wellness, and music.

### Wireframe

```
Desktop (> 1024px):
+--------------------------------------------------+
|                    NAV                             |
+--------------------------------------------------+
|                                                    |
|     HERO SECTION (full viewport)                   |
|     +---text centered---+                          |
|                                                    |
\__________________________________________________/  <- curved bottom
/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\  <- curved top
|                                                    |
|   WAVE SECTION (background color change)           |
|   +--- card ---+  +--- card ---+  +--- card ---+  |
|                                                    |
\__________________________________________________/  <- curved bottom

+--------------------------------------------------+
|                                                    |
|    OVERLAP SECTION                                 |
|    +--- floating card (overlaps above) ---+        |
|    |                                      |        |
|    +--------------------------------------+        |
|              body text below                       |
|                                                    |
+--------------------------------------------------+

/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\
|                                                    |
|   BLOB SECTION (organic shapes in background)      |
|         +--- content ---+                          |
|                                                    |
|    O           O         (decorative blobs)        |
|      O                                             |
\__________________________________________________/

+--------------------------------------------------+
|                     FOOTER                        |
+--------------------------------------------------+

Mobile: Same visual language, curves
are gentler, overlaps are smaller,
blobs are hidden or simplified.
```

### Section Flow
1. Hero with curved bottom edge
2. Wave section with curved top and bottom
3. Overlap section where a card extends into the section above
4. Organic blob section with decorative background shapes
5. Footer

### CSS

```css
/* Hero with curved bottom */
.organic-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  position: relative;
  clip-path: ellipse(75% 100% at 50% 0%);
}

/* Wave section with curved edges */
.organic-wave {
  padding: 120px 40px 100px;
  position: relative;
  margin-top: -60px;
}

.organic-wave::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 120px;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  background: inherit;
}

.organic-wave-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Overlap section */
.organic-overlap {
  position: relative;
  padding: 0 40px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.organic-overlap-card {
  max-width: 800px;
  margin: -80px auto 48px;
  padding: 48px;
  border-radius: 24px;
  position: relative;
  z-index: 10;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
}

/* Blob section */
.organic-blob-section {
  position: relative;
  padding: 120px 40px;
  overflow: hidden;
}

.organic-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  z-index: 0;
}

.organic-blob-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
}

.organic-blob-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: -50px;
}

.organic-blob-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  left: 60%;
}

.organic-blob-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .organic-hero {
    clip-path: ellipse(85% 100% at 50% 0%);
  }

  .organic-wave {
    padding: 100px 24px 80px;
  }

  .organic-wave-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .organic-overlap-card {
    margin-top: -60px;
    padding: 36px;
  }

  .organic-blob-1 { width: 300px; height: 300px; }
  .organic-blob-2 { width: 220px; height: 220px; }
  .organic-blob-3 { width: 180px; height: 180px; }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .organic-hero {
    clip-path: ellipse(100% 97% at 50% 0%);
    min-height: 85vh;
    padding: 24px;
  }

  .organic-wave {
    padding: 80px 16px 60px;
    margin-top: -30px;
  }

  .organic-wave::before {
    top: -30px;
    height: 60px;
  }

  .organic-wave-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .organic-overlap {
    padding: 0 16px 40px;
  }

  .organic-overlap-card {
    margin-top: -40px;
    padding: 24px;
    border-radius: 16px;
  }

  .organic-blob-section {
    padding: 60px 16px;
  }

  .organic-blob {
    filter: blur(60px);
    opacity: 0.2;
  }

  .organic-blob-1 { width: 200px; height: 200px; }
  .organic-blob-2 { width: 160px; height: 160px; }
  .organic-blob-3 { display: none; }
}
```

### HTML Skeleton

```html
<nav><!-- Navigation --></nav>

<section class="organic-hero">
  <!-- Hero text -->
</section>

<section class="organic-wave">
  <div class="organic-wave-cards">
    <div><!-- Card 1 --></div>
    <div><!-- Card 2 --></div>
    <div><!-- Card 3 --></div>
  </div>
</section>

<section class="organic-overlap">
  <div class="organic-overlap-card">
    <!-- Floating overlap card -->
  </div>
  <div><!-- Body text --></div>
</section>

<section class="organic-blob-section">
  <div class="organic-blob organic-blob-1"></div>
  <div class="organic-blob organic-blob-2"></div>
  <div class="organic-blob organic-blob-3"></div>
  <div class="organic-blob-content">
    <!-- Content -->
  </div>
</section>

<footer><!-- Footer --></footer>
```

---

## 7. Split-Screen

**Description:** Two-panel layout dividing the viewport into text and visual halves. One panel can be sticky while the other scrolls. Works for product comparison, features + imagery, portfolios, and landing pages.

### Wireframe

```
Desktop (> 1024px):
+--------------------------------------------------+
|                    NAV (full width)                |
+--------------------------------------------------+
|                      |                             |
|    LEFT PANEL        |     RIGHT PANEL             |
|    (sticky)          |     (scrolls)               |
|                      |                             |
|  +--- HEADING ---+   |   +--- IMAGE 1 ---+        |
|  |               |   |   |               |        |
|  |  Hero title   |   |   |               |        |
|  |  + body text  |   |   +---------------+        |
|  |  + CTA        |   |                             |
|  |               |   |   +--- IMAGE 2 ---+        |
|  +---------------+   |   |               |        |
|                      |   |               |        |
|                      |   +---------------+        |
|                      |                             |
|                      |   +--- IMAGE 3 ---+        |
|                      |   |               |        |
|                      |   +---------------+        |
+--------------------------------------------------+
|                                                    |
|              FULL-WIDTH SECTION                    |
|           (breaks out of split)                    |
|                                                    |
+--------------------------------------------------+
|                      |                             |
|    LEFT PANEL        |     RIGHT PANEL             |
|    (scrolls)         |     (sticky)                |
|                      |                             |
|   +--- CARD 1 ---+  |  +--- BIG IMAGE ---+       |
|   +--- CARD 2 ---+  |  |                 |       |
|   +--- CARD 3 ---+  |  |   (sticky)      |       |
|                      |  +------------------+       |
+--------------------------------------------------+
|                     FOOTER                        |
+--------------------------------------------------+

Tablet (768-1024px):
Same structure, 45/55 split instead
of 50/50.

Mobile (< 768px):
+--------------------+
|       NAV          |
+--------------------+
|    Heading         |
|    Body text       |
|    CTA             |
+--------------------+
|    Image 1         |
+--------------------+
|    Image 2         |
+--------------------+
|    Image 3         |
+--------------------+
| Full-width section |
+--------------------+
|    Card 1          |
+--------------------+
|    Card 2          |
+--------------------+
|    Card 3          |
+--------------------+
|    Big Image       |
+--------------------+
|      FOOTER        |
+--------------------+
```

### Section Flow
1. Full-width navigation
2. Split section 1: left text (sticky) + right images (scrolling)
3. Full-width break section
4. Split section 2: left cards (scrolling) + right image (sticky) -- mirrored
5. Footer

### CSS

```css
/* Split container */
.split-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* Left panel sticky variant */
.split-left-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
}

/* Right panel scrolling */
.split-right-scroll {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 60px;
}

/* Right panel sticky variant (for mirrored sections) */
.split-right-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  overflow: hidden;
}

.split-right-sticky img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* Left panel scrolling variant */
.split-left-scroll {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 60px;
}

/* Full-width break */
.split-break {
  grid-column: 1 / -1;
  padding: 80px 40px;
  text-align: center;
}

/* Scroll items */
.split-scroll-item {
  border-radius: 16px;
  overflow: hidden;
  min-height: 300px;
}

.split-scroll-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Card variant for scrolling panel */
.split-card {
  padding: 32px;
  border-radius: 16px;
  min-height: 200px;
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .split-section {
    grid-template-columns: 45fr 55fr;
  }

  .split-left-sticky,
  .split-right-scroll,
  .split-right-sticky,
  .split-left-scroll {
    padding: 40px;
  }

  .split-scroll-item {
    min-height: 240px;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .split-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .split-left-sticky,
  .split-right-sticky {
    position: relative;
    height: auto;
    min-height: auto;
    padding: 40px 16px;
  }

  .split-right-scroll,
  .split-left-scroll {
    padding: 16px;
    gap: 16px;
  }

  .split-scroll-item {
    min-height: 200px;
  }

  .split-card {
    padding: 24px;
  }

  .split-break {
    padding: 40px 16px;
  }
}
```

### HTML Skeleton

```html
<nav><!-- Full-width navigation --></nav>

<!-- Split 1: Left sticky text, right scrolling images -->
<section class="split-section">
  <div class="split-left-sticky">
    <h1><!-- Heading --></h1>
    <p><!-- Body text --></p>
    <button><!-- CTA --></button>
  </div>
  <div class="split-right-scroll">
    <div class="split-scroll-item"><img src="..." alt=""></div>
    <div class="split-scroll-item"><img src="..." alt=""></div>
    <div class="split-scroll-item"><img src="..." alt=""></div>
  </div>
</section>

<!-- Full-width break -->
<section class="split-break">
  <!-- Centered content -->
</section>

<!-- Split 2: Left scrolling cards, right sticky image (mirrored) -->
<section class="split-section">
  <div class="split-left-scroll">
    <div class="split-card"><!-- Card 1 --></div>
    <div class="split-card"><!-- Card 2 --></div>
    <div class="split-card"><!-- Card 3 --></div>
  </div>
  <div class="split-right-sticky">
    <img src="..." alt="">
  </div>
</section>

<footer><!-- Footer --></footer>
```

---

## Quick Reference Table

| # | Layout | Columns | Sticky Elements | Best For |
|---|--------|---------|-----------------|----------|
| 1 | Editorial Grid | 12-col asymmetric | None | Magazines, blogs, portfolios |
| 2 | Asymmetric | 12-col offset | None | Creative portfolios, brand storytelling |
| 3 | Bento Grid | 4-col mixed spans | None | Dashboards, feature showcases, stats |
| 4 | Stacked Narrative | Full-width + sidebar | Nav, chapter labels | Product launches, case studies |
| 5 | Single-Column Story | Centered 640px | Nav | Long-form, interactive docs |
| 6 | Organic/Fluid | Freeform | None | Creative brands, events, wellness |
| 7 | Split-Screen | 50/50 or 45/55 | Alternating panels | Product pages, comparisons |
