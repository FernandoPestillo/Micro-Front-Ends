import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { AuthTokenService } from './auth-token.service';

@Component({
  selector: 'mfe-profile-svelte-bridge',
  standalone: true,
  template: '<div class="remote-slot" #container></div>',
  styles: [
    `
      .remote-slot {
        min-height: 320px;
      }
    `
  ]
})
export class ProfileSvelteBridgeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true })
  private readonly container!: ElementRef<HTMLElement>;

  private readonly authToken = inject(AuthTokenService);
  private unmountRemote?: () => void;

  async ngAfterViewInit(): Promise<void> {
    const remote = await import('profileSvelte/mountUserProfile');
    this.unmountRemote = remote.mountUserProfile(this.container.nativeElement);
    this.authToken.publishToken();
  }

  ngOnDestroy(): void {
    this.unmountRemote?.();
  }
}
