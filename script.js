const photos = [
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-917287968507873604/original/fb57bcfb-d194-48e2-896d-a4c255391ada.jpeg', cap: 'Salon & espace repas' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-917287968507873604/original/e6a69639-9397-416b-9997-4f921da5b385.jpeg', cap: 'Vue depuis le logement' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-917287968507873604/original/79ce1292-b153-4cc0-b718-b7c90eb5515f.jpeg', cap: 'Intérieur duplex' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-917287968507873604/original/994cd676-196a-4d30-84f1-c635f4a190c5.jpeg', cap: 'Chambre & couchages' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-917287968507873604/original/4f7e43f2-5efa-485e-be9a-6d8ec1b910d5.jpeg', cap: 'Cuisine équipée' },
  { src: 'https://a0.muscache.com/im/pictures/miso/Hosting-917287968507873604/original/9948fef6-9ca4-4180-8920-c44284617633.jpeg', cap: 'Chambre avec vue panoramique' },
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
  document.getElementById('lbImg').src        = photos[li].src;
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
