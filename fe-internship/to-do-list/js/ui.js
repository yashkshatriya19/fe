export function renderTodos(todos, listElement, onToggle, onDelete) {

    listElement.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.classList.add("todo-item");

        if (todo.completed) {
            li.classList.add("completed");
        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("todo-checkbox");

        checkbox.checked = todo.completed;

        checkbox.dataset.id = todo.id;


        // Task text

        const text = document.createElement("span");

        text.classList.add("todo-text");

        text.textContent = todo.text;


        // Delete button

        const deleteButton =
            document.createElement("button");

        deleteButton.classList.add("delete-btn");

        deleteButton.textContent = "×";

        deleteButton.dataset.id = todo.id;


        // Events

        checkbox.addEventListener("change", function () {

            onToggle(Number(this.dataset.id));

        });


        deleteButton.addEventListener("click", function () {

            onDelete(Number(this.dataset.id));

        });


        li.append(
            checkbox,
            text,
            deleteButton
        );

        listElement.append(li);
    });
}


export function updateStats(stats) {

    document.querySelector("#total-count")
        .textContent = stats.total;

    document.querySelector("#completed-count")
        .textContent = stats.completed;

    document.querySelector("#pending-count")
        .textContent = stats.pending;
}