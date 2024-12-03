var globalData = {};

fetch("./repository.json")
	.then(response => response.json())
	.then(data => {
		const repository = data;
		globalData.repository = repository;
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
			let desc = value.description || "No description provided";
			let words = desc.split(' ');
			if (words.length > 40) {
				desc = words.slice(0, 40).join(' ') + '...';
			}
			description.innerText = desc;
			description.appendChild(document.createElement("br"));
			description.appendChild(document.createElement("br"));
			card.appendChild(header);
			card.appendChild(description);
			const aTag = document.createElement("a");
			aTag.classList.add("link");
			aTag.target = "_blank";
			const button = document.createElement("button");
			button.classList.add("move-right");
			button.textContent = "Resources";
			button.addEventListener("click", function () {
				globalData.resource = key;
				localStorage.setItem("globalData", JSON.stringify(globalData));
				window.location.href = "resource/index.html";
			});
			aTag.appendChild(button);
			description.appendChild(aTag);
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
