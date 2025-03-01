import { useEffect, useState } from 'react';
import { DeletePermanently, GetDeleted } from '../../../wailsjs/go/main/App';

import Deleted from '../Deleted';
import CheckBox from '../CheckBox';

export default function DeletedList() {
  const [toDelete, setToDelete] = useState<Array<number>>([]);
  const [recycled, setRecycled] = useState<TodoArray>([]);

  useEffect(() => {
    GetDeleted().then((todos) => setRecycled(todos));
  }, []);

  if (!recycled) return null;

  if (recycled.length < 1)
    return (
      <div className="todo-list">
        <p style={{ textAlign: 'center' }}>No hay To-Dos eliminados.</p>
      </div>
    );

  function onChange(checked: boolean, id: number) {
    if (checked) {
      setToDelete((prev) => [...prev, id]);
    } else {
      const newArr = toDelete.filter((val) => val !== id);
      setToDelete(newArr);
    }
  }

  function onSelectAllChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked && recycled) {
      setToDelete(recycled.map((t) => t.ID));
    } else {
      setToDelete([]);
    }
  }

  function permanentDelete() {
    DeletePermanently(toDelete)
      .then((res) => {
        setRecycled((prev) => prev.filter((t) => !res.includes(t.ID)));
        setToDelete([]);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="todo-list">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 0.5rem',
            paddingLeft: '2ch',
          }}
        >
          <div style={{ flex: 1 }}>
            <CheckBox name="todos" label="" onChange={onSelectAllChange} />{' '}
            {toDelete.length === recycled.length ? 'Todos' : toDelete.length}{' '}
            seleccionados
          </div>
          <button disabled={toDelete.length < 1} onClick={permanentDelete}>
            Borrar definitivamente
          </button>
        </div>
        {recycled.map((t) => (
          <Deleted
            value={t}
            key={t.ID}
            selected={toDelete.includes(t.ID)}
            onChange={(e) => onChange(e.target.checked, t.ID)}
          />
        ))}
      </div>
    </>
  );
}
