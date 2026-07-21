import {  exportSvg } from "./svg-export.js";

export function createExportControls(
    svgElement,
) {
    const exportControls =
        document.querySelector("#export-controls");

    exportControls.innerHTML = "";

    const title =
        document.createElement("h2");

    title.textContent = "Export";

    exportControls.appendChild(title);

    const exportButton =
        document.createElement("button");

    exportButton.type = "button";
    exportButton.textContent = "Export SVG";

    exportButton.addEventListener(
        "click",
        () => {
            exportSvg(svgElement);
        },
    );

    exportControls.appendChild(
        exportButton,
    );
}