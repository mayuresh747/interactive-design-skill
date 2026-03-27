---
name: Text Scramble / Decode Effect
category: components
tags: [text, scramble, decode, matrix, hacker, glitch, reveal, vanilla-js]
description: >
  Text "decodes" from random characters to the final text. Characters cycle
  through random glyphs before settling into place. Inspired by hacker/matrix
  aesthetics. Configurable character set, speed, and sequential vs parallel reveal.
---

## Preview

Text appears as a jumble of random characters (symbols, numbers, mixed-case letters) that rapidly cycle. Characters resolve one by one (sequential) or all at once over time (parallel) into the final readable text. The effect evokes terminal decryption, data streaming, or cyberpunk aesthetics. Works well for headings, hero text, or any reveal moment.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Scramble</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --scramble-color: #90e0ef;
    --font-size: clamp(2rem, 5vw, 4rem);
    --font-weight: 700;
    --font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
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

  .scramble-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  .scramble-text {
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    letter-spacing: -0.02em;
    line-height: 1.2;
    text-align: center;
    max-width: 800px;
  }

  .scramble-text .char-scrambling {
    color: var(--scramble-color);
  }

  .demo-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: -2rem;
  }

  .demo-btn {
    padding: 0.6rem 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    background: transparent;
    color: var(--text);
    font-size: 0.875rem;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .demo-btn:hover {
    border-color: var(--scramble-color);
  }
</style>
</head>
<body>

<div class="scramble-container">
  <p class="demo-label">Sequential reveal</p>
  <div class="scramble-text" id="seqText">DECRYPTING SIGNAL</div>

  <p class="demo-label">Parallel reveal</p>
  <div class="scramble-text" id="parText">THE FUTURE IS NOW</div>

  <button class="demo-btn" id="replayBtn">Replay</button>
</div>

<script>
  /**
   * TextScramble — cycles characters through random glyphs before settling.
   *
   * @param {HTMLElement} element — target element
   * @param {Object}      opts
   * @param {string}      opts.finalText    — text to resolve to (default: element's textContent)
   * @param {string}      opts.charset      — characters to scramble with
   * @param {string}      opts.mode         — 'sequential' | 'parallel'
   * @param {number}      opts.speed        — ms between ticks (default: 30)
   * @param {number}      opts.revealDelay  — ms between each char lock (sequential, default: 50)
   * @param {number}      opts.scrambleTicks — how many ticks before a char locks (parallel, default: 15)
   * @param {number}      opts.startDelay   — ms before scramble begins (default: 0)
   * @param {Function}    opts.onComplete   — callback when done
   */
  class TextScramble {
    constructor(element, opts = {}) {
      this.el = element;
      this.finalText = opts.finalText ?? element.textContent;
      this.charset = opts.charset ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]~^';
      this.mode = opts.mode ?? 'sequential';
      this.speed = opts.speed ?? 30;
      this.revealDelay = opts.revealDelay ?? 50;
      this.scrambleTicks = opts.scrambleTicks ?? 15;
      this.startDelay = opts.startDelay ?? 0;
      this.onComplete = opts.onComplete ?? null;

      this._frame = null;
      this._resolved = [];
    }

    start() {
      return new Promise(resolve => {
        this._resolved = new Array(this.finalText.length).fill(false);
        this._tickCount = new Array(this.finalText.length).fill(0);

        setTimeout(() => {
          if (this.mode === 'sequential') {
            this._runSequential(resolve);
          } else {
            this._runParallel(resolve);
          }
        }, this.startDelay);
      });
    }

    stop() {
      cancelAnimationFrame(this._frame);
      clearTimeout(this._timeout);
    }

    _randomChar() {
      return this.charset[Math.floor(Math.random() * this.charset.length)];
    }

    _render() {
      let html = '';
      for (let i = 0; i < this.finalText.length; i++) {
        if (this.finalText[i] === ' ') {
          html += ' ';
        } else if (this._resolved[i]) {
          html += this.finalText[i];
        } else {
          html += `<span class="char-scrambling">${this._randomChar()}</span>`;
        }
      }
      this.el.innerHTML = html;
    }

    _runSequential(resolve) {
      let lockedIndex = 0;
      const tick = () => {
        this._render();

        if (lockedIndex < this.finalText.length) {
          // Skip spaces
          while (lockedIndex < this.finalText.length && this.finalText[lockedIndex] === ' ') {
            this._resolved[lockedIndex] = true;
            lockedIndex++;
          }

          this._tickCount[lockedIndex] = (this._tickCount[lockedIndex] || 0) + 1;

          if (this._tickCount[lockedIndex] >= Math.ceil(this.revealDelay / this.speed)) {
            this._resolved[lockedIndex] = true;
            lockedIndex++;
          }

          this._timeout = setTimeout(tick, this.speed);
        } else {
          this.el.textContent = this.finalText;
          if (this.onComplete) this.onComplete();
          resolve();
        }
      };
      tick();
    }

    _runParallel(resolve) {
      const tick = () => {
        for (let i = 0; i < this.finalText.length; i++) {
          if (!this._resolved[i] && this.finalText[i] !== ' ') {
            this._tickCount[i]++;
            // Each char resolves after a staggered number of ticks
            const threshold = this.scrambleTicks + Math.floor(i * 0.5);
            if (this._tickCount[i] >= threshold) {
              this._resolved[i] = true;
            }
          }
        }

        this._render();

        if (this._resolved.every(r => r)) {
          this.el.textContent = this.finalText;
          if (this.onComplete) this.onComplete();
          resolve();
        } else {
          this._timeout = setTimeout(tick, this.speed);
        }
      };
      tick();
    }
  }

  // Initialize demos
  function runDemos() {
    const seq = new TextScramble(document.getElementById('seqText'), {
      mode: 'sequential',
      speed: 30,
      revealDelay: 80,
    });

    const par = new TextScramble(document.getElementById('parText'), {
      mode: 'parallel',
      speed: 40,
      scrambleTicks: 12,
      startDelay: 500,
    });

    seq.start();
    par.start();
  }

  // Initial run
  runDemos();

  // Replay button
  document.getElementById('replayBtn').addEventListener('click', () => {
    document.getElementById('seqText').textContent = 'DECRYPTING SIGNAL';
    document.getElementById('parText').textContent = 'THE FUTURE IS NOW';
    runDemos();
  });
</script>

</body>
</html>
```

---

## Configuration

| Property | Parameter | Default | Notes |
|---|---|---|---|
| Final text | `finalText` | Element's `textContent` | Text to decode into |
| Character set | `charset` | `A-Z a-z 0-9 @#$%&*!?<>{}[]~^` | Pool of scramble characters |
| Mode | `mode` | `'sequential'` | `'sequential'` locks chars left-to-right; `'parallel'` all resolve over time |
| Tick speed | `speed` | `30` | Ms between render frames |
| Reveal delay | `revealDelay` | `50` | Ms per char lock (sequential mode) |
| Scramble ticks | `scrambleTicks` | `15` | Min ticks before lock (parallel mode) |
| Start delay | `startDelay` | `0` | Ms before scramble begins |
| Scramble color | `--scramble-color` | `#90e0ef` | Color of unresolved characters |
| Font family | `--font-family` | `monospace` | CSS variable |
| Font size | `--font-size` | `clamp(2rem, 5vw, 4rem)` | CSS variable |

### Suggested Character Sets

| Style | Charset |
|---|---|
| Matrix / hacker | `'01'` |
| Symbols only | `'@#$%&*!?<>{}[]~^+=\|/'` |
| Katakana | `'アイウエオカキクケコサシスセソタチツテト'` |
| Numeric | `'0123456789'` |
| Full (default) | Letters + numbers + symbols |

---

## Dependencies

None. Pure CSS + vanilla JS.
