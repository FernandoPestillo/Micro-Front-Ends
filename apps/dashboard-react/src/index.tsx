import { mountDashboard } from './mount-dashboard';

const rootElement = document.getElementById('root');

if (rootElement) {
  mountDashboard({ target: rootElement });
}
