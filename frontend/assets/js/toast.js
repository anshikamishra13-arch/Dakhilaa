/* ============================================================
   toast.js — Lightweight toast notification utility
   Usage: showToast('Your message here');
          showToast('Error!', 'error');
          showToast('Done!', 'success', 3000);
   ============================================================ */

(function () {
  'use strict';

  function showToast(message, type, duration) {
    type     = type     || 'default';
    duration = duration || 4000;

    var el = document.getElementById('toast');
    if (!el) return;

    var icons = {
      default: '💬',
      success: '✅',
      error:   '❌',
      warning: '⚠️',
    };

    var borders = {
      default: 'var(--border2)',
      success: 'rgba(16,185,129,.4)',
      error:   'rgba(239,68,68,.4)',
      warning: 'rgba(245,158,11,.4)',
    };

    el.innerHTML   = (icons[type] || icons.default) + ' ' + message;
    el.style.borderColor = borders[type] || borders.default;
    el.classList.add('show');

    clearTimeout(el._timer);
    el._timer = setTimeout(function () {
      el.classList.remove('show');
    }, duration);
  }

  window.showToast = showToast;

}());