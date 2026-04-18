import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrainingFormComponent } from './components/training-form/training-form';
import { TrainingListComponent } from './components/training-list/training-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrainingFormComponent, TrainingListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('triathlon-app');
}