---
name: image-webgl-distortion
category: components
tags: [image, webgl, three.js, shader, distortion, ripple, hover, mouse]
description: >
  Image rendered as a Three.js plane with a ripple/wave distortion shader on hover.
  Mouse position drives distortion origin. Smooth easing on mouse enter/leave. Falls
  back to a CSS scale effect if WebGL unavailable.
---

## Preview

An image displayed on a WebGL plane using Three.js. On mouse hover, a ripple distortion emanates from the cursor position, warping the image surface like a liquid membrane. The distortion smoothly eases in when the mouse enters and fades out on leave. If the browser does not support WebGL, the component gracefully falls back to a CSS transform with a subtle scale-up effect on hover.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WebGL Image Distortion</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-muted: #888;
    --accent-1: #6366f1;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 40px 24px;
  }

  .distortion-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    margin-bottom: 24px;
  }

  .distortion-container {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16 / 10;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    cursor: pointer;
  }

  .distortion-container canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  /* CSS fallback for no WebGL */
  .distortion-fallback {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a3e 0%, #2d1b69 30%, #0f3460 60%, #1a1a2e 100%);
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .distortion-container:hover .distortion-fallback {
    transform: scale(1.05);
  }

  .distortion-title {
    margin-top: 20px;
    font-size: 1.1rem;
    color: var(--text-muted);
  }
</style>
</head>
<body>

<div class="distortion-label">Hover over the image</div>

<div class="distortion-container" id="distortionContainer">
  <!-- Canvas injected by JS or fallback shown -->
</div>

<p class="distortion-title">Generative Landscape -- Shader Study</p>

<script>
(function() {
  const container = document.getElementById('distortionContainer');
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Check WebGL support
  function webglSupported() {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  if (!webglSupported()) {
    container.innerHTML = '<div class="distortion-fallback"></div>';
    return;
  }

  // Three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Vertex shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader with ripple distortion
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Generate a procedural gradient image
    vec3 image(vec2 uv) {
      vec3 col1 = vec3(0.102, 0.102, 0.243); // #1a1a3e
      vec3 col2 = vec3(0.176, 0.106, 0.412); // #2d1b69
      vec3 col3 = vec3(0.059, 0.204, 0.376); // #0f3460
      float t = uv.x + uv.y * 0.5;
      vec3 color = mix(col1, col2, smoothstep(0.0, 0.5, t));
      color = mix(color, col3, smoothstep(0.4, 1.0, t));

      // Add some noise-like variation
      float pattern = sin(uv.x * 20.0 + uTime * 0.5) * cos(uv.y * 15.0 + uTime * 0.3) * 0.05;
      color += pattern;

      return color;
    }

    void main() {
      vec2 uv = vUv;

      // Ripple distortion from mouse position
      float dist = distance(uv, uMouse);
      float ripple = sin(dist * 30.0 - uTime * 4.0) * 0.02;
      float falloff = smoothstep(0.5, 0.0, dist);
      vec2 offset = normalize(uv - uMouse + 0.001) * ripple * falloff * uHover;

      vec2 distortedUv = uv + offset;

      // Wave distortion
      float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.005 * uHover;
      distortedUv.x += wave;

      vec3 color = image(distortedUv);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Material and mesh
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uResolution: { value: new THREE.Vector2(width, height) }
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms
  });

  const geometry = new THREE.PlaneGeometry(1, 1);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Mouse tracking
  const mouse = { x: 0.5, y: 0.5 };
  const smoothMouse = { x: 0.5, y: 0.5 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width;
    mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
  });

  container.addEventListener('mouseenter', () => {
    gsap.to(uniforms.uHover, { value: 1, duration: 0.6, ease: 'power2.out' });
  });

  container.addEventListener('mouseleave', () => {
    gsap.to(uniforms.uHover, { value: 0, duration: 0.8, ease: 'power2.inOut' });
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    uniforms.uTime.value += 0.016;

    // Smooth mouse
    smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
    smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;
    uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);

    renderer.render(scene, camera);
  }

  animate();

  // Resize
  window.addEventListener('resize', () => {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    renderer.setSize(w, h);
    uniforms.uResolution.value.set(w, h);
  });
})();
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Description |
|----------|-------------------|---------|-------------|
| Background | `--bg` | `#0a0a0a` | Page background |
| Container max width | CSS | `800px` | Maximum width of the image |
| Aspect ratio | CSS | `16/10` | Container proportions |
| Border radius | CSS | `16px` | Corner rounding |
| Ripple frequency | Shader: `dist * 30.0` | `30.0` | Number of ripple rings |
| Ripple amplitude | Shader: `0.02` | `0.02` | Strength of distortion |
| Ripple speed | Shader: `uTime * 4.0` | `4.0` | Animation speed of ripples |
| Wave amplitude | Shader: `0.005` | `0.005` | Secondary wave strength |
| Hover-in duration | JS: `duration` | `0.6` | Seconds to ramp up effect |
| Hover-out duration | JS: `duration` | `0.8` | Seconds to fade effect |
| Mouse smoothing | JS: `0.08` | `0.08` | Lerp factor (lower = smoother) |
| Pixel ratio cap | JS: `Math.min(dpr, 2)` | `2` | Max device pixel ratio |
| Fallback | CSS | `scale(1.05)` | Hover effect when WebGL unavailable |

---

## Dependencies

| Library | URL |
|---------|-----|
| Three.js | `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` |
| GSAP | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
