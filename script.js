const navLinks = [...document.querySelectorAll('.masthead nav a')];
const archive = document.getElementById('archive');

function trackSection() {
  const threshold = document.querySelector('.masthead').offsetHeight + window.innerHeight * 0.22;
  let current = '';
  for (const link of navLinks) {
    const section = document.getElementById(link.hash.slice(1));
    if (section.getBoundingClientRect().top <= threshold) current = link.hash;
  }
  for (const link of navLinks) {
    if (link.hash === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

let pendingFrame = false;
function onScroll() {
  if (pendingFrame) return;
  pendingFrame = true;
  requestAnimationFrame(() => {
    trackSection();
    pendingFrame = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

function openProject(hash) {
  const target = document.getElementById(hash.slice(1));
  if (target && target.matches('details.project')) target.open = true;
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) openProject(link.hash);
});
function followHash() {
  openProject(location.hash);
  trackSection();
}
window.addEventListener('hashchange', followHash);
followHash();

const gallery = [...document.querySelectorAll('.image-zoom')];
const dialog = document.querySelector('.lightbox');
const enlarged = dialog.querySelector('img');
const caption = document.getElementById('lightbox-caption');
const counter = dialog.querySelector('.lightbox-count');
let currentImage = 0;
let trigger;

function showImage(index) {
  currentImage = (index + gallery.length) % gallery.length;
  const button = gallery[currentImage];
  const image = button.querySelector('img');
  enlarged.src = image.src;
  enlarged.alt = image.alt;
  caption.textContent = button.dataset.caption || image.alt;
  counter.textContent = (currentImage + 1) + ' / ' + gallery.length;
}
gallery.forEach((button, index) => button.addEventListener('click', () => {
  trigger = button;
  showImage(index);
  dialog.showModal();
}));
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => showImage(currentImage - 1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentImage + 1));
dialog.addEventListener('click', event => {
  if (event.target === dialog || event.target.classList.contains('lightbox-content')) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showImage(currentImage + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
dialog.addEventListener('close', () => trigger?.focus({ preventScroll: true }));

let folded = [];
window.addEventListener('beforeprint', () => {
  folded = [...archive.querySelectorAll('details:not([open])')];
  for (const project of folded) project.open = true;
});
window.addEventListener('afterprint', () => {
  for (const project of folded) project.open = false;
  folded = [];
});
document.querySelector('.print-button').addEventListener('click', () => window.print());
