const container = document.getElementById("apiCatContainer");
const searchInput = document.getElementById("searchInput");

let page = 0;
const limit = 10;

let catsData = []; // ALLA katter
let filteredCats = []; // filtrerade

const pageNumber = document.getElementById("pageNumber");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// 🔹 Hämta EN gång
async function loadCats() {
  const res = await fetch(`https://api.thecatapi.com/v1/breeds`);
  catsData = await res.json();

  filteredCats = catsData; // börja med alla
  displayCats();
}

// 🔹 Visa katter (pagination)
function displayCats() {
  container.innerHTML = "";

  const start = page * limit;
  const paginated = filteredCats.slice(start, start + limit);

  paginated.forEach(cat => {
    const card = document.createElement("div");
    card.classList.add("cat-item");

    const img = cat.reference_image_id
      ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
      : "https://via.placeholder.com/300";

    card.innerHTML = `
      <img src="${img}" alt="cat">
      <p class="cat-name">${cat.name}</p>
      <span class="cat-country">${cat.origin}</span>
      <button class="add-btn" type="button">Adopt 🐾</button>
    `;

    container.appendChild(card);
  });

  pageNumber.textContent = page + 1;
}

container?.addEventListener("click", event => {
  const button = event.target.closest(".add-btn");
  if (!button) return;

  const card = button.closest(".cat-item");
  if (!card) return;

  const name = card.querySelector(".cat-name")?.textContent;
  const origin = card.querySelector(".cat-country")?.textContent;
  const img = card.querySelector("img")?.src;

  if (!name || !origin || !img) return;

  addToCart({ name, origin, img });
});

// 🔹 Pagination
nextBtn?.addEventListener("click", () => {
  page++;
  displayCats();
});

prevBtn?.addEventListener("click", () => {
  if (page === 0) return;
  page--;
  displayCats();
});

// 🔍 SEARCH
if (searchInput && container) {
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    filteredCats = catsData.filter(cat =>
      cat.name.toLowerCase().includes(searchValue)
    );

    page = 0; // reset page när du söker
    displayCats();
  });
}

if (container) {
  loadCats();
}

// 🔍 SEARCH FÖR MANUELLA KATTER (cafecats sidan)

const manualContainer = document.getElementById("manualCatContainer");

if (searchInput && manualContainer) {
  const catItems = manualContainer.querySelectorAll(".cat-item");

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    catItems.forEach(cat => {
      const name = cat.querySelector(".cat-name").textContent.toLowerCase();

      if (name.includes(searchValue)) {
        cat.style.display = "flex"; // visa
      } else {
        cat.style.display = "none"; // göm
      }
    });
  });
}

if (manualContainer) {
  const catItems = manualContainer.querySelectorAll(".cat-item");

  // Ensure every manual cat card has an adopt button.
  catItems.forEach(cat => {
    if (cat.querySelector(".add-btn")) return;

    const btn = document.createElement("button");
    btn.className = "add-btn";
    btn.type = "button";
    btn.textContent = "Adopt 🐾";
    cat.appendChild(btn);
  });

  manualContainer.addEventListener("click", event => {
    const button = event.target.closest(".add-btn");
    if (!button) return;

    const cat = button.closest(".cat-item");
    if (!cat) return;

    const name = cat.querySelector(".cat-name")?.textContent;
    const origin = cat.querySelector(".cat-country")?.textContent;
    const img = cat.querySelector("img")?.src;

    if (!name || !origin || !img) return;

    addToCart({ name, origin, img });
  });
}

function addToCart(cat) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(cat);

  localStorage.setItem("cart", JSON.stringify(cart));
}
