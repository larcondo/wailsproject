import './index.css';
import { useState } from 'react';
import { PRIORITIES } from '../../utils/constants';

type TodoInputProps = {
  createTodo: (text: string, priority: number) => void;
};

export default function TodoInput({ createTodo }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(0);

  const updateText = (e: any) => setText(e.target.value);
  const updatePriority = (e: any) => setPriority(parseInt(e.target.value));

  const onClick = () => {
    createTodo(text, priority);
    setText('');
  };

  return (
    <div id="input" className="input-box">
      <input
        id="new-todo"
        className="input"
        onChange={updateText}
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
      <button className="btn" onClick={onClick}>
        Add
      </button>
    </div>
  );
}
