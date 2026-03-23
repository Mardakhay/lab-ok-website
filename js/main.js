/**
 * LAB-OK — main.js
 * Lightweight enhancements: fade-in, smooth scroll,
 * mobile menu, active nav state, simple contact form UX.
 */

(() => {
  'use strict';

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-stagger');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el) => observer.observe(el));
  }

  function initActiveNav() {
    document.querySelectorAll('.nav-links a, .nav-bottom a, .mobile-drawer a').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!menuBtn) return;

    let drawer = document.getElementById('mobile-drawer');
    if (!drawer) {
      drawer = document.createElement('nav');
      drawer.id = 'mobile-drawer';
      drawer.className = 'mobile-drawer';
      drawer.setAttribute('aria-label', 'Mobile navigation');
      drawer.style.cssText = [
        'position:fixed',
        'top:64px',
        'left:0',
        'width:100%',
        'background:#f8f9fa',
        'z-index:49',
        'border-bottom:1px solid rgba(194,198,212,0.4)',
        'padding:1rem 1.5rem',
        'display:none',
        'flex-direction:column',
        'gap:0',
      ].join(';');

      const pages = [
        { label: 'Home', href: 'index.html', icon: 'home' },
        { label: 'Services', href: 'services.html', icon: 'rebase_edit' },
        { label: 'Contact', href: 'contact.html', icon: 'contact_support' },
      ];

      pages.forEach((p) => {
        const a = document.createElement('a');
        a.href = p.href;
        a.style.cssText = [
          'display:flex',
          'align-items:center',
          'gap:12px',
          'padding:14px 0',
          'border-bottom:1px solid rgba(194,198,212,0.3)',
          'font-family:Space Grotesk,sans-serif',
          'font-size:0.8rem',
          'font-weight:700',
          'text-transform:uppercase',
          'letter-spacing:0.1em',
          'color:#424752',
          'text-decoration:none',
          'transition:color 0.15s',
        ].join(';');
        a.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px;color:#003f87">${p.icon}</span>${p.label}`;
        a.addEventListener('mouseenter', () => (a.style.color = '#003f87'));
        a.addEventListener('mouseleave', () => (a.style.color = '#424752'));
        drawer.appendChild(a);
      });

      document.body.appendChild(drawer);
    }

    let open = false;

    const closeDrawer = () => {
      open = false;
      drawer.style.display = 'none';
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    const openDrawer = () => {
      open = true;
      drawer.style.display = 'flex';
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'close';
      menuBtn.setAttribute('aria-expanded', 'true');
    };

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      open ? closeDrawer() : openDrawer();
    });

    drawer.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) closeDrawer();
    });

    document.addEventListener('click', (e) => {
      if (open && !menuBtn.contains(e.target) && !drawer.contains(e.target)) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) closeDrawer();
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initCardHovers() {
    document.querySelectorAll('.service-card, .bento-item').forEach((card) => {
      card.style.cursor = 'pointer';
    });
  }

  function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;

      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Request Sent';
        btn.style.opacity = '1';
        btn.style.backgroundColor = '#1b5e20';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.backgroundColor = '';
          btn.disabled = false;
          form.reset();
        }, 1800);
      }, 900);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFadeIn();
    initActiveNav();
    initMobileMenu();
    initSmoothScroll();
    initCardHovers();
    initContactForm();
  });
})();
