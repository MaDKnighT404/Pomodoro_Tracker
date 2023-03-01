import DEADLINES from '../../../constants/deadlines';

function getDeadlineDate(deadlineId: string): Date {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  switch (deadlineId) {
    case DEADLINES.today:
      return today;

    case DEADLINES.tomorrow:
      return new Date(today.setDate(today.getDate() + 1));

    case DEADLINES.week: {
      const gap = today.getDay() === 0 ? 7 : today.getDay();
      return new Date(today.setDate(today.getDate() - gap + 7));
    }

    case DEADLINES.month:
      return new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    case DEADLINES.year:
      return new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

    default:
      return today;
  }
}

export default getDeadlineDate;
