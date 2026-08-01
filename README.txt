ZenvX DigiResearch — digiresearch.zenvx.in
==========================================

WHAT IS IN HERE
---------------
index.html      Home
services.html   Services (website building + Meta ads, pricing)
method.html     Our Method (research > plan > build > measure, free audit)
about.html      About (the two of you, values, quick facts)
contact.html    Contact (enquiry form + WhatsApp + FAQ)
css/styles.css  All styling
js/main.js      Language toggle, mobile menu, form submit
assets/         favicon.svg
robots.txt      Search engine rules
sitemap.xml     Page list for Google

Plain HTML/CSS/JS. No build step, no framework, no server code.


STEP 1 — MAKE THE CONTACT FORM WORK (2 minutes, required)
---------------------------------------------------------
The form posts to Web3Forms, which emails submissions to sk@zenvx.in.

1. Go to https://web3forms.com
2. Enter sk@zenvx.in and get your free Access Key (check the inbox to confirm).
3. Open contact.html, find this line near the top of the form:

     <input type="hidden" name="access_key" value="PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE">

4. Replace PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE with your key. Keep the quotes.
5. Save. Until you do this, the form shows a "not configured yet" message
   instead of pretending to send.

Test it after uploading: submit the form once and check sk@zenvx.in
(including the spam folder the first time).


STEP 2 — UPLOAD TO digiresearch.zenvx.in
----------------------------------------
Option A — Cloudflare Pages / Netlify (free, easiest)
  1. Sign in, choose "Deploy manually" / "Drag and drop".
  2. Upload this folder (the whole folder, not a zip of a zip).
  3. In the project's Custom domain settings, add:
       digiresearch.zenvx.in
  4. In your zenvx.in DNS, add the CNAME record they show you:
       Type: CNAME   Name: digiresearch   Value: <the target they give you>
  5. Wait a few minutes. HTTPS is issued automatically.

Option B — Normal cPanel / shared hosting
  1. Create a subdomain "digiresearch" for zenvx.in.
  2. Note the folder it creates (often public_html/digiresearch).
  3. Upload every file and folder from here into it, keeping the structure
     (css/, js/ and assets/ must stay as folders).
  4. Enable free SSL (AutoSSL / Let's Encrypt) for the subdomain.

Either way, index.html must sit at the top level of the site root.


THINGS YOU MAY WANT TO EDIT
---------------------------
Phone / WhatsApp   Search for 919495029709 in all .html files.
Email              Search for sk@zenvx.in
Prices             Search for 1,999 (services.html and index.html)
Instagram          Search for zenvxdigiresearch
Footer year        Search for 2026
Malayalam text     Every translated string sits in a data-ml="..." attribute
                   right next to its English version. Please read through
                   these once and fix anything that sounds off — they were
                   drafted, not reviewed by you.

The language toggle (EN / ML) is in the header. The choice is remembered in
the visitor's browser.


WHEN YOU GET YOUR FIRST CLIENTS
-------------------------------
There is no portfolio page yet, on purpose. When you have 2-3 results worth
showing, add a "Work" link to the nav in every .html file and a new page
following the same structure as services.html.


ADDING GOOGLE ANALYTICS OR THE META PIXEL
-----------------------------------------
Paste the snippet just before </head> in each .html file. Nothing is
installed right now, so the site loads with zero third-party tracking apart
from the Google Fonts stylesheet.


TWO FACES (NEW)
---------------
The site ships with two complete looks and a switch in the header:

1. GOOD BOY (default) - the calm, light, minimal site. No motion.
2. BAD BOY - dark award-site mode: preloader with counter, custom cursor,
   magnetic buttons, 3D tilt cards, kinetic marquee, gradient hero type,
   scroll reveals, scroll progress bar and curtain page transitions.

How it works
- Every page loads css/styles.css (good boy) plus css/bad.css and js/bad.js.
- The switch writes the choice to localStorage under the key "zenvx-face"
  (values: good / bad) and the page reloads so all effects wire up cleanly.
- A tiny inline script in <head> applies the saved choice before first paint,
  so returning visitors never see a flash of the wrong face.
- The full-motion preloader only plays once per browser session
  (sessionStorage key "zenvx-seen"); after that pages load instantly.
- Visitors with "reduce motion" turned on in their OS get the dark look with
  all animation switched off. Nothing breaks, nothing moves.
- Language toggle (EN / ML) works identically in both faces.

Want bad boy to be the default?
- In every HTML file, find this in <head>:  localStorage.getItem('zenvx-face')||'good'
  and change 'good' to 'bad'.

Want to drop the bad boy face entirely?
- Delete css/bad.css and js/bad.js, then remove the two <link>/<script> lines
  and the button with data-face-btn from each HTML file.
