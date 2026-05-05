declare module 'dashboardReact/Dashboard' {
  import { ComponentType } from 'react';

  const Dashboard: ComponentType;
  export default Dashboard;
}

declare module 'profileSvelte/mountUserProfile' {
  export function mountUserProfile(target: HTMLElement): () => void;
}
