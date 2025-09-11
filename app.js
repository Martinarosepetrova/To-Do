(() => { // im still trying to understand this wrapper pls dont ask me about it :D :D
  const elements = {
    form: document.getElementById('todo-form'),
    input: document.getElementById('todo-input'),
    list: document.getElementById('todo-list'),
    empty: document.getElementById('empty-state'),
		clearBtn: document.getElementById('clear-completed')
  };

  const haha = { id: 'hustle', text: 'hustle hustle hustle! :D', completed: false }; //add some haha's and hehe's every now and then
  let todos = [haha]; 

  function createTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return; 
    const todo = { 
      id: Date.now(), 
      text: trimmed,
      completed: false
    };

    todos.unshift(todo); 
    render();
  }

  // Toggle a todo's completed state
  function toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    render();
  }

  // Delete a todo
  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
  }

  //Clear completedd
  function clearCompleted(){
    todos = todos.filter(todo => !todo.completed);
    render();
}
  // Render the todo list
  function render() {
    elements.list.innerHTML = '';
    elements.empty.hidden = todos.length !== 0;

    for (const todo of todos) {
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.completed ? ' completed' : '');
      li.dataset.id = todo.id;

      // Checkbox to toggle completion
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo-check';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => toggleTodo(todo.id));

      // Task text
      const text = document.createElement('p');
      text.className = 'todo-text';
      text.textContent = todo.text;

      // Delete button
      const del = document.createElement('button');
      del.className = 'icon-btn';
      del.textContent = 'Delete';
      del.addEventListener('click', () => deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(del);
      elements.list.appendChild(li);
    }
  }

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    createTodo(elements.input.value);
    elements.input.value = '';
    elements.input.focus();
  });

	elements.clearBtn.addEventListener('click', clearCompleted); 
  render();
})();