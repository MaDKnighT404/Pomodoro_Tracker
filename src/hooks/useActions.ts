import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { timerSettingsActions } from '../store/timer/timerSettingsSlice';
import { tasksActions } from '../store/tasks/tasksSlice';
import { timerActions } from '../store/timer/timerSlice';
import { widgetsActions } from '../store/widgets/widgetsSlice';
import { userActions } from '../store/auth/users.slice';
import { preferencesActions } from '../store/preferences/preferencesSlice';

const actions = {
  ...tasksActions,
  ...timerActions,
  ...widgetsActions,
  ...timerSettingsActions,
  ...userActions,
  ...preferencesActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export default useActions;
