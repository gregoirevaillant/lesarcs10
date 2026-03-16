const photos = [
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-1251897514992023275/original/7c2b3e44-3a73-419c-a8ce-3662f9ccd7c0.jpeg', cap: 'Salon & espace repas' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-1251897514992023275/original/7698d23a-3c38-4435-be34-8e1cfcfef7ba.jpeg', cap: 'Vue sur les pistes' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-1251897514992023275/original/7250eedf-70e4-4d50-85ca-22fde5c02e53.jpeg', cap: 'Intérieur appartement' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-1251897514992023275/original/013da958-ddca-4a6e-a9da-8177250a0884.jpeg', cap: 'Chambre & couchages' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-1251897514992023275/original/f04c3910-1c0f-492c-9403-28fbc165a738.jpeg', cap: 'Cuisine entièrement équipée' },
];

// ── Hero slideshow ──
const slidesEl = document.getElementById('heroSlides');
const dotsEl   = document.getElementById('heroDots');
let hi = 0, ht;

photos.forEach((p, i) => {
  const s = document.createElement('div');
  s.className = 'hero-slide' + (i === 0 ? ' active' : '');
  s.style.backgroundImage = `url('${p.src}')`;
  slidesEl.appendChild(s);

  const d = document.createElement('button');
  d.className = 'hero-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goH(i));
  dotsEl.appendChild(d);
});

function goH(idx) {
  document.querySelectorAll('.hero-slide')[hi].classList.remove('active');
  document.querySelectorAll('.hero-dot')[hi].classList.remove('active');
  hi = idx;
  document.querySelectorAll('.hero-slide')[hi].classList.add('active');
  document.querySelectorAll('.hero-dot')[hi].classList.add('active');
  clearInterval(ht);
  ht = setInterval(() => goH((hi + 1) % photos.length), 5000);
}
ht = setInterval(() => goH((hi + 1) % photos.length), 5000);

// ── Gallery ──
const gallery = document.getElementById('gallery');
photos.forEach((p, i) => {
  const el = document.createElement('div');
  el.className = 'g-item reveal';
  el.innerHTML = `<img src="${p.src}" alt="${p.cap}" loading="lazy"><div class="g-overlay"><span>Agrandir</span></div>`;
  el.addEventListener('click', () => lbOpen(i));
  gallery.appendChild(el);
});

// ── Lightbox ──
let li = 0;

function lbOpen(i) {
  li = i;
  lbUpdate();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function lbClose() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(d) {
  li = (li + d + photos.length) % photos.length;
  lbUpdate();
}

function lbUpdate() {
  document.getElementById('lbImg').src         = photos[li].src;
  document.getElementById('lbCap').textContent  = photos[li].cap;
  document.getElementById('lbCount').textContent = `${li + 1} / ${photos.length}`;
}

document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === e.currentTarget) lbClose();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape')     lbClose();
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
});

// ── Scroll reveal ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 55);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
