/* ============================================================
   BAHLUL LODI: THE UNTOLD HISTORY
   Main JavaScript - Utilities & Interactions
   ============================================================ */

// ============================================================
// Scroll-based Reveal Animations
// ============================================================
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item');

    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve - allow re-triggering is optional
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// ============================================================
// Counter Animation
// ============================================================
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseInt(entry.target.dataset.count, 10);
                const prefix = entry.target.dataset.prefix || '';
                const suffix = entry.target.dataset.suffix || '';
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    entry.target.textContent = prefix + current.toLocaleString('en-IN') + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        entry.target.textContent = prefix + target.toLocaleString('en-IN') + suffix;
                    }
                }

                requestAnimationFrame(update);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
}

// ============================================================
// Navigation Scroll Effect
// ============================================================
function initNavScroll() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }, { passive: true });
}

// ============================================================
// Mobile Navigation
// ============================================================
function initMobileNav() {
    const btn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-overlay');

    if (!btn || !links) return;

    function closeMenu() {
        btn.classList.remove('active');
        links.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        btn.classList.add('active');
        links.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    btn.addEventListener('click', () => {
        if (links.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close on link click
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

// ============================================================
// Reading Progress Bar
// ============================================================
function initProgressBar() {
    const bar = document.querySelector('.journey-progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + '%';
    }, { passive: true });
}

// ============================================================
// Smooth Scroll for Anchor Links
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================
// Tabs
// ============================================================
function initTabs() {
    document.querySelectorAll('.tabs').forEach(tabContainer => {
        const buttons = tabContainer.querySelectorAll('.tab-btn');
        const contents = tabContainer.querySelectorAll('.tab-content');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;

                buttons.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetContent = tabContainer.querySelector(`[data-tab-content="${target}"]`);
                if (targetContent) targetContent.classList.add('active');
            });
        });
    });
}

// ============================================================
// Image Lightbox / Modal
// ============================================================
function initLightbox() {
    const overlay = document.querySelector('.modal-overlay');
    if (!overlay) return;

    const closeBtn = overlay.querySelector('.modal-close');
    const modalImg = overlay.querySelector('.modal-content img');

    document.querySelectorAll('[data-lightbox]').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.dataset.lightbox || item.querySelector('img')?.src;
            const imgAlt = item.dataset.alt || item.querySelector('img')?.alt || '';
            if (imgSrc && modalImg) {
                modalImg.src = imgSrc;
                modalImg.alt = imgAlt;
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ============================================================
// Lazy Image Loading with Alt Text Fallback
// ============================================================
function initLazyImages() {
    const images = document.querySelectorAll('img[data-src]');

    if (!images.length) return;

    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');

                img.onerror = function () {
                    // If image fails, create alt text fallback
                    const altText = this.alt || 'Image unavailable';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'card-image-placeholder';
                    placeholder.innerHTML = `
            <div style="text-align:center;">
              <div class="placeholder-icon">🏛️</div>
              <div class="placeholder-text">${altText}</div>
            </div>
          `;
                    this.parentNode.replaceChild(placeholder, this);
                };

                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    images.forEach(img => imgObserver.observe(img));
}

// ============================================================
// Parallax Effect (subtle)
// ============================================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.3;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}

// ============================================================
// Active nav link highlighting
// ============================================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// Initialize Everything
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    animateCounters();
    initNavScroll();
    initMobileNav();
    initProgressBar();
    initSmoothScroll();
    initTabs();
    initLightbox();
    initLazyImages();
    initParallax();
    setActiveNavLink();
});
