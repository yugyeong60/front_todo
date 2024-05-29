const host = "http://127.0.0.1:8000";

const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    axios.get(`${host}/todo`)
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}

function renderTodos(todos) {
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        todoDiv.textContent = todo.item;
        todosContainer.appendChild(todoDiv);
        // 삭제 버튼 생성 및 이벤트 처리
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.id);
        });

        // todoDiv에 삭제 버튼 추가
        todoDiv.appendChild(deleteBtn);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

const todoInput = document.querySelector('.todo-input');

todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const title = todoInput.value.trim();
    let todoData = {
        id: 0,
        item: title
    };
    if (title === '') return;
    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(id) {
    axios.delete(`${host}/todo/${id}`).then(response => {
        getTodos();
    }).catch(error => {
        console.error('Error deleting todo:', error);
    });
}

document.querySelector('.shortcut-button1').addEventListener('click', function () {
    window.location.href = 'https://www.kw.ac.kr/ko/univ/depart_intro.jsp?hpage=college_004_01';
});

document.querySelector('.shortcut-button2').addEventListener('click', function () {
    window.location.href = 'https://ic.kw.ac.kr/main/main.php';
});