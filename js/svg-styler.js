const OVERRIDE_STYLE_ID = "svg-style-overrides";

export function setClassFill(svgElement, className, color) {
    const styleElement = getOrCreateOverrideStyle(svgElement);

    const rules = getExistingRules(styleElement);

    rules[className] = color;

    styleElement.textContent = buildStylesheet(rules);
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

    const matches = styleElement.textContent.matchAll(
        /\.([A-Za-z_][A-Za-z0-9_-]*)\s*\{\s*fill\s*:\s*([^;]+);?\s*\}/g
    );

    for (const match of matches) {
        rules[match[1]] = match[2].trim();
    }

    return rules;
}

function buildStylesheet(rules) {
    return Object.entries(rules)
        .map(
            ([className, color]) =>
                `.${className} { fill: ${color}; }`
        )
        .join("\n");
}