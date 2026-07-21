import {
    resetClassFills,
    setClassFill,
} from "./svg-styler.js";

export function createColorControls(
    svgClasses,
    svgElement,
) {

    const sidebar =
        document.querySelector("#sidebar");

    sidebar.innerHTML = "";

    const title =
        document.createElement("h2");

    title.textContent = "Colors";

    sidebar.appendChild(title);

    const list =
        document.createElement("ul");

    list.className = "class-list";

    for (const svgClass of svgClasses) {

		const item =
			document.createElement("li");

		item.style.display = "flex";
		item.style.alignItems = "center";
		item.style.justifyContent = "space-between";

		const label =
			document.createElement("span");

		label.textContent =
			svgClass.name;

		item.appendChild(label);
		
		const picker =
			document.createElement("input");

		picker.type = "color";
		
		if (svgClass.color !== null) {

			picker.value = svgClass.color;
			picker.dataset.originalColor = svgClass.color;
		} else {
			picker.value = "#000000";
			picker.dataset.originalColor = "#000000";
		}
		
		picker.addEventListener(
			"input",
			() => {

				setClassFill(
					svgElement,
					svgClass.name,
					picker.value,
				);

			},
		);
		
		item.appendChild(picker);

		list.appendChild(item);
	}

    sidebar.appendChild(list);
	
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

	sidebar.appendChild(resetButton);
}