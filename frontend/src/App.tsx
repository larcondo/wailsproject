import { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo, GetAllTodos } from '../wailsjs/go/main/App';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Array<string>>(['Primer pendiente']);
  const updateTodo = (e: any) => setTodo(e.target.value);

  useEffect(() => {
    GetAllTodos().then((todos) => {
      setTodos(todos.map((t) => t.Content));
    });
  }, []);

  function createTodo() {
    CreateTodo(todo).then((todo) => setTodos([...todos, todo.Content]));
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
        />
        <button className="btn" onClick={createTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
