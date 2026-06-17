/* =============================================
   LANG.JS — POP-E i18n switcher
   ============================================= */

const TRANSLATIONS = {
  fr: {
    /* ── Banners & Nav ── */
    banner:               'Batterie Externe <span class="sep">•</span> Recharge Partout <span class="sep">•</span> Éco Responsable <span class="sep">•</span> Batterie Externe <span class="sep">•</span> Recharge Partout <span class="sep">•</span> Éco Responsable',
    nav_back:             '← Retour',
    nav_app:              'App',
    btn_download: '<img src="/img/app/telecharger.png" class="btn-icon" alt=""> Télécharger l\'appli',
    
    /* ── Comment ça marche ── */
    ccm_title: '<span class="ccm-title-white">COMMENT </span><span class="ccm-title-green">ÇA MARCHE ?</span>',
    step1_desc:           'Repérez les bornes POP-E autour de vous.',
    step2_verb:           'LOUEZ',
    step2_desc:           'Scannez le QR code, prenez une batterie.',
    step3_verb:           'RECHARGEZ',
    step3_desc:           'Rechargez tous vos appareils où que vous soyez.',
    step4_verb:           'RETOURNEZ',
    step4_desc:           "Déposez la batterie dans n'importe quelle borne du réseau.",

    /* ── Impact positif ── */
    ip_title:             'NOTRE IMPACT POSITIF',
    ip_trees:             'ARBRES PLANTÉS',
    ip_charges:           'RECHARGES EFFECTUÉES',
    ip_desc:              ' Chaque recharge compte! Les utilisateurs participent à la plantation de nouvelles Forêts en France + 1 arbre planté par borne implantés!',

    /* ── Impact qui grandit ── */
    ig_title:             'UN IMPACT<br>QUI GRANDIT<br><span>AVEC VOUS</span>',
    ig_desc:              'Chaque recharge compte.<br>Ensemble, construisons un<br>monde plus connecté et<br>plus responsable.',
    ig_btn:               'VOIR NOTRE IMPACT →',
    ig_form_title:        'ON ARRIVE CHEZ TOI ?',
    ig_form_desc:         'Dis-nous où tu veux voir une borne POP-E dans ta ville !',
    ig_city_placeholder:  'Ta ville',
    ig_lieu_placeholder:  'Ton lieu idéal (optionnel)',
    ig_success:           '✓ Demande enregistrée !',
    ig_submit:            'JE PROPOSE MA VILLE !',
    ig_btn_voir:          'VOIR LES VILLES PROPOSÉES ▾',
    ig_btn_masquer:       'MASQUER LES VILLES ▴',
    ig_tableau_title:     'VILLES PROPOSÉES',
    ig_proof_text:        (n) => `${n} demande(s) enregistrée(s)`,
    ig_empty:             "Aucune ville proposée pour l'instant.",

    /* ── Stats ── */
    stat_charges:         'recharges',
    stat_bornes:          'bornes installées',
    stat_villes:          'villes couvertes',
    stat_dechets:         'de déchets évités',

    /* ── Où trouver ── */
    ot_title:             'OÙ NOUS<br>TROUVER',
    ot_desc:              'Partout où vous vivez,<br>voyagez, sortez.',
    btn_download_ot: '<img src="/img/app/telecharger_green.png" class="btn-icon" alt=""> Télécharger l\'appli',

    /* ── Festival ── */
    fest_title1:          "T'ES UN",
    fest_title2:          'FESTIVALIER',
    fest_title3:          'HORS PAIR',     
    fest_li1:             'Trouves <strong>ta borne</strong> en festival',
    fest_li2:             'Gardes ton téléphone chargé <strong>avec toi</strong>',
    fest_li3:             'Profites <strong>à 100%</strong>',
    fest_btn:             'VOIR LES FESTIVALS →',

    /* ── Lifestyle ── */
    ls_desc:              'Le lifestyle qui recharge vos aventures.',
    ls_badge1:            'PRODUITS<br>EXCLUSIFS',
    ls_badge2:            'ÉNERGIE<br>PARTOUT',
    ls_badge3:            'STYLE<br>FESTIVAL',
    ls_btn:               'VOIR LES PRODUITS →',
    ticker_label: 'RETROUVES NOUS SUR LES<br>FESTIVALS PARTENAIRES',
    ticker_brand: 'POP-E',

    /* ── Modales — Stagiaires ── */
    modal_stage_title:    "REJOINS L'ÉQUIPE",
    modal_stage_sub:      'Stage chez POP-E',
    modal_stage_desc:     'Tu veux vivre une expérience qui charge vraiment ta carrière ? Dis-nous tout.',
    modal_stage_domain:   'Domaine de stage',
    modal_stage_submit:   'ENVOYER MA CANDIDATURE',
    domain_marketing:     'Marketing et Communication',
    domain_dev:           'Développement Web',
    domain_bizdev:        'Commercial / Business Dev',
    domain_design:        'Design / UX',
    domain_other:         'Autre',

    /* ── Modales — Ambassadeur ── */
    modal_amb_title:      'DEVIENS AMBASSADEUR',
    modal_amb_sub:        'Représente POP-E',
    modal_amb_desc:       "Tu as de l'énergie à revendre ? Deviens la voix de POP-E dans ta ville.",
    modal_amb_profile:    'Ton profil',
    modal_amb_submit:     'LANCER LA COLLAB',
    profile_creator:      'Créateur de contenu',
    profile_student:      'Étudiant actif',
    profile_fest:         'Festivalier / Événementiel',
    profile_sport:        'Sportif / Lifestyle',

    /* ── Modales — Collab ── */
    modal_collab_title:   'ON COLLABORE ?',
    modal_collab_sub:     'Partenariat et Collab',
    modal_collab_desc:    "Une idée folle ? Un projet commun ? On est chauds pour en parler.",
    modal_collab_type:    'Type de collab',
    modal_collab_submit:  'DEVENIR PARTENAIRE',
    collab_event:         'Événement / Festival',
    collab_brand:         'Marque / Co-branding',
    collab_media:         'Média / Presse',
    collab_tech:          'Technologie / Startup',

    /* ── Placeholders communs ── */
    placeholder_firstname:   'Ton prénom',
    placeholder_lastname:    'Ton nom',
    placeholder_email:       'Ton email',
    placeholder_email_pro:   'Ton email pro',
    placeholder_school:      'Ton école / université',
    placeholder_phone:       'Ton numéro de téléphone',
    placeholder_city:        'Ta ville',
    placeholder_social:      'Ton Instagram / TikTok',
    placeholder_company:     'Ton entreprise / marque',
    placeholder_stage_why:   'Pourquoi POP-E ? Raconte-nous...',
    placeholder_amb_why:     "Quelles sont tes motivations pour rejoindre l'équipe d'ambassadeurs?",
    placeholder_collab_desc: 'Décris ton projet de collab...',

    /* ── Footer ── */
    footer_tagline:       'La batterie externe en libre-service.<br>Partout. Tout le temps.',
    footer_col1_title:    'Solution',
    footer_how:           'Comment ça marche',
    footer_where:         'Où utiliser POP-E',
    footer_ambassador:    'Ambassadeur',
    footer_col2_title:    'Entreprise',
    footer_about:         'À propos',
    footer_impact:        'Impact',
    footer_press:         'Presse',
    footer_col3_title:    'Contact',
    footer_contact:       'Nous contacter',
    footer_install:       'Installer une borne',
    footer_support:       'Support',
    footer_rights:        '© 2026 POP-E. Tous droits réservés.',
    footer_legal1:        'Mentions légales',
    footer_cgu:           'CGU',
    footer_privacy:       'Confidentialité',
  },

  en: {
    /* ── Banners & Nav ── */
    banner:               'External Battery <span class="sep">•</span> Charge Anywhere <span class="sep">•</span> Eco Responsible <span class="sep">•</span> External Battery <span class="sep">•</span> Charge Anywhere <span class="sep">•</span> Eco Responsible',
    nav_back:             '← Back',
    nav_app:              'App',
    btn_download: '<img src="/img/app/telecharger.png" class="btn-icon" alt=""> Download the app',
    /* ── How it works ── */
    ccm_title: '<span class="ccm-title-white">HOW </span><span class="ccm-title-green">IT WORKS</span>',    
    step1_verb:           'FIND',
    step1_desc:           'Locate POP-E stations near you.',
    step2_verb:           'RENT',
    step2_desc:           'Scan the QR code, grab a battery.',
    step3_verb:           'CHARGE',
    step3_desc:           'Power all your devices wherever you are.',
    step4_verb:           'RETURN',
    step4_desc:           'Drop the battery at any station in the network.',

    /* ── Positive impact ── */
    ip_title:             'OUR POSITIVE IMPACT',
    ip_trees:             'TREES PLANTED',
    ip_charges:           'CHARGES COMPLETED',
    ip_desc: 'Every charge counts! Users help plant new forests in France + 1 tree planted per station installed!',
    /* ── Growing impact ── */
    ig_title:              'AN IMPACT<br>THAT GROWS<br><span>WITH YOU</span>',
    ig_desc:              "Every charge counts.<br>Together, let's build a<br>more connected and<br>more responsible world.",
    ig_btn:               'SEE OUR IMPACT →',
    ig_form_title:        'COMING TO YOUR CITY?',
    ig_form_desc:         "Tell us where you'd like to see a POP-E station in your city!",
    ig_city_placeholder:  'Your city',
    ig_lieu_placeholder:  'Your ideal spot (optional)',
    ig_success:           '✓ Request recorded!',
    ig_submit:            'I SUGGEST MY CITY!',
    ig_btn_voir:          'SEE SUGGESTED CITIES ▾',
    ig_btn_masquer:       'HIDE CITIES ▴',
    ig_tableau_title:     'SUGGESTED CITIES',
    ig_proof_text:        (n) => `${n} request(s) recorded`,
    ig_empty:             'No cities suggested yet.',

    /* ── Stats ── */
    stat_charges:         'charges',
    stat_bornes:          'stations installed',
    stat_villes:          'cities covered',
    stat_dechets:         'of waste avoided',

    /* ── Where to find ── */
    ot_title:             'WHERE TO<br>FIND US',
    ot_desc:              'Wherever you live,<br>travel, go out.',
    btn_download_ot: '<img src="/img/app/telecharger_green.png" class="btn-icon" alt=""> Download the app',

    /* ── Festival ── */
    fest_title1:          "YOU'RE A",
    fest_title2:          'FESTIVAL',
    fest_title3:          'SUPER FAN',
    fest_li1:             'Find <strong>your station</strong> at the festival',
    fest_li2:             'Keep your phone charged <strong>with you</strong>',
    fest_li3:             'Enjoy it <strong>100%</strong>',
    fest_btn:             'SEE FESTIVALS →',

    /* ── Lifestyle ── */
    ls_desc:              'The lifestyle that powers your adventures.',
    ls_badge1:            'EXCLUSIVE<br>PRODUCTS',
    ls_badge2:            'ENERGY<br>EVERYWHERE',
    ls_badge3:            'FESTIVAL<br>STYLE',
    ls_btn:               'SEE PRODUCTS →',
    ticker_label: 'FIND US AT<br>PARTNER FESTIVALS',
    ticker_brand: 'POP-E',

    /* ── Modals — Interns ── */
    modal_stage_title:    'JOIN THE TEAM',
    modal_stage_sub:      'Internship at POP-E',
    modal_stage_desc:     'Want to live an experience that truly charges your career? Tell us everything.',
    modal_stage_domain:   'Internship field',
    modal_stage_submit:   'SEND MY APPLICATION',
    domain_marketing:     'Marketing & Communications',
    domain_dev:           'Web Development',
    domain_bizdev:        'Sales / Business Dev',
    domain_design:        'Design / UX',
    domain_other:         'Other',

    /* ── Modals — Ambassador ── */
    modal_amb_title:      'BECOME AN AMBASSADOR',
    modal_amb_sub:        'Represent POP-E',
    modal_amb_desc:       "Got energy to spare? Become the voice of POP-E in your city.",
    modal_amb_profile:    'Your profile',
    modal_amb_submit:     'START THE COLLAB',
    profile_creator:      'Content Creator',
    profile_student:      'Active Student',
    profile_fest:         'Festival-goer / Events',
    profile_sport:        'Sports / Lifestyle',

    /* ── Modals — Collab ── */
    modal_collab_title:   'SHALL WE COLLABORATE?',
    modal_collab_sub:     'Partnership & Collab',
    modal_collab_desc:    "A wild idea? A shared project? We're fired up to talk about it.",
    modal_collab_type:    'Type of collab',
    modal_collab_submit:  'BECOME A PARTNER',
    collab_event:         'Event / Festival',
    collab_brand:         'Brand / Co-branding',
    collab_media:         'Media / Press',
    collab_tech:          'Technology / Startup',

    /* ── Common placeholders ── */
    placeholder_firstname:   'Your first name',
    placeholder_lastname:    'Your last name',
    placeholder_email:       'Your email',
    placeholder_email_pro:   'Your professional email',
    placeholder_school:      'Your school / university',
    placeholder_phone:       'Your phone number',
    placeholder_city:        'Your city',
    placeholder_social:      'Your Instagram / TikTok',
    placeholder_company:     'Your company / brand',
    placeholder_stage_why:   'Why POP-E? Tell us...',
    placeholder_amb_why:     'What motivates you to join the ambassador team?',
    placeholder_collab_desc: 'Describe your collab project...',

    /* ── Footer ── */
    footer_tagline:       'The self-service external battery.<br>Everywhere. All the time.',
    footer_col1_title:    'Solution',
    footer_how:           'How it works',
    footer_where:         'Where to use POP-E',
    footer_ambassador:    'Ambassador',
    footer_col2_title:    'Company',
    footer_about:         'About us',
    footer_impact:        'Impact',
    footer_press:         'Press',
    footer_col3_title:    'Contact',
    footer_contact:       'Contact us',
    footer_install:       'Install a station',
    footer_support:       'Support',
    footer_rights:        '© 2026 POP-E. All rights reserved.',
    footer_legal1:        'Legal notice',
    footer_cgu:           'Terms of use',
    footer_privacy:       'Privacy',
  }
};

/* ── Flags & labels per lang ── */
const LANG_META = {
  fr: { flag: '🇫🇷', code: 'FR' },
  en: { flag: '🇬🇧', code: 'EN' },
};

/* ── Current lang (persisted) ── */
let currentLang = localStorage.getItem('pope-lang') || 'fr';
window.currentLang = currentLang;

/* ── Apply translations to the DOM ── */
function applyLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  /* 1. text nodes via data-i18n */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined && typeof t[key] === 'string') {
      el.innerHTML = t[key];
    }
  });

  /* 2. placeholders via data-i18n-placeholder */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  /* 3. Update <html lang> */
  document.documentElement.lang = lang;

  /* 4. Update button UI */
  const meta = LANG_META[lang];
  document.getElementById('lang-flag').textContent = meta.flag;
  document.getElementById('lang-code').textContent  = meta.code;

  /* 5. Sync proof text with live count */
  syncProofText(lang);

  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem('pope-lang', lang);
   // Hero desktop (background-image sur #intro)
  // Hero desktop (background-image sur #intro)
  const intro = document.getElementById('intro');
const introImage = document.getElementById('intro-image');

if (intro) {
  const w = window.innerWidth;
  if (w < 600) {
    intro.style.backgroundImage = lang === 'en'
      ? "url('/img/app/app-telephoneEN.png')"
      : "url('/img/app/app-telephone.png')";
  } else if (w < 768) {
    intro.style.backgroundImage = lang === 'en'
      ? "url('/img/app/app-(max-width-767px)_EN.png')"
      : "url('/img/app/app-(max-width-767px).png')";
  } else if (w < 1200) {
    intro.style.backgroundImage = lang === 'en'
      ? "url('/img/app/app_tablette_En.png')"
      : "url('/img/app/app_tablette.png')";
  } else {
    intro.style.backgroundImage = '';
  }

}

// Change l'image utilisateurs (desktop uniquement)
if (introImage) {
  introImage.src = lang === 'en'
    ? '/img/app/utilisateurs_eng.png'
    : '/img/app/utilisateurs.png';
}

  }

window.addEventListener('resize', () => applyLang(currentLang));
/* ── Sync the proof text (called after load() in ig-form too) ── */
function syncProofText(lang) {
  const proofEl = document.getElementById('ig-proof-text');
  if (!proofEl) return;
  const count = parseInt(proofEl.dataset.count || '0', 10);
  const fn = TRANSLATIONS[lang]?.ig_proof_text;
  if (typeof fn === 'function') proofEl.textContent = fn(count);
}

/* ── Expose helper so ig-form.js can update proof text in current lang ── */
window.updateProofText = function(count) {
  const proofEl = document.getElementById('ig-proof-text');
  if (!proofEl) return;
  proofEl.dataset.count = count;
  syncProofText(currentLang);
};

/* ── Expose current lang getter ── */
window.getCurrentLang = function() { return currentLang; };

/* =============================================
   BUTTON LOGIC
   ============================================= */
(function () {
  const btn      = document.getElementById('lang-btn');
  const dropdown = document.getElementById('lang-dropdown');

  if (!btn || !dropdown) return;

  /* Hide the currently active lang option, show the other */
  function updateDropdown() {
    dropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.style.display = opt.dataset.lang === currentLang ? 'none' : 'flex';
    });
  }

  /* Toggle dropdown */
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('visible');
    updateDropdown();
    dropdown.classList.toggle('visible', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });

  /* Click on an option */
  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      applyLang(lang);
      updateDropdown();
      dropdown.classList.remove('visible');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('visible');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
  

  /* Init on load */
  applyLang(currentLang);
  updateDropdown();
})();