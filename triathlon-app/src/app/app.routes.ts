import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TrainingDetailComponent } from './pages/training-detail/training-detail';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'training/:id',
    component: TrainingDetailComponent,
  }
];