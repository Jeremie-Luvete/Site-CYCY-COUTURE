// =========================================
// CYCY COUTURE — Catalogue des produits
// Pour ajouter un produit : copiez une ligne, changez l'id (unique),
// le nom, le prix, etc. La photo doit s'appeler images/produits/ID.jpg
// =========================================

const SIZES_FEMME = ["XS", "S", "M", "L", "XL"];
const SIZES_HOMME = ["S", "M", "L", "XL", "XXL"];
const SIZE_UNIQUE = ["Unique"];

const CATEGORIES = {
  femme: "Femme",
  homme: "Homme",
  accessoires: "Accessoires"
};

const PRODUCTS = [
  // ----- FEMME -----
  { id: 1,  name: "Robe Élégance",         category: "femme", type: "Robes",     price: 280, tag: "Nouveau",  sizes: SIZES_FEMME, featured: true, date: "2026-10-01" },
  { id: 2,  name: "Robe Soirée Azur",      category: "femme", type: "Robes",     price: 320, tag: "Exclusif", sizes: SIZES_FEMME, featured: true, date: "2026-09-20" },
  { id: 3,  name: "Ensemble Pagne Royal",  category: "femme", type: "Ensembles", price: 240, tag: "",         sizes: SIZES_FEMME, date: "2026-09-10" },
  { id: 4,  name: "Jupe Crayon Minuit",    category: "femme", type: "Jupes",     price: 150, tag: "",         sizes: SIZES_FEMME, date: "2026-08-28" },
  { id: 5,  name: "Blazer Ivoire",         category: "femme", type: "Vestes",    price: 260, tag: "Nouveau",  sizes: SIZES_FEMME, date: "2026-10-05" },
  { id: 6,  name: "Robe Cocktail Saphir",  category: "femme", type: "Robes",     price: 210, tag: "",         sizes: SIZES_FEMME, date: "2026-08-15" },

  // ----- HOMME -----
  { id: 7,  name: "Ensemble Héritage",     category: "homme", type: "Costumes",  price: 450, tag: "",         sizes: SIZES_HOMME, featured: true, date: "2026-09-25" },
  { id: 8,  name: "Chemise Signature",     category: "homme", type: "Chemises",  price: 120, tag: "",         sizes: SIZES_HOMME, featured: true, date: "2026-09-01" },
  { id: 9,  name: "Costume Marine Classique", category: "homme", type: "Costumes", price: 520, tag: "Exclusif", sizes: SIZES_HOMME, date: "2026-09-18" },
  { id: 10, name: "Abacost Prestige",      category: "homme", type: "Ensembles", price: 300, tag: "Nouveau",  sizes: SIZES_HOMME, date: "2026-10-08" },
  { id: 11, name: "Chemise Lin Sable",     category: "homme", type: "Chemises",  price: 95,  tag: "",         sizes: SIZES_HOMME, date: "2026-08-05" },

  // ----- ACCESSOIRES -----
  { id: 12, name: "Pochette Soirée Or",    category: "accessoires", type: "Sacs",     price: 140, tag: "",        sizes: SIZE_UNIQUE, date: "2026-09-12" },
  { id: 13, name: "Cravate Soie Marine",   category: "accessoires", type: "Cravates", price: 55,  tag: "",        sizes: SIZE_UNIQUE, date: "2026-08-20" },
  { id: 14, name: "Foulard CyCy",          category: "accessoires", type: "Foulards", price: 75,  tag: "Nouveau", sizes: SIZE_UNIQUE, date: "2026-10-10" }
];

// Chemin de la photo de chaque produit
PRODUCTS.forEach(p => { if (!p.image) p.image = `images/produits/${p.id}.jpg`; });
// Affichage du prix : 1 250 $
function formatPrice(price) {
  return price.toLocaleString("fr-FR") + " $";
}

// Fabrique la carte HTML d'un produit
function productCard(p, index = 0, animClass = "product--anim") {
  return `
    <article class="product ${animClass}" style="--i:${index}">
      <div class="product__media">
        <div class="product__img" style="background-image:url('${p.image}')"></div>
        <a href="produit.html?id=${p.id}" class="product__link" aria-label="${p.name}"></a>
        ${p.tag ? `<span class="product__tag">${p.tag}</span>` : ""}
        <div class="product__quick">
          <p>${p.sizes.length > 1 ? "Ajout rapide · Choisir la taille" : "Ajout rapide"}</p>
          <div class="product__sizes">
            ${p.sizes.map(s => `<button type="button" data-add="${p.id}" data-size="${s}">${s === "Unique" ? "Ajouter" : s}</button>`).join("")}
          </div>
        </div>
        <button type="button" class="product__plus" aria-label="Ajout rapide">+</button>
      </div>
      <p class="product__cat">${CATEGORIES[p.category]} · ${p.type}</p>
      <h3 class="product__name"><a href="produit.html?id=${p.id}">${p.name}</a></h3>
      <p class="product__price">${formatPrice(p.price)}</p>
    </article>`;
}