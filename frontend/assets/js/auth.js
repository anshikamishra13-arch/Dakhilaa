(function () {
  'use strict';

  var TOKEN_KEY = 'dakhilaa_token';
  var USER_KEY = 'dakhilaa-user';
  var apiBase = window.DAKHILAA_API_BASE || 'http://localhost:5000/api';
  var modal = document.getElementById('auth-modal');
  var form = document.getElementById('auth-form');
  var title = document.getElementById('auth-title');
  var submit = document.getElementById('auth-submit');
  var switchMode = document.getElementById('auth-switch-mode');
  var switchText = document.getElementById('auth-switch-text');
  var registerFields = document.getElementById('register-fields');
  var error = document.getElementById('auth-error');
  var mode = 'login';

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    } catch (ignored) {
      return null;
    }
  }

  function saveSession(data) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  function setAuthError(message) {
    if (!error) return;
    error.textContent = message || '';
    error.hidden = !message;
  }

  function setMode(nextMode) {
    mode = nextMode;
    var registering = mode === 'register';
    if (title) title.textContent = registering ? 'Create your student account' : 'Welcome back, student';
    if (submit) submit.textContent = registering ? 'Create account' : 'Log in';
    if (registerFields) registerFields.hidden = !registering;
    if (switchText) switchText.textContent = registering ? 'Already have an account?' : 'New to Dakhilaa?';
    if (switchMode) switchMode.textContent = registering ? 'Log in' : 'Create an account';
    setAuthError('');
  }

  function openAuth(nextMode) {
    if (!modal) return;
    setMode(nextMode || 'login');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    var firstInput = modal.querySelector('input:not([type="hidden"])');
    if (firstInput) firstInput.focus();
  }

  function closeAuth() {
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
    setAuthError('');
    if (form) form.reset();
  }

  async function submitAuth(event) {
    event.preventDefault();
    setAuthError('');
    if (!form || !submit) return;

    var formData = new FormData(form);
    var payload = {
      email: String(formData.get('email') || '').trim().toLowerCase(),
      password: String(formData.get('password') || '')
    };

    if (mode === 'register') {
      payload.name = String(formData.get('name') || '').trim();
      payload.phone = String(formData.get('phone') || '').trim();
      if (payload.name.length < 2 || !/^[6-9]\d{9}$/.test(payload.phone)) {
        setAuthError('Enter your name and a valid 10-digit Indian phone number.');
        return;
      }
    }

    if (!payload.email || payload.password.length < 6) {
      setAuthError('Enter a valid email and a password of at least 6 characters.');
      return;
    }

    submit.disabled = true;
    submit.textContent = mode === 'register' ? 'Creating account...' : 'Logging in...';

    try {
      var response = await fetch(apiBase + '/auth/' + mode, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Authentication failed.');

      saveSession(data);
      closeAuth();
      if (window.showToast) window.showToast(mode === 'register' ? 'Account created successfully.' : 'Welcome back.', 'success');
      updateAuthLinks(data.user);
      if (sessionStorage.getItem('dakhilaa-auth-redirect') === 'dashboard') {
        sessionStorage.removeItem('dakhilaa-auth-redirect');
        window.location.href = 'pages/student-dashboard.html';
      }
    } catch (requestError) {
      setAuthError(requestError.message || 'Unable to connect to Dakhilaa. Please try again.');
    } finally {
      submit.disabled = false;
      submit.textContent = mode === 'register' ? 'Create account' : 'Log in';
    }
  }

  async function verifySession() {
    var token = getToken();
    if (!token) return null;
    try {
      var response = await fetch(apiBase + '/auth/me', {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (!response.ok) throw new Error('Session expired');
      var data = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data.user;
    } catch (requestError) {
      clearSession();
      return null;
    }
  }

  function updateAuthLinks(user) {
    document.querySelectorAll('[data-auth-login]').forEach(function (button) {
      button.textContent = user ? 'My dashboard' : 'Student login';
      button.onclick = function () {
        if (user) window.location.href = 'pages/student-dashboard.html';
        else openAuth('login');
      };
    });
  }

  function requireDashboardAuth() {
    if (!document.body.hasAttribute('data-dashboard')) return;
    verifySession().then(function (user) {
      if (!user) {
        sessionStorage.setItem('dakhilaa-auth-redirect', 'dashboard');
        window.location.href = '../index.html';
        return;
      }
      var displayName = user.name || 'Student';
      var heading = document.getElementById('student-welcome');
      var profileName = document.getElementById('student-profile-name');
      var profileMeta = document.getElementById('student-profile-meta');
      var avatar = document.getElementById('student-avatar');
      if (heading) heading.textContent = 'Welcome back, ' + displayName.split(' ')[0];
      if (profileName) profileName.textContent = displayName;
      if (profileMeta) profileMeta.textContent = 'Student account · ' + user.email;
      if (avatar) avatar.textContent = displayName.split(' ').map(function (part) { return part.charAt(0); }).slice(0, 2).join('').toUpperCase();
      document.body.classList.add('auth-ready');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (form) form.addEventListener('submit', submitAuth);
    document.querySelectorAll('[data-auth-open]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.hasAttribute('data-auth-login') && getStoredUser()) {
          window.location.href = 'pages/student-dashboard.html';
          return;
        }
        openAuth(button.getAttribute('data-auth-open') || 'login');
      });
    });
    document.querySelectorAll('[data-auth-close]').forEach(function (button) {
      button.addEventListener('click', closeAuth);
    });
    if (switchMode) switchMode.addEventListener('click', function () { setMode(mode === 'login' ? 'register' : 'login'); });
    if (modal) modal.addEventListener('click', function (event) { if (event.target === modal) closeAuth(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeAuth(); });

    var user = getStoredUser();
    updateAuthLinks(user);
    requireDashboardAuth();

    document.querySelectorAll('[data-auth-logout]').forEach(function (button) {
      button.addEventListener('click', function () {
        clearSession();
        window.location.href = '../index.html';
      });
    });
  });

  window.openAuth = openAuth;
  window.dakhilaaAuth = { getToken: getToken, verifySession: verifySession, clearSession: clearSession };
}());
