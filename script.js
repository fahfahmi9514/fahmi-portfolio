(() => {
  const body = document.body;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const header = document.querySelector('.site-header');
  const year = document.getElementById('year');

  year.textContent = new Date().getFullYear();

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (finePointer) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const placeDot = () => {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      body.classList.add('cursor-active');
      placeDot();
    }, { passive: true });

    document.addEventListener('mouseleave', () => body.classList.remove('cursor-active'));
    document.addEventListener('mouseenter', () => body.classList.add('cursor-active'));

    document.querySelectorAll('.interactive').forEach((element) => {
      element.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      element.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });

    document.querySelectorAll('.interactive-soft').forEach((element) => {
      element.addEventListener('mouseenter', () => body.classList.add('cursor-soft'));
      element.addEventListener('mouseleave', () => body.classList.remove('cursor-soft'));
    });

    animateRing();
  }

  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const watermark = document.querySelector('.hero-watermark');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (watermark && !reduceMotion) {
    const updateWatermark = () => {
      const scale = 1 + Math.min(window.scrollY / 900, 0.55);
      watermark.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };
    updateWatermark();
    window.addEventListener('scroll', updateWatermark, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
