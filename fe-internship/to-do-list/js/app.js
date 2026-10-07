import {
    addTodo,
    deleteTodo,
    toggleTodo,
    getTodos,
    filterTodos,
    getStats
} from "./todo.js";

import {
    renderTodos,
    updateStats
} from "./ui.js";


const form =
    document.querySelector("#todo-form");

const input =
    document.querySelector("#todo-input");

const list =
    document.querySelector("#todo-list");

const errorMessage =
    document.querySelector("#error-message");

const filters =
    document.querySelector(".filters");


let currentFilter = "all";


// Render everything

function render() {

    const todos =
        filterTodos(currentFilter);

    renderTodos(
        todos,
        list,
        handleToggle,
        handleDelete
    );

    updateStats(getStats());
}


// Add todo

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const text = input.value.trim();


    if (text === "") {

        errorMessage.textContent =
            "Please enter a task.";

        return;
    }


    errorMessage.textContent = "";


    addTodo(text);

    input.value = "";

    render();
});


// Toggle todo

function handleToggle(id) {

    toggleTodo(id);

    render();
}


// Delete todo

function handleDelete(id) {

    deleteTodo(id);

    render();
}


// Filter buttons

filters.addEventListener("click", function (event) {

    if (event.target.tagName !== "BUTTON") {
        return;
    }


    currentFilter =
        event.target.dataset.filter;

    render();
});


// Initial render

render();