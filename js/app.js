const SVG_PATH = "assets/svg/carapuce.svg";

async function loadSvg() {
    const svgContainer = document.querySelector("#svg-container");

    try {
        const response = await fetch(SVG_PATH);

        if (!response.ok) {
            throw new Error(
                `Impossible de charger le SVG : ${response.status}`
            );
        }

        const svgContent = await response.text();

        svgContainer.innerHTML = svgContent;

        const svgElement = svgContainer.querySelector("svg");

        if (svgElement === null) {
            throw new Error("Le fichier chargé ne contient aucun élément SVG.");
        }

        svgElement.id = "carapuce-svg";
        svgElement.setAttribute("role", "img");
        svgElement.setAttribute(
            "aria-label",
            "Illustration vectorielle de Carapuce"
        );
    } catch (error) {
        console.error(error);

        svgContainer.innerHTML = `
            <p class="error-message">
                Le SVG n'a pas pu être chargé.
            </p>
        `;
    }
}

loadSvg();