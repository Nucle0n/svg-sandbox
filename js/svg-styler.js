const OVERRIDE_STYLE_ID = "svg-style-overrides";

export function setClassProperty(
    svgElement,
    className,
    property,
    value,
) {
    const styleElement =
        getOrCreateOverrideStyle(svgElement);

    const rules =
        getExistingRules(styleElement);

    if (rules[className] === undefined) {
        rules[className] = {};
    }

    rules[className][property] = value;

    styleElement.textContent =
        buildStylesheet(rules);
}

export function setClassFill(
    svgElement,
    className,
    color,
) {
    setClassProperty(
        svgElement,
        className,
        "fill",
        color,
    );
}

export function resetClassFills(svgElement) {
    const styleElement = svgElement.querySelector(
        `#${OVERRIDE_STYLE_ID}`
    );

    if (styleElement === null) {
        return;
    }

    styleElement.remove();
}

function getOrCreateOverrideStyle(svgElement) {
    let styleElement = svgElement.querySelector(
        `#${OVERRIDE_STYLE_ID}`
    );

    if (styleElement !== null) {
        return styleElement;
    }

    styleElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "style"
    );

    styleElement.id = OVERRIDE_STYLE_ID;

    svgElement.appendChild(styleElement);

    return styleElement;
}

function getExistingRules(styleElement) {
    const rules = {};

    const ruleMatches = styleElement.textContent.matchAll(
        /\.([A-Za-z_][A-Za-z0-9_-]*)\s*\{([^}]*)\}/g
    );

    for (const ruleMatch of ruleMatches) {
        const className = ruleMatch[1];
        const declarations = ruleMatch[2];

        rules[className] = {};

        const declarationMatches = declarations.matchAll(
            /([A-Za-z-]+)\s*:\s*([^;]+);?/g
        );

        for (const declarationMatch of declarationMatches) {
            const property = declarationMatch[1].trim();
            const value = declarationMatch[2].trim();

            rules[className][property] = value;
        }
    }

    return rules;
}

function buildStylesheet(rules) {
    return Object.entries(rules)
        .map(([className, declarations]) => {
            const properties = Object.entries(declarations)
                .map(
                    ([property, value]) =>
                        `    ${property}: ${value};`
                )
                .join("\n");

            return `.${className} {\n${properties}\n}`;
        })
        .join("\n\n");
}