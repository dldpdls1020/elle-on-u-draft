// One custom event per click. A booking link click is not a completed booking.
(() => {
 const locationOf = el => {
  if (el.closest('.sticky-cta')) return 'sticky_bar';
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  if (el.closest('#image-dialog')) return 'gallery_dialog';
  return el.closest('section[id]')?.id || 'page';
 };
 const classify = el => {
  const href = el.getAttribute('href') || '';
  if (href.startsWith('https://pcmap.place.naver.com/') && href.includes('/booking')) return 'NaverBookingClick';
  if (href.startsWith('https://pf.kakao.com/')) return 'KakaoConsultClick';
  if (href.startsWith('https://naver.me/') || href.startsWith('https://map.naver.com/')) return 'MapClick';
  if (href.startsWith('https://www.instagram.com/')) return 'InstagramClick';
  if (el.matches('.case-open')) return 'GalleryOpen';
  if (el.matches('.gallery-toggle')) return el.getAttribute('aria-expanded') === 'true' ? 'GalleryCollapse' : 'GalleryExpand';
  if (el.id === 'gallery-prev') return 'GalleryPrevious';
  if (el.id === 'gallery-next') return 'GalleryNext';
  if (el.matches('.dialog-close')) return 'GalleryClose';
  if (href.startsWith('#')) return 'NavigationClick';
  return 'ButtonClick';
 };
 // Stable identifier and placement distinguish every button without sending customer data.
 document.querySelectorAll('a, button').forEach((el, index) => {
  el.dataset.pixelButtonId = el.id || `button_${index + 1}`;
 });
 document.addEventListener('click', event => {
  const el = event.target instanceof Element ? event.target.closest('a, button') : null;
  if (!el || el.disabled || typeof window.fbq !== 'function') return;
  const parameters = {button_id: el.dataset.pixelButtonId, placement: locationOf(el)};
  if (el.matches('.case-open')) parameters.photo_number = String([...document.querySelectorAll('.case-open')].indexOf(el) + 1);
  if ((el.getAttribute('href') || '').startsWith('#')) parameters.destination = el.getAttribute('href');
  try { window.fbq('trackCustom', classify(el), parameters); } catch (_) { /* Tracking must never block a button. */ }
 }, true);
})();
