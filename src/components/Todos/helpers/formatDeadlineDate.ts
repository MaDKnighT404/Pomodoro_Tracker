import { useTranslation } from 'react-i18next';
import DEADLINES from '../../../constants/deadlines';
import { checkDeadline } from './filterTasksByDeadline';

function formatDeadlineDate(deadline: Date | number | string, withWeek = false) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t, i18n } = useTranslation();

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(23, 59, 59, 999);

  if (checkDeadline(deadlineDate.getTime(), DEADLINES.today))
    return { formattedDate: t('Today'), isExpired: false };

  if (checkDeadline(deadlineDate.getTime(), DEADLINES.tomorrow))
    return { formattedDate: t('Tomorrow'), isExpired: false };

  const isExpired = deadlineDate.getTime() < new Date().setHours(0, 0, 0, 0);

  let options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  if (withWeek) options = { ...options, weekday: 'short' };

  const formattedDate = deadlineDate.toLocaleDateString(i18n.language, options);

  return {
    formattedDate,
    isExpired,
  };
}

export default formatDeadlineDate;
