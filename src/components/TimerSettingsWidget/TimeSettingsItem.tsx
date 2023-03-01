import { FC } from 'react';
import NumberInput from '../ui/NumberInput/NumberInput';
import styles from './timerSettings.module.scss';
import { minTimeInMinutes, maxTimeInMinutes } from '../../constants/timerSettings';

interface TimeSettingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const TimeSettingsItem: FC<TimeSettingProps> = ({ label, value, onChange }) => {
  return (
    <div className={styles.timeSettingsItem}>
      <p className={styles.numberLabel}>{label}</p>
      <NumberInput
        value={value}
        min={minTimeInMinutes}
        max={maxTimeInMinutes}
        onChange={onChange}
      />
    </div>
  );
};

export default TimeSettingsItem;
