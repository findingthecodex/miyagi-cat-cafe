const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// 🛒 RENDER CART
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😿</p>";
    totalPriceEl.textContent = 0;
    return;
  }

  cart.forEach((item, index) => {
    const price = 2000;
    total += price;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div class="cart-left">
        <img src="${item.img}" />
        <div>
          <p class="cart-name">${item.name}</p>
          <p class="cart-origin">${item.origin}</p>
        </div>
      </div>

      <div class="cart-right">
        <span>${price} kr</span>
        <button class="remove-btn" data-index="${index}">
          Remove 🗑
        </button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  totalPriceEl.textContent = total;
}

// 🗑 REMOVE ITEM (event delegation)
if (cartContainer) {
  cartContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const index = btn.dataset.index;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  });
}

// 🛒 ADD TO CART (används från cats + cafecats)
function addToCart(cat) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(cat);

  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🚀 INIT
renderCart();