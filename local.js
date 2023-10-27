
var todoForm = document.querySelector("form");
var todoInput = document.querySelector(".text");
var todosList = document.querySelector(".todoBox");
var todos = [];

// Sayfa yüklendiğinde kaydedilmiş yapılacakları al
window.addEventListener("load", function() {
  todos = getTodosFromLocalStorage();
  renderTodos();
});

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  addTodoItem(todoInput.value);
  todoInput.value = "";
});

todosList.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete")) {
    var todoItem = event.target.closest("li");
    todoItem.remove();
  }
});

function getTodosFromLocalStorage() {
  var storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoItem(todoTitle) {
  if (todoTitle.trim() !== "") {
    var todoId = generateTodoId();
    var todoHtml = createTodoHtml(todoId, todoTitle);
    todos.push({ id: todoId, title: todoTitle });
    saveTodosToLocalStorage();
    todosList.insertAdjacentHTML("beforeend", todoHtml);
  }
}

function renderTodos() {
  todosList.innerHTML = "";
  todos.forEach(function(todo) {
    var todoHtml = createTodoHtml(todo.id, todo.title);
    todosList.insertAdjacentHTML("beforeend", todoHtml);
  });
}

function createTodoHtml(todoId, todoTitle) {
  var todoHtml = `
    <li class="todo" id="${todoId}">
      ${todoTitle}
      <div>
        <button class="delete"  style="background-color:red; width:50px">X</button>
        <button class="change" style="width:50px"   ><i class='bx bxs-chat'></i></button>
      </div>
    </li>
  `;
  return todoHtml;
}

function generateTodoId() {
  return Math.random().toString(36).substr(2, 9);
}