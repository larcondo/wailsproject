import './index.css';

type SwitchProps = {
  id: number;
  checked?: boolean | undefined;
  onChange: () => void;
};

export default function Switch(props: SwitchProps) {
  return (
    <div className="toggle-switch" style={{ transform: 'scale(0.75)' }}>
      <input
        type="checkbox"
        name={`toggleswitch-${props.id}`}
        id={`toggleswitch-${props.id}`}
        className="toggle-switch-checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      <label
        htmlFor={`toggleswitch-${props.id}`}
        className="toggle-switch-label  "
      >
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
}
