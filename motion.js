// Butter-Smooth Lenis Momentum Scroll & 360° Rotating Portrait Parallax Engine
(function() {
  'use strict';

  // Initialize Lenis Momentum Smooth Scroll
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-grade exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
      infinite: false,
    });
    window.lenis = lenis;

    // Smooth Anchor Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
        }
      });
    });
  }

  const canvas = document.getElementById('portrait-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Multi-angle rotation frames
  const imageSources = [
    'public/assets/rotation/rot_000.png', // 0° Front
    'public/assets/rotation/rot_045.png', // 45° Front-Right
    'public/assets/rotation/rot_090.png', // 90° Right Profile
    'public/assets/rotation/rot_135.png', // 135° Rear-Right
    'public/assets/rotation/rot_180.png', // 180° Direct Back
    'public/assets/rotation/rot_225.png', // 225° Rear-Left
    'public/assets/rotation/rot_270.png', // 270° Left Profile
    'public/assets/rotation/rot_315.png'  // 315° Front-Left
  ];

  const loadedImages = [];
  let loadedCount = 0;
  const totalFrames = imageSources.length;

  imageSources.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
    };
    loadedImages[idx] = img;
  });

  // State
  let currentAngle = 0;
  let targetAngle = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartAngle = 0;
  let autoRotate = true;
  let lastTime = performance.now();

  const scrubContainer = document.querySelector('.hero-scrub-container');
  const spotlight = document.getElementById('hero-spotlight');
  const heroStage = document.getElementById('portrait-stage');
  const roleSlides = document.querySelectorAll('.role-slide');
  const sideSlides = document.querySelectorAll('.side-slide');
  const motionToggleBtn = document.getElementById('motion-toggle-btn');
  const topLabel = document.getElementById('hero-top-label');
  const idWrap = document.getElementById('hero-identity-wrap');

  // Page-wide parallax elements cache (prevents layout thrashing)
  const pageParallaxElements = Array.from(document.querySelectorAll('[data-parallax-speed]')).map(el => {
    return {
      el: el,
      speed: parseFloat(el.getAttribute('data-parallax-speed')) || 0,
      absoluteTop: 0,
      height: 0
    };
  });

  function updateElementOffsets() {
    pageParallaxElements.forEach(item => {
      let cur = item.el;
      let top = 0;
      while (cur) {
        top += cur.offsetTop;
        cur = cur.offsetParent;
      }
      item.absoluteTop = top;
      item.height = item.el.offsetHeight;
    });
  }
  updateElementOffsets();
  window.addEventListener('resize', updateElementOffsets, { passive: true });
  setTimeout(updateElementOffsets, 500);

  // Smooth interpolated timeline progress
  let smoothedProgress = 0;
  let targetProgress = 0;
  let currentScrollY = 0;

  // Smoothstep function for perfect continuous cross-fade blending
  function smoothstep(val) {
    const clamped = Math.max(0, Math.min(1, val));
    return clamped * clamped * (3 - 2 * clamped);
  }

  // Draw 360-degree rotation on canvas with smoothstep cross-dissolve
  function drawRotation(angle) {
    if (loadedCount < totalFrames) return;

    let norm = ((angle % 360) + 360) % 360;
    let frameFloat = (norm / 360) * totalFrames;
    let idx1 = Math.floor(frameFloat) % totalFrames;
    let idx2 = (idx1 + 1) % totalFrames;
    let rawBlend = frameFloat - Math.floor(frameFloat);
    let blend = smoothstep(rawBlend);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img1 = loadedImages[idx1];
    const img2 = loadedImages[idx2];

    if (img1 && img1.complete) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
    }

    if (img2 && img2.complete && blend > 0.005) {
      ctx.globalAlpha = blend;
      ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
    }

    ctx.globalAlpha = 1.0;
  }

  // Pure Cosine Eased Parallax Typography
  function updateHeroParallax(progress) {
    const numSlides = roleSlides.length; // 4 roles

    roleSlides.forEach((slide, idx) => {
      const center = idx / (numSlides - 1);
      const dist = (progress - center) * (numSlides - 1);

      if (Math.abs(dist) < 1.3) {
        slide.style.display = 'block';
        const clampedDist = Math.max(-1, Math.min(1, dist));
        const cosWeight = Math.cos(clampedDist * Math.PI * 0.5);
        const weight = Math.pow(Math.max(0, cosWeight), 1.4);

        const translateY = -dist * 52;
        const translateZ = -Math.abs(dist) * 75;
        const scale = 0.9 + 0.1 * weight;
        const blur = (1 - weight) * 7;

        slide.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) scale(${scale.toFixed(3)})`;
        slide.style.opacity = weight.toFixed(3);
        slide.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none';
      } else {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
    });

    // Synchronized side descriptions
    sideSlides.forEach((slide, idx) => {
      const center = idx / (numSlides - 1);
      const dist = (progress - center) * (numSlides - 1);

      if (Math.abs(dist) < 1.3) {
        slide.style.display = 'block';
        const clampedDist = Math.max(-1, Math.min(1, dist));
        const weight = Math.pow(Math.max(0, Math.cos(clampedDist * Math.PI * 0.5)), 1.3);
        const translateY = -dist * 36;
        const blur = (1 - weight) * 5;

        slide.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        slide.style.opacity = weight.toFixed(3);
        slide.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none';
      } else {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
    });

    // Spotlight glow parallax depth
    if (spotlight) {
      const spotY = (progress - 0.5) * 50;
      const spotScale = 1 + (progress - 0.5) * 0.1;
      spotlight.style.transform = `translate3d(0, ${spotY.toFixed(1)}px, 0) scale(${spotScale.toFixed(3)})`;
    }

    // Top identity floating offset
    if (topLabel) {
      topLabel.style.transform = `translate3d(0, ${(-progress * 22).toFixed(1)}px, 0)`;
    }
    if (idWrap) {
      idWrap.style.transform = `translate3d(0, ${(-progress * 32).toFixed(1)}px, 0)`;
    }
  }

  // Fast Page Parallax (Cached positions)
  function updatePageParallax(scrollY) {
    const vh = window.innerHeight;
    const scrollCenter = scrollY + vh / 2;

    for (let i = 0; i < pageParallaxElements.length; i++) {
      const item = pageParallaxElements[i];
      const itemCenter = item.absoluteTop + item.height / 2;
      const offset = itemCenter - scrollCenter;

      if (Math.abs(offset) < vh * 1.3) {
        const translateY = offset * item.speed;
        item.el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
      }
    }
  }

  // Handle Scrub Progress Update
  function handleScrubProgress(scrollY) {
    currentScrollY = scrollY;

    if (scrubContainer) {
      const rect = scrubContainer.getBoundingClientRect();
      const containerHeight = scrubContainer.offsetHeight - window.innerHeight;

      if (containerHeight > 0) {
        const p = Math.max(0, Math.min(1, -rect.top / containerHeight));
        if (p > 0 && p < 1) {
          autoRotate = false;
          targetProgress = p;
          targetAngle = p * 360 * 2; // 2 rotations across the 300vh scrub runway
        } else if (p <= 0) {
          if (!motionToggleBtn || motionToggleBtn.getAttribute('aria-pressed') === 'true') {
            autoRotate = true;
          }
        }
      }
    }
  }

  // Hook Lenis or Native Scroll
  if (lenis) {
    lenis.on('scroll', (e) => {
      handleScrubProgress(e.scroll);
    });
  } else {
    window.addEventListener('scroll', () => {
      handleScrubProgress(window.scrollY);
    }, { passive: true });
  }

  // Unified 60FPS / 120FPS Render Loop
  function render(time) {
    if (lenis) {
      lenis.raf(time);
    }

    const dt = (time - lastTime) / 1000;
    lastTime = time;

    if (autoRotate && !isDragging && currentScrollY < 100) {
      targetAngle += dt * 16;
      targetProgress = (((targetAngle % 720) + 720) % 720) / 720;
    }

    // Soft, liquid inertia lerping
    const angleLerp = isDragging ? 0.22 : 0.09;
    currentAngle += (targetAngle - currentAngle) * angleLerp;

    const progressLerp = 0.10;
    smoothedProgress += (targetProgress - smoothedProgress) * progressLerp;

    // Render continuous 360 rotation & cosine parallax
    drawRotation(currentAngle);
    updateHeroParallax(smoothedProgress);

    // Page parallax
    if (currentScrollY > 60) {
      updatePageParallax(currentScrollY);
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Mouse / Touch Dragging on Portrait Stage
  if (heroStage) {
    heroStage.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartAngle = targetAngle;
      autoRotate = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX;
      targetAngle = dragStartAngle - deltaX * 0.75;
      targetProgress = (((targetAngle % 720) + 720) % 720) / 720;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    heroStage.addEventListener('touchstart', (e) => {
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartAngle = targetAngle;
      autoRotate = false;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - dragStartX;
      targetAngle = dragStartAngle - deltaX * 0.75;
      targetProgress = (((targetAngle % 720) + 720) % 720) / 720;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // Motion Toggle Button
  if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      motionToggleBtn.setAttribute('aria-pressed', String(autoRotate));
      motionToggleBtn.textContent = autoRotate ? 'Pause motion' : 'Play motion';
    });
  }

  // Initial call
  updateHeroParallax(0);
})();
