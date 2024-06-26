const host = "http://127.0.0.1:8080";

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
        todoDiv.innerHTML = ` <div class="todo-content">
        <strong>${todo.author}</strong>: ${todo.item}
    </div>
    <div class="todo-timestamp">
        <small>${new Date(todo.timestamp).toLocaleString()}</small>
    </div>`;
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

const authorInput = document.querySelector('.author-input');
const todoInput = document.querySelector('.todo-input');

todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const author = authorInput.value.trim();
    const title = todoInput.value.trim();
    if (author === '' || title === '') return;
    let todoData = {
        id: 0,
        item: title,
        author: author,
        timestamp: new Date().toISOString()
    };
    console.log("Adding todo:", todoData);
    axios.post(`${host}/todo`, todoData)
        .then(response => {
            authorInput.value = '';
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