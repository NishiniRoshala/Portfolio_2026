/* ============================================
   NISHINI ROSHALA - Portfolio JavaScript
   Modern Interactive Portfolio
   ============================================ */

// === Preloader ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.add('page-transition');
    }, 2000);
});

// === Cursor Glow Effect ===
const cursorGlow = document.getElementById('cursor-glow');
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Hover detection for interactive elements
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .skill-badge, .filter-btn, .project-card, .social-icon, .contact-social-icon, .marquee-item')) {
        cursorDot?.classList.add('hovering');
        cursorRing?.classList.add('hovering');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .skill-badge, .filter-btn, .project-card, .social-icon, .contact-social-icon, .marquee-item')) {
        cursorDot?.classList.remove('hovering');
        cursorRing?.classList.remove('hovering');
    }
});

// Click effect
document.addEventListener('mousedown', () => {
    cursorDot?.classList.add('clicking');
    cursorRing?.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursorDot?.classList.remove('clicking');
    cursorRing?.classList.remove('clicking');
});

function animateCursor() {
    // Glow follows slowly
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    if (cursorGlow) {
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
    }

    // Dot follows fast
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    if (cursorDot) {
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
    }

    // Ring follows medium
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// === Navbar Scroll Effect ===
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// === Mobile Menu Toggle ===
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open');
    menuToggle.innerHTML = menuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// === Scroll Reveal Animation ===
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add staggered delay for siblings
            const parent = entry.target.parentElement;
            if (parent) {
                const siblings = Array.from(parent.querySelectorAll('.reveal'));
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = (index * 0.1) + 's';
            }
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// === Project Filter ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = `fadeUp 0.5s ease ${index * 0.1}s forwards`;
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// === Contact Form ===
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;
    
    // Loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    btn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 2000);
});

// === Back to Top ===
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Smooth Scroll for Navigation ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// === Tilt Effect on Project Cards ===
const projectCardsForTilt = document.querySelectorAll('.project-card > div');

projectCardsForTilt.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// === Typing Effect (Optional - for hero section) ===
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = `<span class="gradient-text">${this.txt}</span><span class="typing-cursor">|</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing effect
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    new TypeWriter(typingElement, ['Frontend Developer', 'UI/UX Designer', 'Software Engineering Student', 'Mobile App Developer'], 2200);
}

// === Floating Particles ===
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 12;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.background = `radial-gradient(circle, rgba(255, 0, 128, ${opacity}) 0%, transparent 70%)`;
        particle.style.boxShadow = `0 0 ${size * 3}px rgba(255, 0, 128, ${opacity * 0.5})`;
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        container.appendChild(particle);
    }
}

createParticles();

// === Parallax Effect for Background Orbs ===
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.glow-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// === Counter Animation ===
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.includes('%') ? '%' : (element.dataset.target === '2026' ? '' : '+');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Observe original counter element
const counterElement = document.querySelector('.counter-number');
if (counterElement) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, 7);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(counterElement);
}

// Observe stat counters
const statCounters = document.querySelectorAll('.stat-counter');
statCounters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    if (!target) return;
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statObserver.observe(counter);
});

// === Keyboard Navigation ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

console.log('%c Portfolio by Nishini Roshala ', 'background: linear-gradient(135deg, #ff0080, #db2777); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
