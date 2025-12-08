/* Add categories and tags to body in blog posts */
(function() {
  document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    if (!body) return;

    const categories = document.querySelectorAll(".blog-item-category");
    const tags = document.querySelectorAll(".blog-item-tag");

    const normalizeString = (str) => {
      return str
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    };

    categories.forEach((category) => {
      const categoryName = normalizeString(
        category.textContent.trim().toLowerCase()
      );
      body.classList.add(`category-${categoryName}`);
    });

    tags.forEach((tag) => {
      const tagName = normalizeString(tag.textContent.trim().toLowerCase());
      body.classList.add(`tag-${tagName}`);
    });
  });
})();
