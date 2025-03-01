import './index.css';

import CheckBox from '../CheckBox';

function getDate(s: string): string {
  return s.split('T')[0];
}

function getHour(s: string): string {
  return s.split('T')[1].substring(0, 5);
}

type DeletedProps = {
  value: Todo;
  selected: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Deleted({ value, selected, onChange }: DeletedProps) {
  return (
    <div className="deleted-container">
      <CheckBox
        name={`check${value.ID}`}
        label=""
        onChange={onChange}
        checked={selected}
      />
      <span className="deleted-content">{value.Content}</span>
      <span className="deleted-date">
        {getDate(value.DeletedAt)} | {getHour(value.DeletedAt)}
      </span>
    </div>
  );
}
