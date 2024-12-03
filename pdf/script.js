window.addEventListener("load", () => {
    const globalData = JSON.parse(localStorage.getItem("globalData"));
    if (globalData && globalData.resource) {
        const header = document.getElementById("header");
        const pdfName = globalData.pdf.name;
        const pdfLink = globalData.pdf.link;
        header.innerText = `${pdfName} - ${globalData.resource.replace(/\b\w/g, char => char.toUpperCase())}`;
        document.getElementById("pdf-embed").src = pdfLink;
    } else {
        console.error("No global data found");
    }
});
