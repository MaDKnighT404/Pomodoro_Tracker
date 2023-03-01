import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import bgCalendar from '../assets/img/calendar-transparent-bg.png';
import styles from './styles/TaskPage.module.scss';

const TasksPage = () => {
  return (
    <div
      className={styles.taskPageContainer}
      style={{
        backgroundImage: `url(${bgCalendar})`,
      }}
    >
      <SideBar />
      <Outlet />
    </div>
  );
};

export default TasksPage;
