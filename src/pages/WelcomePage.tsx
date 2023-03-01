import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMousePosition from '../hooks/useMousePosition';
import styles from './styles/WelcomePage.module.scss';
import logo from '../assets/img/logo.png';
import bgCalendar from '../assets/img/calendar-bg.png';
import bgClock from '../assets/img/clock.png';
import FormReg from '../components/Forms/FormReg';
import FormLog from '../components/Forms/FormLog';
import useAppSelector from '../hooks/useAppSelector';

const WelcomePage = () => {
  const isReg = useAppSelector((state) => state.user.isRegistred);
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const position = useMousePosition();

  useEffect(() => {
    if (user) {
      navigate('tasks/today');
    }
  }, [navigate, user]);

  return (
    <div
      className={styles.wrapper}
      style={{
        overflow: 'hidden',
        backgroundImage: `url(${bgCalendar}), url(${bgClock})`,
        backgroundPosition: `
        right ${12 + (position.x - window.innerWidth / 2) / 20}px
        bottom ${23 - (position.y - window.innerHeight / 2) / 60}px, 
        right ${300 - (position.x + window.innerWidth / 2) / 33}px
        bottom ${150 + (position.y - window.innerHeight / 2) / 40}px `,
      }}
    >
      <div className={styles.leftContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.aboutContainer}>
          <h3 className={styles.h2}>{t('AboutApp')}</h3>
          <p>
            {t('TheAim')}
            <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">{t('PomodoroTechnique')}</a>
            {t('WhichIs')}
          </p>
        </div>
        <div className={styles.aboutContainer}>
          <h3 className={styles.h2}>{t('WhatIsPomodoro')}</h3>
          <p>{t('ThePomodoroTechnique')}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.formContainer}>{!isReg ? <FormLog /> : <FormReg />}</div>
      </div>
    </div>
  );
};

export default WelcomePage;
