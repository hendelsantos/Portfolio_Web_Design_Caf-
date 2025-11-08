/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

/*=============== NAVIGATION MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

// Show menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Hide menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Remove menu on mobile
const navLinks = document.querySelectorAll(".nav__link");

const linkAction = () => {
  navMenu.classList.remove("show-menu");
};

navLinks.forEach((n) => n.addEventListener("click", linkAction));

/*=============== HEADER SCROLL EFFECT ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  // When scroll > 50vh, add scroll-header class
  if (this.scrollY >= 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", scrollHeader);

/*=============== SMOOTH SCROLLING ===============*/
const scrollToSection = (elementClick, elementScroll) => {
  const scrollTop = elementScroll.offsetTop;

  window.scrollTo({
    top: scrollTop,
    behavior: "smooth",
  });
};

// Add smooth scroll to all navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

/*=============== MENU TABS FUNCTIONALITY ===============*/
const menuTabs = document.querySelectorAll(".menu__tab");
const menuCategories = document.querySelectorAll(".menu__category");

menuTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and categories
    menuTabs.forEach((t) => t.classList.remove("active"));
    menuCategories.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab
    tab.classList.add("active");

    // Show corresponding category
    const target = tab.getAttribute("data-target");
    const targetCategory = document.getElementById(target);

    if (targetCategory) {
      targetCategory.classList.add("active");
    }
  });
});

/*=============== BACK TO TOP BUTTON ===============*/
const backToTop = document.getElementById("back-to-top");

const scrollUp = () => {
  if (this.scrollY >= 560) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
};

window.addEventListener("scroll", scrollUp);

// Back to top click event
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById("contact-form");
const formInputs = document.querySelectorAll(".form__input");

// Form submission
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Simulate form submission
    submitForm(formObject);
  });
}

// Form submission handler
const submitForm = async (formData) => {
  const submitButton = contactForm.querySelector(".form__submit");
  const originalText = submitButton.innerHTML;

  try {
    // Show loading state
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success notification
    showNotification("Mensagem enviada com sucesso!", "success");
    contactForm.reset();

    // Reset labels
    formInputs.forEach((input) => {
      const label = input.nextElementSibling;
      if (label && label.classList.contains("form__label")) {
        label.style.transform = "";
        label.style.color = "";
      }
    });
  } catch (error) {
    // Error notification
    showNotification("Erro ao enviar mensagem. Tente novamente.", "error");
  } finally {
    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }
};

/*=============== NOTIFICATION SYSTEM ===============*/
const showNotification = (message, type = "info") => {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(
              type
            )} notification__icon"></i>
            <span class="notification__message">${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add styles
  const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 1rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        }
        
        .notification--success {
            border-left: 4px solid #4CAF50;
        }
        
        .notification--error {
            border-left: 4px solid #F44336;
        }
        
        .notification--info {
            border-left: 4px solid #2196F3;
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification__icon {
            color: #4CAF50;
            font-size: 1.125rem;
        }
        
        .notification--error .notification__icon {
            color: #F44336;
        }
        
        .notification--info .notification__icon {
            color: #2196F3;
        }
        
        .notification__message {
            flex: 1;
            font-weight: 500;
        }
        
        .notification__close {
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            padding: 0.25rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        
        .notification__close:hover {
            background-color: #f0f0f0;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;

  // Add styles to head if not already present
  if (!document.querySelector("#notification-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "notification-styles";
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
  }

  // Add to document
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Auto remove after 5 seconds
  const autoRemove = setTimeout(() => {
    removeNotification(notification);
  }, 5000);

  // Manual close
  const closeButton = notification.querySelector(".notification__close");
  closeButton.addEventListener("click", () => {
    clearTimeout(autoRemove);
    removeNotification(notification);
  });
};

const removeNotification = (notification) => {
  notification.classList.remove("show");
  setTimeout(() => {
    notification.remove();
  }, 300);
};

const getNotificationIcon = (type) => {
  switch (type) {
    case "success":
      return "check-circle";
    case "error":
      return "exclamation-triangle";
    case "info":
    default:
      return "info-circle";
  }
};

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".about__feature, .menu__item, .special__card, .contact__card"
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});

/*=============== LAZY LOADING IMAGES ===============*/
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute("data-src") || img.getAttribute("src");

      if (src) {
        img.setAttribute("src", src);
        img.classList.add("loaded");
      }

      observer.unobserve(img);
    }
  });
});

// Observe all images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    imageObserver.observe(img);
  });
});

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Throttle scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Apply throttling to scroll events
const throttledScrollHeader = throttle(scrollHeader, 16);
const throttledScrollUp = throttle(scrollUp, 16);

window.removeEventListener("scroll", scrollHeader);
window.removeEventListener("scroll", scrollUp);
window.addEventListener("scroll", throttledScrollHeader);
window.addEventListener("scroll", throttledScrollUp);

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
// Keyboard navigation for tabs
menuTabs.forEach((tab, index) => {
  tab.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tab.click();
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextTab = menuTabs[index + 1] || menuTabs[0];
      nextTab.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevTab = menuTabs[index - 1] || menuTabs[menuTabs.length - 1];
      prevTab.focus();
    }
  });
});

// Focus management for mobile menu
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }

    if (e.key === "Escape") {
      navMenu.classList.remove("show-menu");
      navToggle.focus();
    }
  });
};

// Apply focus trap to mobile menu
if (navMenu) {
  trapFocus(navMenu);
}

/*=============== PRELOADER ===============*/
const createPreloader = () => {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `
        <div class="preloader__content">
            <div class="preloader__logo">
                <i class="fas fa-coffee"></i>
                <span>Café Aroma</span>
            </div>
            <div class="preloader__spinner"></div>
        </div>
    `;

  const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: var(--color-milk);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease-out;
        }
        
        .preloader__content {
            text-align: center;
        }
        
        .preloader__logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: var(--font-bold);
            color: var(--color-primary);
            margin-bottom: 1rem;
        }
        
        .preloader__logo i {
            font-size: 2rem;
            animation: bounce 1s infinite;
        }
        
        .preloader__spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--color-cream);
            border-top: 3px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .preloader.hide {
            opacity: 0;
            visibility: hidden;
        }
    `;

  // Add styles
  const styleSheet = document.createElement("style");
  styleSheet.textContent = preloaderStyles;
  document.head.appendChild(styleSheet);

  // Add to document
  document.body.appendChild(preloader);

  return preloader;
};

// Show preloader on page load
document.addEventListener("DOMContentLoaded", () => {
  const preloader = createPreloader();

  // Hide preloader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  });
});

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
document.addEventListener("DOMContentLoaded", () => {
  // Check if ScrollReveal is available (from CDN)
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 2000,
      delay: 100,
      interval: 100,
      reset: false,
    });

    // Apply animations
    sr.reveal(".hero__content", { origin: "left" });
    sr.reveal(".hero__image", { origin: "right" });
    sr.reveal(".section__header");
    sr.reveal(".about__content", { origin: "left" });
    sr.reveal(".about__image", { origin: "right" });
    sr.reveal(".menu__tabs");
    sr.reveal(".menu__item", { interval: 200 });
    sr.reveal(".special__card", { interval: 200 });
    sr.reveal(".contact__info", { origin: "left" });
    sr.reveal(".contact__form", { origin: "right" });
  }
});

/*=============== UTILITY FUNCTIONS ===============*/
// Format phone number
const formatPhoneNumber = (input) => {
  const value = input.value.replace(/\D/g, "");
  const formattedValue = value.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  input.value = formattedValue;
};

// Apply phone formatting to phone input
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", () => formatPhoneNumber(phoneInput));
}

// Validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Form validation
const validateForm = (form) => {
  const inputs = form.querySelectorAll("[required]");
  let isValid = true;

  inputs.forEach((input) => {
    const value = input.value.trim();

    if (!value) {
      showFieldError(input, "Este campo é obrigatório");
      isValid = false;
    } else if (input.type === "email" && !isValidEmail(value)) {
      showFieldError(input, "E-mail inválido");
      isValid = false;
    } else {
      clearFieldError(input);
    }
  });

  return isValid;
};

const showFieldError = (input, message) => {
  clearFieldError(input);

  const errorElement = document.createElement("span");
  errorElement.className = "field-error";
  errorElement.textContent = message;
  errorElement.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-xs);
        margin-top: 0.25rem;
        display: block;
    `;

  input.parentNode.appendChild(errorElement);
  input.style.borderColor = "var(--color-error)";
};

const clearFieldError = (input) => {
  const errorElement = input.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
  input.style.borderColor = "";
};

// Update form submission to include validation
if (contactForm) {
  contactForm.removeEventListener("submit", contactForm._submitHandler);
  contactForm._submitHandler = function (e) {
    e.preventDefault();

    if (validateForm(this)) {
      const formData = new FormData(this);
      const formObject = {};

      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      submitForm(formObject);
    }
  };
  contactForm.addEventListener("submit", contactForm._submitHandler);
}

/*=============== ERROR HANDLING ===============*/
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);
  // You can add error reporting here
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason);
  // You can add error reporting here
});

/*=============== CONSOLE WELCOME MESSAGE ===============*/
console.log(
  `
%c🍵 Bem-vindo ao Café Aroma! %c
%cEsta é uma landing page criada com tecnologias modernas.
%cDesenvolvido com: HTML5, CSS3, JavaScript ES6+
%cRecursos: Responsivo, Acessível, Otimizado para Performance
`,
  "color: #4A2C2A; font-size: 16px; font-weight: bold;",
  "",
  "color: #8B5A3C; font-size: 12px;",
  "color: #C8A882; font-size: 12px;",
  "color: #A8B5A0; font-size: 12px;"
);
