// ===== Tech Background Animation =====
const canvas = document.getElementById('tech-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gridSize = 60;
    const dotRadius = 1;

    // Draw grid dots
    for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
            ctx.fill();
        }
    }

    // Draw horizontal lines
    for (let y = gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }

    // Draw vertical lines
    for (let x = gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }

    // Draw accent geometric shapes
    drawHexagon(canvas.width * 0.85, canvas.height * 0.2, 80, 'rgba(59, 130, 246, 0.08)');
    drawHexagon(canvas.width * 0.1, canvas.height * 0.7, 60, 'rgba(59, 130, 246, 0.06)');
    drawHexagon(canvas.width * 0.5, canvas.height * 0.85, 50, 'rgba(59, 130, 246, 0.05)');
    drawDiamond(canvas.width * 0.75, canvas.height * 0.6, 40, 'rgba(59, 130, 246, 0.07)');
    drawDiamond(canvas.width * 0.2, canvas.height * 0.3, 30, 'rgba(59, 130, 246, 0.06)');
}

function drawHexagon(cx, cy, size, color) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function drawDiamond(cx, cy, size, color) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size, cy);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ===== Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ===== Scroll Animations =====
const animatedElements = document.querySelectorAll('.exp-card, .skill-card, .project-card, .contact-card, .ai-card, .section-title, .section-subtitle, .about-content, .about-highlights .highlight-item, .about-details, .hero-greeting, .hero-name, .hero-title, .hero-subtitle, .hero-description, .hero-cta');

animatedElements.forEach(el => {
    el.classList.add('scroll-animate');

    // Assign animation directions based on element type
    if (el.classList.contains('skill-card') || el.classList.contains('contact-card') || el.classList.contains('ai-card')) {
        el.setAttribute('data-animation', 'scale');
    } else if (el.classList.contains('exp-card')) {
        el.setAttribute('data-animation', 'slide-up');
    } else if (el.classList.contains('project-card')) {
        el.setAttribute('data-animation', 'slide-right');
    } else if (el.classList.contains('section-title')) {
        el.setAttribute('data-animation', 'slide-down');
    } else {
        el.setAttribute('data-animation', 'fade');
    }
});

// Stagger siblings
document.querySelectorAll('.exp-grid, .skills-grid, .contact-grid, .ai-grid').forEach(grid => {
    const children = grid.querySelectorAll('.scroll-animate');
    children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 100}ms`;
    });
});

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

animatedElements.forEach(el => scrollObserver.observe(el));

// Animate hero elements on load
window.addEventListener('load', () => {
    const heroEls = document.querySelectorAll('.hero .scroll-animate');
    heroEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('animated'), 200 + i * 150);
    });
});

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(element) {
    const img = element.querySelector('img');
    const caption = element.querySelector('.gallery-overlay span');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event.target === lightbox || event.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
