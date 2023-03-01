import { FC } from 'react';
import styles from './numberInput.module.scss';

interface NumberInputProps {
  value: number;
  min?: number | undefined;
  max?: number | undefined;
  onChange: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = ({ value, min, max, onChange }) => {
  const handleChange = (newValue: number) => {
    if (min && newValue < min) newValue = min;
    if (max && newValue > max) newValue = max;
    onChange(newValue);
  };

  return (
    <input
      className={styles.numberInput}
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(evt) => handleChange(Number(evt.target.value))}
    />
  );
};

NumberInput.defaultProps = {
  min: undefined,
  max: undefined,
};

export default NumberInput;
