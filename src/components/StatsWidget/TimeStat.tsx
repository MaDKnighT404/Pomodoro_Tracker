import { useTranslation } from 'react-i18next';
import styles from './statsWidget.module.scss';

const TimeStat = ({ time }: { time: number }) => {
  const { t } = useTranslation();

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return (
    <>
      {hours ? (
        <>
          <span className={styles.number}>{hours}</span>
          <span className={styles.text}>{t('h')}</span>
        </>
      ) : (
        ''
      )}
      <span className={styles.number}>{minutes}</span>
      <span className={styles.text}>{t('m')}</span>
    </>
  );
};

export default TimeStat;
