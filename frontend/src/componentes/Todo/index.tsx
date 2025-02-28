import './index.css';
import { main } from '../../../wailsjs/go/models';
import Switch from '../Switch';
import TodoCheck from '../TodoCheck';
import { PRIORITIES } from '../../utils/constants';

type TodoProps = {
  value: main.TodoEntry;
  Update: (id: number, completed: boolean) => void;
  Delete: (id: number) => void;
  type?: 'switch' | 'check';
};

export default function Todo({
  value,
  Update,
  Delete,
  type = 'switch',
}: TodoProps) {
  const priClass = PRIORITIES[value.Priority].class;

  if (type === 'check')
    return (
      <div className={`todo-container ${priClass}`}>
        <TodoCheck
          id={value.ID}
          checked={value.Completed}
          content={value.Content}
          onChange={() => Update(value.ID, value.Completed)}
        />
        <button className="del-btn" onClick={() => Delete(value.ID)}>
          ✕
        </button>
      </div>
    );

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
