/* ============================================================
   YESH ENTERPRISES – script.js
   ============================================================ */

// ── YEAR ──
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

// ── SCROLL REVEAL ──
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
