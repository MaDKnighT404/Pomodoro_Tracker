import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import ThemeSwitch from '../ThemeSwtich/ThemeSwitch';
import ChangeLangBtn from '../ui/ChangeLangBtn';
import styles from './Header.module.scss';
import logo from '../../assets/img/logo_symbol.png';

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const isLogin = localStorage.getItem('user');

  const navigate = useNavigate();
  const { changeUserName, switchRegistred } = useActions();
  const { t } = useTranslation();

  const handlerLogoff = () => {
    changeUserName('');
    switchRegistred(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.userContainer}>
          {isLogin ? user.fullName : <img src={logo} alt="logo symbol" className={styles.logo} />}
        </div>
        <div className={styles.buttonsContainer}>
          <ChangeLangBtn />
          <ThemeSwitch />
          {isLogin && (
            <button className={styles.button} type="button" onClick={() => handlerLogoff()}>
              {t('Logoff')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
