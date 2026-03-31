import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrainingFormComponent } from './components/training-form/training-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrainingFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('triathlon-app');
}