// Preloader, Certificate Lightbox & Core Dynamic Interactions
(function() {
  'use strict';

  // Ensure Permanent Dark Mode
  document.body.classList.remove('light-mode');
  try {
    localStorage.removeItem('portfolio-theme');
    localStorage.setItem('portfolio-theme', 'dark');
  } catch(e) {}

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
      }, 250);
    } else {
      if (count) count.textContent = (value < 10 ? '0' : '') + value + '%';
      if (bar) bar.style.width = value + '%';
    }
  }, 30);

  // Safety fallback: guaranteed loader dismissal after 1.2s max
  setTimeout(() => {
    if (loader && !loader.classList.contains('loader-done')) {
      if (count) count.textContent = '100%';
      if (bar) bar.style.width = '100%';
      loader.classList.add('loader-done');
    }
  }, 1200);

  // ==========================================
  // CERTIFICATE LIGHTBOX & MODAL CONTROLLER
  // ==========================================
  const certData = {
    zetheta: {
      tag: 'SOFTWARE ENGINEERING EXTERNSHIP • 2026',
      title: 'Certificate of Project Work Experience',
      subtitle: 'Zetheta Algorithms Private Limited — Software Engineer HTTPE',
      company: 'Zetheta Algorithms Private Limited',
      role: 'Software Engineer (Project: Software Engineer HTTPE)',
      period: '15 Full Time Days Equivalent',
      date: '13 Sep 2026',
      signatory: 'Suketu Sanghvi, Managing Director',
      verification: 'Computer generated verification (no signature required)',
      website: 'www.zetheta.com',
      image: 'public/assets/certificates/zetheta-certificate.jpeg',
      description: 'Successfully completed rigorous software engineering project work on the Software Engineer HTTPE (High-Throughput Transaction Processing Engine) initiative. Built backend concurrency architecture, algorithmic execution pipelines, and data transaction performance workflows.',
      tags: ['Software Engineering', 'HTTPE Engine', 'Backend Architecture', 'Concurrency', 'Algorithmic Optimization', 'Performance Tuning']
    },
    codealpha: {
      tag: 'MSME GOVT. ACCREDITED • FRONTEND INTERNSHIP • 2026',
      title: 'Certificate of Completion',
      subtitle: 'CodeAlpha Virtual Internship Program — Frontend Development',
      company: 'CodeAlpha (Your Dream Our Passion)',
      role: 'Frontend Development Intern',
      period: '20th June 2026 to 20th July 2026 (1 Month)',
      date: 'Date of Issue: 21st July 2026',
      signatory: 'Swapnil Sri, CEO & Founder',
      verification: 'Student ID: CA/DF1/205801',
      recognition: 'Ministry of Micro, Small & Medium Enterprises (MSME), Govt. of India',
      image: 'public/assets/certificates/codealpha-certificate.jpeg',
      description: 'Active participant in the CodeAlpha Virtual Internship Program in Frontend Development with dedication and hard work. Architected responsive client-side web applications, component state flows, modern CSS animations, and interactive interfaces.',
      tags: ['Frontend Architecture', 'HTML5 / CSS3', 'JavaScript ES6+', 'Responsive UI', 'Component Systems', 'MSME Certified']
    },
    codec: {
      tag: 'AICTE & ICAC APPROVED • GOOGLE FOR EDUCATION PARTNER • 2026',
      title: 'Certificate of Internship',
      subtitle: 'Codec Technologies Pvt. Ltd. — Artificial Intelligence Intern',
      company: 'Codec Technologies Pvt. Ltd.',
      role: 'Artificial Intelligence Intern',
      period: '15/06/2026 to 15/07/2026 (1 Month)',
      date: 'Conducted 15 June 2026 to 15 July 2026',
      signatory: 'Dr. Anurag Shrivastava, Program Manager',
      verification: 'AICTE ID: CORPORATE6758e549ce59e1733946553',
      recognition: 'National Internship Portal · Google for Education Partner · AICTE & ICAC Approved',
      image: 'public/assets/certificates/codec-technologies-certificate.jpeg',
      description: 'Recognized for efforts and achievements in completing the 1-month AICTE & ICAC approved internship program as Artificial Intelligence Intern. Developed deep neural networks, computer vision models, acoustic and biometric feature extraction pipelines, and machine learning diagnostics.',
      tags: ['Artificial Intelligence', 'Deep Learning', 'Computer Vision', 'Feature Extraction', 'Model Optimization', 'AICTE Approved']
    }
  };

  const modal = document.getElementById('cert-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalImg = document.getElementById('modal-img');
  const modalMeta = document.getElementById('modal-meta');
  const modalDownloadImg = document.getElementById('modal-download-img');

  function openCertificateModal(certId) {
    const data = certData[certId];
    if (!data || !modal) return;

    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = `${data.title} - ${data.company}`;
    }
    if (modalDownloadImg) {
      modalDownloadImg.href = data.image;
      modalDownloadImg.setAttribute('download', `Priyanshi_${certId}_Certificate.jpeg`);
    }

    if (modalMeta) {
      modalMeta.innerHTML = `
        <div class="modal-meta-item">
          <span class="meta-label">Role & Project</span>
          <span class="meta-val">${data.role}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">Duration / Period</span>
          <span class="meta-val">${data.period}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">Authorized Signatory</span>
          <span class="meta-val">${data.signatory}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">Credential Verification</span>
          <span class="meta-val meta-highlight">${data.verification}</span>
        </div>
        <div class="modal-meta-item full-width">
          <span class="meta-label">Program Overview</span>
          <p class="meta-desc">${data.description}</p>
        </div>
        <div class="modal-meta-item full-width">
          <span class="meta-label">Core Competencies</span>
          <div class="modal-tag-cloud">
            ${data.tags.map(t => `<span class="modal-tag-pill">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertificateModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Trigger handlers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-cert-trigger], .open-cert-btn, [data-cert]');
    if (trigger) {
      const certId = trigger.dataset.certTrigger || trigger.dataset.cert;
      if (certId && certData[certId]) {
        e.preventDefault();
        openCertificateModal(certId);
      }
    }
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCertificateModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeCertificateModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeCertificateModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeCertificateModal();
    }
  });

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
    const message = (messageInput && messageInput.value.trim()) ? messageInput.value.trim() : 'Open to exciting opportunities in software engineering, frontend, and AI...';
    
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

  // ANI Video Blur / Unblur Controller
  const aniWrapper = document.getElementById('ani-video-box') || document.querySelector('.ani-video-wrapper');
  const aniVideo = document.getElementById('ani-interview-video') || (aniWrapper ? aniWrapper.querySelector('video') : null);
  const aniOverlay = document.getElementById('ani-blur-overlay');
  const aniUnblurBtn = document.getElementById('ani-unblur-trigger');
  const aniReblurBtn = document.getElementById('ani-reblur-btn');

  function unblurInterview() {
    if (!aniWrapper) return;
    aniWrapper.classList.add('unblurred');
    if (aniReblurBtn) aniReblurBtn.style.display = 'inline-flex';
    if (aniVideo && aniVideo.paused) {
      aniVideo.play().catch(() => {});
    }
  }

  function reblurInterview() {
    if (!aniWrapper) return;
    aniWrapper.classList.remove('unblurred');
    if (aniReblurBtn) aniReblurBtn.style.display = 'none';
    if (aniVideo && !aniVideo.paused) {
      aniVideo.pause();
    }
  }

  if (aniOverlay) aniOverlay.addEventListener('click', unblurInterview);
  if (aniUnblurBtn) aniUnblurBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    unblurInterview();
  });
  if (aniVideo) aniVideo.addEventListener('play', unblurInterview);
  if (aniReblurBtn) aniReblurBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    reblurInterview();
  });

})();
