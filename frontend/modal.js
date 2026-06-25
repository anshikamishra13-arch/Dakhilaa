/* ============================================================
   modal.js — Modal open / close / form validation / submit
   ============================================================ */

(function () {
  'use strict';

  var modal       = document.getElementById('modal');
  var closeBtn    = document.getElementById('modal-close');
  var startBtn    = document.getElementById('start-test-btn');
  var nameInput   = document.getElementById('rn');
  var phoneInput  = document.getElementById('rp');

  /* ── Open / close ─────────────────────────────────────────── */
  function openModal() {
    if (!modal) return;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (nameInput) nameInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
    clearErrors();
  }

  /* ── Error helpers ────────────────────────────────────────── */
  function setError(input, show) {
    if (!input) return;
    if (show) {
      input.classList.add('err');
    } else {
      input.classList.remove('err');
    }
  }

  function clearErrors() {
    setError(nameInput, false);
    setError(phoneInput, false);
  }

  /* ── Validation ───────────────────────────────────────────── */
  function validateName(val) {
    return val.trim().length >= 2;
  }

  function validatePhone(val) {
    return /^[6-9]\d{9}$/.test(val.trim());
  }

  /* ── Submit ───────────────────────────────────────────────── */
  function startTest() {
    var name  = nameInput  ? nameInput.value  : '';
    var phone = phoneInput ? phoneInput.value : '';
    var ok    = true;

    if (!validateName(name)) {
      setError(nameInput, true);
      ok = false;
    }

    if (!validatePhone(phone)) {
      setError(phoneInput, true);
      ok = false;
    }

    if (!ok) {
      if (window.showToast) showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    if (window.showToast) showToast('Starting your diagnostic test… 🎯', 'success');

    /* Redirect to diagnostic page with query params */
    setTimeout(function () {
      window.location.href =
        'pages/diagnostic.html' +
        '?name='  + encodeURIComponent(name.trim()) +
        '&phone=' + encodeURIComponent(phone.trim());
    }, 700);
  }

  /* ── Event listeners ──────────────────────────────────────── */
  if (closeBtn)   closeBtn.addEventListener('click', closeModal);
  if (startBtn)   startBtn.addEventListener('click', startTest);

  /* Close on backdrop click */
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* Clear error on input */
  if (nameInput)  nameInput.addEventListener('input',  function () { setError(nameInput, false); });
  if (phoneInput) phoneInput.addEventListener('input', function () { setError(phoneInput, false); });

  /* Expose globally so HTML onclick attrs can call them */
  window.openModal  = openModal;
  window.closeModal = closeModal;

}());