/* ZenvX DigiResearch - language toggle, mobile nav, contact form */
(function () {
  "use strict";
  var KEY = "zenvx-lang";
  var html = document.documentElement;

  function applyLang(lang) {
    if (lang !== "ml") lang = "en";
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang);
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var v = nodes[i].getAttribute("data-" + lang);
      if (v !== null) nodes[i].textContent = v;
    }
    var phs = document.querySelectorAll("[data-ph-en]");
    for (var j = 0; j < phs.length; j++) {
      var p = phs[j].getAttribute("data-ph-" + lang);
      if (p !== null) phs[j].setAttribute("placeholder", p);
    }
    var t = document.body.getAttribute("data-title-" + lang);
    if (t) document.title = t;
    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute("aria-pressed", btns[k].getAttribute("data-lang-btn") === lang ? "true" : "false");
    }
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved = "en";
  try { saved = localStorage.getItem(KEY) || "en"; } catch (e) {}
  applyLang(saved);

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-lang-btn]") : null;
    if (b) applyLang(b.getAttribute("data-lang-btn"));
  });

  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  var form = document.getElementById("contactForm");
  if (!form) return;
  var statusEl = document.getElementById("formStatus");
  var btn = document.getElementById("formSubmit");

  var MSG = {
    sending: { en: "Sending your enquiry\u2026", ml: "\u0d05\u0d7b\u0d15\u0d4d\u0d35\u0d3f\u0d31\u0d3f \u0d05\u0d2f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d41\u2026" },
    ok: { en: "Thanks \u2014 we got it. You will hear from us within one working day. For anything urgent, message us on WhatsApp.", ml: "\u0d28\u0d28\u0d4d\u0d26\u0d3f \u2014 \u0d15\u0d3f\u0d1f\u0d4d\u0d1f\u0d3f. \u0d12\u0d30\u0d41 \u0d2a\u0d4d\u0d30\u0d35\u0d7c\u0d24\u0d4d\u0d24\u0d3f \u0d26\u0d3f\u0d35\u0d38\u0d24\u0d4d\u0d24\u0d3f\u0d28\u0d41\u0d33\u0d4d\u0d33\u0d3f\u0d7d \u0d2e\u0d31\u0d41\u0d2a\u0d1f\u0d3f \u0d32\u0d2d\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d02. \u0d05\u0d1f\u0d3f\u0d2f\u0d28\u0d4d\u0d24\u0d30\u0d2e\u0d46\u0d19\u0d4d\u0d15\u0d3f\u0d7d WhatsApp-\u0d7d \u0d2e\u0d46\u0d38\u0d47\u0d1c\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d42." },
    err: { en: "Something went wrong. Please email sk@zenvx.in or message us on WhatsApp instead.", ml: "\u0d0e\u0d28\u0d4d\u0d24\u0d4b \u0d2a\u0d4d\u0d30\u0d36\u0d4d\u0d28\u0d02 \u0d38\u0d02\u0d2d\u0d35\u0d3f\u0d1a\u0d4d\u0d1a\u0d41. sk@zenvx.in \u0d0e\u0d28\u0d4d\u0d28 \u0d35\u0d3f\u0d33\u0d3e\u0d38\u0d24\u0d4d\u0d24\u0d3f\u0d7d \u0d2e\u0d46\u0d2f\u0d3f\u0d7d \u0d05\u0d2f\u0d15\u0d4d\u0d15\u0d42 \u0d05\u0d32\u0d4d\u0d32\u0d46\u0d19\u0d4d\u0d15\u0d3f\u0d7d WhatsApp-\u0d7d \u0d2e\u0d46\u0d38\u0d47\u0d1c\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d42." },
    btn: { en: "Send enquiry", ml: "\u0d05\u0d7b\u0d15\u0d4d\u0d35\u0d3f\u0d31\u0d3f \u0d05\u0d2f\u0d15\u0d4d\u0d15\u0d42" }
  };

  function lang() { return html.getAttribute("data-lang") === "ml" ? "ml" : "en"; }
  function say(kind, key) {
    statusEl.className = "status " + kind;
    statusEl.textContent = MSG[key][lang()];
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var key = String(data.get("access_key") || "");

    if (!key || key.indexOf("PASTE_") === 0) {
      say("err", "err");
      statusEl.textContent =
        lang() === "ml"
          ? "\u0d2b\u0d4b\u0d02 \u0d07\u0d28\u0d4d\u0d28\u0d41\u0d02 \u0d38\u0d1c\u0d4d\u0d1c\u0d2e\u0d3e\u0d2f\u0d3f\u0d1f\u0d4d\u0d1f\u0d3f\u0d32\u0d4d\u0d32: Web3Forms access key \u0d1a\u0d47\u0d7c\u0d15\u0d4d\u0d15\u0d41\u0d15. (README.txt \u0d15\u0d3e\u0d23\u0d41\u0d15)"
          : "Form not connected yet: add your Web3Forms access key in contact.html (see README.txt).";
      return;
    }

    btn.disabled = true;
    var original = btn.textContent;
    btn.textContent = MSG.sending[lang()];
    say("ok", "sending");

    var payload = {};
    data.forEach(function (value, name) { payload[name] = value; });

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, j: j }; }); })
      .then(function (r) {
        if (r.ok && r.j.success) {
          form.reset();
          say("ok", "ok");
        } else {
          say("err", "err");
        }
      })
      .catch(function () { say("err", "err"); })
      .then(function () {
        btn.disabled = false;
        btn.textContent = MSG.btn[lang()] || original;
      });
  });
})();
