// ── Pétalos flotantes ──────────────────────────────────────────
const emojis = ['🌸','💌','🌷','💗'];
for(let i = 0; i < 14; i++){
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = emojis[i % 4];
  petal.style.cssText = `
    left:${Math.random()*100}vw;
    font-size:${14+Math.random()*16}px;
    animation-duration:${10+Math.random()*12}s;
    animation-delay:${-Math.random()*20}s;
  `;
  document.body.prepend(petal);
}

// ── Elementos ──────────────────────────────────────────────────
const envelope      = document.getElementById('envelope');
const envelopeScreen= document.getElementById('envelope-screen');
const envelopeHint  = document.getElementById('envelope-hint');
const content       = document.getElementById('content');
const music         = document.getElementById('bg-music');
const musicToggle   = document.getElementById('music-toggle');
const musicIcon     = document.getElementById('music-icon');
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// ── Abrir sobre ────────────────────────────────────────────────
envelope.addEventListener('click', () => {
  if(envelope.classList.contains('open')) return;
  envelope.classList.add('open');
  envelopeHint.style.opacity = '0';

  setTimeout(() => {
    envelopeScreen.classList.add('hidden');
    content.classList.add('visible');
    // Intentar reproducir música automáticamente tras interacción
    music.play()
      .then(() => {
        musicToggle.classList.add('playing');
        musicIcon.innerHTML = '&#10074;&#10074;';
      })
      .catch(() => {});
  }, 1100);
});

// ── Control de música ──────────────────────────────────────────
musicToggle.addEventListener('click', () => {
  if(music.paused){
    music.play();
    musicToggle.classList.add('playing');
    musicIcon.innerHTML = '&#10074;&#10074;';
  } else {
    music.pause();
    musicToggle.classList.remove('playing');
    musicIcon.innerHTML = '&#9835;';
  }
});

// ── Lightbox (galería) ─────────────────────────────────────────
document.querySelectorAll('.gallery figure').forEach(fig => {
  fig.addEventListener('click', () => {
    const img = fig.querySelector('img');
    lightboxImg.src          = img ? img.src : '';
    lightboxImg.alt          = img ? img.alt : '';
    lightboxImg.style.display= img ? 'block' : 'none';
    lightboxCaption.textContent = fig.dataset.caption || '';
    lightbox.classList.add('visible');
  });
});

lightbox.addEventListener('click', () => lightbox.classList.remove('visible'));
