/* ============================================================
   faq.js — Accordion toggle for FAQ section
   ============================================================ */

(function () {
  'use strict';

  var items = document.querySelectorAll('.faq-item');

  function toggleFaq(item) {
    var isOpen = item.classList.contains('open');

    /* Close all open items first */
    items.forEach(function (el) {
      el.classList.remove('open');
    });

    /* Open clicked item if it was closed */
    if (!isOpen) {
      item.classList.add('open');
    }
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      toggleFaq(item);
    });

    /* Keyboard accessibility */
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(item);
      }
    });
  });

}());