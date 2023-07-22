let todoInput = document.querySelector(".input");
let addToDoButton = document.querySelector(".button");
let showToDO = document.querySelector(".todos-container");
let todo;
let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

// adding function to create universal unique id so that we can delete the todo list
function generateUUID() {
  // Generate a random 32-bit number and convert it to hexadecimal representation
  const random32Bit = () =>
    Math.floor(Math.random() * 0x100000000).toString(16);

  // Format the UUID segments
  const segments = [
    random32Bit() + random32Bit(),
    random32Bit(),
    "4" + random32Bit().substr(0, 3),
    // Generates a random hexadecimal digit between 8 and b
    ((8 + Math.random() * 4) | 0).toString(16) + random32Bit().substr(0, 3),
    random32Bit(),
  ];

  // Join the segments with hyphens to form the UUID
  return segments.join("-");
}
//applying eventlistner to addtodobutton

addToDoButton.addEventListener("click", (e) => {
  e.preventDefault();
  todo = todoInput.value;
  if (todo.length > 0) {
    todoList.push({ id: generateUUID(), todo, isCompleted: false });
  }
  renderToDoList(todoList);
  localStorage.setItem("todos", JSON.stringify(todoList));
  todoInput.value = "";
});

showToDO.addEventListener("click", (e) => {
  let key = e.target.dataset.key;
  let deltodokey = e.target.dataset.todokey;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todoList = todoList.filter((todo) => todo.id !== deltodokey);
  localStorage.setItem("todos", JSON.stringify(todoList));
  renderToDoList(todoList);
  console.log(todoList);
});

function renderToDoList(todoList) {
  console.log(todoList);
  showToDO.innerHTML = todoList.map(
    ({ id, todo, isCompleted }) => `<div>
    <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" type="checkbox" ${
      isCompleted ? "checked" : ""
    } >
    <label for="item-${id}" data-key=${id} class="todo todo-text t-pointer ${
      isCompleted ? "checked-todo" : ""
    }">${todo}</label>
    <button class="absolute right-0 button cursor">
    <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
    </button>
    </div>`
  );
}

renderToDoList(todoList);
