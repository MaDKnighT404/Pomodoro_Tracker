import { useTranslation } from 'react-i18next';
import Modal from '../../Modal';
import styles from './WarningModal.module.scss';

interface Props {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onConfirm: () => void;
}

const WarningModal = ({ isVisible, setIsVisible, onConfirm }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <div className={styles.container}>
        <p>{t('LostPomodoroProgress')}</p>
        <p>{t('ChangeTaskConfirm')}</p>
        <div className={styles.controls}>
          <button className={styles.button} type="button" onClick={() => setIsVisible(false)}>
            {t('Cancel')}
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              onConfirm();
              setIsVisible(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
