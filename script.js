var repository = {};

fetch("./repository.json")
  .then(response => response.json()) // Parse the JSON data
  .then(data => {
    repository = data;
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = ``;
    Object.entries(repository).forEach(([key, value]) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const header = document.createElement("h1");
      header.classList.add("header");
      header.innerText = key.replace(/\b\w/g, char => char.toUpperCase());
      const description = document.createElement("div");
      description.classList.add("p");
      description.innerText = value.description || "No description provided";
      description.appendChild(document.createElement("br"));
      card.appendChild(header);
      card.appendChild(description);
      if (value.links) {
        Object.entries(value.links).forEach(([key, value]) => {
          const aTag = document.createElement("a");
          aTag.classList.add("link");
          aTag.href = value;
          aTag.target = "_blank";
          const button = document.createElement("button");
          button.classList.add("move-right");
          button.textContent = key;
          aTag.appendChild(button);
          description.appendChild(aTag);
        });
      }
      cardsContainer.appendChild(card);
    });
  })
  .catch(error => console.error("error: loading json: ", error));

function searchAction() {
  const query = document.getElementById("search-input").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const heading = card.querySelector(".header");
    if (heading && heading.textContent.toLowerCase().includes(query)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

document.getElementById("search-input").addEventListener("input", () => {
  searchAction();
});

document.getElementById("search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchAction();
  }
});
