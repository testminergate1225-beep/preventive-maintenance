/* ============================================================
   THEME LOADER — Applies saved theme on every page load.
   Include this script on ALL pages (before </body> or in <head>).
   Reads 'epm_selected_theme' from localStorage and sets
   data-theme attribute on <body>. Pure visual — no logic changes.
   ============================================================ */
(function(){
  'use strict';
  var THEME_KEY = 'epm_selected_theme';
  try {
    var saved = localStorage.getItem(THEME_KEY);
    if(saved && saved !== 'default'){
      document.body.setAttribute('data-theme', saved);
    }
  } catch(e){}
})();
