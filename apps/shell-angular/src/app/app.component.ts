import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthTokenService } from './auth-token.service';

@Component({
  selector: 'mfe-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly authToken = inject(AuthTokenService);

  readonly token = this.authToken.token;

  updateToken(value: string): void {
    this.authToken.setToken(value);
  }

  refreshToken(): void {
    this.authToken.setToken(`token-shell-${Date.now()}`);
  }
}
