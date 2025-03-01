import './index.css';
import CheckBox from '../CheckBox';

type PrioritySectionProps = {
  highQty: number;
  lowQty: number;
  infoQty: number;
  filtros: PriFilter;
  setFiltros: (value: React.SetStateAction<PriFilter>) => void;
};

export default function PrioritySection({
  highQty,
  lowQty,
  infoQty,
  filtros,
  setFiltros,
}: PrioritySectionProps) {
  return (
    <div className="priority-section">
      <div className="priority-row">
        <CheckBox
          name="high"
          label="Alta"
          checked={filtros.high}
          onChange={(e) =>
            setFiltros((prev) => ({ ...prev, high: e.target.checked }))
          }
        />
        <span className="qty-number">{highQty}</span>
      </div>
      <div className="priority-row">
        <CheckBox
          name="low"
          label="Baja"
          checked={filtros.low}
          onChange={(e) =>
            setFiltros((prev) => ({ ...prev, low: e.target.checked }))
          }
        />
        <span className="qty-number">{lowQty}</span>
      </div>
      <div className="priority-row">
        <CheckBox
          name="info"
          label="Info"
          checked={filtros.info}
          onChange={(e) =>
            setFiltros((prev) => ({ ...prev, info: e.target.checked }))
          }
        />
        <span className="qty-number">{infoQty}</span>
      </div>
    </div>
  );
}
