export const AUTH_TOKEN_EVENT = 'mf:auth-token';
export const REMOTE_READY_EVENT = 'mf:remote-ready';

export type AuthTokenPayload = {
  token: string;
};

export function notifyRemoteReady(name: string): void {
  window.dispatchEvent(
    new CustomEvent(REMOTE_READY_EVENT, {
      detail: { name }
    })
  );
}
