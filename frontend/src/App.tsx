import { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo, GetAllTodos, DeleteTodo } from '../wailsjs/go/main/App';
import { main } from '../wailsjs/go/models';

const PRIORITIES = [
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
          value={text}
        />
        <select
          name="priority"
          id="priority"
          value={priority}
          onChange={updatePriority}
        >
          <option value={0}>INFO</option>
          <option value={1}>LOW</option>
          <option value={2}>HIGH</option>
        </select>
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
  const priClass = PRIORITIES[props.value.Priority].class;

  return (
    <div className={`todo-container ${priClass}`}>
      <span>{props.value.Content}</span>
      <span>{PRIORITIES[props.value.Priority].text}</span>
      <button className="del-btn" onClick={() => props.Delete(props.value.ID)}>
        X
      </button>
    </div>
  );
}

export default App;
