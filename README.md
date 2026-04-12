# YESH ENTERPRISES – Business Website

A fully responsive, modern dark-themed business website for **YESH ENTERPRISES**, a professional toner refill and printer service company based in Mumbai.

---

## 📁 Project Structure

```
├── index.html      # Main HTML file
├── style.css       # All styles (responsive, animations)
├── script.js       # JavaScript (nav, typing, FAQ, forms)
└── README.md       # This file
```

---

## 🚀 Features

### Design
- Full dark theme across all sections using CMYK-inspired palette (Cyan, Magenta, Yellow, Black)
- Dot-grid background overlay on every section for depth
- Animated ink blob backgrounds with drift animations
- Glassmorphism cards and panels throughout
- Smooth scroll-reveal animations with staggered delays
- Gradient accent dividers and CMYK pill badges

### Navigation
- Floating pill-shaped sticky navbar with glassmorphism blur
- Desktop: hover dropdown for Services with animated chevron
- Mobile: slide-down panel with CMYK gradient accent line, full-width links, tap-to-expand Services accordion
- Animated hamburger → X button
- Backdrop overlay with body scroll lock
- Escape key and overlay-click to close

### Sections

| Section | Description |
|---|---|
| Hero | Badge, typing effect, CMYK pills, stats row, floating printer card with glow |
| About | Proprietor profile, stats, dark glassmorphism card |
| Services | 4 dark cards with per-card color glow on hover, badges, turnaround time, bottom CTA strip |
| Gallery | 6 gradient placeholder cards with hover zoom |
| Testimonials | Rating summary bar + dual infinite marquee rows (opposite directions), 12 reviews |
| FAQ | Two-column layout — sticky sidebar with CTA + trust badges, numbered accordion |
| Contact | WhatsApp CTA, info cards, map placeholder, dark form with icon labels |
| Footer | Top CTA banner, inline contact info, working hours, social icons, back-to-top |

### JavaScript Features
- Typing effect cycling through 5 service phrases
- Scroll-triggered fade-in with staggered delays (IntersectionObserver)
- Dual testimonial marquee cloning for seamless infinite loop
- FAQ accordion (one open at a time)
- Contact form validation (name, email format, message required)
- Newsletter email validation
- Back to Top button with scroll threshold
- Active nav link highlight on scroll

---

## 🏢 Business Info

| | |
|---|---|
| **Company** | YESH ENTERPRISES |
| **Proprietor** | Dinesh Narvare |
| **Phone** | +91 86554 66226 |
| **Email** | narvaredinesh56@gmail.com |
| **Address** | Vartak Nagar, Pokaran Road No. 1, Near Sai Baba Mandir, Mumbai |
| **Hours** | Mon – Sat: 9:00 AM – 8:00 PM |
| **WhatsApp** | wa.me/918655466226 |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, SEO meta tags, Open Graph
- **CSS3** — Custom properties, Grid, Flexbox, keyframe animations, media queries
- **JavaScript** — Vanilla JS, IntersectionObserver, no dependencies
- **Font Awesome 6** — Icons via CDN

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 1024px` | Full desktop layout |
| `≤ 1024px` | Stacked about/FAQ, 2-col footer |
| `≤ 900px` | Single column hero, stacked contact grid |
| `≤ 640px` | Mobile nav panel, single column all sections |

---

## 🌐 Usage

No build tools required. Open `index.html` directly in any browser.

```bash
# Clone or download, then open directly
open index.html
```

> Requires an internet connection to load Font Awesome icons from CDN.

---

© 2026 YESH ENTERPRISES. All rights reserved.  
Designed & Developed by **Vicky Narvare**
