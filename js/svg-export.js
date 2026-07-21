const exportedProperties = [
    "fill",
    "opacity",
];

const defaultExportFilename =
    "image.svg";

export function exportSvg(
    svgElement,
) {
    const svgContent =
        serializeSvg(
            svgElement,
        );

    downloadSvg(
        svgContent,
    );
}

function serializeSvg(
    svgElement,
) {
    const clone =
        svgElement.cloneNode(true);

    applyComputedStylesToClone(
        svgElement,
        clone,
    );

    cleanupClone(
        clone,
    );

    return new XMLSerializer().serializeToString(
        clone,
    );
}

function applyComputedStylesToClone(
    svgElement,
    clone,
) {
    const sourceElements =
        svgElement.querySelectorAll("*");

    const clonedElements =
        clone.querySelectorAll("*");

    for (
        let index = 0;
        index < sourceElements.length;
        index++
    ) {
        const sourceElement =
            sourceElements[index];

        const clonedElement =
            clonedElements[index];

        if (
			!(sourceElement instanceof SVGElement) ||
			!(clonedElement instanceof SVGElement)
		) {
			continue;
		}

		if (
			sourceElement instanceof SVGStyleElement ||
			clonedElement instanceof SVGStyleElement
		) {
			continue;
		}

        const computedStyle =
            getComputedStyle(sourceElement);

        for (const property of exportedProperties) {
            clonedElement.style.setProperty(
                property,
                computedStyle.getPropertyValue(
                    property,
                ),
            );
        }
    }
}

function cleanupClone(
    clone,
) {
    clone
        .querySelector(
            "#svg-sandbox-overrides",
        )
        ?.remove();
}

function downloadSvg(
    svgContent,
) {
    const blob =
        new Blob(
            [svgContent],
            {
                type: "image/svg+xml",
            },
        );

    const url =
        URL.createObjectURL(
            blob,
        );

    const link =
		document.createElement("a");

	link.href = url;
	link.download =
		defaultExportFilename;
	link.click();

    URL.revokeObjectURL(
        url,
    );
}