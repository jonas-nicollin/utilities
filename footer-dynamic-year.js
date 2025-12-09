(function () {
  const replaceCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    if (!document.body) return;

    // Parcours tous les nœuds texte du body
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      if (text && text.includes("{{currentYear}}")) {
        node.nodeValue = text.replace(/{{currentYear}}/g, currentYear);
      }
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", replaceCurrentYear);
  } else {
    replaceCurrentYear();
  }
})();
