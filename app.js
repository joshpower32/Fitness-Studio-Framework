/* =====================================================================
   PULSE Athletic Club — Fitness Studio Framework
   Programs, filterable weekly schedule, coaches, pricing, trial form
   ===================================================================== */

const CONFIG = {
  facilityQuery: "modern gym interior dark",
  web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY",
  ownerEmail: "hello@pulseathletic.ca",
  businessName: "PULSE Athletic Club",
  phone: "(905) 555-7857",
};

/* ---------- Programs ---------- */
const PROGRAMS = [
  { id: "strength", name: "Strength", tag: "Barbell Club", desc: "Coached lifting on competition racks and platforms. All levels, real progress.", query: "barbell workout dark gym" },
  { id: "hiit", name: "HIIT", tag: "Engine Room", desc: "Turf, sleds, ropes, and intervals that end exactly when you think you can't.", query: "hiit training workout" },
  { id: "yoga", name: "Yoga", tag: "The Studio", desc: "Flow, yin, and mobility classes in a candlelit studio. Strength needs stillness.", query: "yoga class studio" },
  { id: "spin", name: "Spin", tag: "Ride", desc: "Rhythm rides and power intervals. Loud playlists, low lights, big output.", query: "indoor cycling class" },
];

/* ---------- Weekly schedule (edit freely — renders automatically) ---------- */
const DAYS = [
  { id: "mon", label: "Mon" }, { id: "tue", label: "Tue" }, { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" }, { id: "fri", label: "Fri" }, { id: "sat", label: "Sat" }, { id: "sun", label: "Sun" },
];
const CLASS_TYPES = [
  { id: "all", label: "All classes" },
  { id: "strength", label: "Strength" },
  { id: "hiit", label: "HIIT" },
  { id: "yoga", label: "Yoga" },
  { id: "spin", label: "Spin" },
];
const SCHEDULE = [
  { day: "mon", time: "6:00 AM", name: "Iron Hour", type: "strength", coach: "Marcus" },
  { day: "mon", time: "7:15 AM", name: "Engine Room", type: "hiit", coach: "Jordan" },
  { day: "mon", time: "12:15 PM", name: "Lunch Ride", type: "spin", coach: "Riley" },
  { day: "mon", time: "5:30 PM", name: "Barbell Club", type: "strength", coach: "Marcus" },
  { day: "mon", time: "6:45 PM", name: "Evening Flow", type: "yoga", coach: "Aiyana" },
  { day: "tue", time: "6:00 AM", name: "Sunrise Flow", type: "yoga", coach: "Aiyana" },
  { day: "tue", time: "7:15 AM", name: "Iron Hour", type: "strength", coach: "Marcus" },
  { day: "tue", time: "12:15 PM", name: "Engine Room Express", type: "hiit", coach: "Jordan" },
  { day: "tue", time: "5:30 PM", name: "Power Ride", type: "spin", coach: "Riley" },
  { day: "tue", time: "6:45 PM", name: "Engine Room", type: "hiit", coach: "Jordan" },
  { day: "wed", time: "6:00 AM", name: "Iron Hour", type: "strength", coach: "Marcus" },
  { day: "wed", time: "7:15 AM", name: "Rhythm Ride", type: "spin", coach: "Riley" },
  { day: "wed", time: "12:15 PM", name: "Mobility Reset", type: "yoga", coach: "Aiyana" },
  { day: "wed", time: "5:30 PM", name: "Barbell Club", type: "strength", coach: "Marcus" },
  { day: "wed", time: "6:45 PM", name: "Engine Room", type: "hiit", coach: "Jordan" },
  { day: "thu", time: "6:00 AM", name: "Engine Room", type: "hiit", coach: "Jordan" },
  { day: "thu", time: "7:15 AM", name: "Sunrise Flow", type: "yoga", coach: "Aiyana" },
  { day: "thu", time: "12:15 PM", name: "Lunch Ride", type: "spin", coach: "Riley" },
  { day: "thu", time: "5:30 PM", name: "Iron Hour", type: "strength", coach: "Marcus" },
  { day: "thu", time: "6:45 PM", name: "Slow Burn Yin", type: "yoga", coach: "Aiyana" },
  { day: "fri", time: "6:00 AM", name: "Iron Hour", type: "strength", coach: "Marcus" },
  { day: "fri", time: "7:15 AM", name: "Engine Room", type: "hiit", coach: "Jordan" },
  { day: "fri", time: "12:15 PM", name: "Power Ride", type: "spin", coach: "Riley" },
  { day: "fri", time: "5:30 PM", name: "Friday Night Lifts", type: "strength", coach: "Marcus" },
  { day: "sat", time: "8:30 AM", name: "Saturday Throwdown", type: "hiit", coach: "Jordan" },
  { day: "sat", time: "10:00 AM", name: "Barbell Club", type: "strength", coach: "Marcus" },
  { day: "sat", time: "11:30 AM", name: "Weekend Flow", type: "yoga", coach: "Aiyana" },
  { day: "sun", time: "9:00 AM", name: "Rhythm Ride", type: "spin", coach: "Riley" },
  { day: "sun", time: "10:30 AM", name: "Slow Burn Yin", type: "yoga", coach: "Aiyana" },
  { day: "sun", time: "12:00 PM", name: "Open Platform", type: "strength", coach: "Coach on floor" },
];

/* ---------- Coaches ---------- */
const COACHES = [
  { name: "Marcus Cole", role: "Head of Strength", bio: "CSCS, 12 years under the bar. Runs Barbell Club and will fix your deadlift.", query: "personal trainer portrait" },
  { name: "Jordan Blake", role: "HIIT & Conditioning Lead", bio: "Former varsity sprinter. Builds engines in the turf room, one interval at a time.", query: "female fitness trainer portrait" },
  { name: "Aiyana Reyes", role: "Yoga & Mobility Lead", bio: "500-hr RYT. Keeps the lifters moving well and the studio candlelit.", query: "yoga instructor portrait" },
];

/* ---------- Memberships ---------- */
const PRICING = [
  { name: "Flex", price: 89, features: ["12 classes / month", "Open gym during staffed hours", "App booking & waitlists", "Locker room access"] },
  { name: "Unlimited", price: 139, featured: true, badge: "Most popular", features: ["Unlimited classes", "24/7 open gym fob", "1 guest pass / month", "Intro session with a coach", "App booking & waitlists"] },
  { name: "Elite", price: 219, features: ["Everything in Unlimited", "2 personal training sessions / month", "Recovery lounge — sauna & cold plunge", "Quarterly programming check-in"] },
];

/* ---------- Testimonials ---------- */
const REVIEWS = [
  { quote: "I've been a member at three gyms in Hamilton. Nothing comes close to the coaching here — I pulled double bodyweight within a year.", name: "Melissa R." },
  { quote: "The schedule actually works with a 9-to-5. Engine Room at 6 AM, shower, at my desk by 8. It rewired my whole week.", name: "Dev P." },
  { quote: "Came for the lifting, stayed for Sunday Slow Burn. It's the only hour of my week where my phone doesn't exist.", name: "Carlos M." },
];

// --- Demo photos: pinned Pexels shots, keyed by query -------------------
// Direct image URLs load with the page — no API call, no key, no pop-in.
// To change a photo: browse pexels.com, copy the image address, paste here.
const PEXELS_PHOTOS = {
  "barbell workout dark gym": { u: "https://images.pexels.com/photos/19132573/pexels-photo-19132573.jpeg", p: "Hugazo Boss" },
  "hiit training workout": { u: "https://images.pexels.com/photos/6390240/pexels-photo-6390240.jpeg", p: "Tima Miroshnichenko" },
  "yoga class studio": { u: "https://images.pexels.com/photos/8436610/pexels-photo-8436610.jpeg", p: "Yan Krukau" },
  "indoor cycling class": { u: "https://images.pexels.com/photos/8766378/pexels-photo-8766378.jpeg", p: "Dmitry Limonov" },
  "modern gym interior dark": { u: "https://images.pexels.com/photos/6388373/pexels-photo-6388373.jpeg", p: "Tima Miroshnichenko" },
  "personal trainer portrait": { u: "https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg", p: "ThisIsEngineering" },
  "female fitness trainer portrait": { u: "https://images.pexels.com/photos/6739123/pexels-photo-6739123.jpeg", p: "Mikhail Nilov" },
  "yoga instructor portrait": { u: "https://images.pexels.com/photos/4083050/pexels-photo-4083050.jpeg", p: "Andrej Lišakov" },
};
// Size an image via Pexels CDN params (w = width; pxCrop also crops to w×h)
const px = (u, w) => `${u}?auto=compress&cs=tinysrgb&w=${w}`;
const pxCrop = (u, w, h) => `${u}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const $ = (id) => document.getElementById(id);
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Programs ---------- */
function renderPrograms() {
  $("programsGrid").innerHTML = PROGRAMS.map((p, i) => {
    const ph = PEXELS_PHOTOS[p.query];
    return `
    <div class="program-card" data-tilt data-fx style="--fx-delay:${i * 90}ms">
      ${ph ? `<img src="${esc(pxCrop(ph.u, 640, 854))}" alt="${esc(p.name)} training at PULSE" loading="lazy">` : ""}
      <span class="program-tag">${esc(p.tag)}</span>
      <div class="program-body">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
      </div>
    </div>`;
  }).join("");
}

/* ---------- Schedule ---------- */
let activeDay = "mon";
let activeType = "all";

function renderSchedDays() {
  $("schedDays").innerHTML = DAYS.map((d) =>
    `<button class="sched-day ${d.id === activeDay ? "active" : ""}" role="tab" aria-selected="${d.id === activeDay}" onclick="setSchedDay('${d.id}')">${esc(d.label)}</button>`
  ).join("");
}

function renderSchedFilters() {
  $("schedFilters").innerHTML = CLASS_TYPES.map((t) =>
    `<button class="sched-filter ${t.id === activeType ? "active" : ""}" aria-pressed="${t.id === activeType}" onclick="setSchedType('${t.id}')">${esc(t.label)}</button>`
  ).join("");
}

function renderSchedule() {
  const rows = SCHEDULE.filter((c) => c.day === activeDay && (activeType === "all" || c.type === activeType));
  const typeLabel = (id) => (CLASS_TYPES.find((t) => t.id === id) || {}).label || id;
  $("schedList").innerHTML = rows.map((c) => `
    <div class="sched-row">
      <span class="sched-time">${esc(c.time)}</span>
      <span class="sched-name">${esc(c.name)}<small>with ${esc(c.coach)}</small></span>
      <span class="sched-type">${esc(typeLabel(c.type))}</span>
      <a class="sched-book" href="#trial">Book →</a>
    </div>`).join("");
  $("schedEmpty").hidden = rows.length > 0;
}

function setSchedDay(id) {
  activeDay = id;
  renderSchedDays();
  renderSchedule();
}

function setSchedType(id) {
  activeType = id;
  renderSchedFilters();
  renderSchedule();
}

/* ---------- Coaches ---------- */
function renderCoaches() {
  $("coachesGrid").innerHTML = COACHES.map((c, i) => {
    const ph = PEXELS_PHOTOS[c.query];
    return `
    <div class="coach-card" data-tilt data-fx style="--fx-delay:${i * 90}ms">
      ${ph ? `<img src="${esc(pxCrop(ph.u, 600, 750))}" alt="${esc(c.name)}, ${esc(c.role)}" loading="lazy">` : ""}
      <div class="coach-body">
        <h3>${esc(c.name)}</h3>
        <span class="coach-role">${esc(c.role)}</span>
        <p>${esc(c.bio)}</p>
      </div>
    </div>`;
  }).join("");
}

/* ---------- Pricing ---------- */
function renderPricing() {
  $("pricingGrid").innerHTML = PRICING.map((t, i) => `
    <div class="price-card ${t.featured ? "featured" : ""}" data-fx style="--fx-delay:${i * 90}ms">
      ${t.badge ? `<span class="price-badge">${esc(t.badge)}</span>` : ""}
      <h3>${esc(t.name)}</h3>
      <div class="price-amount">$${t.price}<span> / month</span></div>
      <ul>${t.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <a class="btn ${t.featured ? "btn-primary" : "btn-ghost"} btn-block" href="#trial">Start Free Trial</a>
    </div>`).join("");
}

/* ---------- Reviews ---------- */
function renderReviews() {
  $("reviewsGrid").innerHTML = REVIEWS.map((r, i) => `
    <div class="review-card" data-fx style="--fx-delay:${i * 90}ms">
      <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote>“${esc(r.quote)}”</blockquote>
      <cite>— ${esc(r.name)}</cite>
    </div>`).join("");
}

/* ---------- Trial form ---------- */
const trialForm = $("trialForm");
const trialNote = $("trialNote");
const KEY_PLACEHOLDER = "YOUR_WEB3FORMS_ACCESS_KEY";

async function submitTrial(formData) {
  const firstName = String(formData.get("name") || "there").split(" ")[0];
  const btn = trialForm.querySelector('button[type="submit"]');

  if (formData.get("botcheck")) return; // honeypot

  if (!CONFIG.web3formsKey || CONFIG.web3formsKey === KEY_PLACEHOLDER) {
    const subject = encodeURIComponent(`Free trial request — ${formData.get("name") || ""}`);
    const body = encodeURIComponent([...formData.entries()].filter(([k]) => k !== "botcheck").map(([k, v]) => `${k}: ${v}`).join("\n"));
    window.location.href = `mailto:${CONFIG.ownerEmail}?subject=${subject}&body=${body}`;
    toast(`Opening your email app to send your trial request…`);
    return;
  }

  const fd = new FormData();
  fd.append("access_key", CONFIG.web3formsKey);
  fd.append("subject", `🔔 NEW TRIAL REQUEST — ${formData.get("name") || "website"}`);
  fd.append("from_name", CONFIG.businessName);
  fd.append("botcheck", "");
  fd.append("Name", formData.get("name") || "");
  fd.append("Phone", formData.get("phone") || "");
  fd.append("Email", formData.get("email") || "");
  fd.append("Interested in", formData.get("interest") || "");
  fd.append("Best time", formData.get("timeslot") || "");
  fd.append("Notes", formData.get("notes") || "");

  btn.disabled = true;
  const orig = btn.textContent;
  btn.textContent = "Sending…";

  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: fd });
    const data = await res.json();
    if (res.ok && data.success) {
      trialForm.reset();
      toast(`Thanks ${firstName}! Your free week is claimed — we'll text you to set up your first visit.`);
      trialNote.textContent = "Sent ✓ — we'll be in touch within a few hours.";
    } else {
      throw new Error(data.message || "Send failed");
    }
  } catch (_) {
    toast(`Couldn't send your request — please call ${CONFIG.phone} or email ${CONFIG.ownerEmail}.`);
    trialNote.textContent = `Something went wrong. Please call ${CONFIG.phone} or email ${CONFIG.ownerEmail}.`;
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
  }
}

trialForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitTrial(new FormData(trialForm));
});

/* ---------- Mobile nav toggle ---------- */
const navToggle = $("navToggle");
const navLinks = $("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", false);
}));

/* ---------- Toast notifications ---------- */
let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => (t.hidden = true), 300);
  }, 3500);
}

/* ---------- Facility background ---------- */
function loadFacility() {
  const ph = PEXELS_PHOTOS[CONFIG.facilityQuery];
  if (ph) $("facilityImg").style.backgroundImage = `url("${px(ph.u, 1600)}")`;
}

/* ---------- Init ---------- */
renderPrograms();
renderSchedDays();
renderSchedFilters();
renderSchedule();
renderCoaches();
renderPricing();
renderReviews();
loadFacility();
