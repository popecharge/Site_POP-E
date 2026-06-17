/* =============================================
   FESTIVALS-LANG.JS — POP-E i18n switcher
   ============================================= */

const FEST_TRANSLATIONS = {
  fr: {
    nav_back:             '← Retour',
    nav_home:             'Accueil',
    nav_festivals:        'Festivals',
    hero_title:           'FESTIVALS',
    hero_title_span:      'AVEC POP-E',
    hero_desc:            'Retrouvez toutes les bornes POP-E déployées sur les festivals en France. Rechargez sans stress, capturez chaque moment.',
    stat_label_fests:     'Festivals',
    stat_label_season:    'Saison',
    stat_label_coverage:  'Couverture',
    list_title:           'Tous les festivals',
    list_count:           '12 événements • 2026',
    popup_badge:          'POP-E PRÉSENT',
    popup_dates_label:    'Dates',
    popup_address_label:  'Adresse',
    popup_genre_label:    'Genre',
    popup_bornes_label:   'Bornes POP-E',
    popup_cta:            'EN SAVOIR PLUS →',
  },
  en: {
    nav_back:             '← Back',
    nav_home:             'Home',
    nav_festivals:        'Festivals',
    hero_title:           'FESTIVALS',
    hero_title_span:      'WITH POP-E',
    hero_desc:            'Find all POP-E stations deployed at festivals across France. Charge stress-free, capture every moment.',
    stat_label_fests:     'Festivals',
    stat_label_season:    'Season',
    stat_label_coverage:  'Coverage',
    list_title:           'All festivals',
    list_count:           '12 events • 2026',
    popup_badge:          'POP-E ON SITE',
    popup_dates_label:    'Dates',
    popup_address_label:  'Address',
    popup_genre_label:    'Genre',
    popup_bornes_label:   'POP-E Stations',
    popup_cta:            'LEARN MORE →',
  }
};

const FEST_LANG_META = {
  fr: { flag: '🇫🇷', code: 'FR' },
  en: { flag: '🇬🇧', code: 'EN' },
};

let festLang = localStorage.getItem('pope-lang') || 'fr';
window.currentLang = festLang;

function festApplyLang(lang) {
  const t = FEST_TRANSLATIONS[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  document.documentElement.lang = lang;

  const meta = FEST_LANG_META[lang];
  document.getElementById('lang-flag').textContent = meta.flag;
  document.getElementById('lang-code').textContent  = meta.code;

  festLang = lang;
  window.currentLang = lang;
  localStorage.setItem('pope-lang', lang);
}

/* ── BUTTON LOGIC ── */
(function () {
  const btn      = document.getElementById('lang-btn');
  const dropdown = document.getElementById('lang-dropdown');
  if (!btn || !dropdown) return;

  function updateDropdown() {
    dropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.style.display = opt.dataset.lang === festLang ? 'none' : 'flex';
    });
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('visible');
    updateDropdown();
    dropdown.classList.toggle('visible', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });

  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      festApplyLang(opt.dataset.lang);
      updateDropdown();
      dropdown.classList.remove('visible');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('visible');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  festApplyLang(festLang);
  updateDropdown();
})();