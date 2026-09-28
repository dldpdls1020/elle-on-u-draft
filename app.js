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
const heroVideo=document.getElementById('hero-video');
if(heroVideo){const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');const syncVideoMotion=()=>{if(motionPreference.matches){heroVideo.autoplay=false;heroVideo.pause();}};syncVideoMotion();motionPreference.addEventListener('change',syncVideoMotion);}

const galleryToggle = document.querySelector('.gallery-toggle');
const galleryGrid = document.getElementById('brow-gallery');
if (galleryToggle && galleryGrid) {
 galleryToggle.addEventListener('click', () => {
  const expanded = galleryToggle.getAttribute('aria-expanded') !== 'true';
  galleryGrid.classList.toggle('is-expanded', expanded);
  galleryToggle.setAttribute('aria-expanded', String(expanded));
  galleryToggle.innerHTML = expanded ? '시술 사진 접기 <span aria-hidden="true">−</span>' : '시술 사진 더 보기 · 8장 <span aria-hidden="true">＋</span>';
  if (!expanded) galleryToggle.scrollIntoView({block:'center',behavior:'instant'});
 });
}
