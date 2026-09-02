(function () {
  'use strict';

  function getShareUrl() {
    return window.location.href.split('#')[0];
  }

  function fallbackCopyText(value) {
    var textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (err) {
      copied = false;
    }

    document.body.removeChild(textarea);

    return copied ? Promise.resolve() : Promise.reject(new Error('Copy failed'));
  }

  function copyLink(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).catch(function () {
        return fallbackCopyText(value);
      });
    }

    return fallbackCopyText(value);
  }

  function shareWebsite(event) {
    event.preventDefault();

    var shareUrl = getShareUrl();
    var shareTitle = document.title || 'Dakhilaa';
    var shareText = 'Check out Dakhilaa — find your weakest JEE topics and prep smarter.';

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      }).then(function () {
        if (window.showToast) {
          window.showToast('Thanks for sharing Dakhilaa! 🚀', 'success', 2600);
        }
      }).catch(function (err) {
        if (err && err.name === 'AbortError') return;
        copyLink(shareUrl).then(function () {
          if (window.showToast) {
            window.showToast('Share link copied. Send it to your friends! 🔗', 'success', 2600);
          }
        }).catch(function () {
          if (window.showToast) {
            window.showToast('Share link is ready to copy from the browser address bar.', 'warning', 3000);
          }
        });
      });
      return;
    }

    copyLink(shareUrl).then(function () {
      if (window.showToast) {
        window.showToast('Website link copied. Share it with your friends! 🔗', 'success', 2600);
      }
    }).catch(function () {
      if (window.showToast) {
        window.showToast('Your browser blocked the copy. Please copy the URL manually.', 'warning', 3000);
      }
    });
  }

  function bindShareButtons() {
    var buttons = document.querySelectorAll('[data-share-button]');
    buttons.forEach(function (button) {
      button.removeEventListener('click', shareWebsite);
      button.addEventListener('click', shareWebsite);
    });
  }

  document.addEventListener('DOMContentLoaded', bindShareButtons);
  window.dakhilaaShare = {
    shareWebsite: shareWebsite,
    bindShareButtons: bindShareButtons
  };
}());
