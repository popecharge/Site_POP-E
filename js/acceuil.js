// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────

const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('.plus-btn,.social-btn,#chatbot,#skip-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '20px';
    cur.style.height = '20px';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '12px';
    cur.style.height = '12px';
  });
});


// ─── INTRO SEQUENCE ──────────────────────────────────────────────────────────

let introSkipped = false;

function showNavLogo() {
  const navbar  = document.getElementById('navbar');
  const navLogo = document.getElementById('nav-logo');
  navbar.classList.add('visible');
  navLogo.style.visibility = 'visible';
  navLogo.style.opacity    = '1';
}

function runIntro() {
  const introEl     = document.getElementById('intro');
  const logoEl      = document.getElementById('intro-logo');
  const manifesteEl = document.getElementById('manifeste');
  const scene       = document.getElementById('scene');
  const phraseKey   = document.getElementById('phrase-key');
  const socialBar   = document.getElementById('social-sidebar');
  const skipBtn     = document.getElementById('skip-btn');

  phraseKey.appendChild(skipBtn);

  // 1. Logo sticker au centre
  setTimeout(() => {
    logoEl.classList.add('zoom-in');
  }, 200);

  // 2. Vol du logo vers la navbar
  setTimeout(() => {
    if (introSkipped) return;

    const navbar  = document.getElementById('navbar');
    const navLogo = document.getElementById('nav-logo');

    navbar.classList.add('visible');
    navLogo.style.visibility = 'visible';
    navLogo.style.opacity    = '0';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {

        const introRect = logoEl.getBoundingClientRect();
        const navRect   = navLogo.getBoundingClientRect();

        logoEl.style.opacity    = '0';
        logoEl.style.visibility = 'hidden';

        const clone = document.createElement('img');
        clone.src = logoEl.src;
        clone.style.cssText = `
          position: fixed;
          left: ${introRect.left}px;
          top: ${introRect.top}px;
          width: ${introRect.width}px;
          height: ${introRect.height}px;
          margin: 0; padding: 0;
          transform: none;
          transform-origin: top left;
          z-index: 9999;
          pointer-events: none;
          opacity: 1;
          transition: none;
        `;
        document.body.appendChild(clone);
        void clone.getBoundingClientRect();

        const scaleRatio = navRect.width / introRect.width;
        const targetLeft = navRect.left + (navRect.width  - introRect.width  * scaleRatio) / 2;
        const targetTop  = navRect.top  + (navRect.height - introRect.height * scaleRatio) / 2 + 10;
        const dx = targetLeft - introRect.left;
        const dy = targetTop  - introRect.top;

        clone.style.transition = 'transform 0.5s cubic-bezier(0.77, 0, 0.175, 1)';
        clone.style.transform  = `translate(${dx}px, ${dy}px) scale(${scaleRatio})`;

        setTimeout(() => {
          clone.remove();
          showNavLogo();
        }, 500);

      });
    });

  }, 1400);

  // 3. Séquence des mots
  const words = ['Recharge', 'Visibilité', 'Expérience'];
  let wDelay = 2500;

  words.forEach(word => {
    setTimeout(() => {
      if (introSkipped) return;
      manifesteEl.textContent = word;
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

  // 4. Transition vers phrase-key
  setTimeout(() => {
    if (introSkipped) return;

    introEl.style.transition = 'opacity 0.3s';
    introEl.style.opacity    = '0';

    setTimeout(() => {
      introEl.style.display = 'none';
      scene.classList.add('visible');
      socialBar.classList.add('visible');
      phraseKey.classList.add('show');

      setTimeout(() => {
        phraseKey.classList.remove('show');
        phraseKey.classList.add('hide');

        setTimeout(() => {
          phraseKey.style.display = 'none';
          triggerSlide();
        }, 850);

      }, 4000);

    }, 350);

  }, wDelay + 200);
}


// ─── SLIDE PRINCIPAL ─────────────────────────────────────────────────────────

function triggerSlide() {
  document.getElementById('text-left').classList.add('visible');
  document.getElementById('product-stage').classList.add('visible');

  setTimeout(() => {
    document.getElementById('battery-wrap').classList.add('visible');
  }, 200);

  setTimeout(() => {
    document.getElementById('borne-wrap').classList.add('visible');
  }, 400);

  setTimeout(() => {
    document.getElementById('cards-row').classList.add('visible');
  }, 700);
}


// ─── SKIP INTRO ──────────────────────────────────────────────────────────────

function skipIntro() {
  introSkipped = true;

  const skipBtn   = document.getElementById('skip-btn');
  const introEl   = document.getElementById('intro');
  const phraseKey = document.getElementById('phrase-key');

  skipBtn.style.display = 'none';

  introEl.style.transition   = 'opacity 0.3s';
  introEl.style.opacity      = '0';
  phraseKey.style.transition = 'opacity 0.3s';
  phraseKey.style.opacity    = '0';

  setTimeout(() => {
    introEl.style.display   = 'none';
    phraseKey.style.display = 'none';
  }, 300);

  showNavLogo();

  document.getElementById('scene').classList.add('visible');
  document.getElementById('social-sidebar').classList.add('visible');

  triggerSlide();
}


// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function gotoPage(page) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => {
    alert('→ Page : ' + page + '\n(Remplacez par votre URL de destination)');
    overlay.classList.remove('active');
  }, 500);
}


// ─── NEON HOVER SUR LES CARTES ───────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const batterie  = document.querySelector('.side-image.left-img');
  const borne     = document.querySelector('.side-image.right-img');
  const userCard  = document.getElementById('card-battery');
  const orgCard   = document.getElementById('card-borne');
  const brandCard = document.getElementById('card-marque');

  // Carte Utilisateur → neon batterie uniquement
  userCard.addEventListener('mouseenter', () => batterie.classList.add('neon-battery-active'));
  userCard.addEventListener('mouseleave', () => batterie.classList.remove('neon-battery-active'));

  // Carte Organisateur → neon borne uniquement
  orgCard.addEventListener('mouseenter', () => borne.classList.add('neon-borne-active'));
  orgCard.addEventListener('mouseleave', () => borne.classList.remove('neon-borne-active'));

  // Carte Marque → neon borne uniquement
  brandCard.addEventListener('mouseenter', () => borne.classList.add('neon-borne-active'));
  brandCard.addEventListener('mouseleave', () => borne.classList.remove('neon-borne-active'));
});


// ─── THEME TOGGLE ────────────────────────────────────────────────────────────

function toggleTheme() {
  document.body.classList.toggle('light-mode');
}


// ─── START ────────────────────────────────────────────────────────────────────

runIntro();