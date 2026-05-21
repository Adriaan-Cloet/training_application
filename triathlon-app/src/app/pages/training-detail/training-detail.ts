import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { Discipline, Training } from '../../models/training.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-training-detail',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './training-detail.html',
  styleUrl: './training-detail.css',
})
export class TrainingDetailComponent implements OnInit {
  training: Training | null = null;
  isEditing = false;
  editData!: Omit<Training, 'id'>;
  disciplines = Object.values(Discipline);

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

  startEdit() {
    if (!this.training) return;
    const { id, ...rest } = this.training;
    this.editData = { ...rest };
    this.isEditing = true;
  }

  saveEdit() {
    if (!this.training) return;
    const updated = this.trainingService.update(this.training.id, this.editData);
    if (updated) this.training = updated;
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

}
