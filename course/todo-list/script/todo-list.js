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

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        // const name = todoObject.name;
        const {name} = todoObject;
        // const dueDate = todoObject.date;
        const {dueDate} = todoObject;

        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
            " class="delete-button">Delete</button>
        ` 
        todoListHTML += html;
    }

    todoListElement.innerHTML = todoListHTML; 
}
 