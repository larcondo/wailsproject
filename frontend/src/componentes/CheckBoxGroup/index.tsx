import './index.css';
import CheckBox from '../CheckBox';

type CheckBoxGroupProps = {
  setFiltros: (value: React.SetStateAction<PriFilter>) => void;
};

export default function CheckBoxGroup({ setFiltros }: CheckBoxGroupProps) {
  function onHighChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltros((prev) => ({ ...prev, high: e.target.checked }));
  }
  function onLowChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltros((prev) => ({ ...prev, low: e.target.checked }));
  }
  function onInfoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltros((prev) => ({ ...prev, info: e.target.checked }));
  }

  return (
    <div className="checkbox-group">
      <CheckBox name="high" label="Alta" onChange={onHighChange} />
      <CheckBox name="low" label="Baja" onChange={onLowChange} />
      <CheckBox name="info" label="Info" onChange={onInfoChange} />
    </div>
  );
}
