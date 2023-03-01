import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import Modal from '../Modal';
import NumberInput from '../ui/NumberInput';
import ToggleButton from '../ui/ToggleButton';
import TimeSettingsItem from './TimeSettingsItem';
import styles from './timerSettings.module.scss';
import {
  minLongBreakInterval,
  maxLongBreakInterval,
  alarmSounds,
  ambientSounds,
} from '../../constants/timerSettings';

type AlarmSoundsOptions = keyof typeof alarmSounds | '';
type AmbientSoundsOptions = keyof typeof ambientSounds | '';

const TimerSettingsWidget = () => {
  const { t, i18n } = useTranslation();
  const { isSettingsVisible } = useAppSelector((state) => state.widgets);
  const {
    workPeriodInMinutes,
    shortBreakPeriodInMinutes,
    longBreakPeriodInMinutes,
    longBreakInterval,
    autoRunWork,
    autoRunBreak,
    offBreak,
    alarmSound,
    ambientSound,
  } = useAppSelector((state) => state.timerSettings);
  const { setIsSettingsVisible, setTimerSettings, setIsRunning } = useActions();
  const audioPlayer = useRef(new Audio());
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  const lang = i18n.language.split('-')[0];

  const alarmSoundOptions = Object.entries(alarmSounds).map(([key, value]) => ({
    value: key,
    name: value.name[lang as 'ru' | 'en'],
  }));

  const ambientSoundOptions = Object.entries(ambientSounds).map(([key, value]) => ({
    value: key,
    name: value.name[lang as 'ru' | 'en'],
  }));

  const testSound = (src: string) => {
    if (!src) return;
    clearTimeout(timeoutId.current);

    setIsRunning(false);
    audioPlayer.current.src = src;
    audioPlayer.current.play();

    timeoutId.current = setTimeout(() => {
      audioPlayer.current.pause();
    }, 5000);
  };

  useEffect(() => {
    if (!isSettingsVisible) {
      audioPlayer.current.pause();
      clearTimeout(timeoutId.current);
    }
  }, [isSettingsVisible]);

  return (
    <Modal isVisible={isSettingsVisible} setIsVisible={setIsSettingsVisible}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{t('TimerSettings')}</h3>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close"
            onClick={() => setIsSettingsVisible(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className={`${styles.row} ${styles.rowFlexColumn}`}>
          <p className={styles.label}>{t('TimeMinutes')}</p>
          <div className={styles.timeSettings}>
            <TimeSettingsItem
              label={t('Pomodoro')}
              value={workPeriodInMinutes}
              onChange={(value) => setTimerSettings({ workPeriodInMinutes: value })}
            />
            <TimeSettingsItem
              label={t('ShortBreakTime')}
              value={shortBreakPeriodInMinutes}
              onChange={(value) => setTimerSettings({ shortBreakPeriodInMinutes: value })}
            />
            <TimeSettingsItem
              label={t('LongBreakTime')}
              value={longBreakPeriodInMinutes}
              onChange={(value) => setTimerSettings({ longBreakPeriodInMinutes: value })}
            />
          </div>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>{t('AutoStartPomodoros')}</p>
          <ToggleButton
            checked={autoRunWork}
            onChange={(value) => setTimerSettings({ autoRunWork: value })}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>{t('AutoStartBreaks')}</p>
          <ToggleButton
            checked={autoRunBreak}
            onChange={(value) => setTimerSettings({ autoRunBreak: value })}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>{t('DisableBreak')}</p>
          <ToggleButton
            checked={offBreak}
            onChange={(value) => setTimerSettings({ offBreak: value })}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>{t('LongBreakInterval')}</p>
          <div className={styles.numberContainer}>
            <NumberInput
              min={minLongBreakInterval}
              max={maxLongBreakInterval}
              value={longBreakInterval}
              onChange={(value) => setTimerSettings({ longBreakInterval: value })}
            />
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>{t('AlarmSound')}</p>
          <div className={styles.selectSoundContainer}>
            <select
              className={styles.selectSound}
              value={alarmSound ?? ''}
              onChange={(evt) => {
                const soundId = evt.target.value as AlarmSoundsOptions;
                setTimerSettings({ alarmSound: soundId });
                if (!soundId) return;
                testSound(alarmSounds[soundId].path);
              }}
            >
              <option value="">{t('None')}</option>
              {alarmSoundOptions.map((option) => (
                <option className={styles.soundOption} key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>{t('AmbientSound')}</p>
          <div className={styles.selectSoundContainer}>
            <select
              className={styles.selectSound}
              value={ambientSound ?? ''}
              onChange={(evt) => {
                const soundId = evt.target.value as AmbientSoundsOptions;
                setTimerSettings({ ambientSound: soundId });
                if (!soundId) return;
                testSound(ambientSounds[soundId].path);
              }}
            >
              <option value="">{t('None')}</option>
              {ambientSoundOptions.map((option) => (
                <option className={styles.soundOption} key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimerSettingsWidget;
