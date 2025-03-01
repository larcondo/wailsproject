import './index.css';

type CheckBoxProps = {
  name: string;
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBox({
  name,
  label,
  checked,
  onChange,
}: CheckBoxProps) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        name={`check-${name}`}
        id={`check-${name}`}
        onChange={onChange}
        checked={checked}
      />
      <svg>
        <use xlinkHref="#checkmark-28" />
      </svg>
      <label htmlFor={`check-${name}`}>{label}</label>
      <svg style={{ display: 'none' }}>
        <symbol id="checkmark-28" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-miterlimit="10"
            fill="none"
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
          ></path>
        </symbol>
      </svg>
    </div>
  );
}
