// Intersection Observer for sleek reveals
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section:not(.hero-scrub-container) h2, .project, .experience-grid article, .stats article, .roadmap-card, .credential-card').forEach((el, index) => {
    el.classList.add('motion-reveal');
    el.style.setProperty('--delay', `${(index % 4) * 80}ms`);
    observer.observe(el);
  });
})();
