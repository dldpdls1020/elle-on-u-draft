const dialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('dialog-image');
const caption = document.getElementById('image-caption');
document.querySelectorAll('.case-open').forEach(button => button.addEventListener('click', () => {
  dialogImage.src = button.dataset.image;
  dialogImage.alt = button.dataset.caption;
  caption.textContent = button.dataset.caption;
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target === dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

const heroVideo = document.getElementById("hero-video");
if (heroVideo) {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncVideoMotion = () => { if (motionPreference.matches) { heroVideo.autoplay = false; heroVideo.pause(); } };
  syncVideoMotion();
  motionPreference.addEventListener("change", syncVideoMotion);
}
