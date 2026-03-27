---
name: WebGL Scene Hero
category: components
tags: [hero, webgl, threejs, 3d, mouse-parallax, scroll-reactive]
description: >
  Full viewport Three.js scene with animated floating geometric shapes
  (spheres, tori, icosahedrons). Camera orbits on mouse move. Centered
  overlay text with glassmorphism card. Shapes react to scroll position.
---

## Preview

The entire viewport is a Three.js canvas showing softly lit geometric shapes -- spheres, tori, and icosahedrons -- floating and slowly rotating in 3D space. Moving the mouse gently orbits the camera, creating a parallax depth effect. A centered glassmorphism card overlays the scene with a headline and subtitle. As the user scrolls, the shapes spread apart and rotate faster, creating a "zooming through" sensation.

---

## Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>WebGL Scene Hero</title>
<style>
  :root {
    --bg: #0a0a0a;
    --text: #ffffff;
    --accent-1: #90e0ef;
    --accent-2: #ff7438;
    --glass-bg: rgba(255, 255, 255, 0.06);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-blur: 20px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ---------- HERO ---------- */
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .hero__canvas {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  /* Glass card overlay */
  .hero__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 3rem 4rem;
    text-align: center;
    max-width: 600px;
    pointer-events: auto;
  }

  .glass-card__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .glass-card__subtitle {
    font-size: clamp(0.9rem, 1.5vw, 1.125rem);
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .glass-card__cta {
    display: inline-block;
    padding: 0.65rem 1.75rem;
    background: var(--accent-1);
    color: var(--bg);
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-decoration: none;
    border-radius: 100px;
    transition: opacity 0.2s;
  }

  .glass-card__cta:hover {
    opacity: 0.85;
  }

  /* ---------- BELOW FOLD ---------- */
  .below-fold {
    position: relative;
    z-index: 2;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    opacity: 0.15;
    padding: 2rem;
    text-align: center;
  }

  @media (max-width: 640px) {
    .glass-card {
      padding: 2rem 1.5rem;
      margin: 0 1rem;
      border-radius: 16px;
    }
  }
</style>
</head>
<body>

<section class="hero" id="hero">
  <canvas class="hero__canvas" id="heroCanvas"></canvas>
  <div class="hero__overlay">
    <div class="glass-card">
      <h1 class="glass-card__title">Beyond Flat Design</h1>
      <p class="glass-card__subtitle">
        Interactive 3D experiences that make your brand unforgettable.
        Move your mouse. Scroll down.
      </p>
      <a href="#" class="glass-card__cta">Explore</a>
    </div>
  </div>
</section>

<div class="below-fold">Content below the 3D hero</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
  // --- Setup ---
  const canvas = document.getElementById('heroCanvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0a0a0a, 1);

  // --- Lights ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x90e0ef, 1.5, 20);
  pointLight1.position.set(4, 3, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff7438, 1, 20);
  pointLight2.position.set(-4, -2, 3);
  scene.add(pointLight2);

  // --- Shapes ---
  const shapes = [];
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.7,
    wireframe: false
  });

  const geometries = [
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.TorusGeometry(0.4, 0.15, 16, 48),
    new THREE.IcosahedronGeometry(0.45, 0),
    new THREE.OctahedronGeometry(0.4, 0),
    new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16),
    new THREE.SphereGeometry(0.35, 32, 32),
    new THREE.IcosahedronGeometry(0.5, 1),
    new THREE.TorusGeometry(0.35, 0.12, 16, 48),
  ];

  geometries.forEach((geo, i) => {
    const mesh = new THREE.Mesh(geo, material.clone());
    // Spread shapes in a sphere-like arrangement
    const phi = Math.acos(-1 + (2 * i) / geometries.length);
    const theta = Math.sqrt(geometries.length * Math.PI) * phi;
    const radius = 2.5 + Math.random() * 1.5;
    mesh.position.set(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi) - 1
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
      basePos: mesh.position.clone(),
      rotSpeed: { x: 0.002 + Math.random() * 0.005, y: 0.003 + Math.random() * 0.005 },
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatAmplitude: 0.15 + Math.random() * 0.2
    };
    scene.add(mesh);
    shapes.push(mesh);
  });

  // --- Mouse tracking ---
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // --- Scroll tracking ---
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const heroRect = document.getElementById('hero').getBoundingClientRect();
    scrollProgress = Math.max(0, Math.min(1, -heroRect.top / heroRect.height));
  }, { passive: true });

  // --- Resize ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- Animate ---
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth mouse follow
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Camera orbit
    camera.position.x = mouse.x * 1.2;
    camera.position.y = -mouse.y * 0.8;
    camera.lookAt(0, 0, 0);

    // Animate shapes
    shapes.forEach(mesh => {
      const d = mesh.userData;
      mesh.rotation.x += d.rotSpeed.x;
      mesh.rotation.y += d.rotSpeed.y;

      // Floating motion
      const float = Math.sin(elapsed * d.floatSpeed + d.floatOffset) * d.floatAmplitude;
      mesh.position.y = d.basePos.y + float;

      // Scroll reaction — spread outward
      const spread = 1 + scrollProgress * 1.5;
      mesh.position.x = d.basePos.x * spread;
      mesh.position.z = d.basePos.z * spread;
    });

    renderer.render(scene, camera);
  }

  animate();
</script>

</body>
</html>
```

---

## Configuration

| Property | CSS Variable / JS | Default | Notes |
|---|---|---|---|
| Background | `--bg` | `#0a0a0a` | Canvas clear color, page bg |
| Text | `--text` | `#ffffff` | Card text |
| Accent 1 | `--accent-1` | `#90e0ef` | CTA button, light 1 color |
| Accent 2 | `--accent-2` | `#ff7438` | Light 2 color |
| Glass background | `--glass-bg` | `rgba(255,255,255,0.06)` | Card fill |
| Glass blur | `--glass-blur` | `20px` | Card backdrop blur |
| Number of shapes | JS `geometries` array | 8 | Add/remove from array |
| Mouse sensitivity | JS `* 1.2` / `* 0.8` | See code | Camera orbit range |
| Scroll spread | JS `* 1.5` | `1.5` | How much shapes spread on scroll |
| Material | JS `MeshStandardMaterial` | White, metallic | Change color, roughness, metalness |

---

## Dependencies

- **Three.js r128** — `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
