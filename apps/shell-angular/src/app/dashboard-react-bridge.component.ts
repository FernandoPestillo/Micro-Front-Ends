import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { AuthTokenService } from './auth-token.service';

@Component({
  selector: 'mfe-dashboard-react-bridge',
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
export class DashboardReactBridgeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true })
  private readonly container!: ElementRef<HTMLElement>;

  private readonly authToken = inject(AuthTokenService);
  private root?: Root;

  async ngAfterViewInit(): Promise<void> {
    const remote = await import('dashboardReact/Dashboard');
    const Dashboard = remote.default;

    this.root = createRoot(this.container.nativeElement);
    this.root.render(React.createElement(Dashboard));
    this.authToken.publishToken();
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }
}
