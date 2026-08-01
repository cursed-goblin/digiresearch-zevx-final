# ZenvX DigiResearch — digiresearch.zenvx.in

Static marketing site for **ZenvX DigiResearch**, a research-led digital marketing studio doing website building and Meta ads.

Plain HTML / CSS / JS. No build step, no framework, no server code.

## Two faces

The site ships with two complete looks and a switch in the header:

| Face | What it is |
| --- | --- |
| **Good boy** (default) | Calm, light, minimal. No motion. Safe for clients. |
| **Bad boy** | Dark award-site mode: preloader with counter, custom magnetic cursor, 3D tilt cards, kinetic marquees, gradient hero type, smooth inertia scroll (Lenis + GSAP ScrollTrigger from CDN), scroll progress bar and curtain page transitions. |

- The choice is stored in `localStorage` under `zenvx-face` (`good` / `bad`) and applied before first paint, so there is no flash of the wrong face.
- The preloader plays once per browser session (`sessionStorage` key `zenvx-seen`).
- Visitors with "reduce motion" enabled get the dark look with all animation off.
- The EN / ML language toggle works identically in both faces.

## Files

```
index.html       Home
services.html    Services (website building + Meta ads, pricing)
method.html      Our Method (research > plan > build > measure)
about.html       About (team, values, quick facts)
contact.html     Contact (enquiry form + WhatsApp + FAQ)
css/styles.css   Minimal (good boy) styling
css/bad.css      Dark award-site (bad boy) styling
js/main.js       Language toggle, mobile menu, form submit
js/bad.js        Bad boy face: preloader, cursor, tilt, marquee, reveals
js/smooth.js     Lenis + GSAP ScrollTrigger loader (bad boy only)
assets/          favicon.svg
robots.txt       Search engine rules
sitemap.xml      Page list for Google
README.txt       Full setup + deploy guide
```

## Before you go live

1. Get a free Web3Forms access key for `sk@zenvx.in` at <https://web3forms.com>.
2. In `contact.html`, replace `PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE` with that key.
3. Deploy the folder to Cloudflare Pages / Netlify (drag and drop) or upload it to the `digiresearch` subdomain on cPanel, then point DNS at it.

Full instructions are in `README.txt`.

## Contact

- WhatsApp: +91 94950 29709
- Email: sk@zenvx.in
- Instagram: [@zenvxdigiresearch](https://www.instagram.com/zenvxdigiresearch/)

© 2026 ZenvX DigiResearch · A ZenvX venture
