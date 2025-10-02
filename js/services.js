/* js/services.js */
const DEFAULT_SERVICES_KEY = 'novatech_services_v1';
const CART_KEY = 'novatech_cart_v1';

// Servicios por defecto
const defaultServices = [
  {
    id: 1,
    name: "Wordpress Hosting",
    description: "Solución de alojamiento optimizada para sitios creados en WordPress. Instalación fácil, alto rendimiento y soporte.",
    features: [
      "Instalación de WordPress con un clic",
      "Transferencia gratuita de sitio WordPress/cPanel",
      "Ancho de banda ilimitado"
    ],
    price: 25000,
    stock: 60,
    img: "img/servicio1.PNG"
  },
  {
    id: 2,
    name: "Cloud Hosting",
    description: "Infraestructura escalable y flexible en la nube para proyectos de cualquier tamaño.",
    features: [
      "Escalabilidad automática",
      "Acceso remoto seguro",
      "Soporte técnico 24/7"
    ],
    price: 30000,
    stock: 50,
    img: "img/servicio2.PNG"
  },
  {
    id: 3,
    name: "Website Hosting",
    description: "Alojamiento rápido y seguro para todo tipo de páginas web empresariales.",
    features: [
      "SSL gratuito",
      "Alta disponibilidad",
      "Panel de control intuitivo"
    ],
    price: 28000,
    stock: 40,
    img: "img/servicio3.PNG"
  },
  {
    id: 4,
    name: "Free Domain",
    description: "Obtén tu dominio personalizado gratis al contratar uno de nuestros planes de hosting.",
    features: ["Dominio gratis incluido", "Subdominios ilimitados"],
    price: 0,
    stock: 100,
    img: "img/servicio4.PNG"
  },
  {
    id: 5,
    name: "SSL Service",
    description: "Certificados SSL que garantizan la protección, privacidad y confianza de tus visitantes.",
    features: ["Certificado SSL gratis", "Renovación automática"],
    price: 15000,
    stock: 80,
    img: "img/servicio5.PNG"
  },
  {
    id: 6,
    name: "Cloud VPS",
    description: "Servidores virtuales privados con recursos dedicados y configuraciones personalizables.",
    features: ["CPU dedicada", "Almacenamiento SSD", "Acceso root"],
    price: 45000,
    stock: 30,
    img: "img/servicio6.PNG"
  },
  {
    id: 7,
    name: "E-mail Corporativo",
    description: "Obtén tu dominio gratis al Correo profesional con tu propio dominio, acceso seguro desde cualquier dispositivo.",
    features: ["Correo profesional", "Filtros anti-spam", "Acceso web y móvil"],
    price: 12000,
    stock: 70,
    img: "img/servicio7.PNG"
  },
  {
    id: 8,
    name: "Backup Automático",
    description: "Copias de seguridad para que nunca pierdas información importante.",
    features: ["Restauración rápida", "Backups diarios automáticos"],
    price: 10000,
    stock: 60,
    img: "img/servicio8.PNG"
  },
  {
    id: 9,
    name: "Soporte 24/7",
    description: "Asistencia experta a toda hora para resolver cualquier consulta.",
    features: ["Soporte telefónico y chat", "Asistencia remota"],
    price: 0,
    stock: 999,
    img: "img/servicio9.PNG"
  },
];

// Funciones de storage
function readServices() {
  let services = JSON.parse(localStorage.getItem(DEFAULT_SERVICES_KEY));
  if (!services || !Array.isArray(services) || services.length === 0) {
    services = defaultServices;
    localStorage.setItem(DEFAULT_SERVICES_KEY, JSON.stringify(services));
    return services;
  }

  // Merge: si hay servicios guardados pero les faltan campos, los completamos desde defaultServices
  services = services.map(s => {
    const def = defaultServices.find(d => d.id === s.id) || {};
    return {
      id: s.id ?? def.id,
      name: s.name ?? def.name ?? 'Servicio',
      description: s.description ?? def.description ?? '',
      features: s.features ?? def.features ?? [],
      price: s.price ?? def.price ?? 0,
      stock: s.stock ?? def.stock ?? 0,
      img: s.img ?? def.img ?? 'img/placeholder.png'
    };
  });

  localStorage.setItem(DEFAULT_SERVICES_KEY, JSON.stringify(services));
  return services;
}

function readCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(serviceId, quantity) {
  const cart = readCart();
  const existing = cart.find(item => item.id === serviceId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: serviceId, quantity });
  }
  saveCart(cart);
  updateCartCountUI();
}

// Actualiza contador de carrito
function updateCartCountUI() {
  const count = readCart().reduce((acc, item) => acc + item.quantity, 0);
  document.querySelectorAll(".contador").forEach(el => el.textContent = count);
}

// Inicializa la página de servicios
function initServicesPage() {
  const services = readServices();
  const grid = document.getElementById("servicesGrid");
  const overlay = document.getElementById("serviceOverlay");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalPrice = document.getElementById("modalPrice");
  const modalStock = document.getElementById("modalStock");
  const modalQty = document.getElementById("modalQty");
  const addToCartBtn = document.getElementById("addToCart");
  const closeModalBtn = document.getElementById("closeModal");

  // Inyecta servicios
  grid.innerHTML = "";
  services.forEach(s => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
      <img src="${s.img}" alt="${s.name}" class="icon-img"
          onerror="this.onerror=null; this.src='img/placeholder.png';">
      <h3>${s.name}</h3>
      <p>${s.description ?? ''}</p>
    `;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      modalImg.src = s.img;
      modalTitle.textContent = s.name;
      modalSubtitle.textContent = "Plan empresarial";
      modalFeatures.innerHTML = "<ul>" + s.features.map(f => `<li>${f}</li>`).join("") + "</ul>";
      modalPrice.textContent = `$${s.price.toLocaleString()}`;
      modalStock.textContent = s.stock;
      modalQty.value = 1;
      overlay.classList.add("active");

      addToCartBtn.onclick = () => {
        addToCart(s.id, parseInt(modalQty.value));
        overlay.classList.remove("active");
        alert("Producto agregado al carrito!");
      };
    });
    grid.appendChild(card);
  });

  closeModalBtn.addEventListener("click", () => overlay.classList.remove("active"));
  overlay.addEventListener("click", (e) => { if(e.target === overlay) overlay.classList.remove("active"); });

  updateCartCountUI();
}

// Inicializa al cargar
document.addEventListener("DOMContentLoaded", () => {
  initServicesPage();
});
