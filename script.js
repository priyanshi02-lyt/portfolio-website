// Preloader & Dynamic Core Interactions
(function() {
  'use strict';

  // Preloader counter to 100%
  const loader = document.getElementById('loader');
  const count = document.getElementById('count');
  const bar = document.querySelector('.progress i');

  let value = 0;
  const interval = setInterval(() => {
    value += Math.floor(Math.random() * 8) + 4;
    if (value >= 100) {
      value = 100;
      clearInterval(interval);
      if (count) count.textContent = '100%';
      if (bar) bar.style.width = '100%';
      setTimeout(() => {
        if (loader) loader.classList.add('loader-done');
      }, 300);
    } else {
      if (count) count.textContent = (value < 10 ? '0' : '') + value + '%';
      if (bar) bar.style.width = value + '%';
    }
  }, 35);

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(isLight) {
    document.body.classList.toggle('light-mode', isLight);
    if (themeToggle) {
      themeToggle.textContent = isLight ? '☾ Dark' : '☀ Light';
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }
    try { localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark'); } catch(e){}
  }

  try {
    const saved = localStorage.getItem('portfolio-theme');
    applyTheme(saved === 'light');
  } catch(e) {
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(!document.body.classList.contains('light-mode'));
    });
  }

  // Live Dispatch Contact Form Synchronizer
  const firstNameInput = document.getElementById('form-first-name');
  const lastNameInput = document.getElementById('form-last-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const payloadCode = document.getElementById('payload-code');
  const contactForm = document.getElementById('contact-form');
  const dispatchStatus = document.getElementById('dispatch-status');

  function updatePayload() {
    if (!payloadCode) return;
    const first = firstNameInput ? firstNameInput.value.trim() : '';
    const last = lastNameInput ? lastNameInput.value.trim() : '';
    const sender = (first || last) ? `${first} ${last}`.trim() : 'Guest Explorer';
    const email = (emailInput && emailInput.value.trim()) ? emailInput.value.trim() : 'awaiting_input@transmission.io';
    const message = (messageInput && messageInput.value.trim()) ? messageInput.value.trim() : 'Open to exciting opportunities in frontend, AI, and systems engineering...';
    
    const payload = {
      sender: sender,
      email: email,
      message: message,
      timestamp: new Date().toISOString(),
      status: 'READY_TO_DISPATCH'
    };

    payloadCode.textContent = JSON.stringify(payload, null, 2);
  }

  [firstNameInput, lastNameInput, emailInput, messageInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', updatePayload);
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (dispatchStatus) {
        dispatchStatus.textContent = '✓ Transmission Dispatched Successfully!';
        setTimeout(() => { dispatchStatus.textContent = ''; }, 4000);
      }
      contactForm.reset();
      updatePayload();
    });
  }
})();
