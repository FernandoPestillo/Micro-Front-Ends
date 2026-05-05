import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeMode } from '@mfe/mfe-contracts';
import { AuthTokenService } from './auth-token.service';
import { ThemeService } from './theme.service';

@Component({
  selector: 'mfe-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly authToken = inject(AuthTokenService);
  private readonly themeService = inject(ThemeService);

  readonly token = this.authToken.token;
  readonly theme = this.themeService.theme;

  updateToken(value: string): void {
    this.authToken.setToken(value);
  }

  refreshToken(): void {
    this.authToken.setToken(`token-shell-${Date.now()}`);
  }

  setTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }
}
