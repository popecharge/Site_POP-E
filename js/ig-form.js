const API = '/api/villes';

let tableauVisible = false;
let debounceTimer = null;
let villesData = [];

async function load() {
  try {
    const res = await fetch(API);
    villesData = await res.json();
    const total = villesData.reduce((a, v) => a + v.count, 0);
    document.getElementById('ig-proof-text').textContent = total + ' demande(s) enregistrée(s)';
    if (tableauVisible) renderTableau();
  } catch (e) { console.error('Erreur load:', e); }
}

function renderTableau() {
  const container = document.getElementById('ig-ville-list');
  if (!villesData.length) {
    container.innerHTML = '<p class="ig-empty">Aucune ville proposée pour l\'instant.</p>';
    return;
  }
  container.innerHTML = villesData.map(v => `
    <div class="ig-ville-row">
      <div>
        <div class="ig-ville-name">${v.nom}</div>
        <div class="ig-ville-meta">${new Date(v.last_date).toLocaleDateString('fr-FR')}</div>
      </div>
      <span class="ig-ville-count">${v.count}</span>
    </div>
  `).join('');
}

const cityInput = document.getElementById('ig-city');
const acList = document.getElementById('ig-ac-list');

async function fetchCities(q) {
  try {
    const res = await fetch(`https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(q)}&fields=nom,departement&boost=population&limit=6`);
    const data = await res.json();
    return data.map(c => ({
      label: c.nom + (c.departement ? ` (${c.departement.nom})` : ''),
      value: c.nom
    }));
  } catch { return []; }
}

cityInput.addEventListener('input', function () {
  clearTimeout(debounceTimer);
  const val = this.value.trim();
  if (val.length < 2) { acList.style.display = 'none'; acList.innerHTML = ''; return; }
  debounceTimer = setTimeout(async () => {
    const cities = await fetchCities(val);
    if (!cities.length) { acList.style.display = 'none'; return; }
    acList.innerHTML = cities.map(c =>
      `<div class="ig-ac-item" data-val="${c.value}">${c.label}</div>`
    ).join('');
    acList.style.display = 'block';
    acList.querySelectorAll('.ig-ac-item').forEach(el => {
      el.addEventListener('mousedown', e => {
        e.preventDefault();
        cityInput.value = el.dataset.val;
        acList.style.display = 'none';
      });
    });
  }, 280);
});

cityInput.addEventListener('blur', () => setTimeout(() => { acList.style.display = 'none'; }, 150));

document.getElementById('ig-submit').addEventListener('click', async function () {
  const city = cityInput.value.trim();
  const lieu = document.getElementById('ig-lieu') ? document.getElementById('ig-lieu').value.trim() : '';
  if (!city) { cityInput.focus(); cityInput.style.borderColor = '#ff6b6b'; return; }
  cityInput.style.borderColor = '#333';

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, lieu })
    });
    const data = await res.json();
    console.log('Réponse API:', data);

    if (document.getElementById('ig-lieu')) document.getElementById('ig-lieu').value = '';
    cityInput.value = '';
    const msg = document.getElementById('ig-success-msg');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2500);

    await load();
  } catch (e) { console.error('Erreur submit:', e); }
});

document.getElementById('ig-btn-voir').addEventListener('click', function () {
  tableauVisible = !tableauVisible;
  document.getElementById('ig-tableau').style.display = tableauVisible ? 'block' : 'none';
  this.textContent = tableauVisible ? 'MASQUER LES VILLES ▴' : 'VOIR LES VILLES PROPOSÉES ▾';
  if (tableauVisible) renderTableau();
});

document.getElementById('ig-btn-export').addEventListener('click', function () {
  const blob = new Blob([JSON.stringify(villesData, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'villes-pope.json';
  a.click();
});

load();