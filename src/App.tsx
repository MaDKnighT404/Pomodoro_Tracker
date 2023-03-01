import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Notfound from './pages/Notfound';
import WelcomePage from './pages/WelcomePage';
import TasksPage from './pages/TasksPage';
import TodoWidget from './components/Todos/TodoWidget';
import DEADLINES from './constants/deadlines';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="tasks" element={<TasksPage />}>
          <Route path="" element={<Navigate to={DEADLINES.today} replace />} />
          <Route path={DEADLINES.today} element={<TodoWidget deadline={DEADLINES.today} />} />
          <Route path={DEADLINES.tomorrow} element={<TodoWidget deadline={DEADLINES.tomorrow} />} />
          <Route path={DEADLINES.week} element={<TodoWidget deadline={DEADLINES.week} />} />
          <Route path={DEADLINES.month} element={<TodoWidget deadline={DEADLINES.month} />} />
          <Route path={DEADLINES.year} element={<TodoWidget deadline={DEADLINES.year} />} />
          <Route path={DEADLINES.all} element={<TodoWidget deadline={DEADLINES.all} />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
};

export default App;
