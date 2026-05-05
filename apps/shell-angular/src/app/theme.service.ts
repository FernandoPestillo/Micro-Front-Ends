import { Injectable, signal } from '@angular/core';
import {
  MFE_EVENTS,
  ThemeMode,
  applyThemeToDocument,
  publishThemeChanged,
  subscribeMfeEvent
} from '@mfe/mfe-contracts';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>('light');

  constructor() {
    applyThemeToDocument(this.theme());
    subscribeMfeEvent(MFE_EVENTS.remoteReady, () => this.publishTheme());
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
    this.publishTheme();
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  publishTheme(): void {
    publishThemeChanged(this.theme());
  }
}
