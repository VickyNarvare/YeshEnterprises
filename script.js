/* ============================================================
   YESH ENTERPRISES – script.js
   ============================================================ */

// ── MAGNETIC NAV LINKS ──
document.querySelectorAll('.nav-link, .nav-brand').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// ── AURORA BACKGROUND ──
(function () {
  const canvas = document.getElementById('auroraCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildStars();
  }

  /* ── Stars ── */
  let stars = [];
  function buildStars() {
    stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6 + 0.1,
      twinkle: Math.random() * Math.PI * 2
    }));
  }

  function drawStars(t) {
    stars.forEach(s => {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(s.twinkle + t * 0.0008));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
  }

  /* ── Aurora waves ── */
  // Each wave: color, base opacity, speed, phase offset, amplitude, frequency, vertical position
  const waves = [
    // Cyan layers
    { r:0,   g:180, b:216, a:0.22, sp:0.00038, ph:0.0, amp:0.14, fr:1.1, vy:0.38 },
    { r:0,   g:210, b:240, a:0.14, sp:0.00025, ph:1.8, amp:0.10, fr:1.7, vy:0.30 },
    { r:0,   g:150, b:200, a:0.10, sp:0.00055, ph:3.2, amp:0.18, fr:0.8, vy:0.50 },
    // Magenta layers
    { r:224, g:64,  b:251, a:0.18, sp:0.00030, ph:2.1, amp:0.12, fr:1.3, vy:0.42 },
    { r:200, g:40,  b:220, a:0.12, sp:0.00042, ph:4.5, amp:0.16, fr:0.9, vy:0.28 },
    // Yellow accent
    { r:255, g:214, b:0,   a:0.09, sp:0.00048, ph:1.0, amp:0.08, fr:2.0, vy:0.22 },
    // Deep blue base wash
    { r:30,  g:30,  b:120, a:0.20, sp:0.00018, ph:0.5, amp:0.20, fr:0.6, vy:0.60 },
    // Teal shimmer
    { r:0,   g:230, b:180, a:0.08, sp:0.00060, ph:2.8, amp:0.09, fr:2.4, vy:0.18 },
  ];

  function waveY(wave, x, t) {
    const norm  = x / W;
    const phase = t * wave.sp + wave.ph;
    return H * (wave.vy
      + wave.amp * Math.sin(norm * Math.PI * wave.fr * 2   + phase)
      + wave.amp * 0.45 * Math.sin(norm * Math.PI * wave.fr * 3.9 + phase * 1.4)
      + wave.amp * 0.22 * Math.sin(norm * Math.PI * wave.fr * 7.1 + phase * 0.6)
      + wave.amp * 0.10 * Math.cos(norm * Math.PI * wave.fr * 11  + phase * 2.1)
    );
  }

  function drawWave(wave, t) {
    // pulse opacity gently
    const pulse = 0.75 + 0.25 * Math.sin(t * 0.00060 + wave.ph);
    const alpha = wave.a * pulse;

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,    `rgba(${wave.r},${wave.g},${wave.b},0)`);
    grad.addColorStop(0.15, `rgba(${wave.r},${wave.g},${wave.b},${alpha * 0.6})`);
    grad.addColorStop(0.45, `rgba(${wave.r},${wave.g},${wave.b},${alpha})`);
    grad.addColorStop(0.75, `rgba(${wave.r},${wave.g},${wave.b},${alpha * 0.4})`);
    grad.addColorStop(1,    `rgba(${wave.r},${wave.g},${wave.b},0)`);

    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 3) {
      ctx.lineTo(x, waveY(wave, x, t));
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  /* ── Vignette ── */
  function drawVignette() {
    const vg = ctx.createRadialGradient(W/2, H/2, H * 0.1, W/2, H/2, H * 0.85);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Render loop ── */
  function animate(ts) {
    ctx.clearRect(0, 0, W, H);

    // deep dark base
    ctx.fillStyle = '#07071a';
    ctx.fillRect(0, 0, W, H);

    // stars first
    drawStars(ts);

    // aurora waves with screen blend
    ctx.globalCompositeOperation = 'screen';
    waves.forEach(w => drawWave(w, ts));
    ctx.globalCompositeOperation = 'source-over';

    // vignette on top
    drawVignette();

    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(animate);
})();


document.getElementById('year').textContent = new Date().getFullYear();

// ── NAVBAR TOGGLE ──
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navLinks.classList.add('open');
  navToggle.classList.add('is-open');
  navOverlay.classList.add('active');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('is-open');
  navOverlay.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  // also collapse any open sub-menus
  document.querySelectorAll('.dropdown.sub-open').forEach(d => d.classList.remove('sub-open'));
  document.querySelectorAll('.sub-toggle[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded','false'));
}
navToggle.addEventListener('click', () =>
  navToggle.classList.contains('is-open') ? closeMenu() : openMenu()
);
navOverlay.addEventListener('click', closeMenu);
navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ── SERVICES SUB-MENU TOGGLE (mobile tap) ──
document.querySelectorAll('.sub-toggle').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const dropdown = btn.closest('.has-dropdown').querySelector('.dropdown');
    const isOpen   = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    dropdown.classList.toggle('sub-open', !isOpen);
  });
});
// Close sub-menu when a sub-link is clicked
document.querySelectorAll('.sub-link').forEach(l => l.addEventListener('click', closeMenu));

// ── ACTIVE NAV ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
function setActiveNav() {
  const y = window.scrollY + 90;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navItems.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === `#${sec.id}`) l.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });

// ── BACK TO TOP ──
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── TESTIMONIAL INFINITE MARQUEE ──
const track = document.getElementById('testiTrack');
if (track) {
  track.innerHTML = track.innerHTML + track.innerHTML;
}
const track2 = document.getElementById('testiTrack2');
if (track2) {
  track2.innerHTML = track2.innerHTML + track2.innerHTML;
}

// ── TYPING EFFECT ──
const phrases = [
  'Toner Refills.',
  'Printer Repairs.',
  'Maintenance AMC.',
  'Cartridge Supply.',
  'Fast Service.'
];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

// ── GALLERY LIGHTBOX + TILT ──
const galItems  = document.querySelectorAll('.gal-item');
const lightbox  = document.getElementById('galLightbox');
const lbClose   = document.getElementById('galLbClose');
const lbVisual  = document.getElementById('galLbVisual');
const lbTitle   = document.getElementById('galLbTitle');
const lbDesc    = document.getElementById('galLbDesc');
const lbCta     = document.getElementById('galLbCta');

// Lightbox open
galItems.forEach(item => {
  item.addEventListener('click', () => {
    const ph = item.querySelector('.gal-ph');
    const cls = [...ph.classList].find(c => c.startsWith('gal-') && c !== 'gal-ph');
    lbVisual.className = `gal-lb-visual ${cls || ''}`;
    lbVisual.innerHTML = item.querySelector('.gal-icon').innerHTML;
    lbTitle.textContent = item.dataset.title;
    lbDesc.textContent  = item.dataset.desc;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Lightbox close
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
lbCta.addEventListener('click', closeLightbox);

// 3D tilt on hover
galItems.forEach(item => {
  item.addEventListener('mousemove', e => {
    const r    = item.getBoundingClientRect();
    const x    = (e.clientX - r.left) / r.width  - 0.5;
    const y    = (e.clientY - r.top)  / r.height - 0.5;
    item.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-5px) scale(1.02)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});


const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // stagger siblings
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
    const idx = siblings.indexOf(entry.target);
    const base = parseFloat(getComputedStyle(entry.target).getPropertyValue('--delay')) || 0;
    setTimeout(() => entry.target.classList.add('visible'), idx * 80 + base * 1000);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── FAQ ACCORDION ──
const faqItems = document.querySelectorAll('.faq-item');

function openFaq(item) {
  item.querySelector('.faq-q').setAttribute('aria-expanded', 'true');
  item.querySelector('.faq-a').classList.add('open');
}
function closeAllFaq() {
  faqItems.forEach(i => {
    i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    i.querySelector('.faq-a').classList.remove('open');
  });
}

// First item already open via HTML; no need to force open
faqItems.forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.querySelector('.faq-q').getAttribute('aria-expanded') === 'true';
    closeAllFaq();
    if (!isOpen) openFaq(item);
  });
});

// ── CUSTOM SELECT ──
const customSelect = document.getElementById('customSelect');
const csTrigger    = document.getElementById('csTrigger');
const csDropdown   = document.getElementById('csDropdown');
const csValue      = document.getElementById('csValue');
const fsHidden     = document.getElementById('fservice');

function closeSelect() {
  customSelect.classList.remove('open');
  csTrigger.setAttribute('aria-expanded', 'false');
}

csTrigger.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = customSelect.classList.toggle('open');
  csTrigger.setAttribute('aria-expanded', isOpen);
});

csDropdown.querySelectorAll('.cs-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const val = opt.dataset.value;
    csValue.textContent = val;
    fsHidden.value = val;
    csTrigger.classList.add('has-value');
    csDropdown.querySelectorAll('.cs-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    closeSelect();
  });
});

document.addEventListener('click', closeSelect);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSelect(); });


const form     = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

function setErr(id, msg) {
  const el = document.getElementById(id + 'Err');
  const inp = document.getElementById(id);
  if (el) el.textContent = msg;
  if (inp) inp.classList.toggle('err-field', !!msg);
}
function clearErrs() {
  ['fname','femail','fmsg'].forEach(id => setErr(id, ''));
}
function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

['fname','femail','fmsg'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => setErr(id, ''));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrs();
  let ok = true;
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();

  if (!name)              { setErr('fname',  'Please enter your name.');          ok = false; }
  if (!email)             { setErr('femail', 'Please enter your email.');         ok = false; }
  else if (!validEmail(email)) { setErr('femail', 'Enter a valid email address.'); ok = false; }
  if (!msg)               { setErr('fmsg',   'Please enter a message.');          ok = false; }

  if (ok) {
    feedback.className = 'form-feedback success';
    feedback.textContent = '✓ Message sent! We\'ll get back to you shortly.';
    form.reset();
    setTimeout(() => { feedback.className = 'form-feedback'; feedback.textContent = ''; }, 6000);
  } else {
    feedback.className = 'form-feedback error';
    feedback.textContent = 'Please fix the errors above and try again.';
    setTimeout(() => { feedback.className = 'form-feedback'; feedback.textContent = ''; }, 4000);
  }
});

// ── NEWSLETTER VALIDATION ──
const nlForm = document.getElementById('newsletterForm');
nlForm.addEventListener('submit', e => {
  e.preventDefault();
  const val = document.getElementById('nlEmail').value.trim();
  const err = document.getElementById('nlErr');
  const suc = document.getElementById('nlSuccess');
  if (!val || !validEmail(val)) {
    err.textContent = 'Enter a valid email address.';
    return;
  }
  err.textContent = '';
  suc.style.display = 'block';
  nlForm.reset();
  setTimeout(() => { suc.style.display = 'none'; }, 5000);
});
