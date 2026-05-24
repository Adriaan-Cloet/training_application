import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TrainingDetailComponent } from './pages/training-detail/training-detail';
import { CalendarComponent } from './pages/calendar/calendar';
import { StatsComponent } from './pages/stats/stats';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'training/:id',
    component: TrainingDetailComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'stats',
    component: StatsComponent,
  }
];
