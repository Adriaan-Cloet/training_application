import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training.model';

@Component({
  selector: 'app-training-list',
  imports: [CommonModule],
  templateUrl: './training-list.html',
  styleUrl: './training-list.css',
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.trainings = this.trainingService.getAll().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  delete(id: string) {
    this.trainingService.delete(id);
    this.load();
  }
}
