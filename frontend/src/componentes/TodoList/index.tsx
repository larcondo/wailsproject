import './index.css';
import { main } from '../../../wailsjs/go/models';

import Todo from '../Todo';

type TodoListProps = {
  todos: main.TodoEntry[] | null;
  Update: (id: number, completed: boolean) => void;
  Delete: (id: number) => void;
};

export default function TodoList({ todos, Update, Delete }: TodoListProps) {
  if (!todos) return null;

  // Empty array
  if (todos.length < 1)
    return (
      <div className="todo-list">
        <p className="todo-default-msg">No hay pendientes todavía.</p>
      </div>
    );

  return (
    <div className="todo-list">
      {todos.map((t) => {
        return (
          <Todo
            value={t}
            key={t.ID}
            Delete={Delete}
            Update={Update}
            type="check"
          />
        );
      })}
    </div>
  );
}
