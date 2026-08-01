/* ZenvX DigiResearch - bad-boy face: optional CDN enhancement layer.
   Loads Lenis (inertia scroll) + GSAP/ScrollTrigger only when the bad-boy
   face is active. If the CDN is blocked or offline, nothing breaks: the
   dependency-free effects in js/bad.js keep running exactly as before. */
(function () {
  'use strict';
  var root = document.documentElement;
  if (root.getAttribute('data-face') !== 'bad') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.__zenvxSmooth) return;
  window.__zenvxSmooth = true;

  var LENIS = 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js';
  var GSAP = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
  var ST = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';

  function load(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = res; s.onerror = function () { rej(new Error(src)); };
      document.head.appendChild(s);
    });
  }

  var lenis = null;

  function startLenis() {
    if (!window.Lenis) return;
    lenis = new window.Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.6
    });
    root.classList.add('fx-smooth');
    root.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    function raf(time) {
      if (!lenis) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* keep in-page anchors working with inertia */
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: -80 });
    });

    /* stop inertia while the mobile nav is open */
    var nav = document.getElementById('nav');
    if (nav && window.MutationObserver) {
      new MutationObserver(function () {
        if (!lenis) return;
        if (nav.classList.contains('open')) lenis.stop(); else lenis.start();
      }).observe(nav, { attributes: true, attributeFilter: ['class'] });
    }
  }

  function startGsap() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    if (lenis) {
      lenis.on('scroll', window.ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    /* depth parallax on section media + cards, on top of the base reveals */
    gsap.utils.toArray('.sec .card, .price-card, .step').forEach(function (el, i) {
      gsap.fromTo(el, { y: 26 }, {
        y: -14,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
      void i;
    });

    /* marquee speeds up with scroll velocity */
    var tracks = gsap.utils.toArray('.fx-marquee .fx-track');
    if (tracks.length && lenis) {
      lenis.on('scroll', function (e) {
        var v = Math.min(3, 1 + Math.abs(e.velocity || 0) * 0.06);
        tracks.forEach(function (t) { t.style.animationDuration = (26 / v) + 's'; });
      });
    }

    window.ScrollTrigger.refresh();
  }

  function boot() {
    load(LENIS).then(startLenis).catch(function () {})
      .then(function () { return load(GSAP); })
      .then(function () { return load(ST); })
      .then(startGsap)
      .catch(function () { /* offline or blocked - base effects still run */ });
  }

  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);

  /* if the visitor switches back to the good-boy face, kill inertia */
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-face-btn]') : null;
    if (!b) return;
    setTimeout(function () {
      if (root.getAttribute('data-face') !== 'bad' && lenis) {
        lenis.destroy(); lenis = null;
        root.classList.remove('fx-smooth');
        root.style.scrollBehavior = '';
        document.body.style.scrollBehavior = '';
      }
    }, 60);
  });
})();
