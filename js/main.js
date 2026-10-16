// =========================================
// CYCY COUTURE — Scripts communes à toutes les pages
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("header");
  const toggle = document.getElementById("menuToggle");

  // ----- Menu mobile -----
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => body.classList.remove("menu-open"));
    });
  }

  // ----- Ombre de l'en-tête au défilement -----
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // ----- Pièces signature sur la page d'accueil -----
  const featured = document.getElementById("featuredProducts");
  if (featured) {
    featured.innerHTML = PRODUCTS
      .filter(p => p.featured)
      .slice(0, 4)
      .map((p, i) => productCard(p, i, "reveal"))
      .join("");
  }

  // ----- Apparition douce des éléments -----
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // ----- Newsletter -----
  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      document.getElementById("formMsg").textContent =
        "Merci ! Vous faites désormais partie du cercle CyCy Couture.";
      form.reset();
    });
  }

  // ----- Année automatique dans le pied de page -----
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});