/* ============================================================
   Ibrahim Alshaya — Portfolio  |  Assignment 2 — script.js
   Adds: project filter/search, API facts, accordion, improved
         form validation with inline errors, scroll reveal, and
         enhanced UX throughout.
   ============================================================ */

'use strict';

// ===== 1. THEME TOGGLE (localStorage) =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}


// ===== 2. GREETING MESSAGE BY TIME OF DAY =====
function setGreeting() {
    const el = document.getElementById('greeting');
    if (!el) return;
    const hour = new Date().getHours();

    let greeting;
    if (hour >= 5 && hour < 12)       greeting = '☀️ Good morning!';
    else if (hour >= 12 && hour < 17)  greeting = '👋 Good afternoon!';
    else if (hour >= 17 && hour < 22)  greeting = '🌆 Good evening!';
    else                               greeting = '🌙 Working late?';

    el.textContent = greeting;
}

setGreeting();


// ===== 3. TYPING EFFECT FOR TAGLINE =====
const taglineText = 'Bridging robust software design with intelligent, data-driven solutions.';
const taglineEl = document.querySelector('.hero-tagline');

if (taglineEl) {
    taglineEl.innerHTML = '<span class="cursor">|</span>';
    let i = 0;

    function typeWriter() {
        if (i < taglineText.length) {
            // Insert text before the cursor
            const cursor = taglineEl.querySelector('.cursor');
            cursor.insertAdjacentText('beforebegin', taglineText.charAt(i));
            i++;
            setTimeout(typeWriter, 38);
        }
    }

    setTimeout(typeWriter, 700);
}


// ===== 4. MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});


// ===== 5. SMOOTH SCROLLING + CLOSE MOBILE MENU =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        const offset = document.querySelector('.navbar').offsetHeight + 12;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});


// ===== 6. ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.pageYOffset >= sec.offsetTop - 160) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}, { passive: true });


// ===== 7. NAVBAR SHADOW ON SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.pageYOffset > 80
        ? '0 2px 12px var(--shadow)'
        : 'none';
}, { passive: true });


// ===== 8. SCROLL-REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section, .skill-category, .project-card, .timeline-item, .fact-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

document.querySelectorAll('.skills-grid, .projects-grid').forEach(el => {
    el.classList.add('reveal-children');
    revealObserver.observe(el);
});


// ===== 9. PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * 6;
        const rotY = ((cx - x) / cx) * 6;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.4s ease';
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
});


// ===== 10. SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== 11. ACCORDION (Expand / Collapse) =====
document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.setAttribute('aria-expanded', 'false');
            h.nextElementSibling.classList.remove('open');
        });

        // Toggle clicked
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            btn.nextElementSibling.classList.add('open');
        }
    });
});


// ===== 12. PROJECT FILTER & SEARCH =====
const searchInput  = document.getElementById('project-search');
const searchClear  = document.getElementById('search-clear');
const filterTabs   = document.querySelectorAll('.filter-tab');
const noResults    = document.getElementById('no-results');
const resetFilters = document.getElementById('reset-filters');
let   activeFilter = 'all';

function filterProjects() {
    const query = searchInput.value.toLowerCase().trim();
    const cards  = document.querySelectorAll('.project-card');
    let visible  = 0;

    cards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const tags  = card.dataset.tags.toLowerCase();
        const matchesSearch = !query || title.includes(query) || tags.includes(query);
        const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);

        if (matchesSearch && matchesFilter) {
            card.classList.remove('hidden');
            visible++;
        } else {
            card.classList.add('hidden');
        }
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
    searchClear.style.display = query ? 'inline-block' : 'none';
}

searchInput.addEventListener('input', filterProjects);

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    filterProjects();
    searchInput.focus();
});

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        activeFilter = tab.dataset.filter;
        filterProjects();
    });
});

resetFilters?.addEventListener('click', () => {
    searchInput.value = '';
    activeFilter = 'all';
    filterTabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
    filterProjects();
});


// ===== 13. PUBLIC API — TECH FACTS =====
// Uses uselessfacts.jsph.pl (free, no key needed)
// Fallback: curated local facts shown if API is unavailable
const LOCAL_FACTS = [
    { text: 'The first computer bug was an actual bug — a moth found inside a Harvard Mark II computer in 1947.', source: 'Computer History Archive' },
    { text: 'Python was named after Monty Python\'s Flying Circus, not the snake.', source: 'Python Docs' },
    { text: 'The first version of JavaScript was written in just 10 days by Brendan Eich in 1995.', source: 'MDN Web Docs' },
    { text: 'Git was created by Linus Torvalds in 2005 in just a few days to manage Linux kernel development.', source: 'Git SCM' },
    { text: 'There are more possible chess game combinations than atoms in the observable universe.', source: 'Claude Shannon (1950)' },
    { text: 'The first email was sent in 1971 by Ray Tomlinson — and he no longer remembered what it said.', source: 'Computer History Museum' },
    { text: 'The average webpage loads over 100 HTTP requests before it appears on your screen.', source: 'HTTP Archive' },
];

let usedLocalFacts = new Set();

async function fetchFact() {
    const loader  = document.getElementById('fact-loader');
    const content = document.getElementById('fact-content');
    const error   = document.getElementById('fact-error');
    const textEl  = document.getElementById('fact-text');
    const srcEl   = document.getElementById('fact-source');

    // Show loader
    loader.style.display  = 'block';
    content.style.display = 'none';
    error.style.display   = 'none';

    try {
        // Small timeout so loader is visible
        await new Promise(r => setTimeout(r, 500));

        const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', {
            headers: { 'Accept': 'application/json' }
        });

        if (!res.ok) throw new Error('API responded with ' + res.status);

        const data = await res.json();
        textEl.textContent = data.text;
        srcEl.textContent  = '— ' + (data.source_url ? new URL(data.source_url).hostname : 'uselessfacts.jsph.pl');
        loader.style.display  = 'none';
        content.style.display = 'block';

    } catch (err) {
        console.warn('Fact API failed, using local fallback:', err.message);
        // Pick a local fact we haven't shown yet
        if (usedLocalFacts.size >= LOCAL_FACTS.length) usedLocalFacts.clear();
        let idx;
        do { idx = Math.floor(Math.random() * LOCAL_FACTS.length); } while (usedLocalFacts.has(idx));
        usedLocalFacts.add(idx);

        textEl.textContent = LOCAL_FACTS[idx].text;
        srcEl.textContent  = '— ' + LOCAL_FACTS[idx].source + ' (offline mode)';
        loader.style.display  = 'none';
        content.style.display = 'block';
    }
}

document.getElementById('fact-refresh')?.addEventListener('click', fetchFact);
fetchFact(); // load on page start


// ===== 14. CONTACT FORM — Inline Validation + Feedback =====
const contactForm = document.getElementById('contact-form');
const formMessage  = document.getElementById('form-message');

function setFieldError(id, msg) {
    const input = document.getElementById(id);
    const errEl = document.getElementById(id + '-error');
    if (!input || !errEl) return;
    if (msg) {
        input.classList.add('invalid');
        errEl.textContent = msg;
    } else {
        input.classList.remove('invalid');
        errEl.textContent = '';
    }
}

// Live clear errors on input
['name', 'email', 'message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => setFieldError(id, ''));
});

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    if (!name) {
        setFieldError('name', 'Please enter your name.');
        valid = false;
    }

    if (!email) {
        setFieldError('email', 'Please enter your email address.');
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setFieldError('email', 'Please enter a valid email address.');
        valid = false;
    }

    if (!message || message.length < 10) {
        setFieldError('message', 'Message must be at least 10 characters.');
        valid = false;
    }

    if (!valid) return;

    // Simulate send (loading state)
    const submitBtn = document.getElementById('submit-btn');
    const btnText   = submitBtn.querySelector('.btn-text');
    const btnLoad   = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoad.style.display = 'inline';

    setTimeout(() => {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoad.style.display = 'none';

        formMessage.textContent = '✅ Message sent! I\'ll get back to you shortly.';
        formMessage.className = 'form-message success';
        contactForm.reset();

        setTimeout(() => { formMessage.style.display = 'none'; }, 6000);
        console.log('Form submitted:', { name, email, message });
    }, 1200);
});


// ===== 15. CONSOLE EASTER EGG =====
console.log('%c👋 Ibrahim\'s Portfolio', 'color: #388bfd; font-size: 22px; font-weight: bold;');
console.log('%cBuilt from scratch with HTML, CSS & vanilla JS.', 'color: #8b949e; font-size: 13px;');
console.log('%c🔗 https://github.com/ibraa5577', 'color: #388bfd; font-size: 13px;');
