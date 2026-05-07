document.addEventListener('DOMContentLoaded', () => {

// ===============================
// CONSOLE SIGNATURE
// ===============================
console.log('%c Built by Antonio G. Artero ', 'background: #111; color: #fff; padding: 6px 12px; font-size: 12px; letter-spacing: 2px;');
console.log('%c https://www.linkedin.com/in/antoniogartero ', 'color: #999; font-size: 11px; letter-spacing: 1px;');

// ===============================
// LOGO + NAV SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"], #logo-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.id === 'logo-link') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.nav-overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    overlay.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        overlay.classList.remove('open');
    });
});

overlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('open');
});

// ===============================
// SCROLL BREATHING SYSTEM
// ===============================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => observer.observe(section));

// ===============================
// SLIDER REVEAL
// ===============================
document.querySelectorAll('.slider-reveal').forEach(slider => {
    let dragging = false;

    function getLimits() {
        if (slider.closest('#card-1')) return { min: 17, max: 72 };
        if (slider.closest('#card-2')) return { min: 32, max: 55 };
        return { min: 15, max: 85 };
    }

    function setPosition(x) {
        const rect = slider.getBoundingClientRect();
        const { min, max } = getLimits();
        let pct = ((x - rect.left) / rect.width) * 100;
        pct = Math.min(Math.max(pct, min), max);
        slider.querySelector('.slider-before').style.clipPath =
            `inset(0 ${100 - pct}% 0 0)`;
        slider.querySelector('.slider-handle').style.left = `${pct}%`;
    }

    slider.addEventListener('mousedown', e => { dragging = true; setPosition(e.clientX); });
    window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('mouseup', () => dragging = false);

    slider.addEventListener('touchstart', e => { dragging = true; setPosition(e.touches[0].clientX); });
    window.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); });
    window.addEventListener('touchend', () => dragging = false);
});

}); // closes DOMContentLoaded

// ===============================
// SCROLL DEPTH TRACKING
// ===============================
let tracked = {};
window.addEventListener('scroll', () => {
    const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    [25, 50, 75, 90].forEach(milestone => {
        if (pct >= milestone && !tracked[milestone]) {
            tracked[milestone] = true;
            gtag('event', 'scroll_depth', { depth: milestone });
        }
    });
});


if (window.innerWidth > 768) {
    document.querySelectorAll('.service-block').forEach(el => {
        el.setAttribute('open', true);
    });
}
