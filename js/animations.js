/**
 * Premium Animation System - AgroConsult
 * Handles scroll-triggered animations, mouse interactions, parallax effects,
 * and advanced micro-interactions.
 */

// ============================================================
// STAGGER INDEX ASSIGNMENT
// ============================================================
// Assigns --reveal-index CSS variable for staggered animations
function setupStaggerIndexes() {
  const gridContainers = document.querySelectorAll(
    ".card-grid, .stats-grid, .process, .testimonials-grid"
  );

  gridContainers.forEach((container) => {
    const children = container.querySelectorAll(".reveal");
    children.forEach((child, index) => {
      child.style.setProperty("--reveal-index", index);
    });
  });
}

// ============================================================
// SCROLL PROGRESS INDICATOR
// ============================================================
function setupScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = windowHeight > 0 ? window.scrollY / windowHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  });
}

// ============================================================
// PARALLAX SCROLL EFFECT
// ============================================================
function setupParallaxEffect() {
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  if (parallaxElements.length === 0) return;

  window.addEventListener("scroll", () => {
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yOffset = window.scrollY * speed;
      element.style.transform = `translateY(${yOffset}px)`;
    });
  });
}

// ============================================================
// MOUSE FOLLOW EFFECT
// ============================================================
function setupMouseFollowEffect() {
  const followElements = document.querySelectorAll("[data-mouse-follow]");

  if (followElements.length === 0) return;

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  followElements.forEach((element) => {
    const strength = parseFloat(element.dataset.mouseFollow) || 20;

    setInterval(() => {
      const rect = element.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;

      const diffX = (mouseX - elementX) / strength;
      const diffY = (mouseY - elementY) / strength;

      element.style.transform = `translate(${diffX}px, ${diffY}px)`;
    }, 30);
  });
}

// ============================================================
// MAGNETIC BUTTON EFFECT
// ============================================================
function setupMagneticButtons() {
  const magneticButtons = document.querySelectorAll("[data-magnetic]");

  magneticButtons.forEach((button) => {
    let mouseX = 0;
    let mouseY = 0;

    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      mouseX = e.clientX - buttonCenterX;
      mouseY = e.clientY - buttonCenterY;

      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance = 80;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = (mouseX / distance) * force * 8;
        const moveY = (mouseY / distance) * force * 8;

        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

// ============================================================
// ELEMENT TILT EFFECT
// ============================================================
function setupTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]");

  tiltElements.forEach((element) => {
    const maxTilt = 8;

    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (y - 0.5) * maxTilt;
      const rotateY = (0.5 - x) * maxTilt;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
}

// ============================================================
// RIPPLE EFFECT ON CLICK
// ============================================================
function setupRippleEffect() {
  const rippleButtons = document.querySelectorAll("[data-ripple]");

  rippleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.6)";
      ripple.style.pointerEvents = "none";

      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);

      const size = Math.max(rect.width, rect.height);
      ripple.animate(
        [
          { width: "0", height: "0", opacity: 1 },
          { width: size + "px", height: size + "px", opacity: 0 },
        ],
        {
          duration: 600,
          easing: "ease-out",
        }
      );

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ============================================================
// CARD REVEAL WITH STAGGER ON SCROLL
// ============================================================
function setupAdvancedScrollReveal() {
  const reveals = document.querySelectorAll("[data-scroll-reveal]");

  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.scrollRevealDelay) || 0;
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, delay);
      }
    });
  }, {
    threshold: 0.1,
  });

  reveals.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(24px)";
    element.style.transition = "opacity 700ms ease, transform 700ms ease";
    observer.observe(element);
  });
}

// ============================================================
// NUMBER COUNTER ANIMATION ENHANCEMENT
// ============================================================
function enhanceCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const originalCount = counter.dataset.count;
    counter.style.transition = "color 200ms ease";
  });
}

// ============================================================
// LINK UNDERLINE ANIMATION
// ============================================================
function setupLinkUnderlines() {
  const links = document.querySelectorAll("a[data-underline]");

  links.forEach((link) => {
    link.style.position = "relative";

    const underline = document.createElement("span");
    underline.style.position = "absolute";
    underline.style.bottom = "-4px";
    underline.style.left = "0";
    underline.style.width = "100%";
    underline.style.height = "2px";
    underline.style.background = getComputedStyle(link).color;
    underline.style.transform = "scaleX(0)";
    underline.style.transformOrigin = "left";
    underline.style.transition = "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    underline.style.pointerEvents = "none";

    link.appendChild(underline);

    link.addEventListener("mouseenter", () => {
      underline.style.transform = "scaleX(1)";
    });

    link.addEventListener("mouseleave", () => {
      underline.style.transform = "scaleX(0)";
    });
  });
}

// ============================================================
// TEXT REVEAL ANIMATION
// ============================================================
function setupTextReveal() {
  const textElements = document.querySelectorAll("[data-text-reveal]");

  textElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";

    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(20px)";
    span.style.transition = "opacity 600ms ease, transform 600ms ease";

    text.split("").forEach((char, index) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.style.display = "inline";
      charSpan.style.animationDelay = (index * 20) + "ms";
      span.appendChild(charSpan);
    });

    element.appendChild(span);

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, 100);
  });
}

// ============================================================
// GLOW ON HOVER
// ============================================================
function setupGlowEffect() {
  const glowElements = document.querySelectorAll("[data-glow]");

  glowElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      element.style.setProperty("--glow-x", x + "px");
      element.style.setProperty("--glow-y", y + "px");
    });

    element.addEventListener("mouseleave", () => {
      element.style.setProperty("--glow-x", "50%");
      element.style.setProperty("--glow-y", "50%");
    });
  });
}

// ============================================================
// SMOOTH PAGE SCROLL
// ============================================================
function setupSmoothPageScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links");
        if (navLinks?.classList.contains("is-open")) {
          navLinks.classList.remove("is-open");
          document.body.classList.remove("menu-open");
          const navToggle = document.querySelector(".nav-toggle");
          navToggle?.setAttribute("aria-expanded", "false");
          navToggle.innerHTML =
            '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
        }
      }
    });
  });
}

// ============================================================
// INITIALIZE ALL ANIMATIONS
// ============================================================
function initializeAllAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    console.log("Reduced motion preference detected - animations disabled");
    return;
  }

  setupStaggerIndexes();
  setupScrollProgress();
  setupParallaxEffect();
  setupMouseFollowEffect();
  setupMagneticButtons();
  setupTiltEffect();
  setupRippleEffect();
  setupAdvancedScrollReveal();
  enhanceCounters();
  setupLinkUnderlines();
  setupTextReveal();
  setupGlowEffect();
  setupSmoothPageScroll();
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAllAnimations);
} else {
  initializeAllAnimations();
}

// Reinitialize on dynamic content changes
const observer = new MutationObserver(() => {
  setupStaggerIndexes();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
