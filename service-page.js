const serviceContent = {
  fotografia: {
    name: 'Fotografía', accent: 'instantes que se quedan.', eyebrow: 'EL MOMENTO, TAL COMO SE SINTIÓ',
    description: 'Retratamos los momentos clave, las personas y los detalles que hacen único tu evento. Una cobertura pensada para que vuelvas a recorrer ese día a través de sus imágenes.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90',
    video: 'https://videos.pexels.com/video-files/8790458/8790458-hd_1920_1080_25fps.mp4',
    points: ['Cobertura de ceremonia, celebración y momentos espontáneos', 'Retratos de familia, invitados y protagonistas', 'Detalles del espacio, ambientación y montaje', 'Selección y entrega digital coordinadas contigo'],
    eventBlocks: [['Bodas', 'Fotografía emocional de preparativos, ceremonia, familia y celebración.'], ['Corporativos', 'Registro de marca, protocolo, escenario y momentos clave.'], ['Fiestas', 'Retratos espontáneos y toda la energía de la pista.']],
    label: 'FOTOGRAFÍA · BODAS · CELEBRACIONES'
  },
  filmacion: {
    name: 'Filmación', accent: 'la emoción en movimiento.', eyebrow: 'REVÍVELO UNA Y OTRA VEZ',
    description: 'Contamos la historia de tu evento en video, desde la atmósfera y los momentos importantes hasta la energía que se vive en el lugar. El formato de entrega se define según lo que necesites.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=90',
    video: 'https://videos.pexels.com/video-files/8244255/8244255-hd_1920_1080_25fps.mp4',
    points: ['Registro audiovisual de los momentos principales', 'Tomas de ambiente, escenario e invitados', 'Edición de video resumen según el proyecto', 'Entrega digital coordinada en la cotización'],
    eventBlocks: [['Bodas', 'Wedding Film emotivo, desde los preparativos hasta la celebración.'], ['Corporativos', 'Video institucional y cobertura audiovisual de marca.'], ['Fiestas', 'Aftermovie dinámico y Reels verticales para redes.']],
    label: 'FILMACIÓN · EVENTOS · RECUERDOS'
  },
  iluminacion: {
    name: 'Iluminación', accent: 'el ambiente lo cambia todo.', eyebrow: 'DISEÑO DE LUZ PARA CADA ESCENA',
    description: 'La iluminación transforma el espacio y acompaña cada momento. Planificamos una propuesta de luz acorde al lugar, al tipo de evento y a la atmósfera que quieres crear.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=90',
    video: 'https://videos.pexels.com/video-files/12991802/12991802-hd_1920_1080_30fps.mp4',
    points: ['Ambientación de espacios y zonas principales', 'Iluminación de escenario y pista de baile', 'Montaje y coordinación técnica', 'Propuesta adaptada al espacio y horario'],
    eventBlocks: [['Bodas', 'Luz cálida y arquitectónica para ceremonia, cena y pista.'], ['Corporativos', 'Luz escénica y ambientación alineada con la identidad de la empresa.'], ['Fiestas', 'Show de luces rítmicas y cabezas móviles para la pista.']],
    label: 'ILUMINACIÓN · ESCENARIO · ATMÓSFERA'
  },
  sonido: {
    name: 'Sonido', accent: 'que se escuche como se vivió.', eyebrow: 'AUDIO CLARO, EXPERIENCIA COMPLETA',
    description: 'Preparamos el sonido para que los mensajes, la música y cada momento se escuchen con claridad. La solución técnica se ajusta al espacio y al formato de tu evento.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=90',
    video: 'https://videos.pexels.com/video-files/2361938/2361938-hd_1920_1080_30fps.mp4',
    points: ['Audio para música, presentaciones y micrófonos', 'Coordinación de montaje y prueba técnica', 'Operación durante los momentos programados', 'Equipamiento según el aforo y el lugar'],
    eventBlocks: [['Bodas y corporativos', 'Audio ambiental y discursos claros para ceremonia, brindis y presentaciones.'], ['Conciertos', 'Presión sonora y refuerzo de audio para bandas y DJs.'], ['Fiestas', 'Sonido para acompañar la pista y cada momento de la celebración.']],
    label: 'SONIDO · MÚSICA · EVENTOS EN VIVO'
  }
};

const key = new URLSearchParams(window.location.search).get('tipo') || 'fotografia';
const service = serviceContent[key] || serviceContent.fotografia;
document.title = `${service.name} para eventos — Producción & Eventos`;

document.querySelector('#service-detail').innerHTML = `
  <section class="detail-hero">
    <video autoplay muted loop playsinline poster="${service.image}" aria-label="Video de muestra del servicio ${service.name}"><source src="${service.video}" type="video/mp4"></video>
    <div class="detail-hero-shade"></div>
    <div class="detail-hero-copy"><a class="detail-back-mobile" href="index.html#servicios">← Servicios</a><p class="eyebrow">${service.eyebrow}</p><h1>${service.name}<br><em>${service.accent}</em></h1><p>${service.description}</p><a class="detail-primary" href="index.html?servicio=${encodeURIComponent(service.name)}#cotizacion">Cotizar ${service.name.toLocaleLowerCase()} <span>↗</span></a></div>
    <span class="detail-side-label">${service.label}</span>
  </section>
  <section class="detail-content section-pad">
    <div class="detail-content-head"><div><p class="eyebrow muted">QUÉ INCLUYE</p><h2>Todo pensado<br>para <em>tu evento.</em></h2></div><p class="detail-copy">Cada celebración tiene su propio ritmo y necesidades. Coordinamos contigo los detalles de la cobertura para preparar una propuesta a medida.</p></div>
    <div class="detail-points">${service.points.map((point, index) => `<article><span>0${index + 1}</span><p>${point}</p></article>`).join('')}</div>
  </section>
  <section class="service-by-event section-pad"><p class="eyebrow muted">UNA SOLUCIÓN PARA CADA OCASIÓN</p><div class="service-event-grid">${service.eventBlocks.map(([title, text], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
  <section class="detail-gallery section-pad"><div class="detail-gallery-head"><p class="eyebrow muted">ASÍ SE VIVE</p><span>ESCENAS DE REFERENCIA</span></div><div class="detail-gallery-grid"><figure><img src="${service.image}" alt="${service.name}: experiencia del evento"><figcaption>EL MOMENTO</figcaption></figure><figure><img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85" alt="Público disfrutando un evento en vivo"><figcaption>LA ENERGÍA</figcaption></figure><figure><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85" alt="Detalles de una celebración"><figcaption>LOS DETALLES</figcaption></figure></div></section>
  <section class="detail-showcase"><img src="${service.image}" alt="Imagen de referencia para ${service.name.toLocaleLowerCase()} en eventos"><div><p class="eyebrow">PRODUCCIÓN & EVENTOS</p><h2>Cuidamos cada<br><em>detalle.</em></h2><a class="outline-button" href="index.html?servicio=${encodeURIComponent(service.name)}#cotizacion">Cuéntanos tu idea <span>↗</span></a></div></section>
  <section class="detail-next section-pad" id="cotizar"><p class="eyebrow muted">TU PRÓXIMO EVENTO EMPIEZA AQUÍ</p><h2>Hablemos de<br><em>lo que imaginas.</em></h2><a class="detail-primary" href="index.html?servicio=${encodeURIComponent(service.name)}#cotizacion">Solicitar cotización <span>↗</span></a><a class="detail-back-bottom" href="index.html#servicios">← Ver todos los servicios</a></section>
  <section class="detail-related section-pad"><p class="eyebrow muted">TAMBIÉN PODEMOS AYUDARTE CON</p><div class="related-grid">${Object.entries(serviceContent).filter(([id]) => id !== key).map(([id, item]) => `<a class="related-service" href="servicio.html?tipo=${id}"><span>${item.name}</span><b>↗</b></a>`).join('')}</div></section>
  <footer class="detail-footer"><div><strong>PRODUCCIÓN<br>& EVENTOS</strong><p>Fotografía · Filmación · Iluminación · Sonido</p></div><div><strong>EXPLORA</strong><a href="index.html#servicios">Servicios</a><a href="index.html#proceso">Cómo trabajamos</a></div><div><strong>CONTACTO</strong><a href="index.html?servicio=${encodeURIComponent(service.name)}#cotizacion">Cotiza ${service.name.toLocaleLowerCase()}</a><a href="https://wa.me/?text=Hola%2C%20quiero%20cotizar%20un%20evento">WhatsApp ↗</a></div></footer>
`;

const detailReveal = document.querySelectorAll('.detail-content-head, .detail-points article, .detail-gallery figure, .detail-showcase > div, .detail-next > *, .related-service');
const detailObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });
detailReveal.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
  detailObserver.observe(element);
});

document.querySelectorAll('.related-service').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    document.querySelector('.transition-label').textContent = link.querySelector('span').textContent;
    document.body.classList.add('is-leaving');
    window.setTimeout(() => window.location.assign(link.href), 650);
  });
});

document.querySelector('.transition-label').textContent = service.name;
window.requestAnimationFrame(() => document.body.classList.add('page-ready'));
