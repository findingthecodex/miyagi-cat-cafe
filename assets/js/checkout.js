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

  // --- VALIDERING: Kolla om korgen är tom ---
  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your basket is empty 😿</p>";
    totalPriceEl.textContent = "0";
    
    // Inaktivera knappen så man inte kan klicka på "Confirm"
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = "0.5";
    confirmBtn.style.cursor = "not-allowed";
    return; // Avbryt funktionen här
  }

  // Om det finns katter, aktivera knappen
  confirmBtn.disabled = false;
  confirmBtn.style.opacity = "1";
  confirmBtn.style.cursor = "pointer";
  // ------------------------------------------

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
  // Kör HTML5-validering (required fält i formen)
  if (!customerForm.reportValidity()) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const today = new Date().toLocaleDateString("en-GB");
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  
  let total = 0;
  let alertCatList = ""; 
  summaryCats.innerHTML = ""; 

  cart.forEach((item, index) => {
    const price = 2000;
    total += price;

    // Bygg text för alert-fönstret
    alertCatList += `${index + 1}. ${item.name} - ${price} kr\n`;

    // Bygg HTML för orderbekräftelsen på sidan
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.padding = "5px 0";
    li.innerHTML = `<span>${item.name}</span> <strong>${price} kr</strong>`;
    summaryCats.appendChild(li);
  });

  // Skapa den engelska texten till alerten
  const alertMessage = `
THANK YOU FOR YOUR ORDER!
-------------------------------
Customer Details:
Name: ${name}
Email: ${email}
Date: ${today}

Items ordered:
${alertCatList}
-------------------------------
TOTAL PRICE: ${total} kr

We will contact you shortly regarding the delivery!
  `.trim();

  alert(alertMessage);

  // Uppdatera sammanfattningen på sidan
  summaryName.textContent = name;
  summaryEmail.textContent = email;
  summaryDate.textContent = today;
  
  const totalDiv = document.createElement("div");
  totalDiv.style.borderTop = "2px solid #333";
  totalDiv.style.marginTop = "10px";
  totalDiv.style.paddingTop = "10px";
  totalDiv.innerHTML = `<h3 style="text-align:right">Total: ${total} kr</h3>`;
  summaryCats.appendChild(totalDiv);

  // Visa boxarna och dölj formuläret
  confirmedBox.hidden = false;
  orderSummary.hidden = false;
  customerForm.style.display = "none"; // Valfritt: dölj formuläret när man är klar
});

doneBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  window.location.href = "/pages/adopt.html";
});

// Kör renderingen när sidan laddas
renderCheckout();