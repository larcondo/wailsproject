import { useEffect, useState } from 'react';
import './App.css';
import {
  CreateTodo,
  GetAllTodos,
  DeleteTodo,
  UpdateCompleted,
} from '../wailsjs/go/main/App';
import { main } from '../wailsjs/go/models';
import TodoList from './componentes/TodoList';

export const PRIORITIES = [
  { class: 'pri-info', text: 'Info' },
  { class: 'pri-low', text: 'Baja' },
  { class: 'pri-high', text: 'Alta' },
];

function App() {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(0);
  const [todos, setTodos] = useState<Array<main.TodoEntry>>([]);
  const updateTodo = (e: any) => setText(e.target.value);
  const updatePriority = (e: any) => setPriority(parseInt(e.target.value));

  useEffect(() => {
    GetAllTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  function createTodo() {
    CreateTodo(text, priority)
      .then((todo) => {
        setTodos([todo, ...todos]);
        setText('');
      })
      .catch((e) => console.log(e));
  }

  function deleteTodo(id: number) {
    DeleteTodo(id).then((todo) => {
      const newTodos = todos.filter((t) => t.ID !== todo.ID);
      setTodos(newTodos);
    });
  }

  function updateCompleted(id: number, completed: boolean) {
    UpdateCompleted(id, completed).then((todo) => {
      const newTodos = todos.map((t) => (t.ID === todo.ID ? todo : t));
      setTodos(newTodos);
    });
  }

  return (
    <div id="App">
      <h1>To-do List</h1>

      <div id="input" className="input-box">
        <input
          id="new-todo"
          className="input"
          onChange={updateTodo}
          autoComplete="off"
          name="new-todo"
          type="text"
          value={text}
        />
        <select
          name="priority"
          id="priority"
          value={priority}
          onChange={updatePriority}
        >
          <option value={0}>{PRIORITIES[0].text}</option>
          <option value={1}>{PRIORITIES[1].text}</option>
          <option value={2}>{PRIORITIES[2].text}</option>
        </select>
        <button className="btn" onClick={createTodo}>
          Add
        </button>
      </div>

      <TodoList todos={todos} Delete={deleteTodo} Update={updateCompleted} />
    </div>
  );
}

export default App;
