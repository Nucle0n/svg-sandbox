import { loadSvg } from "./svg-loader.js";
import { inspectSvg } from "./svg-inspector.js";

const SVG_PATH = "assets/svg/carapuce.svg";
const SVG_CONTAINER_SELECTOR = "#svg-container";

async function initializeApp() {
    try {
        const svgElement = await loadSvg(
            SVG_PATH,
            SVG_CONTAINER_SELECTOR
        );

        svgElement.id = "carapuce-svg";
        svgElement.setAttribute("role", "img");
        svgElement.setAttribute(
            "aria-label",
            "Illustration vectorielle de Carapuce"
        );

        inspectSvg(svgElement);
    } catch (error) {
        console.error(error);

        displayLoadingError();
    }
}

function displayLoadingError() {
    const svgContainer = document.querySelector(
        SVG_CONTAINER_SELECTOR
    );

    if (svgContainer === null) {
        return;
    }

    svgContainer.innerHTML = `
        <p class="error-message">
            Le SVG n'a pas pu être chargé.
        </p>
    `;
}

initializeApp();