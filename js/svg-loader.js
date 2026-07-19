export async function loadSvg(svgPath, containerSelector) {
    const svgContainer = document.querySelector(containerSelector);

    if (svgContainer === null) {
        throw new Error(
            `Conteneur introuvable : ${containerSelector}`
        );
    }

    const response = await fetch(svgPath);

    if (!response.ok) {
        throw new Error(
            `Impossible de charger le SVG : ${response.status}`
        );
    }

    const svgContent = await response.text();

    svgContainer.innerHTML = svgContent;

    const svgElement = svgContainer.querySelector("svg");

    if (svgElement === null) {
        throw new Error(
            "Le fichier chargé ne contient aucun élément SVG."
        );
    }

    return svgElement;
}