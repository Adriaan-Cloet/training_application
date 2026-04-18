import { Component } from '@angular/core';
import { TrainingFormComponent } from '../../components/training-form/training-form';
import { TrainingListComponent } from '../../components/training-list/training-list';

@Component({
  selector: 'app-home',
  imports: [TrainingFormComponent, TrainingListComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}