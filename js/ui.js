import {
    resetClassFills,
    setClassFill,
} from "./svg-styler.js";

export function createColorControls(
    svgClasses,
    svgElement,
) {

    const colorControls =
		document.querySelector("#color-controls");

	colorControls.innerHTML = "";

    const title =
        document.createElement("h2");

    title.textContent = "Colors";

    colorControls.appendChild(title);

    const list =
        document.createElement("ul");

    list.className = "class-list";

    for (const svgClass of svgClasses) {
		const item = document.createElement("li");

		item.className = "color-control";

		const label = document.createElement("span");

		label.textContent = svgClass.name;

		const picker = document.createElement("input");

		picker.type = "color";
		picker.className = "color-picker";
		picker.dataset.className = svgClass.name;
		picker.setAttribute(
			"aria-label",
			`Modifier la couleur de ${svgClass.name}`
		);

		if (svgClass.color !== null) {
			picker.value = svgClass.color;
			picker.dataset.originalColor = svgClass.color;
		} else {
			picker.value = "#000000";
			picker.dataset.originalColor = "#000000";
		}

		picker.addEventListener("input", () => {
			setClassFill(
				svgElement,
				svgClass.name,
				picker.value
			);
		});

		item.appendChild(label);
		item.appendChild(picker);

		list.appendChild(item);
	}
    colorControls.appendChild(list);
	
	const resetButton = document.createElement("button");

	resetButton.type = "button";
	resetButton.className = "reset-button";
	resetButton.textContent = "Reset colors";

	resetButton.addEventListener("click", () => {
		resetClassFills(svgElement);

		for (const picker of list.querySelectorAll(
			'input[type="color"]'
		)) {
			picker.value = picker.dataset.originalColor;
		}
	});

	colorControls.appendChild(resetButton);
}