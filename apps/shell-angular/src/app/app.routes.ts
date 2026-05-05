import { Routes } from '@angular/router';
import { DashboardReactBridgeComponent } from './dashboard-react-bridge.component';
import { ProfileSvelteBridgeComponent } from './profile-svelte-bridge.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardReactBridgeComponent
  },
  {
    path: 'perfil',
    component: ProfileSvelteBridgeComponent
  }
];
