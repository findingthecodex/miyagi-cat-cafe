const container = document.getElementById("apiCatContainer");

let page = 0;
const limit = 10;

const pageNumber = document.getElementById("pageNumber");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

async function loadCats() {
  container.innerHTML = "";

  const res = await fetch(`https://api.thecatapi.com/v1/breeds`);
  const allCats = await res.json();

  const start = page * limit;
  const paginated = allCats.slice(start, start + limit);

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

nextBtn?.addEventListener("click", () => {
  page++;
  loadCats();
});

prevBtn?.addEventListener("click", () => {
  if (page === 0) return;
  page--;
  loadCats();
});

loadCats();