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
  // COMPLETE CERTIFICATES REGISTRY (15 CREDENTIALS)
  // ==========================================
  const certData = {
    // 3 Industry Internships & Externships
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
    },

    // 12 Additional Learning, Hackathon & Industry Certifications
    webrush: {
      tag: 'HACKATHON EXCELLENCE • RANK #15 • 2026',
      title: 'Certificate of Excellence — WebRush 2026',
      subtitle: 'Frontend Arena & Unstop — 6-Hour Frontend Hackathon',
      company: 'Frontend Arena & Unstop',
      role: 'Frontend Competitor (Rank #15)',
      period: 'Issued: September 20, 2026',
      date: '20 Sep 2026',
      signatory: 'Frontend Arena Challenge Evaluation Committee',
      verification: 'ID: FA-8VHV5HYV',
      image: 'public/assets/certificates/webrush-rank15-excellence.jpeg',
      description: 'Awarded for securing Rank #15 in WEB RUSH 2026, a competitive 6-hour frontend development hackathon organized by Frontend Arena. Recognized for outstanding creativity, technical UI skills, and successful completion of the challenge.',
      tags: ['Frontend Development', 'WebRush Hackathon', 'Rank #15', 'HTML5 / CSS3', 'Modern JS', 'Rapid Prototyping']
    },
    googlecloud: {
      tag: 'GOOGLE CLOUD • GENERATIVE AI STUDIO • 2025',
      title: 'Declaration of Completion',
      subtitle: 'Google Cloud & Simplilearn SkillUp — Introduction to Generative AI Studio',
      company: 'Google Cloud & Simplilearn SkillUp',
      role: 'Generative AI Practitioner',
      period: 'Completed: 30th October 2025',
      date: '30 Oct 2025',
      signatory: 'Krishna Kumar, CEO Simplilearn',
      verification: 'Certificate Code: 9280368',
      image: 'public/assets/certificates/google-cloud-generative-ai.jpeg',
      description: 'Successfully completed official online course in Introduction to Generative AI Studio powered by Google Cloud. Mastered foundation models, prompt engineering, generative fine-tuning concepts, and Vertex AI integrations.',
      tags: ['Generative AI', 'Google Cloud', 'Vertex AI', 'Prompt Engineering', 'LLM Architectures', 'Deep Learning']
    },
    samsung: {
      tag: 'SAMSUNG INNOVATION CAMPUS • BIG DATA • 2025',
      title: 'Certificate of Completion — Big Data',
      subtitle: 'Samsung Innovation Campus & ESSCI',
      company: 'Samsung Southwest Asia & ESSCI',
      role: 'Big Data Analyst',
      period: '11/08/2025 to 15/10/2025',
      date: '15 Oct 2025',
      signatory: 'Shubham Mukherjee (Head - CSR, Samsung) & Vinod Sharma (Chairman, ESSCI)',
      verification: 'ID: SIC08220',
      image: 'public/assets/certificates/samsung-innovation-bigdata.jpeg',
      description: 'Successfully completed the intensive Big Data course under Samsung Innovation Campus. Mastered large-scale distributed dataset processing, exploratory statistical analysis, feature extraction pipelines, and machine learning models.',
      tags: ['Big Data', 'Samsung Innovation', 'Data Analytics', 'Statistical Modeling', 'Predictive Systems', 'ESSCI Certified']
    },
    internshala: {
      tag: 'INTERNSHALA TRAININGS & IITM PRAVARTAK • 2025',
      title: 'Certificate of Training — Data Science with AI',
      subtitle: 'Internshala Trainings in association with IITM Pravartak',
      company: 'Internshala & IITM Pravartak Technologies Foundation',
      role: 'Data Science & AI Trainee',
      period: '8-Week Intensive Training (Completed 2025-10-30)',
      date: '30 Oct 2025',
      signatory: 'Sarvesh Agrawal (CEO Internshala) & Dr. Shankar Raman (CEO IITM Pravartak)',
      verification: 'Verified Curriculum & Capstone Project',
      image: 'public/assets/certificates/internshala-datascience-ai.jpeg',
      description: 'Successfully completed 8-week online training on Data Science with AI. Mastered Exploratory Data Analysis, Data Visualization, Working with Data, Predictive Analytics using Machine Learning, AI in Data Science, and Capstone Project modules.',
      tags: ['Data Science', 'Machine Learning', 'IITM Pravartak', 'Python Analytics', 'Predictive Modeling', 'Capstone Delivery']
    },
    dataculture: {
      tag: 'DATACULTURE TECHNOLOGIES • INDUSTRIAL TRAINING',
      title: 'Certificate of Completion — Python Essentials',
      subtitle: 'Industrial Training on Python Essentials & Application Development',
      company: 'DataCulture Technologies',
      role: 'Python Application Developer',
      period: 'Industrial Training Completion',
      date: '2025',
      signatory: 'Priya Singh & Samriti Thakur, Program Co-ordinators',
      verification: 'QR Code Authenticated Verification',
      image: 'public/assets/certificates/dataculture-python-essentials.jpeg',
      description: 'Successfully completed Industrial Training on Python Essentials and Application Development organized by DataCulture Technologies. Acquired essential skills in Python programming, application development, and practical concept implementation.',
      tags: ['Python Programming', 'Application Development', 'Software Architecture', 'Data Structures', 'OOP']
    },
    ibm: {
      tag: 'IBM SKILLSBUILD • CREDLY VERIFIED • 2026',
      title: 'Career Management Essentials',
      subtitle: 'IBM SkillsBuild Credential',
      company: 'IBM SkillsBuild',
      role: 'Professional Development',
      period: 'Issued: Aug 02, 2026',
      date: '02 Aug 2026',
      signatory: 'IBM SkillsBuild Global Credentialing',
      verification: 'Credly ID: a1f6250d-6724-4e13-92b9-c198ad3f2696',
      image: 'public/assets/certificates/ibm-skillsbuild-career.jpeg',
      description: 'Issued by IBM SkillsBuild in recognition of commitment to achieve professional excellence. Satisfied rigorous requirements in career management essentials, technical communication, workplace agility, and problem solving.',
      tags: ['IBM SkillsBuild', 'Credly Verified', 'Career Essentials', 'Leadership', 'Professional Agile']
    },
    itm: {
      tag: 'ITM GIDA • INNOVATION & TECHNOLOGY APPRECIATION',
      title: 'Certificate of Appreciation',
      subtitle: 'Institute of Technology & Management (ITM GIDA Gorakhpur)',
      company: 'Institute of Technology & Management',
      role: 'Student Innovator (BCA 1st Year)',
      period: '15th October 2024',
      date: '15 Oct 2024',
      signatory: 'Dr. N. K. Singh, Director (Approved by AICTE & Affiliated to Dr. APJ AKTU)',
      verification: 'Official Institutional Seal & AKTU Affiliation',
      image: 'public/assets/certificates/itm-innovation-appreciation.jpeg',
      description: 'Awarded to Priyanshi Srivastava, BCA (1st Year), in appreciation of active participation in Innovation and Technology on 15th October 2024 at ITM GIDA Gorakhpur.',
      tags: ['Innovation & Technology', 'ITM GIDA', 'AKTU Affiliated', 'AICTE Approved', 'Engineering Showcase']
    },
    simplilearn: {
      tag: 'SIMPLILEARN SKILLUP • ANDROID APP DEVELOPMENT • 2026',
      title: 'Certificate of Completion',
      subtitle: 'Simplilearn SkillUp — Android App Development for Beginners',
      company: 'Simplilearn SkillUp',
      role: 'Mobile App Developer',
      period: 'Completed: 13th June 2026',
      date: '13 Jun 2026',
      signatory: 'Krishna Kumar, CEO Simplilearn',
      verification: 'Certificate Code: 10342854',
      image: 'public/assets/certificates/simplilearn-android-dev.jpeg',
      description: 'Successfully completed the online course in Android App Development for Beginners. Demonstrated initiative and commitment to deepening mobile development skills, Android lifecycle management, and UI architecture.',
      tags: ['Android Development', 'Mobile UI', 'Kotlin / Java', 'App Architecture', 'Simplilearn Verified']
    },
    learntube: {
      tag: 'LEARNTUBE.AI • AI & ML ASSESSMENT',
      title: 'Certificate of Completion',
      subtitle: 'LearnTube.ai — AI & ML Assessment',
      company: 'LearnTube.ai',
      role: 'AI & Machine Learning Assessment',
      period: 'Completed: October 30, 2025',
      date: '30 Oct 2025',
      signatory: 'Shronit Ladhani & Gargi Ruparelia, Co-Founders',
      verification: 'ID: DJA-B-1-1801612-0',
      image: 'public/assets/certificates/learntube-ai-ml-assessment.jpeg',
      description: 'Awarded for successfully completing the comprehensive AI & ML Assessment on LearnTube.ai, demonstrating foundational proficiency in neural architectures, supervised learning, and algorithmic evaluation.',
      tags: ['AI & ML', 'Machine Learning', 'Model Evaluation', 'LearnTube', 'Verified Assessment']
    },
    jci: {
      tag: 'JCI GORAKHPUR SWARAJ • YOUTH LEADERSHIP',
      title: 'Certificate of Appreciation',
      subtitle: 'JCI Week 2026 — Youth Leadership Day & Voice Day',
      company: 'JCI Gorakhpur Swaraj & JCI India',
      role: 'Youth Leadership Delegate',
      period: '10th September 2026',
      date: '10 Sep 2026',
      signatory: 'HGF Richa Jaiswal (President) & JFM Pratima Agrawal (Secretary)',
      verification: 'JCI India Chapter Accreditation',
      image: 'public/assets/certificates/jci-youth-leadership.jpeg',
      description: 'Presented for enthusiastic participation in Youth Leadership Day & Voice Day organized by JCI Gorakhpur Swaraj. Recognized for active involvement, confident expression, and exemplary spirit of leadership.',
      tags: ['Youth Leadership', 'JCI India', 'Public Speaking', 'Community Impact', 'Leadership Day']
    },
    unstop: {
      tag: 'UNSTOP • FRONTEND HACKATHON PARTICIPATION',
      title: 'Certificate of Participation — WebRush',
      subtitle: 'Unstop & Frontend Arena — 6-Hour Frontend Hackathon',
      company: 'Unstop & Institute of Technology & Engineering Studies',
      role: 'Hackathon Participant',
      period: 'September 2026',
      date: 'Sep 2026',
      signatory: 'Frontend Arena & Unstop Organizing Body',
      verification: 'Unstop Platform Authenticated',
      image: 'public/assets/certificates/unstop-webrush-participation.jpeg',
      description: 'Certifies that Priyanshi Srivastava from Institute of Technology & Engineering Studies participated in WebRush — 6-Hour Frontend Hackathon organized by Frontend Arena on Unstop.',
      tags: ['Frontend Hackathon', 'Unstop', 'WebRush', 'Fast Prototyping', 'UI Challenge']
    },
    icat: {
      tag: 'ICAT • INTERNSHIP COMMON APTITUDE TEST',
      title: 'Certificate of Participation',
      subtitle: 'Internship Common Aptitude Test (ICAT)',
      company: 'ICAT Platform',
      role: 'Aptitude Candidate',
      period: '3rd November 2025',
      date: '03 Nov 2025',
      signatory: 'ICAT Evaluation Board',
      verification: 'Certificate Number: CIT-P-2506530',
      image: 'public/assets/certificates/icat-internship-aptitude.jpeg',
      description: 'Presented for participating in the Internship Common Aptitude Test. Commends dedication and effort in technical aptitude, quantitative analysis, and logical reasoning.',
      tags: ['Technical Aptitude', 'ICAT', 'Problem Solving', 'Logical Reasoning', 'Evaluation']
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

    if (modalMeta) {
      modalMeta.innerHTML = `
        <div class="modal-meta-item">
          <span class="meta-label">Authority / Organization</span>
          <span class="meta-val">${data.company}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">Role / Achievement</span>
          <span class="meta-val">${data.role}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">Period / Issue Date</span>
          <span class="meta-val">${data.period}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">Credential Verification</span>
          <span class="meta-val meta-highlight">${data.verification}</span>
        </div>
        <div class="modal-meta-item full-width">
          <span class="meta-label">Curriculum / Achievement Overview</span>
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
})();
