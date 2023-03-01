import { useTranslation } from 'react-i18next';
import { ITask } from '../../models';
import StatsItem from './StatsItem';
import styles from './statsWidget.module.scss';
import TimeStat from './TimeStat';

type StatsWidgetProps = {
  todos: ITask[];
};

const StatsWidget = ({ todos }: StatsWidgetProps) => {
  const { t } = useTranslation();

  const inCompletedTodos = todos.filter((todo) => !todo.isCompleted);

  const estimatedTime = inCompletedTodos.reduce(
    (acc, todo) => acc + todo.pomodoroTime * todo.pomodorosNumber,
    0
  );
  const spentTime = todos.reduce(
    (acc, todo) => acc + todo.completedPomodors * todo.pomodoroTime,
    0
  );

  const numberIncompleteTodos = inCompletedTodos.length;
  const numberCompletedTodos = todos.length - numberIncompleteTodos;

  return (
    <div className={styles.container}>
      <StatsItem stat={<TimeStat time={estimatedTime} />} description={t('EstimatedTime')} />
      <StatsItem stat={numberIncompleteTodos} description={t('IncompletedTasks')} />
      <StatsItem stat={<TimeStat time={spentTime} />} description={t('SpentTime')} />
      <StatsItem stat={numberCompletedTodos} description={t('CompletedTasks')} />
    </div>
  );
};

export default StatsWidget;
