import { useEffect, useMemo, useState } from 'react';
import './App.css';
import {
  CreateTodo,
  GetAllTodos,
  DeleteTodo,
  UpdateCompleted,
} from '../wailsjs/go/main/App';

import TodoList from './componentes/TodoList';
import PrioritySection from './componentes/PrioritySection';
import TodoInput from './componentes/TodoInput';
import { filterTodos, filterTodosByPri } from './utils/filters';

function App() {
  const [todos, setTodos] = useState<TodoArray>([]);
  const [filtros, setFiltros] = useState<PriFilter>({
    info: true,
    low: true,
    high: true,
  });
  const infoTodos = useMemo(() => filterTodosByPri(todos, 0), [todos]);
  const lowTodos = useMemo(() => filterTodosByPri(todos, 1), [todos]);
  const highTodos = useMemo(() => filterTodosByPri(todos, 2), [todos]);

  const filteredTodos = useMemo(
    () => filterTodos(todos, filtros),
    [todos, filtros]
  );

  useEffect(() => {
    GetAllTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  function createTodo(t: string, pri: number) {
    CreateTodo(t, pri)
      .then((todo) => {
        setTodos([todo, ...todos]);
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

      <div className="layout">
        <PrioritySection
          highQty={highTodos.length}
          lowQty={lowTodos.length}
          infoQty={infoTodos.length}
          setFiltros={setFiltros}
        />
        <div className="todo-section">
          <TodoInput createTodo={createTodo} />
          <TodoList
            todos={filteredTodos}
            Delete={deleteTodo}
            Update={updateCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
