import './index.css';

type TodoCheckProps = {
  id: number;
  checked?: boolean | undefined;
  content: string;
  onChange: () => void;
};

export default function TodoCheck({
  id,
  checked,
  content = 'Default To-do',
  onChange,
}: TodoCheckProps) {
  return (
    <div className="todo-check">
      <input
        type="checkbox"
        name={`todo-${id}`}
        id={`todo-${id}`}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`todo-${id}`}>
        <span>
          <svg width="12px" height="9px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        <span>{content}</span>
      </label>
    </div>
  );
}
