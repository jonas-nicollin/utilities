(function () {
  // Branche / commit à cibler : ici "main"
  const BASE = "https://cdn.jsdelivr.net/gh/jonas-nicollin/utilities@main/";

  // Liste de TOUS tes scripts utilitaires
  const scripts = [
    "header-height.js",
    "blog-category-tag-classes.js",
    // Ajoute ici les prochains :
    // "mon-autre-script.js",
    // "encore-un-plugin.js",
  ];

  const head = document.head || document.documentElement;

  scripts.forEach((file) => {
    const script = document.createElement("script");
    script.src = BASE + file;
    script.defer = true;
    head.appendChild(script);
  });
})();
