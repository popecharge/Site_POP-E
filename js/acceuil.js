const ids = ['users', 'pro', 'marques'];

function togglePanel(id) {
  const panel = document.getElementById('panel-' + id);
  const icon  = document.getElementById('icon-' + id);
  const btn   = icon.closest('.toggle-btn');
  const isOpen = panel.classList.contains('open');

  ids.forEach(function(otherId) {
    if (otherId !== id) {
      const otherPanel = document.getElementById('panel-' + otherId);
      const otherIcon  = document.getElementById('icon-' + otherId);
      const otherBtn   = otherIcon.closest('.toggle-btn');
      otherPanel.classList.remove('open');
      otherIcon.src = '/img/plus.png'; // Vérifie bien ce chemin
      otherBtn.setAttribute('aria-expanded', 'false');
    }
  });

  if (isOpen) {
    panel.classList.remove('open');
    icon.src = '/img/plus.png';
    btn.setAttribute('aria-expanded', 'false');
  } else {
    panel.classList.add('open');
    icon.src = '/img/moins.png'; // Vérifie bien ce chemin
    btn.setAttribute('aria-expanded', 'true');
  }
}