const hej = "hej";

function hejsan()
{
    const collection = document.getElementById("myHeader");
    collection.textContent = "The Cat Store!";
}

// let count = 0;

// function uppdateraRaknare() {
//     count++;
//     document.getElementById("countUpText").textContent = count;
// }

// setInterval(uppdateraRaknare, 1000);

async function loadFooter() {
  const res = await fetch("footer.html");
  const html = await res.text();
  document.getElementById("footer").innerHTML = html;
}

loadFooter();