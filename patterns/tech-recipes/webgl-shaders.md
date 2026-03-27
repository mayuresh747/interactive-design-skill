---
name: webgl-shaders
category: tech-recipes
tags: [webgl, glsl, shaders, threejs, vertex-shader, fragment-shader, noise, ripple, distortion, mouse]
description: >
  WebGL shader basics for web effects using Three.js ShaderMaterial. Three
  complete shader examples: mouse-driven ripple distortion, time-based gradient
  shifting, and simplex noise texture. Includes uniform passing and image
  texture application.
---

## Overview

Shaders are programs that run on the GPU. They control how every pixel is rendered, enabling effects impossible with CSS or JavaScript alone.

Two types of shaders work together:
- **Vertex shader:** positions each point of the geometry. Use for displacement, waves, morphing.
- **Fragment shader:** colors each pixel. Use for gradients, noise textures, color effects, distortion.

Three.js wraps WebGL and provides `ShaderMaterial` which takes GLSL code as strings, passes JavaScript values to the GPU via "uniforms," and renders the result.

**When to use:** Hero image distortion, liquid/organic backgrounds, custom hover effects on images, generative art, anything that needs per-pixel control. Shaders run at 60fps because the GPU processes all pixels in parallel.

**Performance:** Shaders are fast (GPU-parallel) but shader compilation can cause a one-time jank. Keep fragment shaders simple on mobile. Test on low-end devices.

---

## Setup

### CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

### Basic ShaderMaterial

```js
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv.x, vUv.y, sin(uTime) * 0.5 + 0.5, 1.0);
    }
  `,
});
```

### Passing Uniforms

Uniforms are JavaScript values sent to the shader each frame:

```js
// In animation loop
material.uniforms.uTime.value = clock.getElapsedTime();
material.uniforms.uMouse.value.set(mouseX, mouseY);
```

Common uniform types:
- `float` — `{ value: 0.0 }`
- `vec2` — `{ value: new THREE.Vector2(0, 0) }`
- `vec3` — `{ value: new THREE.Vector3(0, 0, 0) }`
- `sampler2D` (texture) — `{ value: texture }`

---

## Shader Examples

### Simplex Noise GLSL Function

Used by multiple shaders below. Include this at the top of any fragment or vertex shader that needs organic noise.

```glsl
// Simplex 2D noise — adapted from Ashima Arts (MIT)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
```

### Shader 1: Ripple/Wave Distortion (Mouse-Driven)

Displaces vertices based on distance from mouse position. Creates a bulge/ripple that follows the cursor.

```glsl
// ── Vertex Shader ──
uniform float uTime;
uniform vec2 uMouse;
uniform float uStrength;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Distance from mouse (in UV space)
  float dist = distance(uv, uMouse);

  // Ripple displacement on Z axis
  float ripple = sin(dist * 20.0 - uTime * 3.0) * exp(-dist * 5.0) * uStrength;
  pos.z += ripple;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

```glsl
// ── Fragment Shader ──
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  // Slight UV distortion near mouse
  float dist = distance(vUv, uMouse);
  vec2 distortedUv = vUv + normalize(vUv - uMouse) * sin(dist * 15.0 - uTime * 2.0) * 0.02 * exp(-dist * 4.0);

  vec4 color = texture2D(uTexture, distortedUv);
  gl_FragColor = color;
}
```

### Shader 2: Gradient Color Shifting (Time-Based)

Smooth hue rotation across the surface, driven by time.

```glsl
// ── Fragment Shader ──
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// HSL to RGB conversion
vec3 hsl2rgb(float h, float s, float l) {
  vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

void main() {
  // Hue shifts with position and time
  float hue = vUv.x * 0.3 + vUv.y * 0.2 + uTime * 0.1;
  float saturation = 0.7;
  float lightness = 0.5 + sin(vUv.y * 3.14159 + uTime * 0.5) * 0.15;

  vec3 color = hsl2rgb(hue, saturation, lightness);

  gl_FragColor = vec4(color, 1.0);
}
```

### Shader 3: Noise-Based Texture (Organic Movement)

Simplex noise creates organic, fluid-like patterns that shift over time.

```glsl
// ── Fragment Shader ── (include simplex noise function above)
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

// ... paste snoise function here ...

void main() {
  // Layer multiple octaves of noise for complexity
  float n1 = snoise(vUv * 3.0 + uTime * 0.3);
  float n2 = snoise(vUv * 6.0 - uTime * 0.2) * 0.5;
  float n3 = snoise(vUv * 12.0 + uTime * 0.1) * 0.25;
  float noise = n1 + n2 + n3;

  // Mouse influence
  float mouseDist = distance(vUv, uMouse);
  noise += sin(mouseDist * 10.0 - uTime * 2.0) * 0.3 * exp(-mouseDist * 3.0);

  // Map noise to color
  vec3 color1 = vec3(0.388, 0.400, 0.945); // #6366f1
  vec3 color2 = vec3(0.133, 0.827, 0.933); // #22d3ee
  vec3 color3 = vec3(0.925, 0.282, 0.600); // #ec4899

  vec3 color = mix(color1, color2, smoothstep(-0.5, 0.5, noise));
  color = mix(color, color3, smoothstep(0.3, 0.8, noise));

  gl_FragColor = vec4(color, 1.0);
}
```

---

## Complete Working Example

Image with mouse-driven ripple distortion effect. Hover over the image to see the ripple follow your cursor.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WebGL Shader — Mouse Ripple Effect</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0a0a0a;
    color: #f0f0f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    flex-direction: column;
    gap: 24px;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  p {
    color: #888;
    font-size: 0.9rem;
  }

  #shader-canvas {
    width: 800px;
    max-width: 90vw;
    aspect-ratio: 16/10;
    border-radius: 16px;
    overflow: hidden;
    cursor: crosshair;
  }

  .mode-buttons {
    display: flex;
    gap: 8px;
  }

  .mode-buttons button {
    padding: 8px 20px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.15);
    background: transparent;
    color: #888;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .mode-buttons button.active {
    background: #6366f1;
    border-color: #6366f1;
    color: #fff;
  }
</style>
</head>
<body>

<h1>WebGL Shader Effects</h1>
<p>Move your mouse over the canvas. Switch between shader types below.</p>

<div id="shader-canvas"></div>

<div class="mode-buttons">
  <button class="active" onclick="setShader('ripple', this)">Ripple</button>
  <button onclick="setShader('gradient', this)">Gradient</button>
  <button onclick="setShader('noise', this)">Noise</button>
</div>

<script>
  // ── SIMPLEX NOISE GLSL ──
  const simplexNoise = `
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                          -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m * m; m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
  `;

  // ── SHARED VERTEX SHADER ──
  const vertexShaderRipple = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float dist = distance(uv, uMouse);
      float ripple = sin(dist * 20.0 - uTime * 3.0) * exp(-dist * 5.0) * 0.15;
      pos.z += ripple;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const vertexShaderFlat = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // ── FRAGMENT SHADERS ──
  const fragmentRipple = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      float dist = distance(vUv, uMouse);

      // Ripple rings
      float ripple = sin(dist * 30.0 - uTime * 4.0) * 0.5 + 0.5;
      ripple *= exp(-dist * 4.0);

      // Base gradient
      vec3 color1 = vec3(0.388, 0.400, 0.945);
      vec3 color2 = vec3(0.133, 0.827, 0.933);

      vec3 base = mix(color1, color2, vUv.x + sin(uTime * 0.5) * 0.2);

      // Brighten near ripple
      vec3 color = base + vec3(ripple * 0.4);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const fragmentGradient = `
    uniform float uTime;
    varying vec2 vUv;

    vec3 hsl2rgb(float h, float s, float l) {
      vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
      return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
    }

    void main() {
      float hue = vUv.x * 0.3 + vUv.y * 0.2 + uTime * 0.08;
      float saturation = 0.7;
      float lightness = 0.45 + sin(vUv.y * 3.14159 + uTime * 0.5) * 0.15;
      vec3 color = hsl2rgb(hue, saturation, lightness);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const fragmentNoise = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    ${simplexNoise}

    void main() {
      float n1 = snoise(vUv * 3.0 + uTime * 0.3);
      float n2 = snoise(vUv * 6.0 - uTime * 0.2) * 0.5;
      float n3 = snoise(vUv * 12.0 + uTime * 0.1) * 0.25;
      float noise = n1 + n2 + n3;

      float mouseDist = distance(vUv, uMouse);
      noise += sin(mouseDist * 10.0 - uTime * 2.0) * 0.3 * exp(-mouseDist * 3.0);

      vec3 c1 = vec3(0.388, 0.400, 0.945);
      vec3 c2 = vec3(0.133, 0.827, 0.933);
      vec3 c3 = vec3(0.925, 0.282, 0.600);

      vec3 color = mix(c1, c2, smoothstep(-0.5, 0.5, noise));
      color = mix(color, c3, smoothstep(0.3, 0.8, noise));

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // ── SHADER CONFIGS ──
  const shaderConfigs = {
    ripple: { vertex: vertexShaderRipple, fragment: fragmentRipple },
    gradient: { vertex: vertexShaderFlat, fragment: fragmentGradient },
    noise: { vertex: vertexShaderFlat, fragment: fragmentNoise },
  };

  // ── THREE.JS SETUP ──
  const container = document.getElementById('shader-canvas');
  const width = container.clientWidth;
  const height = container.clientHeight;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
  camera.position.z = 1;

  // Plane geometry fills the view
  const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);

  // Uniforms shared across all shaders
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(width, height) },
  };

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaderConfigs.ripple.vertex,
    fragmentShader: shaderConfigs.ripple.fragment,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // ── MOUSE TRACKING ──
  const targetMouse = new THREE.Vector2(0.5, 0.5);

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    targetMouse.x = (e.clientX - rect.left) / rect.width;
    targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // flip Y for UV space
  });

  container.addEventListener('mouseleave', () => {
    targetMouse.set(0.5, 0.5);
  });

  // ── SHADER SWITCHING ──
  function setShader(type, btn) {
    const config = shaderConfigs[type];
    material.vertexShader = config.vertex;
    material.fragmentShader = config.fragment;
    material.needsUpdate = true;

    document.querySelectorAll('.mode-buttons button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // ── RESIZE ──
  const resizeObserver = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    uniforms.uResolution.value.set(w, h);
  });
  resizeObserver.observe(container);

  // ── ANIMATION LOOP ──
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    uniforms.uTime.value = clock.getElapsedTime();

    // Smooth mouse interpolation
    uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.08;
    uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.08;

    renderer.render(scene, camera);
  }
  animate();
</script>

</body>
</html>
```

---

## Applying Shaders to Image Textures

Load an image as a Three.js texture and use it in the shader:

```js
const textureLoader = new THREE.TextureLoader();
const imageTexture = textureLoader.load('image.jpg');

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTexture: { value: imageTexture },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: vertexShaderRipple,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      float dist = distance(vUv, uMouse);
      vec2 distortedUv = vUv + normalize(vUv - uMouse)
        * sin(dist * 15.0 - uTime * 2.0) * 0.02 * exp(-dist * 4.0);

      vec4 color = texture2D(uTexture, distortedUv);
      gl_FragColor = color;
    }
  `,
});
```

Use `PlaneGeometry` sized to the image's aspect ratio:

```js
const aspect = imageWidth / imageHeight;
const geometry = new THREE.PlaneGeometry(aspect, 1, 64, 64);
```

---

## Integration Notes

### With ScrollTrigger

Pass scroll progress as a uniform:

```js
ScrollTrigger.create({
  trigger: '.shader-section',
  start: 'top bottom',
  end: 'bottom top',
  onUpdate: (self) => {
    material.uniforms.uScroll.value = self.progress;
  }
});
```

In the shader:

```glsl
uniform float uScroll;
// Use uScroll (0.0 to 1.0) to drive effects
```

### With Lenis

No direct integration needed. Lenis controls scroll, ScrollTrigger reads it, and the `onUpdate` callback feeds the uniform.

### Debugging shaders

Shaders fail silently. To debug:
- Check browser console for GLSL compilation errors
- Output values as colors: `gl_FragColor = vec4(someValue, 0.0, 0.0, 1.0);`
- Use `#ifdef GL_ES` / `precision mediump float;` for mobile compatibility
- Keep precision directive at the top of fragment shaders for mobile

---

## Configuration

| Uniform | Type | Description |
|---------|------|-------------|
| `uTime` | `float` | Elapsed time in seconds. Drives all time-based animation |
| `uMouse` | `vec2` | Mouse position in UV space (0-1). X = left-right, Y = bottom-top |
| `uResolution` | `vec2` | Canvas size in pixels. Used for aspect-ratio-correct effects |
| `uTexture` | `sampler2D` | Image texture loaded via `TextureLoader` |
| `uScroll` | `float` | Scroll progress (0-1) passed from ScrollTrigger |
| `uStrength` | `float` | Effect intensity multiplier |

### Tunable shader parameters

| Parameter | In Shader | Default | Effect |
|-----------|-----------|---------|--------|
| Wave frequency | `dist * 20.0` | `20.0` | Higher = more ripple rings |
| Wave speed | `uTime * 3.0` | `3.0` | Higher = faster ripple animation |
| Falloff | `exp(-dist * 5.0)` | `5.0` | Higher = ripple concentrated near mouse |
| Displacement | `* 0.15` | `0.15` | Vertex displacement strength |
| UV distortion | `* 0.02` | `0.02` | Pixel distortion amount |
| Noise scale | `vUv * 3.0` | `3.0` | Lower = larger noise features |
| Noise speed | `uTime * 0.3` | `0.3` | Speed of noise movement |
| Geometry segments | `PlaneGeometry(1, 1, 64, 64)` | `64` | More segments = smoother vertex displacement |

---

## Dependencies

| Library | URL |
|---------|-----|
| Three.js r128 | `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` |
