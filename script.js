/* =====================================================
   SHREE SHYAM BAKERS — JavaScript Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ──────── Preloader ────────
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initCounterAnimation();
        }, 2200);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2200);
    }

    // ──────── Particles ────────
    const particlesContainer = document.getElementById('particles-container');
    const particleColors = ['#D4A853', '#8B2252', '#E8C97A', '#A94068', '#B8903E'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 6 + 2;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 25000);
    }

    // Create particles periodically
    setInterval(createParticle, 800);
    for (let i = 0; i < 15; i++) {
        setTimeout(createParticle, i * 300);
    }

    // ──────── Navbar Scroll ────────
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Navbar background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (currentScroll > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ──────── Mobile Navigation ────────
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ──────── Active Nav Link ────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ──────── Scroll Animations ────────
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ──────── Counter Animation ────────
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }

    // ──────── Product Filter ────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s var(--ease-smooth) forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Add fadeInUp keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // ──────── Testimonials Slider ────────
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('testimonialDots');
    const testimonialCards = track.querySelectorAll('.testimonial-card');

    let currentSlide = 0;
    let slidesPerView = 3;
    let totalSlides = testimonialCards.length;

    function updateSlidesPerView() {
        if (window.innerWidth <= 768) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 1024) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
    }

    function getMaxSlide() {
        return Math.max(0, totalSlides - slidesPerView);
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const numDots = getMaxSlide() + 1;
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const gap = 32;
        const cardWidth = testimonialCards[0].offsetWidth + gap;
        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = Math.min(index, getMaxSlide());
        updateSlider();
    }

    function nextSlide() {
        currentSlide = currentSlide < getMaxSlide() ? currentSlide + 1 : 0;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : getMaxSlide();
        updateSlider();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide
    let autoSlide = setInterval(nextSlide, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    // Init
    updateSlidesPerView();
    createDots();

    window.addEventListener('resize', () => {
        updateSlidesPerView();
        createDots();
        currentSlide = Math.min(currentSlide, getMaxSlide());
        updateSlider();
    });

    // ──────── Contact Form ────────
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Button loading state
        submitBtn.innerHTML = `
            <span style="display: flex; align-items: center; gap: 10px;">
                <svg width="20" height="20" viewBox="0 0 24 24" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4" stroke-linecap="round"/>
                </svg>
                Sending...
            </span>
        `;
        submitBtn.disabled = true;

        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
        document.head.appendChild(spinStyle);

        // Simulate send
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span style="display: flex; align-items: center; gap: 10px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Message Sent!
                </span>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = `
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                `;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });

    // ──────── Smooth Scroll for anchor links ────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ──────── Parallax Effect ────────
    const parallaxBg = document.querySelector('.parallax-bg');

    window.addEventListener('scroll', () => {
        if (parallaxBg) {
            const scrolled = window.pageYOffset;
            const parent = parallaxBg.closest('.parallax-banner');
            if (parent) {
                const rect = parent.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.3;
                    const yPos = (rect.top * speed);
                    parallaxBg.style.transform = `translateY(${yPos}px)`;
                }
            }
        }
    });

    // ──────── Image lazy loading with fade ────────
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // ──────── Cursor glow effect on hero ────────
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty('--mouse-x', x + 'px');
            hero.style.setProperty('--mouse-y', y + 'px');
        });
    }

    // ──────── Tilt effect on product cards ────────
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
