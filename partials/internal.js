/* ============================================
   MÁRIO CHAVEIRO - Páginas internas (servicos/, blog/)
   Carrega junto com o script.js da home
   ============================================ */

(function() {
    'use strict';

    // ===== ANO AUTOMÁTICO NO FOOTER =====
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            const isActive = navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);

            if (isActive && !navList.querySelector('.nav-phone-mobile')) {
                const phoneLink = document.createElement('a');
                phoneLink.href = 'tel:+552124319783';
                phoneLink.className = 'nav-phone-mobile';
                phoneLink.setAttribute('aria-label', 'Ligar para Mário Chaveiro');
                phoneLink.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z"/>
                    </svg>
                    (21) 2431-9783
                `;
                navList.appendChild(phoneLink);
            }
        });

        navList.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ===== ANIMAÇÕES DE ENTRADA =====
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.article h2, .article h3, .service-tile, .post-card, .seo-block, .inline-cta').forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // ===== TRACKING DE CONTATO =====
    document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me/"]').forEach(function(link) {
        link.addEventListener('click', function() {
            const action = this.href.startsWith('tel:') ? 'phone_click' : 'whatsapp_click';
            if (typeof gtag !== 'undefined') {
                gtag('event', action, { event_category: 'contact' });
            }
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', { content_name: action });
            }
        });
    });

    document.documentElement.classList.add('js-loaded');
})();
