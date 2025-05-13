export function loadTodo() {
  console.log("To-Do section is ready!");

  // Create UI elements for To-Do section
  const container = document.getElementById('todo');
  container.innerHTML = `
    <h2>📝 To-Do List</h2>
    <div class="todo-container">
      <input type="text" id="todo-input" placeholder="Enter a task" />
      <select id="priority-selector">
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button id="add-todo">Add</button>
      <ul id="todo-list"></ul>
    </div>
    <button id="clear-all-btn">Clear All</button>
  `;

  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-todo');
  const list = document.getElementById('todo-list');
  const clearAllBtn = document.getElementById('clear-all-btn');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let lastState = [];

  // Render todos to the list
  const renderTodos = () => {
    list.innerHTML = '';  // Clear the current list
    // Sort tasks by priority (high to low)
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="${todo.done ? 'done' : ''} ${todo.priority}">${todo.text}</span>
        <button data-index="${index}" class="done-btn">✔</button>
        <button data-index="${index}" class="delete-btn">✖</button>
      `;
      list.appendChild(li);
    });
  };

  // Save todos to localStorage
  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Add new to-do when the button is clicked
  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    const priority = document.getElementById('priority-selector').value; // Get priority value
    if (text) {
      todos.push({ text, done: false, priority }); // Store the priority with the task
      input.value = '';  // Clear input field
      saveTodos();
      renderTodos();
    }
  });

  // Handle clicks on the to-do list (mark as done or delete)
  list.addEventListener('click', (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains('delete-btn')) {
      todos.splice(index, 1);  // Remove to-do from the list
    } else if (e.target.classList.contains('done-btn')) {
      todos[index].done = !todos[index].done;  // Toggle done state
    }

    saveTodos();
    renderTodos();
  });

  // Clear all tasks functionality
  clearAllBtn.addEventListener('click', () => {
    const confirmClear = confirm('Are you sure you want to clear all tasks?');
    if (confirmClear) {
      todos = [];  // Clear the tasks
      saveTodos();
      renderTodos();
      // Show undo option for 5 seconds
      showUndoOption();
    }
  });

  // Show undo option
  const showUndoOption = () => {
    lastState = [...todos];  // Save the current state
    const undoButton = document.createElement('button');
    undoButton.textContent = 'Undo';
    undoButton.id = 'undo-btn';
    container.appendChild(undoButton);

    setTimeout(() => {
      undoButton.remove();
    }, 5000);

    undoButton.addEventListener('click', () => {
      todos = [...lastState];  // Revert to the last state
      saveTodos();
      renderTodos();
      undoButton.remove();  // Remove the undo button
    });
  };

  // Initial render of todos
  renderTodos();
}
