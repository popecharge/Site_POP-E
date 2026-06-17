// 1. LE CANVAS (EFFET ÉTINCELLES)
(function () {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return; // Sécurité si le canvas n'est pas encore là
  
  const ctx = canvas.getContext('2d');
  const W = 360, H = 620;
  canvas.width = W;
  canvas.height = H;

  let sparkCenterY = H * 0.44;
  window.setSparkleCenter = function (y) {
    sparkCenterY = y;
    for (let i = 0; i < pts.length; i++) pts[i] = make();
  };

  const PALETTE = [
    [173, 255, 0],
    [200, 255, 80],
    [255, 255, 255],
    [220, 255, 120],
    [173, 255, 0],
  ];

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function make() {
    const angle = rand(0, Math.PI * 2);
    const rx = rand(10, 130);
    const ry = rand(10, 100);
    const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    return {
      x: W / 2 + Math.cos(angle) * rx,
      y: sparkCenterY + Math.sin(angle) * ry,
      size: rand(0.8, 2.8),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.5, 1.6),
      maxAlpha: rand(0.3, 0.85),
      vx: rand(-0.06, 0.06),
      vy: rand(-0.06, -0.02),
      r, g, b,
    };
  }

  const COUNT = 55;
  const pts = Array.from({ length: COUNT }, make);
  let t = 0;

  function loop() {
    ctx.clearRect(0, 0, W, H);
    t += 0.018;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const raw = Math.sin(t * p.speed + p.phase);
      const alpha = Math.max(0, raw) * p.maxAlpha;
      if (alpha < 0.01) { p.x += p.vx; p.y += p.vy; continue; }
      const { r, g, b, x, y, size } = p;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
      grd.addColorStop(0, `rgba(${r},${g},${b},${(alpha * 0.5).toFixed(3)})`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, size * 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth = Math.max(0.3, size * 0.3);
      const arm = size * 2.8;
      ctx.beginPath();
      ctx.moveTo(x - arm, y); ctx.lineTo(x + arm, y);
      ctx.moveTo(x, y - arm); ctx.lineTo(x, y + arm);
      ctx.stroke();
      ctx.globalAlpha = 1;
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10 || p.y < sparkCenterY - 130) {
        pts[i] = make();
        pts[i].y = sparkCenterY + rand(50, 100);
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

// 2. LE CARROUSEL DES BORNES
(function () {
  const data = [
    {
      fr: {
        title: "Borne 24 batteries",
        desc: "Idéale pour les lieux de passage compacts, gares et centres commerciaux.",
        usage: "Idéal pour commerces de proximité, salles de sport et bars.",
        btnLabel: "Demander cette borne",
        specs: [
          { icon: "/img/carousel/carousel-icon1.png", h: "24", p: "batteries externes disponibles" },
          { icon: "/img/carousel/carousel-icon2.png", h: "Écran 23 pouces", p: "monétisable" },
          { icon: "/img/carousel/carousel-icon3.png", h: "Connexion", p: "Carte SIM ou Wi-Fi" },
          { icon: "/img/carousel/carousel-icon5.png", h: "Paiement", p: "Sans contact / App" },
          { icon: "/img/carousel/carousel-icon6.png", h: "Branchement", p: "Secteur classique" }
        ]
      },
      en: {
        title: "24-battery station",
        desc: "Ideal for compact transit areas, train stations and shopping centers.",
        usage: "Ideal for local shops, gyms and bars.",
        btnLabel: "Request this station",
        specs: [
          { icon: "/img/carousel/carousel-icon1.png", h: "24", p: "external batteries available" },
          { icon: "/img/carousel/carousel-icon2.png", h: "23-inch screen", p: "monetizable" },
          { icon: "/img/carousel/carousel-icon3.png", h: "Connection", p: "SIM card or Wi-Fi" },
          { icon: "/img/carousel/carousel-icon5.png", h: "Payment", p: "Contactless / App" },
          { icon: "/img/carousel/carousel-icon6.png", h: "Power", p: "Standard outlet" }
        ]
      }
    },
    {
      fr: {
        title: "Borne 48 batteries",
        desc: "La puissance maximale pour les festivals, lieux à fort flux et activations sponsorisées.",
        usage: "Idéal pour festivals, gares, aéroports, clubs, salons et grands événements.",
        btnLabel: "Demander cette borne",
        specs: [
          { icon: "/img/carousel/carousel-icon1.png", h: "48", p: "batteries externes disponibles" },
          { icon: "/img/carousel/carousel-icon2.png", h: "Écran 43 pouces", p: "monétisable" },
          { icon: "/img/carousel/carousel-icon3.png", h: "Connexion", p: "Carte SIM intégrée ou Wi-Fi" },
          { icon: "/img/carousel/carousel-icon4.png", h: "Option", p: "waterproof disponible" },
          { icon: "/img/carousel/carousel-icon5.png", h: "Paiement", p: "sans contact / QR code / application" },
          { icon: "/img/carousel/carousel-icon6.png", h: "Branchement", p: "électrique classique (220V)" },
          { icon: "/img/carousel/carousel-icon7.png", h: "Consommation", p: "moyenne estimée 200 à 250 W" },
          { icon: "/img/carousel/carousel-icon9.png", h: "Recharge autonome", p: "en libre-service" },
          { icon: "/img/carousel/carousel-icon8.png", h: "Écran exploitable", p: "pour informations, publicité et partenaires" }
        ]
      },
      en: {
        title: "48-battery station",
        desc: "Maximum power for festivals, high-traffic venues and sponsored activations.",
        usage: "Ideal for festivals, train stations, airports, clubs, trade shows and large events.",
        btnLabel: "Request this station",
        specs: [
          { icon: "/img/carousel/carousel-icon1.png", h: "48", p: "external batteries available" },
          { icon: "/img/carousel/carousel-icon2.png", h: "43-inch screen", p: "monetizable" },
          { icon: "/img/carousel/carousel-icon3.png", h: "Connection", p: "Built-in SIM card or Wi-Fi" },
          { icon: "/img/carousel/carousel-icon4.png", h: "Option", p: "waterproof available" },
          { icon: "/img/carousel/carousel-icon5.png", h: "Payment", p: "Contactless / QR code / App" },
          { icon: "/img/carousel/carousel-icon6.png", h: "Power", p: "Standard electrical outlet (220V)" },
          { icon: "/img/carousel/carousel-icon7.png", h: "Consumption", p: "estimated average 200 to 250 W" },
          { icon: "/img/carousel/carousel-icon9.png", h: "Self-charging", p: "self-service" },
          { icon: "/img/carousel/carousel-icon8.png", h: "Usable screen", p: "for information, advertising and partners" }
        ]
      }
    },
    {
      fr: {
        title: "Borne 6 batteries",
        desc: "Le format idéal pour les comptoirs et espaces restreints.",
        usage: "Idéal pour restaurants, comptoirs d'accueil et bureaux.",
        btnLabel: "Demander cette borne",
        specs: [
          { icon: "/img/carousel/carousel-icon1.png", h: "6", p: "batteries disponibles" },
          { icon: "/img/carousel/carousel-icon6.png", h: "Branchement", p: "USB-C / Secteur" },
          { icon: "/img/carousel/carousel-icon9.png", h: "Format", p: "Compact et discret" }
        ]
      },
      en: {
        title: "6-battery station",
        desc: "The ideal format for counters and restricted spaces.",
        usage: "Ideal for restaurants, reception desks and offices.",
        btnLabel: "Request this station",
        specs: [
          { icon: "/img/carousel/carousel-icon1.png", h: "6", p: "batteries available" },
          { icon: "/img/carousel/carousel-icon6.png", h: "Power", p: "USB-C / Outlet" },
          { icon: "/img/carousel/carousel-icon9.png", h: "Format", p: "Compact and discreet" }
        ]
      }
    }
  ];

  let active = 1;
  function getLang() { return window.currentLang || 'fr'; }

  const items = document.querySelectorAll('.borne-item');
  const dots = document.querySelectorAll('.bornes-dot');
  const dynamicContent = document.getElementById('dynamic-content');
  const dynamicUsage = document.getElementById('dynamic-usage');

  if (!dynamicContent) return; // Sécurité si les éléments HTML ne sont pas chargés

  const SPARKLE_Y = [273, 273, 430];

  function update(next) {
    active = next;
    if (window.setSparkleCenter) window.setSparkleCenter(SPARKLE_Y[next]);

    items.forEach((el, i) => {
      el.classList.remove('pos-left', 'pos-center', 'pos-right');
      if (i === active) el.classList.add('pos-center');
      else if (i === (active + 2) % 3) el.classList.add('pos-left');
      else el.classList.add('pos-right');
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === active));

    dynamicContent.style.opacity = 0;
    setTimeout(() => {
      const lang = getLang();
      const b = data[active][lang];
      let specsHTML = b.specs.map(s => `
        <div class="spec-item">
          <img src="${s.icon}" alt="icon">
          <div class="spec-text">
            <h4>${s.h}</h4>
            <p>${s.p}</p>
          </div>
        </div>
      `).join('');

      dynamicContent.innerHTML = `
        <div class="panel-left">
          <div class="model-badge">
            <img src="/img/carousel/carousel-icon1.png" alt="icon">
            <h2>${b.title}</h2>
          </div>
          <p>${b.desc}</p>
          <a href="/pro/devis-commerce.html" class="btn-order btn-animated">
            <span class="btn-text">${b.btnLabel}</span>
            <span class="btn-arrow">→</span>
          </a>
        </div>
        <div class="specs-grid">${specsHTML}</div>
      `;
      dynamicUsage.textContent = b.usage;
      dynamicContent.style.opacity = 1;
    }, 300);
  }

  window.bornesUpdate = function () { update(active); };

  items.forEach((item, i) => {
    item.addEventListener('click', () => { if (i !== active) update(i); });
  });
  dots.forEach((dot, i) => dot.addEventListener('click', () => update(i)));
  
  const prevBtn = document.querySelector('.bornes-nav--prev');
  const nextBtn = document.querySelector('.bornes-nav--next');
  if (prevBtn) prevBtn.addEventListener('click', () => update((active + 2) % 3));
  if (nextBtn) nextBtn.addEventListener('click', () => update((active + 1) % 3));

  setTimeout(() => update(1), 0);
})();