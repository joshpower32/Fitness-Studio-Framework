/* =====================================================================
   three-scene.js — hero particle wave (three.js from CDN, ES module)

   A volt-green particle field rolling like a slow wave, with subtle
   camera parallax toward the cursor. Self-hosted look, no Spline,
   no watermark, ~zero dependencies (three.js is fetched from jsdelivr
   and cached by the browser).

   Guardrails:
   - skips entirely on prefers-reduced-motion (CSS gradient stays)
   - fewer particles on small screens
   - pauses rendering when the hero is off-screen or the tab is hidden
   - DPR clamped to 2; if the CDN or WebGL fails, the page just shows
     the gradient background — nothing breaks
   ===================================================================== */

const canvas = document.getElementById("heroCanvas");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !reduced) {
  init().catch(() => { /* CDN or WebGL unavailable — gradient fallback stays */ });
}

async function init() {
  const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");

  const hero = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0b0d, 7, 20);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 60);
  camera.position.set(0, 3.1, 10.5);
  camera.lookAt(0, 0, 0);

  // --- Particle grid on the XZ plane; Y animated as layered sine waves ---
  const small = window.innerWidth < 768;
  const COLS = small ? 70 : 110;
  const ROWS = small ? 40 : 60;
  const GAP = 0.34;
  const count = COLS * ROWS;
  const positions = new Float32Array(count * 3);
  const base = []; // [x, z] pairs for the wave function
  let i = 0;
  for (let cx = 0; cx < COLS; cx++) {
    for (let cz = 0; cz < ROWS; cz++) {
      const x = (cx - COLS / 2) * GAP;
      const z = (cz - ROWS / 2) * GAP;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
      base.push(x, z);
      i++;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xd6f851,
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Points(geo, mat));

  // --- Cursor parallax (lerped so it feels weighty, not twitchy) ---
  let targetX = 0, targetY = 0;
  window.addEventListener("pointermove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 1.6;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.7;
  }, { passive: true });

  // --- Resize to the hero box ---
  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  // --- Pause when hero is off-screen or tab hidden ---
  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);

  const pos = geo.attributes.position;
  function frame(t) {
    requestAnimationFrame(frame);
    if (!heroVisible || document.hidden) return;
    const time = t * 0.00045;
    for (let p = 0; p < count; p++) {
      const x = base[p * 2], z = base[p * 2 + 1];
      pos.array[p * 3 + 1] =
        Math.sin(x * 0.55 + time * 2.2) * 0.34 +
        Math.sin(z * 0.7 + time * 1.6) * 0.26 +
        Math.sin((x + z) * 0.32 + time) * 0.18;
    }
    pos.needsUpdate = true;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (3.1 - targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
}
