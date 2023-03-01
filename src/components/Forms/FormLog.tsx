import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Forms.module.scss';
import { useLoginUserMutation } from '../../store/auth/users.api';
import { IError, IUserLogin } from './types/data';
import useActions from '../../hooks/useActions';

const FormLog = () => {
  const [emailLog, setEmailLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');
  const [errorLog, setErrorLog] = useState<IError>({ status: '0', data: [] });
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation();
  const { changeUserName, switchRegistred } = useActions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formData = {
    email: emailLog,
    password: passwordLog,
  };

  const handleLoginUser = async (data: IUserLogin) => {
    try {
      const userData = await loginUser(data).unwrap();
      changeUserName(userData.fullName);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData._id);
      navigate('tasks/today');
    } catch (err) {
      const error = err as IError;
      setErrorLog(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.formWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2>{t('SignIn')}</h2>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder={t('Email')}
            value={emailLog}
            onChange={(e) => setEmailLog(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder={t('Password')}
            value={passwordLog}
            onChange={(e) => setPasswordLog(e.target.value)}
          />
          <button
            className={styles.submitBtn}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLoginUser(formData);
            }}
          >
            {t('Login')}
          </button>
        </form>
        <p className={styles.text}>
          {t('DontHaveAccount')} 
          <button type="button" className={styles.linkButton} onClick={() => switchRegistred(true)}>
            {t('ClickHere')}
          </button>
          {t('ToRegister')}
        </p>
        <div className={styles.serverAnswer}>
          {isLoading && (
            <div className={styles.loading}>
              <div className={styles.loader} />
            </div>
          )}
          {isError && (
            <ul className={styles.errorsList}>
              {errorLog.data.map((errorObj) => (
                <li key={errorObj.msg}>{errorObj.msg}</li>
              ))}
            </ul>
          )}
          {isSuccess && <div className={styles.success}> User successful login </div>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormLog;
