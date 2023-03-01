import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@mantine/dates';
import 'dayjs/locale/ru';
import { FaCalendarAlt } from 'react-icons/fa';
import styles from './DatePicker.module.scss';

interface DatePickerProps {
  date: Date;
  onChange: (value: Date) => void;
}

const DatePicker = ({ date, onChange }: DatePickerProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (evt: MouseEvent) => {
      if (
        !calendarRef.current?.contains(evt.target as Node) &&
        !buttonRef.current?.contains(evt.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', clickOutsideHandler);
    }

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsOpen(!isOpen)}
          ref={buttonRef}
        >
          <FaCalendarAlt />
        </button>
        {isOpen && (
          <div className={styles.calendar} ref={calendarRef}>
            <Calendar
              value={date}
              onChange={onChange}
              locale={i18n.language}
              size="xs"
              hideOutsideDates
              allowLevelChange={false}
              minDate={new Date()}
              dayClassName={(day, mod) => (mod.selected ? styles.selectedDate : '')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
