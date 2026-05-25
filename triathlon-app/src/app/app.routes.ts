import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TrainingDetailComponent } from './pages/training-detail/training-detail';
import { CalendarComponent } from './pages/calendar/calendar';
import { StatsComponent } from './pages/stats/stats';
import { Auth } from './pages/auth/auth';
import { authGuard } from './guards/auth-guard';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'training/:id',
    component: TrainingDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authGuard],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'instellingen',
    component: Settings,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: Auth,
  },
];
