const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😿</p>";
    totalPriceEl.textContent = 0;
    return;
  }

  cart.forEach((cat, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    const price = 500; // fake price per cat 😄
    total += price;

    div.innerHTML = `
      <div class="cart-left">
        <img src="${cat.img}" />
        <div>
          <p class="cart-name">${cat.name}</p>
          <p class="cart-origin">${cat.origin}</p>
        </div>
      </div>

      <div class="cart-right">
        <span>${price} kr</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  totalPriceEl.textContent = total;
}

// ❌ Ta bort
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.dataset.index;

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }
});

renderCart();

function addToCart(cat) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: cat.name,
    origin: cat.origin,
    img: cat.reference_image_id
      ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
      : "https://via.placeholder.com/300"
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}