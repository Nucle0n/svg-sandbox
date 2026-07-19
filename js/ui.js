export function createClassList(classNames) {

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

    for (const className of classNames) {

        const item =
            document.createElement("li");

        item.textContent = className;

        list.appendChild(item);
    }

    sidebar.appendChild(list);
}