export function inspectSvg(svgElement) {
    const styleElement = svgElement.querySelector("style");

    if (styleElement === null) {
        console.log(
            "Le SVG ne contient aucune feuille de style intégrée."
        );

        return [];
    }

    const classMatches = styleElement.textContent.match(
        /\.[A-Za-z_][A-Za-z0-9_-]*/g
    );

    if (classMatches === null) {
        console.log("Aucune classe CSS trouvée dans le SVG.");

        return [];
    }

    const classNames = [
        ...new Set(
            classMatches.map(
                (className) => className.slice(1)
            )
        ),
    ];

    console.group("SVG Inspection");
    console.log(`Classes found (${classNames.length})`);

    for (const className of classNames) {
        console.log(`- ${className}`);
    }

    console.groupEnd();

    return classNames;
}