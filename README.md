# PULSE Athletic Club — Fitness Studio Framework

A **premium, "expensive-looking"** gym / HIIT / yoga studio template: three.js particle-wave hero, scroll reveals, 3D tilt cards, animated counters, a **filterable weekly class schedule**, membership pricing, and a free-trial lead form. Pure HTML/CSS/JS — no build step, hosts free on GitHub Pages or Netlify.

Near-black + volt-lime athletic aesthetic with big display type (Archivo Black via Google Fonts). Works for gyms, HIIT boxes, CrossFit-style clubs, yoga & pilates studios, and personal trainers.

> This is the first framework built on the **PowerStudio premium playbook** — see
> `PowerStudio/Playbooks/Expensive-Website-Playbook.md` for the repeatable method,
> and `fx.js` in this folder for the reusable effects library.

## Features

- **three.js hero** — volt particle wave with cursor parallax (`three-scene.js`, CDN-loaded, self-hosted look, no Spline watermark). Falls back to a static gradient if WebGL/CDN is unavailable or the visitor prefers reduced motion.
- **fx.js effects library** — scroll reveals with stagger, animated stat counters, 3D tilt cards with glare, magnetic buttons, parallax facility strip, marquee, header scroll state. All opt-in `data-` attributes, all reduced-motion safe.
- **Weekly schedule** — day tabs (Mon–Sun) + discipline filters (Strength / HIIT / Yoga / Spin), driven by one `SCHEDULE` array in `app.js`.
- **Programs** — four tilt cards with photo, tag, and description (`PROGRAMS` array).
- **Coaches** — profile cards with portraits (`COACHES` array).
- **Membership pricing** — three tiers with featured highlight (`PRICING` array).
- **Free-trial form** — interest + preferred time, wired to Web3Forms (`🔔 NEW TRIAL REQUEST`), honeypot, mailto fallback.
- **Visit section** — staffed hours, location, contact, Google Map with styled address fallback.
- **ExerciseGym JSON-LD**, mobile responsive, ARIA-labelled, keyboard friendly.

## Personalising for a client

1. **Brand & colours** — edit `:root` tokens in `styles.css` (`--brand` volt can become any accent; keep the near-black base for the premium look).
2. **Business info** — name, hours, address, phone, JSON-LD, and map `q=` address in `index.html`.
3. **Schedule** — edit the `SCHEDULE` array in `app.js`. Day tabs and filters render automatically.
4. **Programs / Coaches / Pricing / Reviews** — each is one array in `app.js`.
5. **Photos** — pinned Pexels shots in the `PEXELS_PHOTOS` map; swap for real photos from the client's shoot (a gym shoot sells this site).
6. **Fonts** — Archivo Black/Archivo from Google Fonts; swap the `<link>` and `--font-head`/`--font-body` tokens to re-voice the brand.

## Local preview

```bash
python3 -m http.server 5610   # then open http://localhost:5610
```

## Lead delivery

1. Get a FREE key at [web3forms.com](https://web3forms.com) using the **client's email**.
2. Paste it into `CONFIG.web3formsKey` in `app.js`.
3. Set `CONFIG.ownerEmail`, `CONFIG.businessName`, and `CONFIG.phone`.
4. Test from the live site and confirm the `🔔 NEW TRIAL REQUEST` email arrives.

Free tier = 250 submissions/month per key. **Fallback:** with no key set, the form opens the visitor's email app (mailto) so no lead is lost.

## Performance notes

- three.js (~600 KB) loads as a deferred ES module from jsdelivr — the page renders fully before it arrives, and browsers cache it across visits.
- The scene pauses when scrolled out of view or the tab is hidden; particle count drops on small screens; device-pixel-ratio is capped at 2.
- `prefers-reduced-motion` disables the scene, reveals, tilt, magnetic, parallax, and marquee — the site is fully usable without any of them.

## Hosting

1. Push to GitHub (free demo).
2. Deploy to **Netlify** or **Cloudflare Pages** (both free, custom domain support).
3. Point custom domain nameservers to Netlify/Cloudflare.

## Selling this template

This is the **premium tier** demo — position it against $5–10k agency builds. The 3D hero and micro-interactions are what clients point at when they say "expensive." Sells to gyms, studios, and trainers as-is; the same `fx.js` + hero recipe can premium-ify any other PowerStudio framework (see the playbook).
