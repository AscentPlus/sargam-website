/* ============================================
   MAIN.JS — Shared functionality across pages
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initScrollReveal();
    initSmoothScroll();
    setActiveNav();
    initDonateQR();
});

/* ---- Sticky Header ---- */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });
}

/* ---- Mobile Navigation ---- */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.mobile-overlay');
    if (!hamburger || !nav) return;

    function toggleNav() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }

    function closeNav() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleNav);
    if (overlay) overlay.addEventListener('click', closeNav);

    // Close on nav link click
    nav.querySelectorAll('a:not(.btn)').forEach(link => {
        link.addEventListener('click', closeNav);
    });
}

/* ---- Scroll Reveal Animation ---- */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ---- Smooth Scroll for anchor links ---- */
function initSmoothScroll() {
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || !href.includes('#')) return;

        const parts = href.split('#');
        const path = parts[0];
        const targetId = '#' + parts[1];

        if (targetId === '#') return;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isSamePage = path === '' || path === currentPath || (path === 'index.html' && (currentPath === '' || currentPath === 'index.html'));

        if (isSamePage) {
            link.addEventListener('click', (e) => {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Clear hash from URL after scrolling starts
                    setTimeout(() => {
                        const cleanPath = window.location.pathname.replace(/index\.html$/, '') || '/';
                        history.replaceState(null, null, cleanPath);
                    }, 500);

                    // Close mobile nav if it's open
                    const nav = document.querySelector('.nav');
                    const hamburger = document.querySelector('.hamburger');
                    const overlay = document.querySelector('.mobile-overlay');
                    if (nav && nav.classList.contains('open')) {
                        nav.classList.remove('open');
                        if (hamburger) hamburger.classList.remove('active');
                        if (overlay) overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        }
    });

    // Handle hash on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Clean URL after scrolling
                setTimeout(() => {
                    const cleanPath = window.location.pathname.replace(/index\.html$/, '') || '/';
                    history.replaceState(null, null, cleanPath);
                }, 1000);
            }
        }, 100);
    } else if (window.location.pathname.endsWith('index.html')) {
        // Clean index.html on load even without hash
        history.replaceState(null, null, window.location.pathname.replace(/index\.html$/, '') || '/');
    }
}

/* ---- Set Active Nav Link ---- */
function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPath = href.split('#')[0] || 'index.html';
        if (linkPath === path || (path === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}



/* ---- Format Date ---- */
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ---- Create Event Card HTML ---- */
function createEventCard(event) {
    let badgeClass = 'badge-green';
    let badgeText = 'Completed';

    if (event.type === 'upcoming') {
        badgeClass = 'badge-warm';
        badgeText = 'Upcoming';
    } else if (event.type === 'ongoing') {
        badgeClass = 'badge-blue';
        badgeText = 'Ongoing';
    }

    return `
    <article class="card reveal">
      <img src="${event.image}" alt="${event.title}" class="card-img" loading="lazy">
      <div class="card-body">
        <span class="badge ${badgeClass}">${badgeText}</span>
        <h3>${event.title}</h3>
        <p class="event-date"><strong>${formatDate(event.date)}</strong></p>
        <p>${event.description}</p>
      </div>
    </article>
  `;
}

/* ---- Donate QR Modal ---- */
function openDonateQR() {
    const modal = document.getElementById('donateQrModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function initDonateQR() {
    const modal = document.getElementById('donateQrModal');
    const closeBtn = document.getElementById('donateQrCloseBottom');

    if (modal && closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}
