(function () {
  function updateHeaderHeight() {
    var header = document.getElementById('header');
    if (!header) return;

    var height = 0;
    var transform = window.getComputedStyle(header).transform;

    if (transform && transform !== 'none') {
      // DOMMatrix parse la matrice CSS correctement
      try {
        var matrix = new DOMMatrix(transform);
        // m42 = translateY — si le header est sorti par le haut, hauteur = 0
        var isHidden = matrix.m42 <= -(header.offsetHeight * 0.9);
        height = isHidden ? 0 : header.offsetHeight;
      } catch (_) {
        height = header.offsetHeight;
      }
    } else {
      height = header.offsetHeight;
    }

    document.documentElement.style.setProperty('--header-height', height + 'px');
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateHeaderHeight);
  } else {
    updateHeaderHeight();
  }

  // Resize + orientation
  var resizeRaf;
  function onResize() {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(updateHeaderHeight);
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  // Scroll (header scroll-back)
  window.addEventListener('scroll', updateHeaderHeight, { passive: true });

  // ResizeObserver sur le header
  var header = document.getElementById('header');
  if (header && 'ResizeObserver' in window) {
    new ResizeObserver(updateHeaderHeight).observe(header);
  }

  // MutationObserver (classe .shrink, style transform)
  if (header && 'MutationObserver' in window) {
    new MutationObserver(updateHeaderHeight).observe(header, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
  }
})();
