// Modern JavaScript for AROMA Coffee House

class AROMAApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMenuTabs();
    this.setupContactForm();
    this.setupScrollEffects();
    this.setupIntersectionObserver();
  }

  // Navigation functionality
  setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      this.toggleNavIcon(navToggle);
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        this.resetNavIcon(navToggle);
      });
    });

    // Smooth scroll to sections
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
      const navigation = document.getElementById('navigation');
      if (window.scrollY > 100) {
        navigation.style.background = 'rgba(255, 255, 255, 0.98)';
        navigation.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navigation.style.background = 'rgba(255, 255, 255, 0.95)';
        navigation.style.boxShadow = 'none';
      }
    });
  }

  toggleNavIcon(navToggle) {
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translateY(7px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
  }

  resetNavIcon(navToggle) {
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }

  // Menu tabs functionality
  setupMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
          this.animateMenuItems(targetContent);
        }
      });
    });
  }

  animateMenuItems(container) {
    const menuItems = container.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.6s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Contact form functionality
  setupContactForm() {
    const form = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');

    // Enhanced form validation and interaction
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      
      if (input) {
        input.addEventListener('focus', () => {
          group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
          if (!input.value.trim()) {
            group.classList.remove('focused');
          }
        });

        input.addEventListener('input', () => {
          this.validateField(input);
        });
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit(form);
    });
  }

  validateField(field) {
    const formGroup = field.closest('.form-group');
    const isValid = field.checkValidity() && field.value.trim() !== '';
    
    formGroup.classList.toggle('valid', isValid);
    formGroup.classList.toggle('invalid', !isValid && field.value.trim() !== '');
  }

  async handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate all fields
    const isValid = this.validateForm(data);
    
    if (!isValid) {
      this.showNotification('Por favor, preencha todos os campos corretamente.', 'error');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await this.simulateAPICall();
      
      this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      form.reset();
      
      // Reset form groups
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused', 'valid', 'invalid');
      });
      
    } catch (error) {
      this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  validateForm(data) {
    const { name, email, message } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return name.trim() !== '' && 
           emailRegex.test(email) && 
           message.trim() !== '';
  }

  simulateAPICall() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  // Notification system
  showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <i class="fas ${this.getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification__close">&times;</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Add styles dynamically
    this.addNotificationStyles();

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 5 seconds
    const hideTimeout = setTimeout(() => this.hideNotification(notification), 5000);

    // Manual close
    notification.querySelector('.notification__close').addEventListener('click', () => {
      clearTimeout(hideTimeout);
      this.hideNotification(notification);
    });
  }

  getNotificationIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }

  hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }

  addNotificationStyles() {
    if (document.getElementById('notification-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .notification.show {
        transform: translateX(0);
        opacity: 1;
      }
      
      .notification__content {
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 300px;
        border-left: 4px solid #8B4513;
      }
      
      .notification--success .notification__content {
        border-left-color: #22c55e;
      }
      
      .notification--error .notification__content {
        border-left-color: #ef4444;
      }
      
      .notification--success i {
        color: #22c55e;
      }
      
      .notification--error i {
        color: #ef4444;
      }
      
      .notification--info i {
        color: #8B4513;
      }
      
      .notification__close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        margin-left: auto;
      }
      
      .notification__close:hover {
        color: #374151;
      }
      
      @media (max-width: 480px) {
        .notification {
          right: 10px;
          left: 10px;
        }
        
        .notification__content {
          min-width: auto;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }

  // Scroll effects
  setupScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');

    if (hero && heroImage) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroImage.style.transform = `translateY(${parallax}px)`;
      });
    }

    // Add scroll-based animations
    this.addScrollAnimations();
  }

  addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.menu-item, .experience-card, .stat-item');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  // Intersection Observer for navigation highlights
  setupIntersectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.id;
          
          // Remove active class from all nav links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to current section's nav link
          const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
}

// Performance optimization: Load app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AROMAApp();
  });
} else {
  new AROMAApp();
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for module usage (if needed)
window.AROMAApp = AROMAApp;