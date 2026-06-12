/* ============================================
   MÁRIO CHAVEIRO - BARRA SHOPPING
   JavaScript principal
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

            // Adiciona botão de telefone no menu mobile se não existir
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

        // Fecha menu ao clicar em um link
        navList.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== HEADER SCROLL (sombra ao rolar) =====
    const header = document.getElementById('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#' || targetId.length < 2) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMAÇÕES DE ENTRADA (INTERSECTION OBSERVER) =====
    const animatedElements = document.querySelectorAll('.section-header, .service-card, .brand-item, .contact-card, .faq-item');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores antigos
        animatedElements.forEach(function(el) {
            el.classList.add('fade-in', 'visible');
        });
    }

    // ===== FAQ - PERMITE APENAS UM ITEM ABERTO =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        item.addEventListener('toggle', function() {
            if (this.open) {
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });

    // ===== TRACKING DE EVENTOS (Analytics personalizado, se necessário) =====
    // Rastreia cliques em telefone e WhatsApp
    document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me/"]').forEach(function(link) {
        link.addEventListener('click', function() {
            const action = this.href.startsWith('tel:') ? 'phone_click' : 'whatsapp_click';
            const label = this.getAttribute('aria-label') || this.textContent.trim();

            // Google Analytics 4 (se instalado)
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    'event_category': 'contact',
                    'event_label': label
                });
            }

            // Meta Pixel (se instalado)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    content_name: action,
                    content_category: label
                });
            }

            console.log('[Tracking]', action, label);
        });
    });

    // ===== CAROUSEL GENÉRICO (reutilizado para banners e marcas) =====
    function initCarousel(carousel, autoplayMs) {
        if (!carousel) return;
        const slides = carousel.querySelectorAll('[class$="-slide"]');
        const dots = carousel.querySelectorAll('[class$="-dot"]');
        let currentSlide = 0;
        let autoplayInterval = null;
        const interval = autoplayMs || 4000;

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentSlide = index;

            slides.forEach(function(slide, i) {
                slide.classList.toggle('active', i === currentSlide);
            });
            dots.forEach(function(dot, i) {
                const isActive = i === currentSlide;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }

        function nextSlide() { goToSlide(currentSlide + 1); }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, interval);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        startAutoplay();

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        document.addEventListener('visibilitychange', function() {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-slide-to'), 10);
                goToSlide(index);
                startAutoplay();
            });
        });
    }

    // Banner carousel (4s)
    initCarousel(document.querySelector('.banner-carousel'), 4000);

    // Brands carousel (3s — mais rápido, mais itens)
    initCarousel(document.querySelector('.brands-carousel'), 3000);

    // ===== PREVENÇÃO DE FLASH AO CARREGAR =====
    document.documentElement.classList.add('js-loaded');
})();
