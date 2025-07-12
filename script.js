// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
               
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
 
    const revealElements = document.querySelectorAll('.section-card, .project-card, .contact-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
    
   
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const speed = scrolled * 0.5;
            heroSection.style.transform = `translateY(${speed * 0.2}px)`;
        }
    });
    
    
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    

    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    

    const skillIcons = document.querySelectorAll('.skill-icon');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillIcons.forEach(icon => {
        skillObserver.observe(icon);
    });
    
  
    const contactCards = document.querySelectorAll('.contact-card');
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    contactCards.forEach(card => {
        contactObserver.observe(card);
    });
    

    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease';
        });
        
        link.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
  
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.style.opacity = '1', 200);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.opacity = '1', 400);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.style.opacity = '1', 600);
    }
    

    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            showNotification('¡Mensaje enviado correctamente!', 'success');
        });
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 1060;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        notification.innerHTML = `
            <strong>${message}</strong>
            <button type="button" class="btn-close ms-2" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance optimization: throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
   
    const throttledScrollHandler = throttle(() => {
        // Any heavy scroll operations go here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
});


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
   
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}


function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

document.addEventListener('DOMContentLoaded', loadDarkModePreference);


const additionalCSS = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px;
    }
    
    .dark-mode {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%) !important;
        color: #ffffff !important;
    }
    
    .dark-mode .custom-navbar {
        background: rgba(0, 0, 0, 0.9) !important;
    }
    
    .dark-mode .section-card,
    .dark-mode .project-card,
    .dark-mode .contact-card {
        background: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(10px);
        border-color: rgba(255, 255, 255, 0.2) !important;
    }
`;


const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);