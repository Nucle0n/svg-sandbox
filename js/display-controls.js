import { setClassProperty } from "./svg-styler.js";

export function createDisplayControls(svgElement) {
    const displayControls =
        document.querySelector("#display-controls");

    displayControls.innerHTML = "";

    const title =
        document.createElement("h2");

    title.textContent = "Display";

    displayControls.appendChild(title);
	
	const zoomLabel =
		document.createElement("label");

	zoomLabel.setAttribute(
		"for",
		"svg-zoom"
	);

	zoomLabel.textContent = "Zoom";

	displayControls.appendChild(zoomLabel);

	const zoomControl =
		document.createElement("div");

	zoomControl.className = "range-control";

	const zoomSlider =
		document.createElement("input");

	zoomSlider.type = "range";
	zoomSlider.id = "svg-zoom";
	zoomSlider.min = "0.5";
	zoomSlider.max = "2.5";
	zoomSlider.step = "0.05";
	zoomSlider.value = "1";

	const zoomValue =
		document.createElement("output");

	zoomValue.textContent = "100 %";

	zoomSlider.addEventListener(
		"input",
		() => {
			svgElement.style.transform =
				`scale(${zoomSlider.value})`;

			zoomValue.textContent =
				`${Math.round(
					zoomSlider.value * 100
				)} %`;
		}
	);

	zoomControl.appendChild(zoomSlider);
	zoomControl.appendChild(zoomValue);

	displayControls.appendChild(zoomControl);

    const opacityLabel =
        document.createElement("label");

    opacityLabel.setAttribute(
        "for",
        "shadow-opacity"
    );

    opacityLabel.textContent =
        "Shadow opacity";

    displayControls.appendChild(opacityLabel);

    const opacityControl =
        document.createElement("div");

    opacityControl.className =
        "range-control";

    const opacitySlider =
        document.createElement("input");

    opacitySlider.type = "range";
    opacitySlider.id = "shadow-opacity";
    opacitySlider.min = "0";
    opacitySlider.max = "1";
    opacitySlider.step = "0.05";
    opacitySlider.value = "0.3";

    const opacityValue =
        document.createElement("output");

    opacityValue.textContent = "30 %";

    opacitySlider.addEventListener(
        "input",
        () => {
            setClassProperty(
                svgElement,
                "ombre",
                "opacity",
                opacitySlider.value
            );

            opacityValue.textContent =
                `${Math.round(
                    opacitySlider.value * 100
                )} %`;
        }
    );

    opacityControl.appendChild(
        opacitySlider
    );

    opacityControl.appendChild(
        opacityValue
    );
	
	const updateShadowControls = () => {
		opacitySlider.disabled =
			!shadowsCheckbox.checked;

		opacityValue.style.opacity =
			shadowsCheckbox.checked
				? "1"
				: "0.5";
	};

    displayControls.appendChild(
        opacityControl
    );
	
	const shadowsCheckbox =
		document.createElement("input");

	shadowsCheckbox.type = "checkbox";
	shadowsCheckbox.checked = true;
	shadowsCheckbox.addEventListener(
		"change",
		() => {
			setClassProperty(
				svgElement,
				"ombre",
				"display",
				shadowsCheckbox.checked
					? ""
					: "none",
			);
			
			updateShadowControls();
			
		},
	);

	const shadowsLabel =
		document.createElement("label");

	shadowsLabel.className =
		"checkbox-control";

	shadowsLabel.append(
		shadowsCheckbox,
		document.createTextNode(" Show shadows"),
	);
	
	displayControls.appendChild(shadowsLabel);
	
	const checkerboardCheckbox =
		document.createElement("input");

	checkerboardCheckbox.type = "checkbox";
	checkerboardCheckbox.checked = true;

	const checkerboardLabel =
		document.createElement("label");

	checkerboardLabel.className =
		"checkbox-control";

	checkerboardLabel.append(
		checkerboardCheckbox,
		document.createTextNode(" Show checkerboard"),
	);

	checkerboardCheckbox.addEventListener(
		"change",
		() => {
			const workspace =
				document.querySelector(".workspace");

			workspace.classList.toggle(
				"checkerboard-hidden",
				!checkerboardCheckbox.checked,
			);
		},
	);

	displayControls.appendChild(
		checkerboardLabel
	);
	
	updateShadowControls();	
	
}