import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training.model';

@Component({
  selector: 'app-training-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './training-detail.html',
  styleUrl: './training-detail.css',
})
export class TrainingDetailComponent implements OnInit {
  training: Training | null = null;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.trainingService.getAll().find(t => t.id === id);
      this.training = found ?? null;
    }
  }
}