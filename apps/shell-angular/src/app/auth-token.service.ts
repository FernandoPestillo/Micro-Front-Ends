import { Injectable, signal } from '@angular/core';
import { MFE_EVENTS, publishAuthToken, subscribeMfeEvent } from '@mfe/mfe-contracts';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  readonly token = signal('token-shell-inicial');

  constructor() {
    subscribeMfeEvent(MFE_EVENTS.remoteReady, () => this.publishToken());
  }

  setToken(token: string): void {
    this.token.set(token);
    this.publishToken();
  }

  publishToken(): void {
    publishAuthToken(this.token());
  }
}
