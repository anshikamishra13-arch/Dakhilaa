/* ============================================================
   theme.js — Dark/Light mode toggle
   Load this near the end of <body>, alongside your other scripts.
   ============================================================ */

(function () {
  const STORAGE_KEY = "dakhilaa-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme"); // dark = default, no attribute needed
    }
    // Keep this in sync so mobile Chrome's forced-dark rendering never
    // fights with the theme the user actually picked.
    root.style.colorScheme = theme;
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) btn.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    const icon = document.getElementById("theme-toggle-icon");
    if (icon) icon.textContent = theme === "light" ? "☀️" : "🌙";
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    // Fall back to OS preference; site defaults to dark otherwise
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  // Apply immediately (before paint ideally — see note at bottom on avoiding flash)
  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  function toggleTheme() {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, currentTheme);
    applyTheme(currentTheme);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) {
      btn.addEventListener("click", toggleTheme);
      applyTheme(currentTheme);
    }
  });
})();

/* ------------------------------------------------------------
   To avoid a "flash of wrong theme" on load, add this tiny
   inline script in <head>, BEFORE your stylesheets:

   <script>
     (function() {
       var t = localStorage.getItem('dakhilaa-theme');
       if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
       if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
     })();
   </script>
------------------------------------------------------------- */