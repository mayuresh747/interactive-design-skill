---
name: threejs-scene
category: tech-recipes
tags: [threejs, webgl, 3d, background, animation, mouse-follow, geometry]
description: >
  Three.js scene setup for animated web backgrounds. Renderer, camera, scene,
  lighting, resize handler, animation loop. Floating geometric shapes with
  mouse-follow camera. Supports fixed background and interactive OrbitControls modes.
---

## Overview

Three.js provides GPU-accelerated 3D rendering in the browser via WebGL. Use it for:

- Animated hero backgrounds with floating geometry
- Interactive 3D product showcases
- Particle systems and generative art
- Immersive scroll-driven 3D scenes

A minimal scene requires four things: a renderer (draws pixels), a camera (viewpoint), a scene (container for objects), and an animation loop (requestAnimationFrame). Add lighting, geometry, and materials on top.

**When to use:** Landing pages, portfolio sites, creative agency work, product pages where visual impact matters. Avoid on content-heavy pages where it adds load without value.

**Performance note:** Three.js scenes add 600KB+ (minified) and consume GPU. Always provide a static fallback for low-power devices. Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` to cap resolution.

---

## Setup

### CDN Links

```html
<!-- Three.js core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- OrbitControls (interactive mode only) -->
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

### Minimal Initialization

```js
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,                                    // FOV
  window.innerWidth / window.innerHeight, // Aspect
  0.1,                                   // Near
  100                                    // Far
);
camera.position.set(0, 0, 5);

// Scene
const scene = new THREE.Scene();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

---

## Complete Working Example

Full self-contained page: floating icosahedrons and tori with mouse-follow camera, fog, dual lighting, and fixed background mode.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Three.js Floating Geometry Background</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #f0f0f0;
    overflow-x: hidden;
  }

  /* Fixed background mode */
  #scene-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  /* Toggle: interactive mode overrides */
  #scene-container.interactive {
    z-index: 0;
    pointer-events: auto;
  }

  .content {
    position: relative;
    z-index: 1;
    min-height: 200vh;
    padding: 15vh 10vw;
  }

  .content h1 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
  }

  .content p {
    font-size: 1.2rem;
    max-width: 500px;
    opacity: 0.7;
    line-height: 1.6;
  }

  .mode-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
    backdrop-filter: blur(10px);
  }
</style>
</head>
<body>

<div id="scene-container"></div>

<button class="mode-toggle" onclick="toggleMode()">Switch to Interactive Mode</button>

<div class="content">
  <h1>Three.js Background</h1>
  <p>Floating geometric shapes rendered with WebGL. The camera follows the mouse cursor. Scroll to see content layered on top.</p>
</div>

<script>
  // ── CONFIG ──
  const CONFIG = {
    shapeCount: 12,
    rotationSpeed: 0.003,
    mouseInfluence: 0.3,
    fogColor: 0x0a0a14,
    fogNear: 3,
    fogFar: 15,
    ambientIntensity: 0.4,
    directionalIntensity: 0.8,
    cameraZ: 6,
  };

  // ── SETUP ──
  const container = document.getElementById('scene-container');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(CONFIG.fogColor, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(CONFIG.fogColor, CONFIG.fogNear, CONFIG.fogFar);

  const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 100
  );
  camera.position.set(0, 0, CONFIG.cameraZ);

  // OrbitControls (disabled by default, used in interactive mode)
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enabled = false;

  // ── LIGHTING ──
  const ambient = new THREE.AmbientLight(0xffffff, CONFIG.ambientIntensity);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, CONFIG.directionalIntensity);
  directional.position.set(5, 5, 5);
  scene.add(directional);

  const backLight = new THREE.DirectionalLight(0x6366f1, 0.3);
  backLight.position.set(-5, -3, -5);
  scene.add(backLight);

  // ── GEOMETRY ──
  const shapes = [];
  const geometries = [
    new THREE.IcosahedronGeometry(0.6, 0),
    new THREE.TorusGeometry(0.5, 0.2, 16, 32),
    new THREE.OctahedronGeometry(0.5, 0),
    new THREE.TorusKnotGeometry(0.35, 0.12, 64, 8),
  ];

  const palette = [0x6366f1, 0x22d3ee, 0x8b5cf6, 0xec4899, 0x10b981];

  for (let i = 0; i < CONFIG.shapeCount; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = new THREE.MeshStandardMaterial({
      color: palette[Math.floor(Math.random() * palette.length)],
      roughness: 0.4,
      metalness: 0.6,
      wireframe: Math.random() > 0.7,
    });
    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6
    );

    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    // Store per-shape rotation speeds
    mesh.userData = {
      rotX: (Math.random() - 0.5) * CONFIG.rotationSpeed * 2,
      rotY: (Math.random() - 0.5) * CONFIG.rotationSpeed * 2,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.3 + Math.random() * 0.5,
      floatAmplitude: 0.2 + Math.random() * 0.3,
    };

    scene.add(mesh);
    shapes.push(mesh);
  }

  // ── MOUSE TRACKING ──
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };

  document.addEventListener('mousemove', (e) => {
    targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── RESIZE ──
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── MODE TOGGLE ──
  let interactive = false;
  function toggleMode() {
    interactive = !interactive;
    controls.enabled = interactive;
    container.classList.toggle('interactive', interactive);
    document.querySelector('.mode-toggle').textContent =
      interactive ? 'Switch to Background Mode' : 'Switch to Interactive Mode';
  }

  // ── ANIMATION LOOP ──
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth mouse interpolation
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Rotate + float each shape
    shapes.forEach((mesh) => {
      const d = mesh.userData;
      mesh.rotation.x += d.rotX;
      mesh.rotation.y += d.rotY;
      mesh.position.y += Math.sin(elapsed * d.floatSpeed + d.floatOffset) * 0.002 * d.floatAmplitude;
    });

    // Mouse-follow camera (background mode only)
    if (!interactive) {
      camera.position.x += (mouse.x * CONFIG.mouseInfluence - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * CONFIG.mouseInfluence - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
    }

    if (interactive) controls.update();

    renderer.render(scene, camera);
  }
  animate();
</script>

</body>
</html>
```

---

## Integration Notes

### As a fixed background

Set the canvas container to `position: fixed; z-index: -1; pointer-events: none`. All page content sits on top with `position: relative; z-index: 1`. The scene renders behind everything and does not intercept clicks or scroll.

### With GSAP ScrollTrigger

Tie Three.js uniforms or camera position to scroll progress:

```js
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    camera.position.z = 6 + self.progress * 4; // dolly out on scroll
    camera.rotation.x = self.progress * 0.3;
  }
});
```

### With Lenis smooth scroll

No special integration needed. Lenis controls scroll position; Three.js reads from `ScrollTrigger.update` which Lenis feeds. The scene runs independently on requestAnimationFrame.

### Transparent background (overlay on content)

```js
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0); // fully transparent
```

Remove `scene.fog` when using transparent mode (fog color would be visible).

### Performance optimization

- Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` always
- Reduce `shapeCount` on mobile: `const isMobile = window.innerWidth < 768`
- Use `THREE.InstancedMesh` for 50+ identical shapes
- Dispose geometries and materials on page leave: `geometry.dispose(); material.dispose()`

---

## Configuration

| Parameter | Location | Default | Description |
|-----------|----------|---------|-------------|
| `shapeCount` | CONFIG | `12` | Number of floating shapes |
| `rotationSpeed` | CONFIG | `0.003` | Base rotation speed per frame |
| `mouseInfluence` | CONFIG | `0.3` | How far camera moves toward mouse (units) |
| `fogColor` | CONFIG | `0x0a0a14` | Background and fog color |
| `fogNear` / `fogFar` | CONFIG | `3` / `15` | Fog distance range |
| `ambientIntensity` | CONFIG | `0.4` | Ambient light strength |
| `directionalIntensity` | CONFIG | `0.8` | Directional light strength |
| `cameraZ` | CONFIG | `6` | Camera distance from origin |
| `roughness` | Material | `0.4` | Surface roughness (0 = mirror, 1 = matte) |
| `metalness` | Material | `0.6` | Metallic appearance (0 = plastic, 1 = metal) |
| `wireframe` | Material | 30% random | Whether shape renders as wireframe |

---

## Dependencies

| Library | URL |
|---------|-----|
| Three.js r128 | `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` |
| OrbitControls | `https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js` |
