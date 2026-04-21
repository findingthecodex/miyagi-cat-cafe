const checkoutItems = document.getElementById("checkoutItems");
const totalPriceEl = document.getElementById("totalPrice");
const customerForm = document.getElementById("customerForm");
const confirmBtn = document.getElementById("confirmBtn");
const confirmedBox = document.getElementById("confirmedBox");
const orderSummary = document.getElementById("orderSummary");
const doneBtn = document.getElementById("doneBtn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

const summaryName = document.getElementById("summaryName");
const summaryEmail = document.getElementById("summaryEmail");
const summaryDate = document.getElementById("summaryDate");
const summaryCats = document.getElementById("summaryCats");

function renderCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  checkoutItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your basket is empty 😿</p>";
    totalPriceEl.textContent = "0";
    return;
  }

  cart.forEach((item) => {
    const price = 2000;
    total += price;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-left">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <p class="cart-name">${item.name}</p>
          <p class="cart-origin">${item.origin}</p>
        </div>
      </div>
      <span>${price} kr</span>
    `;

    checkoutItems.appendChild(itemEl);
  });

  totalPriceEl.textContent = total;
}

confirmBtn.addEventListener("click", () => {
  if (!customerForm.reportValidity()) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const today = new Date().toLocaleDateString("en-GB");

  summaryName.textContent = nameInput.value.trim();
  summaryEmail.textContent = emailInput.value.trim();
  summaryDate.textContent = today;

  summaryCats.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    summaryCats.appendChild(li);
  });

  confirmedBox.hidden = false;
  orderSummary.hidden = false;
});

doneBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  window.location.href = "/pages/adopt.html";
});

renderCheckout();