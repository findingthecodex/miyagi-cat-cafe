document.addEventListener("DOMContentLoaded", async () => {
  const mount = document.getElementById("footer");
  if (!mount) return;

  const res = await fetch("/footer.html");
  const html = await res.text();

  // Om footer.html är en full HTML-sida, plocka ut bara <footer>
  const doc = new DOMParser().parseFromString(html, "text/html");
  const footerEl = doc.querySelector("footer");

  mount.innerHTML = footerEl ? footerEl.outerHTML : html;
});