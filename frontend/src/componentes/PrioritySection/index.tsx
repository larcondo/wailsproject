import './index.css';

type PrioritySectionProps = {
  highQty: number;
  lowQty: number;
  infoQty: number;
};

export default function PrioritySection({
  highQty,
  lowQty,
  infoQty,
}: PrioritySectionProps) {
  return (
    <div className="priority-section">
      <div className="priority-row">
        <span className="priority-text">Alta</span>{' '}
        <span className="qty-number">{highQty}</span>
      </div>
      <div className="priority-row">
        <span className="priority-text">Baja</span>{' '}
        <span className="qty-number">{lowQty}</span>
      </div>
      <div className="priority-row">
        <span className="priority-text">Info</span>{' '}
        <span className="qty-number">{infoQty}</span>
      </div>
    </div>
  );
}
