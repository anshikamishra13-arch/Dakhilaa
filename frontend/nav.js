/* ============================================================
   nav.js — Navbar scroll shadow + smooth scroll helper
   ============================================================ */

(function () {
  'use strict';

  var navbar = document.getElementById('navbar');

  /* ── Shadow on scroll ─────────────────────────────────────── */
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* Run once on load */

  /* ── Smooth scroll to section ─────────────────────────────── */
  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var offset    = 72; /* navbar height */
    var top       = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* Expose globally */
  window.scrollToSection = scrollToSection;
  window.scrollToTop     = scrollToTop;

}());