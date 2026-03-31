import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Discipline, Training } from './models/training.model';
import { TrainingService } from './services/training.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('triathlon-app');
}
