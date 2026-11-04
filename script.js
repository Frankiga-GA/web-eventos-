const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const orbitWord = document.querySelector('.orbit-word');
const orbitCount = document.querySelector('.orbit-count');

if (orbitWord && orbitCount) {
  const eventTypes = ['BODAS', 'FIESTAS', 'CONCIERTOS', 'CORPORATIVOS'];
  let eventIndex = 0;
  window.setInterval(() => {
    eventIndex = (eventIndex + 1) % eventTypes.length;
    orbitWord.classList.add('changing');
    window.setTimeout(() => {
      orbitWord.textContent = eventTypes[eventIndex];
      orbitCount.innerHTML = `${String(eventIndex + 1).padStart(2, '0')} <i>/</i> 04`;
      orbitWord.classList.remove('changing');
    }, 220);
  }, 2200);
}

// Duplicate each reel lane for a seamless loop in both directions.
document.querySelectorAll('.reel-track').forEach((track) => {
  [...track.children].forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelector('.reel-audio')?.remove();
    track.append(clone);
  });
});

const kineticWord = document.querySelector('.kinetic-word');
if (kineticWord && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = ['el momento', 'la emoción', 'el espectáculo', 'el recuerdo'];
  let wordIndex = 0;
  window.setInterval(() => {
    kineticWord.classList.add('is-exiting');
    window.setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      kineticWord.textContent = words[wordIndex];
      kineticWord.classList.remove('is-exiting');
      kineticWord.classList.add('is-entering');
      window.setTimeout(() => kineticWord.classList.remove('is-entering'), 440);
    }, 320);
  }, 2500);
}

const galleryData = {
  social: [
    ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85', 'Novios celebrando en su boda', 'BODAS · MOMENTOS QUE QUEDAN'],
    ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=85', 'Decoración cálida para una recepción', 'SOCIALES · DETALLES CON INTENCIÓN'],
    ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1100&q=85', 'Pareja disfrutando su celebración', 'BODAS · UNA HISTORIA PROPIA'],
  ],
  corporate: [
    ['https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1100&q=85', 'Conferencia en escenario', 'CORPORATIVOS · IDEAS EN ESCENA'],
    ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85', 'Espacio preparado para evento de empresa', 'MARCAS · ESPACIOS QUE COMUNICAN'],
    ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=85', 'Reunión profesional y presentación', 'CORPORATIVOS · CADA DETALLE CUENTA'],
  ],
  live: [
    ['https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1100&q=85', 'DJ y luces en una fiesta', 'FIESTAS · HASTA EL ÚLTIMO BEAT'],
    ['https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1100&q=85', 'Luces de escenario en concierto', 'CONCIERTOS · ENERGÍA EN VIVO'],
    ['https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1100&q=85', 'Público disfrutando un concierto', 'EN VIVO · UNA NOCHE PARA RECORDAR'],
  ],
};

const galleryGrid = document.querySelector('#gallery-grid');
const galleryTabs = [...document.querySelectorAll('[data-gallery-filter]')];
function renderGallery(category) {
  if (!galleryGrid) return;
  galleryGrid.classList.add('is-changing');
  window.setTimeout(() => {
    galleryGrid.innerHTML = galleryData[category].map(([src, alt, caption], index) =>
      `<figure class="tile gallery-tile gallery-tile-${index + 1}"><img src="${src}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption></figure>`
    ).join('');
    galleryGrid.classList.remove('is-changing');
    galleryGrid.querySelectorAll('.tile').forEach((tile, index) => {
      tile.classList.add('reveal');
      tile.style.setProperty('--reveal-delay', `${index * 90}ms`);
      requestAnimationFrame(() => tile.classList.add('is-visible'));
    });
  }, 140);
}
galleryTabs.forEach((tab) => tab.addEventListener('click', () => {
  galleryTabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  renderGallery(tab.dataset.galleryFilter);
}));
renderGallery('social');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealTargets = document.querySelectorAll('.intro, .stats-head, .stat, .stats-note, .intro-grid h2, .intro-copy, .intro-visual, .section-heading, .service-row, .process-head, .process-steps article, .tile, .about-image, .about-copy, .faq-heading, .faq-list details, .form-intro, .quote-form, .contact-row, .contact-visual, .contact-foot > div');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((target, index) => {
  target.classList.add('reveal');
  target.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
  observer.observe(target);
});

// Pause sample footage while it is off screen so the motion stays smooth on phones.
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
    // Reels are loaded and played only when they are meaningfully visible.
    const shouldPlay = isIntersecting && (target.closest('.reel-card') ? intersectionRatio >= 0.35 : true);
    if (shouldPlay) target.play().catch(() => {});
    else target.pause();
  });
}, { threshold: [0, 0.35], rootMargin: '80px 0px' });

document.querySelectorAll('video').forEach((video) => {
  if (!video.closest('.service-row')) videoObserver.observe(video);
});

document.querySelectorAll('.reel-audio').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const video = button.closest('.reel-card')?.querySelector('video');
    if (!video) return;
    video.muted = !video.muted;
    button.classList.toggle('is-on', !video.muted);
    button.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar video');
    button.textContent = video.muted ? '♪' : '♫';
  });
});

const servicePreview = document.querySelector('.service-cursor-preview');
const previewVideo = servicePreview?.querySelector('video');
if (servicePreview && previewVideo && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.service-row').forEach((row) => {
    row.addEventListener('mouseenter', () => {
      previewVideo.src = row.dataset.previewVideo;
      previewVideo.poster = row.dataset.previewImage;
      previewVideo.load();
      previewVideo.play().catch(() => {});
      servicePreview.classList.add('is-visible');
    });
    row.addEventListener('mousemove', (event) => {
      const left = Math.min(event.clientX, window.innerWidth - 260);
      const top = Math.min(event.clientY, window.innerHeight - 360);
      servicePreview.style.setProperty('--preview-x', `${Math.max(12, left)}px`);
      servicePreview.style.setProperty('--preview-y', `${Math.max(12, top)}px`);
    });
    row.addEventListener('mouseleave', () => {
      servicePreview.classList.remove('is-visible');
      previewVideo.pause();
      previewVideo.removeAttribute('src');
      previewVideo.load();
    });
  });
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = `${target}${suffix}`;
      observer.unobserve(element);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(element);
  });
}, { threshold: 0.6 });
counters.forEach((counter) => counterObserver.observe(counter));

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('servicio');
  const eventSelect = quoteForm.querySelector('[name="evento"]');
  const contextPanel = quoteForm.querySelector('#event-context');
  const comboField = quoteForm.querySelector('[name="combo"]');
  if (comboField) comboField.value = params.get('combo') || '';
  if (eventSelect && params.has('evento')) eventSelect.value = params.get('evento');

  const renderEventContext = () => {
    if (!eventSelect || !contextPanel) return;
    const selected = eventSelect.value;
    contextPanel.hidden = !selected;
    if (!selected) {
      contextPanel.innerHTML = '';
      return;
    }
    const locationAndGuests = `<label>Local o distrito<input name="lugar" placeholder="Nombre del local, distrito o ciudad"></label><label>Cantidad estimada de invitados<select name="invitados"><option value="">Selecciona un rango</option><option>Menos de 50</option><option>50–100</option><option>101–300</option><option>301–500</option><option>Más de 500</option></select></label>`;
    if (selected === 'Evento corporativo') {
      contextPanel.innerHTML = `<p>¿Necesitas visita técnica previa o requerimiento especial de facturación?</p><label>Visita técnica previa<select name="visita_tecnica"><option value="">Selecciona</option><option>Sí</option><option>No</option></select></label><label>Requerimiento especial de facturación<input name="facturacion" placeholder="RUC, orden de compra u otro"></label>`;
    } else if (selected === 'Boda' || selected === 'Fiesta') {
      contextPanel.innerHTML = `<p>¿En qué local o distrito será y cuántos invitados calculas?</p>${locationAndGuests}`;
    } else if (selected === 'Concierto') {
      contextPanel.innerHTML = `<p>Cuéntanos dónde será y qué aforo estimas.</p>${locationAndGuests}`;
    } else {
      contextPanel.innerHTML = `<p>Compártenos el lugar y el tamaño aproximado del evento.</p>${locationAndGuests}`;
    }
  };
  eventSelect?.addEventListener('change', renderEventContext);
  renderEventContext();

  document.querySelectorAll('[data-pack-event]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (eventSelect) {
        eventSelect.value = link.dataset.packEvent;
        eventSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (comboField) comboField.value = link.dataset.packName;
      history.replaceState(null, '', '#cotizacion');
      quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (requestedService) {
    const serviceCheckbox = [...quoteForm.querySelectorAll('input[name="servicios"]')]
      .find((input) => input.value.toLocaleLowerCase() === requestedService.toLocaleLowerCase());
    if (serviceCheckbox) serviceCheckbox.checked = true;
  }
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const selectedServices = data.getAll('servicios');
    const details = [
      'Hola, quisiera cotizar un evento.',
      `Nombre: ${data.get('nombre')}`,
      `Tipo de evento: ${data.get('evento')}`,
      data.get('combo') ? `Combo: ${data.get('combo')}` : '',
      data.get('fecha') ? `Fecha: ${data.get('fecha')}` : '',
      data.get('invitados') ? `Cantidad estimada de invitados: ${data.get('invitados')}` : '',
      data.get('lugar') ? `Lugar: ${data.get('lugar')}` : '',
      data.get('visita_tecnica') ? `Visita técnica previa: ${data.get('visita_tecnica')}` : '',
      data.get('facturacion') ? `Requerimiento de facturación: ${data.get('facturacion')}` : '',
      `Servicios: ${selectedServices.length ? selectedServices.join(', ') : 'Por definir'}`,
      data.get('mensaje') ? `Detalles: ${data.get('mensaje')}` : '',
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer');
  });
}

let scrollTicking = false;
let lastScrollY = window.scrollY;
let lastScrollTime = performance.now();
let marqueeResetTimer;
const textMasks = document.querySelectorAll('[data-text-mask]');
const featureSection = document.querySelector('.feature');
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const now = performance.now();
    const deltaY = window.scrollY - lastScrollY;
    const deltaTime = Math.max(1, now - lastScrollTime);
    const scrollSpeed = Math.abs(deltaY / deltaTime);
    const marqueeDuration = Math.max(8, 26 - scrollSpeed * 8);
    document.documentElement.style.setProperty('--marquee-duration', `${marqueeDuration}s`);
    document.documentElement.style.setProperty('--marquee-direction', deltaY < 0 ? 'reverse' : 'normal');
    lastScrollY = window.scrollY;
    lastScrollTime = now;
    window.clearTimeout(marqueeResetTimer);
    marqueeResetTimer = window.setTimeout(() => {
      document.documentElement.style.setProperty('--marquee-duration', '26s');
      document.documentElement.style.setProperty('--marquee-direction', 'normal');
    }, 260);

    textMasks.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * .84 - rect.top) / Math.max(1, rect.height * .8)));
      heading.style.setProperty('--mask-fill', `${progress * 100}%`);
    });

    if (featureSection) {
      const rect = featureSection.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      featureSection.style.setProperty('--feature-inset', `${38 * (1 - progress)}%`);
      featureSection.style.setProperty('--feature-radius', `${28 * (1 - progress)}px`);
      const copyProgress = Math.max(0, Math.min(1, (progress - .28) / .32));
      featureSection.style.setProperty('--feature-copy-opacity', String(copyProgress));
      featureSection.style.setProperty('--feature-shade-opacity', String(.18 + copyProgress * .62));
    }

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll-progress', scrollable > 0 ? String(window.scrollY / scrollable) : '0');
    document.querySelector('.topbar')?.classList.toggle('scrolled', window.scrollY > 30);
    scrollTicking = false;
  });
}, { passive: true });

if (featureSection) window.dispatchEvent(new Event('scroll'));

const hero = document.querySelector('.hero');
if (hero && window.matchMedia('(pointer:fine)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    hero.style.setProperty('--pointer-x', `${x * -10}px`);
    hero.style.setProperty('--pointer-y', `${y * -8}px`);
  });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--pointer-x', '0px');
    hero.style.setProperty('--pointer-y', '0px');
  });
}

if (window.matchMedia('(pointer:fine) and (hover:hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('mousemove', (event) => {
    document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
  }, { passive: true });

  document.querySelectorAll('.pack-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--pack-x', `${x}px`);
      card.style.setProperty('--pack-y', `${y}px`);
      const tiltX = ((y / rect.height) - .5) * -5;
      const tiltY = ((x / rect.width) - .5) * 5;
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  const magneticButtons = document.querySelectorAll('.nav-cta,.hero-quote,.light-button,.contact-button,.submit-button,.pack-cta,.detail-primary,.floating-whatsapp');
  magneticButtons.forEach((button) => {
    button.classList.add('magnetic');
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const radius = 115;
      if (distance < radius) {
        const strength = (1 - distance / radius) * .13;
        button.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else button.style.transform = '';
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}

const transitionCurtain = document.querySelector('.page-transition');
document.querySelectorAll('.service-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!transitionCurtain || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    transitionCurtain.querySelector('.transition-label').textContent = link.querySelector('h3').textContent;
    document.body.classList.add('is-leaving');
    window.setTimeout(() => window.location.assign(link.href), 650);
  });
});

window.requestAnimationFrame(() => document.body.classList.add('page-ready'));
