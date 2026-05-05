import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { AuthTokenService } from './auth-token.service';
import { ThemeService } from './theme.service';

type ProfileRemote = typeof import('profileSvelte/mountUserProfile');

@Component({
  selector: 'mfe-profile-svelte-bridge',
  standalone: true,
  template: `
    @if (status() === 'loading') {
      <section class="remote-state">Carregando Perfil Svelte...</section>
    }

    @if (status() === 'error') {
      <section class="remote-state error">
        <strong>Perfil indisponivel</strong>
        <span>{{ errorMessage() }}</span>
      </section>
    }

    <div class="remote-slot" [hidden]="status() !== 'ready'" #container></div>
  `,
  styles: [
    `
      .remote-slot {
        min-height: 320px;
      }

      .remote-state {
        background: var(--mfe-surface, #ffffff);
        border: 1px solid var(--mfe-border, #d9e1e8);
        border-radius: 8px;
        color: var(--mfe-muted, #55616d);
        padding: 24px;
      }

      .remote-state.error {
        color: var(--mfe-text, #1d252c);
      }

      .remote-state strong,
      .remote-state span {
        display: block;
      }

      .remote-state span {
        color: var(--mfe-muted, #55616d);
        margin-top: 8px;
      }
    `
  ]
})
export class ProfileSvelteBridgeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true })
  private readonly container!: ElementRef<HTMLElement>;

  private readonly authToken = inject(AuthTokenService);
  private readonly theme = inject(ThemeService);
  private unmountRemote?: () => void;

  readonly status = signal<'loading' | 'ready' | 'error'>('loading');
  readonly errorMessage = signal('');

  async ngAfterViewInit(): Promise<void> {
    try {
      const remote = await loadRemoteModule<ProfileRemote>({
        type: 'manifest',
        remoteName: 'profileSvelte',
        exposedModule: './mountUserProfile'
      });

      this.unmountRemote = remote.mountUserProfile(this.container.nativeElement);
      this.status.set('ready');
      this.authToken.publishToken();
      this.theme.publishTheme();
    } catch (error) {
      this.status.set('error');
      this.errorMessage.set(error instanceof Error ? error.message : 'Falha ao carregar o remote Svelte.');
    }
  }

  ngOnDestroy(): void {
    this.unmountRemote?.();
  }
}
