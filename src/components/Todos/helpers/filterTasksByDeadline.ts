import DEADLINES from '../../../constants/deadlines';
import { ITask } from '../../../models';
import getDeadlineDate from './getDeadlineDate';

export function checkDeadline(deadlineAt: number, deadlineId: string): boolean {
  const deadlineTimestamp = getDeadlineDate(deadlineId).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (deadlineId) {
    case DEADLINES.today:
      return deadlineAt > today.getTime() && deadlineAt <= deadlineTimestamp;

    case DEADLINES.tomorrow:
      return (
        deadlineAt > getDeadlineDate(DEADLINES.today).getTime() && deadlineAt <= deadlineTimestamp
      );

    case DEADLINES.week: {
      const startWeek = today.setDate(
        today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
      );
      return deadlineAt > startWeek && deadlineAt <= deadlineTimestamp;
    }

    case DEADLINES.month: {
      const startMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
      return deadlineAt > startMonth && deadlineAt <= deadlineTimestamp;
    }

    case DEADLINES.year: {
      const startYear = new Date(today.getFullYear(), 0, 1).getTime();
      return deadlineAt > startYear && deadlineAt <= deadlineTimestamp;
    }

    default:
      return true;
  }
}

function filterTasksByDeadline(tasks: ITask[], deadlineId: string) {
  if (deadlineId === DEADLINES.all) return tasks.sort((a, b) => a.deadlineAt - b.deadlineAt);
  return tasks
    .filter((task) => checkDeadline(task.deadlineAt, deadlineId))
    .sort((a, b) => a.deadlineAt - b.deadlineAt);
}

export default filterTasksByDeadline;
