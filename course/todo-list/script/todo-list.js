const todoList = [];

function addTodo() {
    const intputNameElement = document.querySelector('.todo-name-input')
    const name = intputNameElement.value; 

    const inputDateElemnet = document.querySelector('.due-date-input');
    const dueDate = inputDateElemnet.value; 

    if (name === '' || dueDate === '') {
        return;
    }

    todoList.push({name, dueDate});

    renderTodoList();
}

function renderTodoList() {
    const todoListElement = document.querySelector('.todo-list');
    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {
        const {name, dueDate} = todoObject; 

        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button class="delete-button">
                Delete
            </button>` 

        todoListHTML += html;
    });
    
    todoListElement.innerHTML = todoListHTML;
    
    document.querySelectorAll('.delete-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                todoList.splice(index, 1);

                renderTodoList();
            })
        });
}

document.querySelector('.add-button').addEventListener('click', () => {
    addTodo();
});

document.querySelector('.todo-name-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});