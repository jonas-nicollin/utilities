(function () {
  const updateHeaderHeight = () => {
    const header = document.getElementById('header');
    if (!header) return;

    const computedStyle = window.getComputedStyle(header);
    const transform = computedStyle.transform;
    let height = 0;

    // Vérifie si le header est visuellement caché par transform: translateY(-100%)
    const isTranslatedOut =
      transform.includes('matrix') && transform.includes('-1');

    if (!isTranslatedOut) {
      height = header.offsetHeight;
    }

    document.documentElement.style.setProperty('--header-height', `${height}px`);
  };

  // 1. Mise à jour initiale
  document.addEventListener('DOMContentLoaded', updateHeaderHeight);

  // 2. Sur redimensionnement / orientation
  let resizeTimeout;
  const onResize = () => {
    cancelAnimationFrame(resizeTimeout);
    resizeTimeout = requestAnimationFrame(updateHeaderHeight);
  };
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  // 3. Sur changement de taille dynamique
  if ('ResizeObserver' in window) {
    const header = document.getElementById('header');
    if (header) {
      const resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(header);
    }
  }

  // 4. Sur changement de classe ou style
  const header = document.getElementById('header');
  if (header && 'MutationObserver' in window) {
    const mutationObserver = new MutationObserver(updateHeaderHeight);
    mutationObserver.observe(header, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
  }

  // 5. Sur scroll (utile pour le mode Scroll Back)
  window.addEventListener('scroll', updateHeaderHeight);
})();
