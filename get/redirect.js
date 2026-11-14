(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const friend = params.get('friend') || '';
  if (/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(friend)) {
    const name = params.get('name') || '';
    const invite = document.getElementById('open-invite');
    const intro = document.getElementById('intro');
    const status = document.getElementById('status');
    invite.href = 'whiskeyatlas://friend?' + new URLSearchParams({ friend });
    invite.hidden = false;
    intro.textContent = /^[a-z0-9 ]{3,20}$/i.test(name)
        ? name + ' invited you to connect on Whiskey Atlas.'
        : 'You were invited to connect on Whiskey Atlas.';
    status.textContent = 'New here? Install Whiskey Atlas and set up your profile. Then return to this invitation and tap Open in Whiskey Atlas.';
    return;
  }
  // Keep a manual store choice available for desktop users and shared links.
  if (params.has('choose')) return;

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
