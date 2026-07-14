(function () {
  'use strict';

  var percentileInput = document.getElementById('pm');       // JEE Main percentile
  var advRankInput     = document.getElementById('pmadv');   // JEE Advanced rank (IITs only)
  var advRankGroup     = document.getElementById('pmadv-group');
  var collegeSelect    = document.getElementById('pc');
  var predBtn          = document.getElementById('pred-btn');
  var resultBox        = document.getElementById('pred-res');

  if (!predBtn || !resultBox) return;

  /* Show/hide the JEE Advanced Rank field depending on whether
     the selected college is admitted via JEE Advanced (IITs)
     or JEE Main (NITs/IIITs). */
  function syncAdvancedField() {
    var collegeId = collegeSelect.value;
    var college = (typeof COLLEGES !== 'undefined' && collegeId) ? COLLEGES[collegeId] : null;
    if (!advRankGroup) return;

    if (college && college.examType === 'advanced') {
      advRankGroup.style.display = '';
    } else {
      advRankGroup.style.display = 'none';
    }
  }

  if (collegeSelect) {
    collegeSelect.addEventListener('change', syncAdvancedField);
    syncAdvancedField();
  }

  function buildBranchCards(college, userRank) {
    var branches = college.branches;
    var html = '';

    Object.keys(branches).forEach(function (branch) {
      var closingRank = branches[branch];
      var gap  = userRank - closingRank; // positive = rank too high (worse) to qualify
      var isOk = userRank <= closingRank;

      html +=
        '<div class="branch-card">' +
          '<div class="branch-name">' + branch + '</div>' +
          '<div class="branch-cutoff">Closing Rank: <strong style="color:var(--white)">' + closingRank.toLocaleString('en-IN') + '</strong></div>' +
          '<div class="branch-status ' + (isOk ? 'status-ok' : 'status-gap') + '">' +
            (isOk ? '✅ You qualify' : '+' + gap.toLocaleString('en-IN') + ' ranks needed to improve') +
          '</div>' +
        '</div>';
    });

    return html;
  }

  function buildTip(userRank, college) {
    var branches = college.branches;
    var keys     = Object.keys(branches);
    var minGap   = Infinity;
    var nextBranch = null;

    keys.forEach(function (b) {
      var g = userRank - branches[b];
      if (g > 0 && g < minGap) { minGap = g; nextBranch = b; }
    });

    if (minGap === Infinity) {
      return '<strong style="color:var(--green)">Great news!</strong> You already qualify for multiple branches at this rank. Take the diagnostic to lock in your preparation and hold this rank.';
    }

    var examLabel = college.examType === 'advanced' ? 'JEE Advanced rank' : 'JEE Main rank';

    return (
      '<strong style="color:var(--orange)">Your strategy:</strong> ' +
      'You need to improve your ' + examLabel + ' by about <strong>' + minGap.toLocaleString('en-IN') + ' ranks</strong> to unlock ' + nextBranch + ' at ' + college.name + '. ' +
      'Fixing 2–3 weak topics typically moves your percentile up meaningfully within a few weeks of focused practice. ' +
      '<a href="#" onclick="window.startDiagnostic();return false;" style="color:var(--orange);text-decoration:underline">Take the diagnostic →</a>'
    );
  }

  function runPredictor() {
    var collegeId = collegeSelect.value;

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

    var userRank, scoreLine;

    if (college.examType === 'advanced') {
      // IITs are seated on JEE Advanced AIR — percentile doesn't apply here.
      var advRank = parseInt(advRankInput.value, 10);
      if (!advRank || advRank <= 0) {
        if (window.showToast) showToast('IITs use JEE Advanced rank. Please enter your JEE Advanced AIR.', 'warning');
        advRankInput.focus();
        return;
      }
      userRank  = advRank;
      scoreLine = 'Your JEE Advanced AIR: ' + userRank.toLocaleString('en-IN');
    } else {
      // NITs / IIITs are seated on JEE Main percentile → AIR (CRL).
      var percentile = parseFloat(percentileInput.value);
      if (isNaN(percentile) || percentile <= 0 || percentile > 100) {
        if (window.showToast) showToast('Please enter a valid JEE Main percentile (0.01 – 100).', 'warning');
        percentileInput.focus();
        return;
      }
      userRank  = percentileToRank(percentile);
      scoreLine = 'Your percentile: ' + percentile + ' → estimated JEE Main AIR ≈ ' + userRank.toLocaleString('en-IN');
    }

    var html =
      '<div style="margin-bottom:18px">' +
        '<strong style="font-size:17px;color:var(--white);font-family:var(--fh)">' + college.name + '</strong>' +
        '<span class="branch-status" style="margin-left:10px;font-size:11px;padding:2px 8px;border-radius:20px;background:rgba(255,255,255,.08)">' + college.tier + '</span>' +
        '<div style="font-size:12px;color:var(--muted);margin-top:6px">' + scoreLine + '</div>' +
      '</div>' +
      '<div class="branch-grid">' + buildBranchCards(college, userRank) + '</div>' +
      '<div class="pred-tip">' + buildTip(userRank, college) + '</div>' +
      '<div style="font-size:11px;color:var(--muted);margin-top:12px">Closing ranks shown are indicative multi-year estimates (General category, Round 6). Actual cutoffs vary by year, category, and quota — verify on josaa.nic.in before finalising choices.</div>';

    resultBox.innerHTML = html;
    resultBox.classList.add('show');

    setTimeout(function () {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  predBtn.addEventListener('click', runPredictor);

  percentileInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') runPredictor();
  });
  if (advRankInput) {
    advRankInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runPredictor();
    });
  }

  window.runPred = runPredictor;

}());