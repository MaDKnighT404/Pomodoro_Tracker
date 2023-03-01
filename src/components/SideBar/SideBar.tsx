import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import DEADLINES from '../../constants/deadlines';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const { t } = useTranslation();
  return (
    <ul className={`mavMenu ${styles.navBar}`}>
      <li className={styles.item}>
        <NavLink
          to={DEADLINES.today}
          className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
        >
          {t('Today')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={DEADLINES.tomorrow}
          className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
        >
          {t('Tomorrow')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={DEADLINES.week}
          className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
        >
          {t('ThisWeek')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={DEADLINES.month}
          className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
        >
          {t('ThisMonth')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={DEADLINES.year}
          className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
        >
          {t('ThisYear')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={DEADLINES.all}
          className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
        >
          {t('AllTime')}
        </NavLink>
      </li>
    </ul>
  );
};

export default SideBar;
