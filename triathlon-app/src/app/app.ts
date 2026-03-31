import { Component, signal } from '@angular/core';
import { TrainingFormComponent } from './components/training-form/training-form';
import { TrainingList } from "./components/training-list/training-list";

@Component({
  selector: 'app-root',
  imports: [TrainingFormComponent, TrainingList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('triathlon-app');
}