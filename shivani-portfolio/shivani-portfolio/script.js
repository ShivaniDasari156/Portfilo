/* ==========================================
   SHIVANI DASARI - PORTFOLIO JAVASCRIPT
   Handles: Typing, Scroll, Nav, Cursor,
            Skill Bars, Animations & More
   ========================================== */

'use strict';

/* ==========================================
   1. CUSTOM CURSOR
   ========================================== */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');

  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  // Update dot position instantly
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth trailing outline
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .skill-card, .project-card, .contact-card, .edu-card'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
})();

/* ==========================================
   2. NAVBAR: Scroll Effect + Active Links
   ========================================== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Add 'scrolled' class when page scrolls
  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load
})();

/* ==========================================
   3. HAMBURGER MENU (Mobile)
   ========================================== */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    // Prevent background scroll when menu open
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

/* ==========================================
   4. TYPING ANIMATION (Hero Section)
   ========================================== */
(function initTypingAnimation() {
  const typedTextEl = document.getElementById('typedText');
  if (!typedTextEl) return;

  // Job titles to cycle through
  const phrases = [
    'Full-Stack Developer',
    'Python Developer',
    'Django Developer',
    'React Developer',
    'Frontend Developer',
    'Web Developer',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Remove a character
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Add a character
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // When phrase is fully typed, pause then start deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800; // Pause at end
      isDeleting = true;
    }

    // When phrase is fully deleted, move to next
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 300; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start after a short delay
  setTimeout(type, 800);
})();

/* ==========================================
   5. SCROLL REVEAL ANIMATIONS
   ========================================== */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after reveal (animate only once)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12, // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
})();

/* ==========================================
   6. ANIMATED SKILL PROGRESS BARS
   ========================================== */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.dataset.width + '%';
          // Small delay for stagger effect
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
})();

/* ==========================================
   7. BACK TO TOP BUTTON
   ========================================== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ==========================================
   8. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ========================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ==========================================
   9. CONTACT FORM — mailto handler
   ========================================== */
function sendEmail() {
  // Read form values
  const name    = document.getElementById('contactName')?.value.trim();
  const email   = document.getElementById('contactEmail')?.value.trim();
  const subject = document.getElementById('contactSubject')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showToast('Please fill in all fields!', 'error');
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address!', 'error');
    return;
  }

  // Build mailto link
  const mailtoLink = `mailto:shivanidasari494@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Shivani,\n\nMy name is ${name} (${email}).\n\n${message}`)}`;
  window.open(mailtoLink);

  // Clear form
  ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  showToast('Opening your email client... 📧', 'success');
}

/* ==========================================
   10. TOAST NOTIFICATIONS
   ========================================== */
function showToast(message, type = 'success') {
  // Remove existing toasts
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  // Inline styles for toast (no extra CSS needed)
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '80px',
    right: '32px',
    background: type === 'success' ? '#4ade80' : '#f87171',
    color: '#0a0a0f',
    padding: '12px 20px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '0.9rem',
    fontFamily: "'DM Sans', sans-serif",
    zIndex: '9999',
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    transform: 'translateY(20px)',
    opacity: '0',
    transition: 'all 0.3s ease',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  // Animate out after 3s
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ==========================================
   11. PARTICLE / SPARKLE EFFECT ON HERO
   ========================================== */
(function initSparkles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Only on desktop
  if (window.innerWidth < 768) return;

  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: rgba(124, 92, 252, 0.6);
      pointer-events: none;
      z-index: 0;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: sparkleAnim ${2 + Math.random() * 2}s ease-in-out forwards;
    `;
    hero.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 4000);
  }

  // Add sparkle keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleAnim {
      0%   { opacity: 0; transform: scale(0) translateY(0); }
      30%  { opacity: 1; transform: scale(1) translateY(-10px); }
      100% { opacity: 0; transform: scale(0.5) translateY(-30px); }
    }
  `;
  document.head.appendChild(style);

  // Create sparkles periodically
  setInterval(createSparkle, 400);
})();

/* ==========================================
   12. ACTIVE NAV LINK ON CLICK
   ========================================== */
(function initNavLinkClick() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();

/* ==========================================
   13. PROJECT CARD TILT EFFECT
   ========================================== */
(function initCardTilt() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ==========================================
   14. COUNTERS ANIMATION (Stats)
   ========================================== */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.textContent);
          const suffix = el.textContent.replace(/[0-9]/g, '');
          let count = 0;
          const step = target / 30;

          const counter = setInterval(() => {
            count += step;
            if (count >= target) {
              el.textContent = target + suffix;
              clearInterval(counter);
            } else {
              el.textContent = Math.floor(count) + suffix;
            }
          }, 40);

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(el => observer.observe(el));
})();

/* ==========================================
   15. CONSOLE EASTER EGG
   ========================================== */
(function consoleEasterEgg() {
  const style1 = 'color: #7c5cfc; font-size: 18px; font-weight: bold;';
  const style2 = 'color: #00d4ff; font-size: 13px;';
  const style3 = 'color: #9090b0; font-size: 11px;';

  console.log('%c👩‍💻 Shivani Dasari Portfolio', style1);
  console.log('%cFull-Stack Developer | Python · Django · React · JavaScript', style2);
  console.log('%cLooking to hire? → shivanidasari494@gmail.com', style3);
  console.log('%c🚀 Built with HTML, CSS & vanilla JS — no frameworks!', style3);
})();

/* ==========================================
   INITIALIZATION LOG
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Portfolio scripts loaded and running!');
});
