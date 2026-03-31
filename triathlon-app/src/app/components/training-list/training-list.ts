import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-list',
  imports: [CommonModule],
  templateUrl: './training-list.html',
  styleUrl: './training-list.css',
})
export class TrainingList {
  readonly trainings = computed(() => {
    return [...this.trainingService.trainings()()].sort((a, b) => {
      return this.getTrainingTimestamp(b.date, b.startTime) - this.getTrainingTimestamp(a.date, a.startTime);
    });
  });

  constructor(private trainingService: TrainingService) {}

  delete(id: string) {
    this.trainingService.delete(id);
  }

  private getTrainingTimestamp(date: string, startTime?: string): number {
    const time = startTime && startTime.trim() !== '' ? startTime : '00:00';
    return new Date(`${date}T${time}`).getTime();
  }
}
