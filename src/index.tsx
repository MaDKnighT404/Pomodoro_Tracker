import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.scss';
import App from './App';
import { tasksApi } from './store/tasks/tasksApi';
import './settings/language/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApiProvider api={tasksApi}>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </ApiProvider>
);
