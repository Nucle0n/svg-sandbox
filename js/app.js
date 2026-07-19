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

        inspectSvg(svgElement);
    } catch (error) {
        console.error(error);

        svgContainer.innerHTML = `
            <p class="error-message">
                Le SVG n'a pas pu être chargé.
            </p>
        `;
    }
}

function inspectSvg(svgElement) {
    const styleElement = svgElement.querySelector("style");

    if (styleElement === null) {
        console.log("Le SVG ne contient aucune feuille de style intégrée.");
        return;
    }

    const classMatches = styleElement.textContent.match(
    /\.[A-Za-z_][A-Za-z0-9_-]*/g
	);


    if (classMatches === null) {
        console.log("Aucune classe CSS trouvée dans le SVG.");
        return;
    }

    const classNames = [
        ...new Set(
            classMatches.map((className) => className.slice(1))
        ),
    ];

    console.group("SVG Inspection");

	console.log(`Classes found (${classNames.length})`);

	for (const className of classNames) {
		console.log(`- ${className}`);
	}

	console.groupEnd();
}

loadSvg();