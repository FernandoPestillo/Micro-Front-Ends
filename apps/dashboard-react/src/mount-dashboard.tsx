import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import Dashboard from './Dashboard';
import './styles.css';

export type MountDashboardOptions = {
  target: HTMLElement;
};

export function mountDashboard({ target }: MountDashboardOptions): () => void {
  const root: Root = createRoot(target);

  root.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>
  );

  return () => root.unmount();
}
