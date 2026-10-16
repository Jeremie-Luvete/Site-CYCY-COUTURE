// =========================================
// CYCY COUTURE — Panier (mémorisé dans le navigateur)
// =========================================

const Cart = {
  KEY: "cycy_cart",

  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch (e) { return []; }
  },

  save(items) {
    try { localStorage.setItem(this.KEY, JSON.stringify(items)); } catch (e) {}
    this.updateBadge(true);
  },

  add(id, size, qty = 1) {
    const items = this.get();
    const line = items.find(i => i.id === id && i.size === size);
    if (line) line.qty += qty;
    else items.push({ id, size, qty });
    this.save(items);
  },

  count() {
    return this.get().reduce((total, i) => total + i.qty, 0);
  },

  updateBadge(animate = false) {
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = this.count();
      if (animate) {
        el.classList.remove("bump");
        void el.offsetWidth; // relance l'animation
        el.classList.add("bump");
      }
    });
  }
};

// Petite notification en bas de l'écran
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${message}</span><a href="panier.html">Voir le panier</a>`;
  toast.classList.add("is-visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

// Clics sur les cartes produits (fonctionne sur toutes les pages)
document.addEventListener("click", e => {
  // Bouton "+" sur mobile : ouvre/ferme le choix de taille
  const plus = e.target.closest(".product__plus");
  if (plus) {
    plus.closest(".product").classList.toggle("is-open");
    return;
  }

  // Bouton de taille : ajoute au panier
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const id = Number(btn.dataset.add);
  const size = btn.dataset.size;
  const product = PRODUCTS.find(p => p.id === id);
  Cart.add(id, size);
  btn.closest(".product")?.classList.remove("is-open");
  const sizeText = size === "Unique" ? "" : ` (taille ${size})`;
  showToast(`${product.name}${sizeText} ajouté au panier`);
});

document.addEventListener("DOMContentLoaded", () => Cart.updateBadge());