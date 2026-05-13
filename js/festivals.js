/* ═══════════════════════════════════════════
   FESTIVALS.JS — POP-E
═══════════════════════════════════════════ */

// ── DONNÉES FESTIVALS ──────────────────────────────────────────────────────
const FESTIVALS = [
  {
    id: 1,
    name: "Hellfest",
    city: "Clisson",
    lat: 47.0833, lng: -1.2833,
    dates: "20 – 23 Juin 2026",
    address: "Château de la Salle, 44190 Clisson",
    genre: "Metal / Rock",
    bornes: "8 bornes • 192 batteries",
    emoji: "/img/fes1.png"
  },
  {
    id: 2,
    name: "Les Vieilles Charrues",
    city: "Carhaix",
    lat: 48.2763, lng: -3.5736,
    dates: "16 – 19 Juillet 2026",
    address: "Kerampuilh, 29270 Carhaix-Plouguer",
    genre: "Généraliste / Pop / Rock",
    bornes: "12 bornes • 288 batteries",
    emoji: "/img/fes2.png"
  },
  {
    id: 3,
    name: "Rock en Seine",
    city: "Saint-Cloud",
    lat: 48.8430, lng: 2.2090,
    dates: "28 – 30 Août 2026",
    address: "Domaine National de Saint-Cloud, 92210",
    genre: "Rock / Indie / Electro",
    bornes: "10 bornes • 240 batteries",
    emoji: "/img/fes3.png"
  },
  {
    id: 4,
    name: "Solidays",
    city: "Paris",
    lat: 48.8566, lng: 2.3522,
    dates: "26 – 28 Juin 2026",
    address: "Hippodrome de Longchamp, 75016 Paris",
    genre: "Éclectique / Solidaire",
    bornes: "6 bornes • 144 batteries",
    emoji: "/img/fes4.png"
  },
  {
    id: 5,
    name: "Festival de Nîmes",
    city: "Nîmes",
    lat: 43.8367, lng: 4.3601,
    dates: "5 – 25 Juillet 2026",
    address: "Arènes de Nîmes, 30000 Nîmes",
    genre: "Pop / Rock / Variété",
    bornes: "4 bornes • 96 batteries",
    emoji: "/img/fes5.png"
  },
  {
    id: 6,
    name: "Dour Festival",
    city: "Bordeaux",
    lat: 44.8378, lng: -0.5792,
    dates: "10 – 13 Juillet 2026",
    address: "Parc des Expositions, 33300 Bordeaux",
    genre: "Electro / Techno / Hip-Hop",
    bornes: "6 bornes • 144 batteries",
    emoji: "/img/fes6.png"
  },
  {
    id: 7,
    name: "Festival de Cannes",
    city: "Cannes",
    lat: 43.5528, lng: 7.0174,
    dates: "13 – 24 Mai 2026",
    address: "Palais des Festivals, 06400 Cannes",
    genre: "Cinéma / Culture",
    bornes: "5 bornes • 120 batteries",
    emoji: "/img/fes7.png"
  },
  {
    id: 8,
    name: "Main Square Festival",
    city: "Arras",
    lat: 50.2924, lng: 2.7771,
    dates: "3 – 5 Juillet 2026",
    address: "Citadelle d'Arras, 62000 Arras",
    genre: "Rock / Pop / Electro",
    bornes: "7 bornes • 168 batteries",
    emoji: "/img/fes8.png"
  },
  {
    id: 9,
    name: "Fiesta des Suds",
    city: "Marseille",
    lat: 43.2965, lng: 5.3698,
    dates: "17 – 19 Octobre 2026",
    address: "Dock des Suds, 13002 Marseille",
    genre: "Monde / Reggae / Afro",
    bornes: "4 bornes • 96 batteries",
    emoji: "/img/fes9.png"
  },
  {
    id: 10,
    name: "Transmusicales",
    city: "Rennes",
    lat: 48.1173, lng: -1.6778,
    dates: "3 – 7 Décembre 2026",
    address: "Le Liberté & Parc Expo, 35000 Rennes",
    genre: "Découverte / Indie / World",
    bornes: "5 bornes • 120 batteries",
    emoji: "/img/fes10.png"
  },
  {
    id: 11,
    name: "Festival Interceltique",
    city: "Lorient",
    lat: 47.7482, lng: -3.3673,
    dates: "1 – 10 Août 2026",
    address: "Centre-ville, 56100 Lorient",
    genre: "Musiques Celtiques",
    bornes: "6 bornes • 144 batteries",
    emoji: "/img/fes11.png"
  },
  {
    id: 12,
    name: "Musilac",
    city: "Aix-les-Bains",
    lat: 45.6887, lng: 5.9115,
    dates: "9 – 12 Juillet 2026",
    address: "Esplanade du Lac, 73100 Aix-les-Bains",
    genre: "Pop / Rock / Electro",
    bornes: "5 bornes • 120 batteries",
    emoji: "/img/fes12.png"
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
      <img src="/img/loc.png" class="loc-marker${active ? ' loc-marker-active' : ''}"
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

  // Réinitialiser l'état précédent
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

  // Remplir le popup
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

// Fermer avec Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePopup();
});