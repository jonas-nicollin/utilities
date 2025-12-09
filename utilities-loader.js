(function () {
  // Base CDN pour tous tes fichiers du repo "utilities"
  const BASE = "https://cdn.jsdelivr.net/gh/jonas-nicollin/utilities/";

  // Liste de TOUS tes scripts utilitaires
  const scripts = [
    "header-height.js",
    "blog-category-tag-classes.js",
    // Ajoute ici les prochains :
    // "autre-script.js",
    // "mon-plugin.js",
  ];

  const head = document.head || document.documentElement;

  scripts.forEach((file) => {
    const script = document.createElement("script");
    script.src = BASE + file;
    script.async = false; // garde l'ordre de chargement
    head.appendChild(script);
  });
})();
