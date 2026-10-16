// =========================================
// CYCY COUTURE — Page boutique : filtres, recherche et tri
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("catalogGrid");
  const countEl = document.getElementById("resultCount");
  const titleEl = document.getElementById("catalogTitle");
  const emptyEl = document.getElementById("emptyState");
  const tabs = document.querySelectorAll(".cat-tab");
  const typeSelect = document.getElementById("typeFilter");
  const sortSelect = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");

  // Catégorie lue dans l'adresse (ex : catalogue.html?cat=femme)
  const params = new URLSearchParams(location.search);
  const startCat = params.get("cat");

  const state = {
    cat: CATEGORIES[startCat] ? startCat : "tout",
    type: "tout",
    sort: "nouveautes",
    q: ""
  };

  // Ignore les accents et majuscules dans la recherche
  const normalize = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remplit la liste "Type d'article" selon la catégorie choisie
  function fillTypes() {
    const list = PRODUCTS.filter(p => state.cat === "tout" || p.category === state.cat);
    const types = [...new Set(list.map(p => p.type))].sort();
    typeSelect.innerHTML =
      `<option value="tout">Tous les articles</option>` +
      types.map(t => `<option value="${t}">${t}</option>`).join("");
    if (!types.includes(state.type)) state.type = "tout";
    typeSelect.value = state.type;
  }

  function render() {
    const q = normalize(state.q.trim());

    let list = PRODUCTS.filter(p =>
      (state.cat === "tout" || p.category === state.cat) &&
      (state.type === "tout" || p.type === state.type) &&
      (!q || normalize(`${p.name} ${p.type} ${CATEGORIES[p.category]}`).includes(q))
    );

    if (state.sort === "nouveautes") list.sort((a, b) => b.date.localeCompare(a.date));
    if (state.sort === "prix-asc")   list.sort((a, b) => a.price - b.price);
    if (state.sort === "prix-desc")  list.sort((a, b) => b.price - a.price);
    if (state.sort === "nom")        list.sort((a, b) => a.name.localeCompare(b.name, "fr"));

    grid.innerHTML = list.map((p, i) => productCard(p, i)).join("");
    countEl.textContent = `${list.length} pièce${list.length > 1 ? "s" : ""}`;
    emptyEl.hidden = list.length > 0;
    titleEl.textContent = state.cat === "tout" ? "Toute la collection" : CATEGORIES[state.cat];

    tabs.forEach(t => t.classList.toggle("is-active", t.dataset.cat === state.cat));

    // Met à jour l'adresse sans recharger la page
    const url = state.cat === "tout" ? "catalogue.html" : `catalogue.html?cat=${state.cat}`;
    history.replaceState(null, "", url);
  }

  // ----- Événements -----
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      state.cat = tab.dataset.cat;
      fillTypes();
      render();
    });
  });

  typeSelect.addEventListener("change", () => { state.type = typeSelect.value; render(); });
  sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });
  searchInput.addEventListener("input", () => { state.q = searchInput.value; render(); });

  document.getElementById("resetFilters").addEventListener("click", () => {
    Object.assign(state, { cat: "tout", type: "tout", sort: "nouveautes", q: "" });
    searchInput.value = "";
    sortSelect.value = "nouveautes";
    fillTypes();
    render();
  });

  fillTypes();
  render();
});