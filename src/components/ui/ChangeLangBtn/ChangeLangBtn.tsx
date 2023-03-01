import { useTranslation } from 'react-i18next';
import styles from './ChangeLangBtn.module.scss';

const ChangeLangBtn = () => {
  const lang = localStorage.getItem('i18nextLng')
  const { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };


  return (
    <button
      type="button"
      className={lang === "ru-RU" ? styles.russian : styles.english }
      aria-label="change Language"
      onClick={() => changeLanguage(lang === "ru-RU" ? 'en-EN' :'ru-RU' )}
    />
  );
};

export default ChangeLangBtn;
