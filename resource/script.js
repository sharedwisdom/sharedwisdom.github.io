window.addEventListener("load", () => {
    const globalData = JSON.parse(localStorage.getItem("globalData"));
    if (globalData && globalData.resource) {
        const title = document.getElementById("resource-title");
        title.innerText = globalData.resource.replace(/\b\w/g, char => char.toUpperCase());
        const description = document.getElementById("resource-description");
        const repository = globalData.repository[globalData.resource];
        description.innerText = repository.description || "No description provided";
        description.appendChild(document.createElement("br"));
        description.appendChild(document.createElement("br"));
        if (repository.links) {
            Object.entries(repository.links).forEach(([key, value]) => {
                const aTag = document.createElement("a");
                aTag.classList.add("link");
                aTag.target = "_blank";
                const button = document.createElement("button");
                button.classList.add("move-right");
                button.textContent = key;
                // button.addEventListener("click", function () {
                //     globalData.pdf = {"name": key, "link": value};
                //     localStorage.setItem("globalData", JSON.stringify(globalData));
                //     window.location.href = "../pdf/index.html";
                // });
                aTag.href = value;
                aTag.appendChild(button);
                description.appendChild(aTag);
            });
        }
        if (repository.courtesy) {
            const body = document.getElementsByTagName("body")[0];
            const courtesyHeader = document.createElement("h1");
            courtesyHeader.classList.add("header");
            courtesyHeader.style.marginTop = "20px";
            courtesyHeader.innerText = "Courtesy";
            body.appendChild(courtesyHeader);
            const courtesyBody = document.createElement("div");
            courtesyBody.classList.add("p");
            const list = document.createElement("ol");
            Object.entries(repository.courtesy).forEach(([key, value]) => {
                const listItem = document.createElement("li");
                const aTag = document.createElement("a");
                aTag.classList.add("link");
                aTag.href = value;
                aTag.innerHTML = `${key} - <mark>${value}</mark>`;
                aTag.target = "_blank";
                listItem.appendChild(aTag);
                list.appendChild(listItem);
            });
            courtesyBody.appendChild(list);
            body.appendChild(courtesyBody);
        }
    } else {
        console.error("No global data found");
    }
});
