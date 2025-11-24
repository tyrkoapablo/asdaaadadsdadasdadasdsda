// ============================================
// MENU MOBILNE
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Zamknij menu po kliknięciu na link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// FORMULARZ KONTAKTOWY - FORMSPREE
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Zbierz dane formularza
        const formData = new FormData(this);
        
        // Wyślij do Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('✓ Wiadomość została wysłana! Skontaktujemy się z Tobą wkrótce.', 'success');
                contactForm.reset();
            } else {
                showNotification('❌ Błąd! Spróbuj jeszcze raz.', 'error');
            }
        })
        .catch(error => {
            console.error('Błąd:', error);
            showNotification('❌ Błąd połączenia. Spróbuj jeszcze raz.', 'error');
        });
    });
}

// ============================================
// POWIADOMIENIA
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                background: #1a1a1a;
                color: #D4AF37;
                padding: 15px 25px;
                border-radius: 4px;
                border: 2px solid #D4AF37;
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
                max-width: 350px;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .notification-success {
                border-color: #4caf50;
                color: #4caf50;
            }
            
            .notification-error {
                border-color: #f44336;
                color: #f44336;
            }
            
            .notification-info {
                border-color: #D4AF37;
                color: #D4AF37;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            .notification.removing {
                animation: slideOutRight 0.3s ease-out;
            }
            
            @media (max-width: 480px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Usuń powiadomienie po 5 sekundach
    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// GŁADKIE SCROLLOWANIE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Old updateActiveLink removed - using new updateActiveNavLink instead with class-based approach



// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// TRUST SECTION - COUNTER ANIMATION
// ============================================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const trustNumber = entry.target.querySelector('.trust-number');
            if (trustNumber) {
                const count = parseInt(trustNumber.getAttribute('data-count'));
                animateCounter(trustNumber, count);
                entry.target.classList.add('counted');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.trust-card').forEach(card => {
    observer.observe(card);
});



// ============================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
// ============================================

if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================

window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqId = question.getAttribute('data-faq');
            const answer = document.getElementById(`faq-${faqId}`);
            
            // Close other open FAQs
            document.querySelectorAll('.faq-answer.active').forEach(item => {
                if (item !== answer) {
                    item.classList.remove('active');
                    item.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            if (answer) {
                answer.classList.toggle('active');
                question.classList.toggle('active');
            }
        });
    });
}

// ============================================
// INICJALIZACJA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Epil Zone - Nowa strona załadowana!');
    
    // Initialize FAQ
    initFAQ();
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});