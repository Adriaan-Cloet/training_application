import { Component } from '@angular/core';
import { TrainingFormComponent } from '../../components/training-form/training-form';
import { TrainingListComponent } from '../../components/training-list/training-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [TrainingFormComponent, TrainingListComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
