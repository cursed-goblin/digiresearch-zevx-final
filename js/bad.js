/* ZenvX DigiResearch - two faces: good (minimal) and bad (award-site motion). Dependency free. */
(function () {
  'use strict';

  var FKEY = 'zenvx-face';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function face() { return root.getAttribute('data-face') === 'bad' ? 'bad' : 'good'; }
  function lang() { return root.getAttribute('data-lang') === 'ml' ? 'ml' : 'en'; }

  var LABEL = {
    good: { en: 'Bad boy mode', ml: '\u0d2c\u0d3e\u0d21\u0d4d \u0d2c\u0d4b\u0d2f\u0d4d \u0d2e\u0d4b\u0d21\u0d4d' },
    bad: { en: 'Good boy mode', ml: '\u0d17\u0d41\u0d21\u0d4d \u0d2c\u0d4b\u0d2f\u0d4d \u0d2e\u0d4b\u0d21\u0d4d' }
  };

  function paintFaceBtns() {
    var f = face();
    var btns = document.querySelectorAll('[data-face-btn]');
    for (var i = 0; i < btns.length; i++) {
      var t = btns[i].querySelector('span');
      if (t) t.textContent = LABEL[f][lang()] || LABEL[f].en;
      btns[i].setAttribute('aria-pressed', f === 'bad' ? 'true' : 'false');
      btns[i].setAttribute('title', f === 'bad' ? 'Switch to the calm, minimal site' : 'Switch to the full motion experience');
    }
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-face-btn]') : null;
    if (!b) return;
    var next = face() === 'bad' ? 'good' : 'bad';
    try { localStorage.setItem(FKEY, next); } catch (err) {}
    root.setAttribute('data-face', next);
    window.location.reload();
  });

  paintFaceBtns();
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-lang-btn]')) setTimeout(paintFaceBtns, 0);
  });

  if (face() !== 'bad') return;

  var revealStarted = false;
  function startReveals() {
    if (revealStarted) return;
    revealStarted = true;
    var groups = document.querySelectorAll('.sec-head, .card, .price-card, .step, .person, .cl-item, .row, .band, .faq details, .form, .grid > div');
    if (reduce || !('IntersectionObserver' in window)) {
      for (var k = 0; k < groups.length; k++) groups[k].classList.add('in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    var lastParent = null, i = 0;
    for (var j = 0; j < groups.length; j++) {
      var el = groups[j];
      if (el.parentNode !== lastParent) { lastParent = el.parentNode; i = 0; }
      el.classList.add('fx-rv');
      el.style.setProperty('--d', Math.min(i, 6) * 90 + 'ms');
      io.observe(el);
      i++;
    }
  }

  /* preloader */
  (function () {
    var pct = document.querySelector('.fx-pct');
    var bar = document.querySelector('.fx-bar');
    var n = 0, done = false;
    var seen = false;
    try { seen = sessionStorage.getItem('zenvx-seen') === '1'; } catch (e) {}
    var quick = reduce || seen;
    function finish() {
      if (done) return;
      done = true;
      if (pct) pct.textContent = '100';
      if (bar) bar.style.width = '100%';
      setTimeout(function () {
        root.classList.add('fx-loaded');
        startReveals();
      }, quick ? 0 : 260);
    }
    try { sessionStorage.setItem('zenvx-seen', '1'); } catch (e) {}
    if (quick) { finish(); return; }
    var tick = setInterval(function () {
      n += Math.random() * 9 + 3;
      if (n >= 99) n = 99;
      if (pct) pct.textContent = String(Math.floor(n));
      if (bar) bar.style.width = n + '%';
    }, 90);
    function ready() { clearInterval(tick); setTimeout(finish, 220); }
    if (document.readyState === 'complete') ready();
    else window.addEventListener('load', ready);
    setTimeout(ready, 3200);
  })();

  /* split the H1 into animated characters */
  (function () {
    var h1 = document.querySelector('h1');
    if (!h1 || reduce) return;
    var spans = h1.querySelectorAll('span');
    var idx = 0;
    for (var s = 0; s < spans.length; s++) {
      var el = spans[s];
      if (el.querySelector('span')) continue;
      if (el.classList.contains('accent')) continue; // gradient line animates as one block
      var text = el.textContent;
      var wrap = document.createElement('span');
      wrap.className = 'fx-line';
      wrap.setAttribute('aria-hidden', 'true');
      var words = text.split(' ');
      for (var w = 0; w < words.length; w++) {
        var word = document.createElement('span');
        word.className = 'fx-w';
        for (var c = 0; c < words[w].length; c++) {
          var ch = document.createElement('span');
          ch.className = 'fx-char';
          ch.textContent = words[w][c];
          ch.style.animationDelay = 300 + idx * 26 + 'ms';
          word.appendChild(ch);
          idx++;
        }
        wrap.appendChild(word);
        if (w < words.length - 1) wrap.appendChild(document.createTextNode(' '));
      }
      var sr = document.createElement('span');
      sr.className = 'sr';
      sr.textContent = text;
      el.textContent = '';
      el.appendChild(sr);
      el.appendChild(wrap);
    }
  })();

  /* kinetic marquee after the hero */
  (function () {
    var host = document.querySelector('.hero') || document.querySelector('main > section');
    if (!host) return;
    var words = ['WEBSITE BUILDING', '\u2726', 'META ADS', '\u2726', 'MARKET RESEARCH', '\u2726', 'CONVERSION', '\u2726', 'WORLDWIDE', '\u2726'];
    var track = document.createElement('div');
    track.className = 'fx-track';
    for (var r = 0; r < 2; r++) {
      for (var i = 0; i < words.length; i++) {
        var sp = document.createElement('span');
        sp.textContent = words[i];
        track.appendChild(sp);
      }
    }
    var wrap = document.createElement('div');
    wrap.className = 'fx-marquee';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.appendChild(track);
    host.parentNode.insertBefore(wrap, host.nextSibling);
  })();

  if (reduce) startReveals();

  /* custom cursor, magnetic buttons, 3D tilt */
  (function () {
    if (reduce || (window.matchMedia && window.matchMedia('(hover: none)').matches)) return;
    var ring = document.querySelector('.fx-cur');
    var dot = document.querySelector('.fx-dot');
    if (ring && dot) {
      var mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
      window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      }, { passive: true });
      (function loop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
        requestAnimationFrame(loop);
      })();
      var hot = 'a, button, summary, input, select, textarea, .card';
      document.addEventListener('mouseover', function (e) {
        if (e.target.closest && e.target.closest(hot)) root.classList.add('fx-hot');
      });
      document.addEventListener('mouseout', function (e) {
        if (e.target.closest && e.target.closest(hot)) root.classList.remove('fx-hot');
      });
    }
    var mags = document.querySelectorAll('.btn');
    for (var m = 0; m < mags.length; m++) {
      (function (b) {
        b.addEventListener('mousemove', function (e) {
          var r = b.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          b.style.transform = 'translate3d(' + dx * 10 + 'px,' + dy * 8 + 'px,0)';
        });
        b.addEventListener('mouseleave', function () { b.style.transform = ''; });
      })(mags[m]);
    }
    var cards = document.querySelectorAll('.card');
    for (var c = 0; c < cards.length; c++) {
      (function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          card.style.transform = 'perspective(900px) rotateY(' + dx * 6 + 'deg) rotateX(' + (-dy * 6) + 'deg) translateY(-6px)';
        });
        card.addEventListener('mouseleave', function () { card.style.transform = ''; });
      })(cards[c]);
    }
  })();

  /* scroll progress + hero parallax */
  (function () {
    var prog = document.querySelector('.fx-prog');
    var hero = document.querySelector('.hero .container');
    var raf = false;
    function run() {
      raf = false;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.pageYOffset;
      if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      if (hero && !reduce && y < window.innerHeight * 1.2) {
        hero.style.transform = 'translate3d(0,' + y * 0.12 + 'px,0)';
        hero.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
      }
    }
    window.addEventListener('scroll', function () {
      if (!raf) { raf = true; requestAnimationFrame(run); }
    }, { passive: true });
    run();
  })();

  /* curtain page transitions */
  (function () {
    if (reduce) return;
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (a.target === '_blank' || href.charAt(0) === '#' || /^(mailto:|tel:|https?:)/.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      root.classList.add('fx-leaving');
      setTimeout(function () { window.location.href = href; }, 520);
    });
  })();
})();

/* load the optional CDN enhancement layer (Lenis + GSAP) for the bad face */
(function(){
  function inject(){
    try{
      if(document.documentElement.getAttribute('data-face')!=='bad')return;
      if(document.getElementById('zx-smooth'))return;
      var s=document.createElement('script');
      s.id='zx-smooth';s.src='js/smooth.js';s.defer=true;
      document.head.appendChild(s);
    }catch(e){}
  }
  inject();
  document.addEventListener('click',function(e){
    var b=e.target.closest?e.target.closest('[data-face-btn]'):null;
    if(b)setTimeout(inject,80);
  });
})();
