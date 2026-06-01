/* ---------- MODALES — scope global ---------- */
function openModal(name) {
  document.getElementById('modal-' + name).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(name) {
  document.getElementById('modal-' + name).classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['stagiaires', 'ambassadeur', 'collab'].forEach(closeModal);
  }
});

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', function () {
    const img = this.querySelector('img');
    const src = img.getAttribute('src');
    if (src.includes('stagiaire')) openModal('stagiaires');
    else if (src.includes('ambassadeur')) openModal('ambassadeur');
    else if (src.includes('collab')) openModal('collab');
  });
});

/* ---------- VILLES — IIFE ---------- */
(function () {
  const STORAGE_KEY = 'pope-villes-v1';
  let villes = {};
  let tableauVisible = false;
  let debounceTimer = null;

  async function load() {
    try {
        const res = await fetch('/api/villes');
        const data = await res.json();
        villes = {};
        data.forEach(v => {
        villes[v.id] = { nom: v.nom, count: v.count, lastDate: v.last_date, emails: [] };
        });
    } catch (e) { villes = {}; }
    updateProof();
    }

  async function save(city, lieu) {
  try {
    await fetch('/api/villes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, lieu })
    });
  } catch (e) {}
}

  function updateProof() {
    const total = Object.values(villes).reduce((a, v) => a + v.count, 0);
    document.getElementById('ig-proof-text').textContent = total + ' demande(s) enregistrée(s)';
    if (tableauVisible) renderTableau();
  }

  function renderTableau() {
    const container = document.getElementById('ig-ville-list');
    const sorted = Object.entries(villes).sort((a, b) => b[1].count - a[1].count);
    if (!sorted.length) {
      container.innerHTML = '<p class="ig-empty">Aucune ville proposée pour l\'instant.</p>';
      return;
    }
    container.innerHTML = sorted.map(([, data]) => `
      <div class="ig-ville-row">
        <div>
          <div class="ig-ville-name">${data.nom}</div>
          <div class="ig-ville-meta">
            ${data.emails && data.emails.length ? data.emails.length + ' email(s)' : 'aucun email'}
            · ${new Date(data.lastDate).toLocaleDateString('fr-FR')}
          </div>
        </div>
        <span class="ig-ville-count">${data.count}</span>
      </div>
    `).join('');
  }

  const cityInput = document.getElementById('ig-city');
  const acList = document.getElementById('ig-ac-list');

  async function fetchCities(q) {
    try {
      const res = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(q)}&fields=nom,departement&boost=population&limit=6`
      );
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

  cityInput.addEventListener('blur', () => {
    setTimeout(() => { acList.style.display = 'none'; }, 150);
  });

    document.getElementById('ig-submit').addEventListener('click', async function () {
    const city = cityInput.value.trim();
    const lieu = document.getElementById('ig-lieu')?.value.trim() || '';
    if (!city) { cityInput.focus(); cityInput.style.borderColor = '#ff6b6b'; return; }
    cityInput.style.borderColor = '#333';

    await save(city, lieu); 
    await load();           

    cityInput.value = '';
    if (document.getElementById('ig-lieu')) document.getElementById('ig-lieu').value = '';
    const msg = document.getElementById('ig-success-msg');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2500);
    });

  document.getElementById('ig-btn-voir').addEventListener('click', function () {
    tableauVisible = !tableauVisible;
    document.getElementById('ig-tableau').style.display = tableauVisible ? 'block' : 'none';
    this.textContent = tableauVisible ? 'MASQUER LES VILLES ▴' : 'VOIR LES VILLES PROPOSÉES ▾';
    if (tableauVisible) renderTableau();
  });

  document.getElementById('ig-btn-export').addEventListener('click', function () {
    const blob = new Blob([JSON.stringify(villes, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'villes-pope.json';
    a.click();
  });
  document.querySelectorAll('.cs-wrap').forEach(wrap => {
  const trigger = wrap.querySelector('.cs-trigger');
  const opts    = wrap.querySelectorAll('.cs-option');

  trigger.addEventListener('mousedown', e => {
    e.preventDefault(); // empêche le focus de s'appliquer
  });

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = wrap.classList.contains('open');
    document.querySelectorAll('.cs-wrap.open').forEach(w => w.classList.remove('open'));
    if (!isOpen) wrap.classList.add('open');
  });

  opts.forEach(opt => {
    opt.addEventListener('mousedown', e => {
      e.preventDefault(); // idem pour les options
    });
    opt.addEventListener('click', () => {
      opts.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      trigger.textContent = opt.textContent;
      trigger.classList.add('has-value');
      wrap.classList.remove('open');
      wrap.dataset.value = opt.dataset.value;
    });
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.cs-wrap.open').forEach(w => w.classList.remove('open'));
});

  load();
})();