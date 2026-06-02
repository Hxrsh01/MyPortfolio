/* ─── NAVBAR: scroll + mobile toggle ──────────────────────── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveLink();
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─── ACTIVE NAV LINK on scroll ───────────────────────────── */
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ─── TYPED TEXT EFFECT ───────────────────────────────────── */
const phrases  = ['Web Developer', 'LLM Post-Training Intern', 'MERN Stack Developer', 'Java Programmer', 'Problem Solver'];
let   pIndex   = 0;
let   cIndex   = 0;
let   deleting = false;
const typedEl  = document.getElementById('typedText');

function type() {
  const current = phrases[pIndex];

  if (deleting) {
    typedEl.textContent = current.substring(0, cIndex--);
  } else {
    typedEl.textContent = current.substring(0, cIndex++);
  }

  let delay = deleting ? 60 : 100;

  if (!deleting && cIndex === current.length + 1) {
    delay    = 1800;
    deleting = true;
  } else if (deleting && cIndex === -1) {
    deleting = false;
    pIndex   = (pIndex + 1) % phrases.length;
    cIndex   = 0;
    delay    = 400;
  }

  setTimeout(type, delay);
}

type();

/* ─── SCROLL-TRIGGERED ANIMATIONS (lightweight AOS-like) ──── */
const animatedEls = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Respect delay if set
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));

/* ─── SKILL BAR ANIMATION ─────────────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const width = el.dataset.width;
      el.style.width = width + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ─── CONTACT FORM ────────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();

  const btn  = e.target.querySelector('button[type="submit"]');
  const name = document.getElementById('name').value.trim();
  const email= document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const msg  = document.getElementById('message').value.trim();

  // Open Gmail compose with pre-filled fields
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=harshkrgupta2605@gmail.com`
    + `&su=${encodeURIComponent(subject)}`
    + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;

  window.open(gmailUrl, '_blank');

  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
