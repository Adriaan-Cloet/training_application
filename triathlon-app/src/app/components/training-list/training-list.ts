import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-training-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './training-list.html',
  styleUrl: './training-list.css',
})
export class TrainingListComponent {
  trainings = computed(() =>
    this.trainingService
      .trainings()()
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  );

  constructor(private trainingService: TrainingService) {}

  delete(id: string) {
    this.trainingService.delete(id);
  }
}
