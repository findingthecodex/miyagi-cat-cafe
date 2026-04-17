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
    `;

    container.appendChild(card);
  });

  pageNumber.textContent = page + 1;
}

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
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  filteredCats = catsData.filter(cat =>
    cat.name.toLowerCase().includes(searchValue)
  );

  page = 0; // reset page när du söker
  displayCats();
});

loadCats();