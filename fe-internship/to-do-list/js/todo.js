let todos = [];


// Add todo

export function addTodo(text) {

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos = [...todos, todo];

    return todos;
}


// Delete todo

export function deleteTodo(id) {

    todos = todos.filter(todo => todo.id !== id);

    return todos;
}


// Toggle completed

export function toggleTodo(id) {

    todos = todos.map(todo => {

        if (todo.id === id) {

            return {
                ...todo,
                completed: !todo.completed
            };
        }

        return todo;
    });

    return todos;
}


// Get todos

export function getTodos() {
    return todos;
}


// Filter todos

export function filterTodos(filter) {

    if (filter === "completed") {

        return todos.filter(todo => todo.completed);

    }

    if (filter === "pending") {

        return todos.filter(todo => !todo.completed);

    }

    return todos;
}


// Get statistics

export function getStats() {

    const total = todos.length;

    const completed = todos.filter(
        todo => todo.completed
    ).length;

    const pending = total - completed;

    return {
        total,
        completed,
        pending
    };
}