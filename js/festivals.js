/* ═══════════════════════════════════════════
   FESTIVALS.JS — POP-E
═══════════════════════════════════════════ */

// ── DONNÉES FESTIVALS ──────────────────────────────────────────────────────
const FESTIVALS = [
  {
    id: 1,
    name: "Dystopia Festival Rennes",
    city: "Bruz / Rennes",
    lat: 47.9869, lng: -1.7465,
    dates: "13 – 14 Février 2026",
    address: "Parc Expo de Rennes, Bruz",
    genre: "Electro / Techno",
    bornes: "6 bornes • 144 batteries",
    emoji: "/img/festival/fes1.png"
  },
  {
    id: 2,
    name: "Odizia Festival",
    city: "Aix-en-Provence",
    lat: 43.5297, lng: 5.4474,
    dates: "13 – 14 Mars 2026",
    address: "6MIC, Aix-en-Provence",
    genre: "Electro / Dance",
    bornes: "5 bornes • 120 batteries",
    emoji: "/img/festival/fes2.png"
  },
  {
    id: 3,
    name: "Millésime Festival",
    city: "La Réole",
    lat: 44.5756, lng: -0.0369,
    dates: "22 – 23 Mai 2026",
    address: "Hippodrome, La Réole, 33190",
    genre: "Pop / Rock / Variété",
    bornes: "4 bornes • 96 batteries",
    emoji: "/img/festival/fes3.png"
  },
  {
    id: 4,
    name: "Le Jardin du Michel",
    city: "Dommartin-lès-Toul",
    lat: 48.6686, lng: 5.8897,
    dates: "22 – 24 Mai 2026",
    address: "Allée de l'Île des Sables, Dommartin-lès-Toul",
    genre: "Rock / Indie / Folk",
    bornes: "6 bornes • 144 batteries",
    emoji: "/img/festival/fes4.png"
  },
  {
    id: 5,
    name: "Evasion Festival",
    city: "Vaulx-en-Velin",
    lat: 45.8077, lng: 4.9522,
    dates: "27 – 28 Juin 2026",
    address: "Plage de l'Atol, Grand Parc Miribel Jonage, Chemin de la Bletta",
    genre: "Electro / Hip-Hop",
    bornes: "6 bornes • 144 batteries",
    emoji: "/img/festival/fes5.png"
  },
  {
    id: 6,
    name: "Solar Festival",
    city: "Le Crès / Montpellier",
    lat: 43.6416, lng: 3.9360,
    dates: "4 Juillet 2026",
    address: "Lac du Crès \"Jean-Marie Rouché\", 34920 Le Crès",
    genre: "Electro / Techno",
    bornes: "5 bornes • 120 batteries",
    emoji: "/img/festival/fes6.png"
  },
  {
    id: 7,
    name: "Festival Musicalarue",
    city: "Luxey",
    lat: 44.2833, lng: -0.6167,
    dates: "31 Juillet – 2 Août 2026",
    address: "Luxey, Landes, 40430",
    genre: "Musiques du Monde / Folk",
    bornes: "5 bornes • 120 batteries",
    emoji: "/img/festival/fes7.png"
  },
  {
    id: 8,
    name: "Fort Décibel Festival",
    city: "Cussac-Fort-Médoc",
    lat: 45.1167, lng: -0.7167,
    dates: "7 – 8 Août 2026",
    address: "Fort Médoc, Cussac-Fort-Médoc",
    genre: "Metal / Rock",
    bornes: "5 bornes • 120 batteries",
    emoji: "/img/festival/fes8.png"
  },
  {
    id: 9,
    name: "Les Perséides Festival",
    city: "Étoile-sur-Rhône",
    lat: 44.8583, lng: 4.8722,
    dates: "14 – 15 Août 2026",
    address: "Domaine des Clévos, 390 route de Marmans, Étoile-sur-Rhône",
    genre: "Rock / Pop / Indie",
    bornes: "4 bornes • 96 batteries",
    emoji: "/img/festival/fes9.png"
  },
  {
    id: 10,
    name: "Lezart Festival",
    city: "Vicq-sur-Gartempe",
    lat: 46.6667, lng: 0.8833,
    dates: "21 – 23 Août 2026",
    address: "Vicq-sur-Gartempe, 86260",
    genre: "Rock / Alternatif",
    bornes: "4 bornes • 96 batteries",
    emoji: "/img/festival/fes10.png"
  }
];

// ── INITIALISATION CARTE ───────────────────────────────────────────────────
const map = L.map('map', {
  center: [46.8, 2.5],
  zoom: 6,
  zoomControl: true,
  scrollWheelZoom: true,
  attributionControl: false
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap © CARTO'
}).addTo(map);

L.control.attribution({ position: 'bottomright' }).addTo(map);

// ── MARQUEURS ──────────────────────────────────────────────────────────────
const markers = {};
let activeId = null;

function createIcon(active = false) {
  return L.divIcon({
    className: '',
    html: `<div class="loc-marker-wrap">
      <img src="/img/festival/loc.png" class="loc-marker${active ? ' loc-marker-active' : ''}"
           onerror="this.style.display='none';this.parentNode.innerHTML='<div style=\\'width:32px;height:32px;background:#ADFF00;border-radius:50%;border:2px solid #fff;box-shadow:0 0 12px rgba(173,255,0,0.8);display:flex;align-items:center;justify-content:center;font-size:14px;\\'>📍</div>'">
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
}

FESTIVALS.forEach(f => {
  const marker = L.marker([f.lat, f.lng], { icon: createIcon() }).addTo(map);
  marker.on('click', () => openPopup(f.id));
  markers[f.id] = marker;
});

// ── SIDEBAR LISTE ──────────────────────────────────────────────────────────
const list = document.getElementById('festival-list');

FESTIVALS.forEach(f => {
  const item = document.createElement('div');
  item.className = 'festival-item';
  item.id = `fi-${f.id}`;
  item.innerHTML = `
    <div class="fi-icon"><img src="${f.emoji}" alt="${f.name}" style="width:28px;height:28px;object-fit:contain;border-radius:4px;"></div>
    <div class="fi-info">
      <div class="fi-name">${f.name}</div>
      <div class="fi-city">${f.city}</div>
    </div>
    <div class="fi-date">${f.dates.split(' ')[0]}<br>${f.dates.split(' ').slice(1).join(' ')}</div>
  `;
  item.addEventListener('click', () => {
    openPopup(f.id);
    map.flyTo([f.lat, f.lng], 9, { duration: 1 });
  });
  list.appendChild(item);
});

// ── POPUP ──────────────────────────────────────────────────────────────────
function openPopup(id) {
  const f = FESTIVALS.find(x => x.id === id);
  if (!f) return;

  if (activeId && markers[activeId]) {
    markers[activeId].setIcon(createIcon(false));
  }
  if (activeId) {
    const prev = document.getElementById(`fi-${activeId}`);
    if (prev) prev.classList.remove('active');
  }

  activeId = id;
  markers[id].setIcon(createIcon(true));

  const listItem = document.getElementById(`fi-${id}`);
  if (listItem) {
    listItem.classList.add('active');
    listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  document.getElementById('popup-name').textContent    = f.name;
  document.getElementById('popup-city').textContent    = f.city + ' — ' + f.dates;
  document.getElementById('popup-dates').textContent   = f.dates;
  document.getElementById('popup-address').textContent = f.address;
  document.getElementById('popup-genre').textContent   = f.genre;
  document.getElementById('popup-bornes').textContent  = f.bornes;

  document.getElementById('popup-overlay').classList.add('show');
  document.getElementById('festival-popup').classList.add('show');
}

function closePopup() {
  document.getElementById('popup-overlay').classList.remove('show');
  document.getElementById('festival-popup').classList.remove('show');

  if (activeId) {
    markers[activeId].setIcon(createIcon(false));
    const prev = document.getElementById(`fi-${activeId}`);
    if (prev) prev.classList.remove('active');
    activeId = null;
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePopup();
});