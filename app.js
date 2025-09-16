(function () { //iife 
  const { useEffect, useMemo, useState, useCallback } = React; //hooks 

  function TodoApp() {
    const initialTodo = useMemo(() => ({ id: 'hustle', text: 'hustle hustle hustle! :D', completed: false }), []);
    const [todos, setTodos] = useState([initialTodo]);
    const [inputValue, setInputValue] = useState('');

    const createTodo = useCallback((text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const todo = { id: Date.now(), text: trimmed, completed: false };
      setTodos((prev) => [todo, ...prev]);
    }, []);

    const toggleTodo = useCallback((id) => {
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }, []);

    const deleteTodo = useCallback((id) => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
      setTodos((prev) => prev.filter((t) => !t.completed));
    }, []);

    const handleSubmit = useCallback((e) => {
      e.preventDefault();
      createTodo(inputValue);
      setInputValue('');
    }, [createTodo, inputValue]);

    return (
      React.createElement('main', { className: 'app' },
        React.createElement('h1', { className: 'app__title' }, 'To-do List'),
        React.createElement('form', { id: 'todo-form', className: 'todo-form', autoComplete: 'off', onSubmit: handleSubmit },
          React.createElement('input', {
            id: 'todo-input',
            className: 'todo-input',
            type: 'text',
            placeholder: 'Add a new task...',
            'aria-label': 'New task',
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value)
          }),
          React.createElement('button', { className: 'todo-add', type: 'submit', 'aria-label': 'Add task' }, 'Add')
        ),
        React.createElement('p', null,
          React.createElement('button', { id: 'clear-completed', type: 'button', className: 'clear-btn', 'aria-label': 'Clear completed', onClick: clearCompleted }, 'Clear completed')
        ),
        React.createElement('ul', { id: 'todo-list', className: 'todo-list', 'aria-live': 'polite' },
          todos.map((todo) => (
            React.createElement('li', { key: todo.id, className: 'todo-item' + (todo.completed ? ' completed' : ''), 'data-id': todo.id },
              React.createElement('input', {
                type: 'checkbox',
                className: 'todo-check',
                checked: todo.completed,
                onChange: () => toggleTodo(todo.id)
              }),
              React.createElement('p', { className: 'todo-text' }, todo.text),
              React.createElement('button', { className: 'icon-btn', onClick: () => deleteTodo(todo.id) }, 'Delete')
            )
          ))
        ),
        React.createElement('p', { id: 'empty-state', className: 'empty-state', hidden: todos.length !== 0 }, 'No tasks yet...')
      )
    );
  }

  function mount() { 
    const root = document.getElementById('root');
    if (!root) {
      const r = document.createElement('div');
      r.id = 'root';
      document.body.appendChild(r);
    }
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(TodoApp));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  } 
})();

