import './index.css';
import { main } from '../../../wailsjs/go/models';
import { PRIORITIES } from '../../App';
import Switch from '../Switch';

type TodoProps = {
  value: main.TodoEntry;
  Update: (id: number, completed: boolean) => void;
  Delete: (id: number) => void;
};

export default function Todo({ value, Update, Delete }: TodoProps) {
  const priClass = PRIORITIES[value.Priority].class;

  return (
    <div className={`todo-container ${priClass}`}>
      <Switch
        id={value.ID}
        checked={value.Completed}
        onChange={() => Update(value.ID, value.Completed)}
      />
      <span className="todo-text">{value.Content}</span>

      <span className="todo-priority">{PRIORITIES[value.Priority].text}</span>

      <button className="del-btn" onClick={() => Delete(value.ID)}>
        ✕
      </button>
    </div>
  );
}
