import { Injectable, signal } from '@angular/core';

export const AUTH_TOKEN_EVENT = 'mf:auth-token';
export const REMOTE_READY_EVENT = 'mf:remote-ready';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  readonly token = signal('token-shell-inicial');

  constructor() {
    window.addEventListener(REMOTE_READY_EVENT, () => this.publishToken());
  }

  setToken(token: string): void {
    this.token.set(token);
    this.publishToken();
  }

  publishToken(): void {
    window.dispatchEvent(
      new CustomEvent(AUTH_TOKEN_EVENT, {
        detail: {
          token: this.token()
        }
      })
    );
  }
}
