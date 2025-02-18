import { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo, GetAllTodos, DeleteTodo } from '../wailsjs/go/main/App';
import { main } from '../wailsjs/go/models';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Array<main.TodoEntry>>([]);
  const updateTodo = (e: any) => setTodo(e.target.value);

  useEffect(() => {
    GetAllTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  function createTodo() {
    CreateTodo(todo).then((todo) => {
      setTodos([...todos, todo]);
      setTodo('');
    });
  }

  function deleteTodo(id: number) {
    DeleteTodo(id).then((todo) => {
      console.log(todo);
      const newTodos = todos.filter((t) => t.ID !== todo.ID);
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
          value={todo}
        />
        <button className="btn" onClick={createTodo}>
          Add
        </button>
      </div>

      <div className="todo-list">
        {todos.map((value) => {
          return <Todo value={value} Delete={deleteTodo} key={value.ID} />;
        })}
      </div>
    </div>
  );
}

type TodoProps = {
  value: main.TodoEntry;
  Delete: (id: number) => void;
};

function Todo(props: TodoProps) {
  const priClass = props.value.Priority === 1 ? 'priH' : 'priL';

  return (
    <div className={`todo-container ${priClass}`}>
      <span>{props.value.Content}</span>
      <span>{props.value.Priority === 1 ? 'High' : 'Low'}</span>
      <button className="del-btn" onClick={() => props.Delete(props.value.ID)}>
        X
      </button>
    </div>
  );
}

export default App;
