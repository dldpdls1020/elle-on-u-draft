const dialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('dialog-image');
const caption = document.getElementById('image-caption');
const cases = [...document.querySelectorAll('.case-open')];
let activeCase = 0;
function showCase(index) {
 activeCase = (index + cases.length) % cases.length;
 const item = cases[activeCase];
 dialogImage.src = item.dataset.image;
 dialogImage.alt = item.dataset.caption;
 caption.textContent = item.dataset.caption;
 document.getElementById('gallery-count').textContent = `${activeCase + 1} / ${cases.length}`;
}
cases.forEach((button,index)=>button.addEventListener('click',()=>{showCase(index);dialog.showModal();document.body.classList.add('modal-open');}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.getElementById('gallery-prev').addEventListener('click',()=>showCase(activeCase-1));
document.getElementById('gallery-next').addEventListener('click',()=>showCase(activeCase+1));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showCase(activeCase-1);}if(event.key==='ArrowRight'){event.preventDefault();showCase(activeCase+1);}});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
 const frame = heroVideo.closest('.hero-photo');
 const fallback = document.querySelector('.hero-video-fallback');
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 let pending = false;
 heroVideo.muted = true;
 heroVideo.defaultMuted = true;
 heroVideo.playsInline = true;
 heroVideo.controls = false;
 const showFallback = () => { frame.classList.remove('is-playing'); fallback.hidden = false; };
 const tryPlay = (userInitiated = false) => {
  if (document.hidden || (motion.matches && !userInitiated) || pending || !heroVideo.paused) return;
  heroVideo.muted = true;
  pending = true;
  const result = heroVideo.play();
  if (result) result.catch(() => {showFallback();frame.classList.add('needs-tap');}).finally(() => {pending = false;});
  else pending = false;
 };
 heroVideo.addEventListener('playing', () => {frame.classList.add('is-playing');frame.classList.remove('needs-tap');fallback.hidden = true;});
 heroVideo.addEventListener('pause', showFallback);
 heroVideo.addEventListener('error', showFallback);
 heroVideo.addEventListener('canplay', () => tryPlay());

 document.addEventListener('touchend', () => tryPlay(), {passive:true});
 document.addEventListener('pointerup', () => tryPlay(), {passive:true});
 document.addEventListener('visibilitychange', () => {if(!document.hidden)tryPlay();});
 window.addEventListener('pageshow', () => tryPlay());
 if ('IntersectionObserver' in window) new IntersectionObserver(entries => {if(entries[0].isIntersecting)tryPlay();},{threshold:0.1}).observe(frame);
 motion.addEventListener('change', () => {if(motion.matches){heroVideo.pause();showFallback();}else tryPlay();});
 if (motion.matches) {heroVideo.autoplay = false;heroVideo.pause();}
 tryPlay();
}

const galleryToggle = document.querySelector('.gallery-toggle');
const galleryGrid = document.getElementById('brow-gallery');
if (galleryToggle && galleryGrid) {
 galleryToggle.addEventListener('click', () => {
  const expanded = galleryToggle.getAttribute('aria-expanded') !== 'true';
  galleryGrid.classList.toggle('is-expanded', expanded);
  galleryToggle.setAttribute('aria-expanded', String(expanded));
  galleryToggle.innerHTML = expanded ? '시술 사진 접기 <span aria-hidden="true">−</span>' : `시술 사진 더 보기 · ${Math.max(0, cases.length - 4)}장 <span aria-hidden="true">＋</span>`;
  if (!expanded) galleryToggle.scrollIntoView({block:'center',behavior:'instant'});
 });
}

// Reveal once on entry; keep all content visible if observers are unavailable.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.section-heading, .signature-layout, .director-copy, .process-grid, .price-heading, .featured-price, .closing h2');
const bookingTargets = document.querySelectorAll('.hero-actions a[href*="/booking"], .featured-amount a[href*="/booking"], .closing-actions a[href*="/booking"], .sticky-book');
bookingTargets.forEach(element => element.classList.add('booking-accent'));
if ('IntersectionObserver' in window) {
 const motionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   if (!motionPreference.matches) entry.target.classList.add(entry.target.classList.contains('booking-accent') ? 'booking-arrived' : 'is-revealed');
   motionObserver.unobserve(entry.target);
  });
 }, {threshold:0.15});
 revealTargets.forEach(element => {element.classList.add('motion-reveal');motionObserver.observe(element);});
 bookingTargets.forEach(element => motionObserver.observe(element));
}
