export function inspectSvg(svgElement) {
    const styleElement = svgElement.querySelector("style");

    if (styleElement === null) {
        console.log(
            "Le SVG ne contient aucune feuille de style intégrée."
        );

        return [];
    }

    const stylesheet = styleElement.textContent;

    const classMatches = stylesheet.match(
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

    const svgClasses = [];

    for (const className of classNames) {
        svgClasses.push({
            name: className,
            color: extractClassColor(
                stylesheet,
                className
            ),
        });
    }

    console.group("SVG Inspection");
    console.log(`Classes found (${svgClasses.length})`);

    for (const svgClass of svgClasses) {
        console.log(
            `- ${svgClass.name} : ${svgClass.color ?? "no fill"}`
        );
    }

    console.groupEnd();

    return svgClasses;
}

function extractClassColor(stylesheet, className) {
    const classRegex = new RegExp(
        `\\.${className}\\s*\\{([^}]*)\\}`,
        "m"
    );

    const classMatch = stylesheet.match(classRegex);

    if (classMatch === null) {
        return null;
    }

    const declarations = classMatch[1];

    const fillMatch = declarations.match(
        /fill\s*:\s*(#[0-9A-Fa-f]{6})/
    );

    if (fillMatch === null) {
        return null;
    }

    return fillMatch[1];
}