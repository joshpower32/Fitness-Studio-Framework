// Deterministic 600-frame capture of the fitness-studio TikTok promo (20s, 1080x1920, 30fps).
// Each output frame is posed exactly (scroll, overlay alphas, VIRTUAL animation clock), then
// screenshot at 2x on a 540x960 mobile viewport.
//
// Usage (from a folder with `npm i playwright`; needs Google Chrome + ffmpeg installed):
//   1. Serve this framework:  python3 -m http.server 5610 --directory <fitness-studio>
//   2. node record-tiktok-video.mjs          → writes capture/f00000.jpg … f00599.jpg
//   3. ffmpeg -framerate 30 -i "capture/f%05d.jpg" -c:v libx264 -preset slow -crf 18 \
//        -vf format=yuv420p -movflags +faststart -an fitness-studio-founding-offer-20s.mp4
//
// This framework animates on real-time clocks (three.js wave via rAF timestamps, marquee via
// CSS animation, counters via performance.now). Stepped capture runs ~0.5s of real time per
// output frame, so anything real-time would play ~15-20x too fast in the video. Fixes here:
//   - rAF timestamps are VIRTUALIZED: window.__setVT(t) makes the three.js wave render at
//     exactly the output-timeline speed (and cursor parallax stays neutral — no pointer).
//   - the marquee CSS animation is disabled and its transform is driven per-frame.
//   - stat counters are driven per-frame on the output timeline (fx.js already ran them
//     during the force-load pre-scroll, so they'd otherwise sit at their final values).
// Scroll reveals (data-fx) are intentionally left in their revealed state — sections read
// complete as the camera flies by; the wave + marquee + counters carry the motion.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, rmSync } from "fs";

const CAP_DIR = new URL("./capture/", import.meta.url).pathname;
rmSync(CAP_DIR, { recursive: true, force: true });
mkdirSync(CAP_DIR, { recursive: true });

const FPS = 30, DURATION = 20.0, FRAMES = FPS * DURATION;

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const context = await browser.newContext({ viewport: { width: 1080, height: 1920 } });
const page = await context.newPage();
await page.goto("http://localhost:5610/", { waitUntil: "load" });

const cdp = await context.newCDPSession(page);
await cdp.send("Emulation.setDeviceMetricsOverride", {
  width: 540, height: 960, deviceScaleFactor: 2, mobile: true, scale: 2,
});
await page.waitForTimeout(400);

// Webfonts (Archivo Black) must be in before any frame is captured.
await page.evaluate(() => document.fonts.ready);

// Force-load everything (lazy images, facility bg) with a pre-scroll.
await page.waitForFunction(() => document.querySelectorAll("#programsGrid img").length > 0, { timeout: 15000 });
await page.evaluate(async () => {
  document.querySelectorAll("img[loading=lazy]").forEach(i => (i.loading = "eager"));
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y <= h; y += 800) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await page.waitForFunction(() => {
  const imgs = [...document.querySelectorAll("#programsGrid img, #coachesGrid img")];
  return imgs.length > 0 && imgs.every(i => i.complete && i.naturalWidth > 0);
}, { timeout: 30000 }).catch(() => console.log("warning: image readiness timed out, capturing anyway"));

// Give the three.js module a moment to boot (it's a deferred CDN import).
await page.waitForTimeout(1500);

// Freeze real-time motion, virtualize the animation clock, inject overlays, expose the poser.
await page.evaluate(() => {
  // Virtual rAF clock: three-scene's render loop now advances exactly with the output timeline.
  let vt = 0;
  window.__setVT = (v) => { vt = v; };
  const origRaf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => origRaf(() => cb(vt));

  const style = document.createElement("style");
  style.textContent = `
    *, *::before, *::after { transition: none !important; animation: none !important; }
    ::-webkit-scrollbar { display: none !important; }
    html { scrollbar-width: none !important; scroll-behavior: auto !important; }
  `;
  document.head.appendChild(style);

  const cap = document.createElement("div");
  cap.id = "__cap";
  cap.style.cssText = `
    position: fixed; top: 36%; left: 34px; right: 34px; z-index: 9998;
    transform: translateY(-50%); opacity: 0;
    background: rgba(8,8,8,.68); border-radius: 18px; padding: 26px 24px;
    color: #fff; font-weight: 800; font-size: 30px; line-height: 1.3;
    text-align: center; pointer-events: none; backdrop-filter: blur(4px);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  `;
  cap.textContent = "Built for gyms, trainers & yoga studios";
  document.body.appendChild(cap);

  const card = document.createElement("div");
  card.id = "__card";
  card.style.cssText = `
    position: fixed; inset: 0; z-index: 9999; opacity: 0;
    background: radial-gradient(ellipse 90% 45% at 50% 16%, rgba(212,163,80,.14), transparent 60%), #17130f;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; pointer-events: none; padding: 0 44px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  `;
  card.innerHTML = `
    <div style="width:26px;height:26px;background:#d9a04c;transform:rotate(45deg);margin-bottom:66px;"></div>
    <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:54px;color:#f5f1ea;margin-bottom:52px;">Power<span style="color:#d9a04c;">Studio</span></div>
    <div style="font-size:27px;color:#cfc9c0;line-height:1.45;margin-bottom:44px;">A website like this,<br>for <span style="font-style:italic;color:#d9a04c;">your</span> gym or studio.</div>
    <div style="border:1px solid rgba(217,160,76,.55);background:rgba(217,160,76,.08);border-radius:14px;padding:20px 26px;font-size:23px;color:#efeae2;line-height:1.55;margin-bottom:48px;">First 5 clients: package fee <b>waived</b><br><span style="color:#d9a04c;font-weight:700;">$99</span> to get started</div>
    <div style="font-size:25px;font-weight:700;color:#d9a04c;margin-bottom:18px;">powerstudiostorefront.com</div>
    <div style="font-size:16px;color:#8f8a82;">Hamilton, Ontario · web design &amp; photography</div>
  `;
  document.body.appendChild(card);
  window.scrollTo(0, 0);

  const headerH = document.querySelector(".site-header").offsetHeight;
  const yOf = sel => Math.max(0, document.querySelector(sel).getBoundingClientRect().top + window.scrollY - headerH - 6);
  const segments = [
    [1.8, 3.4, 0, yOf("#programs")],
    [5.2, 6.8, yOf("#programs"), yOf("#schedule")],
    [8.8, 10.9, yOf("#schedule"), yOf("#pricing")],
    [12.6, 14.1, yOf("#pricing"), yOf("#trial")],
  ];
  const CAP_IN = 5.4, CAP_OUT = 9.8, CARD_IN = 15.7, FADE = 0.55;
  const COUNT_IN = 2.0, COUNT_DUR = 1.3; // stats band flies by during segment 1
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const clamp01 = x => Math.max(0, Math.min(1, x));

  const counters = [...document.querySelectorAll("[data-count-to]")].map(el => ({
    el, target: parseInt(el.getAttribute("data-count-to"), 10) || 0,
  }));
  const marquee = document.querySelector(".marquee-track");

  window.__pose = async (t) => {
    window.__setVT(t * 1000); // three.js wave renders at output-timeline speed

    let y = 0;
    for (const [t0, t1, y0, y1] of segments) {
      if (t >= t1) { y = y1; continue; }
      if (t >= t0) y = y0 + (y1 - y0) * ease((t - t0) / (t1 - t0));
      break;
    }
    window.scrollTo(0, y);

    // Manual drivers for motion whose real clocks are frozen/disabled:
    if (marquee) marquee.style.transform = `translateX(-${((t / 28) * 50) % 50}%)`;
    const cp = clamp01((t - COUNT_IN) / COUNT_DUR);
    const ce = 1 - Math.pow(1 - cp, 3);
    counters.forEach(c => { c.el.textContent = Math.round(c.target * ce).toLocaleString("en-CA"); });

    cap.style.opacity = String(Math.min(clamp01((t - CAP_IN) / FADE), clamp01((CAP_OUT - t) / FADE)));
    card.style.opacity = String(clamp01((t - CARD_IN) / 0.7));

    // Two compositor ticks so the wave renders with the new virtual time before the screenshot.
    await new Promise(r => origRaf(() => origRaf(r)));
    return y;
  };
});

const t0 = Date.now();
for (let i = 0; i < FRAMES; i++) {
  const t = i / FPS;
  await page.evaluate(tt => window.__pose(tt), t);
  const shot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 92 });
  writeFileSync(`${CAP_DIR}f${String(i).padStart(5, "0")}.jpg`, Buffer.from(shot.data, "base64"));
  if (i % 60 === 0) console.log(`frame ${i}/${FRAMES} (${((Date.now() - t0) / 1000).toFixed(0)}s elapsed)`);
}

await context.close();
await browser.close();
console.log(`DONE ${FRAMES} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
