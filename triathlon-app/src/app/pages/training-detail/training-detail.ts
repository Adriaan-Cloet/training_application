import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private trainingService: TrainingService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.trainingService.loadAll();
      const all = this.trainingService.trainings()();
      const found = all.find((t) => t.id === id);
      this.training = found ?? null;
      this.cdr.detectChanges();
    }
  }

  startEdit() {
    if (!this.training) return;
    const { id, ...rest } = this.training;
    this.editData = { ...rest };
    this.isEditing = true;
  }

  async saveEdit() {
    if (!this.training) return;
    const updated = await this.trainingService.update(this.training.id, this.editData);
    if (updated) this.training = updated;
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  goBack() {
    history.back();
  }
}
