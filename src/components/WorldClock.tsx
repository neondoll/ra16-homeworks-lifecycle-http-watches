import Clock from './Clock.tsx';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ChangeEvent, FormEvent } from 'react';

interface IForm extends Omit<IClock, 'id' | 'timeZone'> {
  timeZone: string;
}

function WorldClock() {
  const [clocks, setClocks] = useState<IClock[]>([
    { id: '1', name: 'Moscow', timeZone: 3 },
    { id: '2', name: 'London', timeZone: 1 }
  ]);
  const [form, setForm] = useState<IForm>({ name: '', timeZone: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleRemove = (id: IClock['id']) => {
    setClocks((prev) => prev.filter((clock) => clock.id !== id));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setClocks((prev) => [...prev, { id: uuidv4(), name: form.name, timeZone: Number(form.timeZone) }]);
    setForm({ name: '', timeZone: '' });
  };

  return (
    <div className="world-clock">
      <form autoComplete="off" className="world-clock__form world-clock-form" onSubmit={handleSubmit}>
        <div className="world-clock-form__group">
          <label className="world-clock-form__label" htmlFor="name">Название</label>
          <input
            className="world-clock-form__input"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="world-clock-form__group">
          <label className="world-clock-form__label" htmlFor="timeZone">Временная зона</label>
          <input
            className="world-clock-form__input"
            id="timeZone"
            name="timeZone"
            required
            step="1"
            type="number"
            value={form.timeZone}
            onChange={handleChange}
          />
        </div>
        <button className="world-clock-form__btn" type="submit">Добавить</button>
      </form>
      <div className="world-clock__clocks">
        {clocks.map((clock) => (
          <Clock className="world-clock__clock" item={clock} key={clock.id} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

export default WorldClock;
