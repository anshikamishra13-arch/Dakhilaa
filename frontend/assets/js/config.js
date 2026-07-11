// assets/js/config.js
// Single place to control which backend the frontend talks to.
(function () {
  'use strict';

  var host = window.location.hostname;
  var API_BASE;

  if (host === 'localhost' || host === '127.0.0.1') {
    API_BASE = 'http://localhost:5000/api';
  } else {
    API_BASE = 'https://dakhilaa-2.onrender.com/api';
  }

  window.DAKHILAA_API_BASE = API_BASE;
}());
