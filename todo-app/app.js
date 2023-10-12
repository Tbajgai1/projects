const form = document.querySelector('#form');
const input = document.querySelector('#input');
const todos = document.querySelector('.todos');

const todoList = JSON.parse(localStorage.getItem('todos'));

if(todoList) {
    todoList.forEach(todo =>{
        addTodo(todo);
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;
    if(todo){
        todoText = todo.text;
    }

    console.log(todoText);

    if(todoText) {
        const todoEl = document.createElement('li');

        if(todo && todo.completed) {
            todoEl.classList.add('completed');
        }
    
        todoEl.innerText = todoText;
        todos.appendChild(todoEl);


        // SHOW COMPLETED UPON CLICK
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();

        })

        // Right click to remove item
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();

            updateLS();

        })

        // clear the input
        input.value = '';
        updateLS();
    };
}
    function updateLS() {
        const todosEL = document.querySelectorAll('li');
        const todos = [];
        todosEL.forEach(todoEl => {
            todos.push({
                text:todoEl.innerText,
                completed: todoEl.classList.contains('completed')
            });
        });
    
        localStorage.setItem('todos', JSON.stringify(todos));
    };




