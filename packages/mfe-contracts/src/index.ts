export const MFE_EVENTS = {
  authToken: 'mf:auth-token',
  remoteReady: 'mf:remote-ready',
  themeChanged: 'mf:theme-changed',
  userContextChanged: 'mf:user-context-changed',
  navigationRequested: 'mf:navigation-requested'
} as const;

export type MfeEventName = (typeof MFE_EVENTS)[keyof typeof MFE_EVENTS];

export type ThemeMode = 'light' | 'dark';

export type AuthTokenPayload = {
  token: string;
};

export type RemoteReadyPayload = {
  name: string;
  framework: 'angular' | 'react' | 'svelte' | 'web-component';
};

export type ThemeChangedPayload = {
  theme: ThemeMode;
};

export type UserContextPayload = {
  id: string;
  name: string;
  role: string;
};

export type NavigationRequestedPayload = {
  path: string;
};

export type MfeEventMap = {
  [MFE_EVENTS.authToken]: AuthTokenPayload;
  [MFE_EVENTS.remoteReady]: RemoteReadyPayload;
  [MFE_EVENTS.themeChanged]: ThemeChangedPayload;
  [MFE_EVENTS.userContextChanged]: UserContextPayload;
  [MFE_EVENTS.navigationRequested]: NavigationRequestedPayload;
};

export type ThemeTokens = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  primaryContrast: string;
  accent: string;
};

export const THEME_TOKENS: Record<ThemeMode, ThemeTokens> = {
  light: {
    background: '#f5f7f8',
    surface: '#ffffff',
    surfaceAlt: '#f7f8fa',
    text: '#1d252c',
    muted: '#55616d',
    border: '#d9e1e8',
    primary: '#14213d',
    primaryContrast: '#ffffff',
    accent: '#0f766e'
  },
  dark: {
    background: '#111827',
    surface: '#1f2937',
    surfaceAlt: '#273449',
    text: '#f9fafb',
    muted: '#cbd5e1',
    border: '#41516a',
    primary: '#0f172a',
    primaryContrast: '#f9fafb',
    accent: '#38bdf8'
  }
};

export function publishMfeEvent<K extends keyof MfeEventMap>(type: K, detail: MfeEventMap[K]): void {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

export function subscribeMfeEvent<K extends keyof MfeEventMap>(
  type: K,
  handler: (payload: MfeEventMap[K]) => void
): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<MfeEventMap[K]>).detail);
  };

  window.addEventListener(type, listener);
  return () => window.removeEventListener(type, listener);
}

export function publishAuthToken(token: string): void {
  publishMfeEvent(MFE_EVENTS.authToken, { token });
}

export function publishThemeChanged(theme: ThemeMode): void {
  applyThemeToDocument(theme);
  publishMfeEvent(MFE_EVENTS.themeChanged, { theme });
}

export function notifyRemoteReady(payload: RemoteReadyPayload): void {
  publishMfeEvent(MFE_EVENTS.remoteReady, payload);
}

export function applyThemeToDocument(theme: ThemeMode): void {
  const tokens = THEME_TOKENS[theme];
  const root = document.documentElement;

  root.dataset.theme = theme;

  Object.entries(tokens).forEach(([name, value]) => {
    root.style.setProperty(`--mfe-${toKebabCase(name)}`, value);
  });
}

function toKebabCase(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
