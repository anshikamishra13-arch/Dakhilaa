/* ============================================================
   main.js — App entry point: bootstraps all modules
   ============================================================ */

(function () {
  'use strict';

  /* ── Pricing plan buttons ─────────────────────────────────── */
  function initPricingButtons() {
    var btns = document.querySelectorAll('.btn-plan[data-plan]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var plan = btn.getAttribute('data-plan') || 'a plan';
        if (window.showToast) showToast(plan + ' selected — redirecting to checkout… 🎯', 'success');
        setTimeout(function () {
          /* Replace with real checkout URL */
          window.location.href = 'pages/pricing.html?plan=' + encodeURIComponent(plan.toLowerCase());
        }, 800);
      });
    });
  }

  /* ── Fade-in sections on scroll ───────────────────────────── */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll('.fc, .tc, .pc, .step');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp .5s ease both';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  /* ── Animate stats counter ────────────────────────────────── */
  function animateCounter(el, target, suffix, duration) {
    suffix   = suffix   || '';
    duration = duration || 1200;
    var start     = 0;
    var increment = target / (duration / 16);

    var timer = setInterval(function () {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString('en-IN') + suffix;
    }, 16);
  }

  function initCounters() {
    if (!('IntersectionObserver' in window)) return;

    var statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;

    var observed = false;
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !observed) {
        observed = true;

        var statNums = document.querySelectorAll('.stat-n');
        var configs  = [
          { value: 50000, suffix: 'K+', divisor: 1000 },
          { value: 10000, suffix: 'K+', divisor: 1000 },
          { value: 95,    suffix: '%',  divisor: 1     },
          { value: 0,     suffix: 'Free', skip: true   },
        ];

        statNums.forEach(function (el, i) {
          var cfg = configs[i];
          if (!cfg || cfg.skip) return;
          animateCounter(el, cfg.value / cfg.divisor, cfg.suffix);
        });

        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(statsBar);
  }

  /* ── Init ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initPricingButtons();
    initScrollAnimations();
    initCounters();
    console.info('[Dakhilaa] App initialised ✓');
  });

}());