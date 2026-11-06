(() => {
  'use strict';

  // Keep a manual store choice available for desktop users and shared links.
  if (new URLSearchParams(window.location.search).has('choose')) return;

  const ua = navigator.userAgent || '';
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  const android = /Android/i.test(ua) || /Android/i.test(platform);
  const appleMobile = /iPhone|iPad|iPod/i.test(ua) ||
    (/Mac/i.test(platform) && navigator.maxTouchPoints > 1);
  const storeId = android ? 'google-play' : appleMobile ? 'app-store' : null;
  if (!storeId) return;

  const link = document.getElementById(storeId);
  const status = document.getElementById('status');
  if (!link) return;
  if (status) status.textContent = 'Opening your app store. You can also use the buttons above.';
  window.location.replace(link.href);
})();
