declare module 'dashboardReact/mountDashboard' {
  export type MountDashboardOptions = {
    target: HTMLElement;
  };

  export function mountDashboard(options: MountDashboardOptions): () => void;
}

declare module 'profileSvelte/mountUserProfile' {
  export function mountUserProfile(target: HTMLElement): () => void;
}

declare module 'profileSvelte/defineUserProfileElement' {
  export function defineUserProfileElement(): void;
}
