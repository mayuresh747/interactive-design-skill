---
name: Typewriter Text Effect
category: components
tags: [text, typewriter, cursor, typing, sequential, vanilla-js]
description: >
  Text types out character by character with a blinking cursor.
  Pure JS implementation with configurable speed, delay, and cursor style.
  Supports multiple lines with sequential typing.
---

## Preview

Text appears character by character as if being typed in real time. A blinking cursor (pipe or block style) sits at the insertion point and continues blinking after the line finishes. When multiple lines are configured, each line types out sequentially after the previous one completes, with a configurable pause between lines.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Typewriter Text</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --cursor-color: #90e0ef;
    --cursor-width: 2px;
    --font-size: clamp(1.5rem, 4vw, 3rem);
    --font-weight: 600;
    --font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    --blink-speed: 0.7s;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .typewriter-container {
    max-width: 800px;
    width: 100%;
  }

  .typewriter-line {
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    line-height: 1.4;
    min-height: 1.4em;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
  }

  .typewriter-cursor {
    display: inline-block;
    width: var(--cursor-width);
    height: 1em;
    background: var(--cursor-color);
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink var(--blink-speed) step-end infinite;
  }

  .typewriter-cursor--block {
    width: 0.6em;
    opacity: 0.7;
  }

  .typewriter-cursor--hidden {
    visibility: hidden;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }

  /* Demo layout */
  .demo-section {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;
  }

  .demo-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: -2rem;
    text-align: center;
  }
</style>
</head>
<body>

<div class="demo-section">
  <div>
    <p class="demo-label">Single line</p>
    <div class="typewriter-container" id="single"></div>
  </div>

  <div>
    <p class="demo-label">Multi-line sequential</p>
    <div class="typewriter-container" id="multi"></div>
  </div>
</div>

<script>
  /**
   * Typewriter — types text character by character with a blinking cursor.
   *
   * @param {HTMLElement} container — element to type into
   * @param {Object}      opts     — configuration
   * @param {string[]}    opts.lines       — array of text lines to type
   * @param {number}      opts.speed       — ms between characters (default: 60)
   * @param {number}      opts.lineDelay   — ms pause between lines (default: 800)
   * @param {number}      opts.startDelay  — ms before first character (default: 400)
   * @param {'pipe'|'block'} opts.cursorStyle — cursor shape (default: 'pipe')
   * @param {boolean}     opts.loop        — restart after all lines (default: false)
   * @param {number}      opts.loopDelay   — ms pause before restarting (default: 2000)
   * @param {number}      opts.deleteSpeed — ms between deleting chars on loop (default: 30)
   */
  class Typewriter {
    constructor(container, opts = {}) {
      this.container = container;
      this.lines = opts.lines || ['Hello, world.'];
      this.speed = opts.speed ?? 60;
      this.lineDelay = opts.lineDelay ?? 800;
      this.startDelay = opts.startDelay ?? 400;
      this.cursorStyle = opts.cursorStyle ?? 'pipe';
      this.loop = opts.loop ?? false;
      this.loopDelay = opts.loopDelay ?? 2000;
      this.deleteSpeed = opts.deleteSpeed ?? 30;

      this.currentLine = 0;
      this.currentChar = 0;
      this.lineElements = [];

      this._init();
    }

    _init() {
      this.container.innerHTML = '';
      this.lineElements = [];

      this.lines.forEach((_, i) => {
        const lineEl = document.createElement('div');
        lineEl.className = 'typewriter-line';
        this.container.appendChild(lineEl);
        this.lineElements.push(lineEl);
      });

      this.cursor = document.createElement('span');
      this.cursor.className = 'typewriter-cursor';
      if (this.cursorStyle === 'block') {
        this.cursor.classList.add('typewriter-cursor--block');
      }

      this.currentLine = 0;
      this.currentChar = 0;

      setTimeout(() => this._typeLine(), this.startDelay);
    }

    _typeLine() {
      const lineEl = this.lineElements[this.currentLine];
      const text = this.lines[this.currentLine];

      // Attach cursor to current line
      lineEl.appendChild(this.cursor);

      if (this.currentChar < text.length) {
        // Insert character before cursor
        const charNode = document.createTextNode(text[this.currentChar]);
        lineEl.insertBefore(charNode, this.cursor);
        this.currentChar++;

        // Randomize speed slightly for natural feel
        const jitter = Math.random() * 40 - 20;
        setTimeout(() => this._typeLine(), this.speed + jitter);
      } else {
        // Line complete
        this.currentChar = 0;
        this.currentLine++;

        if (this.currentLine < this.lines.length) {
          // Move cursor to next line after delay
          setTimeout(() => this._typeLine(), this.lineDelay);
        } else if (this.loop) {
          setTimeout(() => this._deleteAll(), this.loopDelay);
        }
        // If not looping and all lines done, cursor stays blinking on last line
      }
    }

    _deleteAll() {
      const lastLine = this.lineElements[this.lineElements.length - 1];

      const deleteChar = () => {
        // Find the last text node before cursor in any line
        for (let i = this.lineElements.length - 1; i >= 0; i--) {
          const el = this.lineElements[i];
          const textNodes = Array.from(el.childNodes).filter(
            n => n.nodeType === Node.TEXT_NODE
          );
          if (textNodes.length > 0) {
            const last = textNodes[textNodes.length - 1];
            if (last.textContent.length > 1) {
              last.textContent = last.textContent.slice(0, -1);
            } else {
              last.remove();
            }
            // Move cursor to this line
            el.appendChild(this.cursor);
            setTimeout(deleteChar, this.deleteSpeed);
            return;
          }
        }
        // All text deleted, restart
        this.currentLine = 0;
        this.currentChar = 0;
        setTimeout(() => this._typeLine(), this.startDelay);
      };

      deleteChar();
    }
  }

  // Demo: single line
  new Typewriter(document.getElementById('single'), {
    lines: ['The future is already here.'],
    speed: 55,
    cursorStyle: 'pipe',
  });

  // Demo: multi-line
  new Typewriter(document.getElementById('multi'), {
    lines: [
      'First, we design.',
      'Then, we build.',
      'Finally, we ship.',
    ],
    speed: 50,
    lineDelay: 600,
    cursorStyle: 'block',
    loop: true,
    loopDelay: 2000,
    deleteSpeed: 25,
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | Parameter | Default | Notes |
|---|---|---|---|
| Lines | `lines` | `['Hello, world.']` | Array of strings to type sequentially |
| Typing speed | `speed` | `60` | Milliseconds between characters |
| Line delay | `lineDelay` | `800` | Pause in ms between lines |
| Start delay | `startDelay` | `400` | Pause before first character |
| Cursor style | `cursorStyle` | `'pipe'` | `'pipe'` (thin line) or `'block'` (wide block) |
| Loop | `loop` | `false` | Restart after all lines complete |
| Loop delay | `loopDelay` | `2000` | Pause before delete-and-restart |
| Delete speed | `deleteSpeed` | `30` | Ms between character deletions |
| Cursor color | `--cursor-color` | `#90e0ef` | CSS variable |
| Cursor width | `--cursor-width` | `2px` | CSS variable (pipe mode) |
| Blink speed | `--blink-speed` | `0.7s` | CSS variable |
| Font family | `--font-family` | `monospace` | CSS variable |
| Font size | `--font-size` | `clamp(1.5rem, 4vw, 3rem)` | CSS variable |

---

## Dependencies

None. Pure CSS + vanilla JS.
