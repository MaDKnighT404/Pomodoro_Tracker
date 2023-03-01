import { useState } from 'react';
import styles from './PomodoroRange.module.scss';

type Props = {
  onChange: (value: number) => void;
};

const PomodoroRange = ({ onChange }: Props) => {
  const [value, setValue] = useState(0);

  const decrement = () => {
    const newValue = value - 1 < 0 ? 0 : value - 1;
    setValue(newValue);
    onChange(newValue);
  };

  const increment = () => {
    const newValue = value + 1;
    setValue(value + 1);
    onChange(newValue);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(evt.target.value) < 0 ? 0 : Number(evt.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.pomodoroRange}>
      <button className={styles.button} type="button" onClick={decrement}>
        -
      </button>
      <span className={styles.icon}>🍅</span>
      <input className={styles.input} type="number" value={value} onChange={handleChange} />
      <button className={styles.button} type="button" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default PomodoroRange;
