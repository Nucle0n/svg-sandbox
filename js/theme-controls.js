import {
    resetClassFills,
    setClassFill,
} from "./svg-styler.js";

const lockedClasses = new Set([
    "contour",
    "reflet",
]);

function applyTheme(
    svgElement,
    svgClasses,
    theme,
) {
    resetClassFills(svgElement);

    for (const svgClass of svgClasses) {
        const color = theme[svgClass.name];

        if (color === undefined) {
            continue;
        }

        setClassFill(
            svgElement,
            svgClass.name,
            color,
        );

        const picker = document.querySelector(
            `.color-picker[data-class-name="${svgClass.name}"]`,
        );

        if (picker !== null) {
            picker.value = color;
        }
    }
}

function generateRandomColor() {
    return `#${Math.floor(
        Math.random() * 0x1000000,
    )
        .toString(16)
        .padStart(6, "0")}`;
}

function createToxicTheme() {
    return {
        contour: "#000000",
        ventre: "#fff79a",
        carapace: "#6d00c9",
        peau: "#71ff7c",
        rebord_carapace: "#d8e2ef",
        ombre: "#000000",
        iris: "#b81fd4",
        reflet: "#ffffff",
        langue: "#a4c5ff",
        bouche: "#6a3d78",
    };
}

export function createThemeControls(
	svgElement,
    svgClasses,
	) {
    const themeControls =
        document.querySelector("#theme-controls");

    themeControls.innerHTML = "";

    const title =
        document.createElement("h2");

    title.textContent = "Themes";

    themeControls.appendChild(title);

    const buttonGroup =
        document.createElement("div");

    buttonGroup.className = "theme-buttons";

    const originalButton =
        document.createElement("button");

    originalButton.type = "button";
    originalButton.textContent = "Original";
	
	originalButton.addEventListener(
		"click",
		() => {
			const theme = {};

			for (const svgClass of svgClasses) {
				if (svgClass.color !== null) {
					theme[svgClass.name] = svgClass.color;
				}
			}

			applyTheme(
				svgElement,
				svgClasses,
				theme,
			);
		},
	);

    const toxicButton =
        document.createElement("button");

    toxicButton.type = "button";
    toxicButton.textContent = "Toxic";
	
	toxicButton.addEventListener(
		"click",
		() => {
			applyTheme(
				svgElement,
				svgClasses,
				createToxicTheme(),
			);
		},
	);

    const randomButton =
        document.createElement("button");
		
	randomButton.type = "button";
	randomButton.textContent = "Random colors";
		
	randomButton.addEventListener(
		"click",
		() => {
			const theme = {};

			for (const svgClass of svgClasses) {
				if (svgClass.color === null) {
					continue;
				}

				if (lockedClasses.has(svgClass.name)) {
					continue;
				}

				theme[svgClass.name] =
					generateRandomColor();
			}

			applyTheme(
				svgElement,
				svgClasses,
				theme,
			);
		},
	);

    buttonGroup.append(
        originalButton,
        toxicButton,
        randomButton,
    );

    themeControls.appendChild(buttonGroup);
}