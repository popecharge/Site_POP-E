    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentFlag = document.getElementById('currentFlag');
    const currentCode = document.getElementById('currentCode');

    const LANGS = {
      fr: { flag: '🇫🇷', code: 'FR' },
      en: { flag: '🇬🇧', code: 'EN' }
    };

    let currentLang = localStorage.getItem('selectedLanguage') || 'fr';

    function applyLanguage(lang) {
      document.querySelectorAll('[data-fr]').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (val !== null) el.innerHTML = val;
      });
      document.documentElement.lang = lang;
    }

    function updateButton(lang) {
      currentFlag.textContent = LANGS[lang].flag;
      currentCode.textContent = LANGS[lang].code;
    }

    function updateDropdown(lang) {
      langDropdown.innerHTML = '';
      Object.entries(LANGS).forEach(([key, info]) => {
        if (key === lang) return;
        const opt = document.createElement('div');
        opt.className = 'lang-option';
        opt.setAttribute('role', 'option');
        opt.setAttribute('data-lang', key);
        opt.innerHTML = `<span class="lang-flag">${info.flag}</span><span>${info.code}</span>`;
        opt.addEventListener('click', () => switchLang(key));
        langDropdown.appendChild(opt);
      });
    }

    function switchLang(lang) {
      currentLang = lang;
      applyLanguage(lang);
      updateButton(lang);
      updateDropdown(lang);
      closeDropdown();
    }

    function openDropdown() {
      langDropdown.classList.add('visible');
      langBtn.classList.add('open');
      langBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      langDropdown.classList.remove('visible');
      langBtn.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }

    function switchLang(lang) {
      currentLang = lang;

      localStorage.setItem('selectedLanguage', lang);

      applyLanguage(lang);
      updateButton(lang);
      updateDropdown(lang);
      closeDropdown();
    }

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.contains('visible') ? closeDropdown() : openDropdown();
    });

    document.addEventListener('click', closeDropdown);
    langDropdown.addEventListener('click', (e) => e.stopPropagation());

    // Initialisation
    applyLanguage(currentLang);
    updateButton(currentLang);
    updateDropdown(currentLang);