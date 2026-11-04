const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const reelTrack = document.querySelector('.reel-track');
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

// Duplicate the reel once so its horizontal motion loops without a blank gap.
if (reelTrack) {
  const repeatedCards = [...reelTrack.children].map((card) => card.cloneNode(true));
  repeatedCards.forEach((card) => {
    card.setAttribute('aria-hidden', 'true');
    reelTrack.append(card);
  });
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

const revealTargets = document.querySelectorAll('.intro, .stats-head, .stat, .stats-note, .intro-grid h2, .intro-copy, .intro-visual, .section-heading, .service-row, .process-head, .process-steps article, .tile, .feature-copy, .about-image, .about-copy, .faq-heading, .faq-list details, .form-intro, .quote-form, .contact-row, .contact-visual, .contact-foot > div');
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
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) target.play().catch(() => {});
    else target.pause();
  });
}, { threshold: 0.05 });

document.querySelectorAll('video').forEach((video) => {
  if (!video.closest('.service-row')) videoObserver.observe(video);
});

document.querySelectorAll('.service-row').forEach((row) => {
  const video = row.querySelector('video');
  if (video && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    row.addEventListener('mouseenter', () => video.play().catch(() => {}));
    row.addEventListener('mouseleave', () => video.pause());
  }
});

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
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll-progress', scrollable > 0 ? String(window.scrollY / scrollable) : '0');
    document.querySelector('.topbar')?.classList.toggle('scrolled', window.scrollY > 30);
    scrollTicking = false;
  });
}, { passive: true });

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
