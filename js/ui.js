export function createClassList(svgClasses) {

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
		const item = document.createElement("li");

		item.textContent = svgClass.name;

		list.appendChild(item);
	}

    sidebar.appendChild(list);
}