(function () {
  'use strict';

  function getShareUrl() {
    if (window.DAKHILAA_SITE_URL) return window.DAKHILAA_SITE_URL;
    return window.location.href;
  }

  function getShareText() {
    return 'Check out Dakhilaa — the precision JEE prep platform to find your weak topics and improve faster.';
  }

  function closeAllShareMenus() {
    document.querySelectorAll('.share-popover').forEach(function (panel) {
      panel.classList.remove('show');
    });
  }

  function toggleShareMenu(trigger) {
    var shareMenu = trigger.closest('.share-menu');
    var menu = shareMenu ? shareMenu.querySelector('.share-popover') : null;
    if (!menu) return;

    var isOpen = menu.classList.contains('show');
    closeAllShareMenus();
    if (!isOpen) menu.classList.add('show');
  }

  function copyShareLink() {
    var url = getShareUrl();
    var copy = function (text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {
          fallbackCopy(text);
        });
        return;
      }
      fallbackCopy(text);
    };

    var fallbackCopy = function (text) {
      var helper = document.createElement('input');
      helper.value = text;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
    };

    copy(url);

    if (window.showToast) {
      window.showToast('Website link copied — share it with your friends!', 'success');
    }
    closeAllShareMenus();
  }

  function openShareWindow(platform) {
    var url = getShareUrl();
    var text = getShareText();
    var shareUrls = {
      whatsapp: 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url),
      x: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url),
      telegram: 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text)
    };

    var targetUrl = shareUrls[platform];
    if (!targetUrl) return;

    window.open(targetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    closeAllShareMenus();
  }

  function initShareButtons() {
    document.querySelectorAll('.share-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleShareMenu(trigger);
      });
    });

    document.querySelectorAll('[data-share-option]').forEach(function (option) {
      option.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var platform = option.getAttribute('data-share-option');

        if (platform === 'copy') {
          copyShareLink();
          return;
        }

        openShareWindow(platform);
      });
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.share-trigger') && !event.target.closest('.share-option')) {
        closeAllShareMenus();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initShareButtons);
  window.DakhilaaShare = {
    getShareUrl: getShareUrl,
    getShareText: getShareText,
    copyShareLink: copyShareLink,
    openShareWindow: openShareWindow
  };
}());
