/* ============================================================
   history.js — Shared local attempt-history store.
   Every diagnostic attempt is appended here (localStorage, so
   it survives across sessions on this device/browser). Used by
   progress.html (Track Your Progress), practice.html (Daily
   Targeted Practice) and planner.html (AI Study Planner).
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'dakhilaa_attempts_v1';

  function getAttempts() {
    try {
      var raw = localStorage.getItem(KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveAttempt(topics, score, total) {
    try {
      var list = getAttempts();
      list.push({
        date: new Date().toISOString(),
        score: score,
        total: total,
        pct: total ? Math.round((score / total) * 100) : 0,
        topics: topics, // { topicName: { correct, total } }
      });
      // Keep the most recent 50 attempts — plenty for trend charts, bounded storage.
      if (list.length > 50) list = list.slice(list.length - 50);
      localStorage.setItem(KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getLatestAttempt() {
    var list = getAttempts();
    return list.length ? list[list.length - 1] : null;
  }

  /* Returns the n weakest topics (lowest accuracy) from the most recent
     attempt, sorted worst-first. Each item: { topic, pct, correct, total } */
  function getWeakTopics(n) {
    var latest = getLatestAttempt();
    if (!latest || !latest.topics) return [];
    var ranked = Object.keys(latest.topics).map(function (t) {
      var d = latest.topics[t];
      return { topic: t, correct: d.correct, total: d.total, pct: d.total ? Math.round((d.correct / d.total) * 100) : 0 };
    }).sort(function (a, b) { return a.pct - b.pct; });
    return n ? ranked.slice(0, n) : ranked;
  }

  window.DakhilaaHistory = {
    getAttempts: getAttempts,
    saveAttempt: saveAttempt,
    getLatestAttempt: getLatestAttempt,
    getWeakTopics: getWeakTopics,
  };
}());