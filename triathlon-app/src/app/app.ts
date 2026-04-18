import { Component, signal } from '@angular/core';
import { TrainingFormComponent } from './components/training-form/training-form';
import { TrainingListComponent } from './components/training-list/training-list';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [TrainingFormComponent, TrainingListComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('triathlon-app');
}