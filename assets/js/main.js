document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close menu when clicking outside or on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
      });
    });
  }

  // Active Navigation Link on Scroll (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);

  // Dynamic Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Contact Form Feedback Handler (Safely scoped)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.textContent = 'Thank you! Your message has been received. I will get back to you soon.';
          formFeedback.style.color = '#34d399';
          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 5000);
        }
      }, 1000);
    });
  }

  // Typewriter Animation for Hero Roles
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const roles = [
      'Senior Full-Stack Engineer',
      'Agentic AI Engineer',
      'DevOps & Docker Specialist',
      'Laravel Backend Architect',
      'Atlassian Agent Builder'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDelay = 1800;

    const typeRole = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, pauseDelay);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 350);
      } else {
        setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    typeRole();
  }

  // Interactive Multi-Tab Terminal Preview in Hero
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalPanes = document.querySelectorAll('.terminal-pane');
  const terminalCopyBtn = document.getElementById('terminalCopyBtn');

  if (terminalTabs.length && terminalPanes.length) {
    terminalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabTarget = tab.getAttribute('data-tab');
        
        terminalTabs.forEach(t => t.classList.remove('active'));
        terminalPanes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePane = document.getElementById(`pane-${tabTarget}`);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }

  if (terminalCopyBtn) {
    terminalCopyBtn.addEventListener('click', () => {
      const activePane = document.querySelector('.terminal-pane.active');
      if (activePane) {
        navigator.clipboard.writeText(activePane.innerText).then(() => {
          const originalHTML = terminalCopyBtn.innerHTML;
          terminalCopyBtn.innerHTML = '<span>Copied! ✓</span>';
          terminalCopyBtn.style.color = '#34d399';
          terminalCopyBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';

          setTimeout(() => {
            terminalCopyBtn.innerHTML = originalHTML;
            terminalCopyBtn.style.color = '';
            terminalCopyBtn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  }

  // Mouse Spotlight Effect on Interactive Cards
  const spotlightCards = document.querySelectorAll('.card, .bento-card, .project-card, .testimonial-card, .timeline-item');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Interactive Skills Category Filter Tabs
  const skillsFilterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category-card, .ai-systems-box');

  if (skillsFilterBtns.length) {
    skillsFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        skillsFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        skillCategories.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (filter === 'all') {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else if (cardCat && cardCat.includes(filter)) {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
