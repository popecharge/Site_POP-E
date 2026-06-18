
/* ─── INTRO ─── */
let introSkipped = false;

function showNavLogo() {
  const navbar  = document.getElementById('navbar');
  const navLogo = document.getElementById('nav-logo');
  navbar.style.opacity         = '1';
  navLogo.style.visibility     = 'visible';
  navLogo.style.opacity        = '1';
}

function runIntro() {
  const introEl     = document.getElementById('intro');
  const logoEl      = document.getElementById('intro-logo');
  const manifesteEl = document.getElementById('manifeste');
  const phraseKey   = document.getElementById('phrase-key');
  const skipBtn     = document.getElementById('skip-btn');
  skipBtn.style.opacity    = '1';
  skipBtn.style.visibility = 'visible';
  skipBtn.style.display    = 'flex';
  skipBtn.style.zIndex     = '99999';
  skipBtn.style.position   = 'fixed';
 

  // 1. Logo sticker
  setTimeout(() => { logoEl.classList.add('zoom-in'); }, 200);
  // 2. Vol du logo vers la navbar
  setTimeout(() => {
    if (introSkipped) return;

    const navbar  = document.getElementById('navbar');
    const navLogo = document.getElementById('nav-logo');
    navbar.style.opacity     = '1';
    navLogo.style.visibility = 'visible';
    navLogo.style.opacity    = '0';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const introRect = logoEl.getBoundingClientRect();
      const navRect   = navLogo.getBoundingClientRect();

      logoEl.style.opacity    = '0';
      logoEl.style.visibility = 'hidden';

      const clone = document.createElement('img');
      clone.src = logoEl.src;
      clone.style.cssText = `
        position:fixed; left:${introRect.left}px; top:${introRect.top}px;
        width:${introRect.width}px; height:${introRect.height}px;
        margin:0; padding:0; transform:none; transform-origin:top left;
        z-index:9999; pointer-events:none; opacity:1; transition:none;
      `;
      document.body.appendChild(clone);
      void clone.getBoundingClientRect();

      const scaleRatio = navRect.width / introRect.width;
      const targetLeft = navRect.left + (navRect.width  - introRect.width  * scaleRatio) / 2;
      const targetTop  = navRect.top  + (navRect.height - introRect.height * scaleRatio) / 2 + 10;

      clone.style.transition = 'transform .5s cubic-bezier(.77,0,.175,1)';
      clone.style.transform  = `translate(${targetLeft - introRect.left}px, ${targetTop - introRect.top}px) scale(${scaleRatio})`;

      setTimeout(() => { clone.remove(); showNavLogo(); }, 500);
    }));
  }, 1400);

  // 3. Séquence des mots
  let wDelay = 2500;
  [0, 1, 2].forEach(i => {
    setTimeout(() => {
      if (introSkipped) return;
      manifesteEl.textContent = translations[currentLang].manifeste_words[i];
      manifesteEl.classList.remove('sticker-in', 'sticker-out');
      void manifesteEl.offsetWidth;
      manifesteEl.classList.add('sticker-in');
    }, wDelay);
    setTimeout(() => {
      if (introSkipped) return;
      manifesteEl.classList.remove('sticker-in');
      void manifesteEl.offsetWidth;
      manifesteEl.classList.add('sticker-out');
    }, wDelay + 1200);
    wDelay += 1600;
  });

  // 4. Transition vers phrase-key puis hero
  setTimeout(() => {
    if (introSkipped) return;
    introEl.style.transition = 'opacity .3s';
    introEl.style.opacity    = '0';
    setTimeout(() => {
      introEl.style.display = 'none';
      document.getElementById('hero').style.opacity = '1';
      phraseKey.classList.add('show');
      setTimeout(() => {
        phraseKey.classList.remove('show');
        phraseKey.classList.add('hide');
        setTimeout(() => {
          phraseKey.style.display = 'none';
          skipBtn.style.display = 'none';
          triggerHero();
        }, 850);
      }, 4000);
    }, 350);
  }, wDelay + 200);
}

function triggerHero() {
  document.getElementById('hero-text').classList.add('visible');
  setTimeout(() => document.getElementById('features-strip').classList.add('visible'), 200);
  setTimeout(() => document.getElementById('stats-box').classList.add('visible'),     400);

  const social = document.getElementById('social-sidebar');
  if (social) {
    social.style.visibility = 'visible';
    social.style.opacity    = '1';
  }
}

function skipIntro() {
  introSkipped = true;
  const skipBtn   = document.getElementById('skip-btn');
  const introEl   = document.getElementById('intro');
  const phraseKey = document.getElementById('phrase-key');

  skipBtn.style.display = 'none';
  introEl.style.transition   = 'opacity .3s'; introEl.style.opacity   = '0';
  phraseKey.style.transition = 'opacity .3s'; phraseKey.style.opacity = '0';

  setTimeout(() => { introEl.style.display = 'none'; phraseKey.style.display = 'none'; }, 300);

  showNavLogo();
  document.getElementById('hero').style.opacity = '1';
  triggerHero();
}

/* ─── NAVIGATION ─── */
function gotoPage(url) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 500);
}

/* ─── NEON HOVER ON USE CARDS ─── */
document.addEventListener('DOMContentLoaded', () => {
  const imgBat  = document.getElementById('img-batterie');
  const imgBorn = document.getElementById('img-borne');

  const cardUser  = document.getElementById('use-card-user');
  const cardBorne = document.getElementById('use-card-borne');
  const cardMarq  = document.getElementById('use-card-marque');

  if (cardUser) {
    cardUser.addEventListener('mouseenter', () => imgBat  && imgBat.classList.add('neon-battery-active'));
    cardUser.addEventListener('mouseleave', () => imgBat  && imgBat.classList.remove('neon-battery-active'));
  }
  if (cardBorne) {
    cardBorne.addEventListener('mouseenter', () => imgBorn && imgBorn.classList.add('neon-borne-active'));
    cardBorne.addEventListener('mouseleave', () => imgBorn && imgBorn.classList.remove('neon-borne-active'));
  }
  if (cardMarq) {
    cardMarq.addEventListener('mouseenter', () => imgBorn && imgBorn.classList.add('neon-borne-active'));
    cardMarq.addEventListener('mouseleave', () => imgBorn && imgBorn.classList.remove('neon-borne-active'));
  }

  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ─── skipIntro via URL param ─── */
  if (new URLSearchParams(window.location.search).get('skipIntro') === 'true') skipIntro();
});

/* ─── LANGUAGE ─── */
const translations = {
  fr: {
    manifeste_words: ['Recharge', 'Visibilité', 'Expérience'],
    phrase_key: 'POP-E transforme chaque lieu<br>en point d\'<span class="g">énergie</span> et de visibilité.',
    phrase_sub: 'Batteries en libre-service. Écrans utiles. Impact réel.',
    skip: 'PASSER ↓',
    hero_title: '<span class="green">Chargez<br></span> Diffusez<br> <span class="green">Impactez</span>',
    hero_sub: 'Le réseau de bornes intelligentes qui recharge<br>vos visiteurs et transforme chaque lieu en <br>espace de communication à forte visibilité.',    stats: ['+50 000', '+200 000', '8', 'Partout'],
    stats_labels: ['Recharges Effectuées', 'interactions visiteurs', 'Espaces Pub par Borne', 'Festivals · Villes · Commerces'],
    section_title: 'UNE SOLUTION. <span>TROIS EXPÉRIENCES</span>',
    section_sub: 'Une seule technologie. Des possibilités infinies. Découvrez l\'expérience POP-E pensée pour votre univers.',
    cards: [
      { title: 'Offrir <br><span class="keyword">un service </span><br>indispensable', desc: 'Proposez un service que vos visiteurs utiliseront réellement tout en créant une nouvelle source de revenus et un support de communication pour votre événement ou votre établissement.', items: ['Recharge mobile en libre-service','Installation rapide et autonome','Revenus publicitaires partagés','Expérience visiteur renforcée'], cta: 'Découvrir la solution →' },
      { title: 'Capter <br><span class="keyword">l\'attention </span><br>au bon moment', desc: 'Diffusez votre message sur un média physique innovant, au cœur de l\'expérience visiteur, lorsque votre audience est la plus disponible et la plus engagée.', items: ['Audience qualifiée et captive','Exclusivité par secteur','Diffusion en continu','Impact mémorable'], cta: 'Découvrir les opportunités →' },
      { title: 'Restez <br><span class="keyword"></span>connecté<br>partout', desc: 'Votre batterie s\'arrête. Pas votre journée. Avec POP-E, restez connecté et profitez de chaque instant, où que vous soyez.', items: ['En moins de 30 secondes','Sans chercher une prise','Liberté totale de mouvement','Disponible partout'], cta: 'Découvrir l\'expérience →' }
    ],
    why_title: 'POURQUOI CHOISIR <span>POP-E</span> ?',
    why: [
      { title: 'Zéro Investissement', desc: 'Aucun coût pour les organisateurs*' },
      { title: 'Installation Rapide', desc: 'Moins de 20 minutes' },
      { title: 'Batteries Toujours Chargées', desc: 'Disponibilité 24/7' },
      { title: 'Données & Stats', desc: 'Suivez l\'utilisation en temps réel' },
      { title: 'Sécurisé & Fiable', desc: 'Batteries sécurisées et assurées' }
    ],
    partners_title: 'Ils nous font déjà confiance pour enrichir l\'expérience de leurs visiteurs.',
    partners_note: 'Et plus de 150 partenaires à travers la France.',
    ticker_label: 'RETROUVES NOUS SUR LES<br>FESTIVALS PARTENAIRES',
    cta_title: 'Et si votre lieu devenait le prochain<br><span>point de connexion POP-E ?</span>',
    cta_sub: 'Rejoignez le réseau POP-E et faites de votre lieu un espace incontournable.',
    cta_btn1: 'Recevoir mon projet personnalisé →',
    cta_btn2: 'Nous contacter',
    footer_desc: 'Le réseau de bornes intelligentes qui recharge vos visiteurs et transforme chaque lieu en espace de visibilité.',
    footer_cols: [
      { title: 'Solution', links: [['Installer une borne','pro/pro.html'],['Diffuser ma marque','marques/marques.html'],['Recharger mon téléphone','utilisateurs/utilisateurs.html']] },
      { title: 'Découvrir', links: [['Festivals partenaires','utilisateurs/festivals.html'],['Boutique','utilisateurs/boutique.html']] },
      { title: 'Contact', links: [['Instagram','https://www.instagram.com/pope.charge/'],['TikTok','https://www.tiktok.com/@pope.charge/'],['+33 6 18 15 88 80','tel:+33618158880']] }
    ],
    footer_rights: '© 2026 POP-E. Tous droits réservés.',
    footer_legal: [['Mentions légales','/legal/mentions-legales.html'],['CGU','/legal/cgu.html'],['Confidentialité','/legal/confidentialite.html']]
  },
  en: {
    manifeste_words: ['Recharge', 'Visibility', 'Experience'],
    phrase_key: 'POP-E turns every venue<br>into an <span class="g">energy</span> and visibility hub.',
    phrase_sub: 'Self-service batteries. Smart screens. Real impact.',
    skip: 'SKIP ↓',
    hero_title: '<span class="green">Charge<br></span> Broadcast<br> <span class="green">Impact</span>',
    hero_sub: 'The smart charging network that powers your visitors<br>and turns every venue into a<br>high-visibility communication space.',    stats: ['+50,000', '+200,000', '8', 'Everywhere'],
    stats_labels: ['Charges Completed', 'visitor interactions', 'Ad Spaces per Station', 'Festivals · Cities · Stores'],
    section_title: 'ONE SOLUTION. <span>THREE EXPERIENCES</span>',
    section_sub: 'One technology. Endless possibilities. Discover the POP-E experience designed for your world.',
    cards: [
      { title: 'Offer <br><span class="keyword">an essential </span><br>service', desc: 'Provide a service your visitors will actually use, while creating a new revenue stream and a communication platform for your event or venue.', items: ['Self-service mobile charging','Quick and autonomous setup','Shared ad revenue','Enhanced visitor experience'], cta: 'Discover the solution →' },
      { title: 'Capture <br><span class="keyword">attention </span><br>at the right moment', desc: 'Broadcast your message on an innovative physical medium, at the heart of the visitor experience, when your audience is most available and engaged.', items: ['Qualified and captive audience','Sector exclusivity','Continuous broadcast','Memorable impact'], cta: 'Discover the opportunities →' },
      { title: 'Stay <br><span class="keyword"></span>connected<br>everywhere', desc: 'Your battery dies. Your day doesn\'t. With POP-E, stay connected and enjoy every moment, wherever you are.', items: ['In under 30 seconds','No outlet needed','Total freedom of movement','Available everywhere'], cta: 'Discover the experience →' }
    ],
    why_title: 'WHY CHOOSE <span>POP-E</span>?',
    why: [
      { title: 'Zero Investment', desc: 'No cost for organizers*' },
      { title: 'Quick Setup', desc: 'Less than 20 minutes' },
      { title: 'Always Charged', desc: '24/7 availability' },
      { title: 'Data & Stats', desc: 'Track usage in real time' },
      { title: 'Safe & Reliable', desc: 'Secured and insured batteries' }
    ],
    partners_title: 'They already trust us to enrich their visitors\' experience.',
    partners_note: 'And more than 150 partners across France.',
    ticker_label: 'FIND US AT<br>PARTNER FESTIVALS',
    cta_title: 'What if your venue became the next<br><span>POP-E connection point?</span>',
    cta_sub: 'Join the POP-E network and make your venue a must-visit destination.',
    cta_btn1: 'Get my personalized project →',
    cta_btn2: 'Contact us',
    footer_desc: 'The smart charging network that powers your visitors and turns every venue into a visibility space.',
    footer_cols: [
      { title: 'Solution', links: [['Install a station','pro/pro.html'],['Broadcast my brand','marques/marques.html'],['Charge my phone','utilisateurs/app.html']] },
      { title: 'Discover', links: [['Partner festivals','utilisateurs/festivals.html'],['Shop','utilisateurs/boutique.html']] },
      { title: 'Contact', links: [['Instagram','https://www.instagram.com/pope.charge/'],['TikTok','https://www.tiktok.com/@pope.charge/'],['Call us','tel:+33618158880']] }
    ],
    footer_rights: '© 2026 POP-E. All rights reserved.',
    footer_legal: [['Legal notice','/legal/mentions-legales.html'],['Terms','/legal/cgu.html'],['Privacy','/legal/confidentialite.html']]
  }
};

window.currentLang = localStorage.getItem('pope-lang') || 'fr';

const langBtn      = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentFlag  = document.getElementById('currentFlag');
const currentCode  = document.getElementById('currentCode');
const LANGS = { fr: { flag: '🇫🇷', code: 'FR' }, en: { flag: '🇬🇧', code: 'EN' } };

function applyLang(lang) {
  const t = translations[lang];

  // Intro & hero
  document.querySelector('#phrase-key h2').innerHTML = t.phrase_key;
  document.querySelector('#phrase-key p').textContent = t.phrase_sub;
  document.getElementById('hero-h1').innerHTML = t.hero_title;
  document.getElementById('hero-p').innerHTML = t.hero_sub;
  document.getElementById('skip-btn').textContent = t.skip;

  // Stats
  document.querySelectorAll('.stat-value').forEach((el, i) => { if (t.stats[i]) el.textContent = t.stats[i]; });
  document.querySelectorAll('.stat-label').forEach((el, i) => { if (t.stats_labels[i]) el.textContent = t.stats_labels[i]; });

  // Section use
  document.querySelector('#section-use h2').innerHTML = t.section_title;
  document.querySelector('#section-use .section-sub').textContent = t.section_sub;

  // Cards
  document.querySelectorAll('.use-card').forEach((card, i) => {
    const c = t.cards[i];
    if (!c) return;
    card.querySelector('.use-card-title-overlay h3').innerHTML = c.title;
    card.querySelector('.use-card-body p').textContent = c.desc;
    card.querySelectorAll('.use-check-list li').forEach((li, j) => { if (c.items[j]) li.textContent = c.items[j]; });
    card.querySelector('.use-card-cta').textContent = c.cta;
  });

  // Why
  document.querySelector('#section-why h2').innerHTML = t.why_title;
  document.querySelectorAll('.why-item').forEach((item, i) => {
    const w = t.why[i];
    if (!w) return;
    item.querySelector('h4').textContent = w.title;
    item.querySelector('p').textContent = w.desc;
  });

  // Partners
  document.querySelector('#section-partners .section-title-sm').textContent = t.partners_title;
  document.querySelector('.partners-note').textContent = t.partners_note;
  const tickerLabel = document.querySelector('#ls-ticker-label div div:first-child');
  if (tickerLabel) tickerLabel.innerHTML = t.ticker_label;

  // CTA
  document.querySelector('.cta-left h2').innerHTML = t.cta_title;
  document.querySelector('.cta-right p').textContent = t.cta_sub;
  const ctaBtns = document.querySelectorAll('.cta-right .btn-cta-primary, .cta-right .btn-cta-secondary');
  if (ctaBtns[0]) ctaBtns[0].textContent = t.cta_btn1;
  if (ctaBtns[1]) ctaBtns[1].textContent = t.cta_btn2;

  // Footer
  document.querySelector('#footer-brand p').textContent = t.footer_desc;
  document.querySelectorAll('.footer-col').forEach((col, i) => {
    const fc = t.footer_cols[i];
    if (!fc) return;
    col.querySelector('h4').textContent = fc.title;
    col.querySelectorAll('a').forEach((a, j) => {
      if (fc.links[j]) { a.textContent = fc.links[j][0]; a.href = fc.links[j][1]; }
    });
  });
  document.querySelector('#footer-bottom span').textContent = t.footer_rights;
  document.querySelectorAll('#footer-legal a').forEach((a, i) => {
    if (t.footer_legal[i]) { a.textContent = t.footer_legal[i][0]; a.href = t.footer_legal[i][1]; }
  });
}

function updateLangButton(lang) {
  currentFlag.textContent = LANGS[lang].flag;
  currentCode.textContent = LANGS[lang].code;
}

function updateLangDropdown(lang) {
  langDropdown.innerHTML = '';
  Object.entries(LANGS).forEach(([key, info]) => {
    if (key === lang) return;
    const opt = document.createElement('div');
    opt.className = 'lang-option';
    opt.setAttribute('data-lang', key);
    opt.innerHTML = `<span class="lang-flag">${info.flag}</span><span>${info.code}</span>`;
    opt.addEventListener('click', () => switchLang(key));
    langDropdown.appendChild(opt);
  });
}

function switchLang(lang) {
  window.currentLang = lang;
  localStorage.setItem('pope-lang', lang);
  applyLang(lang);
  updateLangButton(lang);
  updateLangDropdown(lang);
  closeLangDropdown();
}

function openLangDropdown()  { langDropdown.classList.add('visible');    langBtn.classList.add('open'); }
function closeLangDropdown() { langDropdown.classList.remove('visible'); langBtn.classList.remove('open'); }

langBtn.addEventListener('click', e => {
  e.stopPropagation();
  langDropdown.classList.contains('visible') ? closeLangDropdown() : openLangDropdown();
});
document.addEventListener('click', closeLangDropdown);
langDropdown.addEventListener('click', e => e.stopPropagation());
/* ── Fan cards ── */
const cards = document.querySelectorAll('.use-card-outer');

cards.forEach((card, i) => {
  card.addEventListener('click', () => {
    const isAlreadyActive = card.classList.contains('active');

    // Reset tout
    cards.forEach(c => {
      c.classList.remove('active', 'inactive-left', 'inactive-right');
    });

    if (!isAlreadyActive) {
      card.classList.add('active');

      cards.forEach((c, j) => {
        if (c === card) return;
        // Les cartes à gauche de l'active → inactive-left
        // Les cartes à droite → inactive-right
        if (j < i) {
          c.classList.add('inactive-left');
        } else {
          c.classList.add('inactive-right');
        }
      });
    }
  });
});
// Init
const savedLang = localStorage.getItem('pope-lang') || 'fr';
updateLangButton(savedLang);
updateLangDropdown(savedLang);
applyLang(savedLang);
runIntro();