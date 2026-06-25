/* ============================================================
   predictor.js — College predictor logic
   Depends on: assets/data/colleges.js (COLLEGES global)
   ============================================================ */

(function () {
  'use strict';

  var scoreInput  = document.getElementById('pm');
  var collegeSelect = document.getElementById('pc');
  var predBtn     = document.getElementById('pred-btn');
  var resultBox   = document.getElementById('pred-res');

  if (!predBtn || !resultBox) return;

  /* ── Build result HTML ────────────────────────────────────── */
  function buildBranchCards(college, score) {
    var branches = college.branches;
    var html     = '';

    Object.keys(branches).forEach(function (branch) {
      var cutoff = branches[branch];
      var gap    = cutoff - score;
      var isOk   = gap <= 0;

      html +=
        '<div class="branch-card">' +
          '<div class="branch-name">' + branch + '</div>' +
          '<div class="branch-cutoff">Cutoff: <strong style="color:var(--white)">' + cutoff + '</strong></div>' +
          '<div class="branch-status ' + (isOk ? 'status-ok' : 'status-gap') + '">' +
            (isOk ? '✅ You qualify' : '+' + gap + ' marks needed') +
          '</div>' +
        '</div>';
    });

    return html;
  }

  function buildTip(score, college) {
    var branches = college.branches;
    var keys     = Object.keys(branches);
    var minGap   = Infinity;

    keys.forEach(function (b) {
      var g = branches[b] - score;
      if (g > 0 && g < minGap) minGap = g;
    });

    if (minGap === Infinity) {
      return '<strong style="color:var(--green)">Great news!</strong> You already qualify for multiple branches. Keep your score up and consider taking the diagnostic to fine-tune weak areas.';
    }

    return (
      '<strong style="color:var(--orange)">Your strategy:</strong> ' +
      'You need <strong>' + minGap + ' more marks</strong> to unlock your next branch at ' + college.name + '. ' +
      'Fixing 2–3 weak topics typically adds 20–40 marks in 3–4 weeks. ' +
      '<a href="#" onclick="window.openModal();return false;" style="color:var(--orange);text-decoration:underline">Take the diagnostic →</a>'
    );
  }

  /* ── Run predictor ────────────────────────────────────────── */
  function runPredictor() {
    var score     = parseInt(scoreInput.value) || 0;
    var collegeId = collegeSelect.value;

    if (!score || score <= 0 || score > 360) {
      if (window.showToast) showToast('Please enter a valid score (1 – 360).', 'warning');
      scoreInput.focus();
      return;
    }

    if (!collegeId) {
      if (window.showToast) showToast('Please select a target college.', 'warning');
      collegeSelect.focus();
      return;
    }

    var college = (typeof COLLEGES !== 'undefined') ? COLLEGES[collegeId] : null;

    if (!college) {
      if (window.showToast) showToast('College data not found. Please try again.', 'error');
      return;
    }

    var html =
      '<div style="margin-bottom:18px">' +
        '<strong style="font-size:17px;color:var(--white);font-family:var(--fh)">' + college.name + '</strong>' +
        '<span style="font-size:12px;color:var(--muted);margin-left:10px">Your score: ' + score + ' / 360</span>' +
      '</div>' +
      '<div class="branch-grid">' + buildBranchCards(college, score) + '</div>' +
      '<div class="pred-tip">' + buildTip(score, college) + '</div>';

    resultBox.innerHTML = html;
    resultBox.classList.add('show');

    /* Scroll result into view smoothly */
    setTimeout(function () {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  /* ── Event listeners ──────────────────────────────────────── */
  predBtn.addEventListener('click', runPredictor);

  /* Allow Enter key in score input */
  scoreInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') runPredictor();
  });

  /* Expose globally */
  window.runPred = runPredictor;

}());