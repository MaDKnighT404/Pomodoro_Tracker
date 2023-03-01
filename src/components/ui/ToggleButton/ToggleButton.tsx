import { useState } from 'react';
import styles from './toggle.module.scss';

interface ToggleButtonProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  // eslint-disable-next-line react/require-default-props
  icon?: JSX.Element;
}

const ToggleButton = ({ checked, onChange, icon }: ToggleButtonProps) => {
  const [isToggled, setIsToggle] = useState(checked);

  const handleClick = () => {
    setIsToggle(!isToggled);
    onChange(!isToggled);
  };

  const toggleClasses = [styles.toggle];
  if (isToggled) toggleClasses.push(styles.toggled);

  return (
    <span className={toggleClasses.join(' ')} onClick={handleClick} aria-hidden="true">
      <input type="checkbox" defaultChecked={isToggled} />
      <span className={styles.handle}>{icon ?? null}</span>
    </span>
  );
};

export default ToggleButton;
